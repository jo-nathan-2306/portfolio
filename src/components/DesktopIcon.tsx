// DesktopIcon.js
import React, { type ReactElement, type ReactNode,type ComponentType } from "react";
import { Modal, TitleBar, useModal } from "@react95/core";
import { useWindowsStore } from "../store/windows";

// Centralized style objects for maintainability and clarity
const styles = {
  desktopIcon: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    width: "100px",
    gap: "10px",
  },
  iconImage: {
    height: "64px",
    marginBottom: "8px",
    width: "64px",
  },
  iconName: {
    color: "#ffffff",
    fontSize: "14px",
    margin: "0",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
    userSelect: "none",
  },
  window: {
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
  },
  titleBar: {
    alignItems: "center",
    background: "#f0f0f0",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    cursor: "move",
    display: "flex",
    fontWeight: "bold",
    justifyContent: "space-between",
    padding: "8px",
  },
  closeButton: {
    alignItems: "center",
    background: "#ff5f56",
    border: "1px solid #e04440",
    borderRadius: "50%",
    color: "#9a0000",
    cursor: "pointer",
    display: "flex",
    fontSize: "10px",
    height: "15px",
    justifyContent: "center",
    lineHeight: "10px",
    width: "15px",
  },
  windowContent: {
    flex: "1",
    overflow: "auto",
    padding: "20px",
  },
} as const;

interface WindowProps {
  icon: ReactElement<{ variant?: string }>;
  title: string;
  children: ReactNode;
  width?: number;
  height?: number;
  defaultPosition?: { x: number; y: number };
  onClose:()=>void;
}
function getRandomCenterPosition(width: number, height: number) {
  const winW = typeof window !== "undefined" ? window.innerWidth : 1024;
  const winH = typeof window !== "undefined" ? window.innerHeight : 768;
  const safeW = Math.min(width, Math.max(0, winW - 32));
  const safeH = Math.min(height, Math.max(0, winH - 72));
  const maxOffsetX = Math.min(150, Math.floor(winW * 0.2));
  const maxOffsetY = Math.min(120, Math.floor(winH * 0.2));
  const x = Math.round(winW / 2 - safeW / 2 + (Math.random() * 2 - 1) * maxOffsetX);
  const y = Math.round((winH - 36) / 2 - safeH / 2 + (Math.random() * 2 - 1) * maxOffsetY);
  return {
    x: Math.max(8, Math.min(x, winW - safeW - 8)),
    y: Math.max(8, Math.min(y, winH - safeH - 44)),
  };
}

function getCenterPosition(width: number, height: number) {
  const winW = typeof window !== "undefined" ? window.innerWidth : 1024;
  const winH = typeof window !== "undefined" ? window.innerHeight : 768;
  const safeW = Math.min(width, Math.max(0, winW - 32));
  const safeH = Math.min(height, Math.max(0, winH - 72));
  const x = Math.round(winW / 2 - safeW / 2);
  const y = Math.round((winH - 36) / 2 - safeH / 2);
  return { x, y };
}

const Window = ({ title, onClose, children, icon, width, height, defaultPosition }: WindowProps) => {
  const { minimize, focus } = useModal();
  const calcW = width ?? 400;
  const calcH = height ?? 320;
  const resolvedPosition = defaultPosition ?? React.useMemo(() => getRandomCenterPosition(calcW, calcH), [calcW, calcH]);
  const modalProps: Record<string, any> = {
    id: title,
    hasWindowButton: true,
    className: `desktop-window${title === "DOOM" ? " doom-window" : ""}`,
    dragOptions: {
      bounds: { top: 0, right: 0, bottom: 36, left: 0 },
      recomputeBounds: { dragStart: true, drag: true, dragEnd: true },
    },
    icon,
    title,
    titleBarOptions: [
      <TitleBar.Minimize
        style={{ marginBlock: "auto" }}
        key="maximize"
        onClick={() => {
          minimize(title);
          focus("no-id");
        }}
      />,
      <TitleBar.Close
        style={{ marginBlock: "auto" }}
        key="close"
        onClick={onClose}
      />,
    ],
  };

  modalProps.style = title === "About Me"
    ? {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }
    : {
        position: "fixed",
        left: `${resolvedPosition.x}px`,
        top: `${resolvedPosition.y}px`,
      };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SafeModal {...modalProps}>
      {(() => {
        const contentProps: Record<string, unknown> = {};
        if (typeof width === 'number') contentProps.width = `${width}px`;
        if (typeof height === 'number') contentProps.height = `${height}px`;
        if (title === "About Me") {
          contentProps.style = {
            maxHeight: "75vh",
            overflowY: "auto",
          };
          contentProps.className = "responsive-window-content win95-scroll";
        } else if (title === "DOOM") {
          contentProps.className = "responsive-window-content doom-window-content";
          contentProps.style = { padding: 0, overflow: "hidden" };
        } else if (title === "Portfolio") {
          contentProps.className = "responsive-window-content portfolio-window-content";
          contentProps.style = { padding: 0, overflow: "hidden" };
        } else {
          contentProps.className = "responsive-window-content win95-scroll";
        }
        return (
          // If no width/height passed, Modal.Content will size to its children
          // when no explicit width/height are provided.
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Modal.Content {...contentProps}>
            {children}
          </Modal.Content>
        );
      })()}
    </SafeModal>
  );
};

