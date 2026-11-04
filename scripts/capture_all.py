import subprocess
import time
import urllib.request
import json
import base64
import os
import tempfile
import websocket

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
URL = "http://localhost:4173/"
ARTIFACT_DIR = r"C:\Users\Anoop\.gemini\antigravity\brain\661bce8f-9846-44f7-a27a-236ad3a20f04"

def main():
    user_data = tempfile.mkdtemp(prefix="chrome_shot_")
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        f"--user-data-dir={user_data}",
        "--window-size=1280,800",
        URL
    ]
    proc = subprocess.Popen(cmd)
    time.sleep(2)

    try:
        ws_url = None
        for _ in range(20):
            try:
                req = urllib.request.urlopen("http://localhost:9222/json")
                targets = json.loads(req.read().decode())
                if targets:
                    ws_url = targets[0]["webSocketDebuggerUrl"]
                    break
            except Exception:
                time.sleep(0.4)

        if not ws_url:
            print("Could not connect to Chrome")
            return

        ws = websocket.create_connection(ws_url)

        def send_command(method, params=None):
            msg_id = int(time.time() * 1000) % 100000
            ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        def save_screenshot(filename):
            res = send_command("Page.captureScreenshot", {"format": "png"})
            if "data" in res:
                path = os.path.join(ARTIFACT_DIR, filename)
                with open(path, "wb") as f:
                    f.write(base64.b64decode(res["data"]))
                print("Saved", path)

        send_command("Page.enable")
        send_command("Runtime.enable")

        # 1. Wait for BYTE arrival & wave at 6.5s
        print("Waiting for BYTE arrival...")
        time.sleep(6.5)
        save_screenshot("01_cinematic_greeting.png")

        # 2. Advance to the 3 interactive options by evaluating JS to advance dialogue
        print("Advancing to 3 options...")
        send_command("Runtime.evaluate", {
            "expression": """(function() {
                // Click dialogue bubble repeatedly to fast-forward through all lines
                for (let i = 0; i < 6; i++) {
                    setTimeout(() => {
                        const bubble = document.querySelector('div.cursor-pointer');
                        if (bubble) bubble.click();
                    }, i * 150);
                }
            })()"""
        })
        time.sleep(1.8)
        save_screenshot("02_three_interactive_options.png")

        # 3. Click option 1: "Explore Anoop's Projects"
        print("Clicking option 1...")
        send_command("Runtime.evaluate", {
            "expression": """(function() {
                const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Projects'));
                if (btn) btn.click();
            })()"""
        })
        time.sleep(1.8)
        save_screenshot("03_portfolio_unveiled.png")

        ws.close()
    except Exception as e:
        print("Error:", e)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()
        print("Complete.")

if __name__ == "__main__":
    main()
