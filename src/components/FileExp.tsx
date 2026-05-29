import { useState } from "react";
import {
  Folder,
  FolderOpen,
  FileText,
  Notepad as NotepadIcon,
  Wordpad,
  Explorer100,
  Computer,
  FolderFile,
} from "@react95/icons";

type FileItem = {
  name: string;
  type: "folder" | "file";
  icon: React.ReactNode;
  size?: string;
  modified?: string;
  content?: string;
  repo?: string;
  stack?: string;
  children?: FileItem[];
};

type TreeNode = {
  label: string;
  path: string;
  children?: TreeNode[];
};

type OpenFile = {
  id: string;
  name: string;
  content: string;
  repo?: string;
  stack?: string;
  pos: { x: number; y: number };
  minimized?: boolean;
};

const ROOT: FileItem[] = [
  {
    name: "Documents",
    type: "folder",
    icon: <Folder variant="32x32_4" />,
    modified: "5/12/2025",
    children: [
      { name: "Resume.doc", type: "file", icon: <Wordpad variant="32x32_4" />, size: "24 KB", modified: "4/30/2025" },
      {
        name: "Notes.txt", type: "file", icon: <NotepadIcon variant="32x32_4" />, size: "4 KB", modified: "5/10/2025",
        content: "Personal Notes\n==============\n\n- Buy groceries\n- Call dentist\n- Finish the project by Friday\n- Read chapter 4\n",
      },
      {
        name: "Report.txt", type: "file", icon: <FileText variant="32x32_4" />, size: "12 KB", modified: "5/01/2025",
        content: "Q1 Report\n=========\n\nRevenue was up 12% compared to last quarter.\nExpenses remained flat.\nNet profit margin improved to 18%.\n",
      },
      {
        name: "Projects",
        type: "folder",
        icon: <Folder variant="32x32_4" />,
        modified: "5/08/2025",
        children: [
          {
            name: "Proposal.txt", type: "file", icon: <FileText variant="32x32_4" />, size: "8 KB", modified: "5/07/2025",
            content: "Project Proposal\n================\n\nObjective: Build a cross-platform desktop app.\nTimeline: 3 months.\nBudget: $12,000.\n\nPhase 1 - Research\nPhase 2 - Development\nPhase 3 - Testing & Launch\n",
          },
          {
            name: "Budget.txt", type: "file", icon: <FileText variant="32x32_4" />, size: "6 KB", modified: "5/06/2025",
            content: "Budget Breakdown\n================\n\nDesign:      $2,000\nDevelopment: $7,000\nMarketing:   $2,000\nMisc:        $1,000\n-----------------------\nTotal:      $12,000\n",
          },
        ],
      },
    ],
  },
  {
    name: "Downloads",
    type: "folder",
    icon: <Folder variant="32x32_4" />,
    modified: "5/20/2025",
    children: [
      { name: "Setup.exe", type: "file", icon: <Explorer100 variant="32x32_4" />, size: "1.2 MB", modified: "5/15/2025" },
      {
        name: "Readme.txt", type: "file", icon: <NotepadIcon variant="32x32_4" />, size: "2 KB", modified: "5/15/2025",
        content: "README\n======\n\nThank you for downloading this software.\n\nInstallation:\n1. Run Setup.exe\n2. Follow the on-screen instructions\n3. Restart your computer\n\nFor support, see the help file.\n",
      },
    ],
  },
  {
    name: "System",
    type: "folder",
    icon: <FolderFile variant="32x32_4" />,
    modified: "1/01/2025",
    children: [
      {
        name: "Config.txt", type: "file", icon: <FileText variant="32x32_4" />, size: "3 KB", modified: "1/01/2025",
        content: "System Configuration\n====================\n\nresolution=1024x768\ncolors=256\nswapfile=512MB\nautoexec=yes\n",
      },
      {
        name: "Drivers.txt", type: "file", icon: <FileText variant="32x32_4" />, size: "18 KB", modified: "1/01/2025",
        content: "Installed Drivers\n=================\n\nDisplay:  VGA Compatible (v4.0)\nSound:    SB16 Compatible (v3.2)\nNetwork:  NE2000 Compatible (v2.1)\nPrinter:  Generic PostScript (v1.0)\n",
      },
    ],
  },
];

