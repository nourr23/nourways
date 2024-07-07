"use client"
import { Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren, ProductPreviewType } from "types/global"
import Image from "next/image"
import { useState } from "react"
import { ArrowRightMini, ArrowLeftMini } from "@medusajs/icons"
// import { BsArrowRight } from "react-icons/bs"

export default function SliderContainer({
  categories,
  region,
}: {
  categories: ProductCategoryWithChildren
  region: Region
}) {
  let sliders = categories.products

  const pushSliders = (item: any) => {
    const itemToAdd = item
    sliders.shift()
    sliders.push(itemToAdd)
  }

  const popSliders = (item: any) => {
    const itemToAdd = item
    sliders.pop()
    sliders.unshift(itemToAdd)
  }
  const [mainSlider, setMainSlider] = useState(0)
  const SideSlider = ({ item }: any) => {
    return (
      <div className="relative rounded-lg overflow-hidden w-[85px]">
        <div className=" h-[353px] w-[320px] bg-white relative">
          <Image
            src={`${item.thumbnail}`}
            width={320}
            height={353}
            objectFit="cover"
            alt={item.title}
          />
          <div className=" absolute h-full w-full bg-[rgba(0,0,0,0.3)] left-0 top-0"></div>
          <span className=" text-white absolute bottom-16 font-bold text-lg left-[-14px] capitalize -rotate-90">
            {item.title}
          </span>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="  gap-x-4 flex items-center  ">
        <div className=" w-[320px] h-[353px] rounded-xl overflow-hidden relative pb-10">
          <Image
            src={`${categories && sliders[0].thumbnail}`}
            width={320}
            height={353}
            objectFit="cover"
            alt="Picture of the author"
          />
          <div className=" absolute h-full w-full bg-[rgba(0,0,0,0.3)] left-0 top-0"></div>
          <div className=" absolute bottom-7 px-4 flex w-full items-center justify-between">
            <span className=" text-white font-bold text-lg capitalize ">
              {sliders[0].title}
            </span>
            <span className=" text-white font-bold text-lg capitalize ">
              + 100 items
            </span>
          </div>
        </div>

        {categories &&
          sliders
            .slice(1, 3)
            .map((product: any) => (
              <SideSlider key={product.key} item={product} />
            ))}
      </div>
      <div className=" flex gap-x-2 items-center">
        <button
          onClick={() => {
            mainSlider > 0 && setMainSlider((prev) => prev - 1)
            popSliders(sliders[sliders.length - 1])
          }}
          className={`${
            mainSlider > 0 ? "bg-[#d09423]" : " bg-[rgba(255,255,255,0.1)]"
          } rounded-2xl py-1 px-3 mt-8`}
        >
          <ArrowLeftMini
            className="group-hover:rotate-45 ease-in-out duration-150"
            color="white"
          />
        </button>
        <button
          onClick={() => {
            mainSlider < sliders.length - 1 && setMainSlider((prev) => prev + 1)
            pushSliders(sliders[0])
          }}
          className={`${
            mainSlider < sliders.length - 1
              ? "bg-[#d09423]"
              : " bg-[rgba(255,255,255,0.1)]"
          } rounded-2xl py-1 px-3 mt-8`}
        >
          <ArrowRightMini
            className="group-hover:rotate-45 ease-in-out duration-150 "
            color="white"
          />
        </button>
      </div>
    </>
  )
}
