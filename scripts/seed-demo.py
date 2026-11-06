import os
import json
import urllib.request
from datetime import datetime, timedelta

API = os.environ.get("IW_API", "http://127.0.0.1:58530/api/inspiration/rpc")
MEDIA = os.environ.get("IW_MEDIA", os.path.join(os.path.expanduser("~"), ".dsh", "inspiration", "media", "test-upload.png"))


def iso(days_ago=0, hour=9, minute=0):
    now = datetime.now()
    day = now - timedelta(days=days_ago)
    return day.replace(hour=hour, minute=minute, second=0, microsecond=0).astimezone().isoformat()


def record(kind, days_ago, text, url="", label="", implemented_days=None, hour=18):
    item = {
        "id": f"r_seed_{abs(hash((text, days_ago, kind))) % 10**8}",
        "createdAt": iso(days_ago, hour, 12),
        "kind": kind,
        "text": text,
        "implementedAt": iso(implemented_days, 17, 30) if implemented_days is not None else "",
        "results": [{"label": label or url, "url": url}] if url else [],
    }
    return item


def note(payload):
    body = json.dumps({"op": "saveNote", "payload": {"note": payload}}, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(API, data=body, headers={"content-type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=20) as response:
        result = json.loads(response.read().decode("utf-8"))
    return result


notes = [
    dict(
        id="n_demo_01",
        title="把会话上下文画成可缩放的时间轴",
        body="每次工具调用的耗时、token 消耗和缓存命中都铺在一条时间轴上，卡住的地方一眼就能看见。先做一个只读版本。",
        category="进行中", stars=5, tags=["时间轴", "可视化"],
        createdAt=iso(2, 9, 42),
        records=[
            record("progress", 1, "先画了 SVG 草图：左边工具名，中间时间轴，右边状态。宽度 800 以内可读。", hour=21),
            record("progress", 0, "确认要保留缩放：8 秒粒度还能看清每步，压缩到 1 分钟就只剩关键节点。", hour=10),
        ],
    ),
    dict(
        id="n_demo_02",
        title="用 Git 工作树隔离每个实验",
        body="每个想法单独开一个工作树，失败就直接丢掉，不污染主分支。",
        category="已实现", stars=4, tags=["git", "工作流"],
        createdAt=iso(9, 21, 10),
        records=[
            record("complete", 6, "入口收进一条命令后，实验成功率从 60% 提到 90%。脚本放在 tools/experiment.sh。",
                   url="https://github.com/deepseek-ai/deepseek-harness/pull/128", label="PR #128 已合并",
                   implemented_days=6, hour=19),
        ],
    ),
    dict(
        id="n_demo_03",
        title="灵感墙：一条记录装下文字和音视频",
        body="文字、录音、截图、短视频、文件放在同一条记录里，按发生顺序流下来，不需要分栏。",
        category="进行中", stars=3, tags=["设计", "灵感墙"],
        createdAt=iso(3, 14, 20),
        records=[
            record("progress", 0, "把卡片底部的「复盘」入口改成「记录」，任何时候都能追加，不用先完成。", hour=16),
        ],
        media=[dict(id="m_demo_03", type="image", path=MEDIA, mime="image/png", size=109, caption="界面草图.png", duration=0, transcript="")],
    ),
    dict(
        id="n_demo_04",
        title="把每日摘要生成成 5 分钟播客",
        body="早上通勤时听，晚上回来就能直接动手，不用再翻长文。",
        category="未开始", stars=2, tags=["播客"],
        createdAt=iso(4, 8, 5),
        records=[],
    ),
    dict(
        id="n_demo_05",
        title="用星级倒推每周重点",
        body="5 星代表本周就要动手，1 星只是先存着。按星级排序，反过来就能决定这一周做什么。",
        category="未开始", stars=5, tags=["优先级"],
        createdAt=iso(6, 19, 42),
        records=[],
    ),
    dict(
        id="n_demo_06",
        title="快捷指令：说一句话就存进来",
        body="用系统快捷指令录音，转写后直接落到灵感墙，不用先打开 DSH。",
        category="已实现", stars=3, tags=["快捷指令"],
        createdAt=iso(12, 11, 30),
        records=[
            record("complete", 10, "先用 iOS 快捷指令 + 剪贴板做了一版，语音转写用 SenseVoice 本地跑。",
                   url="https://www.icloud.com/shortcuts/inspiration-wall-demo", label="快捷指令 Demo",
                   implemented_days=10, hour=12),
        ],
    ),
    dict(
        id="n_demo_07",
        title="语音转写加一个纠错词典",
        body="SenseVoice 对人名、项目名容易写错，想加一个词典，在转写后做一次替换。",
        category="未开始", stars=4, tags=["语音", "转写"],
        createdAt=iso(1, 16, 5),
        records=[
            record("progress", 0, "先统计了一周转写里的错词，前 20 个都是项目名，词典方案应该够用。", hour=11),
        ],
    ),
    dict(
        id="n_demo_08",
        title="复盘页加一个「本周回顾」",
        body="每周日自动汇总：这周新增几条、完成几条、平均多久出 Demo，点进去能看明细。",
        category="未开始", stars=3, tags=["复盘"],
        createdAt=iso(5, 12, 0),
        records=[],
        media=[dict(id="m_demo_08", type="file", path=MEDIA, mime="image/png", size=109, caption="周报样例.png", duration=0, transcript="")],
    ),
    dict(
        id="n_demo_09",
        title="用间隔重复提醒未实现的灵感",
        body="待验证的想法放久了会沉底，想加一个类似 Anki 的间隔提醒：3 天、7 天、21 天各提醒一次。",
        category="未开始", stars=4, tags=["提醒"],
        createdAt=iso(7, 10, 15),
        records=[
            record("progress", 2, "先把提醒做成统计页里的一个列表，不做系统通知，减少打扰。", hour=15),
        ],
    ),
    dict(
        id="n_demo_10",
        title="灵感墙接入全局搜索",
        body="搜索框里能直接搜到灵感墙里的记录，和会话、文件放在同一个搜索入口。",
        category="已放弃", stars=1, tags=["搜索"],
        createdAt=iso(14, 17, 50),
        records=[],
    ),
]

results = []
for item in notes:
    result = note(item)
    results.append((item["id"], result.get("ok"), result.get("error", "")))
    print(item["id"], "ok" if result.get("ok") else result)

print("seeded", len(results))
