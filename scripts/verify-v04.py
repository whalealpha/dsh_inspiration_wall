import os
import json
import urllib.request

BASE = os.environ.get("IW_BASE", "http://127.0.0.1:58530/api/inspiration")


def get(path):
    with urllib.request.urlopen(BASE + path, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def rpc(op, payload=None):
    body = json.dumps({"op": op, "payload": payload or {}}, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(BASE + "/rpc", data=body, headers={"content-type": "application/json"}, method="POST")
    with urllib.request.urlopen(request, timeout=180) as response:
        return json.loads(response.read().decode("utf-8"))


state = get("/state")["value"]
notes = state["notes"]
categories = {}
for note in notes:
    categories[note["category"]] = categories.get(note["category"], 0) + 1
print("notes:", len(notes), "categories:", categories)
print("settings:", state["settings"]["theme"], "priceCache:", state["settings"]["priceCache"])
print("allowed categories:", sorted(set(categories)) == sorted(["未开始", "进行中", "已实现", "已放弃"]))

# record attachment round-trip
note = {
    "id": "n_v04_probe",
    "title": "v0.4 自检",
    "body": "自检记录附件与完成卡片数据。",
    "category": "进行中",
    "stars": 3,
    "tags": [],
    "createdAt": "2026-11-05T10:00:00+08:00",
    "media": [],
    "records": [
        {
            "id": "r_probe_1",
            "createdAt": "2026-11-05T10:05:00+08:00",
            "kind": "progress",
            "text": "带附件的记录",
            "implementedAt": "",
            "results": [],
            "media": [
                {"id": "m_probe", "type": "image", "path": os.path.join(os.path.expanduser("~"), ".dsh", "inspiration", "media", "test-upload.png"), "mime": "image/png", "size": 109, "caption": "截图.png", "duration": 0, "transcript": ""}
            ],
        }
    ],
}
saved = rpc("saveNote", {"note": note})
record = saved["value"]["note"]["records"][0]
print("record media persisted:", len(record.get("media", [])), record.get("media", [{}])[0].get("type"))
print("cleanup:", rpc("deleteNote", {"id": "n_v04_probe"})["ok"])

# token cache clear
print("clearUsageCache:", rpc("clearUsageCache")["ok"])
