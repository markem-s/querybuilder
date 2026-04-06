import { useState, useMemo, useEffect } from "react";
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
  Search,
  Filter,
  Layers,
  MapPin,
  Clock,
  Tag,
  Globe,
  Map,
  Database,
  Sliders,
  FolderOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Edit3,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Navigation,
  Radar,
  CalendarDays,
  Timer,
  Smartphone,
  Radio,
  Hash,
  Signal,
  Wifi,
  Flag,
  CircleDot,
  Target,
  MessageSquareText,
  Type,
  MapPinned,
  FileText,
  ToggleLeft,
  ListOrdered,
  ChevronUp,
  Droplets,
  Mountain,
  Building2,
  Milestone,
  SquareDashed,
  Cuboid,
  ScanLine,
  Ruler,
  Pentagon,
  MonitorSmartphone,
  Home,
  Settings,
  Box,
} from "lucide-react";

/* ── Arkem Design Tokens ──────────────────────────────────────── */
const t = {
  bgBase: "#080808",
  bgField: "#0d0d0d",
  bgHover: "#181818",
  bgRaised: "#1e1e1e",
  borderLight: "#3a3a3a",
  borderDark: "#1e1e1e",
  borderMuted: "#3F3F46",
  borderSubtle: "#52525B",
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
  overlayDark: "#00000066",
  feedbackWarning: "#a88940",
  /* Glass tokens */
  glassBg: "rgba(8, 8, 8, 0.65)",
  glassBorder: "rgba(255, 255, 255, 0.06)",
};

/* ── Normalized spacing scale (4pt base) ── */
const sp = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

