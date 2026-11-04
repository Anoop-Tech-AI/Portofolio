import subprocess
import time
import urllib.request
import json
import base64
import os
import websocket

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
USER_DATA = os.path.join(os.environ.get("TEMP", r"C:\Temp"), "chrome_temp_test")
URL = "http://localhost:4173/"
ARTIFACT_DIR = r"C:\Users\Anoop\.gemini\antigravity\brain\661bce8f-9846-44f7-a27a-236ad3a20f04"

def capture_step(ws, filename):
    msg_id = int(time.time() * 1000) % 100000
    ws.send(json.dumps({"id": msg_id, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
    while True:
        resp = json.loads(ws.recv())
        if resp.get("id") == msg_id:
            data = resp.get("result", {}).get("data")
            if data:
                dest = os.path.join(ARTIFACT_DIR, filename)
                with open(dest, "wb") as f:
                    f.write(base64.b64decode(data))
                print(f"[OK] Saved {dest} ({len(data)} b64 bytes)")
            return

def eval_js(ws, expr):
    msg_id = int(time.time() * 1000) % 100000
    ws.send(json.dumps({"id": msg_id, "method": "Runtime.evaluate", "params": {"expression": expr}}))
    while True:
        resp = json.loads(ws.recv())
        if resp.get("id") == msg_id:
            return resp.get("result", {})

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

        # 1. Capture Skip button & Options by invoking handleAdvanceDialogue directly in React
        print("Capturing arrived state...")
        time.sleep(6.2)
        capture_step(ws, "01_arrived_greeting.png")

        print("Triggering options screen...")
        eval_js(ws, """
          window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        """)
        time.sleep(1.0)
        capture_step(ws, "02_options_screen.png")

        print("Triggering Skip/Option click into portfolio...")
        eval_js(ws, """
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Projects'));
          if (btn) btn.click();
          else {
            const skip = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip'));
            if (skip) skip.click();
          }
        """)
        time.sleep(1.8)
        capture_step(ws, "03_portfolio_docked.png")

        ws.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()

if __name__ == "__main__":
    main()