const TREE: TreeNode[] = [
  {
    label: "My Computer",
    path: "__root__",
    children: [
      {
        label: "C:\\",
        path: "__root__",
        children: [
          { label: "Documents", path: "Documents", children: [{ label: "Projects", path: "Documents/Projects" }] },
          { label: "Downloads", path: "Downloads" },
          { label: "System",    path: "System" },
        ],
      },
    ],
  },
];

function getItems(path: string): FileItem[] {
  if (path === "__root__") return ROOT;
  const parts = path.split("/");
  let items: FileItem[] = ROOT;
  for (const part of parts) {
    const found = items.find((i) => i.name === part);
    if (!found || found.type !== "folder") return [];
    items = found.children ?? [];
  }
  return items;
}

function SmallFolderIcon({ open }: { open: boolean }) {
  return open ? <FolderOpen variant="16x16_4" /> : <Folder variant="16x16_4" />;
}

function TreeItem({
  node, depth, selectedPath, onSelect,
}: {
  node: TreeNode; depth: number; selectedPath: string; onSelect: (path: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isSelected = selectedPath === node.path;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        style={{
          display: "flex", alignItems: "center", paddingLeft: depth * 12 + 2,
          paddingTop: 1, paddingBottom: 1, cursor: "default",
          background: isSelected ? "#000080" : "transparent",
          color: isSelected ? "#fff" : "#000",
          userSelect: "none", whiteSpace: "nowrap", fontSize: 12,
        }}
        onClick={() => { onSelect(node.path); if (hasChildren) setExpanded((e) => !e); }}
      >
        <span style={{ width: 12, display: "inline-block", fontSize: 10, color: isSelected ? "#fff" : "#000" }}>
          {hasChildren ? (expanded ? "-" : "+") : " "}
        </span>
        <span style={{ marginRight: 4, lineHeight: 1, display: "flex", alignItems: "center" }}>
          {node.path === "__root__" && depth === 0
            ? <Computer variant="16x16_4" />
            : <SmallFolderIcon open={expanded && isSelected} />}
        </span>
        {node.label}
      </div>
      {expanded && hasChildren && node.children!.map((child) => (
        <TreeItem key={child.path} node={child} depth={depth + 1} selectedPath={selectedPath} onSelect={onSelect} />
      ))}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: 17, height: 14,
  background: "#c3c7cb",
  borderTop: "1px solid #ffffff",
  borderLeft: "1px solid #ffffff",
  borderRight: "1px solid #868a8e",
  borderBottom: "1px solid #868a8e",
  boxShadow: "inset -1px -1px 0 #000000, inset 1px 1px 0 #d2d2d2",
  cursor: "default", display: "flex",
  alignItems: "center", justifyContent: "center",
  padding: 0, flexShrink: 0, marginLeft: 2,
};

function NotepadWindow({ file, onClose, onMinimize }: {
  file: OpenFile;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
}) {
  const [content, setContent] = useState(file.content);
  const [pos, setPos] = useState(file.pos);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isProject = !!file.repo;

  if (file.minimized) return null;

  function onTitleMouseDown(e: React.MouseEvent) {
    setDragging(true);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging) return;
    setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  }
  function onMouseUp() { setDragging(false); }

  return (
    <div
      style={{
        position: "fixed", top: pos.y, left: pos.x,
        width: isProject ? 520 : 500,
        height: isProject ? 260 : 360,
        background: "#c0c0c0", zIndex: 1000,
        border: "2px solid", borderColor: "#fff #808080 #808080 #fff",
        outline: "1px solid #000", display: "flex", flexDirection: "column",
        boxShadow: "2px 2px 0 #000",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        style={{
          background: "#000e7a", color: "#fefefe", fontSize: 12,
          height: 20, padding: "2px", display: "flex", alignItems: "center",
          justifyContent: "space-between", cursor: "default", userSelect: "none",
          flexShrink: 0, boxSizing: "border-box",
        }}
        onMouseDown={onTitleMouseDown}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}>
          <NotepadIcon variant="16x16_4" />
          <span style={{
            textShadow: "0.5px 0px white, 1.5px 0px white",
            color: "transparent", letterSpacing: "1px", fontSize: 12,
            whiteSpace: "nowrap", overflow: "hidden",
          }}>{file.name} - Notepad</span>
        </div>
        <button style={btnStyle} onMouseDown={(e) => e.stopPropagation()} onClick={() => onMinimize(file.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9">
            <path d="M0 6.95h9v2.04H0V6.95z" />
          </svg>
        </button>
        <button style={btnStyle} onMouseDown={(e) => e.stopPropagation()} onClick={() => onClose(file.id)}>
          <svg width="8" height="7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z" />
          </svg>
        </button>
      </div>

      <div style={{ display: "flex", background: "#c0c0c0", borderBottom: "1px solid #808080", flexShrink: 0, fontSize: 12 }}>
        {["File", "Edit", "Search", "Help"].map((m) => (
          <span key={m} style={{ padding: "2px 8px", cursor: "default" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#000080"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = ""; }}
          >{m}</span>
        ))}
      </div>

      <div style={{ flex: 1, padding: 2, background: "#c0c0c0", overflow: "hidden" }}>
        {isProject ? (
          <div style={{
            width: "100%", height: "100%", boxSizing: "border-box",
            borderTop: "1px solid #808080", borderLeft: "1px solid #808080",
            borderRight: "1px solid #fff", borderBottom: "1px solid #fff",
            background: "#fff", padding: "12px 16px", overflowY: "auto",
            fontFamily: "'W95F', 'MS Sans Serif', sans-serif", fontSize: 12,
            lineHeight: 1.7,
          }}>
            <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 8 }}>
              {file.name.replace(".txt", "").replace(/_/g, " ")}
            </div>
            <div style={{ marginBottom: 10, color: "#111", fontSize: 12 }}>
              {file.content}
            </div>
            {file.stack && (
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: "bold" }}>Stack:</span>
                {" "}<span>{file.stack}</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>GitHub Repo:</span>
              <a
                href={file.repo}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#000080", fontSize: 12, textDecoration: "underline",
                  cursor: "pointer", wordBreak: "break-all",
                  fontFamily: "'W95F', 'MS Sans Serif', sans-serif",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#cc0000"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#000080"; }}
              >{file.repo}</a>
            </div>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            style={{
              width: "100%", height: "100%", resize: "none",
              borderTop: "1px solid #808080", borderLeft: "1px solid #808080",
              borderRight: "1px solid #fff", borderBottom: "1px solid #fff",
              background: "#fff", fontFamily: "'W95F', 'MS Sans Serif', sans-serif",
              fontSize: 13, padding: "2px 4px", boxSizing: "border-box", outline: "none", border: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}

type FileExpProps = {
  initialPath?: string;
};

export default function FileExp({ initialPath = "__root__" }: FileExpProps) {
  const [selectedPath, setSelectedPath] = useState<string>(initialPath);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [view, setView] = useState<"large" | "small" | "list" | "detail">("large");
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);

  const items = getItems(selectedPath);
  const pathLabel = selectedPath === "__root__" ? "C:\\" : "C:\\" + selectedPath.replace(/\//g, "\\");
  const totalFiles = items.filter((i) => i.type === "file").length;
  const totalFolders = items.filter((i) => i.type === "folder").length;

  function handleItemDoubleClick(item: FileItem) {
    if (item.type === "folder") {
      const newPath = selectedPath === "__root__" ? item.name : selectedPath + "/" + item.name;
      setSelectedPath(newPath);
      setSelectedItem(null);
      return;
    }
    if (item.name.endsWith(".txt") && item.content !== undefined) {
      const id = `${item.name}-${Date.now()}`;
      const offset = openFiles.length * 24;
      setOpenFiles((prev) => [
        ...prev,
        { id, name: item.name, content: item.content!, repo: item.repo, stack: item.stack, pos: { x: 120 + offset, y: 80 + offset } },
      ]);
    }
  }

  function closeFile(id: string) {
    setOpenFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function minimizeFile(id: string) {
    setOpenFiles((prev) => prev.map((f) => f.id === id ? { ...f, minimized: true } : f));
  }

  const itemRow = (item: FileItem, cls: string, smallIcon: React.ReactNode) => ({
    cls: `${cls}${selectedItem === item.name ? " selected" : ""}`,
    onClick: (e: React.MouseEvent) => { e.stopPropagation(); setSelectedItem(item.name); },
    onDoubleClick: () => handleItemDoubleClick(item),
    icon: smallIcon,
  });

  return (
    <>
      <style>{`
        .fe-root { display:flex; flex-direction:column; height:100%; font-size:12px; font-family:'W95F','MS Sans Serif',sans-serif; background:#c0c0c0; user-select:none; }
        .fe-toolbar { display:flex; align-items:center; padding:2px 4px; gap:2px; border-bottom:1px solid #808080; background:#c0c0c0; flex-shrink:0; }
        .fe-toolbar-btn { background:#c0c0c0; border-top:1px solid #fff; border-left:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #808080; padding:2px 8px; font-size:11px; cursor:default; font-family:'W95F','MS Sans Serif',sans-serif; white-space:nowrap; }
        .fe-toolbar-btn:active, .fe-toolbar-btn.active { border-top:1px solid #808080; border-left:1px solid #808080; border-right:1px solid #fff; border-bottom:1px solid #fff; }
        .fe-toolbar-sep { width:1px; background:#808080; height:20px; margin:0 2px; border-right:1px solid #fff; }
        .fe-address-bar { display:flex; align-items:center; padding:2px 4px; gap:4px; border-bottom:1px solid #808080; background:#c0c0c0; flex-shrink:0; }
        .fe-address-input { flex:1; border-top:1px solid #808080; border-left:1px solid #808080; border-right:1px solid #fff; border-bottom:1px solid #fff; background:#fff; font-size:12px; padding:1px 4px; font-family:'W95F','MS Sans Serif',sans-serif; outline:none; }
        .fe-body { display:flex; flex:1; overflow:hidden; }
        .fe-tree { width:180px; flex-shrink:0; border-right:2px solid #808080; overflow:auto; background:#fff; padding:2px 0; }
        .fe-pane { flex:1; overflow:auto; background:#fff; padding:4px; }
        .fe-large-grid { display:flex; flex-wrap:wrap; align-content:flex-start; gap:4px; padding:4px; }
        .fe-large-item { display:flex; flex-direction:column; align-items:center; width:80px; padding:4px; cursor:default; text-align:center; }
        .fe-large-item.selected { background:#000080; color:#fff; }
        .fe-large-item span { font-size:11px; margin-top:4px; word-break:break-word; max-width:76px; line-height:1.2; }
        .fe-small-grid { display:flex; flex-wrap:wrap; align-content:flex-start; gap:2px; padding:4px; }
        .fe-small-item { display:flex; align-items:center; width:140px; padding:2px 4px; gap:4px; cursor:default; font-size:12px; }
        .fe-small-item.selected { background:#000080; color:#fff; }
        .fe-list-col { display:flex; flex-direction:column; align-content:flex-start; flex-wrap:wrap; max-height:100%; gap:0; padding:4px; }
        .fe-list-item { display:flex; align-items:center; width:160px; padding:1px 4px; gap:4px; cursor:default; font-size:12px; }
        .fe-list-item.selected { background:#000080; color:#fff; }
        .fe-detail-table { width:100%; border-collapse:collapse; font-size:12px; }
        .fe-detail-table th { background:#c0c0c0; border-top:1px solid #fff; border-left:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #808080; padding:2px 8px; text-align:left; font-weight:normal; cursor:default; white-space:nowrap; }
        .fe-detail-table td { padding:1px 8px; border-bottom:1px solid #e0e0e0; white-space:nowrap; cursor:default; }
        .fe-detail-row.selected td { background:#000080; color:#fff; }
        .fe-statusbar { display:flex; align-items:center; padding:2px 6px; border-top:1px solid #808080; background:#c0c0c0; font-size:11px; flex-shrink:0; gap:12px; }
        .fe-status-panel { border-top:1px solid #808080; border-left:1px solid #808080; border-right:1px solid #fff; border-bottom:1px solid #fff; padding:1px 6px; font-size:11px; }
      `}</style>

      <div className="fe-root">
        <div className="fe-toolbar">
          <button className="fe-toolbar-btn" onClick={() => setSelectedPath("__root__")}>Back</button>
          <div className="fe-toolbar-sep" />
          <button className={`fe-toolbar-btn${view === "large"  ? " active" : ""}`} onClick={() => setView("large")}>Large Icons</button>
          <button className={`fe-toolbar-btn${view === "small"  ? " active" : ""}`} onClick={() => setView("small")}>Small Icons</button>
          <button className={`fe-toolbar-btn${view === "list"   ? " active" : ""}`} onClick={() => setView("list")}>List</button>
          <button className={`fe-toolbar-btn${view === "detail" ? " active" : ""}`} onClick={() => setView("detail")}>Details</button>
        </div>

        <div className="fe-address-bar">
          <span style={{ fontSize: 12, whiteSpace: "nowrap" }}>Address</span>
          <input className="fe-address-input" value={pathLabel} readOnly />
        </div>

        <div className="fe-body">
          <div className="fe-tree">
            {TREE.map((node) => (
              <TreeItem key={node.path} node={node} depth={0} selectedPath={selectedPath} onSelect={setSelectedPath} />
            ))}
          </div>

          <div className="fe-pane" onClick={() => setSelectedItem(null)}>
            {view === "large" && (
              <div className="fe-large-grid">
                {items.map((item) => {
                  const r = itemRow(item, "fe-large-item", null);
                  return (
                    <div key={item.name} className={r.cls} onClick={r.onClick} onDoubleClick={r.onDoubleClick}>
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {view === "small" && (
              <div className="fe-small-grid">
                {items.map((item) => {
                  const r = itemRow(item, "fe-small-item", item.type === "folder" ? <Folder variant="16x16_4" /> : <FileText variant="16x16_4" />);
                  return (
                    <div key={item.name} className={r.cls} onClick={r.onClick} onDoubleClick={r.onDoubleClick}>
                      {r.icon}<span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {view === "list" && (
              <div className="fe-list-col">
                {items.map((item) => {
                  const r = itemRow(item, "fe-list-item", item.type === "folder" ? <Folder variant="16x16_4" /> : <FileText variant="16x16_4" />);
                  return (
                    <div key={item.name} className={r.cls} onClick={r.onClick} onDoubleClick={r.onDoubleClick}>
                      {r.icon}<span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {view === "detail" && (
              <table className="fe-detail-table">
                <thead>
                  <tr><th>Name</th><th>Size</th><th>Type</th><th>Modified</th></tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const r = itemRow(item, "fe-detail-row", item.type === "folder" ? <Folder variant="16x16_4" /> : <FileText variant="16x16_4" />);
                    return (
                      <tr key={item.name} className={r.cls} onClick={r.onClick} onDoubleClick={r.onDoubleClick}>
                        <td style={{ display: "flex", alignItems: "center", gap: 4 }}>{r.icon}{item.name}</td>
                        <td>{item.size ?? ""}</td>
                        <td>{item.type === "folder" ? "File Folder" : "Text Document"}</td>
                        <td>{item.modified ?? ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="fe-statusbar">
          <span className="fe-status-panel">
            {totalFolders > 0 && `${totalFolders} folder(s)  `}{totalFiles} object(s)
          </span>
          <span className="fe-status-panel">
            {items.find((i) => i.name === selectedItem)?.size ?? ""}
          </span>
        </div>
      </div>

      {openFiles.map((f) => (
        <NotepadWindow key={f.id} file={f} onClose={closeFile} onMinimize={minimizeFile} />
      ))}
    </>
  );
}