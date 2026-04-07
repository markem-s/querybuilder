import { useState, useCallback, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  GripVertical,
  Plus,
  X,
  Save,
  Trash2,
  RotateCcw,
  Network,
  Search,
  Settings,
  Filter,
  Layers,
  Circle,
  Link2,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

/* ── Arkem Design Tokens (inline for prototype) ───────────────── */
const tokens = {
  bgBase: "#080808",
  bgField: "#0d0d0d",
  bgHover: "#181818",
  bgRaised: "#1e1e1e",
  borderLight: "#3a3a3a",
  borderDark: "#1e1e1e",
  borderMuted: "#3F3F46",
  textPrimary: "#e5e5e5",
  textSecondary: "#838383",
  textSubtle: "#525252",
  textHighlighted: "#e0dd5b",
  textInverse: "#080808",
  yellow500: "#E0DD5B",
  yellow700: "#B1AE48",
  yellow950: "#3E3B15",
  danger: "#c55f5f",
  success: "#5f7b52",
  overlayDark: "#00000033",
  feedbackWarning: "#a88940",
};

/* ── Utility: cn-like class joiner ───────────────────────────── */
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ── Seed Data ───────────────────────────────────────────────── */
const LAYERS = [
  { id: "l1", name: "L1 — Network", badge: "L1", color: "#4A9EFF", nodes: 2847, edges: 5219, visible: true },
  { id: "l2", name: "L2 — User", badge: "L2", color: "#A855F7", nodes: 1203, edges: 2841, visible: true },
  { id: "l3", name: "L3 — Extended", badge: "L3", color: "#F97316", nodes: 8392, edges: 14207, visible: false },
];

const RENDER_CAP = 5000;

const SCOPE_OPTIONS = [
  { value: "node", label: "Node Attribute", icon: Circle },
  { value: "edge", label: "Edge Attribute", icon: Link2 },
  { value: "metric", label: "Graph Metric", icon: BarChart3 },
];

const FIELD_OPTIONS = {
  node: ["Device Type", "Carrier", "Country", "IMSI Prefix", "First Seen", "Last Seen"],
  edge: ["Link Weight", "Connection Type", "Duration", "Frequency", "Protocol"],
  metric: ["Degree Centrality", "Betweenness Centrality", "Community ID", "PageRank", "Clustering Coefficient"],
};

const OPERATOR_OPTIONS = {
  string: ["equals", "not equals", "contains", "starts with"],
  numeric: ["greater than", "less than", "between", "equals"],
  date: ["before", "after", "between"],
};

const NUMERIC_FIELDS = ["Link Weight", "Duration", "Frequency", "Degree Centrality", "Betweenness Centrality", "PageRank", "Clustering Coefficient", "Community ID"];
const DATE_FIELDS = ["First Seen", "Last Seen"];

function getOperatorsForField(field) {
  if (NUMERIC_FIELDS.includes(field)) return OPERATOR_OPTIONS.numeric;
  if (DATE_FIELDS.includes(field)) return OPERATOR_OPTIONS.date;
  return OPERATOR_OPTIONS.string;
}

function readBack(condition) {
  if (!condition.field || !condition.operator) return "Incomplete condition";
  const val = condition.value || "…";
  return `${condition.field} ${condition.operator} ${val}`;
}

let conditionIdCounter = 3;
let groupIdCounter = 2;

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function NetworkQueryBuilder() {
  // ── Query State ──
  const [queryName, setQueryName] = useState("Untitled Network Query");
  const [isEditingName, setIsEditingName] = useState(false);

  // ── Panel Sections ──
  const [sectionsOpen, setSectionsOpen] = useState({
    sources: true,
    conditions: true,
    layout: false,
  });

  // ── Graph Sources ──
  const [layers, setLayers] = useState(LAYERS);

  // ── Conditions ──
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Group 1",
      logic: "AND",
      conditions: [
        { id: 1, scope: "metric", field: "Degree Centrality", operator: "greater than", value: "0.5" },
        { id: 2, scope: "node", field: "Country", operator: "equals", value: "US" },
      ],
    },
  ]);

  // ── Adding Flow ──
  const [addingToGroup, setAddingToGroup] = useState(null);
  const [addStep, setAddStep] = useState(0); // 0=scope, 1=field, 2=operator, 3=value
  const [newCondition, setNewCondition] = useState({ scope: "", field: "", operator: "", value: "" });

  // ── Layout Settings ──
  const [layoutAlgo, setLayoutAlgo] = useState("force-directed");
  const [expansionDepth, setExpansionDepth] = useState(2);

  // ── Save Modal ──
  const [showSaveModal, setShowSaveModal] = useState(false);

  // ── Computed ──
  const totalConditions = useMemo(
    () => groups.reduce((sum, g) => sum + g.conditions.length, 0),
    [groups]
  );

  const visibleNodes = useMemo(
    () => layers.filter((l) => l.visible).reduce((sum, l) => sum + l.nodes, 0),
    [layers]
  );

  const visibleEdges = useMemo(
    () => layers.filter((l) => l.visible).reduce((sum, l) => sum + l.edges, 0),
    [layers]
  );

  const isCapped = visibleNodes > RENDER_CAP;

  // ── Handlers ──
  const toggleSection = (key) =>
    setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleLayerVisibility = (id) =>
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );

  const toggleGroupLogic = (groupId) =>
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, logic: g.logic === "AND" ? "OR" : "AND" } : g
      )
    );

  const removeCondition = (groupId, condId) =>
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, conditions: g.conditions.filter((c) => c.id !== condId) }
          : g
      )
    );

  const addGroup = () => {
    groupIdCounter++;
    setGroups((prev) => [
      ...prev,
      { id: groupIdCounter, name: `Group ${groupIdCounter}`, logic: "AND", conditions: [] },
    ]);
  };

  const removeGroup = (groupId) =>
    setGroups((prev) => prev.filter((g) => g.id !== groupId));

  const startAddCondition = (groupId) => {
    setAddingToGroup(groupId);
    setAddStep(0);
    setNewCondition({ scope: "", field: "", operator: "", value: "" });
  };

  const cancelAdd = () => {
    setAddingToGroup(null);
    setAddStep(0);
  };

  const selectScope = (scope) => {
    setNewCondition((prev) => ({ ...prev, scope, field: "", operator: "", value: "" }));
    setAddStep(1);
  };

  const selectField = (field) => {
    setNewCondition((prev) => ({ ...prev, field, operator: "", value: "" }));
    setAddStep(2);
  };

  const selectOperator = (op) => {
    setNewCondition((prev) => ({ ...prev, operator: op }));
    setAddStep(3);
  };

  const confirmCondition = () => {
    conditionIdCounter++;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === addingToGroup
          ? { ...g, conditions: [...g.conditions, { ...newCondition, id: conditionIdCounter }] }
          : g
      )
    );
    cancelAdd();
  };

  /* ── Styles ── */
  const panelStyle = {
    width: 380,
    height: "100vh",
    background: tokens.bgRaised,
    borderRight: `1px solid ${tokens.borderLight}`,
    display: "flex",
    flexDirection: "column",
    fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14,
    color: tokens.textPrimary,
    overflow: "hidden",
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: tokens.bgBase }}>
      {/* ═══ SIDEBAR PANEL ═══ */}
      <div style={panelStyle}>
        {/* ── Query Bar (Persistent Top) ── */}
        <div
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${tokens.borderLight}`,
            background: tokens.bgBase,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Network size={16} color={tokens.yellow500} />
            {isEditingName ? (
              <input
                autoFocus
                value={queryName}
                onChange={(e) => setQueryName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
                style={{
                  flex: 1,
                  background: tokens.bgField,
                  border: `1px solid ${tokens.yellow500}`,
                  borderRadius: 4,
                  padding: "4px 8px",
                  color: tokens.textPrimary,
                  fontSize: 14,
                  fontWeight: 600,
                  outline: "none",
                }}
              />
            ) : (
              <span
                onClick={() => setIsEditingName(true)}
                style={{
                  flex: 1,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: 4,
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.target.style.background = tokens.bgHover)}
                onMouseLeave={(e) => (e.target.style.background = "transparent")}
              >
                {queryName}
              </span>
            )}
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12 }}>
            <span style={{ color: tokens.textSecondary }}>
              <Filter size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
              {totalConditions} condition{totalConditions !== 1 ? "s" : ""}
            </span>
            <span style={{ color: isCapped ? tokens.feedbackWarning : tokens.textSecondary }}>
              {isCapped && <AlertTriangle size={11} style={{ display: "inline", marginRight: 3, verticalAlign: "middle" }} />}
              {isCapped
                ? `${RENDER_CAP.toLocaleString()} of ${visibleNodes.toLocaleString()} nodes`
                : `${visibleNodes.toLocaleString()} nodes`}
            </span>
            <span style={{ color: tokens.textSecondary }}>
              {visibleEdges.toLocaleString()} edges
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button
              onClick={() => setShowSaveModal(true)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "6px 12px",
                background: tokens.yellow500,
                color: tokens.textInverse,
                border: "none",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Save size={13} /> Save
            </button>
            <button
              onClick={() => {
                setGroups([{ id: 1, name: "Group 1", logic: "AND", conditions: [] }]);
                setLayers(LAYERS);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "6px 12px",
                background: "transparent",
                color: tokens.textSecondary,
                border: `1px solid ${tokens.borderLight}`,
                borderRadius: 4,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <RotateCcw size={13} /> Clear All
            </button>
          </div>
        </div>

        {/* ── Scrollable Content ── */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {/* ═══ SECTION: Graph Sources ═══ */}
          <SectionHeader
            label="Graph Sources"
            icon={<Layers size={14} />}
            isOpen={sectionsOpen.sources}
            onToggle={() => toggleSection("sources")}
            count={layers.filter((l) => l.visible).length}
          />
          {sectionsOpen.sources && (
            <div style={{ padding: "0 12px 12px" }}>
              {layers.map((layer) => (
                <LayerRow
                  key={layer.id}
                  layer={layer}
                  isCapped={layer.visible && visibleNodes > RENDER_CAP}
                  renderCap={RENDER_CAP}
                  totalVisible={visibleNodes}
                  onToggle={() => toggleLayerVisibility(layer.id)}
                />
              ))}
            </div>
          )}

          {/* ═══ SECTION: Conditions ═══ */}
          <SectionHeader
            label="Conditions"
            icon={<Filter size={14} />}
            isOpen={sectionsOpen.conditions}
            onToggle={() => toggleSection("conditions")}
            count={totalConditions}
          />
          {sectionsOpen.conditions && (
            <div style={{ padding: "0 12px 12px" }}>
              {groups.map((group, gi) => (
                <div key={group.id}>
                  {gi > 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "6px 0",
                        fontSize: 11,
                        fontWeight: 700,
                        color: tokens.yellow500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      OR
                    </div>
                  )}
                  <ConditionGroup
                    group={group}
                    onToggleLogic={() => toggleGroupLogic(group.id)}
                    onRemoveCondition={(condId) => removeCondition(group.id, condId)}
                    onAddCondition={() => startAddCondition(group.id)}
                    onRemoveGroup={groups.length > 1 ? () => removeGroup(group.id) : null}
                    isAdding={addingToGroup === group.id}
                    addStep={addStep}
                    newCondition={newCondition}
                    onSelectScope={selectScope}
                    onSelectField={selectField}
                    onSelectOperator={selectOperator}
                    onConfirmCondition={confirmCondition}
                    onCancelAdd={cancelAdd}
                    onValueChange={(val) => setNewCondition((prev) => ({ ...prev, value: val }))}
                  />
                </div>
              ))}
              <button
                onClick={addGroup}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: 8,
                  background: "transparent",
                  border: `1px dashed ${tokens.borderMuted}`,
                  borderRadius: 4,
                  color: tokens.textSecondary,
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Plus size={12} /> Add Group
              </button>
            </div>
          )}

          {/* ═══ SECTION: Layout Settings ═══ */}
          <SectionHeader
            label="Layout Settings"
            icon={<Settings size={14} />}
            isOpen={sectionsOpen.layout}
            onToggle={() => toggleSection("layout")}
          />
          {sectionsOpen.layout && (
            <div style={{ padding: "0 12px 16px" }}>
              {/* Layout Algorithm */}
              <FieldLabel>Layout Algorithm</FieldLabel>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {["force-directed", "hierarchical", "circular"].map((algo) => (
                  <button
                    key={algo}
                    onClick={() => setLayoutAlgo(algo)}
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: `1px solid ${layoutAlgo === algo ? tokens.yellow500 : tokens.borderLight}`,
                      background: layoutAlgo === algo ? tokens.yellow950 : "transparent",
                      color: layoutAlgo === algo ? tokens.yellow500 : tokens.textSecondary,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {algo.replace("-", " ")}
                  </button>
                ))}
              </div>

              {/* Expansion Depth */}
              <FieldLabel>Expansion Depth</FieldLabel>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={expansionDepth}
                  onChange={(e) => setExpansionDepth(Number(e.target.value))}
                  style={{ flex: 1, accentColor: tokens.yellow500 }}
                />
                <span
                  style={{
                    minWidth: 50,
                    fontSize: 13,
                    fontWeight: 600,
                    color: tokens.textHighlighted,
                  }}
                >
                  {expansionDepth}-hop
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ MAP / GRAPH AREA (placeholder) ═══ */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <GraphPlaceholder layers={layers} visibleNodes={visibleNodes} visibleEdges={visibleEdges} isCapped={isCapped} />

        {/* Floating cap warning */}
        {isCapped && (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1a1400",
              border: `1px solid ${tokens.feedbackWarning}`,
              borderRadius: 6,
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: tokens.feedbackWarning,
            }}
          >
            <AlertTriangle size={14} />
            Displaying {RENDER_CAP.toLocaleString()} of {visibleNodes.toLocaleString()} nodes — apply conditions to reduce
          </div>
        )}
      </div>

      {/* ═══ SAVE MODAL ═══ */}
      {showSaveModal && (
        <SaveModal
          queryName={queryName}
          layers={layers}
          groups={groups}
          totalConditions={totalConditions}
          layoutAlgo={layoutAlgo}
          expansionDepth={expansionDepth}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════ */

function SectionHeader({ label, icon, isOpen, onToggle, count }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${tokens.borderDark}`,
        color: tokens.textPrimary,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      {icon}
      <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
      {count !== undefined && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: tokens.textInverse,
            background: tokens.textSecondary,
            borderRadius: 10,
            padding: "1px 7px",
            minWidth: 20,
            textAlign: "center",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function LayerRow({ layer, isCapped, renderCap, totalVisible, onToggle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 8px",
        marginTop: 4,
        borderRadius: 4,
        background: hovered ? tokens.bgHover : "transparent",
        transition: "background 0.1s",
        opacity: layer.visible ? 1 : 0.5,
      }}
    >
      <GripVertical size={12} color={tokens.textSubtle} style={{ cursor: "grab", flexShrink: 0 }} />

      {/* Visibility toggle */}
      <button
        onClick={onToggle}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
      >
        {layer.visible ? (
          <Eye size={14} color={tokens.textSecondary} />
        ) : (
          <EyeOff size={14} color={tokens.textSubtle} />
        )}
      </button>

      {/* Badge */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          padding: "2px 6px",
          borderRadius: 3,
          background: layer.color + "22",
          color: layer.color,
          flexShrink: 0,
        }}
      >
        {layer.badge}
      </span>

      {/* Name */}
      <span style={{ flex: 1, fontSize: 13, color: tokens.textPrimary }}>{layer.name}</span>

      {/* Count chip */}
      <span
        style={{
          fontSize: 11,
          color: isCapped ? tokens.feedbackWarning : tokens.textSecondary,
          whiteSpace: "nowrap",
        }}
        title={
          isCapped
            ? `Displaying ${renderCap.toLocaleString()} of ${totalVisible.toLocaleString()} nodes — apply conditions to reduce`
            : undefined
        }
      >
        {layer.nodes.toLocaleString()} / {layer.edges.toLocaleString()}
      </span>
    </div>
  );
}

