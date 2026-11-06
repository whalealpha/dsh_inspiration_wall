# -*- coding: utf-8 -*-
import os
"""v0.5 live API test: expectedAt round-trip + openPath guards (local only).

Set IW_BASE if your harness runs on a different port, e.g.
  set IW_BASE=http://127.0.0.1:58530/api/inspiration
"""
import json
import urllib.error
import urllib.request
from datetime import datetime, timedelta

BASE = os.environ.get("IW_BASE", "http://127.0.0.1:58530/api/inspiration")


def rpc(op, payload=None):
    body = json.dumps({"op": op, "payload": payload or {}}, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        f"{BASE}/rpc", data=body, headers={"content-type": "application/json"}, method="POST"
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        return json.loads(error.read().decode("utf-8"))


def state():
    with urllib.request.urlopen(f"{BASE}/state", timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))["value"]


failures = []


def check(label, condition, detail=""):
    if condition:
        print(f"PASS {label}")
    else:
        failures.append(label)
        print(f"FAIL {label}{' — ' + str(detail) if detail else ''}")


today = datetime.now()
expected = (today + timedelta(days=6)).strftime("%Y-%m-%d")

note = {
    "id": "n_v05_probe",
    "title": "v0.5 探针",
    "body": "验证期待实现日期能落盘。",
    "summary": "验证期待实现日期，卡片只显示这一句。",
    "category": "进行中",
    "stars": 4,
    "tags": ["探针"],
    "createdAt": today.isoformat(),
    "expectedAt": expected,
    "media": [],
    "records": [],
}
saved = rpc("saveNote", {"note": note})
check("saveNote returns ok", saved.get("ok") is True, saved.get("error"))
check("expectedAt comes back from save", saved.get("value", {}).get("note", {}).get("expectedAt") == expected,
      saved.get("value", {}).get("note", {}).get("expectedAt"))

stored = state()
probe = next((item for item in stored["notes"] if item["id"] == "n_v05_probe"), None)
check("note is persisted", probe is not None)
check("expectedAt survives a reload", bool(probe) and probe.get("expectedAt") == expected,
      probe.get("expectedAt") if probe else "missing")
check("summary survives a reload", bool(probe) and probe.get("summary", "").startswith("验证期待"))

# every stored note carries the field (migration backfill)
missing = [item["id"] for item in stored["notes"] if "expectedAt" not in item]
check("all notes have an expectedAt field", not missing, ", ".join(missing[:5]))

# --- openPath guards: never touch anything outside the wall's own directories ---
outside = rpc("openPath", {"path": r"C:\Windows\win.ini", "mode": "open"})
check("openPath refuses a path outside the data dirs", outside.get("ok") is False, outside)
check("refusal names the guard", "path-not-allowed" in str(outside.get("error")), outside.get("error"))

absent = rpc("openPath", {"path": os.path.join(os.path.expanduser("~"), ".dsh", "inspiration", "media", "does-not-exist.png"), "mode": "open"})
check("openPath refuses a missing file", absent.get("ok") is False, absent)
check("missing file reports not-found", "not-found" in str(absent.get("error")), absent.get("error"))

# clean up the probe note
rpc("deleteNote", {"id": "n_v05_probe"})
after = state()
check("probe note removed", not any(item["id"] == "n_v05_probe" for item in after["notes"]))

print(f"\n{len(after['notes'])} notes on the wall")
print("all v0.5 API checks passed" if not failures else f"{len(failures)} FAILED: {failures}")