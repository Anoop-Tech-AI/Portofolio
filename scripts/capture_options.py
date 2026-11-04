import subprocess
import time
import urllib.request
import json
import base64
import os
import websocket

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
USER_DATA = os.path.join(os.environ.get("TEMP", r"C:\Temp"), "chrome_options_profile")
URL = "http://localhost:4173/"
ARTIFACT_DIR = r"C:\Users\Anoop\.gemini\antigravity\brain\661bce8f-9846-44f7-a27a-236ad3a20f04"

def main():
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9223",
        "--remote-allow-origins=*",
        f"--user-data-dir={USER_DATA}",
        "--window-size=1280,800",
        URL
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(2)

    try:
        req = urllib.request.urlopen("http://localhost:9223/json")
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

        # Wait 6.5s for BYTE arrival
        time.sleep(6.5)

        # Advance to options by dispatching keydown Enter 6 times
        print("Advancing to options via Enter key...")
        for _ in range(6):
            send_command("Input.dispatchKeyEvent", {"type": "keyDown", "key": "Enter", "code": "Enter", "windowsVirtualKeyCode": 13})
            send_command("Input.dispatchKeyEvent", {"type": "keyUp", "key": "Enter", "code": "Enter", "windowsVirtualKeyCode": 13})
            time.sleep(0.3)

        time.sleep(0.6)

        # Screenshot options screen
        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            path = os.path.join(ARTIFACT_DIR, "intro_options_screen.png")
            with open(path, "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved options screen to", path)

        # Now select option 1 ("Explore Anoop's Projects") via pressing key '1'
        print("Selecting option 1 via key '1'...")
        send_command("Input.dispatchKeyEvent", {"type": "keyDown", "key": "1", "code": "Digit1", "windowsVirtualKeyCode": 49})
        send_command("Input.dispatchKeyEvent", {"type": "keyUp", "key": "1", "code": "Digit1", "windowsVirtualKeyCode": 49})

        # Wait for jump & portal transition
        time.sleep(1.6)

        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            path = os.path.join(ARTIFACT_DIR, "portfolio_revealed_docked.png")
            with open(path, "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Saved portfolio revealed to", path)

        ws.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        print("Done.")

if __name__ == "__main__":
    main()

