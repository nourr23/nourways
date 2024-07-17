"use client"

import Link from "next/link"
import { useState } from "react"
import { PiArrowRightDuotone } from "react-icons/pi"
import { ProductCategoryWithChildren } from "types/global"
import Image from "next/image"

export const ThirdCollection = ({
  categories,
}: {
  categories: ProductCategoryWithChildren
}) => {
  const [activeProduct, setActiveProduct] = useState(categories.products[0])
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className=" bg-grey-0 flex flex-col items-start p-3  md:p-6 rounded-3xl flex-1">
      <div className=" mx-auto md:mx-0 mb-4 uppercase text-primary-500 px-8 py-2 rounded-3xl bg-white border border-neutral-200">
        Nouvel collection
      </div>
      <div className=" gap-y-2 md:gap-y-0 flex justify-between flex-1 flex-col-reverse md:flex-col w-full ">
        <div className=" z-20  relative flex items-start flex-col gap-y-2 justify-center">
          <div className=" flex gap-y-1 w-full items-start flex-col">
            {categories.products.map((product: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setActiveProduct(product)
                  setActiveIndex(index)
                }}
                className={` ${
                  product.id === activeProduct.id ? "font-bold" : ""
                } bg-transparent text-neutral-500 capitalize`}
              >
                {product.title}
              </button>
            ))}
          </div>

          <Link
            href={`/categories/${categories.handle}`}
            className="  mx-auto md:mx-0 flex items-end gap-x-1 mt-2 bg-transparent "
          >
            <div className=" text-lg text-primary-500 capitalize underline ">
              Voir tout
            </div>
            <PiArrowRightDuotone
              className="group-hover:rotate-45 ease-in-out duration-150 text-primary-500 "
              size={22}
            />
          </Link>
        </div>
        <div className=" z-10 flex justify-end flex-1 relative min-h-[300px] lg:min-h-auto ">
          <Link
            href={`products/${activeProduct.handle}`}
            className=" h-auto relative md:absolute bottom-auto md:bottom-0"
          >
            <Image
              src={`${categories && activeProduct.thumbnail}`}
              width={370}
              height={492}
              objectFit="center"
              alt={activeProduct.title}
              className={`${
                activeIndex % 2 == 0
                  ? "animate-fade-in-right"
                  : "animate-fade-in"
              } w-[300px] md:w-[370px] `}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
