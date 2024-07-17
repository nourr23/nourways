"use client"

import { useState } from "react"

export const TrendingSubCategories = ({ trendingCategories }: any) => {
  const [activeItem, setActiveItem] = useState(0)
  return (
    <>
      <div className="my-4 flex gap-x-4 pb-3 md:pb-0 pr-3 md:pr-0 overflow-x-scroll md:overflow-x-auto w-full md:w-auto md:gap-x-5">
        {trendingCategories?.map((item: any, index: number) => (
          <button
            className=" bg-transparent border-none outline-none"
            onClick={() => setActiveItem(index)}
          >
            <div
              className={` ${
                item.id === trendingCategories[activeItem].id
                  ? "font-bold text-primary-500 underline"
                  : "text-neutral-700"
              } md:text-lg text-sm whitespace-nowrap capitalize`}
            >
              {item.name}
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
