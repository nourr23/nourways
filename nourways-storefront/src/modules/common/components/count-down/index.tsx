"use client"
import React, { useState, useEffect, useMemo } from "react"

export const CountDown = ({ targetDate }: any) => {
  const [countDownDate, setCountDownDate] = useState(
    new Date(targetDate).getTime()
  )

  //   const [itemsGap, setitemsGap] = useState("mt-2")

  const remainTime = useMemo(() => {
    const days = Math.floor(countDownDate / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (countDownDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((countDownDate % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countDownDate % (1000 * 60)) / 1000)
    return { days, hours, minutes, seconds }
  }, [countDownDate])

  useEffect(() => {
    // setitemsGap(direction === "flex-col" ? "mt-2" : "ml-3")
    const interval = setInterval(() => {
      setCountDownDate(countDownDate - new Date().getTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {remainTime.days +
        remainTime.hours +
        remainTime.minutes +
        remainTime.seconds >
      0 ? (
        <div className=" flex gap-x-1 mt-2">
          <div className="bg-white text-primary-500 font-bold rounded sm:text-base text-xs whitespace-nowrap w-[44px] text-center  py-1">
            {remainTime.days} J
          </div>
          <div className="bg-white text-primary-500 font-bold rounded sm:text-base text-xs whitespace-nowrap w-[44px] text-center  py-1">
            {remainTime.hours} H
          </div>
          <div className="bg-white text-primary-500 font-bold rounded sm:text-base text-xs whitespace-nowrap w-[44px] text-center  py-1">
            {remainTime.minutes} M
          </div>
          <div className="bg-white text-primary-500 font-bold rounded sm:text-base text-xs whitespace-nowrap w-[44px] text-center  py-1">
            {remainTime.seconds} S
          </div>
        </div>
      ) : null}
      {/* loader */}
    </>
  )
}
