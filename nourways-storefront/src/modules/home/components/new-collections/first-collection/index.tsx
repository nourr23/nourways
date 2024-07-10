"use client"
import { ProductCategoryWithChildren } from "types/global"
import Image from "next/image"
import Link from "next/link"
import { PiArrowRightDuotone, PiArrowLeftDuotone } from "react-icons/pi"
import { useState } from "react"

export const FirstCollection = ({
  categories,
}: {
  categories: ProductCategoryWithChildren
}) => {
  const [activeProduct, setActiveProduct] = useState(categories.products[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const products = categories.products
  console.log("product_categories", products && products)
  return (
    <div className=" bg-grey-0 flex flex-col items-start p-3  md:p-6 rounded-3xl min-w-[320px]">
      <div className=" mx-auto md:mx-0 mb-4 uppercase text-primary-500 px-8 py-2 rounded-3xl bg-white border border-neutral-200">
        Nouvel collection
      </div>
      <div className="  gap-y-2 md:gap-y-0 md:flex-row flex-col-reverse flex justify-between w-full ">
        <div className=" flex items-start flex-col gap-y-2 justify-center">
          <div className=" flex gap-y-2 items-center w-full md:items-start flex-col">
            {products.map((product: any, index: number) => (
              <button
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
            className="  mx-auto md:mx-0 flex items-end gap-x-1 mt-4 bg-transparent "
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

        <Link
          href={`products/${activeProduct.handle}`}
          className=" h-[252px] overflow-hidden"
        >
          <Image
            src={`${categories && activeProduct.thumbnail}`}
            width={350}
            height={252}
            objectFit="center"
            alt={activeProduct.title}
            className={`${
              activeIndex % 2 == 0 ? "animate-fade-in-right" : "animate-fade-in"
            }`}
          />
        </Link>
      </div>
    </div>
  )
}
