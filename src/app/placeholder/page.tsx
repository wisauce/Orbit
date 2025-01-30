"use client"
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const source = ["/cdt.mp4", "/lia.jpg", "lialia.mp4", "case.jpg", "abrar.mp4", "gapakelama.MP4"];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Set up IntersectionObserver to detect when videos are in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;

        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 }); // 50% of the video must be visible

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
<div className="flex flex-col bg-black h-screen overflow-y-auto snap-mandatory snap-y">
  {/* Video container with vertical scroll */}
  <div
    ref={containerRef}
    className="flex flex-col h-full w-full scroll-smooth no-scrollbar"
  >
    {source.map((item, i) => (
      item.toLowerCase().endsWith(".mp4") ? (
        <div className="snap-start flex-shrink-0 w-full h-screen" key={i}>
          <video
            ref={(el) => (videoRefs.current[i] = el)}
            className="object-contain w-full h-full"
            controls
            loop
            playsInline
            autoPlay // Auto play is controlled by IntersectionObserver
            src={item}
          />
        </div>
      ) : (
        <div className="snap-start flex-shrink-0 w-full h-screen" key={i}>
          <img className="object-contain w-full h-full" src={item} alt="Image" />
        </div>
      )
    ))}
  </div>
</div>

  );
}
