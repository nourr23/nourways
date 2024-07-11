"use client"
import side_table from "../../../../../../public/home/side_table.png"
import arm_chair from "../../../../../../public/home/arm-chair.png"
import dinner_table from "../../../../../../public/home/dinner-table.png"
import pillow from "../../../../../../public/home/pillow.png"
import wall_clock from "../../../../../../public/home/wall_clock.png"
import { FeturedcategoriesItem } from "../featured-categories-item"
import { useState } from "react"
import { PiArrowLeftDuotone, PiArrowRightDuotone } from "react-icons/pi"

export const FeaturedCategoriesSlider = ({ featuredCategories, name }: any) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const images = [
    {
      name: "side_table",
      value: side_table,
    },
    {
      name: "arm_chair",
      value: arm_chair,
    },
    {
      name: "dinner_table",
      value: dinner_table,
    },
    {
      name: "pillow",
      value: pillow,
    },
    {
      name: "wall_clock",
      value: wall_clock,
    },
  ]
  const [left, setLeft] = useState(0)
  const [elemntToShow, setElemntToShow] = useState(5)
  const [counter, setCounter] = useState(0)

  //for mobile version
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const onTouchStart = (e: any) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe && counter < featuredCategories.length - elemntToShow) {
        SlideForward()
      } else if (isRightSwipe && left < 0) {
        SlideBack()
      }
    }
  }
  // mobile done

  const minSwipeDistance = 50
  const getImage = (image_name: string) => {
    let returnedImage = null
    images.map((image: any) => {
      if (image.name == image_name) {
        returnedImage = image.value
      }
    })
    return returnedImage
  }

  const SlideForward = () => {
    let maxWidth = 1300
    if (windowDimensions.width < maxWidth) {
      maxWidth = windowDimensions.width
    }
    setElemntToShow(Math.trunc(maxWidth / 250))
    setLeft((prev) => prev - 250)
    setCounter((prev) => prev + 1)
  }
  const SlideBack = () => {
    setLeft((prev) => prev + 250)
    setCounter((prev) => prev - 1)
  }
  return (
    <>
      <div className="flex w-full justify-between mb-10 items-center">
        <div className=" text-xl sm:text-3xl text-neutral-700 font-bold capitalize">
          {name}
        </div>
        <div className=" flex gap-x-2">
          <button
            disabled={left >= 0}
            onClick={() => {
              SlideBack()
            }}
            className={`${
              left < 0 ? "bg-secondary-500" : " border border-neutral-200"
            } rounded-3xl md:py-2 md:px-5 py-1 px-3 `}
          >
            <PiArrowLeftDuotone
              className="group-hover:rotate-45 ease-in-out duration-150"
              color={`${left < 0 ? "white" : "#d09423"}`}
              size={20}
            />
          </button>
          <button
            disabled={counter >= featuredCategories.length - elemntToShow}
            onClick={() => SlideForward()}
            className={`${
              // mainSlider < sliders.length - 1
              counter < featuredCategories.length - elemntToShow
                ? "bg-secondary-500"
                : " border border-neutral-200"
            } rounded-3xl md:py-2 md:px-5 py-1 px-3 `}
          >
            <PiArrowRightDuotone
              className="group-hover:rotate-45 ease-in-out duration-150 "
              color={`${
                counter < featuredCategories.length - elemntToShow
                  ? "white"
                  : "#d09423"
              }`}
              size={20}
            />
          </button>
        </div>
      </div>
      <div className="flex w-full items-center py-3 overflow-hidden relative min-h-[250px]">
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={`absolute flex w-full gap-x-[60px] ease-in-out `}
          style={{ left: left + "px", transition: "left 0.3s linear" }}
        >
          {featuredCategories &&
            featuredCategories.map((category: any, index: number) => {
              let bgImage = getImage(category.metadata.image_name)
              return (
                <FeturedcategoriesItem
                  key={category.id}
                  item={category}
                  bgImage={bgImage}
                />
              )
            })}
        </div>
      </div>
    </>
  )
}
