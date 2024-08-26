import logo from "../../../../../../public/logo.png"
import Image from "next/image"
export const LogoFooter = () => {
  return (
    <div className=" w-full flex py-6 justify-center border-t border-b border-neutral-200">
      <Image
        src={logo.src}
        width={320}
        height={68}
        alt={"logo"}
        //   objectFit="cover"
      />
    </div>
  )
}
