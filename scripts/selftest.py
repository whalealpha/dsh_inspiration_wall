import os
import json
import urllib.request
from datetime import datetime, timedelta

API = os.environ.get("IW_API", "http://127.0.0.1:58530/api/inspiration/rpc")


def rpc(op, payload):
    body = json.dumps({"op": op, "payload": payload}, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(API, data=body, headers={"content-type": "application/json"}, method="POST")
    with urllib.request.urlopen(request, timeout=180) as response:
        return json.loads(response.read().decode("utf-8"))


def state():
    with urllib.request.urlopen(os.environ.get("IW_STATE", "http://127.0.0.1:58530/api/inspiration/state"), timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))["value"]


now = datetime.now()
created = (now - timedelta(days=5)).astimezone().isoformat()
implemented = (now - timedelta(days=2)).astimezone().isoformat()

note = {
    "id": "n_selftest_01",
    "title": "自检：完成流程",
    "body": "自检用，稍后删除。",
    "category": "待验证",
    "stars": 4,
    "tags": ["selftest"],
    "createdAt": created,
    "records": [
        {
            "id": "r_selftest_progress",
            "createdAt": (now - timedelta(days=3)).astimezone().isoformat(),
            "kind": "progress",
            "text": "先做了一版原型，能跑通。",
            "implementedAt": "",
            "results": [],
        }
    ],
    "media": [],
}

first = rpc("saveNote", {"note": note})
print("create:", first.get("ok"), "notes:", len(first["value"]["notes"]))

record = {
    "id": "r_selftest_complete",
    "createdAt": now.astimezone().isoformat(),
    "kind": "complete",
    "text": "自检完成复盘：都跑通了。",
    "implementedAt": implemented,
    "results": [{"label": "Demo 链接", "url": "https://example.com/demo"}],
}
note["category"] = "已实现"
note["records"] = [record] + note["records"]
second = rpc("saveNote", {"note": note})
print("complete:", second.get("ok"))
saved = second["value"]["note"]
print("category:", saved["category"], "records:", [item["kind"] for item in saved["records"]])
print("results:", saved["records"][0]["results"])

current = state()
found = [item for item in current["notes"] if item["id"] == "n_selftest_01"]
if found:
    item = found[0]
    created_at = datetime.fromisoformat(item["createdAt"])
    implemented_at = datetime.fromisoformat(item["records"][0]["implementedAt"])
    print("interval days:", round((implemented_at - created_at).total_seconds() / 86400))

removed = rpc("deleteNote", {"id": "n_selftest_01"})
print("cleanup:", removed.get("ok"), "notes:", len(removed["value"]["notes"]))

# custom usage range
from_day = (now - timedelta(days=29)).strftime("%Y-%m-%d")
to_day = now.strftime("%Y-%m-%d")
usage = rpc("usage", {"from": from_day, "to": to_day})
value = usage["value"]
print("usage:", usage["ok"], "sessions:", value["sessions"], "days:", len(value["days"]), "total:", value["totals"]["total"])
print("first day:", value["days"][0]["date"], "last day:", value["days"][-1]["date"])
print("models:", [model["model"] for model in value["models"]][:4])
