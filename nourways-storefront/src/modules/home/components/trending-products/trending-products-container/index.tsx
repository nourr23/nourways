"use client"
import { Region } from "@medusajs/medusa"
import TrendingProductsItem from "@modules/products/components/trending-product"

import { cache, useState } from "react"
export const TrendingProductsContainer = ({
  trendingCategories,
  region,
  countryCode,
}: {
  trendingCategories: any
  region: Region
  countryCode: string
}) => {
  const [activeSubCategory, setActiveSubCategory] = useState(0)
  return (
    <div className=" w-full">
      <div className="my-4 flex gap-x-4 pb-3 md:pb-0 pr-3 md:pr-0 x-global-bg overflow-x-scroll md:overflow-x-auto w-full md:w-auto md:gap-x-5">
        {trendingCategories?.map((item: any, index: number) => (
          <button
            disabled={item.products.length === 0}
            key={item.id}
            className=" bg-transparent border-none outline-none"
            onClick={() => setActiveSubCategory(index)}
          >
            <div
              className={` ${
                item.products.length === 0
                  ? " text-neutral-300 hover:cursor-not-allowed"
                  : item.id === trendingCategories[activeSubCategory].id
                  ? "font-bold text-primary-500 underline"
                  : "text-neutral-700"
              } md:text-lg text-sm whitespace-nowrap capitalize`}
            >
              {item.name}
            </div>
          </button>
        ))}
      </div>
      <div className=" x-global-bg pb-4 lg:pb-0 flex w-full justify-between  overflow-x-scroll lg:overflow-x-hidden gap-x-2">
        {trendingCategories[activeSubCategory].products
          .slice(0, 3)
          .map((item: any) => (
            <TrendingProductsItem key={item.id} item={item} region={region} />
          ))}
      </div>

      {trendingCategories[activeSubCategory].products.length > 3 && (
        <div className=" x-global-bg pb-4 lg:pb-0 w-full justify-between  overflow-x-scroll lg:overflow-x-hidden flex gap-x-2 my-4">
          {trendingCategories[activeSubCategory].products
            .slice(3, 6)
            .map((item: any) => (
              <TrendingProductsItem key={item.id} item={item} region={region} />
            ))}
        </div>
      )}
    </div>
  )
}
