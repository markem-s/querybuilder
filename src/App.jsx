import { useState } from "react";

// ─── Low-fi prototype: Query Builder + Layer Styling integration ───────────────
// Covers:
//   • Two-tab panel: Query Builder / Map Settings
//   • Data Sources panel with per-source Style drawer (collapsed by default)
//   • Style drawer: Fill Color, Radius, Label field selector
//   • Conditions section with AND/OR toggle + zero-return diagnostic state
//   • Live record count with "Calculated locally" indicator
//   • Pre-share disclosure modal
//   • Save / Share separated with deliberate affordance weight
//   • Map Settings tab: base style selector + layer visibility toggles

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  bgBase: "#080808",
  bgRaised: "#1e1e1e",
  bgField: "#0d0d0d",
  bgHover: "#181818",
  borderLight: "#3a3a3a",
  borderMuted: "#3F3F46",
  textPrimary: "#e5e5e5",
  textSecondary: "#838383",
  textSubtle: "#525252",
  textHighlighted: "#e0dd5b",
  textInverse: "#080808",
  yellow500: "#E0DD5B",
  danger: "#c55f5f",
  success: "#5f7b52",
  warning: "#a88940",
};

const s = (base, overrides = {}) => ({ ...base, ...overrides });

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  app: {
    display: "flex",
    height: "100vh",
    background: T.bgBase,
    fontFamily: "'Inter', 'IBM Plex Sans', sans-serif",
    color: T.textPrimary,
    fontSize: 14,
  },
  panel: {
    width: 340,
    borderRight: `1px solid ${T.borderLight}`,
    background: T.bgBase,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  panelHeader: {
    padding: "16px 16px 12px",
    borderBottom: `1px solid ${T.borderLight}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  tabBar: {
    display: "flex",
    borderBottom: `1px solid ${T.borderLight}`,
    background: T.bgBase,
    flexShrink: 0,
  },
  tab: (active) => ({
    flex: 1,
    padding: "10px 0",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textAlign: "center",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    borderBottom: active ? `2px solid ${T.yellow500}` : "2px solid transparent",
    color: active ? T.textPrimary : T.textSubtle,
  }),
  section: {
    padding: "12px 16px",
    borderBottom: `1px solid ${T.borderLight}`,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.textSubtle,
    marginBottom: 10,
  },
  sourceCard: {
    background: T.bgRaised,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  sourceCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    cursor: "pointer",
  },
  sourceCardMeta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  colorDot: (color) => ({
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
  }),
  styleDrawer: {
    borderTop: `1px solid ${T.borderLight}`,
    padding: "12px",
    background: T.bgField,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  fieldRow: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: T.textSecondary,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  colorRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  colorSwatch: (color) => ({
    width: 28,
    height: 28,
    borderRadius: 4,
    background: color,
    border: `1px solid ${T.borderLight}`,
    cursor: "pointer",
    flexShrink: 0,
  }),
  select: {
    background: T.bgRaised,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 4,
    color: T.textPrimary,
    padding: "5px 8px",
    fontSize: 13,
    width: "100%",
  },
  sliderRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  slider: {
    flex: 1,
    accentColor: T.yellow500,
  },
  sliderVal: {
    background: T.bgRaised,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 4,
    padding: "3px 6px",
    fontSize: 12,
    color: T.textPrimary,
    minWidth: 32,
    textAlign: "center",
  },
  conditionRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  conditionPill: {
    background: T.bgRaised,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 4,
    padding: "6px 10px",
    flex: 1,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  andOrToggle: {
    display: "inline-flex",
    border: `1px solid ${T.borderLight}`,
    borderRadius: 4,
    overflow: "hidden",
    fontSize: 11,
    fontWeight: 600,
  },
  toggleBtn: (active) => ({
    padding: "4px 10px",
    background: active ? T.yellow500 : T.bgRaised,
    color: active ? T.textInverse : T.textSecondary,
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.04em",
  }),
  recordCount: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    borderBottom: `1px solid ${T.borderLight}`,
    background: T.bgField,
    flexShrink: 0,
  },
  recordCountNum: {
    fontSize: 20,
    fontWeight: 700,
    color: T.textHighlighted,
  },
  localBadge: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: T.textSubtle,
    background: T.bgRaised,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 4,
    padding: "2px 6px",
    textTransform: "uppercase",
  },
  diagnosticBox: {
    background: "#1a1208",
    border: `1px solid ${T.warning}`,
    borderRadius: 4,
    padding: "10px 12px",
    marginTop: 8,
    fontSize: 12,
    color: T.warning,
    lineHeight: 1.5,
  },
  btn: (variant = "ghost") => ({
    background:
      variant === "primary" ? T.yellow500 :
      variant === "destructive" ? T.danger : "transparent",
    color:
      variant === "primary" ? T.textInverse :
      variant === "destructive" ? "#fff" : T.textSecondary,
    border: variant === "ghost" ? `1px solid ${T.borderLight}` : "none",
    borderRadius: 4,
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: variant === "primary" ? 600 : 400,
    cursor: "pointer",
    letterSpacing: variant === "primary" ? "0.02em" : 0,
  }),
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modalBox: {
    background: T.bgRaised,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 6,
    padding: 24,
    width: 420,
    maxWidth: "90vw",
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: T.textPrimary,
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 12,
    color: T.textSecondary,
    marginBottom: 16,
    lineHeight: 1.5,
  },
  modalList: {
    background: T.bgField,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 4,
    padding: "10px 12px",
    fontSize: 12,
    color: T.textPrimary,
    lineHeight: 1.8,
    marginBottom: 16,
  },
  modalNote: {
    background: "#0b120b",
    border: `1px solid ${T.success}`,
    borderRadius: 4,
    padding: "8px 12px",
    fontSize: 12,
    color: "#8db882",
    marginBottom: 16,
    lineHeight: 1.5,
  },
  modalActions: {
    display: "flex",
    gap: 8,
    justifyContent: "flex-end",
  },
  mapArea: {
    flex: 1,
    background: "#0f1115",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  mapPlaceholder: {
    color: T.textSubtle,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 2,
  },
  queryBar: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: T.bgRaised,
    border: `1px solid ${T.borderLight}`,
    borderRadius: 6,
    padding: "8px 14px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  },
  separator: {
    width: 1,
    height: 20,
    background: T.borderLight,
    margin: "0 2px",
  },
  iconBtn: {
    background: "transparent",
    border: "none",
    color: T.textSubtle,
    cursor: "pointer",
    fontSize: 14,
    padding: "2px 4px",
    borderRadius: 3,
  },
  // Map Settings tab styles
  mapStyleCard: (active) => ({
    background: active ? T.bgHover : T.bgRaised,
    border: `1px solid ${active ? T.yellow500 : T.borderLight}`,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    cursor: "pointer",
    marginBottom: 6,
  }),
  mapStyleThumb: (bg) => ({
    width: 40,
    height: 40,
    borderRadius: 4,
    background: bg,
    border: `1px solid ${T.borderLight}`,
    flexShrink: 0,
  }),
  layerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 0",
    borderBottom: `1px solid ${T.borderLight}`,
  },
  layerRowLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
};

// ─── Map base styles data ─────────────────────────────────────────────────────
const MAP_STYLES = [
  { id: "dark-matter", label: "DarkMatter", thumb: "#0f1115" },
  { id: "satellite", label: "Satellite", thumb: "#2a3a2a" },
  { id: "light", label: "Light", thumb: "#d4d0c8" },
  { id: "streets", label: "Streets", thumb: "#1a2030" },
];

const INITIAL_MAP_LAYERS = [
  { id: "label", label: "Label", visible: true },
  { id: "road", label: "Road", visible: true },
  { id: "border", label: "Border", visible: false },
  { id: "building", label: "Building", visible: true },
  { id: "water", label: "Water", visible: true },
  { id: "land", label: "Land", visible: true },
  { id: "3d-building", label: "3D Building", visible: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StyleDrawer({ source, onUpdate }) {
  return (
    <div style={styles.styleDrawer}>
      <div style={styles.fieldRow}>
        <div style={styles.fieldLabel}>Fill Color</div>
        <div style={styles.colorRow}>
          <div style={styles.colorSwatch(source.color)} title="Click to change color" />
          <select
            style={s(styles.select, { width: "auto", flex: 1 })}
            value={source.colorField || ""}
            onChange={(e) => onUpdate(source.id, { colorField: e.target.value })}
          >
            <option value="">Flat color (default)</option>
            <option value="device_type">By: device_type</option>
            <option value="signal_strength">By: signal_strength</option>
          </select>
        </div>
        {source.colorField && (
          <div style={{ fontSize: 11, color: T.warning, marginTop: 2 }}>
            ⚠ Color scaling based on field data — no AI inference applied
          </div>
        )}
      </div>

      <div style={styles.fieldRow}>
        <div style={styles.fieldLabel}>Point Radius</div>
        <div style={styles.sliderRow}>
          <input
            type="range" min={2} max={30}
            value={source.radius || 8}
            style={styles.slider}
            onChange={(e) => onUpdate(source.id, { radius: Number(e.target.value) })}
          />
          <div style={styles.sliderVal}>{source.radius || 8}</div>
        </div>
      </div>

      <div style={styles.fieldRow}>
        <div style={styles.fieldLabel}>Label Field</div>
        <select
          style={styles.select}
          value={source.labelField || ""}
          onChange={(e) => onUpdate(source.id, { labelField: e.target.value })}
        >
          <option value="">No label</option>
          <option value="device_id">device_id</option>
          <option value="timestamp">timestamp</option>
          <option value="location_name">location_name</option>
        </select>
      </div>

      <div style={{ fontSize: 11, color: T.textSubtle, borderTop: `1px solid ${T.borderLight}`, paddingTop: 8 }}>
        {source.totalRows?.toLocaleString()} total rows in file
        {source.loadedRows < source.totalRows && (
          <span style={{ color: T.danger, marginLeft: 6 }}>
            ⚠ Displaying {source.loadedRows?.toLocaleString()} of {source.totalRows?.toLocaleString()} — apply filters to reduce
          </span>
        )}
      </div>
    </div>
  );
}

function SourceCard({ source, onUpdate, onRemove }) {
  const [styleOpen, setStyleOpen] = useState(false);
  return (
    <div style={styles.sourceCard}>
      <div style={styles.sourceCardHeader} onClick={() => setStyleOpen((v) => !v)}>
        <div style={styles.sourceCardMeta}>
          <div style={styles.colorDot(source.color)} />
          <div>
            <div style={{ fontSize: 13, color: T.textPrimary }}>{source.name}</div>
            <div style={{ fontSize: 11, color: T.textSubtle, marginTop: 1 }}>{source.type}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: T.textSubtle }}>
            {styleOpen ? "Hide style ▲" : "Style ▼"}
          </span>
          <button
            style={s(styles.iconBtn, { color: T.danger })}
            onClick={(e) => { e.stopPropagation(); onRemove(source.id); }}
            title="Remove source"
          >✕</button>
        </div>
      </div>
      {styleOpen && <StyleDrawer source={source} onUpdate={onUpdate} />}
    </div>
  );
}

function MapSettingsTab({ mapStyle, onMapStyleChange, mapLayers, onLayerToggle }) {
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      {/* Base style */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>Map Style</div>
        {MAP_STYLES.map((ms) => (
          <div
            key={ms.id}
            style={styles.mapStyleCard(mapStyle === ms.id)}
            onClick={() => onMapStyleChange(ms.id)}
          >
            <div style={styles.mapStyleThumb(ms.thumb)} />
            <div>
              <div style={{ fontSize: 13, color: T.textPrimary, fontWeight: mapStyle === ms.id ? 600 : 400 }}>
                {ms.label}
              </div>
              {mapStyle === ms.id && (
                <div style={{ fontSize: 11, color: T.textHighlighted, marginTop: 2 }}>Active</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Layer visibility */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>Map Layers</div>
        {mapLayers.map((layer) => (
          <div key={layer.id} style={styles.layerRow}>
            <div style={styles.layerRowLeft}>
              <span
                style={{ fontSize: 16, cursor: "pointer", color: layer.visible ? T.textSecondary : T.textSubtle, opacity: layer.visible ? 1 : 0.4 }}
                onClick={() => onLayerToggle(layer.id)}
                title={layer.visible ? "Hide layer" : "Show layer"}
              >
                {layer.visible ? "👁" : "🚫"}
              </span>
              <span style={{ fontSize: 13, color: layer.visible ? T.textPrimary : T.textSubtle, fontWeight: layer.visible ? 500 : 400 }}>
                {layer.label}
              </span>
            </div>
            <span style={{ fontSize: 11, color: T.textSubtle }}>▲</span>
          </div>
        ))}
        <div style={{ fontSize: 11, color: T.textSubtle, marginTop: 10, lineHeight: 1.5 }}>
          Layer visibility is saved with the query configuration.
        </div>
      </div>
    </div>
  );
}

function ShareModal({ onClose, sources, conditions }) {
  return (
    <div style={styles.modal}>
      <div style={styles.modalBox}>
        <div style={styles.modalTitle}>Share this query</div>
        <div style={styles.modalSub}>
          Review exactly what will be included in the shared link before continuing.
          Recipients must have access to the same underlying datasets to load results.
        </div>
        <div style={styles.modalList}>
          <div style={{ fontWeight: 600, marginBottom: 6, color: T.textSecondary }}>INCLUDED IN LINK</div>
          {sources.map((src) => (
            <div key={src.id}>📁 Source: {src.name} (config only)</div>
          ))}
          {conditions.map((c, i) => (
            <div key={i}>🔍 Condition: {c.label}</div>
          ))}
          <div>🗺 Map position + zoom level</div>
          <div>🎨 Layer style + visibility settings</div>
        </div>
        <div style={styles.modalNote}>
          ✓ This link contains <strong>no raw data</strong>. It shares query configuration only. Raw records are never transmitted.
        </div>
        <div style={styles.modalActions}>
          <button style={styles.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={styles.btn("primary")}>Copy link</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main prototype ───────────────────────────────────────────────────────────

const INITIAL_SOURCES = [
  {
    id: "gps-csv",
    name: "GPS_intercepts_2024_Q1.csv",
    type: "Uploaded dataset · Point",
    color: "#4ec9e0",
    colorField: "",
    labelField: "",
    radius: 8,
    totalRows: 82340,
    loadedRows: 50000,
  },
];

const INITIAL_CONDITIONS = [
  { label: "Time range: 2024-01-01 → 2024-03-31", conflict: false },
  { label: "Device ID: contains DEV-447, DEV-512", conflict: false },
  { label: "Spatial area: Drawn polygon (NW sector)", conflict: false },
];

export default function QueryBuilderPrototype() {
  const [activeTab, setActiveTab] = useState("query");
  const [sources, setSources] = useState(INITIAL_SOURCES);
  const [conditions, setConditions] = useState(INITIAL_CONDITIONS);
  const [logic, setLogic] = useState("AND");
  const [recordCount, setRecordCount] = useState(1247);
  const [showShareModal, setShowShareModal] = useState(false);
  const [zeroReturn, setZeroReturn] = useState(false);
  const [mapStyle, setMapStyle] = useState("dark-matter");
  const [mapLayers, setMapLayers] = useState(INITIAL_MAP_LAYERS);

  const updateSource = (id, changes) =>
    setSources((prev) => prev.map((src) => (src.id === id ? { ...src, ...changes } : src)));

  const removeSource = (id) =>
    setSources((prev) => prev.filter((src) => src.id !== id));

  const toggleLayer = (id) =>
    setMapLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));

  const addConflictCondition = () => {
    setConditions((prev) => [...prev, { label: "Time range: 2023-01-01 → 2023-01-01 (1 day)", conflict: true }]);
    setRecordCount(0);
    setZeroReturn(true);
  };

  const resetConditions = () => {
    setConditions(INITIAL_CONDITIONS);
    setRecordCount(1247);
    setZeroReturn(false);
  };

  return (
    <div style={styles.app}>
      {/* ── Left panel ── */}
      <div style={styles.panel}>

        {/* Header */}
        <div style={styles.panelHeader}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Query Builder</span>
          {activeTab === "query" && (
            <div style={styles.andOrToggle}>
              <button style={styles.toggleBtn(logic === "AND")} onClick={() => setLogic("AND")}>AND</button>
              <button style={styles.toggleBtn(logic === "OR")} onClick={() => setLogic("OR")}>OR</button>
            </div>
          )}
        </div>

        {/* Tab bar */}
        <div style={styles.tabBar}>
          <button style={styles.tab(activeTab === "query")} onClick={() => setActiveTab("query")}>
            QUERY
          </button>
          <button style={styles.tab(activeTab === "map")} onClick={() => setActiveTab("map")}>
            MAP SETTINGS
          </button>
        </div>

        {activeTab === "query" && (
          <>
            {/* Record count */}
            <div style={styles.recordCount}>
              <span style={s(styles.recordCountNum, { color: zeroReturn ? T.danger : T.textHighlighted })}>
                {recordCount.toLocaleString()}
              </span>
              <span style={{ color: T.textSecondary, fontSize: 12 }}>records</span>
              <div style={{ flex: 1 }} />
              <span style={styles.localBadge}>Calculated locally</span>
            </div>

            {/* Zero-return diagnostic */}
            {zeroReturn && (
              <div style={{ padding: "0 16px 8px" }}>
                <div style={styles.diagnosticBox}>
                  <strong>Zero records returned.</strong><br />
                  Possible cause: the added time range condition (2023-01-01) falls outside your dataset's available range (2024). Conditions may be in conflict.<br /><br />
                  Try isolating conditions one at a time to identify the conflict.
                  <div style={{ marginTop: 8 }}>
                    <button style={s(styles.btn("ghost"), { fontSize: 11 })} onClick={resetConditions}>
                      Reset to previous conditions
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Sources */}
            <div style={styles.section}>
              <div style={styles.sectionLabel}>Data Sources</div>
              {sources.map((src) => (
                <SourceCard key={src.id} source={src} onUpdate={updateSource} onRemove={removeSource} />
              ))}
              <button style={s(styles.btn("ghost"), { fontSize: 12, width: "100%", marginTop: 4 })}>
                + Add source
              </button>
            </div>

            {/* Conditions */}
            <div style={styles.section}>
              <div style={styles.sectionLabel}>Conditions</div>
              {conditions.map((cond, i) => (
                <div key={i} style={styles.conditionRow}>
                  <div style={s(styles.conditionPill, {
                    borderColor: cond.conflict ? T.warning : T.borderLight,
                    background: cond.conflict ? "#1a1208" : T.bgRaised,
                  })}>
                    <span style={{ color: cond.conflict ? T.warning : T.textPrimary, fontSize: 12 }}>
                      {cond.conflict && "⚠ "}{cond.label}
                    </span>
                    <button
                      style={styles.iconBtn}
                      onClick={() => {
                        const next = conditions.filter((_, j) => j !== i);
                        setConditions(next);
                        if (!next.some((c) => c.conflict)) { setZeroReturn(false); setRecordCount(1247); }
                      }}
                    >✕</button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button style={s(styles.btn("ghost"), { fontSize: 12, flex: 1 })}>+ Add condition</button>
                <button
                  style={s(styles.btn("ghost"), { fontSize: 12, color: T.warning, borderColor: T.warning + "55" })}
                  onClick={addConflictCondition}
                >↗ Simulate conflict</button>
              </div>
            </div>

            <div style={{ flex: 1 }} />

            {/* Footer */}
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.borderLight}`, display: "flex", gap: 8, alignItems: "center" }}>
              <button style={s(styles.btn("primary"), { flex: 1 })}>Save query</button>
              <div style={styles.separator} />
              <button
                style={s(styles.btn("ghost"), { fontSize: 12, color: T.textSubtle })}
                onClick={() => setShowShareModal(true)}
              >Share…</button>
            </div>
          </>
        )}

        {activeTab === "map" && (
          <MapSettingsTab
            mapStyle={mapStyle}
            onMapStyleChange={setMapStyle}
            mapLayers={mapLayers}
            onLayerToggle={toggleLayer}
          />
        )}
      </div>

      {/* ── Map area ── */}
      <div style={styles.mapArea}>
        <div style={styles.mapPlaceholder}>
          Map canvas
          <br />
          <span style={{ fontSize: 11, color: T.textSubtle }}>
            Base style: {MAP_STYLES.find((m) => m.id === mapStyle)?.label} ·{" "}
            {mapLayers.filter((l) => l.visible).length}/{mapLayers.length} layers visible
          </span>
        </div>
        <div style={styles.queryBar}>
          <span style={{ fontSize: 12, color: T.textSecondary }}>
            {logic === "AND" ? "All conditions match" : "Any condition matches"}
          </span>
          <div style={styles.separator} />
          <span style={{ fontSize: 12, color: zeroReturn ? T.danger : T.textHighlighted, fontWeight: 600 }}>
            {recordCount.toLocaleString()} records
          </span>
          <div style={styles.separator} />
          <button style={styles.iconBtn} title="Export">↓ Export</button>
        </div>
      </div>

      {/* ── Share modal ── */}
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} sources={sources} conditions={conditions} />
      )}
    </div>
  );
}
