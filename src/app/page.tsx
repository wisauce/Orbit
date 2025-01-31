"use client"
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const posts = [
    {
      postsrc: "/cdt.mp4",
      profilesrc: "/lia.jpg",
      username: "wisauce",
      caption: "aduhai ceweku cantik sekali kok bisa ya allahuakbar keren banget dah pokoknya",
    },   // like comment
    {
      postsrc: "/case.jpg",
      profilesrc: "/lia.jpg",
      username: "john_doe",
      caption: "Sungguh indah pemandangan pagi ini, tak terlupakan!",
    },
    {
      postsrc: "/abrar.mp4",
      profilesrc: "/lia.jpg",
      username: "susan_m",
      caption: "Waktu berlalu begitu cepat, kenangan tetap abadi.",
    },
    {
      postsrc: "/lia.jpg",
      profilesrc: "/lia.jpg",
      username: "k3vin",
      caption: "Gokil sih, hari ini seru banget! Gaspol terus!",
    },
    {
      postsrc: "/lialia.mp4",
      profilesrc: "/lia.jpg",
      username: "annabelle",
      caption: "Momen kecil yang membuat hidup lebih berwarna 🌸",
    },
    {
      postsrc: "/gapakelama.mp4",
      profilesrc: "/lia.jpg",
      username: "mystic99",
      caption: "Menatap bintang di langit, memikirkan masa depan.",
    },
  ];  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [expandCaption, setExpandCaption] = useState(false);
  const handleClick = () => {
    setExpandCaption(!expandCaption);
  };

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
<div className="flex flex-col bg-black h-screen overflow-y-auto snap-mandatory snap-y relative">
  {/* Video container with vertical scroll */}
  <div
    ref={containerRef}
    className="flex flex-col h-full w-full scroll-smooth no-scrollbar"
  >
    {posts.map((item, i) => (
      item.postsrc.toLowerCase().endsWith(".mp4") ? (
        <div className="relative snap-start flex-shrink-0 w-full h-screen" key={i}>
          <video
            ref={(el) => (videoRefs.current[i] = el)}
            className="object-contain w-full h-full"
            controls
            loop
            playsInline
            autoPlay // Auto play is controlled by IntersectionObserver
            src={item.postsrc}
          />
          <div className="absolute bottom-0 w-full">
            <div className="flex items-center">
              <div className="relative w-[44px] h-[44px] rounded-full">
              <Image
                src={item.profilesrc}
                fill
                alt="yah"
                className="object-cover rounded-full"
              />
              </div>
                <h3 className="text-white text-[14px] font-bold">{item.username}</h3>
            </div>
            <div className="flex-col">
              <p className={expandCaption ? "text-white overflow-hidden" : "text-white text-ellipsis text-nowrap overflow-hidden" }>{item.caption}</p>
              <p className="text-gray-400" onClick={handleClick}>See more</p>
            </div>
            <div className="flex text-white justify-around w-full items-center h-28">
              <Image
                src="/menu-star.svg"
                width={32}
                height={32}
                alt="yah"
              />
              <Image
                src="/menu-comment.svg"
                width={32}
                height={32}
                alt="yah"
              />
              <Image
                src="/menu-share.svg"
                width={32}
                height={32}
                alt="yah"
              />
              <Image
                src="/menu-bookmark.svg"
                width={32}
                height={32}
                alt="yah"
              />
            </div>
          </div>
                </div>
              ) : (
                <div className="relative snap-start flex-shrink-0 w-full h-screen" key={i}>
                  <img className="object-contain w-full h-full" src={item.postsrc} alt="Image" />
                  <div className="absolute bottom-0 w-full">
                    <div className="flex items-center">
                      <div className="relative w-[44px] h-[44px] rounded-full">
                      <Image
                        src={item.profilesrc}
                        fill
                        alt="yah"
                        className="object-cover rounded-full"
                      />
                      </div>
                        <h3 className="text-white text-[14px] font-bold">{item.username}</h3>
                    </div>
                    <div className="flex-col">
                      <p className={expandCaption ? "text-white overflow-hidden" : "text-white text-ellipsis text-nowrap overflow-hidden" }>{item.caption}</p>
                      <p className="text-gray-400" onClick={handleClick}>See more</p>
                    </div>
                    <div className="flex text-white justify-around w-full items-center h-28">
                      <Image
                        src="/menu-star.svg"
                        width={32}
                        height={32}
                        alt="yah"
                      />
                      <Image
                        src="/menu-comment.svg"
                        width={32}
                        height={32}
                        alt="yah"
                      />
                      <Image
                        src="/menu-share.svg"
                        width={32}
                        height={32}
                        alt="yah"
                      />
                      <Image
                        src="/menu-bookmark.svg"
                        width={32}
                        height={32}
                        alt="yah"
                      />
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

  );
}
