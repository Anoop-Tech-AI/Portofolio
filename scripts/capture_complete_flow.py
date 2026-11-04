import subprocess
import time
import urllib.request
import json
import base64
import os
import websocket

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
USER_DATA = os.path.join(os.environ.get("TEMP", r"C:\Temp"), "chrome_flow_profile")
URL = "http://localhost:4173/"
ARTIFACT_DIR = r"C:\Users\Anoop\.gemini\antigravity\brain\661bce8f-9846-44f7-a27a-236ad3a20f04"

def run_flow(width=1280, height=800, prefix="desktop"):
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        f"--user-data-dir={USER_DATA}_{prefix}",
        f"--window-size={width},{height}",
        URL
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(2)

    try:
        req = urllib.request.urlopen("http://localhost:9222/json")
        targets = json.loads(req.read().decode())
        ws_url = targets[0]["webSocketDebuggerUrl"]
        ws = websocket.create_connection(ws_url)

        def send_command(method, params=None):
            msg_id = int(time.time() * 1000) % 100000
            ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        send_command("Page.enable")
        send_command("Runtime.enable")

        # 1. Wait until BYTE arrives in center (t=6.5s)
        time.sleep(6.5)
        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            path = os.path.join(ARTIFACT_DIR, f"{prefix}_01_arrived_greeting.png")
            with open(path, "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved", path)

        # 2. Advance dialogue through the steps to the interactive options
        for _ in range(6):
            send_command("Runtime.evaluate", {
                "expression": "(function() { const b = document.querySelector('div.bg-\\[\\#11141e\\]\\/95'); if(b) b.click(); })()"
            })
            time.sleep(0.3)

        time.sleep(0.8)
        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            path = os.path.join(ARTIFACT_DIR, f"{prefix}_02_interactive_options.png")
            with open(path, "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved", path)

        # 3. Click option: "Explore Anoop's Projects" (first button)
        send_command("Runtime.evaluate", {
            "expression": "(function() { const btns = document.querySelectorAll('button'); for(let b of btns){ if(b.textContent.includes('Projects')){ b.click(); break; } } })()"
        })

        # Wait for jump & portal transition into portfolio
        time.sleep(1.8)
        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            path = os.path.join(ARTIFACT_DIR, f"{prefix}_03_portfolio_docked.png")
            with open(path, "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved", path)

        ws.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()

if __name__ == "__main__":
    print("Testing desktop flow...")
    run_flow(1280, 800, "desktop")
    print("Testing mobile flow...")
    run_flow(390, 844, "mobile")
    print("All captures completed.")