/* ── Typography scale (1.25 ratio, 5 levels) ── */
const type = {
  caption: { fontSize: 10, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" },
  secondary: { fontSize: 11, fontWeight: 400 },
  body: { fontSize: 13, fontWeight: 400 },
  subheading: { fontSize: 13, fontWeight: 600 },
  heading: { fontSize: 16, fontWeight: 600 },
};

/* ── Focus ring style (a11y) ── */
const focusRing = `0 0 0 2px ${t.borderSubtle}`;

/* ── Motion tokens ── */
const motion = {
  fast: "150ms",
  medium: "300ms",
  slow: "400ms",
  easeOut: "cubic-bezier(0.25, 1, 0.5, 1)",
  easeIn: "cubic-bezier(0.5, 0, 0.75, 0)",
};

/* ── Reduced-motion hook ── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ── Expandable panel wrapper (grid height animation) ── */
function Expandable({ open, children, duration }) {
  const dur = duration || motion.medium;
  return (
    <div style={{
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: `grid-template-rows ${dur} ${motion.easeOut}`,
    }}>
      <div style={{ overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Seed Data ────────────────────────────────────────────────── */
const INITIAL_SOURCE_GROUPS = [
  {
    id: "sg1",
    name: "Device Intelligence",
    collapsed: false,
    sources: [
      { id: "ds1", name: "Device Locations", type: "geospatial", color: "#4A9EFF", records: 82340, visible: true, system: false, layerType: "point", opacity: 80, pointSize: 4, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "ds2", name: "Cell Tower Pings", type: "geospatial", color: "#22C55E", records: 41200, visible: true, system: false, layerType: "point", opacity: 70, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "additive", layers: [] },
    ],
  },
  {
    id: "sg2",
    name: "Locations of Interest",
    collapsed: false,
    sources: [
      { id: "loi-01", name: "Airport", type: "geospatial", color: "#F59E0B", records: 3, visible: true, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: true, blendMode: "normal", layers: [] },
      { id: "loi-02", name: "Bar", type: "geospatial", color: "#F59E0B", records: 214, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-03", name: "Bus Station", type: "geospatial", color: "#F59E0B", records: 46, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-04", name: "Casino", type: "geospatial", color: "#F59E0B", records: 8, visible: true, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: true, blendMode: "normal", layers: [] },
      { id: "loi-05", name: "Church", type: "geospatial", color: "#F59E0B", records: 67, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-06", name: "Communications Tower", type: "geospatial", color: "#F59E0B", records: 1, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-07", name: "Community Centre", type: "geospatial", color: "#F59E0B", records: 88, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-08", name: "Courthouse", type: "geospatial", color: "#F59E0B", records: 21, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-09", name: "Event", type: "geospatial", color: "#F59E0B", records: 14, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-10", name: "Government Building", type: "geospatial", color: "#F59E0B", records: 33, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-11", name: "Hospital", type: "geospatial", color: "#F59E0B", records: 12, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-12", name: "Hotel", type: "geospatial", color: "#F59E0B", records: 57, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-13", name: "Library", type: "geospatial", color: "#F59E0B", records: 19, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-14", name: "Military Base", type: "geospatial", color: "#F59E0B", records: 2, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-15", name: "Mosque", type: "geospatial", color: "#F59E0B", records: 41, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-16", name: "Nightclub", type: "geospatial", color: "#F59E0B", records: 29, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-17", name: "Park", type: "geospatial", color: "#F59E0B", records: 103, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-18", name: "Police Station", type: "geospatial", color: "#F59E0B", records: 18, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-19", name: "Port", type: "geospatial", color: "#F59E0B", records: 4, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-20", name: "Prison", type: "geospatial", color: "#F59E0B", records: 5, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-21", name: "Restaurant", type: "geospatial", color: "#F59E0B", records: 387, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-22", name: "School", type: "geospatial", color: "#F59E0B", records: 74, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-23", name: "Shopping Centre", type: "geospatial", color: "#F59E0B", records: 16, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-24", name: "Stadium", type: "geospatial", color: "#F59E0B", records: 6, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "loi-25", name: "Train Station", type: "geospatial", color: "#F59E0B", records: 9, visible: false, system: false, layerType: "point", opacity: 80, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
    ],
  },
  {
    id: "sg3",
    name: "System Generated",
    collapsed: false,
    sources: [
      { id: "ds3", name: "Flagged Records", type: "system", color: "#F97316", records: 1847, visible: true, system: true, layerType: "icon", opacity: 100, pointSize: 8, colorBy: "Flagged Status", showLabels: true, blendMode: "normal", layers: [] },
      { id: "ds4", name: "Tracer Results", type: "system", color: "#A855F7", records: 632, visible: false, system: true, layerType: "arc", opacity: 60, pointSize: 3, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
    ],
  },
];

// Flat sources list derived from groups (for backwards compat with conditions, tooltip, etc.)
const flattenGroups = (grps) => grps.flatMap((g) => g.sources);
const INITIAL_SOURCES = flattenGroups(INITIAL_SOURCE_GROUPS);

const LAYER_TYPES = ["point", "icon", "arc", "hexbin", "heatmap", "geojson"];
const BLEND_MODES = ["normal", "additive", "subtractive"];
const COLOR_BY_OPTIONS = ["none", "Device Type", "Carrier", "Signal Strength", "Flagged Status", "Network Protocol"];

const DISPLAY_CAP = 50000;

/* ── Map style options ── */
const MAP_STYLES = [
  { id: "none",       name: "No Basemap",            hue: 0,   sat: 0,  light: 4  },
  { id: "darkmatter", name: "DarkMatter",             hue: 220, sat: 15, light: 10 },
  { id: "positron",   name: "Positron",               hue: 210, sat: 8,  light: 75 },
  { id: "voyager",    name: "Voyager",                hue: 40,  sat: 20, light: 65 },
  { id: "satellite",  name: "Satellite With Streets",  hue: 120, sat: 30, light: 25 },
  { id: "dark",       name: "Dark",                   hue: 215, sat: 20, light: 18 },
  { id: "light",      name: "Light",                  hue: 210, sat: 10, light: 85 },
  { id: "mutedlight", name: "Muted Light",            hue: 200, sat: 6,  light: 78 },
  { id: "mutednight", name: "Muted Night",            hue: 225, sat: 12, light: 14 },
];

/* ── Map layer definitions ── */
const INITIAL_MAP_LAYERS = [
  { id: "label",      name: "Label",       icon: Type,          visible: true  },
  { id: "road",       name: "Road",        icon: Milestone,     visible: true  },
  { id: "border",     name: "Border",      icon: SquareDashed,  visible: false },
  { id: "building",   name: "Building",    icon: Building2,     visible: true  },
  { id: "water",      name: "Water",       icon: Droplets,      visible: true  },
  { id: "land",       name: "Land",        icon: Mountain,      visible: true  },
  { id: "3dbuilding", name: "3d Building", icon: Cuboid,        visible: false },
];

/* ── Tooltip field definitions per source ── */
const TOOLTIP_FIELDS = {
  ds1: [
    { key: "device_id", label: "Device ID", type: "text", icon: Hash },
    { key: "device_type", label: "Device Type", type: "text", icon: Smartphone },
    { key: "carrier", label: "Carrier", type: "text", icon: Radio },
    { key: "signal_strength", label: "Signal Strength", type: "number", icon: Signal },
    { key: "imsi_prefix", label: "IMSI Prefix", type: "text", icon: Hash },
    { key: "network_protocol", label: "Network Protocol", type: "text", icon: Wifi },
    { key: "timestamp", label: "Timestamp", type: "date", icon: Clock },
    { key: "lat", label: "Latitude", type: "number", icon: MapPinned },
    { key: "lng", label: "Longitude", type: "number", icon: MapPinned },
    { key: "note", label: "Note", type: "text", icon: FileText },
  ],
  ds2: [
    { key: "tower_id", label: "Tower ID", type: "text", icon: Hash },
    { key: "carrier", label: "Carrier", type: "text", icon: Radio },
    { key: "signal_strength", label: "Signal Strength", type: "number", icon: Signal },
    { key: "network_protocol", label: "Network Protocol", type: "text", icon: Wifi },
    { key: "sector", label: "Sector", type: "text", icon: Target },
    { key: "lat", label: "Latitude", type: "number", icon: MapPinned },
    { key: "lng", label: "Longitude", type: "number", icon: MapPinned },
    { key: "timestamp", label: "Timestamp", type: "date", icon: Clock },
  ],
  ds3: [
    { key: "id", label: "ID", type: "text", icon: Hash },
    { key: "audio_file_id", label: "Audio File ID", type: "text", icon: FileText },
    { key: "address_text", label: "Address Text", type: "text", icon: MapPinned },
    { key: "address_confidence", label: "Address Confidence", type: "number", icon: Signal },
    { key: "context_snippet", label: "Context Snippet", type: "text", icon: FileText },
    { key: "flagged_status", label: "Flagged Status", type: "text", icon: Flag },
    { key: "flagged_reason", label: "Flagged Reason", type: "text", icon: FileText },
  ],
  ds4: [
    { key: "trace_id", label: "Trace ID", type: "text", icon: Hash },
    { key: "origin", label: "Origin", type: "text", icon: MapPinned },
    { key: "destination", label: "Destination", type: "text", icon: Target },
    { key: "duration", label: "Duration", type: "number", icon: Timer },
    { key: "hops", label: "Hops", type: "number", icon: ListOrdered },
    { key: "status", label: "Status", type: "text", icon: Flag },
  ],
};

/* Default tooltip selections per source */
const INITIAL_TOOLTIP_SELECTIONS = {
  ds1: ["note"],
  ds2: [],
  ds3: ["id", "audio_file_id", "address_text", "address_confidence", "context_snippet"],
  ds4: [],
};

const SCOPE_OPTIONS = [
  { value: "spatial", label: "Spatial", desc: "Filter by location, area, or proximity", icon: Target },
  { value: "time", label: "Time Range", desc: "Filter by when events occurred", icon: CalendarDays },
  { value: "attribute", label: "Attribute", desc: "Filter by device or signal properties", icon: Sliders },
];

const FIELD_OPTIONS = {
  spatial: [
    { name: "Area of Interest", icon: Target, desc: "Named geographic zone" },
    { name: "Proximity to LOI", icon: Radar, desc: "Distance from a location of interest" },
    { name: "Country", icon: Globe, desc: "Country-level boundary" },
    { name: "Region", icon: Map, desc: "State or administrative region" },
    { name: "City", icon: Navigation, desc: "City-level boundary" },
    { name: "Lat/Lng Bounds", icon: CircleDot, desc: "Custom coordinate rectangle" },
  ],
  time: [
    { name: "Timestamp", icon: Clock, desc: "Exact event time" },
    { name: "First Seen", icon: CalendarDays, desc: "Earliest recorded appearance" },
    { name: "Last Seen", icon: CalendarDays, desc: "Most recent appearance" },
    { name: "Duration in Area", icon: Timer, desc: "Time spent within a zone" },
  ],
  attribute: [
    { name: "Device Type", icon: Smartphone, desc: "Mobile, tablet, IoT, etc." },
    { name: "Carrier", icon: Radio, desc: "Network carrier or operator" },
    { name: "IMSI Prefix", icon: Hash, desc: "Subscriber identity prefix" },
    { name: "IMEI TAC", icon: Hash, desc: "Device type allocation code" },
    { name: "Signal Strength", icon: Signal, desc: "Measured signal power (dBm)" },
    { name: "Network Protocol", icon: Wifi, desc: "2G, 3G, 4G, 5G" },
    { name: "Flagged Status", icon: Flag, desc: "Whether device is flagged" },
  ],
};

const OPERATOR_OPTIONS = {
  string: ["equals", "not equals", "contains", "starts with", "in list"],
  numeric: ["greater than", "less than", "between", "equals"],
  spatial: ["within", "outside", "within radius of"],
  date: ["before", "after", "between", "last N days"],
};

const NUMERIC_FIELDS = ["Signal Strength", "Duration in Area"];
const DATE_FIELDS = ["Timestamp", "First Seen", "Last Seen"];
const SPATIAL_FIELDS = ["Area of Interest", "Proximity to LOI", "Lat/Lng Bounds"];

/* ── Saved queries (simulated persistence) ── */
const SAVED_QUERIES = [
  {
    id: "sq1",
    name: "Downtown Mobile Devices — Mar 1–7",
    savedAt: "Mar 12, 2026",
    sources: ["Device Locations", "Cell Tower Pings"],
    conditionCount: 3,
  },
  {
    id: "sq2",
    name: "Flagged IMSI Prefixes — Sector 9",
    savedAt: "Mar 18, 2026",
    sources: ["Device Locations", "Flagged Records"],
    conditionCount: 5,
  },
  {
    id: "sq3",
    name: "Night Activity — All Sources",
    savedAt: "Mar 22, 2026",
    sources: ["Device Locations", "Cell Tower Pings", "Tracer Results"],
    conditionCount: 2,
  },
];

function getOperatorsForField(field) {
  if (NUMERIC_FIELDS.includes(field)) return OPERATOR_OPTIONS.numeric;
  if (DATE_FIELDS.includes(field)) return OPERATOR_OPTIONS.date;
  if (SPATIAL_FIELDS.includes(field)) return OPERATOR_OPTIONS.spatial;
  return OPERATOR_OPTIONS.string;
}

function readBack(c) {
  if (!c.field || !c.operator) return "Incomplete condition";
  const val = c.value || "…";
  if (c.scope === "time" && c.operator === "between") return `${c.field} between ${val}`;
  if (c.scope === "spatial" && c.operator === "within") return `${c.field} within ${val}`;
  if (c.scope === "spatial" && c.operator === "within radius of") return `Within ${val} of ${c.field}`;
  return `${c.field} ${c.operator} ${val}`;
}

/* ── Simulated record reduction per condition ── */
function simulateFilteredCount(baseCounts, groups) {
  const totalConditions = groups.reduce((s, g) => s + g.conditions.length, 0);
  if (totalConditions === 0) return baseCounts;
  // Each condition reduces records by a diminishing factor
  const factor = Math.pow(0.72, totalConditions);
  const result = {};
  for (const [id, count] of Object.entries(baseCounts)) {
    result[id] = Math.max(Math.round(count * factor), Math.round(count * 0.02));
  }
  return result;
}

let _cid = 4;
let _gid = 2;

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function DiscoverQueryBuilder() {
  const [queryName, setQueryName] = useState("Untitled Query");
  const [isEditingName, setIsEditingName] = useState(false);
  const prefersReduced = useReducedMotion();

  /* GAP 5: Collapse-to-tab */
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  const [activeSection, setActiveSection] = useState("sources");

  const [sourceGroups, setSourceGroups] = useState(INITIAL_SOURCE_GROUPS);
  // Flat sources derived from groups — used by conditions, tooltip, map placeholder, etc.
  const sources = useMemo(() => flattenGroups(sourceGroups), [sourceGroups]);
  const setSources = null; // Removed — use sourceGroups mutations below

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Group 1",
      logic: "AND",
      conditions: [
        { id: 1, scope: "spatial", field: "Area of Interest", operator: "within", value: "Downtown Sector 4", sourceScope: "all" },
        { id: 2, scope: "time", field: "Timestamp", operator: "between", value: "Mar 1 – Mar 7", sourceScope: "all" },
        { id: 3, scope: "attribute", field: "Device Type", operator: "equals", value: "Mobile", sourceScope: "ds1" },
      ],
    },
  ]);

  const [addingToGroup, setAddingToGroup] = useState(null);
  const [addStep, setAddStep] = useState(0);
  const [newCondition, setNewCondition] = useState({ scope: "", field: "", operator: "", value: "", sourceScope: "all" });

  // Tooltip customization
  const [tooltipSelections, setTooltipSelections] = useState(INITIAL_TOOLTIP_SELECTIONS);
  const [tooltipAddingSource, setTooltipAddingSource] = useState(null);

  // Map Settings
  const [baseMap, setBaseMap] = useState("darkmatter");
  const [stylePickerOpen, setStylePickerOpen] = useState(false);
  const [mapLayers, setMapLayers] = useState(INITIAL_MAP_LAYERS);
  const [clusterPoints, setClusterPoints] = useState(true);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  const [showSaveModal, setShowSaveModal] = useState(false);
  /* GAP 4: Load Query flow */
  const [showLoadModal, setShowLoadModal] = useState(false);

  // ── Computed ──
  const totalConditions = useMemo(() => groups.reduce((s, g) => s + g.conditions.length, 0), [groups]);

  /* GAP 2: Simulated live record counts */
  const baseCounts = useMemo(() => {
    const m = {};
    sources.forEach((s) => { if (s.visible) m[s.id] = s.records; });
    return m;
  }, [sources]);

  const filteredCounts = useMemo(() => simulateFilteredCount(baseCounts, groups), [baseCounts, groups]);

  const totalRecords = useMemo(() => Object.values(filteredCounts).reduce((s, n) => s + n, 0), [filteredCounts]);

  const unfilteredTotal = useMemo(() => sources.filter((s) => s.visible).reduce((s, d) => s + d.records, 0), [sources]);

  const isCapped = totalRecords > DISPLAY_CAP;
  const isFiltered = totalRecords < unfilteredTotal;

  // ── Handlers ──
  const toggle = (key) => setActiveSection((prev) => (prev === key ? null : key));

  // Helper: map over a source inside any group
  const mapSource = (id, fn) => setSourceGroups((gs) =>
    gs.map((g) => ({ ...g, sources: g.sources.map((s) => (s.id === id ? fn(s) : s)) }))
  );

  const toggleSourceVis = (id) => mapSource(id, (s) => ({ ...s, visible: !s.visible }));

  /* Layer management — update any layer property for a source */
  const updateSourceLayer = (id, key, value) => mapSource(id, (s) => ({ ...s, [key]: value }));

  const addSourceSubLayer = (sourceId) => {
    const parent = sources.find((s) => s.id === sourceId);
    if (!parent) return;
    const LAYER_COLORS = ["#F472B6", "#FBBF24", "#34D399", "#60A5FA", "#C084FC", "#F87171"];
    const newLayer = {
      id: `${sourceId}-layer-${Date.now()}`,
      name: `Layer ${(parent.layers || []).length + 2}`,
      layerType: "point",
      opacity: 80,
      pointSize: 4,
      colorBy: "none",
      blendMode: "normal",
      visible: true,
      color: LAYER_COLORS[(parent.layers || []).length % LAYER_COLORS.length],
    };
    mapSource(sourceId, (s) => ({ ...s, layers: [...(s.layers || []), newLayer] }));
  };

  const removeSourceSubLayer = (sourceId, layerId) =>
    mapSource(sourceId, (s) => ({ ...s, layers: (s.layers || []).filter((l) => l.id !== layerId) }));

  const updateSourceSubLayer = (sourceId, layerId, key, value) =>
    mapSource(sourceId, (s) => ({
      ...s,
      layers: (s.layers || []).map((l) => (l.id === layerId ? { ...l, [key]: value } : l)),
    }));

  // Group-level handlers
  let _sgid = INITIAL_SOURCE_GROUPS.length;
  const toggleSourceGroupCollapse = (gid) =>
    setSourceGroups((gs) => gs.map((g) => (g.id === gid ? { ...g, collapsed: !g.collapsed } : g)));

  const renameSourceGroup = (gid, name) =>
    setSourceGroups((gs) => gs.map((g) => (g.id === gid ? { ...g, name } : g)));

  const removeSourceGroup = (gid) =>
    setSourceGroups((gs) => gs.filter((g) => g.id !== gid));

  const addSourceGroup = () => {
    _sgid++;
    setSourceGroups((gs) => [...gs, { id: `sg${_sgid}`, name: `Group ${_sgid}`, collapsed: false, sources: [] }]);
  };

  const addDatasetToGroup = (gid) => {
    const colors = ["#4A9EFF", "#22C55E", "#F59E0B", "#EC4899", "#8B5CF6", "#14B8A6"];
    const newDs = {
      id: `ds-${Date.now()}`,
      name: "New Dataset",
      type: "geospatial",
      color: colors[Math.floor(Math.random() * colors.length)],
      records: 0,
      visible: true,
      system: false,
      layerType: "point",
      opacity: 80,
      pointSize: 4,
      colorBy: "none",
      showLabels: false,
      blendMode: "normal",
      layers: [],
    };
    setSourceGroups((gs) => gs.map((g) => (g.id === gid ? { ...g, sources: [...g.sources, newDs] } : g)));
  };

  const removeSourceFromGroup = (gid, sid) =>
    setSourceGroups((gs) => gs.map((g) => (g.id === gid ? { ...g, sources: g.sources.filter((s) => s.id !== sid) } : g)));

  const toggleGroupLogic = (gid) => setGroups((p) => p.map((g) => (g.id === gid ? { ...g, logic: g.logic === "AND" ? "OR" : "AND" } : g)));

  const removeCondition = (gid, cid) => setGroups((p) => p.map((g) => (g.id === gid ? { ...g, conditions: g.conditions.filter((c) => c.id !== cid) } : g)));

  const addGroup = () => {
    _gid++;
    setGroups((p) => [...p, { id: _gid, name: `Group ${_gid}`, logic: "AND", conditions: [] }]);
  };

  const removeGroup = (gid) => setGroups((p) => p.filter((g) => g.id !== gid));

  /* GAP 3: Group renaming */
  const renameGroup = (gid, newName) => setGroups((p) => p.map((g) => (g.id === gid ? { ...g, name: newName } : g)));

  /* GAP 3: Group reordering */
  const moveGroup = (gid, direction) => {
    setGroups((p) => {
      const idx = p.findIndex((g) => g.id === gid);
      if (idx < 0) return p;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= p.length) return p;
      const next = [...p];
      [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
      return next;
    });
  };

  const startAdd = (gid) => {
    setAddingToGroup(gid);
    setAddStep(0);
    setNewCondition({ scope: "", field: "", operator: "", value: "", sourceScope: "all" });
  };

  const cancelAdd = () => { setAddingToGroup(null); setAddStep(0); };

  const pickScope = (v) => { setNewCondition((p) => ({ ...p, scope: v, field: "", operator: "", value: "" })); setAddStep(1); };
  const pickField = (v) => { setNewCondition((p) => ({ ...p, field: v, operator: "", value: "" })); setAddStep(2); };
  const pickOp = (v) => { setNewCondition((p) => ({ ...p, operator: v })); setAddStep(3); };
  const goBack = () => {
    if (addStep === 1) { setNewCondition((p) => ({ ...p, scope: "", field: "", operator: "", value: "" })); setAddStep(0); }
    else if (addStep === 2) { setNewCondition((p) => ({ ...p, field: "", operator: "", value: "" })); setAddStep(1); }
    else if (addStep === 3) { setNewCondition((p) => ({ ...p, operator: "", value: "" })); setAddStep(2); }
  };

  const confirmAdd = () => {
    _cid++;
    setGroups((p) => p.map((g) => (g.id === addingToGroup ? { ...g, conditions: [...g.conditions, { ...newCondition, id: _cid }] } : g)));
    cancelAdd();
  };

  /* ── Map layer handlers ── */
  const toggleMapLayer = (layerId) => setMapLayers((p) => p.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l)));
  const moveMapLayer = (layerId, direction) => {
    setMapLayers((p) => {
      const idx = p.findIndex((l) => l.id === layerId);
      if (idx < 0) return p;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= p.length) return p;
      const next = [...p];
      [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
      return next;
    });
  };

  /* ── Tooltip handlers ── */
  const totalTooltipFields = useMemo(() => Object.values(tooltipSelections).reduce((s, arr) => s + arr.length, 0), [tooltipSelections]);

  const addTooltipField = (sourceId, fieldKey) => {
    setTooltipSelections((p) => ({
      ...p,
      [sourceId]: [...(p[sourceId] || []), fieldKey],
    }));
  };

  const removeTooltipField = (sourceId, fieldKey) => {
    setTooltipSelections((p) => ({
      ...p,
      [sourceId]: (p[sourceId] || []).filter((k) => k !== fieldKey),
    }));
  };

  const clearTooltipSource = (sourceId) => {
    setTooltipSelections((p) => ({ ...p, [sourceId]: [] }));
  };

  const clearAll = () => {
    setGroups([{ id: 1, name: "Group 1", logic: "AND", conditions: [] }]);
    setSourceGroups(INITIAL_SOURCE_GROUPS);
    setQueryName("Untitled Query");
    setTooltipSelections(INITIAL_TOOLTIP_SELECTIONS);
  };

  /* ── Render ── */
  return (
    <div style={{ display: "flex", height: "100vh", background: t.bgBase, fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", position: "relative" }}>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes sectionFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      {/* ═══ SIDEBAR ═══ — always rendered, animated via transform */}
      {/* Collapsed expand button — fades in/out */}
      <button
        onClick={() => setPanelCollapsed(false)}
        title="Expand Query Builder"
        aria-label="Expand Query Builder"
        aria-hidden={!panelCollapsed}
        tabIndex={panelCollapsed ? 0 : -1}
        style={{
          position: "absolute",
          top: sp.sm,
          left: sp.sm,
          zIndex: 9,
          width: 44,
          height: 44,
          padding: 0,
          borderRadius: sp.xs,
          border: `1px solid ${t.glassBorder}`,
          background: t.glassBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          outline: "none",
          opacity: panelCollapsed ? 1 : 0,
          transform: panelCollapsed ? "scale(1)" : "scale(0.92)",
          pointerEvents: panelCollapsed ? "auto" : "none",
          transition: prefersReduced ? "none" : `opacity ${motion.medium} ${motion.easeOut}, transform ${motion.medium} ${motion.easeOut}`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(24, 24, 24, 0.7)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = t.glassBg)}
        onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
        onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
        onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
      >
        <PanelLeftOpen size={18} color={t.yellow500} />
      </button>

      {/* Panel — slides + fades */}
      <div
        role="region"
        aria-label="Query Builder"
        aria-hidden={panelCollapsed}
        style={{
          position: "absolute",
          top: sp.sm,
          left: sp.sm,
          bottom: sp.sm,
          zIndex: 10,
          width: 364,
          background: t.glassBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: sp.xs,
          border: `1px solid ${t.glassBorder}`,
          display: "flex",
          flexDirection: "column",
          ...type.body,
          color: t.textPrimary,
          overflow: "hidden",
          opacity: panelCollapsed ? 0 : 1,
          transform: panelCollapsed ? "translateX(-16px)" : "translateX(0)",
          pointerEvents: panelCollapsed ? "none" : "auto",
          transition: prefersReduced ? "none" : `opacity ${motion.slow} ${panelCollapsed ? motion.easeIn : motion.easeOut}, transform ${motion.slow} ${panelCollapsed ? motion.easeIn : motion.easeOut}`,
        }}
      >
          {/* ── Query Bar (name + icon actions only) ── */}
          <QueryBar
            queryName={queryName}
            setQueryName={setQueryName}
            isEditingName={isEditingName}
            setIsEditingName={setIsEditingName}
            onClear={clearAll}
            onCollapse={() => setPanelCollapsed(true)}
            onSave={() => setShowSaveModal(true)}
          />

          {/* ── Icon rail + content panel ── */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

            {/* ─── Vertical icon rail ─── */}
            <div style={{
              width: 44, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
              background: t.bgBase, borderRight: `1px solid ${t.borderDark}`, paddingTop: sp.xs, gap: 1,
            }}>
              {/* Section buttons */}
              {[
                { key: "sources", icon: Layers, label: "Data Sources & Layers", count: sources.filter((s) => s.visible).length },
                { key: "conditions", icon: Filter, label: "Conditions", count: totalConditions },
                { key: "tooltip", icon: MessageSquareText, label: "Tooltip Fields", count: totalTooltipFields || undefined },
                { key: "mapSettings", icon: Map, label: "Map Settings" },
              ].map((sec) => {
                const isActive = activeSection === sec.key;
                const I = sec.icon;
                return (
                  <button
                    key={sec.key}
                    onClick={() => toggle(sec.key)}
                    title={sec.label}
                    aria-label={sec.label}
                    aria-pressed={isActive}
                    style={{
                      width: 44, height: 44, padding: 0,
                      background: isActive ? t.bgField : "transparent",
                      border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", outline: "none", position: "relative",
                      transition: "background 0.12s, color 0.12s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.querySelector("svg").style.color = isActive ? t.textPrimary : t.textSecondary; }}
                    onMouseLeave={(e) => { e.currentTarget.querySelector("svg").style.color = isActive ? t.textPrimary : t.textSubtle; }}
                    onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
                    onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
                  >
                    <I size={16} color={isActive ? t.textPrimary : t.textSubtle} />
                    {sec.count !== undefined && sec.count > 0 && (
                      <span style={{
                        position: "absolute", top: 5, right: 5,
                        fontSize: 8, fontWeight: 700,
                        color: t.textInverse, background: t.textSecondary,
                        borderRadius: 6, minWidth: 14, height: 14,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: `0 ${sp.xs - 1}px`, lineHeight: 1,
                      }}>
                        {sec.count}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Spacer pushes save/load to bottom */}
              <div style={{ flex: 1 }} />

              {/* Divider */}
              <div style={{ width: 24, height: 1, background: t.borderDark, margin: `${sp.xs}px 0` }} />

              {/* Save & Load — bottom-aligned */}
              {[
                { icon: Save, label: "Save query", action: () => setShowSaveModal(true) },
                { icon: FolderOpen, label: "Load saved query", action: () => setShowLoadModal(true) },
              ].map((btn) => {
                const I = btn.icon;
                return (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    title={btn.label}
                    aria-label={btn.label}
                    style={{
                      width: 44, height: 44, padding: 0,
                      background: "transparent", border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", outline: "none",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = t.bgHover; e.currentTarget.querySelector("svg").style.color = t.textPrimary; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.querySelector("svg").style.color = t.textSubtle; }}
                    onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
                    onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
                  >
                    <I size={16} color={t.textSubtle} />
                  </button>
                );
              })}
            </div>

            {/* ─── Section content panel — cross-fade ─── */}
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }}>

              {/* DATA SOURCES */}
              {activeSection === "sources" && (
                <div style={{ padding: sp.md, animation: `sectionFadeIn ${motion.fast} ${motion.easeOut} both` }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: sp.sm }}>DATA SOURCES & LAYERS</div>

                  {sourceGroups.map((grp) => (
                    <SourceGroupSection
                      key={grp.id}
                      group={grp}
                      filteredCounts={filteredCounts}
                      isFiltered={isFiltered}
                      onToggleCollapse={() => toggleSourceGroupCollapse(grp.id)}
                      onRenameGroup={(name) => renameSourceGroup(grp.id, name)}
                      onRemoveGroup={() => removeSourceGroup(grp.id)}
                      onToggleSource={(sid) => toggleSourceVis(sid)}
                      onUpdateLayer={(sid, key, val) => updateSourceLayer(sid, key, val)}
                      onAddSubLayer={(sid) => addSourceSubLayer(sid)}
                      onRemoveSubLayer={(sid, lid) => removeSourceSubLayer(sid, lid)}
                      onUpdateSubLayer={(sid, lid, key, val) => updateSourceSubLayer(sid, lid, key, val)}
                      onAddDataset={() => addDatasetToGroup(grp.id)}
                      onRemoveSource={(sid) => removeSourceFromGroup(grp.id, sid)}
                    />
                  ))}

                  {/* Add Group */}
                  <button
                    onClick={addSourceGroup}
                    style={{
                      width: "100%",
                      marginTop: sp.xs,
                      padding: sp.xs,
                      background: "transparent",
                      border: `1px dashed ${t.borderMuted}`,
                      borderRadius: sp.xs,
                      color: t.textSecondary,
                      fontSize: 11,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: sp.xs,
                      outline: "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.borderSubtle; e.currentTarget.style.color = t.textPrimary; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.borderMuted; e.currentTarget.style.color = t.textSecondary; }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <Plus size={11} /> Add Group
                  </button>
                </div>
              )}

              {/* CONDITIONS */}
              {activeSection === "conditions" && (
                <div style={{ padding: sp.md, animation: `sectionFadeIn ${motion.fast} ${motion.easeOut} both` }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: sp.sm }}>CONDITIONS</div>
                  {groups.map((group, gi) => (
                    <div key={group.id}>
                      {gi > 0 && <InterGroupLabel />}
                      <ConditionGroup
                        group={group}
                        groupIndex={gi}
                        groupCount={groups.length}
                        sources={sources}
                        canRemove={groups.length > 1}
                        onToggleLogic={() => toggleGroupLogic(group.id)}
                        onRemoveCondition={(cid) => removeCondition(group.id, cid)}
                        onAddCondition={() => startAdd(group.id)}
                        onRemoveGroup={() => removeGroup(group.id)}
                        onRename={(name) => renameGroup(group.id, name)}
                        onMoveUp={() => moveGroup(group.id, "up")}
                        onMoveDown={() => moveGroup(group.id, "down")}
                        isAdding={addingToGroup === group.id}
                        addStep={addStep}
                        newCondition={newCondition}
                        onPickScope={pickScope}
                        onPickField={pickField}
                        onPickOp={pickOp}
                        onConfirm={confirmAdd}
                        onCancel={cancelAdd}
                        onBack={goBack}
                        onValueChange={(v) => setNewCondition((p) => ({ ...p, value: v }))}
                        onSourceScopeChange={(v) => setNewCondition((p) => ({ ...p, sourceScope: v }))}
                      />
                    </div>
                  ))}
                  <button
                    onClick={addGroup}
                    style={{
                      width: "100%",
                      padding: sp.sm,
                      marginTop: sp.sm,
                      background: "transparent",
                      border: `1px dashed ${t.borderMuted}`,
                      borderRadius: sp.xs,
                      color: t.textSecondary,
                      ...type.secondary,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: sp.sm,
                      outline: "none",
                    }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <Plus size={12} /> Add Group
                  </button>
                </div>
              )}

              {/* TOOLTIP CUSTOMIZATION */}
              {activeSection === "tooltip" && (
                <div style={{ padding: sp.md, animation: `sectionFadeIn ${motion.fast} ${motion.easeOut} both` }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: sp.sm }}>TOOLTIP FIELDS</div>
                  {sources.map((src) => (
                    <TooltipSourceGroup
                      key={src.id}
                      source={src}
                      availableFields={TOOLTIP_FIELDS[src.id] || []}
                      selectedKeys={tooltipSelections[src.id] || []}
                      isAdding={tooltipAddingSource === src.id}
                      onStartAdd={() => setTooltipAddingSource(src.id)}
                      onCancelAdd={() => setTooltipAddingSource(null)}
                      onAddField={(fieldKey) => { addTooltipField(src.id, fieldKey); setTooltipAddingSource(null); }}
                      onRemoveField={(fieldKey) => removeTooltipField(src.id, fieldKey)}
                      onClearAll={() => clearTooltipSource(src.id)}
                    />
                  ))}
                </div>
              )}

              {/* MAP SETTINGS */}
              {activeSection === "mapSettings" && (
                <div style={{ padding: sp.md, animation: `sectionFadeIn ${motion.fast} ${motion.easeOut} both` }}>

                  {/* ─── Map Style ─── */}
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: sp.sm }}>MAP STYLE</div>
                  <MapStylePicker
                    styles={MAP_STYLES}
                    selected={baseMap}
                    isOpen={stylePickerOpen}
                    onToggle={() => setStylePickerOpen((p) => !p)}
                    onSelect={(id) => { setBaseMap(id); setStylePickerOpen(false); }}
                  />

                  {/* ─── Map Layers ─── */}
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: sp.sm, marginTop: sp.xl }}>MAP LAYERS</div>
                  <div style={{ border: `1px solid ${t.borderDark}`, borderRadius: sp.sm, overflow: "hidden" }}>
                    {mapLayers.map((layer, i) => (
                      <MapLayerRow
                        key={layer.id}
                        layer={layer}
                        isFirst={i === 0}
                        isLast={i === mapLayers.length - 1}
                        onToggleVis={() => toggleMapLayer(layer.id)}
                        onMoveUp={() => moveMapLayer(layer.id, "up")}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* No section selected */}
              {activeSection === null && (
                <div style={{ padding: sp.xl, display: "flex", alignItems: "center", justifyContent: "center", height: "100%", ...type.secondary, color: t.textSubtle }}>
                  Select a section
                </div>
              )}
            </div>
          </div>
        </div>

      {/* ═══ MAP TOOLBAR ═══ — positioned next to expand btn / sidebar, 4px gap */}
      <div style={{
        position: "absolute",
        top: sp.sm,
        left: panelCollapsed ? (sp.sm + 44 + sp.xs) : (sp.sm + 364 + sp.xs),
        right: sp.sm,
        zIndex: 10,
        transition: prefersReduced ? "none" : `left ${motion.slow} ${motion.easeOut}`,
      }}>
        <MapToolbar />
      </div>

      {/* ═══ MAP AREA ═══ */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <MapPlaceholder sources={sources} filteredCounts={filteredCounts} baseMap={baseMap} heatmapEnabled={heatmapEnabled} />
      </div>

      {/* ═══ SAVE MODAL ═══ */}
      {showSaveModal && (
        <SaveModal
          queryName={queryName}
          sources={sources}
          groups={groups}
          totalConditions={totalConditions}
          baseMap={baseMap}
          onClose={() => setShowSaveModal(false)}
        />
      )}

      {/* ═══ LOAD MODAL (GAP 4) ═══ */}
      {showLoadModal && (
        <LoadModal onClose={() => setShowLoadModal(false)} onLoad={(q) => { setQueryName(q.name); setShowLoadModal(false); }} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   QUERY BAR
   ══════════════════════════════════════════════════════════════ */
function QueryBar({ queryName, setQueryName, isEditingName, setIsEditingName, onClear, onCollapse, onSave }) {
  const [draftName, setDraftName] = useState(queryName);
  const isDirty = isEditingName && draftName !== queryName;

  const commitName = () => {
    if (draftName.trim()) setQueryName(draftName.trim());
    else setDraftName(queryName);
    setIsEditingName(false);
  };

  const startEditing = () => { setDraftName(queryName); setIsEditingName(true); };

  return (
    <div style={{ flexShrink: 0, background: t.bgBase, borderBottom: `1px solid ${t.borderDark}`, minHeight: 44, boxSizing: "border-box", display: "flex", alignItems: "stretch" }}>

        {/* Collapse — matches rail buttons exactly */}
        <button
          onClick={onCollapse}
          title="Collapse panel"
          aria-label="Collapse panel"
          style={{ width: 44, flexShrink: 0, background: "none", border: "none", borderRight: `1px solid ${t.borderDark}`, cursor: "pointer", padding: 0, outline: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = t.bgHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <PanelLeftClose size={16} color={t.textSubtle} />
        </button>

      <div style={{ display: "flex", alignItems: "center", gap: sp.sm, flex: 1, padding: `0 ${sp.md}px` }}>

        {/* Editable query name */}
        {isEditingName ? (
          <input
            autoFocus
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => e.key === "Enter" && commitName()}
            style={{
              flex: 1, minWidth: 0,
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${isDirty ? t.yellow500 : t.borderDark}`,
              borderRadius: 0,
              padding: `${sp.xs}px 2px`,
              marginBottom: -1,
              color: t.textPrimary,
              ...type.subheading,
              outline: "none",
              transition: "border-color 0.15s",
            }}
          />
        ) : (
          <span
            onClick={startEditing}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && startEditing()}
            style={{ flex: 1, minWidth: 0, ...type.subheading, cursor: "text", padding: `${sp.xs}px 2px`, borderRadius: sp.xs, transition: "color 0.15s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", outline: "none", color: t.textPrimary }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {queryName}
          </span>
        )}

        {/* Save — only visible while editing and name has changed */}
        {isDirty && (
          <button
            onClick={() => { commitName(); onSave(); }}
            title="Save query"
            aria-label="Save query"
            style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, flexShrink: 0, borderRadius: sp.xs, outline: "none", display: "flex", alignItems: "center" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Save size={14} color={t.textPrimary} />
          </button>
        )}

        {/* Clear */}
        <QBarIcon icon={<RotateCcw size={14} />} title="Clear all" onClick={onClear} />
      </div>
    </div>
  );
}


function QBarIcon({ icon, title, onClick, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: sp.xs,
        border: accent ? "none" : `1px solid ${hovered ? t.yellow700 : t.borderLight}`,
        background: accent ? t.yellow500 : hovered ? t.bgHover : "transparent",
        color: accent ? t.textInverse : hovered ? t.textPrimary : t.textSecondary,
        cursor: "pointer",
        padding: 0,
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
        outline: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {icon}
    </button>
  );
}


/* ══════════════════════════════════════════════════════════════
   SECTION HEADER
   ══════════════════════════════════════════════════════════════ */
function SectionHeader({ label, icon, isOpen, onToggle, count }) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: sp.sm,
        padding: `${sp.md}px ${sp.md}px`,
        background: "transparent",
        border: "none",
        borderBottom: isOpen ? `1px solid ${t.borderLight}` : "none",
        color: t.textPrimary,
        ...type.caption,
        cursor: "pointer",
        outline: "none",
      }}
      onFocus={(e) => (e.currentTarget.style.boxShadow = `inset ${focusRing}`)}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      {icon}
      <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
      {count !== undefined && <CountBadge n={count} />}
    </button>
  );
}

function CountBadge({ n }) {
  return (
    <span style={{ ...type.secondary, fontWeight: 700, color: t.textInverse, background: t.textSecondary, borderRadius: 10, padding: `1px ${sp.sm}px`, minWidth: 20, textAlign: "center", lineHeight: "18px" }}>
      {n}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   SOURCE ROW + LAYER MANAGEMENT
   Replaces Kepler's Layers panel: visibility, type, opacity,
   point size, color-by, labels, blend mode — all per source.
   ══════════════════════════════════════════════════════════════ */
function SourceGroupSection({ group, filteredCounts, isFiltered, onToggleCollapse, onRenameGroup, onRemoveGroup, onToggleSource, onUpdateLayer, onAddSubLayer, onRemoveSubLayer, onUpdateSubLayer, onAddDataset, onRemoveSource }) {
  const [renaming, setRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState(group.name);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hoveringHeader, setHoveringHeader] = useState(false);
  const visibleCount = group.sources.filter((s) => s.visible).length;

  const commitRename = () => {
    if (renameVal.trim()) onRenameGroup(renameVal.trim());
    setRenaming(false);
  };

  return (
    <div style={{ marginBottom: sp.sm }}>
      {/* Group header */}
      <div
        style={{ display: "flex", alignItems: "center", gap: sp.xs, padding: `${sp.xs}px 0`, marginBottom: group.collapsed ? 0 : sp.xs }}
        onMouseEnter={() => setHoveringHeader(true)}
        onMouseLeave={() => { setHoveringHeader(false); setConfirmDelete(false); }}
      >
        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, outline: "none", display: "flex", flexShrink: 0 }}
          aria-label={group.collapsed ? "Expand group" : "Collapse group"}
        >
          <ChevronDown
            size={12}
            color={t.textSubtle}
            style={{ transition: `transform ${motion.fast} ${motion.easeOut}`, transform: group.collapsed ? "rotate(-90deg)" : "none" }}
          />
        </button>

        {/* Group name */}
        {renaming ? (
          <input
            autoFocus
            value={renameVal}
            onChange={(e) => setRenameVal(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setRenaming(false); }}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${t.borderSubtle}`,
              color: t.textPrimary,
              fontSize: 11,
              fontWeight: 600,
              outline: "none",
              padding: "1px 0",
            }}
          />
        ) : (
          <span
            style={{ flex: 1, fontSize: 11, fontWeight: 600, color: t.textSecondary, cursor: "text", userSelect: "none" }}
            onDoubleClick={() => { setRenameVal(group.name); setRenaming(true); }}
          >
            {group.name}
          </span>
        )}

        {/* Count badge */}
        <span style={{ fontSize: 9, color: t.textSubtle, flexShrink: 0 }}>
          {visibleCount}/{group.sources.length}
        </span>

        {/* Delete group — hover reveal */}
        {hoveringHeader && !renaming && (
          confirmDelete ? (
            <div style={{ display: "flex", alignItems: "center", gap: sp.xs, flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: t.danger }}>Delete?</span>
              <button
                onClick={onRemoveGroup}
                style={{ background: t.danger + "18", border: `1px solid ${t.danger}44`, borderRadius: 3, cursor: "pointer", padding: `1px ${sp.xs}px`, fontSize: 10, color: t.danger, outline: "none", lineHeight: "16px" }}
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{ background: "none", border: `1px solid ${t.borderMuted}`, borderRadius: 3, cursor: "pointer", padding: `1px ${sp.xs}px`, fontSize: 10, color: t.textSecondary, outline: "none", lineHeight: "16px" }}
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => group.sources.length > 0 ? setConfirmDelete(true) : onRemoveGroup()}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2, opacity: 0.45, outline: "none", display: "flex", flexShrink: 0, transition: "opacity 0.1s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
              aria-label={`Delete ${group.name}`}
            >
              <X size={12} color={t.textSubtle} />
            </button>
          )
        )}
      </div>

      {/* Group body — collapsible */}
      <Expandable open={!group.collapsed}>
        {/* Level 1 rail: thin line for the group, datasets indent off it */}
        <div style={{ position: "relative", paddingLeft: sp.md + 2 }}>
          <div style={{
            position: "absolute",
            top: 0, bottom: sp.xs,
            left: 5,
            width: 1,
            background: t.borderDark,
            borderRadius: 1,
          }} />
          {group.sources.map((src) => (
            <SourceRow
              key={src.id}
              source={src}
              filteredCount={filteredCounts[src.id]}
              isFiltered={isFiltered}
              onToggle={() => onToggleSource(src.id)}
              onUpdateLayer={(key, val) => onUpdateLayer(src.id, key, val)}
              onAddSubLayer={() => onAddSubLayer(src.id)}
              onRemoveSubLayer={(lid) => onRemoveSubLayer(src.id, lid)}
              onUpdateSubLayer={(lid, key, val) => onUpdateSubLayer(src.id, lid, key, val)}
              onRemove={() => onRemoveSource(src.id)}
            />
          ))}

          {/* Add Dataset to this group */}
          <button
            onClick={onAddDataset}
            style={{
              width: "100%",
              marginTop: group.sources.length > 0 ? sp.xs : 0,
              marginBottom: sp.xs,
              padding: `${sp.xs}px ${sp.sm}px`,
              background: "transparent",
              border: `1px dashed ${t.borderDark}`,
              borderRadius: sp.xs,
              color: t.textSubtle,
              fontSize: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: sp.xs,
              outline: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.borderMuted; e.currentTarget.style.color = t.textSecondary; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.borderDark; e.currentTarget.style.color = t.textSubtle; }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Plus size={10} /> Add Dataset
          </button>
        </div>
      </Expandable>
    </div>
  );
}

function SubLayerRow({ layer, sourceColor, onUpdate, onRemove }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: sp.xs }}>
      {/* Sub-layer header */}
      <div style={{ display: "flex", alignItems: "center", gap: sp.sm, padding: "4px 8px", background: "transparent", cursor: "pointer", borderBottom: `1px solid ${t.borderDark}` }} onClick={() => setOpen(!open)}>
        <span style={{ width: 6, height: 6, borderRadius: 2, background: layer.color, flexShrink: 0 }} />
        <span style={{ fontSize: 11, flex: 1, color: t.textSecondary }}>{layer.name}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onUpdate("visible", !layer.visible); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, opacity: 0.6, outline: "none", display: "flex" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          {layer.visible ? <Eye size={11} color={t.textSubtle} /> : <EyeOff size={11} color={t.textSubtle} />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, opacity: 0.5, outline: "none", display: "flex" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
        >
          <X size={11} color={t.textSubtle} />
        </button>
        <ChevronDown size={11} color={t.textSubtle} style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }} />
      </div>

      {/* Sub-layer settings */}
      <Expandable open={open} duration={motion.fast}>
        {/* Level 3 rail: sub-layer color */}
        <div style={{ paddingLeft: sp.md, paddingTop: sp.xs, paddingBottom: sp.xs, background: "transparent", borderLeft: `1px solid ${layer.color}30`, marginLeft: 2 }}>
          {/* Layer Type */}
          <LayerField label="Layer Type">
            <select
              value={layer.layerType}
              onChange={(e) => onUpdate("layerType", e.target.value)}
              style={{ width: "100%", padding: `${sp.xs}px ${sp.sm}px`, ...type.secondary, borderRadius: 3, border: `1px solid ${t.borderSubtle}`, background: t.bgField, color: t.textPrimary, cursor: "pointer", outline: "none", textTransform: "capitalize" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = t.borderLight)}
              onBlur={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
            >
              {LAYER_TYPES.map((lt) => (
                <option key={lt} value={lt}>{lt.charAt(0).toUpperCase() + lt.slice(1)}</option>
              ))}
            </select>
          </LayerField>
          {/* Opacity */}
          <LayerField label={`Opacity: ${layer.opacity}%`}>
            <input type="range" min={0} max={100} value={layer.opacity} onChange={(e) => onUpdate("opacity", parseInt(e.target.value))} style={{ width: "100%", accentColor: layer.color, height: sp.xs, cursor: "pointer" }} />
          </LayerField>
          {/* Blend Mode */}
          <LayerField label="Blend Mode">
            <SegmentedControl options={BLEND_MODES} value={layer.blendMode} onChange={(v) => onUpdate("blendMode", v)} />
          </LayerField>
        </div>
      </Expandable>
    </div>
  );
}

function SourceRow({ source, filteredCount, isFiltered, onToggle, onUpdateLayer, onAddSubLayer, onRemoveSubLayer, onUpdateSubLayer, onRemove }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginBottom: sp.xs }}>
      {/* ── Summary row ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: sp.sm,
        padding: `${sp.xs}px ${sp.sm}px ${sp.xs}px 0`,
        background: "transparent",
        opacity: source.visible ? 1 : 0.45,
        transition: `opacity ${motion.fast} ${motion.easeOut}`,
      }}>
        <GripVertical size={12} color={t.textSubtle} style={{ cursor: "grab", flexShrink: 0, marginTop: 3 }} aria-hidden="true" />

        {/* Color dot — aligned to title */}
        <span style={{ width: 8, height: 8, borderRadius: 2, background: source.color, flexShrink: 0, marginTop: 4 }} aria-hidden="true" />

        {/* Name + counter stacked */}
        <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
          <div style={{ display: "flex", alignItems: "center", gap: sp.xs }}>
            <span style={{ ...type.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 1 }}>{source.name}</span>
            <span style={{ fontSize: 9, fontWeight: 500, color: t.textSubtle, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0, lineHeight: "14px" }}>
              {source.layerType}
            </span>
            {(source.layers || []).length > 0 && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 2,
                fontSize: 9, fontWeight: 600,
                color: source.color,
                background: source.color + "14",
                border: `1px solid ${source.color}25`,
                borderRadius: 3,
                padding: `0 ${sp.xs}px`,
                lineHeight: "14px",
                flexShrink: 0,
              }}>
                +{(source.layers || []).length}
              </span>
            )}
            {source.system && (
              <span style={{ fontSize: 9, fontWeight: 500, color: t.feedbackWarning, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0, lineHeight: "14px" }}>
                SYS
              </span>
            )}
          </div>
          {/* Counter as subheading below name */}
          <div style={{ ...type.secondary, fontSize: 10, color: t.textSubtle, marginTop: 1, display: "flex", alignItems: "center", gap: sp.xs }}>
            {source.visible && isFiltered && filteredCount !== undefined ? (
              <>
                <span style={{ color: t.textSecondary, fontWeight: 600 }}>{filteredCount.toLocaleString()}</span>
                <span style={{ color: t.textSubtle }}>/</span>
                <span>{source.records.toLocaleString()}</span>
              </>
            ) : (
              <span>{source.records.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Eye/hide + settings — grouped right, aligned to title */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <button
            onClick={onToggle}
            aria-label={source.visible ? `Hide ${source.name}` : `Show ${source.name}`}
            style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none", opacity: 0.6, transition: "opacity 0.1s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {source.visible ? <Eye size={13} color={t.textSubtle} /> : <EyeOff size={13} color={t.textSubtle} />}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse layer settings" : "Expand layer settings"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none", opacity: expanded ? 1 : 0.6, transition: "opacity 0.1s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = expanded ? "1" : "0.6")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Sliders size={13} color={t.textSubtle} />
          </button>
          {onRemove && (
            <button
              onClick={onRemove}
              aria-label={`Remove ${source.name}`}
              style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none", opacity: 0.4, transition: "opacity 0.1s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
              onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <X size={12} color={t.textSubtle} />
            </button>
          )}
        </div>
      </div>

      {/* ── Layer Settings Panel (expanded) — Level 2 rail: dataset color ── */}
      <Expandable open={expanded && source.visible} duration={motion.medium}>
        <div style={{ paddingLeft: sp.md, paddingTop: sp.xs, paddingBottom: sp.sm, background: "transparent", borderLeft: `1px solid ${source.color}30`, marginLeft: 2, marginBottom: sp.xs }}>
          {/* Layer Type */}
          <LayerField label="Layer Type">
            <select
              value={source.layerType}
              onChange={(e) => onUpdateLayer("layerType", e.target.value)}
              style={{ width: "100%", padding: `${sp.xs}px ${sp.sm}px`, ...type.secondary, borderRadius: 3, border: `1px solid ${t.borderSubtle}`, background: t.bgField, color: t.textPrimary, cursor: "pointer", outline: "none" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = t.borderLight)}
              onBlur={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
            >
              {LAYER_TYPES.map((lt) => (
                <option key={lt} value={lt}>{lt.charAt(0).toUpperCase() + lt.slice(1)}</option>
              ))}
            </select>
          </LayerField>

          {/* Opacity slider */}
          <LayerField label={`Opacity: ${source.opacity}%`}>
            <input
              type="range"
              min={0}
              max={100}
              value={source.opacity}
              onChange={(e) => onUpdateLayer("opacity", parseInt(e.target.value))}
              aria-label={`Opacity: ${source.opacity}%`}
              style={{ width: "100%", accentColor: source.color, height: sp.xs, cursor: "pointer" }}
            />
          </LayerField>

          {/* Point / icon size */}
          <LayerField label={`${source.layerType === "icon" ? "Icon" : "Point"} Size: ${source.pointSize}px`}>
            <input
              type="range"
              min={1}
              max={20}
              value={source.pointSize}
              onChange={(e) => onUpdateLayer("pointSize", parseInt(e.target.value))}
              aria-label={`Point size: ${source.pointSize}px`}
              style={{ width: "100%", accentColor: source.color, height: sp.xs, cursor: "pointer" }}
            />
          </LayerField>

          {/* Color By */}
          <LayerField label="Color By">
            <select
              value={source.colorBy}
              onChange={(e) => onUpdateLayer("colorBy", e.target.value)}
              aria-label="Color by attribute"
              style={{
                width: "100%",
                padding: `${sp.xs}px ${sp.sm}px`,
                ...type.secondary,
                borderRadius: 3,
                border: `1px solid ${t.borderSubtle}`,
                background: t.bgField,
                color: t.textPrimary,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {COLOR_BY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt === "none" ? "Solid color" : opt}</option>
              ))}
            </select>
          </LayerField>

          {/* Blend Mode */}
          <LayerField label="Blend Mode">
            <SegmentedControl options={BLEND_MODES} value={source.blendMode} onChange={(v) => onUpdateLayer("blendMode", v)} />
          </LayerField>

          {/* Show Labels toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: sp.sm }}>
            <span style={{ ...type.secondary, color: t.textSecondary }}>Show Labels</span>
            <button
              onClick={() => onUpdateLayer("showLabels", !source.showLabels)}
              role="switch"
              aria-checked={source.showLabels}
              aria-label="Show labels"
              style={{
                width: 36,
                height: 20,
                borderRadius: 10,
                border: `1px solid ${source.showLabels ? t.yellow500 : t.borderSubtle}`,
                background: source.showLabels ? t.yellow950 : t.bgField,
                position: "relative",
                cursor: "pointer",
                padding: 0,
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: source.showLabels ? 17 : 2,
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: source.showLabels ? t.yellow500 : t.textSubtle,
                  transition: "left 0.15s",
                }}
              />
            </button>
          </div>

          {/* ── Additional Layers — Level 3 railing ── */}
          {(source.layers || []).length > 0 && (
            <div style={{ marginTop: sp.md, marginBottom: sp.xs }}>
              <div style={{ ...type.caption, fontSize: 10, color: t.textSubtle, marginBottom: sp.xs }}>Additional Layers</div>
              <div style={{ position: "relative", paddingLeft: sp.md + 2 }}>
                <div style={{
                  position: "absolute",
                  top: 0, bottom: 0,
                  left: 5,
                  width: 1,
                  background: `${source.color}25`,
                  borderRadius: 1,
                }} />
                {(source.layers || []).map((layer) => (
                  <SubLayerRow
                    key={layer.id}
                    layer={layer}
                    sourceColor={source.color}
                    onUpdate={(key, val) => onUpdateSubLayer(layer.id, key, val)}
                    onRemove={() => onRemoveSubLayer(layer.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add Layer button */}
          <button
            onClick={onAddSubLayer}
            style={{
              width: "100%",
              marginTop: sp.sm,
              padding: sp.sm,
              background: "transparent",
              border: `1px dashed ${t.borderMuted}`,
              borderRadius: sp.xs,
              color: t.textSecondary,
              ...type.secondary,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: sp.xs,
              outline: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.yellow500; e.currentTarget.style.color = t.yellow500; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.borderMuted; e.currentTarget.style.color = t.textSecondary; }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Plus size={11} /> Add Layer
          </button>
        </div>
      </Expandable>
    </div>
  );
}

function SegmentedControl({ options, value, onChange }) {
  const idx = options.indexOf(value);
  const pct = (idx / (options.length - 1)) * 100;
  return (
    <div style={{ position: "relative", display: "flex", background: t.bgField, borderRadius: 4, border: `1px solid ${t.borderDark}`, padding: 2, gap: 0 }}>
      {/* Sliding indicator */}
      <div style={{
        position: "absolute",
        top: 2, bottom: 2,
        left: `calc(${idx} * (100% - 4px) / ${options.length} + 2px)`,
        width: `calc((100% - 4px) / ${options.length})`,
        background: t.bgRaised,
        borderRadius: 3,
        border: `1px solid ${t.borderMuted}`,
        transition: `left ${motion.fast} ${motion.easeOut}`,
        pointerEvents: "none",
      }} />
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            flex: 1,
            position: "relative",
            zIndex: 1,
            background: "transparent",
            border: "none",
            borderRadius: 3,
            padding: `${sp.xs}px 0`,
            fontSize: 10,
            fontWeight: opt === value ? 600 : 400,
            color: opt === value ? t.textPrimary : t.textSubtle,
            cursor: "pointer",
            outline: "none",
            textTransform: "capitalize",
            letterSpacing: "0.03em",
            transition: `color ${motion.fast} ${motion.easeOut}`,
          }}
          onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function LayerField({ label, children }) {
  return (
    <div style={{ marginBottom: sp.sm }}>
      <div style={{ ...type.caption, fontSize: 10, color: t.textSubtle, marginBottom: sp.xs }}>{label}</div>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONDITION GROUP — GAP 1 (source scope) + GAP 3 (rename/reorder)
   ══════════════════════════════════════════════════════════════ */
function InterGroupLabel() {
  return (
    <div style={{ textAlign: "center", padding: `${sp.sm}px 0`, ...type.secondary, fontWeight: 700, color: t.yellow500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
      OR
    </div>
  );
}

function ConditionGroup({ group, groupIndex, groupCount, sources, canRemove, onToggleLogic, onRemoveCondition, onAddCondition, onRemoveGroup, onRename, onMoveUp, onMoveDown, isAdding, addStep, newCondition, onPickScope, onPickField, onPickOp, onConfirm, onCancel, onBack, onValueChange, onSourceScopeChange }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(group.name);

  const commitRename = () => {
    if (renameValue.trim()) onRename(renameValue.trim());
    setIsRenaming(false);
  };

  return (
    <div style={{ marginBottom: sp.xs }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: sp.xs, padding: `${sp.xs}px ${sp.sm}px`, background: "transparent", borderBottom: `1px solid ${t.borderDark}` }}>
        {/* Reorder arrows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <button onClick={onMoveUp} disabled={groupIndex === 0} aria-label="Move group up" style={{ background: "none", border: "none", cursor: groupIndex === 0 ? "default" : "pointer", padding: 2, lineHeight: 1, opacity: groupIndex === 0 ? 0.25 : 1, outline: "none", borderRadius: 2 }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <ArrowUp size={10} color={t.textSubtle} />
          </button>
          <button onClick={onMoveDown} disabled={groupIndex === groupCount - 1} aria-label="Move group down" style={{ background: "none", border: "none", cursor: groupIndex === groupCount - 1 ? "default" : "pointer", padding: 2, lineHeight: 1, opacity: groupIndex === groupCount - 1 ? 0.25 : 1, outline: "none", borderRadius: 2 }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <ArrowDown size={10} color={t.textSubtle} />
          </button>
        </div>

        {/* Group name — editable */}
        {isRenaming ? (
          <input
            autoFocus
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => e.key === "Enter" && commitRename()}
            style={{ flex: 1, ...type.body, fontWeight: 600, color: t.textPrimary, background: t.bgField, border: `1px solid ${t.yellow500}`, borderRadius: 3, padding: `1px ${sp.sm}px`, outline: "none" }}
          />
        ) : (
          <span
            onClick={() => { setRenameValue(group.name); setIsRenaming(true); }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && (setRenameValue(group.name), setIsRenaming(true))}
            style={{ flex: 1, ...type.body, fontWeight: 600, color: t.textSecondary, cursor: "pointer", display: "flex", alignItems: "center", gap: sp.xs, outline: "none", borderRadius: 2 }}
            title="Click to rename"
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {group.name}
            <Edit3 size={10} color={t.textSubtle} />
          </span>
        )}

        <button
          onClick={onToggleLogic}
          aria-label={`Toggle logic to ${group.logic === "AND" ? "OR" : "AND"}`}
          style={{ padding: `2px ${sp.sm}px`, borderRadius: 3, border: `1px solid ${t.yellow700}`, background: t.yellow950, color: t.yellow500, ...type.caption, fontSize: 10, fontWeight: 700, cursor: "pointer", outline: "none" }}
          onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          {group.logic}
        </button>
        {canRemove && (
          <button onClick={onRemoveGroup} aria-label="Remove group" style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Trash2 size={12} color={t.textSubtle} />
          </button>
        )}
      </div>

      {/* Condition rows */}
      <div style={{ padding: `${sp.sm}px ${sp.sm}px` }}>
        {group.conditions.map((cond, i) => (
          <div key={cond.id}>
            {i > 0 && (
              <div style={{ padding: `${sp.xs}px ${sp.sm}px`, margin: `2px 0`, textAlign: "center" }}>
                <span style={{ ...type.caption, fontSize: 9, fontWeight: 600, color: t.borderSubtle, letterSpacing: "0.06em" }}>{group.logic}</span>
              </div>
            )}
            <ConditionRow condition={cond} sources={sources} onRemove={() => onRemoveCondition(cond.id)} />
          </div>
        ))}

        <Expandable open={isAdding} duration={motion.medium}>
          {isAdding && (
            <AddFlow
              step={addStep}
              nc={newCondition}
              sources={sources}
              onPickScope={onPickScope}
              onPickField={onPickField}
              onPickOp={onPickOp}
              onConfirm={onConfirm}
              onCancel={onCancel}
              onBack={onBack}
              onValueChange={onValueChange}
              onSourceScopeChange={onSourceScopeChange}
            />
          )}
        </Expandable>

        {!isAdding && (
          <button
            onClick={onAddCondition}
            style={{ width: "100%", padding: sp.sm, marginTop: sp.xs, background: "transparent", border: "none", color: t.textSecondary, ...type.secondary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: sp.xs, borderRadius: sp.xs, outline: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = t.bgHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Plus size={12} /> Add condition
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Condition row ── */
function ConditionRow({ condition, sources, onRemove }) {
  const iconMap = { spatial: Target, time: CalendarDays, attribute: Sliders };
  const Icon = iconMap[condition.scope] || Tag;
  const scopedSource = condition.sourceScope && condition.sourceScope !== "all" ? sources.find((s) => s.id === condition.sourceScope) : null;

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: sp.sm,
      padding: `${sp.sm}px ${sp.sm}px ${sp.sm}px ${sp.md}px`,
      borderRadius: sp.xs,
      background: t.bgField,
      marginBottom: sp.xs,
    }}>
      <Icon size={13} color={t.textSubtle} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
      <span style={{ flex: 1, ...type.body, fontSize: 12, color: t.textPrimary, display: "flex", alignItems: "center", gap: sp.sm, flexWrap: "wrap" }}>
        {readBack(condition)}
        {scopedSource && (
          <span style={{ ...type.caption, fontSize: 9, padding: `2px ${sp.sm}px`, borderRadius: sp.xs, background: scopedSource.color + "22", color: scopedSource.color, fontWeight: 600 }}>
            {scopedSource.name}
          </span>
        )}
      </span>
      <button onClick={onRemove} aria-label="Remove condition" style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, flexShrink: 0, borderRadius: sp.xs, outline: "none", opacity: 0.5, transition: "opacity 0.1s", marginTop: 1 }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
        onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <X size={11} color={t.textSubtle} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ADD CONDITION FLOW — GAP 1: source scope selector
   ══════════════════════════════════════════════════════════════ */
function AddFlow({ step, nc, sources, onPickScope, onPickField, onPickOp, onConfirm, onCancel, onValueChange, onSourceScopeChange, onBack }) {
  const labels = ["What kind of filter?", "Choose a field", "How should it match?", "Set the value"];

  /* Shared hover helper for buttons */
  const interactiveProps = (hoverStyle, baseStyle = {}) => ({
    onMouseEnter: (e) => Object.assign(e.currentTarget.style, hoverStyle),
    onMouseLeave: (e) => Object.assign(e.currentTarget.style, baseStyle),
    onFocus: (e) => (e.currentTarget.style.boxShadow = focusRing),
    onBlur: (e) => (e.currentTarget.style.boxShadow = "none"),
  });

  return (
    <div style={{ marginTop: sp.sm, padding: sp.md, background: "transparent", borderTop: `1px solid ${t.borderDark}`, display: "flex", flexDirection: "column", gap: sp.md }}>

      {/* Header row — back + title + close */}
      <div style={{ display: "flex", alignItems: "center", gap: sp.sm }}>
        {step > 0 && (
          <button onClick={onBack} aria-label="Go back" style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none", display: "flex", alignItems: "center" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <ArrowLeft size={13} color={t.textSecondary} />
          </button>
        )}
        <span style={{ ...type.subheading, color: t.textPrimary, flex: 1 }}>{labels[step]}</span>
        <button onClick={onCancel} aria-label="Cancel adding filter" style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none", display: "flex", alignItems: "center" }}
          onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <X size={13} color={t.textSubtle} />
        </button>
      </div>

      {/* Step progress — taller, with step labels */}
      <div style={{ display: "flex", gap: sp.xs }} role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={4} aria-label={`Step ${step + 1} of 4`}>
        {["Scope", "Field", "Match", "Value"].map((lbl, s) => (
          <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", gap: sp.xs - 1 }}>
            <div style={{ height: 3, borderRadius: 2, background: s <= step ? t.yellow500 : t.borderLight, transition: "background 0.2s ease" }} />
            <span style={{ ...type.caption, fontSize: 9, color: s <= step ? t.textHighlighted : t.textSubtle, textAlign: "center", transition: "color 0.2s" }}>{lbl}</span>
          </div>
        ))}
      </div>

      {/* ─── Step 0: Scope cards with descriptions ─── */}
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {SCOPE_OPTIONS.map((s) => {
            const I = s.icon;
            return (
              <button key={s.value} onClick={() => onPickScope(s.value)} style={{
                display: "flex", alignItems: "center", gap: sp.md, padding: `${sp.sm}px ${sp.md}px`,
                borderRadius: sp.xs, border: `1px solid ${t.borderDark}`, background: "transparent",
                color: t.textSecondary, cursor: "pointer", outline: "none",
                transition: "border-color 0.15s, background 0.15s, color 0.15s", textAlign: "left",
              }}
                {...interactiveProps(
                  { borderColor: t.borderMuted, background: t.bgField, color: t.textPrimary },
                  { borderColor: t.borderDark, background: "transparent", color: t.textSecondary }
                )}
              >
                <I size={15} color={t.textSubtle} style={{ flexShrink: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ ...type.body, fontSize: 12, color: t.textPrimary }}>{s.label}</span>
                  <span style={{ ...type.secondary, fontSize: 10, color: t.textSubtle, lineHeight: 1.3 }}>{s.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ─── Step 1: Field list with icons and descriptions ─── */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 220, overflowY: "auto" }}>
          {FIELD_OPTIONS[nc.scope]?.map((f) => {
            const FIcon = f.icon;
            return (
              <button
                key={f.name}
                onClick={() => onPickField(f.name)}
                style={{
                  display: "flex", alignItems: "center", gap: sp.md, padding: `${sp.sm}px ${sp.md}px`,
                  textAlign: "left", borderRadius: sp.xs, border: `1px solid ${t.borderDark}`, background: "transparent",
                  color: t.textSecondary, cursor: "pointer", outline: "none", transition: "border-color 0.15s, background 0.15s, color 0.15s",
                }}
                {...interactiveProps({ background: t.bgField, borderColor: t.borderMuted, color: t.textPrimary }, { background: "transparent", borderColor: t.borderDark, color: t.textSecondary })}
              >
                <FIcon size={14} color={t.textSubtle} style={{ flexShrink: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ ...type.body, fontSize: 12, color: t.textPrimary }}>{f.name}</span>
                  <span style={{ ...type.secondary, fontSize: 10, color: t.textSubtle }}>{f.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ─── Step 2: Operator buttons ─── */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: sp.sm }}>
          <div style={{ ...type.secondary, color: t.textSubtle, lineHeight: 1.4 }}>
            <span style={{ color: t.textPrimary, fontWeight: 600 }}>{nc.field}</span> should match records that are:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: sp.sm }}>
            {getOperatorsForField(nc.field).map((op) => (
              <button key={op} onClick={() => onPickOp(op)} style={{
                padding: `${sp.sm}px ${sp.lg}px`, ...type.body, fontSize: 12, fontWeight: 500,
                borderRadius: sp.sm, border: `1px solid ${t.borderDark}`, background: "transparent",
                color: t.textSecondary, cursor: "pointer", outline: "none", transition: "border-color 0.15s, background 0.15s, color 0.15s",
              }}
                {...interactiveProps({ borderColor: t.borderMuted, background: t.bgField, color: t.textPrimary }, { borderColor: t.borderDark, background: "transparent", color: t.textSecondary })}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Step 3: Value input ─── */}
      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: sp.sm }}>
          <div style={{ display: "flex", gap: sp.sm, alignItems: "stretch" }}>
            <input
              autoFocus
              value={nc.value}
              onChange={(e) => onValueChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && nc.value && onConfirm()}
              placeholder={nc.scope === "spatial" ? "e.g. Downtown Sector 4" : nc.scope === "time" ? "e.g. Mar 1 – Mar 7" : "Enter value\u2026"}
              style={{
                flex: 1, padding: `${sp.sm}px ${sp.md}px`, ...type.body, fontSize: 12,
                borderRadius: sp.sm, border: `1px solid ${t.borderSubtle}`, background: t.bgField,
                color: t.textPrimary, outline: "none", transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = t.yellow500)}
              onBlur={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
            />
            <button
              onClick={onConfirm}
              disabled={!nc.value}
              style={{
                padding: `${sp.sm}px ${sp.xl}px`, ...type.body, fontSize: 12, fontWeight: 600,
                borderRadius: sp.sm, border: "none",
                background: nc.value ? t.yellow500 : t.borderLight,
                color: nc.value ? t.textInverse : t.textSubtle,
                cursor: nc.value ? "pointer" : "not-allowed", outline: "none",
                transition: "background 0.15s, transform 0.1s",
              }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Add filter
            </button>
          </div>
          <span style={{ ...type.secondary, fontSize: 10, color: t.textSubtle }}>Press Enter to confirm</span>
        </div>
      )}

      {/* Source scope — collapsed into a subtle link, only shows when non-default */}
      <div style={{ display: "flex", alignItems: "center", gap: sp.sm, ...type.secondary }}>
        <span style={{ color: t.textSubtle, fontSize: 10 }}>Applies to:</span>
        <select
          value={nc.sourceScope}
          onChange={(e) => onSourceScopeChange(e.target.value)}
          aria-label="Source scope"
          style={{
            background: "transparent", border: "none", borderBottom: `1px dashed ${t.borderSubtle}`,
            color: nc.sourceScope === "all" ? t.textSubtle : t.textHighlighted,
            ...type.secondary, fontSize: 10, padding: `1px ${sp.xs}px`, outline: "none", cursor: "pointer",
          }}
        >
          <option value="all">all sources</option>
          {sources.filter((s) => s.visible).map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Live read-back — richer presentation */}
      {step >= 1 && (nc.field || nc.operator) && (
        <div style={{
          padding: `${sp.sm}px ${sp.md}px`, borderRadius: sp.sm, background: t.yellow950,
          ...type.body, fontSize: 12, color: t.textHighlighted, display: "flex", alignItems: "center", gap: sp.sm,
          borderLeft: `3px solid ${t.yellow500}`,
        }}>
          <Filter size={12} color={t.yellow500} style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{readBack(nc)}</span>
          {nc.sourceScope !== "all" && (
            <span style={{ ...type.caption, fontSize: 9, padding: `2px ${sp.sm}px`, borderRadius: sp.xs, background: t.bgHover, color: t.textSecondary }}>
              {sources.find((s) => s.id === nc.sourceScope)?.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAP STYLE PICKER — thumbnail grid with dropdown list
   ══════════════════════════════════════════════════════════════ */
function MapStyleThumb({ style: s, size }) {
  const w = size || 48;
  const h = Math.round(w * 0.7);
  const isNone = s.id === "none";
  return (
    <div style={{
      width: w, height: h, borderRadius: sp.xs, overflow: "hidden", flexShrink: 0,
      background: isNone ? t.bgBase : `hsl(${s.hue}, ${s.sat}%, ${s.light}%)`,
      border: `1px solid ${t.borderDark}`, position: "relative",
    }}>
      {!isNone && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", inset: 0 }}>
          <line x1={w * 0.15} y1={h * 0.3} x2={w * 0.85} y2={h * 0.3} stroke={`hsl(${s.hue}, ${Math.max(s.sat - 5, 0)}%, ${Math.min(s.light + 15, 95)}%)`} strokeWidth={0.8} opacity={0.5} />
          <line x1={w * 0.1} y1={h * 0.55} x2={w * 0.65} y2={h * 0.55} stroke={`hsl(${s.hue}, ${Math.max(s.sat - 5, 0)}%, ${Math.min(s.light + 15, 95)}%)`} strokeWidth={0.6} opacity={0.35} />
          <line x1={w * 0.3} y1={h * 0.75} x2={w * 0.9} y2={h * 0.75} stroke={`hsl(${s.hue}, ${Math.max(s.sat - 5, 0)}%, ${Math.min(s.light + 15, 95)}%)`} strokeWidth={0.6} opacity={0.35} />
          <rect x={w * 0.6} y={h * 0.15} width={w * 0.12} height={h * 0.25} rx={1} fill={`hsl(${s.hue}, ${Math.max(s.sat - 3, 0)}%, ${Math.min(s.light + 10, 90)}%)`} opacity={0.4} />
          <rect x={w * 0.2} y={h * 0.4} width={w * 0.15} height={h * 0.2} rx={1} fill={`hsl(${s.hue}, ${Math.max(s.sat - 3, 0)}%, ${Math.min(s.light + 10, 90)}%)`} opacity={0.3} />
        </svg>
      )}
    </div>
  );
}

function MapStylePicker({ styles, selected, isOpen, onToggle, onSelect }) {
  const current = styles.find((s) => s.id === selected) || styles[1];
  return (
    <div>
      {/* Selected style — acts as toggle */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: sp.md,
          padding: `${sp.sm}px ${sp.md}px`,
          background: t.bgField, border: `1px solid ${t.borderDark}`, borderRadius: sp.sm,
          cursor: "pointer", outline: "none",
          transition: `border-color ${motion.fast} ${motion.easeOut}`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.borderLight)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.borderDark)}
        onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <MapStyleThumb style={current} size={48} />
        <span style={{ flex: 1, ...type.body, color: t.textPrimary, textAlign: "left" }}>{current.name}</span>
        <ChevronDown size={14} color={t.textSubtle} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: `transform ${motion.fast} ${motion.easeOut}` }} />
      </button>

      {/* Dropdown list */}
      <Expandable open={isOpen} duration={motion.medium}>
        <div style={{ marginTop: sp.xs, border: `1px solid ${t.borderDark}`, borderRadius: sp.sm, overflow: "hidden" }}>
          {styles.map((s) => {
            const isSelected = s.id === selected;
            return (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: sp.md,
                  padding: `${sp.sm}px ${sp.md}px`, textAlign: "left",
                  background: isSelected ? t.bgField : "transparent",
                  border: "none", borderBottom: `1px solid ${t.borderDark}`,
                  outline: "none", cursor: "pointer",
                  transition: `background ${motion.fast}`,
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = t.bgHover; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = `inset ${focusRing}`)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <MapStyleThumb style={s} size={48} />
                <span style={{ ...type.body, color: isSelected ? t.textPrimary : t.textSecondary }}>{s.name}</span>
              </button>
            );
          })}
        </div>
      </Expandable>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAP LAYER ROW — visibility + z-order
   ══════════════════════════════════════════════════════════════ */
function MapLayerRow({ layer, isFirst, isLast, onToggleVis, onMoveUp }) {
  const Icon = layer.icon;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: sp.sm,
      padding: `${sp.xs}px 0`,
      borderBottom: isLast ? "none" : `1px solid ${t.borderDark}`,
      transition: `opacity ${motion.fast} ${motion.easeOut}`,
    }}>
      {/* Visibility toggle */}
      <button
        onClick={onToggleVis}
        aria-label={`${layer.visible ? "Hide" : "Show"} ${layer.name}`}
        role="switch"
        aria-checked={layer.visible}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: sp.xs,
          borderRadius: sp.xs, outline: "none", display: "flex", alignItems: "center",
          opacity: layer.visible ? 1 : 0.45,
          transition: `opacity ${motion.fast} ${motion.easeOut}`,
        }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        {layer.visible ? <Eye size={14} color={t.textSubtle} /> : <EyeOff size={14} color={t.textSubtle} />}
      </button>

      {/* Layer name */}
      <span style={{
        flex: 1, ...type.body, fontWeight: 500,
        color: layer.visible ? t.textPrimary : t.textSubtle,
        transition: `color ${motion.fast} ${motion.easeOut}`,
      }}>
        {layer.name}
      </span>

      {/* Z-order — move up */}
      <button
        onClick={onMoveUp}
        disabled={isFirst}
        aria-label={`Move ${layer.name} up`}
        style={{
          background: "none", border: "none", cursor: isFirst ? "default" : "pointer",
          padding: sp.xs, borderRadius: sp.xs, outline: "none",
          display: "flex", alignItems: "center",
          opacity: isFirst ? 0.2 : 0.6,
          transition: `opacity ${motion.fast}`,
        }}
        onMouseEnter={(e) => { if (!isFirst) e.currentTarget.style.opacity = "1"; }}
        onMouseLeave={(e) => { if (!isFirst) e.currentTarget.style.opacity = "0.6"; }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <ChevronUp size={14} color={t.textSubtle} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TOOLTIP SOURCE GROUP — per-source field picker
   ══════════════════════════════════════════════════════════════ */
function TooltipSourceGroup({ source, availableFields, selectedKeys, isAdding, onStartAdd, onCancelAdd, onAddField, onRemoveField, onClearAll }) {
  const selectedFields = selectedKeys.map((k) => availableFields.find((f) => f.key === k)).filter(Boolean);
  const unselectedFields = availableFields.filter((f) => !selectedKeys.includes(f.key));
  const hasFields = selectedKeys.length > 0;

  return (
    <div style={{ border: `1px solid ${t.borderDark}`, borderRadius: sp.sm, overflow: "hidden", marginBottom: sp.sm }}>
      {/* Header — source name + color + count + clear */}
      <div style={{
        display: "flex", alignItems: "center", gap: sp.sm,
        padding: `${sp.sm}px ${sp.md}px`,
        background: t.bgBase, borderBottom: `1px solid ${t.borderDark}`,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: source.color, flexShrink: 0 }} />
        <span style={{ flex: 1, ...type.body, fontWeight: 600, color: t.textSecondary }}>{source.name}</span>
        {hasFields && (
          <button
            onClick={onClearAll}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: `1px ${sp.sm}px`,
              ...type.caption, fontSize: 10, color: t.textSubtle, outline: "none", borderRadius: 2,
              transition: "color 0.12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = t.textPrimary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = t.textSubtle)}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Selected field chips */}
      <div style={{ padding: `${sp.sm}px ${sp.sm}px` }}>
        {hasFields ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: sp.xs }}>
            {selectedFields.map((f) => {
              const FIcon = f.icon;
              const isNum = f.type === "number";
              return (
                <span key={f.key} style={{
                  display: "inline-flex", alignItems: "center", gap: sp.xs,
                  padding: "2px 6px",
                  borderRadius: 2, background: t.bgField, border: `1px solid ${t.borderDark}`,
                  fontSize: 10, color: t.textPrimary,
                }}>
                  {f.label}
                  {isNum && <Hash size={9} color={t.textSubtle} />}
                  <button
                    onClick={() => onRemoveField(f.key)}
                    aria-label={`Remove ${f.label}`}
                    style={{
                      background: "none", border: "none", cursor: "pointer", padding: 1,
                      borderRadius: 2, outline: "none", display: "flex", alignItems: "center",
                      opacity: 0.5, transition: "opacity 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                  >
                    <X size={10} color={t.textSubtle} />
                  </button>
                </span>
              );
            })}
          </div>
        ) : (
          <div style={{ ...type.secondary, fontSize: 10, color: t.textSubtle, padding: `${sp.xs}px ${sp.xs}px` }}>
            No fields selected
          </div>
        )}

        {/* Add field flow — reuses the AddFlow visual language */}
        <Expandable open={isAdding} duration={motion.medium}>
          {isAdding && (
            <div style={{
              marginTop: sp.sm, padding: sp.md,
              background: "transparent", borderTop: `1px solid ${t.borderDark}`,
              display: "flex", flexDirection: "column", gap: sp.sm,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: sp.sm }}>
                <span style={{ ...type.subheading, color: t.textPrimary, flex: 1 }}>Choose a field</span>
                <button onClick={onCancelAdd} aria-label="Cancel" style={{
                  background: "none", border: "none", cursor: "pointer", padding: sp.xs,
                  borderRadius: sp.xs, outline: "none", display: "flex", alignItems: "center",
                }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <X size={13} color={t.textSubtle} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 200, overflowY: "auto" }}>
                {unselectedFields.length > 0 ? unselectedFields.map((f) => {
                  const FIcon = f.icon;
                  return (
                    <button
                      key={f.key}
                      onClick={() => onAddField(f.key)}
                      style={{
                        display: "flex", alignItems: "center", gap: sp.md,
                        padding: `${sp.sm}px ${sp.md}px`, textAlign: "left",
                        borderRadius: sp.xs, border: `1px solid ${t.borderDark}`, background: "transparent",
                        color: t.textSecondary, cursor: "pointer", outline: "none",
                        transition: "border-color 0.15s, background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = t.bgField; e.currentTarget.style.borderColor = t.borderMuted; e.currentTarget.style.color = t.textPrimary; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = t.borderDark; e.currentTarget.style.color = t.textSecondary; }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <FIcon size={14} color={t.textSubtle} style={{ flexShrink: 0 }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <span style={{ ...type.body, fontSize: 12, color: t.textPrimary }}>{f.label}</span>
                        <span style={{ ...type.secondary, fontSize: 10, color: t.textSubtle }}>{f.type}</span>
                      </div>
                    </button>
                  );
                }) : (
                  <div style={{ ...type.secondary, fontSize: 11, color: t.textSubtle, padding: sp.sm, textAlign: "center" }}>
                    All fields selected
                  </div>
                )}
              </div>
            </div>
          )}
        </Expandable>

        {/* Add button */}
        {!isAdding && (
          <button
            onClick={onStartAdd}
            style={{
              width: "100%", padding: sp.sm, marginTop: sp.xs,
              background: "transparent", border: "none",
              color: t.textSecondary, ...type.secondary,
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: sp.xs,
              borderRadius: sp.xs, outline: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = t.bgHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Plus size={12} /> Add field
          </button>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAP SETTINGS HELPERS
   ══════════════════════════════════════════════════════════════ */
function FieldLabel({ children }) {
  return <div style={{ ...type.caption, color: t.textSecondary, marginBottom: sp.sm }}>{children}</div>;
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${sp.sm}px 0`, borderBottom: `1px solid ${t.borderMuted}` }}>
      <span style={{ ...type.body, color: t.textPrimary }}>{label}</span>
      <button
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          border: `1px solid ${checked ? t.yellow500 : t.borderSubtle}`,
          background: checked ? t.yellow950 : t.bgField,
          position: "relative",
          cursor: "pointer",
          transition: "all 0.15s",
          outline: "none",
          padding: 0,
        }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 17 : 2,
            width: 14,
            height: 14,
            borderRadius: 7,
            background: checked ? t.yellow500 : t.textSubtle,
            transition: "left 0.15s",
          }}
        />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAP TOOLBAR — top bar from Figma spec
   ══════════════════════════════════════════════════════════════ */
function ToolbarDivider() {
  return (
    <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: `0 ${sp.xs}px`, flexShrink: 0 }} />
  );
}

function ToolbarBtn({ icon: Icon, label, size }) {
  const sz = size || 16;
  return (
    <button
      title={label}
      aria-label={label}
      style={{
        width: 32, height: 32, padding: 0,
        background: "rgba(8,8,8,0.8)", border: "none", borderRadius: sp.xs,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", outline: "none",
        transition: `background ${motion.fast}`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = t.bgHover; e.currentTarget.querySelector("svg").style.color = t.textPrimary; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(8,8,8,0.8)"; e.currentTarget.querySelector("svg").style.color = t.textSubtle; }}
      onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <Icon size={sz} color={t.textSubtle} />
    </button>
  );
}

function MapToolbar() {
  return (
    <div style={{
      width: "100%", height: 44, display: "flex", alignItems: "center", gap: sp.md,
      padding: `0 ${sp.md}px`,
      background: t.glassBg,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderRadius: sp.xs,
      border: `1px solid ${t.glassBorder}`,
      boxSizing: "border-box",
    }}>

      {/* ── Search input ── */}
      <div style={{ flex: "0 1 auto", display: "flex", justifyContent: "flex-start", minWidth: 0 }}>
        <div style={{ position: "relative", width: "auto", minWidth: 200 }}>
          <Search size={14} color={t.textSubtle} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input
            placeholder="Search address, LOI or device IDs"
            aria-label="Search address, LOI or device IDs"
            style={{
              width: 240, height: 33,
              padding: `0 13px 0 37px`,
              ...type.body, fontSize: 12,
              background: t.bgBase, border: `1px solid #2b2b2b`, borderRadius: sp.sm,
              color: t.textPrimary, outline: "none",
              transition: `border-color ${motion.fast}`,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2b2b2b")}
          />
        </div>
      </div>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Right group: tool buttons ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
        <ToolbarBtn icon={Flag} label="Flag" />
        <ToolbarDivider />
        <ToolbarBtn icon={Layers} label="Layers" />
        <ToolbarBtn icon={Ruler} label="Measure" />
        <ToolbarBtn icon={Pentagon} label="Draw Shape" />
        <ToolbarDivider />
        <ToolbarBtn icon={MonitorSmartphone} label="Monitor" />
        <ToolbarBtn icon={Box} label="3D View" />
        <ToolbarDivider />
        <ToolbarBtn icon={Home} label="Home" />
        <ToolbarBtn icon={Settings} label="Settings" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAP PLACEHOLDER — GAP 2: uses filtered counts
   ══════════════════════════════════════════════════════════════ */
function MapPlaceholder({ sources, filteredCounts, baseMap, heatmapEnabled }) {
  const bgColors = { dark: "#0a0f1a", satellite: "#0d1a0d", terrain: "#1a150d", light: "#1a1a22" };
  const bg = bgColors[baseMap] || bgColors.dark;

  const visibleSources = sources.filter((s) => s.visible);

  const points = useMemo(() => {
    const pts = [];
    visibleSources.forEach((src) => {
      const fc = filteredCounts[src.id] || src.records;
      const count = Math.min(Math.floor(fc / 800), 60);
      for (let i = 0; i < count; i++) {
        const cx = 400 + ((i * 97 + src.id.charCodeAt(2) * 31) % 600) - 300;
        const cy = 250 + ((i * 53 + src.id.charCodeAt(2) * 17) % 400) - 200;
        pts.push({ x: cx, y: cy, color: src.color, r: 2 + (i % 3), source: src.name });
      }
    });
    return pts;
  }, [visibleSources, filteredCounts]);

  return (
    <svg width="100%" height="100%" viewBox="0 0 800 500" style={{ background: bg }}>
      {/* Grid lines (map texture) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 25} x2={800} y2={i * 25} stroke={t.borderDark} strokeWidth={0.3} />
      ))}
      {Array.from({ length: 32 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 25} y1={0} x2={i * 25} y2={500} stroke={t.borderDark} strokeWidth={0.3} />
      ))}

      {/* AOI polygon placeholder */}
      <polygon
        points="250,120 450,100 520,250 480,350 300,380 220,280"
        fill={t.yellow500 + "08"}
        stroke={t.yellow500 + "40"}
        strokeWidth={1.5}
        strokeDasharray="6,3"
      />
      <text x={370} y={230} textAnchor="middle" fill={t.yellow500 + "60"} fontSize={11} fontFamily="IBM Plex Sans, sans-serif">
        Downtown Sector 4
      </text>

      {/* Heatmap gradient (if enabled) */}
      {heatmapEnabled && (
        <>
          <defs>
            <radialGradient id="heatGrad">
              <stop offset="0%" stopColor="#ff4400" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#ff8800" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ff8800" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx={380} cy={240} rx={160} ry={120} fill="url(#heatGrad)" />
        </>
      )}

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.color} fillOpacity={0.55} />
      ))}

      {/* Center label */}
      <text x={400} y={470} textAnchor="middle" fill={t.textSubtle} fontSize={13} fontFamily="IBM Plex Sans, sans-serif">
        Discover — {visibleSources.length} source{visibleSources.length !== 1 ? "s" : ""} active • {baseMap} base map
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   SAVE MODAL
   ══════════════════════════════════════════════════════════════ */
function SaveModal({ queryName, sources, groups, totalConditions, baseMap, onClose }) {
  const [systemOptIns, setSystemOptIns] = useState({});
  const userSources = sources.filter((s) => s.visible && !s.system);
  const systemSources = sources.filter((s) => s.system);

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Save Query" style={{ position: "fixed", inset: 0, background: t.overlayDark, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 460, background: t.bgRaised, border: `1px solid ${t.borderLight}`, borderRadius: sp.sm, padding: sp.xl, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ ...type.heading, marginBottom: sp.xs, color: t.textPrimary }}>Save Query</div>
        <div style={{ ...type.body, color: t.textSecondary, marginBottom: sp.xl }}>Review what will be included in &ldquo;{queryName}&rdquo;</div>

        {/* Included */}
        <FieldLabel>Included</FieldLabel>
        <div style={{ marginBottom: sp.lg }}>
          <IncRow label="Data Sources" value={userSources.map((s) => s.name).join(", ") || "None"} />
          <IncRow label="Conditions" value={`${totalConditions} across ${groups.length} group${groups.length > 1 ? "s" : ""}`} />
          <IncRow label="Map Settings" value={`${baseMap} base map`} />
        </div>

        {/* System-generated */}
        {systemSources.length > 0 && (
          <div style={{ marginBottom: sp.xl }}>
            <FieldLabel>System-Generated Sources</FieldLabel>
            <div style={{ padding: sp.md, borderRadius: sp.xs, background: t.bgBase, border: `1px solid ${t.feedbackWarning}33` }}>
              {systemSources.map((ss) => (
                <div key={ss.id} style={{ display: "flex", alignItems: "flex-start", gap: sp.sm, marginBottom: sp.sm }}>
                  <input
                    type="checkbox"
                    checked={systemOptIns[ss.id] || false}
                    onChange={(e) => setSystemOptIns((p) => ({ ...p, [ss.id]: e.target.checked }))}
                    aria-label={`Include ${ss.name}`}
                    style={{ marginTop: 3, accentColor: t.yellow500 }}
                  />
                  <div>
                    <div style={{ ...type.body, color: t.textPrimary, display: "flex", alignItems: "center", gap: sp.sm }}>
                      {ss.name}
                      <span style={{ fontSize: 9, fontWeight: 700, padding: `1px ${sp.xs + 1}px`, borderRadius: 3, background: t.feedbackWarning + "22", color: t.feedbackWarning }}>SYSTEM</span>
                    </div>
                    <div style={{ ...type.secondary, color: t.feedbackWarning, marginTop: 2 }}>
                      {ss.name === "Flagged Records"
                        ? "Auto-generated from flagging rules. Including this saves flagged state with the query."
                        : "Generated from a Tracer session. Including this ties the query to Tracer output data."}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ ...type.secondary, color: t.textSubtle, marginTop: sp.xs }}>Excluded by default — opt in explicitly to include.</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: sp.sm, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: `${sp.sm}px ${sp.lg}px`, ...type.body, borderRadius: sp.xs, border: `1px solid ${t.borderLight}`, background: "transparent", color: t.textSecondary, cursor: "pointer", outline: "none" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Cancel
          </button>
          <button onClick={onClose} style={{ padding: `${sp.sm}px ${sp.xl}px`, ...type.body, fontWeight: 600, borderRadius: sp.xs, border: "none", background: t.yellow500, color: t.textInverse, cursor: "pointer", outline: "none" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Save Query
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LOAD MODAL — GAP 4
   ══════════════════════════════════════════════════════════════ */
function LoadModal({ onClose, onLoad }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Load Saved Query" style={{ position: "fixed", inset: 0, background: t.overlayDark, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 480, background: t.bgRaised, border: `1px solid ${t.borderLight}`, borderRadius: sp.sm, padding: sp.xl, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: sp.xl }}>
          <div>
            <div style={{ ...type.heading, color: t.textPrimary }}>Load Saved Query</div>
            <div style={{ ...type.body, color: t.textSecondary, marginTop: 2 }}>{SAVED_QUERIES.length} saved queries</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <X size={16} color={t.textSubtle} />
          </button>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: sp.lg }}>
          <Search size={14} color={t.textSubtle} style={{ position: "absolute", left: sp.md, top: 9 }} aria-hidden="true" />
          <input
            placeholder="Search saved queries\u2026"
            aria-label="Search saved queries"
            style={{
              width: "100%",
              padding: `${sp.sm}px ${sp.md}px ${sp.sm}px ${sp.xxl}px`,
              ...type.body,
              borderRadius: sp.xs,
              border: `1px solid ${t.borderLight}`,
              background: t.bgField,
              color: t.textPrimary,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Query list */}
        <div style={{ display: "flex", flexDirection: "column", gap: sp.xs }}>
          {SAVED_QUERIES.map((q) => (
            <button
              key={q.id}
              onClick={() => onLoad(q)}
              onMouseEnter={() => setHoveredId(q.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(q.id)}
              onBlur={() => setHoveredId(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: sp.xs,
                padding: `${sp.md}px ${sp.lg}px`,
                borderRadius: sp.sm,
                border: `1px solid ${hoveredId === q.id ? t.yellow700 : t.borderLight}`,
                background: hoveredId === q.id ? t.yellow950 : t.bgBase,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                outline: "none",
              }}
            >
              <div style={{ ...type.subheading, color: t.textPrimary }}>{q.name}</div>
              <div style={{ display: "flex", gap: sp.md, ...type.secondary, color: t.textSecondary }}>
                <span style={{ display: "flex", alignItems: "center", gap: sp.xs }}>
                  <Database size={10} /> {q.sources.length} source{q.sources.length !== 1 ? "s" : ""}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: sp.xs }}>
                  <Filter size={10} /> {q.conditionCount} condition{q.conditionCount !== 1 ? "s" : ""}
                </span>
                <span style={{ color: t.textSubtle }}>Saved {q.savedAt}</span>
              </div>
              <div style={{ ...type.secondary, color: t.textSubtle }}>
                {q.sources.join(" \u00b7 ")}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function IncRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: `${sp.xs + 1}px 0`, borderBottom: `1px solid ${t.borderDark}` }}>
      <span style={{ ...type.secondary, fontSize: 12, color: t.textSecondary }}>{label}</span>
      <span style={{ ...type.secondary, fontSize: 12, color: t.textPrimary, textAlign: "right", maxWidth: 260 }}>{value}</span>
    </div>
  );
}
