import { LuClock12 } from "react-icons/lu"
import Image from "next/image"
import Link from "next/link"
import { Region } from "@medusajs/medusa"
import { getProductPrice } from "@lib/util/get-product-price"
import TrendingPrice from "@modules/products/components/trending-product/price"

export const FirstFlash = ({
  product,
  name,
  region,
}: {
  product: any
  name: string
  region: Region
}) => {
  const { cheapestPrice } = getProductPrice({
    product: product,
    region,
  })
  return (
    <div className="bg-grey-0 p-3 md:p-10 rounded-3xl flex min-w-[320px] flex-col w-full lg:w-[65%]">
      <div className="flex w-full justify-between">
        <div>
          <div className=" text-xl sm:text-3xl capitalize font-bold text-neutral-700">
            {name}
          </div>
          <div className="text-neutral-500 text-sm sm:text-lg pr-4 mt-3">
            Act fast to grab incredible deals on select furniture pieces in our
            limited-time flash sale
          </div>
        </div>

        <div>
          <div className=" w-full flex items-center justify-center gap-x-1">
            <LuClock12 color="#2d5356" size={30} />
            <div className=" text-primary-500 text-sm sm:text-lg">End time</div>
          </div>
          <div className=" flex gap-x-1 mt-2">
            <div className="bg-white text-neutral-600 sm:text-base text-xs whitespace-nowrap px-2 py-1">
              12 H
            </div>
            <div className="bg-white text-neutral-600 sm:text-base text-xs whitespace-nowrap px-2 py-1">
              36 M
            </div>
            <div className="bg-white text-neutral-600 sm:text-base text-xs whitespace-nowrap px-2 py-1">
              57 S
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-8 sm:flex-row flex-col sm:items-start items-center">
        <div className="flex flex-col w-full sm:w-[50%]">
          <div className="w-full flex justify-center">
            <div className="">
              <Image
                src={`${product && product.thumbnail}`}
                width={240}
                height={166}
                objectFit="cover"
                alt={product.title}
                //   className={`w-[200px] md:w-[200px] `}
              />
            </div>
          </div>
          <div className=" flex justify-start pl-3 sm:pl-0 sm:justify-center gap-5 items-center mt-4">
            {cheapestPrice && (
              <TrendingPrice
                style={"text-neutral-700 font-bold text-base sm:text-lg"}
                price={cheapestPrice}
              />
            )}
            <div className=" text-neutral-500 line-through text-sm sm:text-base">
              799,000 TND
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-[50%] px-3 items-start">
          <div className="font-bold text-lg capitalize text-primary-500">
            {product.title}
          </div>
          <div className="text-neutral-500 text-sm sm:text-lg mt-4">
            Bring a touch of retro charm to your home with this vintage leather
            armchair. Sturdy construction ensures durability
          </div>
          <Link
            href={product.handle ? product.handle : ""}
            className=" bg-secondary-500 rounded-3xl px-6 sm:px-8 py-2 mt-5"
          >
            <div className=" text-white text-sm sm:text-lg">Shop Now</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
