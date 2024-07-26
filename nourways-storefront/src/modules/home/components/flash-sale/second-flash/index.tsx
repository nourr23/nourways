import { ProductPreviewType } from "types/global"
import Image from "next/image"
import Link from "next/link"
import { PiArrowRightDuotone } from "react-icons/pi"

export const SecondFlash = ({ product }: { product: ProductPreviewType }) => {
  return (
    <div className="flex-1 bg-grey-0 rounded-3xl p-3 md:p-10">
      <div className=" flex w-full justify-center">
        <Image
          src={`${product && product.thumbnail}`}
          width={206}
          height={107}
          objectFit="cover"
          alt={product.title}
          //   className={`w-[200px] md:w-[200px] `}
        />
      </div>
      <div className="flex mt-2 w-full justify-between items-center">
        <div className="font-bold text-lg capitalize text-primary-500">
          {product.title}
        </div>
        <Link
          href={`/products/${product.handle ? product.handle : ""}`}
          className=" flex gap-x-3 items-center bg-secondary-500 px-5 md:px-174 capitalize py-1 md:py-2 rounded-3xl text-base md:text-lg text-white "
        >
          <PiArrowRightDuotone
            className="group-hover:rotate-45 ease-in-out duration-150 "
            color={"white"}
            size={26}
          />
        </Link>
      </div>
    </div>
  )
}
