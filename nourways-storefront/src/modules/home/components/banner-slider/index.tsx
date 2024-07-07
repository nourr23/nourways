import { Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren } from "types/global"
import SliderContainer from "./slider-container"

export default async function BannerSlider({
  categories,
  region,
}: {
  categories: ProductCategoryWithChildren
  region: Region
}) {
  return (
    <>
      <div className=" bg-[#2d5356] py-20 px-3 flex items-center justify-center">
        <div className=" gap-y-4 px-8  flex flex-col justify-center items-start w-[45%]">
          <div className=" rounded-xl bg-[rgba(255,255,255,0.1)] px-3 py-1 text-white capitalize">
            website for furniture
          </div>
          <div className=" capitalize text-3xl  text-white leading-9">
            <div>title for the</div>
            <div>futiture website</div>
          </div>
          <div className=" text-neutral-300 text-xs">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
            necessitatibus quia impedit repellendus, eaque placeat ducimus dicta
            corporis ea optio sapiente dolor suscipit corrupti aut, quidem
            asperiores? Numquam, optio assumenda?
          </div>

          <div className=" flex gap-x-3">
            <button className=" border-none bg-[#d09423] px-6 rounded-3xl text-white py-3">
              Shop now
            </button>
            <button className=" border-none underline  text-white py-3">
              Visit instagram
            </button>
          </div>
        </div>
        <div className=" flex-1">
          <SliderContainer region={region} categories={categories} />
        </div>
      </div>
    </>
  )
}
