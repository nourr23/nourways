import LineItemOptions from "@modules/common/components/line-item-options"
import Thumbnail from "@modules/products/components/thumbnail"
import Link from "next/link"

export const SearchResultCard = ({ product }: any) => {
  return (
    <Link
      href={`/products/${product.handle}`}
      className=" border border-neutral-200 rounded-lg p-2 md:p-3 flex items-center gap-x-1"
    >
      <div className="w-[66px] h-[66px]">
        <Thumbnail thumbnail={product.thumbnail} size="extra-small" />
      </div>
      <div>
        <div className=" text-primary-500 text-sm whitespace-nowrap text-ellipsis overflow-hidden w-[98px] md:w-[116px] ">
          {product.title}
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden w-[98px] md:w-[116px]">
          <LineItemOptions
            variant={product.variants[0]}
            data-testid="product-variant"
          />
        </div>
      </div>
    </Link>
  )
}
