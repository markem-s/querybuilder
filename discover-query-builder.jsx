import { useState, useMemo, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { DeviceDetailsContent } from "@drawer/components/DeviceDetailsContent";

mapboxgl.accessToken = (typeof __MAPBOX_TOKEN__ !== "undefined" ? __MAPBOX_TOKEN__ : (typeof import.meta !== "undefined" && import.meta.env?.VITE_MAPBOX_TOKEN)) || "";
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
  ChevronLeft,
  ShieldAlert,
  AppWindow,
  Share2,
  AlertTriangle,
  Zap,
  Link,
  CheckCircle2,
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
  feedbackSuccess: "#22C55E",
  /* Glass tokens */
  glassBg: "#0d0d0d",
  glassBorder: "#1e1e1e",
};

/* ── Layer type icon map ── */
function LayerTypeIcon({ type, color, size = 10 }) {
  const s = { display: "block", flexShrink: 0 };
  const sw = 1.4;
  switch (type) {
    case "point":
      return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={s}>
          <circle cx="5" cy="5" r="3.5" fill={color} />
        </svg>
      );
    case "hexbin":
      return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={s}>
          <polygon points="5,1 8.5,3 8.5,7 5,9 1.5,7 1.5,3" stroke={color} strokeWidth={sw} />
        </svg>
      );
    case "arc":
      return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={s}>
          <path d="M1 9 Q5 1 9 9" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "heatmap":
      return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={s}>
          <path d="M5 9C3 9 1.5 7.5 1.5 6c0-1 .5-1.8 1-2.5C3 2.5 3 1.5 3 1c.7.5 1 1.2 1 2 .5-.5.8-1.2.8-2 1.2.8 2.2 2.2 2.2 4 0 1.5-1 2.8-2 4z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "icon":
      return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={s}>
          <rect x="1" y="2" width="8" height="6" rx="1" stroke={color} strokeWidth={sw} />
          <path d="M1 7l2.5-2.5 2 2 1.5-1.5L9 7" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "line":
      return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={s}>
          <path d="M1 8 C3 8 3 2 5 5 S7 2 9 2" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={s}>
          <circle cx="5" cy="5" r="3.5" fill={color} />
        </svg>
      );
  }
}

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

