import subprocess
import time
import urllib.request
import json
import base64
import os
import websocket

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
USER_DATA = os.path.join(os.environ.get("TEMP", r"C:\Temp"), "chrome_test_profile")
URL = "http://localhost:4173/"

def main():
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        f"--user-data-dir={USER_DATA}",
        "--window-size=1280,800",
        URL
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print("Launched Chrome, PID:", proc.pid)
    time.sleep(2)

    try:
        # Get targets from CDP
        req = urllib.request.urlopen("http://localhost:9222/json")
        targets = json.loads(req.read().decode())
        ws_url = targets[0]["webSocketDebuggerUrl"]
        print("Connected to target:", ws_url)

        ws = websocket.create_connection(ws_url)

        def send_command(method, params=None):
            msg_id = int(time.time() * 1000) % 100000
            ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        # Enable Page & Runtime
        send_command("Page.enable")
        send_command("Runtime.enable")

        # Let's take screenshots at different animation milestones:
        # 1. At t=3.5s (during walk from left to center)
        print("Waiting for walking milestone (t=4s)...")
        time.sleep(2.0)
        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            with open("intro_walking.png", "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved intro_walking.png")

        # 2. At t=7s (arrived in center, waving, dialogue step 1: HEYYYY! Hello, Sir!)
        print("Waiting for arrived & waving milestone (t=7s)...")
        time.sleep(3.5)
        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            with open("intro_arrived_wave.png", "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved intro_arrived_wave.png")

        # 3. Fast-forward to options by advancing dialogue
        print("Advancing to options...")
        send_command("Runtime.evaluate", {
            "expression": "document.querySelectorAll('button').forEach(b => { if (b.textContent.includes('Skip') === false) b.click(); });"
        })
        time.sleep(1.0)
        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            with open("intro_dialogue_advanced.png", "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved intro_dialogue_advanced.png")

        ws.close()
    except Exception as e:
        print("Error during capture:", e)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        print("Chrome closed.")

if __name__ == "__main__":
    main()
