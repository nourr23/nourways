"use client"

import Link from "next/link"
import { useState } from "react"
import { PiArrowRightDuotone } from "react-icons/pi"
import { ProductCategoryWithChildren } from "types/global"
import Image from "next/image"
import imagebg from "../../../../../../public/home/new_collection_bg.png"

export const SecondCollection = ({
  categories,
}: {
  categories: ProductCategoryWithChildren
}) => {
  const [activeProduct, setActiveProduct] = useState(categories.products[0])
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className=" flex flex-col md:flex-row gap-4">
      <div className="bg-grey-0 flex flex-col items-start p-3 flex-1  md:p-8 rounded-3xl">
        <div className=" mx-auto md:mx-0 mb-2 uppercase text-sm text-primary-500 px-4 py-1 rounded-3xl bg-white border border-neutral-200">
          Nouvel collection
        </div>

        <div className=" gap-y-2 md:gap-y-0 flex justify-between w-full ">
          <div className=" flex items-start flex-col gap-y-2 justify-center">
            <div className=" flex gap-y-1 w-full items-start flex-col">
              {categories.products.map((product: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveProduct(product)
                    setActiveIndex(index)
                  }}
                  className={` ${
                    product.id === activeProduct.id ? "font-bold text-base" : ""
                  } bg-transparent text-sm text-neutral-500 capitalize`}
                >
                  {product.title}
                </button>
              ))}
            </div>

            <Link
              href={`/categories/${categories.handle}`}
              className="  mx-auto md:mx-0 flex items-end gap-x-1 mt-2 bg-transparent "
            >
              <div className=" text-base text-primary-500 capitalize underline ">
                Voir tout
              </div>
              <PiArrowRightDuotone
                className="group-hover:rotate-45 ease-in-out duration-150 text-primary-500 "
                size={22}
              />
            </Link>
          </div>
          <Link
            href={`products/${activeProduct.handle}`}
            className=" h-[180px] overflow-hidden"
          >
            <Image
              src={`${categories && activeProduct.thumbnail}`}
              width={100}
              height={202}
              objectFit="center"
              alt={activeProduct.title}
              className={`${
                activeIndex % 2 == 0
                  ? "animate-fade-in-right"
                  : "animate-fade-in"
              }`}
            />
          </Link>
        </div>
      </div>
      <div className=" flex-col flex items-center justify-center gap-y-1 bg-primary-500 p-3 overflow-hidden h-[270px] md:h-auto flex-auto md:flex-1 md:p-8 rounded-3xl relative">
        <Image
          src={imagebg}
          alt={"image bg"}
          width="350"
          objectFit="contain"
          height="270"
          className=" opacity-[0.06] absolute top-0 left-0"
        />
        <div className="relative uppercase border border-white text-white bg-secondary-500 rounded-3xl py-2 px-5">
          get discount
        </div>
        <div className=" text-white uppercase text-3xl">20% Offer</div>
      </div>
    </div>
  )
}
