import Link from "next/link"
import { AiOutlineInstagram } from "react-icons/ai"
import { FaXTwitter } from "react-icons/fa6"
import { SlSocialFacebook } from "react-icons/sl"
export const BottomFooter = () => {
  return (
    <div className=" flex w-full bg-primary-500 py-5 justify-around items-center">
      <div className=" text-white xsmall:text-base text-sm">
        © {new Date().getFullYear()} FurniTunis. All rights reserved.
      </div>
      <div className=" flex gap-x-1">
        <Link
          href={""}
          className="p-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] "
        >
          <AiOutlineInstagram color="white" size={15} />
        </Link>
        <Link
          href={""}
          className="p-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] "
        >
          <FaXTwitter color="white" size={15} />
        </Link>
        <Link
          href={""}
          className="p-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] "
        >
          <SlSocialFacebook color="white" size={15} />
        </Link>
      </div>
      <div></div>
    </div>
  )
}