function ConditionGroup({
  group,
  onToggleLogic,
  onRemoveCondition,
  onAddCondition,
  onRemoveGroup,
  isAdding,
  addStep,
  newCondition,
  onSelectScope,
  onSelectField,
  onSelectOperator,
  onConfirmCondition,
  onCancelAdd,
  onValueChange,
}) {
  return (
    <div
      style={{
        border: `1px solid ${tokens.borderLight}`,
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 4,
      }}
    >
      {/* Group header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          background: tokens.bgBase,
          borderBottom: `1px solid ${tokens.borderDark}`,
        }}
      >
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: tokens.textSecondary }}>
          {group.name}
        </span>
        <button
          onClick={onToggleLogic}
          style={{
            padding: "2px 8px",
            borderRadius: 3,
            border: `1px solid ${tokens.yellow700}`,
            background: tokens.yellow950,
            color: tokens.yellow500,
            fontSize: 10,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          {group.logic}
        </button>
        {onRemoveGroup && (
          <button
            onClick={onRemoveGroup}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
          >
            <Trash2 size={12} color={tokens.textSubtle} />
          </button>
        )}
      </div>

      {/* Conditions */}
      <div style={{ padding: "6px 8px" }}>
        {group.conditions.map((cond, i) => (
          <div key={cond.id}>
            {i > 0 && (
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: tokens.textSubtle,
                  padding: "2px 0 2px 24px",
                  letterSpacing: "0.06em",
                }}
              >
                {group.logic}
              </div>
            )}
            <ConditionRow condition={cond} onRemove={() => onRemoveCondition(cond.id)} />
          </div>
        ))}

        {/* Adding flow */}
        {isAdding && (
          <AddConditionFlow
            step={addStep}
            newCondition={newCondition}
            onSelectScope={onSelectScope}
            onSelectField={onSelectField}
            onSelectOperator={onSelectOperator}
            onConfirm={onConfirmCondition}
            onCancel={onCancelAdd}
            onValueChange={onValueChange}
          />
        )}

        {!isAdding && (
          <button
            onClick={onAddCondition}
            style={{
              width: "100%",
              padding: "6px",
              marginTop: 4,
              background: "transparent",
              border: "none",
              color: tokens.textSecondary,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              borderRadius: 4,
            }}
            onMouseEnter={(e) => (e.target.style.background = tokens.bgHover)}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            <Plus size={12} /> Add condition
          </button>
        )}
      </div>
    </div>
  );
}