/**
 * A desktop icon that opens a window on double-click.
 */

interface DesktopIconProps {
  icon: ReactElement<{ variant?: string }>;
  name:string;
  children: ReactNode;
  width?: number;
  height?: number;
}

const DesktopIcon = ({
  icon,
  name,
  children,
  width,
  height,
}: DesktopIconProps) => {
  const { openWindow, closeWindow, isWindowOpen } = useWindowsStore();
  const isOpen = isWindowOpen(name);
  const defaultSizeWidth = width ?? 400;
  const defaultSizeHeight = height ?? 320;
  const [defaultPosition, setDefaultPosition] = React.useState(() => {
    // If About Me is already open on load, center it exactly.
    if (isOpen && name === "About Me") return getCenterPosition(defaultSizeWidth, defaultSizeHeight);
    return getRandomCenterPosition(defaultSizeWidth, defaultSizeHeight);
  });

  React.useEffect(() => {
    if (isOpen) {
      if (name === "About Me") {
        setDefaultPosition(getCenterPosition(defaultSizeWidth, defaultSizeHeight));
      } else {
        setDefaultPosition(getRandomCenterPosition(defaultSizeWidth, defaultSizeHeight));
      }
    }
  }, [isOpen, defaultSizeWidth, defaultSizeHeight]);

  React.useEffect(() => {
    if (!isOpen || name === "About Me") return;
    const keepWindowOnScreen = () => {
      const availableWidth = Math.max(0, window.innerWidth - 32);
      const availableHeight = Math.max(0, window.innerHeight - 72);
      const visibleWidth = Math.min(defaultSizeWidth, availableWidth);
      const visibleHeight = Math.min(defaultSizeHeight, availableHeight);
      setDefaultPosition((position) => ({
        x: Math.max(8, Math.min(position.x, window.innerWidth - visibleWidth - 8)),
        y: Math.max(8, Math.min(position.y, window.innerHeight - visibleHeight - 44)),
      }));
    };
    window.addEventListener("resize", keepWindowOnScreen);
    keepWindowOnScreen();
    return () => window.removeEventListener("resize", keepWindowOnScreen);
  }, [isOpen, name, defaultSizeWidth, defaultSizeHeight]);

  const handleDoubleClick = () => {
    setDefaultPosition(getRandomCenterPosition(defaultSizeWidth, defaultSizeHeight));
    openWindow(name);
  };

  const handleCloseWindow = () => {
    closeWindow(name);
  };

  return (
    <>
      <div
        className={name === "File Explorer" ? "file-explorer-desktop-icon" : undefined}
        style={styles.desktopIcon}
        onDoubleClick={handleDoubleClick}
      >
        {React.cloneElement(icon, { variant: "32x32_4" })}
        <p style={styles.iconName}>{name}</p>
      </div>
      {isOpen && (
        <Window
          width={width}
          height={height}
          defaultPosition={defaultPosition}
          icon={React.cloneElement(icon, { variant: "16x16_4" })}
          title={name}
          onClose={handleCloseWindow}
        >
          {children}
        </Window>
      )}
    </>
  );
};


export default DesktopIcon;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SafeModal = Modal as unknown as ComponentType<any>;
