"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const TOTAL_IMAGES = 192;
const BG_COLOR = "#0a0a0a";

interface SequenceScrollProps {
  children?: React.ReactNode;
}

export default function SequenceScroll({ children }: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(false);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Draw a specific frame to canvas with cover-fit
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Fill background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cover fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
    }

    drawX = (canvas.width - drawWidth) / 2;
    drawY = (canvas.height - drawHeight) / 2;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Pre-load all images
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_IMAGES);
    let loaded = 0;

    for (let i = 0; i < TOTAL_IMAGES; i++) {
      const img = new window.Image();
      const numStr = (i + 1).toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${numStr}.jpg`;

      img.onload = () => {
        loaded++;
        images[i] = img;
        if (loaded === TOTAL_IMAGES) {
          imagesRef.current = images;
          loadedRef.current = true;
          // Draw first frame
          drawFrame(0);
        }
      };

      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_IMAGES) {
          imagesRef.current = images;
          loadedRef.current = true;
          drawFrame(0);
        }
      };

      images[i] = img;
    }
  }, [drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      // But for drawing, use logical size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (loadedRef.current) {
        drawFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Scroll-linked frame update
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loadedRef.current) return;
    const frameIndex = Math.min(
      Math.max(0, Math.round(latest * (TOTAL_IMAGES - 1))),
      TOTAL_IMAGES - 1
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ background: BG_COLOR }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
