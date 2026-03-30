"use client";

import { ReactNode, useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import Navbar from "./Navbar";
import Preloader from "./Preloader";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />
      {!isLoading && <Navbar />}
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}>
          {children}
        </div>
      </ReactLenis>
    </>
  );
}
