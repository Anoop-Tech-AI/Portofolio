import subprocess
import time
import urllib.request
import json
import base64
import os
import websocket

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
USER_DATA = os.path.join(os.environ.get("TEMP", r"C:\Temp"), "chrome_trans_profile")
URL = "http://localhost:4173/"
ARTIFACT_DIR = r"C:\Users\Anoop\.gemini\antigravity\brain\661bce8f-9846-44f7-a27a-236ad3a20f04"

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
    proc = subprocess.Popen(cmd)
    time.sleep(2)

    try:
        req = urllib.request.urlopen("http://localhost:9222/json")
        targets = json.loads(req.read().decode())
        ws = websocket.create_connection(targets[0]["webSocketDebuggerUrl"])

        def send_command(method, params=None):
            msg_id = int(time.time() * 1000) % 100000
            ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        send_command("Page.enable")
        send_command("Runtime.enable")

        print("Page loaded. Triggering Skip Intro to verify transition to portfolio...")
        time.sleep(1.5)

        # Click Skip Intro
        send_command("Runtime.evaluate", {
            "expression": "document.querySelector('button[aria-label=\"Skip Introduction\"]').click()"
        })

        # Wait 1.5s for transition to warm white portfolio and docked mascot
        time.sleep(1.5)

        res = send_command("Page.captureScreenshot", {"format": "png"})
        if "data" in res:
            path = os.path.join(ARTIFACT_DIR, "portfolio_revealed_light_theme.png")
            with open(path, "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print("Successfully saved", path)

        ws.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()
        print("Done.")

if __name__ == "__main__":
    main()

