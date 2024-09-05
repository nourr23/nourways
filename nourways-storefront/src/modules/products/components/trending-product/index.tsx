import { CiHeart } from "react-icons/ci"
import { FaHeart } from "react-icons/fa"
import Image from "next/image"
import { Region } from "@medusajs/medusa"
import { getProductPrice } from "@lib/util/get-product-price"
import TrendingPrice from "./price"
import Link from "next/link"
import ProductActions from "../product-actions"
import { WishListButton } from "../wishlist-button"

export default function TrendingProductsItem({
  item,
  region,
  wishlist,
}: {
  item: any
  region: Region
  wishlist?: Array<string>
}) {
  const { cheapestPrice } = getProductPrice({
    product: item,
    region,
  })

  return (
    <div className=" bg-grey-0 min-w-[300px] max-w-[360px] w-[30%]  flex flex-col justify-between mt-3 rounded-3xl overflow-hidden">
      <div className="p-5 w-full">
        <div className=" w-full flex justify-between items-center">
          <div>
            {cheapestPrice && (
              <div className=" h-[40px] flex justify-center items-center px-3 bg-primary-400 text-white rounded-3xl">
                -{cheapestPrice.percentage_diff}%
              </div>
            )}
          </div>
          {/* <button className=" outline-none border-none h-[45px] w-[45px] flex justify-center items-center bg-white rounded-[23px]">
            <CiHeart color="#2d5356" size={36} />
          </button> */}
          <WishListButton
            product_id={item.id}
            product_details={true}
            wishlist={wishlist}
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link href={`/products/${item.handle}`} className="  w-[170px] my-3 ">
            <Image
              src={`${item && item.thumbnail}`}
              width={170}
              height={170}
              objectFit="cover"
              alt={item.title}
              className={`w-[200px] md:w-[200px] `}
            />
          </Link>
        </div>
      </div>
      <div className="py-5 bg-primary-500 w-full rounded-2xl">
        <div className="flex justify-between px-6 items-center">
          <div className=" text-white text-lg capitalize">
            <div>{item.description}</div>
            <div className=" flex items-center gap-x-3">
              {cheapestPrice && (
                <TrendingPrice hideOldPrice={true} price={cheapestPrice} />
              )}
            </div>
          </div>
          <ProductActions region={region} product={item} buttonType={"icon"} />
        </div>
      </div>
    </div>
  )
}
