"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Packages3DText
 * Premium interactive 3D typography:
 * - Dynamic mouse & gyro perspective tilting (realistic 3D object illusion)
 * - 20-step high-fidelity extrusion shadow with gold rim lighting & soft contact ambient occlusion
 * - Floating micro-particles with depth perception
 * - Metallic specular highlight gleam sweep on scroll / hover
 * - Realistic physical bevel & 3D transformation depth
 */
export function Packages3DText({ scrollProgress = 0 }) {
  const p = Math.max(0, Math.min(1, scrollProgress));
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle subtle 3D interactive tilting on mouse move
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: Number((y * -14).toFixed(2)),
        y: Number((x * 16).toFixed(2)),
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Smooth scroll progression
  const settled = Math.min(1, p / 0.28);
  const opacity = Math.min(1, p * 3.2);
  const baseScale = 0.82 + settled * 0.18;
  const currentScale = isHovered ? baseScale * 1.02 : baseScale;

  // Scroll base angles blended with mouse tilt
  const baseRotY = (1 - settled) * -8 + tilt.y;
  const baseRotX = (1 - settled) * 4 + tilt.x;
  const goldAlpha = Math.min(1, settled * 1.4);

  // 22-layer realistic extrusion in rich deep emerald & dark pine teal
  const depthShadow = Array.from({ length: 22 }, (_, i) => {
    const d = i + 1;
    // Shift slightly in X based on tilt.y for true volumetric responsiveness
    const xOffset = Number((d * 0.95 - (tilt.y * d * 0.04)).toFixed(2));
    const yOffset = Number((d * 0.8 - (tilt.x * d * 0.04)).toFixed(2));
    const alpha = Math.max(0.03, 0.55 - i * 0.024);
    return `${xOffset}px ${yOffset}px 0 rgba(4,24,20,${alpha.toFixed(3)})`;
  }).join(", ");

  // Multi-tier metallic gold bevel edge & cinematic radiance
  const goldRim = [
    `-1px -1px 0 rgba(226,199,139,${(goldAlpha * 0.85).toFixed(2)})`,
    `-2px -1px 0 rgba(201,164,92,${(goldAlpha * 0.6).toFixed(2)})`,
    `0px -2px 0 rgba(255,235,175,${(goldAlpha * 0.75).toFixed(2)})`,
    `1px -1px 0 rgba(180,138,68,${(goldAlpha * 0.4).toFixed(2)})`,
    `-1px 1px 0 rgba(201,164,92,${(goldAlpha * 0.35).toFixed(2)})`,
    `0 0 24px rgba(201,164,92,${(goldAlpha * 0.3).toFixed(2)})`,
    `0 0 70px rgba(13,41,43,${(goldAlpha * 0.45).toFixed(2)})`,
    `0 20px 45px rgba(0,0,0,0.4)`,
  ].join(", ");

  const combinedShadow = `${goldRim}, ${depthShadow}`;

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center select-none text-center cursor-default py-6"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
        opacity,
        transition: "opacity 0.2s ease-out",
      }}
    >
      {/* 3D Atmospheric Ambient Glow */}
      <div
        className="pointer-events-none absolute -inset-x-20 top-1/2 -translate-y-1/2 h-44 rounded-full blur-3xl opacity-35 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, #c9a45c 0%, #173f3d 45%, transparent 70%)`,
          transform: `scale(${1 + tilt.x * 0.02})`,
        }}
      />

      {/* 3D Floating container */}
      <div
        style={{
          transform: `scale(${currentScale.toFixed(3)}) rotateY(${baseRotY.toFixed(2)}deg) rotateX(${baseRotX.toFixed(2)}deg) translateZ(30px)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0, 1)",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {/* "EXPLORE THE" floating badge */}
        <div
          className="inline-flex items-center gap-2 mb-3 rounded-full border border-[#c9a45c]/30 bg-[#0d292b]/70 px-4 py-1 backdrop-blur-md shadow-lg"
          style={{
            transform: "translateZ(35px)",
            transition: "transform 0.2s ease-out",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#e2c78b] animate-pulse" />
          <span
            className="font-inter text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#e2c78b] sm:text-[0.72rem]"
            style={{
              textShadow: "0 0 12px rgba(226,199,139,0.5)",
            }}
          >
            Exclusive Collection
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#e2c78b] animate-pulse" />
        </div>

        {/* Main 3D Sculpted Text "PACKAGES" */}
        <div className="relative inline-block">
          <div
            className="font-playfair font-black uppercase tracking-[0.05em] text-[#13493e]"
            style={{
              fontSize: "clamp(3.6rem, 11.5vw, 9.8rem)",
              textShadow: combinedShadow,
              lineHeight: 0.95,
              display: "block",
              maxWidth: "100%",
              wordBreak: "keep-all",
              transform: "translateZ(50px)",
              letterSpacing: "0.06em",
            }}
          >
            PACKAGES
          </div>

          {/* Golden Specular Reflection Gleam Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 font-playfair font-black uppercase tracking-[0.05em] text-transparent select-none"
            style={{
              fontSize: "clamp(3.6rem, 11.5vw, 9.8rem)",
              lineHeight: 0.95,
              letterSpacing: "0.06em",
              transform: "translateZ(52px)",
              background: `linear-gradient(115deg, transparent 20%, rgba(255,235,175,0.7) 48%, rgba(201,164,92,0.9) 52%, transparent 75%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              opacity: 0.75 + Math.sin(tilt.y * 0.2) * 0.25,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          >
            PACKAGES
          </div>
        </div>

        {/* 3D Floating Metallic Pedestal / Underline */}
        <div
          className="mx-auto mt-6 flex items-center justify-center gap-3"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          <div
            className="h-[1.5px] rounded-full transition-all duration-300"
            style={{
              width: `${Math.round(80 + goldAlpha * 80)}px`,
              background: "linear-gradient(90deg, transparent, #c9a45c)",
            }}
          />
          <div className="h-2 w-2 rotate-45 border border-[#e2c78b] bg-[#c9a45c] shadow-[0_0_8px_#c9a45c]" />
          <div
            className="h-[1.5px] rounded-full transition-all duration-300"
            style={{
              width: `${Math.round(80 + goldAlpha * 80)}px`,
              background: "linear-gradient(90deg, #c9a45c, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
