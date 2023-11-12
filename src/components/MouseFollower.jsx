import { useEffect, useState } from "react";

export default function MouseFollower() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

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
        }}
      >
        Mouse Follower
      </h1>
      <button
        style={{ minWidth: "120px" }}
        onClick={() => setEnabled(!enabled)}
      >
        {enabled ? "Disable" : "Enable"}
      </button>
    </>
  );
}
