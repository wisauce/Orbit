import Image from "next/image"

interface CommentProps {
  profile: string;
  username: string;
  commenttext: string;
}

export default function Comment({profile, username, commenttext}: CommentProps) {
  return (
    <div className="absolute bottom-0 gap-[12px] bg-white flex px-[24px] py-[12px]">
      <div className="h-[44px] w-[44px] flex-shrink-0 relative rounded-full">
        <Image src={profile} fill sizes="" alt="Star" className="rounded-full object-cover"/>
      </div>
      <div className="flex flex-col">
        <div>
          <p className="font-bold text-[14px]">{username}</p>
        </div>
        <div>
          <p className="text-[16px]">{commenttext}</p>
        </div>
      </div>
    </div>
  )
}