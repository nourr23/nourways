"use client"
import { Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren, ProductPreviewType } from "types/global"
import Image from "next/image"
import { useState } from "react"
import { ArrowRightMini, ArrowLeftMini, ArrrowRight } from "@medusajs/icons"
import { BsArrowRight } from "react-icons/bs"
import { PiArrowRightDuotone, PiArrowLeftDuotone } from "react-icons/pi"

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
      <div className="relative rounded-xl overflow-hidden w-[124px]">
        <div className=" h-[495px] w-[389px] bg-white relative">
          <Image
            src={`${item.thumbnail}`}
            width={389}
            height={495}
            objectFit="cover"
            alt={item.title}
          />
          <div className=" absolute h-full w-full bg-[rgba(0,0,0,0.3)] left-0 top-0"></div>
          <span className=" whitespace-nowrap w-[140px] text-white absolute bottom-20 font-bold text-lg left-[-24px] capitalize -rotate-90">
            {item.title}
          </span>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="  gap-x-4 flex items-center justify-end  ">
        <div>
          <div className="flex gap-x-4">
            <div
              className={` ${
                mainSlider % 2 == 0
                  ? "animate-fade-in-right"
                  : "animate-fade-in"
              } h-[413px] sm:h-[495px] w-[319px] sm:w-[389px] rounded-xl overflow-hidden relative pb-10 `}
            >
              <Image
                src={`${categories && sliders[0].thumbnail}`}
                width={389}
                height={495}
                objectFit="cover"
                alt="Picture of the author"
                className=" w-[319px] sm:w-[389px]"
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
            <div className=" md:flex hidden gap-x-4">
              {categories &&
                sliders
                  .slice(1, 3)
                  .map((product: any) => (
                    <SideSlider key={product.id} item={product} />
                  ))}
            </div>
          </div>
          <div className=" flex gap-x-3 items-center justify-center md:justify-start mt-8">
            <button
              onClick={() => {
                mainSlider > 0 && setMainSlider((prev) => prev - 1)
                popSliders(sliders[sliders.length - 1])
              }}
              className={`${
                mainSlider > 0 ? "bg-[#d09423]" : " bg-[rgba(255,255,255,0.1)]"
              } rounded-3xl md:py-2 md:px-6 py-1 px-3 `}
            >
              <PiArrowLeftDuotone
                className="group-hover:rotate-45 ease-in-out duration-150"
                color="white"
                size={28}
              />
            </button>
            <button
              onClick={() => {
                mainSlider < sliders.length - 1 &&
                  setMainSlider((prev) => prev + 1)
                pushSliders(sliders[0])
              }}
              className={`${
                mainSlider < sliders.length - 1
                  ? "bg-[#d09423]"
                  : " bg-[rgba(255,255,255,0.1)]"
              } rounded-3xl md:py-2 md:px-6 py-1 px-3 `}
            >
              <PiArrowRightDuotone
                className="group-hover:rotate-45 ease-in-out duration-150 "
                color="white"
                size={28}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