/* ── Shared add-button style ── */
const addBtnStyle = {
  width: "100%",
  padding: sp.sm,
  background: "transparent",
  border: `1px dashed ${t.borderMuted}`,
  borderRadius: sp.xs,
  color: t.textSecondary,
  fontSize: 11,
  fontWeight: 400,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: sp.xs,
  outline: "none",
};
const addBtnHover = (e) => { e.currentTarget.style.borderColor = t.borderSubtle; e.currentTarget.style.color = t.textPrimary; };
const addBtnLeave = (e) => { e.currentTarget.style.borderColor = t.borderMuted; e.currentTarget.style.color = t.textSecondary; };

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
      { id: "ds1", name: "UTS Data", type: "geospatial", color: "#4A9EFF", records: 82340, visible: true, system: false, layerType: "point", opacity: 80, pointSize: 4, colorBy: "none", showLabels: false, blendMode: "normal", layers: [], tier: "free" },
      { id: "ds2", name: "Starlink Devices", type: "geospatial", color: "#22C55E", records: 41200, visible: true, system: false, layerType: "point", opacity: 70, pointSize: 6, colorBy: "none", showLabels: false, blendMode: "additive", layers: [], tier: "pro" },
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
    id: "sg-events",
    name: "Events",
    collapsed: false,
    sources: [
      { id: "evt-01", name: "Crime Data", type: "geospatial", color: "#EF4444", records: 14820, visible: true, system: false, layerType: "point", opacity: 75, pointSize: 4, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
    ],
  },
  {
    id: "sg3",
    name: "System Generated",
    collapsed: false,
    system: true,
    sources: [
      { id: "sys-tracer-1", name: "Tracer Results", type: "system", color: "#A855F7", records: 0, visible: false, system: true, muted: true, layerType: "arc", opacity: 80, pointSize: 4, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
      { id: "sys-flagged-1", name: "Flagged Records", type: "system", color: "#EF4444", records: 0, visible: false, system: true, muted: true, layerType: "point", opacity: 80, pointSize: 4, colorBy: "none", showLabels: false, blendMode: "normal", layers: [] },
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

/* ── Tier system ── */
const TIER_RANK = { free: 0, pro: 1, enterprise: 2 };
const CURRENT_USER_TIER = "pro";

/* ── Available dataset catalog (tier-gated) ── */
const DATASET_CATALOG = [
  { id: "cat-1", name: "Device Locations", color: "#4A9EFF", records: 82340, tier: "free" },
  { id: "cat-2", name: "Cell Tower Pings", color: "#22C55E", records: 41200, tier: "pro" },
  { id: "cat-3", name: "IMSI Harvest Feed", color: "#F59E0B", records: 18900, tier: "pro" },
  { id: "cat-4", name: "Network Intercept Logs", color: "#EC4899", records: 5430, tier: "enterprise" },
  { id: "cat-5", name: "Satellite Imagery Events", color: "#8B5CF6", records: 2100, tier: "enterprise" },
];

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
    { name: "Drawn Polygon", icon: Pentagon, desc: "Draw a custom polygon on the map" },
    { name: "Saved Boundary", icon: Layers, desc: "Use a previously saved boundary" },
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
const SPATIAL_FIELDS = ["Area of Interest", "Proximity to LOI", "Lat/Lng Bounds", "Drawn Polygon", "Saved Boundary"];
const SAVED_BOUNDARIES = ["City Limits — NYC", "County — Manhattan", "Custom Zone A", "Custom Zone B"];
const POLYGON_DRAW_FIELDS = ["Drawn Polygon"];
const SAVED_BOUNDARY_FIELDS = ["Saved Boundary"];

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

  /* ── System sources ── */
  const [pendingSystemSources, setPendingSystemSources] = useState([]);
  const [dismissedSystemSources, setDismissedSystemSources] = useState([]);

  /* ── Share modal ── */
  const [showShareModal, setShowShareModal] = useState(false);

  /* ── Map settings advanced ── */
  const [customStyleUrl, setCustomStyleUrl] = useState("");
  const [advancedMapOpen, setAdvancedMapOpen] = useState(false);

  /* ── Device drawer ── */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSource, setDrawerSource] = useState("toolbar"); // "toolbar" | "marker"
  const [selectedDevice, setSelectedDevice] = useState(null);

  /* ── Shared map ref (set by MapPlaceholder once the map initialises) ── */
  const sharedMapRef = useRef(null);

  /* ── Simulate a Tracer session completing 8s after mount ── */
  useEffect(() => {
    const t = setTimeout(() => {
      setPendingSystemSources([{
        id: "sys-tracer-1",
        name: "Tracer Results",
        triggeredBy: "Tracer Session #4821",
        recordCount: 4231,
        color: "#A855F7",
        layerType: "arc",
      }]);
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  /* ── Auto-accept pending system sources ── */
  useEffect(() => {
    pendingSystemSources.forEach((src) => acceptSystemSource(src));
  }, [pendingSystemSources]);

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
  const computationModel = totalConditions > 0 ? "local" : "none";

  /* Zero-return conflict diagnosis */
  const conflictDiagnosis = useMemo(() => {
    if (totalRecords > 0 || totalConditions === 0) return {};
    const diagnosis = {};
    groups.forEach((g) => {
      g.conditions.forEach((cond) => {
        // Simulate removal of this condition — if count goes above 0, it's conflicting
        const withoutThisCond = groups.map((gr) => gr.id === g.id ? { ...gr, conditions: gr.conditions.filter((c) => c.id !== cond.id) } : gr);
        const countWithout = Object.values(simulateFilteredCount(baseCounts, withoutThisCond)).reduce((s, n) => s + n, 0);
        diagnosis[cond.id] = countWithout > 0 ? "conflicting" : "contributing";
      });
    });
    return diagnosis;
  }, [totalRecords, totalConditions, groups, baseCounts]);

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

  const addDatasetToGroup = (gid, catalogEntry) => {
    const newDs = {
      id: `ds-${Date.now()}`,
      name: catalogEntry?.name || "New Dataset",
      type: "geospatial",
      color: catalogEntry?.color || "#4A9EFF",
      records: catalogEntry?.records || 0,
      visible: true,
      system: false,
      tier: catalogEntry?.tier || "free",
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

  /* ── System source handlers ── */
  const acceptSystemSource = (src) => {
    const origin = { triggeredBy: src.triggeredBy, recordCount: src.recordCount, addedAt: new Date(), workspaceVisible: true };
    setSourceGroups((gs) => {
      const sysGroup = gs.find((g) => g.id === "sg3");
      const activatedSrc = (existing) => ({ ...existing, records: src.recordCount, visible: true, muted: false, layerType: src.layerType || existing.layerType, origin });
      if (sysGroup) {
        const existing = sysGroup.sources.find((s) => s.id === src.id);
        if (existing && existing.muted) return gs.map((g) => g.id === "sg3" ? { ...g, sources: g.sources.map((s) => s.id === src.id ? activatedSrc(s) : s) } : g);
        if (existing) return gs; // already active — skip
        const newSrc = { id: src.id, name: src.name, type: "system", color: src.color, records: src.recordCount, visible: true, system: true, muted: false, layerType: src.layerType || "point", opacity: 80, pointSize: 4, colorBy: "none", showLabels: false, blendMode: "normal", layers: [], origin };
        return gs.map((g) => g.id === "sg3" ? { ...g, sources: [...g.sources, newSrc] } : g);
      }
      const newSrc = { id: src.id, name: src.name, type: "system", color: src.color, records: src.recordCount, visible: true, system: true, muted: false, layerType: src.layerType || "point", opacity: 80, pointSize: 4, colorBy: "none", showLabels: false, blendMode: "normal", layers: [], origin };
      return [...gs, { id: "sg3", name: "System Generated", collapsed: false, system: true, sources: [newSrc] }];
    });
    setPendingSystemSources((p) => p.filter((s) => s.id !== src.id));
  };

  const dismissSystemSource = (src) => {
    setDismissedSystemSources((p) => [...p, src]);
    setPendingSystemSources((p) => p.filter((s) => s.id !== src.id));
  };

  const readdSystemSource = (src) => {
    setDismissedSystemSources((p) => p.filter((s) => s.id !== src.id));
    acceptSystemSource(src);
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
    setPendingSystemSources([]);
    setDismissedSystemSources([]);
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
          width: 320,
          background: t.glassBg,
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
            onShare={() => setShowShareModal(true)}
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

                  {/* Cap warning chip */}
                  {isCapped && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: sp.sm, padding: `${sp.sm}px ${sp.md}px`, borderRadius: sp.xs, background: t.feedbackWarning + "18", border: `1px solid ${t.feedbackWarning}44`, marginBottom: sp.md }}>
                      <AlertTriangle size={13} color={t.feedbackWarning} style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 11, color: t.feedbackWarning, lineHeight: 1.4 }}>
                        Displaying <strong>50,000</strong> of <strong>{totalRecords.toLocaleString()}</strong> — apply conditions to reduce.
                      </span>
                    </div>
                  )}


                  {sourceGroups.map((grp) => (
                    <SourceGroupSection
                      key={grp.id}
                      group={grp}
                      filteredCounts={filteredCounts}
                      isFiltered={isFiltered}
                      computationModel={computationModel}
                      onToggleCollapse={() => toggleSourceGroupCollapse(grp.id)}
                      onRenameGroup={(name) => renameSourceGroup(grp.id, name)}
                      onRemoveGroup={() => removeSourceGroup(grp.id)}
                      onToggleSource={(sid) => toggleSourceVis(sid)}
                      onUpdateLayer={(sid, key, val) => updateSourceLayer(sid, key, val)}
                      onAddSubLayer={(sid) => addSourceSubLayer(sid)}
                      onRemoveSubLayer={(sid, lid) => removeSourceSubLayer(sid, lid)}
                      onUpdateSubLayer={(sid, lid, key, val) => updateSourceSubLayer(sid, lid, key, val)}
                      onAddDataset={(entry) => addDatasetToGroup(grp.id, entry)}
                      onRemoveSource={(sid) => removeSourceFromGroup(grp.id, sid)}
                    />
                  ))}

                  {/* Add Group */}
                  <button
                    onClick={addSourceGroup}
                    style={{ ...addBtnStyle, marginTop: sp.xs }}
                    onMouseEnter={addBtnHover} onMouseLeave={addBtnLeave}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <Plus size={11} /> Add Group
                  </button>

                  {/* Recent system sources */}
                  {dismissedSystemSources.length > 0 && (
                    <div style={{ marginTop: sp.lg, borderTop: `1px solid ${t.borderDark}`, paddingTop: sp.md }}>
                      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: sp.sm }}>RECENT SYSTEM SOURCES</div>
                      {dismissedSystemSources.map((sys) => (
                        <div key={sys.id} style={{ display: "flex", alignItems: "center", gap: sp.sm, padding: `${sp.xs}px 0`, marginBottom: sp.xs }}>
                          <Zap size={11} color={t.textSubtle} style={{ flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: 11, color: t.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sys.name}</span>
                          <span style={{ fontSize: 10, color: t.textSubtle }}>{sys.recordCount.toLocaleString()} rec</span>
                          <button onClick={() => readdSystemSource(sys)} style={{ fontSize: 10, padding: `2px ${sp.sm}px`, borderRadius: sp.xs, border: `1px solid ${t.borderMuted}`, background: "transparent", color: t.textSecondary, cursor: "pointer", outline: "none", flexShrink: 0 }}
                            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                          >Re-add</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CONDITIONS */}
              {activeSection === "conditions" && (
                <div style={{ padding: sp.md, animation: `sectionFadeIn ${motion.fast} ${motion.easeOut} both` }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: sp.sm }}>CONDITIONS</div>

                  {/* Zero-return banner */}
                  {totalRecords === 0 && totalConditions > 0 && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: sp.sm, padding: sp.md, borderRadius: sp.xs, background: "#EF444418", border: "1px solid #EF444444", marginBottom: sp.md }}>
                      <AlertTriangle size={13} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 11, color: "#EF4444", lineHeight: 1.5 }}>
                        No records match all active conditions. <strong>Conflicting conditions are highlighted in red</strong> — try removing them.
                      </span>
                    </div>
                  )}

                  {groups.map((group, gi) => (
                    <div key={group.id}>
                      {gi > 0 && <InterGroupLabel />}
                      <ConditionGroup
                        group={group}
                        groupIndex={gi}
                        groupCount={groups.length}
                        sources={sources}
                        canRemove={groups.length > 1}
                        conflictDiagnosis={conflictDiagnosis}
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
                    style={{ ...addBtnStyle, marginTop: sp.sm }}
                    onMouseEnter={addBtnHover} onMouseLeave={addBtnLeave}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <Plus size={11} /> Add Group
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

                  {/* ─── Advanced ─── */}
                  <button
                    onClick={() => setAdvancedMapOpen((p) => !p)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: sp.sm, marginTop: sp.xl, padding: `${sp.sm}px 0`, background: "transparent", border: "none", cursor: "pointer", outline: "none", color: t.textSubtle }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <div style={{ flex: 1, height: 1, background: t.borderDark }} />
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>ADVANCED</span>
                    <ChevronDown size={11} style={{ transform: advancedMapOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }} />
                    <div style={{ flex: 1, height: 1, background: t.borderDark }} />
                  </button>
                  <Expandable open={advancedMapOpen}>
                    <div style={{ paddingTop: sp.sm }}>
                      <div style={{ fontSize: 10, color: t.textSubtle, marginBottom: sp.xs }}>Custom Mapbox style URL</div>
                      <input
                        value={customStyleUrl}
                        onChange={(e) => setCustomStyleUrl(e.target.value)}
                        placeholder="mapbox://styles/…"
                        style={{ width: "100%", padding: `${sp.sm}px ${sp.md}px`, ...type.body, fontSize: 11, borderRadius: sp.xs, border: `1px solid ${t.borderSubtle}`, background: t.bgField, color: t.textPrimary, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = t.yellow500)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
                      />
                      <div style={{ display: "flex", alignItems: "flex-start", gap: sp.xs, marginTop: sp.sm, padding: sp.sm, borderRadius: sp.xs, background: t.bgField, border: `1px solid ${t.borderDark}` }}>
                        <ShieldAlert size={11} color={t.textSubtle} style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 10, color: t.textSubtle, lineHeight: 1.5 }}>
                          Tile requests are made from your browser directly. No URL or tile request is logged by Arkem.
                        </span>
                      </div>
                    </div>
                  </Expandable>
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

      {/* ═══ MAP AREA ═══ */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <MapPlaceholder sources={sources} filteredCounts={filteredCounts} baseMap={baseMap} customStyleUrl={customStyleUrl} heatmapEnabled={heatmapEnabled} drawerOpen={drawerOpen} onDeviceClick={(device) => { setDrawerSource("marker"); setSelectedDevice(device); setDrawerOpen(true); }} onMapReady={(map) => { sharedMapRef.current = map; }} />

        {/* ─── Persistent map QueryBar overlay ─── */}
        <div style={{ position: "absolute", bottom: sp.sm, left: "50%", transform: "translateX(-50%)", zIndex: 12, pointerEvents: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: sp.sm, padding: `${sp.xs + 1}px ${sp.md}px`, background: "rgba(18,18,22,0.85)", backdropFilter: "blur(8px)", border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.4)", pointerEvents: "auto", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis" }}>{queryName}</span>
            {totalConditions > 0 && (
              <>
                <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: t.textSecondary }}>{totalConditions} condition{totalConditions !== 1 ? "s" : ""}</span>
              </>
            )}
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: t.textSecondary }}>
              {isCapped ? "50,000+" : totalRecords.toLocaleString()} records
              {computationModel === "local" && <span style={{ fontSize: 9, color: t.textSubtle, fontStyle: "italic" }}> · local</span>}
            </span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
            <button onClick={() => setShowSaveModal(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: `2px ${sp.xs}px`, borderRadius: sp.xs, fontSize: 11, fontWeight: 600, color: t.yellow500, outline: "none" }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >Save</button>
            <button onClick={() => setShowShareModal(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: `2px ${sp.xs}px`, borderRadius: sp.xs, fontSize: 11, color: t.textSecondary, outline: "none" }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >Share</button>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — drawer expands left, pushing toolbar inward ═══ */}
      <div style={{
        position: "absolute",
        top: sp.sm,
        right: sp.sm,
        bottom: sp.sm,
        zIndex: 11,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
      }}>

        {/* Clip — animates width 0→320, right-anchors drawer so it reveals from toolbar edge */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          width: drawerOpen ? 320 : 0,
          transition: prefersReduced ? "none" : `width ${motion.slow} ${drawerOpen ? motion.easeOut : motion.easeIn}`,
          pointerEvents: drawerOpen ? "auto" : "none",
        }}>
          <div
            role="region"
            aria-label="Device Details"
            aria-hidden={!drawerOpen}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 320,
              background: t.glassBg,
              border: `1px solid ${t.glassBorder}`,
              borderRadius: sp.xs,
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <DevicePanel device={selectedDevice} onClose={() => { setDrawerOpen(false); setSelectedDevice(null); }} />
          </div>
        </div>

        {/* Toolbar — pushed left by drawer expanding, slides back when drawer closes */}
        <div style={{ width: 44, flexShrink: 0 }}>
          <MapToolbar mapRef={sharedMapRef} />
        </div>

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
          onSave={(name) => { setQueryName(name); setShowSaveModal(false); }}
        />
      )}

      {showShareModal && (
        <ShareModal
          queryName={queryName}
          sources={sources}
          groups={groups}
          totalConditions={totalConditions}
          baseMap={baseMap}
          onClose={() => setShowShareModal(false)}
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
function QueryBar({ queryName, setQueryName, isEditingName, setIsEditingName, onClear, onCollapse, onSave, onShare }) {
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

        {/* Share */}
        <QBarIcon icon={<Share2 size={14} />} title="Share query" onClick={onShare} />

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
        border: "none",
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
function SourceGroupSection({ group, filteredCounts, isFiltered, computationModel, onToggleCollapse, onRenameGroup, onRemoveGroup, onToggleSource, onUpdateLayer, onAddSubLayer, onRemoveSubLayer, onUpdateSubLayer, onAddDataset, onRemoveSource }) {
  const [renaming, setRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState(group.name);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hoveringHeader, setHoveringHeader] = useState(false);
  const [datasetPickerOpen, setDatasetPickerOpen] = useState(false);
  const visibleCount = group.sources.filter((s) => s.visible).length;
  const accessibleDatasets = DATASET_CATALOG.filter((d) => TIER_RANK[d.tier] <= TIER_RANK[CURRENT_USER_TIER]);

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
            style={{ flex: 1, fontSize: 11, fontWeight: 600, color: t.textSecondary, cursor: group.system ? "default" : "text", userSelect: "none" }}
            onDoubleClick={() => { if (!group.system) { setRenameVal(group.name); setRenaming(true); } }}
          >
            {group.name}
          </span>
        )}

        {/* Count badge */}
        <span style={{ fontSize: 9, color: t.textSubtle, flexShrink: 0 }}>
          {visibleCount}/{group.sources.length}
        </span>

        {/* Delete group — hover reveal (not shown for system groups) */}
        {hoveringHeader && !renaming && !group.system && (
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
              computationModel={computationModel}
              onToggle={() => onToggleSource(src.id)}
              onUpdateLayer={(key, val) => onUpdateLayer(src.id, key, val)}
              onAddSubLayer={() => onAddSubLayer(src.id)}
              onRemoveSubLayer={(lid) => onRemoveSubLayer(src.id, lid)}
              onUpdateSubLayer={(lid, key, val) => onUpdateSubLayer(src.id, lid, key, val)}
              onRemove={src.system ? null : () => onRemoveSource(src.id)}
            />
          ))}

          {/* Add Dataset picker (hidden for system groups) */}
          {!group.system && <>
            <button
              onClick={() => setDatasetPickerOpen((p) => !p)}
              style={{ ...addBtnStyle, marginTop: group.sources.length > 0 ? sp.xs : 0 }}
              onMouseEnter={addBtnHover} onMouseLeave={addBtnLeave}
              onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <Plus size={11} /> Add Dataset
            </button>
            <Expandable open={datasetPickerOpen} duration={motion.fast}>
              <div style={{ marginTop: sp.xs, marginBottom: sp.xs, border: `1px solid ${t.borderDark}`, borderRadius: sp.xs, overflow: "hidden" }}>
                {accessibleDatasets.map((ds) => (
                  <button key={ds.id} onClick={() => { onAddDataset(ds); setDatasetPickerOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: sp.sm, padding: `${sp.xs}px ${sp.sm}px`, background: "transparent", border: "none", borderBottom: `1px solid ${t.borderDark}`, cursor: "pointer", outline: "none", textAlign: "left" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = t.bgHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: ds.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 11, color: t.textPrimary }}>{ds.name}</span>
                    <span style={{ fontSize: 10, color: t.textSubtle }}>{ds.records.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </Expandable>
          </>}
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

function SourceRow({ source, filteredCount, isFiltered, computationModel, onToggle, onUpdateLayer, onAddSubLayer, onRemoveSubLayer, onUpdateSubLayer, onRemove }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginBottom: sp.xs }}>
      {/* ── Summary row ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: sp.sm,
        padding: `${sp.xs}px 0`,
        background: "transparent",
        opacity: source.muted ? 0.35 : source.visible ? 1 : 0.45,
        transition: `opacity ${motion.fast} ${motion.easeOut}`,
      }}>
        {!source.system && <GripVertical size={12} color={t.textSubtle} style={{ cursor: "grab", flexShrink: 0, marginTop: 3 }} aria-hidden="true" />}

        {/* Layer type icon — carries the source color */}
        <span style={{ flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center" }} aria-hidden="true">
          <LayerTypeIcon type={source.layerType} color={source.muted ? t.textSubtle : source.color} size={8} />
        </span>

        {/* Name + counter stacked */}
        <div style={{ flex: 1, minWidth: 0, cursor: source.muted ? "default" : "pointer" }} onClick={() => !source.muted && setExpanded(!expanded)}>
          <div style={{ display: "flex", alignItems: "center", gap: sp.xs }}>
            <span style={{ ...type.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 1, fontStyle: source.muted ? "italic" : "normal", color: source.muted ? t.textSubtle : undefined }}>{source.name}</span>
            {!source.muted && (source.layers || []).length > 0 && (
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
              <span style={{ fontSize: 9, fontWeight: 500, color: source.muted ? t.textSubtle : t.feedbackWarning, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0, lineHeight: "14px" }}>
                SYS
              </span>
            )}
          </div>
          {/* Counter / muted status subheading */}
          <div style={{ ...type.secondary, fontSize: 10, color: t.textSubtle, marginTop: 1, display: "flex", alignItems: "center", gap: sp.xs, flexWrap: "wrap" }}>
            {source.muted ? (
              <span style={{ fontStyle: "italic" }}>Not triggered</span>
            ) : source.visible && isFiltered && filteredCount !== undefined ? (
              <>
                <span style={{ color: t.textSecondary, fontWeight: 600 }}>{filteredCount.toLocaleString()}</span>
                <span style={{ color: t.textSubtle }}>/</span>
                <span>{source.records.toLocaleString()}</span>
              </>
            ) : (
              <span>{source.records.toLocaleString()}</span>
            )}
            {!source.muted && computationModel === "local" && source.visible && (
              <span style={{ fontSize: 9, color: t.textSubtle, fontStyle: "italic" }}>· calculated locally</span>
            )}
          </div>
          {/* Origin metadata for system sources */}
          {!source.muted && source.origin && (
            <div style={{ fontSize: 9, color: t.textSubtle, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Added via {source.origin.triggeredBy} · {source.origin.recordCount.toLocaleString()} records · {source.origin.workspaceVisible ? "Visible to workspace" : "Private"}
            </div>
          )}
        </div>

        {/* Eye/hide + settings — hidden for muted (not-yet-triggered) sources */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          {!source.muted && <button
            onClick={onToggle}
            aria-label={source.visible ? `Hide ${source.name}` : `Show ${source.name}`}
            style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none", opacity: 0.6, transition: "opacity 0.1s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {source.visible ? <Eye size={13} color={t.textSubtle} /> : <EyeOff size={13} color={t.textSubtle} />}
          </button>}
          {!source.muted && <button
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse layer settings" : "Expand layer settings"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: sp.xs, borderRadius: sp.xs, outline: "none", opacity: expanded ? 1 : 0.6, transition: "opacity 0.1s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = expanded ? "1" : "0.6")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Sliders size={13} color={t.textSubtle} />
          </button>}
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
            style={{ ...addBtnStyle, marginTop: sp.sm }}
            onMouseEnter={addBtnHover} onMouseLeave={addBtnLeave}
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

function ConditionGroup({ group, groupIndex, groupCount, sources, canRemove, conflictDiagnosis, onToggleLogic, onRemoveCondition, onAddCondition, onRemoveGroup, onRename, onMoveUp, onMoveDown, isAdding, addStep, newCondition, onPickScope, onPickField, onPickOp, onConfirm, onCancel, onBack, onValueChange, onSourceScopeChange }) {
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
            <ConditionRow condition={cond} sources={sources} diagnosis={conflictDiagnosis?.[cond.id]} onRemove={() => onRemoveCondition(cond.id)} />
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
function ConditionRow({ condition, sources, diagnosis, onRemove }) {
  const iconMap = { spatial: Target, time: CalendarDays, attribute: Sliders };
  const Icon = iconMap[condition.scope] || Tag;
  const scopedSource = condition.sourceScope && condition.sourceScope !== "all" ? sources.find((s) => s.id === condition.sourceScope) : null;
  const diagColor = diagnosis === "conflicting" ? "#EF4444" : diagnosis === "contributing" ? "#22C55E" : null;

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: sp.sm,
      padding: `${sp.sm}px ${sp.sm}px ${sp.sm}px ${sp.md}px`,
      borderRadius: sp.xs,
      background: diagnosis === "conflicting" ? "#EF444410" : t.bgField,
      border: diagnosis === "conflicting" ? "1px solid #EF444430" : "1px solid transparent",
      marginBottom: sp.xs,
      transition: "background 0.2s, border-color 0.2s",
    }}>
      {diagColor && <span style={{ width: 6, height: 6, borderRadius: "50%", background: diagColor, flexShrink: 0, marginTop: 5 }} />}
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

          {/* Drawn Polygon: paste geometry */}
          {POLYGON_DRAW_FIELDS.includes(nc.field) ? (
            <div style={{ display: "flex", flexDirection: "column", gap: sp.sm }}>
              <textarea
                autoFocus
                value={nc.value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={"Paste GeoJSON, WKT, or coordinate pairs\ne.g. POLYGON((lng lat, …))"}
                rows={5}
                style={{
                  width: "100%", padding: `${sp.sm}px ${sp.md}px`, ...type.body, fontSize: 11,
                  borderRadius: sp.xs, border: `1px solid ${t.borderSubtle}`, background: t.bgField,
                  color: t.textPrimary, outline: "none", resize: "vertical", boxSizing: "border-box",
                  fontFamily: "monospace", lineHeight: 1.5, transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = t.yellow500)}
                onBlur={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
              />
              <span style={{ fontSize: 10, color: t.textSubtle }}>Accepts GeoJSON geometry, WKT, or space-separated coordinate pairs.</span>
            </div>
          ) : SAVED_BOUNDARY_FIELDS.includes(nc.field) ? (
            /* Saved Boundary: dropdown */
            <div style={{ display: "flex", flexDirection: "column", gap: sp.sm }}>
              {SAVED_BOUNDARIES.map((b) => (
                <button key={b} onClick={() => onValueChange(b)} style={{ display: "flex", alignItems: "center", gap: sp.sm, padding: `${sp.sm}px ${sp.md}px`, borderRadius: sp.xs, border: `1px solid ${nc.value === b ? t.yellow500 : t.borderDark}`, background: nc.value === b ? t.yellow950 : "transparent", color: t.textPrimary, cursor: "pointer", outline: "none", textAlign: "left", transition: "border-color 0.15s, background 0.15s" }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <Layers size={12} color={nc.value === b ? t.yellow500 : t.textSubtle} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12 }}>{b}</span>
                </button>
              ))}
            </div>
          ) : (
            /* Default: text input */
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
            </div>
          )}

          <div style={{ display: "flex", gap: sp.sm, justifyContent: "flex-end" }}>
            <button
              onClick={onConfirm}
              disabled={!nc.value}
              style={{
                padding: `${sp.sm}px ${sp.xl}px`, ...type.body, fontSize: 12, fontWeight: 600,
                borderRadius: sp.sm, border: "none",
                background: nc.value ? t.yellow500 : t.borderLight,
                color: nc.value ? t.textInverse : t.textSubtle,
                cursor: nc.value ? "pointer" : "not-allowed", outline: "none",
                transition: "background 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Add filter
            </button>
          </div>
          {!POLYGON_DRAW_FIELDS.includes(nc.field) && !SAVED_BOUNDARY_FIELDS.includes(nc.field) && (
            <span style={{ ...type.secondary, fontSize: 10, color: t.textSubtle }}>Press Enter to confirm</span>
          )}
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
    <div style={{ width: 24, height: 1, background: t.borderDark, margin: `${sp.xs}px 0`, flexShrink: 0 }} />
  );
}

function ToolbarBtn({ icon: Icon, label, size }) {
  const sz = size || 16;
  return (
    <button
      title={label}
      aria-label={label}
      style={{
        width: 44, height: 44, padding: 0,
        background: "transparent", border: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", outline: "none", flexShrink: 0,
        transition: `background ${motion.fast}`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = t.bgHover; e.currentTarget.querySelector("svg").style.color = t.textSecondary; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.querySelector("svg").style.color = t.textSubtle; }}
      onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
      onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
    >
      <Icon size={sz} color={t.textSubtle} />
    </button>
  );
}

function MapToolbar({ mapRef }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const toggleSearch = () => {
    setSearchOpen((v) => {
      if (!v) setTimeout(() => inputRef.current?.focus(), 50);
      return !v;
    });
  };

  return (
    <div style={{ width: 44, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: t.glassBg, border: `1px solid ${t.glassBorder}`, borderRadius: sp.xs, boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>

      {/* ── Top group ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: sp.xs }}>
        <ToolbarBtn icon={Flag}     label="Flag" />
        <ToolbarDivider />
        <ToolbarBtn icon={Layers}   label="Layers" />
        <ToolbarBtn icon={Ruler}    label="Measure" />
        <ToolbarBtn icon={Pentagon} label="Draw Shape" />
        <ToolbarDivider />
        <ToolbarBtn icon={Box}      label="3D View" />
      </div>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Bottom group: search + zoom ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: sp.xs }}>
        <ToolbarDivider />

        {/* Search toggle */}
        <button
          title="Search"
          aria-label="Search"
          onClick={toggleSearch}
          style={{
            width: 44, height: 44, padding: 0,
            background: searchOpen ? t.bgField : "transparent", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", outline: "none", flexShrink: 0,
            transition: `background ${motion.fast}`,
          }}
          onMouseEnter={(e) => { if (!searchOpen) { e.currentTarget.style.background = t.bgHover; e.currentTarget.querySelector("svg").style.color = t.textSecondary; } }}
          onMouseLeave={(e) => { if (!searchOpen) { e.currentTarget.style.background = "transparent"; e.currentTarget.querySelector("svg").style.color = searchOpen ? t.textPrimary : t.textSubtle; } }}
          onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
          onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
          onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
        >
          <Search size={16} color={searchOpen ? t.textPrimary : t.textSubtle} />
        </button>

        <ToolbarDivider />

        {/* Zoom in */}
        <button
          title="Zoom in"
          aria-label="Zoom in"
          onClick={() => mapRef?.current?.zoomIn()}
          style={{ width: 44, height: 44, padding: 0, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none", flexShrink: 0, transition: `background ${motion.fast}`, color: t.textSubtle, fontSize: 18, fontWeight: 300, lineHeight: 1, userSelect: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = t.bgHover; e.currentTarget.style.color = t.textPrimary; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.textSubtle; }}
          onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
          onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
          onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
        >+</button>

        {/* Zoom out */}
        <button
          title="Zoom out"
          aria-label="Zoom out"
          onClick={() => mapRef?.current?.zoomOut()}
          style={{ width: 44, height: 44, padding: 0, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none", flexShrink: 0, transition: `background ${motion.fast}`, color: t.textSubtle, fontSize: 18, fontWeight: 300, lineHeight: 1, userSelect: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = t.bgHover; e.currentTarget.style.color = t.textPrimary; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.textSubtle; }}
          onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
          onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
          onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
        >−</button>
      </div>

      {/* ── Search input — floating panel, slides left out of the railing ── */}
      <div style={{
        position: "absolute",
        right: 44,   /* exits left from the toolbar edge */
        bottom: sp.sm,
        width: searchOpen ? 240 : 220,
        opacity: searchOpen ? 1 : 0,
        transform: searchOpen ? "translateX(0)" : "translateX(12px)",
        transition: prefersReduced ? "none" : `opacity ${motion.medium} ${motion.easeOut}, transform ${motion.medium} ${motion.easeOut}, width ${motion.medium} ${motion.easeOut}`,
        pointerEvents: searchOpen ? "auto" : "none",
        background: t.glassBg,
        border: `1px solid ${t.glassBorder}`,
        borderRadius: sp.xs,
        boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)",
        padding: `${sp.sm}px`,
        boxSizing: "border-box",
      }}>
        <div style={{ position: "relative" }}>
          <Search size={13} color={t.textSubtle} style={{ position: "absolute", left: sp.sm, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input
            ref={inputRef}
            placeholder="Search address, LOI or device ID"
            aria-label="Search"
            style={{
              width: "100%", height: 32,
              padding: `0 ${sp.sm}px 0 ${sp.xl + sp.xs}px`,
              background: t.bgField, border: `1px solid ${t.borderDark}`, borderRadius: sp.xs,
              ...type.body, fontSize: 12,
              color: t.textPrimary, outline: "none",
              transition: `border-color ${motion.fast}`,
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = t.borderDark)}
            onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
          />
        </div>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DEVICE PANEL — mirrors query builder panel chrome
   ══════════════════════════════════════════════════════════════ */
const DEVICE_TABS = [
  { key: "device",       icon: MonitorSmartphone, label: "Device Details" },
  { key: "report",       icon: ShieldAlert,       label: "Threat Report"  },
  { key: "applications", icon: AppWindow,         label: "Applications"   },
  { key: "network",      icon: Wifi,              label: "Network"        },
  { key: "timeline",     icon: Clock,             label: "Timeline"       },
];

/* ── PanelTabBar — reusable icon tab strip, same token/motion spec as QueryBar ── */
function PanelTabBar({ tabs, activeKey, onChange }) {
  return (
    <div role="tablist" style={{
      flexShrink: 0, display: "flex", alignItems: "stretch",
      background: t.bgBase, borderBottom: `1px solid ${t.borderDark}`,
      height: 36,
    }}>
      {tabs.map(({ key, icon: Icon, label }) => {
        const isActive = activeKey === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            title={label}
            aria-label={label}
            style={{
              flex: 1, height: "100%", padding: 0,
              background: "transparent", border: "none",
              borderBottom: `2px solid ${isActive ? t.yellow500 : "transparent"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", outline: "none",
              color: isActive ? t.textPrimary : t.textSubtle,
              transition: `border-color ${motion.fast}, color ${motion.fast}, background ${motion.fast}`,
            }}
            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.background = t.bgHover; } }}
            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = t.textSubtle; e.currentTarget.style.background = "transparent"; } }}
            onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
            onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}

function DevicePanel({ device, onClose }) {
  const [activeTab, setActiveTab] = useState("device");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

      {/* ── Bar — identical structure to QueryBar ── */}
      <div style={{ flexShrink: 0, background: t.bgBase, borderBottom: `1px solid ${t.borderDark}`, minHeight: 44, boxSizing: "border-box", display: "flex", alignItems: "stretch" }}>

        {/* Left 44px slot — exact match of QueryBar's collapse button spec */}
        <button
          onClick={onClose}
          title="Close panel"
          aria-label="Close panel"
          style={{ width: 44, flexShrink: 0, background: "none", border: "none", borderRight: `1px solid ${t.borderDark}`, cursor: "pointer", padding: 0, outline: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = t.bgHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          onMouseDown={(e) => (e.currentTarget.dataset.mousedown = "1")}
          onFocus={(e) => { if (!e.currentTarget.dataset.mousedown) e.currentTarget.style.boxShadow = focusRing; }}
          onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; delete e.currentTarget.dataset.mousedown; }}
        >
          <PanelLeftClose size={16} color={t.textSubtle} />
        </button>

        {/* Title + close action — same flex row as QueryBar's name+icons slot */}
        <div style={{ display: "flex", alignItems: "center", gap: sp.sm, flex: 1, padding: `0 ${sp.md}px` }}>
          <span style={{ flex: 1, minWidth: 0, ...type.subheading, color: t.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: `${sp.xs}px 2px` }}>
            {device?.id ?? "Device Details"}
          </span>
          <QBarIcon icon={<X size={14} />} title="Close" onClick={onClose} />
        </div>
      </div>

      {/* ── Tab strip — PanelTabBar primitive ── */}
      <PanelTabBar tabs={DEVICE_TABS} activeKey={activeTab} onChange={setActiveTab} />

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <DeviceDetailsContent onClose={onClose} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAP — real Mapbox GL map
   ══════════════════════════════════════════════════════════════ */
const MAPBOX_STYLES = {
  none:        "mapbox://styles/mapbox/empty-v9",
  darkmatter:  "mapbox://styles/mapbox/dark-v11",
  positron:    "mapbox://styles/mapbox/light-v11",
  voyager:     "mapbox://styles/mapbox/streets-v12",
  satellite:   "mapbox://styles/mapbox/satellite-streets-v12",
  dark:        "mapbox://styles/mapbox/dark-v11",
  light:       "mapbox://styles/mapbox/light-v11",
  mutedlight:  "mapbox://styles/mapbox/light-v11",
  mutednight:  "mapbox://styles/mapbox/dark-v11",
};

/* ── Device marker positions (seeded around NYC) ── */
const DEVICE_MARKERS = [
  { id: "DEV-001", lng: -73.9857, lat: 40.7484, color: "#4A9EFF" },
  { id: "DEV-002", lng: -74.0060, lat: 40.7128, color: "#4A9EFF" },
  { id: "DEV-003", lng: -73.9712, lat: 40.7614, color: "#22C55E" },
  { id: "DEV-004", lng: -73.9442, lat: 40.7282, color: "#4A9EFF" },
  { id: "DEV-005", lng: -73.9965, lat: 40.7580, color: "#22C55E" },
  { id: "DEV-006", lng: -74.0134, lat: 40.7023, color: "#4A9EFF" },
  { id: "DEV-007", lng: -73.9823, lat: 40.7389, color: "#22C55E" },
  { id: "DEV-008", lng: -73.9551, lat: 40.7720, color: "#4A9EFF" },
  { id: "DEV-009", lng: -74.0210, lat: 40.6892, color: "#22C55E" },
  { id: "DEV-010", lng: -73.9634, lat: 40.7831, color: "#4A9EFF" },
  { id: "DEV-011", lng: -73.9901, lat: 40.7305, color: "#22C55E" },
  { id: "DEV-012", lng: -74.0071, lat: 40.7445, color: "#4A9EFF" },
];

function MapPlaceholder({ sources, filteredCounts, baseMap, customStyleUrl, heatmapEnabled, drawerOpen, onDeviceClick, onMapReady }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const styleUrl = (customStyleUrl && customStyleUrl.startsWith("mapbox://styles/")) ? customStyleUrl : (MAPBOX_STYLES[baseMap] || MAPBOX_STYLES.darkmatter);

  // Deactivate all markers when drawer closes from outside
  useEffect(() => {
    if (!drawerOpen) markersRef.current.forEach((m) => m.el.classList.remove("active"));
  }, [drawerOpen]);

  // Inject Mapbox CSS scoped to .mapbox-scope
  useEffect(() => {
    if (document.getElementById("mapbox-scoped-css")) return;
    const style = document.createElement("style");
    style.id = "mapbox-scoped-css";
    style.textContent = `
      .mapbox-scope .mapboxgl-canvas { display: block; }
      .mapbox-scope .mapboxgl-map { overflow: hidden; position: relative; }
      .arkem-marker {
        width: 10px; height: 10px; border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.25);
        cursor: pointer;
        box-shadow: 0 0 0 0 rgba(255,255,255,0.15);
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .arkem-marker:hover {
        transform: scale(1.5);
        box-shadow: 0 0 0 4px rgba(255,255,255,0.1);
      }
      .arkem-marker.active {
        transform: scale(1.6);
        box-shadow: 0 0 0 5px rgba(255,255,255,0.15);
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Init map + add markers
  useEffect(() => {
    if (!containerRef.current) return;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: [-73.985, 40.748],
      zoom: 11,
      attributionControl: false,
    });

    map.on("load", () => {
      // Add markers for each device
      DEVICE_MARKERS.forEach((device) => {
        const el = document.createElement("div");
        el.className = "arkem-marker";
        el.style.backgroundColor = device.color;
        el.dataset.deviceId = device.id;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          // Deactivate all, activate clicked
          markersRef.current.forEach((m) => m.el.classList.remove("active"));
          el.classList.add("active");
          onDeviceClick?.(device);
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([device.lng, device.lat])
          .addTo(map);

        markersRef.current.push({ marker, el, device });
      });
    });

    mapRef.current = map;
    onMapReady?.(map);
    return () => {
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Swap style when baseMap changes
  useEffect(() => {
    if (mapRef.current) mapRef.current.setStyle(styleUrl);
  }, [styleUrl]);

  return (
    <div className="mapbox-scope" style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SAVE MODAL
   ══════════════════════════════════════════════════════════════ */
function SaveModal({ queryName, sources, groups, totalConditions, baseMap, onClose, onSave }) {
  const [draftName, setDraftName] = useState(queryName);
  const [systemOptIns, setSystemOptIns] = useState({});
  const userSources = sources.filter((s) => s.visible && !s.system);
  const systemSources = sources.filter((s) => s.system);

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Save Query" style={{ position: "fixed", inset: 0, background: t.overlayDark, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 460, background: t.bgRaised, border: `1px solid ${t.borderLight}`, borderRadius: sp.sm, padding: sp.xl, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ ...type.heading, marginBottom: sp.xs, color: t.textPrimary }}>Save Query</div>
        <div style={{ marginBottom: sp.xl }}>
          <FieldLabel>Query name</FieldLabel>
          <input
            autoFocus
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && draftName.trim() && onSave(draftName.trim())}
            style={{ width: "100%", padding: `${sp.sm}px ${sp.md}px`, ...type.body, borderRadius: sp.xs, border: `1px solid ${t.borderSubtle}`, background: t.bgField, color: t.textPrimary, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = t.yellow500)}
            onBlur={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
          />
        </div>

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
          <button onClick={() => draftName.trim() && onSave(draftName.trim())} disabled={!draftName.trim()} style={{ padding: `${sp.sm}px ${sp.xl}px`, ...type.body, fontWeight: 600, borderRadius: sp.xs, border: "none", background: draftName.trim() ? t.yellow500 : t.borderLight, color: draftName.trim() ? t.textInverse : t.textSubtle, cursor: draftName.trim() ? "pointer" : "default", outline: "none" }}
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
   SHARE MODAL
   ══════════════════════════════════════════════════════════════ */
function ShareModal({ queryName, sources, groups, totalConditions, baseMap, onClose }) {
  const [copied, setCopied] = useState(false);
  const userSources = sources.filter((s) => s.visible && !s.system);

  const copyLink = () => {
    const stub = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(queryName)}`;
    navigator.clipboard?.writeText(stub).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Share Query" style={{ position: "fixed", inset: 0, background: t.overlayDark, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 460, background: t.bgRaised, border: `1px solid ${t.borderLight}`, borderRadius: sp.sm, padding: sp.xl, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ ...type.heading, marginBottom: sp.xs, color: t.textPrimary }}>Share Query</div>
        <div style={{ ...type.body, color: t.textSecondary, marginBottom: sp.xl }}>This link shares your query configuration — not device data.</div>

        {/* What's included */}
        <FieldLabel>What's included in the link</FieldLabel>
        <div style={{ marginBottom: sp.xl }}>
          <IncRow label="Query name" value={queryName} />
          <IncRow label="Data sources" value={userSources.map((s) => s.name).join(", ") || "None"} />
          <IncRow label="Conditions" value={`${totalConditions} condition${totalConditions !== 1 ? "s" : ""} across ${groups.length} group${groups.length !== 1 ? "s" : ""}`} />
          <IncRow label="Map settings" value={`${baseMap} base map`} />
        </div>

        {/* Disclosure */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: sp.sm, padding: sp.md, borderRadius: sp.xs, background: t.bgField, border: `1px solid ${t.borderDark}`, marginBottom: sp.xl }}>
          <ShieldAlert size={14} color={t.textSubtle} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ ...type.secondary, color: t.textSubtle, lineHeight: 1.5 }}>
            Sharing creates a read-only link. <strong style={{ color: t.textSecondary }}>No raw device data is transmitted</strong> — only query parameters and map configuration.
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: sp.sm, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: `${sp.sm}px ${sp.lg}px`, ...type.body, borderRadius: sp.xs, border: `1px solid ${t.borderLight}`, background: "transparent", color: t.textSecondary, cursor: "pointer", outline: "none" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >Cancel</button>
          <button onClick={copyLink} style={{ display: "flex", alignItems: "center", gap: sp.sm, padding: `${sp.sm}px ${sp.xl}px`, ...type.body, fontWeight: 600, borderRadius: sp.xs, border: "none", background: copied ? t.feedbackSuccess : t.yellow500, color: t.textInverse, cursor: "pointer", outline: "none", transition: "background 0.2s" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {copied ? <CheckCircle2 size={14} /> : <Link size={14} />}
            {copied ? "Copied!" : "Copy Link"}
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
