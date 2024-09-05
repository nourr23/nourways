"use client"
import { manageWishlist } from "@modules/account/actions"
import { Region } from "@medusajs/medusa"
import { CiHeart } from "react-icons/ci"
import { IoIosHeart } from "react-icons/io"
import { useState } from "react"

export const WishListButton = ({
  product_id,
  wishlist,
  product_details,
}: {
  product_id: string
  wishlist?: Array<string>
  product_details?: boolean
}) => {
  const [openToast, setOpenToast] = useState(false)
  //   console.log("wishlist", wishlist, product_id)
  const addToWishList = async () => {
    if (wishlist) {
      const payload = [...wishlist, product_id]

      await manageWishlist(payload)
    }
  }
  const removeFromwishList = async () => {
    if (wishlist) {
      const index = wishlist.indexOf(product_id)
      wishlist.splice(index, 1)

      await manageWishlist(wishlist)
    }
  }
  const toggleToast = () => {
    // Toast.("info", { title: "test", description: "tes test" })
    setOpenToast(true)
    setTimeout(() => {
      setOpenToast(false)
    }, 3000)
  }
  const Toast = () => {
    return (
      <div className=" fixed bottom-3 xsmall:right-4 right-[5%] xsmall:w-auto w-[90%] mx-auto xsmall:mx-0 rounded-lg bg-white shadow shadow-black/40 px-3 py-4 text-secondary-500 text-base">
        You need to connect so you can add products to wishlist
      </div>
    )
  }
  return (
    <>
      {openToast && <Toast />}
      <button
        //   disabled={!wishlist}
        onClick={
          !wishlist
            ? () => toggleToast()
            : wishlist && wishlist.indexOf(product_id) > -1
            ? () => removeFromwishList()
            : () => addToWishList()
        }
        className={`${
          product_details
            ? " rounded-full border border-neutral-200 h-[40px] w-[40px] "
            : "border-none h-[34px] w-[34px]"
        } outline-none  flex justify-center items-center bg-white rounded-[19px]`}
      >
        {wishlist && wishlist.indexOf(product_id) > -1 ? (
          <IoIosHeart color="#ff5959" size={24} />
        ) : (
          <CiHeart
            className={`${
              product_details ? "text-neutral-500" : " text-red-500"
            }`}
            size={30}
          />
        )}
      </button>
    </>
  )
}
