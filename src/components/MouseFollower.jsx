import { useEffect, useState } from "react";

export default function MouseFollower() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
      setIsVisible(true);
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    } else {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  // change body className
  useEffect(() => {
    document.body.classList.toggle("crosshair", enabled);

    return () => {
      document.body.classList.remove("crosshair");
    };
  }, [enabled]);

  return (
    <>
      {enabled && isVisible && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            borderRadius: "50%",
            opacity: 0.4,
            pointerEvents: "none",
            left: -20,
            top: -20,
            width: 40,
            height: 40,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        ></div>
      )}
      <h1
        style={{
          fontSize: "2rem",
          cursor: `${enabled ? "crosshair" : "default"}`,
        }}
      >
        Mouse Follower
      </h1>
      <button
        style={{
          minWidth: "120px",
          cursor: `${enabled ? "crosshair" : "pointer"}`,
        }}
        onClick={() => setEnabled(!enabled)}
      >
        {enabled ? "Disable" : "Enable"}
      </button>
    </>
  );
}
