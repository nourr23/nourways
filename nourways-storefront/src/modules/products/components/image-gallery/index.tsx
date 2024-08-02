"use client"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"
import { PiArrowLeftDuotone, PiArrowRightDuotone } from "react-icons/pi"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [mainImage, setMainImage] = useState(0)
  return (
    <div>
      <div className="flex bg-grey-0 w-full rounded-3xl py-2 items-start relative justify-center ">
        {images[0] && (
          <div className="relative p-0 shadow-none flex items-center  bg-transparent min-h-[360px] w-[340px] overflow-hidden">
            <Image
              src={images[mainImage].url}
              alt={`Product image `}
              style={{
                objectFit: "cover",
              }}
              width={340}
              height={340}
            />
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute  w-full left-0 px-6 flex justify-between items-center bottom-4">
            <button
              onClick={() => setMainImage((prev) => prev - 1)}
              disabled={mainImage == 0}
              className={`${
                mainImage == 0
                  ? "border-neutral-100 text-neutral-600 bg-white"
                  : " text-secondary-500 border-secondary-500 bg-secondary-500 "
              } rounded-3xl  border text-base md:text-lg  px-5 flex items-center gap-2 py-2`}
            >
              <PiArrowLeftDuotone
                className="group-hover:rotate-45 ease-in-out duration-150"
                color={`${mainImage == 0 ? "#d09423" : "#fff"}`}
                size={20}
              />
            </button>
            <button
              onClick={() => setMainImage((prev) => prev + 1)}
              disabled={mainImage == 2 || mainImage === images.length - 1}
              className={`${
                mainImage == 2 || mainImage === images.length - 1
                  ? "border-neutral-100 text-neutral-600 bg-white"
                  : " text-secondary-500 border-secondary-500 bg-secondary-500 "
              } rounded-3xl  border text-base md:text-lg  px-5 flex items-center gap-2 py-2`}
            >
              <PiArrowRightDuotone
                className="group-hover:rotate-45 ease-in-out duration-150"
                color={`${
                  mainImage == 2 || mainImage === images.length - 1
                    ? "#d09423"
                    : "#fff"
                }`}
                size={20}
              />
            </button>
          </div>
        )}
      </div>

      <div className="flex w-full justify-between mt-4">
        {images.slice(0, 3).map((image, index) => {
          return (
            <button
              onClick={() => setMainImage(index)}
              className={` ${
                index === mainImage
                  ? " border border-secondary-500"
                  : "border-none"
              } outline-none  bg-grey-0 relative aspect-square flex items-center justify-center rounded-xl overflow-hidden p-4 w-[32%] `}
            >
              <Image src={image.url} width={130} height={10} alt={image.id} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
