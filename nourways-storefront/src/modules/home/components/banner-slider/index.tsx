import { Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren } from "types/global"
import SliderContainer from "./slider-container"
import Image from "next/image"
import image from "../../../../../public/home/Untitled.png"

export default async function BannerSlider({
  categories,
  region,
}: {
  categories: ProductCategoryWithChildren
  region: Region
}) {
  return (
    <>
      <div className=" relative bg-[#2d5356] md:flex-row flex-col bg-office py-6 gap-y-4 md:gap-y-0 md:py-20 px-3 flex items-center min-h-[100vh] justify-center">
        {/* <Image src="/public/home/homebg.jpg" alt={"alt hh"} width="64" height="64" /> */}
        <Image
          src={image}
          alt={"alt hhh"}
          width="1100"
          objectFit="contain"
          height="490"
          className=" opacity-[0.02] absolute top-0 left-0"
        />
        <div className=" relative gap-y-4 md:gap-y-8 px-0 md:px-8 flex flex-col justify-center items-start w-full md:w-[45%]">
          <div className=" rounded-xl bg-[rgba(255,255,255,0.1)] px-3 py-1 text-white capitalize">
            website for furniture
          </div>
          <div className=" capitalize text-3xl font-bold  text-white leading-9">
            <div>title for the</div>
            <div>futiture website</div>
          </div>
          <div className=" text-neutral-300 ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
            necessitatibus quia impedit repellendus, eaque placeat ducimus dicta
            corporis ea optio sapiente dolor suscipit corrupti aut, quidem
            asperiores? Numquam, optio assumenda?
          </div>

          <div className=" flex w-full md:w-auto items-center justify-center md:justify-start gap-x-4 mt-2">
            <button className=" border-none bg-[#d09423] px-6 md:px-8 rounded-3xl text-base md:text-lg text-white py-1 md:py-3">
              Shop now
            </button>
            <button className=" border-none underline  text-white py-3 text-base md:text-lg">
              Visit instagram
            </button>
          </div>
        </div>
        <div className=" relative flex-1">
          <SliderContainer region={region} categories={categories} />
        </div>
      </div>
    </>
  )
}
