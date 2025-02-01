"use client"
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Comment from "@/components/comment";
import { comment } from "postcss";

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
          <div className="relative snap-start flex-shrink-0 w-full h-screen font-grotesk" key={i}>
            {item.postsrc.toLowerCase().endsWith(".mp4") ? (
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                className="object-contain w-full h-full"
                controls
                loop
                playsInline
                autoPlay // Auto play is controlled by IntersectionObserver
                src={item.postsrc}
              />
            ) : (
              <img className="object-contain w-full h-full" src={item.postsrc} alt="Image" />
            )}
            <div className="bg-white hidden flex-col bottom-0 w-full z-50 rounded-t-[24px]">
              <div className="flex flex-col justify-center items-center py-[8px]">
                <div className="w-[35px] p-[1px] bg-[#909090] rounded-full"></div>
                <p>Comments</p>
              </div>
              {/* {item.}
              <Comment
                profile={item.profilesrc}
                username={item.username}
                commenttext={comments}
              /> */}
              <div className="w-full flex gap-[12px] border-t-[1px] border-[#909090] px-[24px] py-[12px]">
                <div className="relative w-[44px] h-[44px] flex-shrink-0 items-center">
                  <Image
                    src={item.profilesrc}
                    fill
                    alt="Profile"
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex items-center px-[16px] py-[12px] text-[#909090] bg-[#E1E1E1] w-full rounded-[16px]">
                  <p>Add a comment...</p>
                </div>
              </div>
            </div>
            {/* <Comment/> */}
            <div className="px-[24px] absolute bottom-0 w-full flex flex-col gap-[8px] items-cente">
              <div className="flex w-full items-center gap-2">
                <div className="relative w-[44px] h-[44px] rounded-full">
                  <Image
                    src={item.profilesrc}
                    fill
                    alt="Profile"
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-white text-[14px] font-semibold">{item.username}</h3>
              </div>
              <div className="flex-col w-full">
                <div>
                  <p className={expandCaption ? "text-white text-[14px]" : "text-[14px] text-white text-ellipsis text-nowrap overflow-hidden"}>
                    {item.caption}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 pb-[4px] pt-[12px] text-[12px] cursor-pointer" onClick={handleClick}>
                    See more
                  </p>
                </div>
              </div>
              <div className="flex text-white justify-around w-3/5 items-center h-20">
                <Image src="/menu-star.svg" width={32} height={32} alt="Star" />
                <Image src="/menu-comment.svg" width={32} height={32} alt="Comment" />
                <Image src="/menu-share.svg" width={32} height={32} alt="Share" />
                <Image src="/menu-bookmark.svg" width={32} height={32} alt="Bookmark" />
              </div>
            </div>
            <div className="absolute top-0 w-full flex justify-between p-[24px] items-center">
              <div className="relative w-[32px] h-[32px] ">
                <Image
                  src="search.svg"
                  fill
                  alt="Profile"
                  className="object-contain rounded-full"
                />
              </div>
              <div className="text-white flex gap-[24px]">
                <div className="flex flex-col gap-1 q">
                  <h1 className="border-b-[1.5px]">Friends</h1>
                </div>
                <div>
                  <h1>World</h1>
                </div>
              </div>
              <div className="relative w-[32px] h-[32px] ">
                <Image
                  src="account.svg"
                  fill
                  alt="Profile"
                  className="object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
