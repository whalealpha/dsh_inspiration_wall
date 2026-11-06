const CSS = String.raw`
.iw-root {
  --iw-bg: var(--dsw-alias-bg-base, #F2F2F6);
  --iw-surface: var(--dsw-alias-bg-layer-1, #FFFFFF);
  --iw-sunken: var(--dsw-alias-bg-layer-2, #F1F1F4);
  --iw-border: var(--dsw-alias-border-l1, #E6E6EA);
  --iw-border-strong: var(--dsw-alias-border-l2, #D6D6DC);
  --iw-text: var(--dsw-alias-label-primary, #1C1C1E);
  --iw-text2: var(--dsw-alias-label-secondary, #6E6E73);
  --iw-text3: #9A9AA1;
  --iw-accent: var(--dsw-alias-brand-primary, #0A84FF);
  --iw-accent-soft: #EAF2FF;
  --iw-accent-ink: #FFFFFF;
  --iw-star: #FFB020;
  --iw-star-empty: #D9D9DF;
  --iw-shadow: rgba(20, 20, 26, 0.07);
  --iw-hover: rgba(0, 0, 0, 0.035);
  --iw-danger: #FF453A;
  --iw-success: #28A745;
  position: relative;
  display: block;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--iw-bg);
  color: var(--iw-text);
  font-size: 13px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.iw-root * { box-sizing: border-box; }
.iw-root button, .iw-root input, .iw-root textarea, .iw-root select { font-family: inherit; }

/* category chips — 4 states: 未开始 / 进行中 / 已实现 / 已放弃 */
.iw-cat { display: inline-flex; align-items: center; gap: 6px; height: 21px; padding: 0 9px; border-radius: 11px; font-size: 10.5px; font-weight: 600; white-space: nowrap; }
.iw-cat-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.iw-cat-0 { color: #8E8E93; background: #F1F1F5; }
.iw-cat-1 { color: #F08C00; background: #FFF4E4; }
.iw-cat-2 { color: #28A745; background: #E9F8EE; }
.iw-cat-3 { color: #9A9AA1; background: #F5F5F7; }

/* page */
.iw-page { max-width: 1280px; margin: 0 auto; padding: 30px 34px 90px; }
.iw-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
.iw-title { margin: 0; font-size: 28px; font-weight: 650; letter-spacing: -0.4px; line-height: 1.2; }
.iw-subtitle { margin: 6px 0 0; font-size: 12px; color: var(--iw-text2); }
.iw-head-actions { display: flex; align-items: center; gap: 10px; padding-top: 6px; }
.iw-search { display: flex; align-items: center; gap: 7px; height: 34px; padding: 0 12px; border-radius: 17px; background: var(--iw-sunken); min-width: 176px; }
.iw-search input { border: none; background: transparent; outline: none; color: var(--iw-text); font-size: 12px; width: 100%; }
.iw-search input::placeholder { color: var(--iw-text3); }

.iw-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 17px; border: 1px solid transparent; background: transparent; color: var(--iw-text); font-size: 12.5px; font-weight: 550; cursor: pointer; white-space: nowrap; transition: background .15s ease, border-color .15s ease, opacity .15s ease; }
.iw-btn:hover { background: var(--iw-hover); }
.iw-btn-primary { background: var(--iw-text); color: var(--iw-surface); }
.iw-btn-primary:hover { background: var(--iw-text); opacity: 0.9; }
.iw-btn-ghost { border-color: var(--iw-border); color: var(--iw-text2); }
.iw-btn-ghost:hover { background: var(--iw-hover); }
.iw-btn-danger { color: var(--iw-danger); }
.iw-btn-sm { height: 28px; padding: 0 11px; font-size: 11.5px; border-radius: 14px; }
.iw-btn:disabled { opacity: .45; cursor: default; }
.iw-icon-btn { width: 32px; height: 32px; border: none; border-radius: 50%; background: transparent; color: var(--iw-text2); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
.iw-icon-btn:hover { background: var(--iw-hover); color: var(--iw-text); }

.iw-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; background-clip: padding-box; }
.iw-dot.is-on { border-color: var(--iw-accent); }

.iw-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 22px 0 18px; }
.iw-toolbar .iw-spacer { flex: 1; }
.iw-seg { display: inline-flex; padding: 3px; border-radius: 9px; background: var(--iw-sunken); }
.iw-seg button { height: 26px; padding: 0 13px; border: none; background: transparent; border-radius: 7px; font-size: 11.5px; font-weight: 550; color: var(--iw-text2); cursor: pointer; }
.iw-seg button.is-on { background: var(--iw-surface); color: var(--iw-text); box-shadow: 0 1px 2px rgba(0, 0, 0, .1); }
.iw-chip { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px; border-radius: 14px; border: 1px solid var(--iw-border); background: transparent; color: var(--iw-text2); font-size: 11.5px; cursor: pointer; white-space: nowrap; }
.iw-chip:hover { background: var(--iw-hover); }
.iw-chip.is-on { background: var(--iw-text); border-color: transparent; color: var(--iw-surface); }
.iw-chip .iw-count { font-size: 10px; opacity: .6; }

/* grid + cards */
.iw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; align-items: start; }
.iw-card { position: relative; display: flex; flex-direction: column; gap: 9px; padding: 18px; border-radius: 16px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 1px 2px var(--iw-shadow); cursor: pointer; transition: transform .16s ease, box-shadow .16s ease; text-align: left; color: var(--iw-text); }
.iw-card:hover { transform: translateY(-1px); box-shadow: 0 10px 26px var(--iw-shadow); }
.iw-card-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.iw-card-date { font-size: 10.5px; color: var(--iw-text3); }
.iw-card-title { margin: 1px 0 0; font-size: 15.5px; font-weight: 640; line-height: 1.42; letter-spacing: -0.1px; }
.iw-card-body { margin: 0; font-size: 11.8px; line-height: 1.7; color: var(--iw-text2); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.iw-card-foot { display: flex; align-items: center; flex-wrap: wrap; justify-content: space-between; gap: 8px; padding-top: 10px; border-top: 1px solid var(--iw-border); margin-top: 2px; }
.iw-card-foot .iw-card-meta { flex: 1 1 auto; min-width: 0; text-align: right; }
.iw-card-foot .iw-btn { margin-left: auto; }
.iw-card-meta { font-size: 10px; color: var(--iw-text3); white-space: nowrap; }
.iw-review-mini { display: flex; flex-direction: column; gap: 0; margin-top: 2px; padding: 10px 0 0; border-radius: 0; background: transparent; border-top: 1px solid var(--iw-hairline); }
.iw-review-mini .iw-timeline-head { justify-content: flex-start; gap: 6px; font-size: 12px; color: var(--iw-text3); }
.iw-review-mini .iw-timeline-kind { padding: 0; border-radius: 0; background: transparent; color: var(--iw-text3); font-size: 12px; font-weight: 400; }
.iw-review-link { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; color: var(--iw-accent); font-weight: 550; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-decoration: none; }
.iw-review-text { font-size: 10.5px; line-height: 1.6; color: var(--iw-text2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.iw-review-meta { font-size: 9.5px; color: var(--iw-text3); }

/* stars */
.iw-stars { display: inline-flex; align-items: center; gap: 2px; }
.iw-stars svg { display: block; }
.iw-stars.is-input svg { cursor: pointer; }

/* media */
.iw-media-strip { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.iw-thumb { position: relative; width: 86px; height: 56px; border-radius: 9px; overflow: hidden; background: var(--iw-sunken); flex: none; display: block; }
.iw-thumb img, .iw-thumb video { width: 100%; height: 100%; object-fit: cover; display: block; }
.iw-thumb-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, .28); color: #fff; }
.iw-thumb-tag { position: absolute; left: 5px; bottom: 5px; padding: 1px 6px; border-radius: 6px; background: rgba(0, 0, 0, .55); color: #fff; font-size: 8px; font-weight: 500; }
.iw-audio { display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 11px; border-radius: 10px; background: var(--iw-sunken); flex: 1 1 150px; min-width: 140px; }
.iw-audio-play { width: 26px; height: 26px; border-radius: 50%; border: none; background: var(--iw-text); color: var(--iw-surface); display: flex; align-items: center; justify-content: center; cursor: pointer; flex: none; }
.iw-audio-play svg { display: block; }
.iw-wave { display: flex; align-items: center; gap: 2px; height: 24px; flex: 1; overflow: hidden; }
.iw-wave i { display: block; width: 2px; border-radius: 1px; background: var(--iw-text3); flex: none; }
.iw-audio-time { font-size: 9.5px; color: var(--iw-text2); white-space: nowrap; flex: none; }
.iw-audio-progress { height: 2px; border-radius: 1px; background: var(--iw-accent); }
.iw-media-caption { margin: 5px 0 0; font-size: 9.5px; color: var(--iw-text3); }
.iw-transcript { margin: 6px 0 0; padding: 8px 10px; border-radius: 8px; background: var(--iw-sunken); font-size: 10.5px; line-height: 1.55; color: var(--iw-text2); }

/* overview / insights */
.iw-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.iw-kpi { padding: 15px 17px; border-radius: 14px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 1px 2px var(--iw-shadow); }
.iw-kpi-label { font-size: 10px; color: var(--iw-text2); }
.iw-kpi-value { margin-top: 6px; font-size: 25px; font-weight: 650; letter-spacing: -0.5px; line-height: 1.1; }
.iw-kpi-value small { font-size: 10.5px; font-weight: 500; color: var(--iw-text2); margin-left: 3px; letter-spacing: 0; }
.iw-kpi-delta { display: inline-block; margin-top: 7px; padding: 2px 8px; border-radius: 8px; background: var(--iw-sunken); color: var(--iw-text2); font-size: 9.5px; }
.iw-kpi-delta.good { background: rgba(40, 167, 69, .12); color: var(--iw-success); }
.iw-chart-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 14px; }
.iw-panel { padding: 16px 18px 12px; border-radius: 14px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 1px 2px var(--iw-shadow); }
.iw-panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.iw-panel-title { font-size: 12px; font-weight: 640; }
.iw-panel-sub { margin-top: 3px; font-size: 9.5px; color: var(--iw-text3); }
.iw-panel-note { font-size: 9.5px; color: var(--iw-text2); }
.iw-chart { margin-top: 6px; }
.iw-chart svg { display: block; width: 100%; height: auto; overflow: visible; }
.iw-legend { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; font-size: 9.5px; color: var(--iw-text2); }
.iw-legend i { display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 5px; }
.iw-legend .iw-legend-line { width: 12px; height: 2px; border-radius: 1px; display: inline-block; margin-right: 5px; vertical-align: middle; }
.iw-rows { display: flex; flex-direction: column; }
.iw-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--iw-border); font-size: 11px; }
.iw-row:first-child { border-top: none; }
.iw-row-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iw-row-muted { color: var(--iw-text3); font-size: 9.5px; white-space: nowrap; }
.iw-row-right { color: var(--iw-text2); font-size: 10px; white-space: nowrap; }
.iw-link { color: var(--iw-accent); cursor: pointer; text-decoration: none; font-size: 10.5px; font-weight: 550; background: none; border: none; padding: 0; }
.iw-link:hover { text-decoration: underline; }
.iw-tabs { display: flex; gap: 22px; margin-top: 14px; border-bottom: 1px solid var(--iw-border); }
.iw-tab { position: relative; padding: 0 1px 10px; border: none; background: none; font-size: 11.5px; font-weight: 550; color: var(--iw-text2); cursor: pointer; }
.iw-tab.is-on { color: var(--iw-text); }
.iw-tab.is-on::after { content: ''; position: absolute; left: -1px; right: -1px; bottom: -1px; height: 2px; border-radius: 1px; background: var(--iw-text); }
.iw-health { display: flex; gap: 8px; align-items: flex-start; padding: 11px 13px; border-radius: 12px; background: var(--iw-sunken); font-size: 10.5px; line-height: 1.6; color: var(--iw-text2); }

/* modal */
.iw-overlay { position: fixed; inset: 0; z-index: 400; display: flex; align-items: center; justify-content: center; padding: 30px; background: rgba(10, 10, 14, .42); }
.iw-modal { width: min(960px, 100%); max-height: calc(100vh - 60px); overflow: auto; padding: 28px 32px 26px; border-radius: 22px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 30px 90px rgba(0, 0, 0, .38); color: var(--iw-text); }
.iw-modal-sm { width: min(620px, 100%); }
.iw-modal-md { width: min(760px, 100%); }
.iw-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.iw-modal-title { margin: 0; font-size: 19px; font-weight: 650; letter-spacing: -0.2px; }
.iw-modal-date { font-size: 10.5px; color: var(--iw-text3); }
.iw-section { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--iw-border); }
.iw-section-label { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; font-size: 11px; font-weight: 640; }
.iw-field { display: flex; flex-direction: column; gap: 6px; }
.iw-field-label { font-size: 10px; color: var(--iw-text2); }
.iw-input, .iw-textarea, .iw-select { width: 100%; padding: 9px 12px; border-radius: 10px; border: 1px solid var(--iw-border); background: var(--iw-surface); color: var(--iw-text); font-size: 12.5px; outline: none; }
.iw-input:focus, .iw-textarea:focus, .iw-select:focus { border-color: var(--iw-accent); box-shadow: 0 0 0 3px var(--iw-accent-soft); }
.iw-textarea { resize: vertical; min-height: 72px; line-height: 1.65; }
.iw-title-input { font-size: 18px; font-weight: 640; padding: 6px 2px 10px; border: none; border-bottom: 1px solid var(--iw-border); border-radius: 0; }
.iw-title-input:focus { box-shadow: none; border-color: var(--iw-accent); }
.iw-modal-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--iw-border); }
.iw-modal-foot .iw-hint { font-size: 9.5px; color: var(--iw-text3); }
.iw-btn-row { display: flex; align-items: center; gap: 8px; }
.iw-attach-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.iw-attach-btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 10px; border: 1px dashed var(--iw-border-strong); background: transparent; color: var(--iw-text2); font-size: 11px; cursor: pointer; }
.iw-attach-btn:hover { background: var(--iw-hover); color: var(--iw-text); }
.iw-file-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.iw-file { position: relative; width: 132px; border-radius: 10px; border: 1px solid var(--iw-border); background: var(--iw-sunken); padding: 8px; font-size: 9.5px; color: var(--iw-text2); }
.iw-file .iw-thumb { width: 100%; height: 64px; }
.iw-file-remove { position: absolute; top: 4px; right: 4px; width: 20px; height: 20px; border-radius: 50%; border: none; background: rgba(0, 0, 0, .55); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.iw-recording { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--iw-sunken); font-size: 11px; }
.iw-rec-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--iw-danger); animation: iw-pulse 1.1s ease-in-out infinite; }
@keyframes iw-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
.iw-settings-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid var(--iw-border); }
.iw-settings-row:first-of-type { border-top: none; }
.iw-settings-label { font-size: 11.5px; font-weight: 550; }
.iw-settings-desc { margin-top: 3px; font-size: 9.5px; color: var(--iw-text3); max-width: 420px; }
.iw-path { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 9.5px; color: var(--iw-text2); background: var(--iw-sunken); padding: 4px 8px; border-radius: 6px; word-break: break-all; }
.iw-price-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.iw-toggle { width: 38px; height: 22px; border-radius: 11px; border: none; background: var(--iw-border-strong); position: relative; cursor: pointer; padding: 0; }
.iw-toggle.is-on { background: var(--iw-accent); }
.iw-toggle::after { content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .15s ease; }
.iw-toggle.is-on::after { transform: translateX(16px); }
.iw-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 70px 20px; border-radius: 18px; border: 1px dashed var(--iw-border-strong); color: var(--iw-text2); text-align: center; }
.iw-empty-title { font-size: 15px; font-weight: 620; color: var(--iw-text); }
.iw-toast { position: fixed; left: 50%; bottom: 34px; transform: translateX(-50%); z-index: 500; padding: 10px 18px; border-radius: 12px; background: var(--iw-text); color: var(--iw-surface); font-size: 11.5px; box-shadow: 0 10px 30px rgba(0, 0, 0, .3); }
.iw-spinner { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--iw-border); border-top-color: var(--iw-accent); animation: iw-spin .8s linear infinite; }
@keyframes iw-spin { to { transform: rotate(360deg); } }
.iw-center { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 60px; color: var(--iw-text2); }
.iw-muted { color: var(--iw-text3); }
.iw-small { font-size: 10px; }
.iw-divider { height: 1px; background: var(--iw-border); margin: 14px 0; }
.iw-token-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 9.5px; color: var(--iw-text3); }
.iw-token-bar { height: 8px; border-radius: 4px; background: var(--iw-sunken); overflow: hidden; }
.iw-token-bar i { display: block; height: 100%; border-radius: 4px; background: var(--iw-accent); }
.iw-inline { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

@media (max-width: 980px) {
  .iw-page { padding: 22px 20px 70px; }
  .iw-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .iw-chart-grid { grid-template-columns: 1fr; }
  .iw-head { flex-direction: column; align-items: stretch; }
  .iw-head-actions { flex-wrap: wrap; }
}

/* status bar + more categories */
.iw-status-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.iw-status-label { font-size: 10px; color: var(--iw-text2); min-width: 30px; }
.iw-more-select { height: 28px; border-radius: 14px; border: 1px solid var(--iw-border); background: transparent; color: var(--iw-text2); font-size: 11.5px; padding: 0 8px; cursor: pointer; }
.iw-more-select:focus { outline: none; border-color: var(--iw-accent); }

/* records timeline */
.iw-timeline { display: flex; flex-direction: column; }
.iw-timeline-item { display: flex; gap: 10px; padding: 10px 0; border-top: 1px solid var(--iw-border); }
.iw-timeline-item:first-child { border-top: none; }
.iw-timeline-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex: none; background: var(--iw-accent); }
.iw-timeline-dot.is-complete { background: var(--iw-success); }
.iw-timeline-body { flex: 1; min-width: 0; }
.iw-timeline-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 9.5px; color: var(--iw-text3); }
.iw-timeline-text { margin-top: 4px; font-size: 11.5px; line-height: 1.7; color: var(--iw-text2); white-space: pre-wrap; word-break: break-word; }
.iw-timeline-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
.iw-timeline-kind { display: inline-flex; align-items: center; gap: 4px; padding: 1px 7px; border-radius: 7px; font-size: 9px; font-weight: 600; background: var(--iw-accent-soft); color: var(--iw-accent); }
.iw-timeline-kind.is-complete { background: rgba(40, 167, 69, .14); color: var(--iw-success); }

/* file chips */
.iw-filechip { display: inline-flex; align-items: center; gap: 7px; max-width: 100%; padding: 8px 10px; border-radius: 9px; background: var(--iw-sunken); color: var(--iw-text2); font-size: 10px; text-decoration: none; border: none; cursor: pointer; }
.iw-filechip:hover { background: var(--iw-hover); color: var(--iw-text); }
.iw-filechip-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 160px; }
.iw-filechip-size { color: var(--iw-text3); flex: none; font-size: 9px; }
.iw-file-list-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }

/* complete modal links */
.iw-link-rows { display: flex; flex-direction: column; gap: 8px; }
.iw-link-row { display: flex; gap: 8px; align-items: center; }
.iw-link-row .iw-input { flex: 1; }
.iw-link-remove { flex: none; }

/* usage page */
.iw-usage-bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
.iw-usage-range { display: flex; align-items: center; gap: 8px; }
.iw-date-input { height: 30px; border-radius: 9px; border: 1px solid var(--iw-border); background: var(--iw-surface); color: var(--iw-text); font-size: 11px; padding: 0 8px; }
.iw-usage-model { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px solid var(--iw-border); font-size: 10.5px; }
.iw-usage-model:first-child { border-top: none; }
.iw-usage-model-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--iw-text); }
.iw-usage-model-bar { width: 150px; height: 8px; border-radius: 4px; background: var(--iw-sunken); overflow: hidden; flex: none; }
.iw-usage-model-bar i { display: block; height: 100%; border-radius: 4px; background: var(--iw-accent); }
.iw-usage-model-num { width: 70px; text-align: right; color: var(--iw-text2); flex: none; }
.iw-usage-model-cost { width: 70px; text-align: right; color: var(--iw-text3); flex: none; }
.iw-usage-day { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-top: 1px solid var(--iw-border); font-size: 10px; color: var(--iw-text2); }
.iw-usage-day:first-child { border-top: none; }
.iw-usage-day-date { width: 84px; flex: none; color: var(--iw-text3); }
.iw-usage-day-num { flex: 1; text-align: right; }
.iw-usage-day-cost { width: 80px; text-align: right; color: var(--iw-text3); flex: none; }
.iw-usage-note { margin-top: 10px; font-size: 9.5px; line-height: 1.7; color: var(--iw-text3); }

/* completion card in detail (standalone, not beside close) */
.iw-complete-card { display: flex; align-items: center; gap: 14px; width: 100%; margin-top: 20px; padding: 16px 18px; border-radius: 16px; border: 1px solid var(--iw-accent); background: linear-gradient(120deg, var(--iw-accent-soft), transparent 70%); color: var(--iw-text); cursor: pointer; text-align: left; transition: transform .15s ease, box-shadow .15s ease; }
.iw-complete-card:hover { transform: translateY(-1px); box-shadow: 0 10px 26px var(--iw-shadow); }
.iw-complete-card-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--iw-accent); color: var(--iw-accent-ink, #0E1013); flex: none; }
.iw-complete-card-body { flex: 1; min-width: 0; }
.iw-complete-card-title { font-size: 13px; font-weight: 650; }
.iw-complete-card-sub { margin-top: 2px; font-size: 10px; color: var(--iw-text2); }
.iw-complete-card.is-done { border-color: var(--iw-border); background: var(--iw-sunken); cursor: default; }
.iw-complete-card.is-done .iw-complete-card-icon { background: var(--iw-success); color: #fff; }
.iw-complete-card.is-done:hover { transform: none; box-shadow: none; }

/* record attachments */
.iw-record-attach { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.iw-record-media { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.iw-record-media .iw-thumb { width: 88px; height: 60px; }
.iw-record-media .iw-audio { height: 44px; min-width: 180px; }
.iw-record-media .iw-filechip { font-size: 9.5px; }

/* storage + paths entry inside insights */
.iw-storage { margin-top: 14px; }
.iw-storage-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 6px 0; }
.iw-storage-label { font-size: 10px; color: var(--iw-text2); width: 74px; flex: none; }
.iw-storage-path { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 9.5px; color: var(--iw-text2); background: var(--iw-sunken); padding: 4px 8px; border-radius: 6px; word-break: break-all; flex: 1; min-width: 0; }

/* ---------------------------------------------------------- drag & drop */
.iw-drop-wrap { position: relative; }
.iw-drop-overlay {
  position: absolute; inset: -10px; z-index: 6; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px; text-align: center;
  border: 1.5px dashed var(--iw-accent); border-radius: 16px;
  background: color-mix(in srgb, var(--iw-surface) 88%, var(--iw-accent));
  color: var(--iw-text); pointer-events: none;
}
.iw-drop-overlay-title { font-size: 13px; font-weight: 640; }
.iw-drop-overlay-sub { font-size: 10px; color: var(--iw-text2); }
.iw-drop-overlay-icon {
  display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;
  border-radius: 50%; background: var(--iw-accent-soft); color: var(--iw-accent);
}
.iw-attach-row.is-drag .iw-attach-btn { border-color: var(--iw-accent); color: var(--iw-accent); }

/* ------------------------------------------------------------ voice box */
.iw-voice {
  grid-column: 1 / -1; display: flex; flex-direction: column; gap: 8px;
  padding: 12px; border-radius: 12px; background: var(--iw-sunken);
  border: 1px solid var(--iw-border);
}
.iw-voice-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.iw-voice-head .iw-audio { flex: 1 1 200px; background: var(--iw-surface); }
.iw-voice-label { font-size: 9.5px; font-weight: 600; color: var(--iw-text2); display: flex; align-items: center; gap: 6px; }
.iw-voice-note { font-size: 9px; color: var(--iw-text3); }
.iw-voice-text { min-height: 66px !important; font-size: 11.5px !important; background: var(--iw-surface) !important; }
.iw-voice-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

/* --------------------------------------------------------- summary card */
.iw-summary-box {
  margin-top: 12px; padding: 12px 14px; border-radius: 12px;
  background: var(--iw-accent-soft); border: 1px solid transparent;
}
.iw-summary-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
.iw-summary-title { display: flex; align-items: center; gap: 6px; font-size: 9.5px; font-weight: 640; color: var(--iw-accent); }
.iw-summary-text { font-size: 11.5px; line-height: 1.7; color: var(--iw-text); white-space: pre-wrap; }
.iw-summary-text.is-empty { color: var(--iw-text3); }
.iw-summary .iw-textarea { min-height: 62px; background: var(--iw-surface); }
.iw-card-summary { margin: 0; font-size: 11.8px; line-height: 1.7; color: var(--iw-text2); }
.iw-card-summary-label {
  display: inline-flex; align-items: center; gap: 4px; margin-bottom: 3px;
  font-size: 9px; font-weight: 600; color: var(--iw-accent);
}

/* ------------------------------------------------------- expected date */
.iw-expect { min-width: 240px; }
.iw-expect-box {
  display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 10px;
  border-radius: 10px; border: 1px solid var(--iw-accent);
  background: var(--iw-accent-soft); color: var(--iw-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--iw-accent) 12%, transparent);
}
.iw-expect-box.is-empty { border-color: var(--iw-border-strong); background: var(--iw-surface); color: var(--iw-text3); box-shadow: none; }
.iw-expect-box input {
  border: none; background: transparent; outline: none; color: var(--iw-text);
  font-size: 11.5px; font-family: inherit; flex: 1; min-width: 0; padding: 0;
}
.iw-expect-box input::-webkit-calendar-picker-indicator { cursor: pointer; opacity: .55; }
.iw-expect-clear {
  border: none; background: transparent; color: var(--iw-text3); cursor: pointer;
  display: inline-flex; align-items: center; padding: 0; flex: none;
}
.iw-expect-clear:hover { color: var(--iw-danger); }
.iw-expect-hint { font-size: 9.5px; color: var(--iw-text3); }
.iw-expect-hint.is-soon { color: var(--iw-star); }
.iw-expect-hint.is-overdue { color: var(--iw-danger); }
.iw-expect-chip {
  display: inline-flex; align-items: center; gap: 5px; height: 21px; padding: 0 9px;
  border-radius: 11px; font-size: 10px; font-weight: 600; white-space: nowrap;
  background: var(--iw-accent-soft); color: var(--iw-accent);
}
.iw-expect-chip.is-soon { background: color-mix(in srgb, var(--iw-star) 16%, transparent); color: var(--iw-star); }
.iw-expect-chip.is-overdue { background: color-mix(in srgb, var(--iw-danger) 14%, transparent); color: var(--iw-danger); }
.iw-expect-chip.is-done { background: var(--iw-sunken); color: var(--iw-text3); }

/* ------------------------------------------------------- context menu */
.iw-ctx {
  position: fixed; z-index: 620; min-width: 190px; padding: 5px;
  border-radius: 11px; border: 1px solid var(--iw-border);
  background: var(--iw-surface); box-shadow: 0 14px 40px rgba(0, 0, 0, .26);
  animation: iw-ctx-in .1s ease-out;
}
@keyframes iw-ctx-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.iw-ctx-item {
  display: flex; align-items: center; gap: 8px; width: 100%; padding: 7px 9px;
  border: none; border-radius: 7px; background: transparent; color: var(--iw-text);
  font-size: 11px; font-family: inherit; text-align: left; cursor: pointer;
}
.iw-ctx-item:hover { background: var(--iw-hover); }
.iw-ctx-item.is-danger { color: var(--iw-danger); }
.iw-ctx-item:disabled { opacity: .4; cursor: default; }
.iw-ctx-sep { height: 1px; margin: 4px 6px; background: var(--iw-border); }
.iw-ctx-title { padding: 5px 9px 6px; font-size: 9px; color: var(--iw-text3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px; }

/* ----------------------------------------------------------- lightbox */
.iw-lightbox {
  position: fixed; inset: 0; z-index: 640; display: flex; align-items: center; justify-content: center;
  padding: 40px; background: rgba(8, 8, 12, .82); backdrop-filter: blur(6px);
}
.iw-lightbox-inner { width: min(1080px, 100%); max-height: 100%; display: flex; flex-direction: column; gap: 10px; }
.iw-lightbox-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #fff; }
.iw-lightbox-title { font-size: 11.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iw-lightbox-actions { display: flex; align-items: center; gap: 8px; flex: none; }
.iw-lightbox-body {
  flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center;
  border-radius: 14px; overflow: hidden; background: rgba(255, 255, 255, .04);
}
.iw-lightbox-body img { max-width: 100%; max-height: 78vh; object-fit: contain; display: block; }
.iw-lightbox-body video { max-width: 100%; max-height: 78vh; display: block; }
.iw-lightbox-body .iw-audio { background: rgba(255, 255, 255, .1); min-width: 420px; }
.iw-lightbox-body .iw-audio-time { color: rgba(255, 255, 255, .8); }
.iw-lightbox-file {
  display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 48px 24px; color: #fff; text-align: center;
}
.iw-lightbox-btn {
  display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px;
  border-radius: 15px; border: 1px solid rgba(255, 255, 255, .22); background: rgba(255, 255, 255, .1);
  color: #fff; font-size: 11px; font-family: inherit; cursor: pointer;
}
.iw-lightbox-btn:hover { background: rgba(255, 255, 255, .18); }

/* previewable attachments */
.iw-attach-item { position: relative; }
.iw-attach-item.is-previewable { cursor: zoom-in; }
.iw-attach-item .iw-attach-hint {
  position: absolute; right: 6px; top: 6px; display: flex; align-items: center; gap: 4px;
  padding: 2px 6px; border-radius: 7px; background: rgba(0, 0, 0, .5); color: #fff;
  font-size: 8.5px; opacity: 0; transition: opacity .15s ease; pointer-events: none;
}
.iw-attach-item:hover .iw-attach-hint { opacity: 1; }

/* ===========================================================================
 * v0.6 — wall main area, polished
 * Every colour here comes from the Harness alias tokens above, so the wall and
 * the rest of the application always render the same palette. The only local
 * decisions are rhythm, radii and the recording-tape moment.
 * ========================================================================= */
.iw-root {
  --iw-hairline: var(--iw-border);
  --iw-text3: color-mix(in srgb, var(--iw-text2) 72%, transparent);
  --iw-accent-soft: color-mix(in srgb, var(--iw-accent) 12%, transparent);
  --iw-accent-ink: color-mix(in srgb, var(--iw-accent) 78%, var(--iw-text));
  --iw-mono: ui-monospace, "Cascadia Mono", "SF Mono", Consolas, "Courier New", monospace;
  --iw-shadow: none;
  --iw-shadow-pop: 0 8px 24px rgba(31, 27, 22, .08);
  /* The tape is a media object, not an ink stamp: it is tinted from the active
     palette accent so it moves with the theme instead of staying black. */
  --iw-tape: color-mix(in srgb, var(--iw-accent) 9%, var(--iw-surface));
  --iw-tape-edge: color-mix(in srgb, var(--iw-accent) 22%, transparent);
  --iw-tape-ink: color-mix(in srgb, var(--iw-accent) 78%, var(--iw-text));
  --iw-tape-wave: color-mix(in srgb, var(--iw-accent) 88%, var(--iw-text));
  --iw-tape-mute: color-mix(in srgb, var(--iw-text) 20%, transparent);
  --iw-tape-line: color-mix(in srgb, var(--iw-accent) 40%, transparent);
  --iw-tape-label: color-mix(in srgb, var(--iw-text) 52%, transparent);
  font-variant-numeric: tabular-nums;
}
.iw-root[data-scheme="dark"] {
  /* On a dark page a flat ink block reads as a hole. Lift it off the card and
     let the palette accent tint both the surface and the waveform. */
  --iw-tape: color-mix(in srgb, var(--iw-accent) 14%, var(--iw-surface));
  --iw-tape-edge: color-mix(in srgb, var(--iw-accent) 30%, transparent);
  --iw-tape-ink: color-mix(in srgb, var(--iw-accent) 82%, var(--iw-text));
  --iw-tape-wave: var(--iw-accent);
  --iw-tape-mute: color-mix(in srgb, var(--iw-text) 24%, transparent);
  --iw-tape-line: color-mix(in srgb, var(--iw-accent) 46%, transparent);
  --iw-tape-label: color-mix(in srgb, var(--iw-text) 50%, transparent);
  --iw-shadow-pop: 0 8px 24px rgba(0, 0, 0, .48);
}
.iw-num, .iw-mono { font-family: var(--iw-mono); font-variant-numeric: tabular-nums; }

/* ---------------------------------------------------------------- page head */
.iw-page { padding: 36px 44px 52px; max-width: 1520px; margin: 0 auto; }
.iw-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 30px; }
.iw-title { margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0; color: var(--iw-text); }
.iw-subtitle { margin: 8px 0 0; font-size: 13px; color: var(--iw-text2); }
.iw-subtitle .iw-num { font-size: 12px; }
.iw-head-actions { display: flex; align-items: center; gap: 16px; }
.iw-search {
  display: flex; align-items: center; gap: 8px; width: 250px; height: 36px; padding: 0 12px;
  border-radius: 10px; background: var(--iw-sunken); color: var(--iw-text3);
}
.iw-search input {
  flex: 1; min-width: 0; border: 0; outline: 0; background: transparent;
  color: var(--iw-text); font-size: 13px;
}
.iw-search input::placeholder { color: var(--iw-text3); }
.iw-search:focus-within { box-shadow: inset 0 0 0 1px var(--iw-border-strong); }

/* appearance button + palette popover */
.iw-appearance { position: relative; display: flex; align-items: center; gap: 8px; }
.iw-appearance-btn {
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  border: 0; border-radius: 10px; background: transparent; color: var(--iw-text3); cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.iw-appearance-btn:hover, .iw-appearance-btn.is-on { background: var(--iw-sunken); color: var(--iw-text); }
.iw-popover {
  position: absolute; right: 0; top: 44px; z-index: 40; width: 208px; padding: 12px;
  border-radius: 12px; background: var(--iw-surface); border: 1px solid var(--iw-hairline);
  box-shadow: var(--iw-shadow-pop);
}
.iw-popover-label { font-size: 12px; color: var(--iw-text3); margin: 2px 0 10px; }
.iw-palette-row {
  display: flex; align-items: center; gap: 10px; width: 100%; padding: 6px 6px;
  border: 0; border-radius: 8px; background: transparent; color: var(--iw-text);
  font-size: 13px; text-align: left; cursor: pointer;
}
.iw-palette-row:hover { background: var(--iw-sunken); }
.iw-palette-dot {
  width: 16px; height: 16px; flex: none; border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--iw-border-strong);
}
.iw-palette-row.is-on .iw-palette-dot { box-shadow: 0 0 0 2px var(--iw-surface), 0 0 0 3px var(--iw-accent); }
.iw-palette-row.is-on { color: var(--iw-text); font-weight: 500; }
.iw-popover-sep { height: 1px; margin: 8px 4px; background: var(--iw-hairline); }

/* primary button: inverted surface, amber glyph */
.iw-btn { height: 32px; padding: 0 12px; border-radius: 10px; font-size: 13px; font-weight: 500; }
.iw-btn-primary { background: var(--iw-text); color: var(--iw-bg); border: 0; }
.iw-btn-primary:hover { background: color-mix(in srgb, var(--iw-text) 88%, var(--iw-bg)); }
.iw-btn-primary svg { color: var(--iw-accent); }
.iw-head-actions .iw-btn-primary { height: 36px; padding: 0 14px; font-size: 13.5px; }
.iw-btn-ghost { background: var(--iw-surface); color: var(--iw-text); border: 1px solid var(--iw-hairline); }
.iw-btn-ghost:hover { background: var(--iw-sunken); }
.iw-btn-sm { height: 32px; padding: 0 12px; font-size: 13px; }
.iw-icon-btn { width: 36px; height: 36px; border-radius: 10px; border: 0; background: transparent; color: var(--iw-text3); }
.iw-icon-btn:hover { background: var(--iw-sunken); color: var(--iw-text); }

/* -------------------------------------------------------------- filter row */
.iw-toolbar { display: flex; align-items: center; gap: 6px; margin-bottom: 24px; flex-wrap: wrap; }
.iw-seg { display: inline-flex; align-items: center; gap: 4px; }
.iw-seg button {
  height: 30px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent;
  color: var(--iw-text2); font-size: 13px; cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.iw-seg button:hover { background: var(--iw-sunken); }
.iw-seg button.is-on { background: var(--iw-sunken); color: var(--iw-text); font-weight: 500; }
.iw-toolbar .iw-seg { margin-right: 10px; }
.iw-chip {
  height: 30px; display: inline-flex; align-items: center; gap: 5px; padding: 0 10px;
  border: 0; border-radius: 8px; background: transparent; color: var(--iw-text2);
  font-size: 13px; cursor: pointer; transition: background-color .15s ease, color .15s ease;
}
.iw-chip:hover { background: var(--iw-sunken); }
.iw-chip.is-on {
  background: var(--iw-sunken); color: var(--iw-text); font-weight: 500;
  box-shadow: inset 0 0 0 1px var(--iw-hairline);
}
.iw-chip .iw-count { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-text3); }
.iw-spacer { flex: 1; }
.iw-toolbar .iw-btn-sm { border: 1px solid var(--iw-hairline); background: var(--iw-surface); }
.iw-toolbar .iw-btn-sm svg { color: var(--iw-text3); }

/* -------------------------------------------------------------------- cards */
.iw-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: start; }
.iw-col { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
@media (max-width: 1240px) { .iw-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 880px) { .iw-grid { grid-template-columns: minmax(0, 1fr); } }

.iw-card {
  padding: 20px; border-radius: 12px; background: var(--iw-surface);
  border: 1px solid var(--iw-hairline); box-shadow: none;
  transition: border-color .15s ease, background-color .15s ease;
}
.iw-card:hover { border-color: var(--iw-border-strong); }
.iw-card-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.iw-card-date { font-size: 12px; color: var(--iw-text3); }
.iw-card-date .iw-num { font-size: 12px; }
.iw-score { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-text3); }
.iw-card-title {
  margin: 12px 0 0; font-size: 16px; font-weight: 600; line-height: 1.45;
  color: var(--iw-text); overflow-wrap: anywhere;
}
.iw-card-summary-wrap { display: flex; align-items: baseline; gap: 6px; margin-top: 8px; }
.iw-card-summary-label {
  display: inline-flex; align-items: center; gap: 4px; flex: none;
  font-size: 12px; color: var(--iw-text2);
  text-decoration: underline; text-decoration-color: rgba(31, 27, 22, .25);
  text-decoration-thickness: 1px; text-underline-offset: 3px;
  cursor: pointer;
}
.iw-card-summary-label svg { color: var(--iw-text3); }
.iw-card-summary-label:hover { color: var(--iw-accent-ink); text-decoration-color: color-mix(in srgb, var(--iw-accent-ink) 50%, transparent); }
.iw-card-summary {
  margin: 8px 0 0; font-size: 13px; line-height: 1.7; color: var(--iw-text2);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.iw-card-body {
  margin: 10px 0 0; font-size: 13px; line-height: 1.7; color: var(--iw-text2);
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.iw-card .iw-review-mini { margin-top: 10px; padding: 0; background: transparent; border: 0; }
.iw-card .iw-timeline-head { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--iw-text3); }
.iw-card .iw-timeline-kind { background: transparent; padding: 0; color: var(--iw-text3); font-size: 12px; }
.iw-card .iw-review-text { font-size: 12px; color: var(--iw-text2); -webkit-line-clamp: 1; }
.iw-card .iw-review-link { font-size: 12px; color: var(--iw-text2); }

/* ------------------------------------------------------------ tape moment */
.iw-tape {
  display: flex; align-items: center; gap: 12px; height: 56px; margin-top: 14px;
  padding: 0 14px; border-radius: 10px; background: var(--iw-tape); color: var(--iw-tape-ink);
  box-shadow: inset 0 0 0 1px var(--iw-tape-edge);
}
.iw-tape-play {
  width: 26px; height: 26px; flex: none; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 1px solid var(--iw-tape-line); background: transparent;
  color: var(--iw-tape-ink); cursor: pointer; padding: 0;
}
.iw-tape-play svg { display: block; }
.iw-tape-wave { flex: 1; display: flex; align-items: center; gap: 2px; min-width: 0; height: 26px; }
.iw-tape-wave i { flex: none; width: 2.5px; border-radius: 1px; background: var(--iw-tape-mute); }
.iw-tape-wave i.is-played { background: var(--iw-tape-wave); }
.iw-tape-time { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-tape-ink); flex: none; }
.iw-tape-label { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-tape-label); flex: none; }

.iw-media-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.iw-media-strip .iw-tape { margin-top: 0; flex: 1 1 100%; }
.iw-media-strip .iw-thumb {
  position: relative; width: 96px; height: 56px; border-radius: 8px; overflow: hidden;
  border: 1px solid var(--iw-hairline); background: var(--iw-sunken);
}
.iw-media-strip .iw-thumb img, .iw-media-strip .iw-thumb video { width: 100%; height: 100%; object-fit: cover; }
.iw-media-strip .iw-filechip {
  height: 56px; border-radius: 8px; background: var(--iw-bg); border: 1px solid var(--iw-hairline);
  padding: 7px 10px;
}

/* -------------------------------------------------------------- card foot */
.iw-card-foot {
  display: flex; align-items: center; gap: 10px; height: 32px; margin-top: 12px;
}
.iw-card-foot .iw-cat {
  display: inline-flex; align-items: center; gap: 0; height: auto; padding: 0;
  border-radius: 0; background: transparent; font-size: 12px; font-weight: 400; color: var(--iw-text3);
}
.iw-card-foot .iw-cat-dot { display: none; }
.iw-card-foot .iw-cat-1 {
  padding: 3px 8px; border-radius: 6px; font-weight: 500; color: var(--iw-accent-ink);
  background: color-mix(in srgb, var(--iw-accent) 12%, transparent);
}
.iw-expect-chip {
  display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--iw-text3);
  background: transparent; border: 0; padding: 0;
}
.iw-expect-chip svg { color: var(--iw-text3); }
.iw-expect-chip span { font-variant-numeric: tabular-nums; }
.iw-card-meta { margin-left: auto; font-size: 12px; color: var(--iw-text3); }
.iw-card-meta .iw-num { font-size: 12px; }

/* --------------------------------------------------------- week review card */
.iw-week {
  padding: 20px; border-radius: 12px; background: var(--iw-surface);
  border: 1px solid var(--iw-hairline);
}
.iw-week-head { display: flex; align-items: center; gap: 7px; color: var(--iw-text3); }
.iw-week-head svg { color: var(--iw-text3); }
.iw-week-head span { font-size: 13px; font-weight: 500; color: var(--iw-text); }
.iw-week-text { margin: 10px 0 0; font-size: 14px; line-height: 1.7; color: var(--iw-text); }
.iw-week-text b { font-family: var(--iw-mono); font-size: 13px; font-weight: 500; color: var(--iw-accent-ink); }
.iw-week-link {
  display: inline-block; margin-top: 10px; padding: 0; border: 0; background: transparent;
  font-size: 13px; color: var(--iw-text2); cursor: pointer;
  text-decoration: underline; text-decoration-color: rgba(31, 27, 22, .25);
  text-decoration-thickness: 1px; text-underline-offset: 3px;
}
.iw-week-link:hover { color: var(--iw-accent-ink); }

/* ---------------------------------------------------------------- empty */
.iw-empty { padding: 64px 20px; border-radius: 12px; border: 1px dashed var(--iw-border-strong); }

/* ------------------------------------------------------------- focus ring */
.iw-root :focus-visible {
  outline: 2px solid color-mix(in srgb, var(--iw-accent) 80%, transparent);
  outline-offset: 2px;
}
.iw-root :focus:not(:focus-visible) { outline: none; }
`