function ConditionRow({ condition, onRemove }) {
  const ScopeIcon = SCOPE_OPTIONS.find((s) => s.value === condition.scope)?.icon || Circle;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 6px",
        borderRadius: 4,
        background: tokens.bgField,
        marginBottom: 2,
      }}
    >
      <ScopeIcon size={12} color={tokens.textSubtle} />
      <span style={{ flex: 1, fontSize: 12, color: tokens.textPrimary }}>{readBack(condition)}</span>
      <button
        onClick={onRemove}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 2, flexShrink: 0 }}
      >
        <X size={12} color={tokens.textSubtle} />
      </button>
    </div>
  );
}

function AddConditionFlow({ step, newCondition, onSelectScope, onSelectField, onSelectOperator, onConfirm, onCancel, onValueChange }) {
  const stepLabels = ["Select scope", "Select field", "Select operator", "Enter value"];
  return (
    <div
      style={{
        marginTop: 6,
        padding: 8,
        background: tokens.bgBase,
        borderRadius: 4,
        border: `1px solid ${tokens.yellow700}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: tokens.textHighlighted, fontWeight: 600 }}>
          Step {step + 1}: {stepLabels[step]}
        </span>
        <button
          onClick={onCancel}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <X size={12} color={tokens.textSubtle} />
        </button>
      </div>

      {/* Step 0: Scope */}
      {step === 0 && (
        <div style={{ display: "flex", gap: 4 }}>
          {SCOPE_OPTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.value}
                onClick={() => onSelectScope(s.value)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11,
                  borderRadius: 4,
                  border: `1px solid ${tokens.borderLight}`,
                  background: "transparent",
                  color: tokens.textPrimary,
                  cursor: "pointer",
                }}
              >
                <Icon size={16} />
                {s.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Step 1: Field */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FIELD_OPTIONS[newCondition.scope]?.map((f) => (
            <button
              key={f}
              onClick={() => onSelectField(f)}
              style={{
                padding: "6px 8px",
                textAlign: "left",
                fontSize: 12,
                borderRadius: 3,
                border: "none",
                background: "transparent",
                color: tokens.textPrimary,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.background = tokens.bgHover)}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Operator */}
      {step === 2 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {getOperatorsForField(newCondition.field).map((op) => (
            <button
              key={op}
              onClick={() => onSelectOperator(op)}
              style={{
                padding: "5px 10px",
                fontSize: 12,
                borderRadius: 3,
                border: `1px solid ${tokens.borderLight}`,
                background: "transparent",
                color: tokens.textPrimary,
                cursor: "pointer",
              }}
            >
              {op}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Value */}
      {step === 3 && (
        <div style={{ display: "flex", gap: 6 }}>
          <input
            autoFocus
            value={newCondition.value}
            onChange={(e) => onValueChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && newCondition.value && onConfirm()}
            placeholder="Enter value…"
            style={{
              flex: 1,
              padding: "6px 8px",
              fontSize: 12,
              borderRadius: 4,
              border: `1px solid ${tokens.borderLight}`,
              background: tokens.bgField,
              color: tokens.textPrimary,
              outline: "none",
            }}
          />
          <button
            onClick={onConfirm}
            disabled={!newCondition.value}
            style={{
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 4,
              border: "none",
              background: newCondition.value ? tokens.yellow500 : tokens.borderLight,
              color: newCondition.value ? tokens.textInverse : tokens.textSubtle,
              cursor: newCondition.value ? "pointer" : "not-allowed",
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* Read-back preview */}
      {step >= 1 && (newCondition.field || newCondition.operator) && (
        <div
          style={{
            marginTop: 8,
            padding: "4px 8px",
            borderRadius: 3,
            background: tokens.yellow950,
            fontSize: 11,
            color: tokens.textHighlighted,
          }}
        >
          {readBack(newCondition)}
        </div>
      )}
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: tokens.textSecondary,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

/* ── Graph Placeholder ── */
function GraphPlaceholder({ layers, visibleNodes, visibleEdges, isCapped }) {
  // Generate pseudo-random nodes based on layer data
  const nodes = useMemo(() => {
    const result = [];
    const centerX = 400;
    const centerY = 300;
    layers
      .filter((l) => l.visible)
      .forEach((layer) => {
        const count = Math.min(layer.nodes, 40);
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + (layer.id === "l2" ? 0.5 : layer.id === "l3" ? 1.2 : 0);
          const radius = layer.id === "l1" ? 120 : layer.id === "l2" ? 200 : 280;
          const jitter = ((i * 17 + 31) % 60) - 30;
          result.push({
            x: centerX + Math.cos(angle) * (radius + jitter),
            y: centerY + Math.sin(angle) * (radius + jitter),
            color: layer.color,
            size: 3 + ((i * 7) % 5),
            layer: layer.badge,
          });
        }
      });
    return result;
  }, [layers]);

  // Generate pseudo-random edges
  const edges = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodes.length; i++) {
      const connections = 1 + (i % 3);
      for (let j = 0; j < connections; j++) {
        const target = (i + j + 1 + ((i * 13) % 7)) % nodes.length;
        if (target !== i) {
          result.push({ from: nodes[i], to: nodes[target], color: nodes[i].color });
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ maxWidth: 800, opacity: 0.8 }}>
      {/* Edges */}
      {edges.map((e, i) => (
        <line
          key={`e-${i}`}
          x1={e.from.x}
          y1={e.from.y}
          x2={e.to.x}
          y2={e.to.y}
          stroke={e.color}
          strokeOpacity={0.15}
          strokeWidth={0.5}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <circle key={`n-${i}`} cx={n.x} cy={n.y} r={n.size} fill={n.color} fillOpacity={0.6} />
      ))}
      {/* Center label */}
      <text x={400} y={300} textAnchor="middle" fill={tokens.textSubtle} fontSize={14} fontFamily="IBM Plex Sans, sans-serif">
        Network Graph — {layers.filter((l) => l.visible).length} layers active
      </text>
    </svg>
  );
}

/* ── Save Modal ── */
function SaveModal({ queryName, layers, groups, totalConditions, layoutAlgo, expansionDepth, onClose }) {
  const [systemOptIns, setSystemOptIns] = useState({});
  const systemLayers = layers.filter((l) => l.id === "l3"); // L3 treated as system-generated expansion

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 440,
          background: tokens.bgRaised,
          border: `1px solid ${tokens.borderLight}`,
          borderRadius: 8,
          padding: 24,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: tokens.textPrimary }}>
          Save Network Query
        </div>
        <div style={{ fontSize: 13, color: tokens.textSecondary, marginBottom: 20 }}>
          Review what will be included in "{queryName}"
        </div>

        {/* Included items */}
        <div style={{ marginBottom: 16 }}>
          <FieldLabel>Included</FieldLabel>
          <IncludedItem label="Graph Layers" value={layers.filter((l) => l.visible && l.id !== "l3").map((l) => l.name).join(", ") || "None"} />
          <IncludedItem label="Conditions" value={`${totalConditions} across ${groups.length} group${groups.length > 1 ? "s" : ""}`} />
          <IncludedItem label="Layout" value={`${layoutAlgo.replace("-", " ")}, ${expansionDepth}-hop depth`} />
        </div>

        {/* System-generated expansions */}
        {systemLayers.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>System-Generated Expansions</FieldLabel>
            <div
              style={{
                padding: 10,
                borderRadius: 4,
                background: tokens.bgBase,
                border: `1px solid ${tokens.feedbackWarning}33`,
              }}
            >
              {systemLayers.map((sl) => (
                <div key={sl.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <input
                    type="checkbox"
                    checked={systemOptIns[sl.id] || false}
                    onChange={(e) =>
                      setSystemOptIns((prev) => ({ ...prev, [sl.id]: e.target.checked }))
                    }
                    style={{ marginTop: 3, accentColor: tokens.yellow500 }}
                  />
                  <div>
                    <div style={{ fontSize: 13, color: tokens.textPrimary }}>{sl.name}</div>
                    <div style={{ fontSize: 11, color: tokens.feedbackWarning }}>
                      Including this adds extended relationship nodes beyond your seed devices ({sl.nodes.toLocaleString()} nodes, {sl.edges.toLocaleString()} edges)
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: tokens.textSubtle, marginTop: 4 }}>
                Excluded by default — opt in explicitly to include.
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              fontSize: 13,
              borderRadius: 4,
              border: `1px solid ${tokens.borderLight}`,
              background: "transparent",
              color: tokens.textSecondary,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 4,
              border: "none",
              background: tokens.yellow500,
              color: tokens.textInverse,
              cursor: "pointer",
            }}
          >
            Save Query
          </button>
        </div>
      </div>
    </div>
  );
}

function IncludedItem({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${tokens.borderDark}` }}>
      <span style={{ fontSize: 12, color: tokens.textSecondary }}>{label}</span>
      <span style={{ fontSize: 12, color: tokens.textPrimary, textAlign: "right", maxWidth: 240 }}>{value}</span>
    </div>
  );
}
