"use client"
import { manageWishlist } from "@modules/account/actions"
import { Region } from "@medusajs/medusa"
import { CiHeart } from "react-icons/ci"
import { IoIosHeart } from "react-icons/io"
import { Toast, Toaster } from "@medusajs/ui"
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
  const [opseToast, setOpenToast] = useState(true)
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
  return (
    <>
      {opseToast && <Toaster />}
      <button
        //   disabled={!wishlist}
        onClick={
          wishlist && wishlist.indexOf(product_id) > -1
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
