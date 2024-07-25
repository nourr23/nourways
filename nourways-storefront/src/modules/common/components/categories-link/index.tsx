import { ProductCategory } from "@medusajs/medusa"
import Link from "next/link"
export const CategoriesLink = ({
  item,
  categoryHandle,
}: {
  item: ProductCategory
  categoryHandle?: string | null
}) => {
  return (
    <Link href={`/categories/${item.handle}`}>
      <div
        className={` ${
          item.handle === categoryHandle ? " bg-neutral-100" : " "
        } rounded-3xl border items-center border-neutral-200 capitalize text-lg text-neutral-900 flex gap-x-2 py-2 px-6`}
      >
        <div
          className={` ${
            item.handle === categoryHandle ? " border" : " "
          } h-[14px] w-[14px] flex rounded-[7px] border-secondary-500 justify-center items-center`}
        >
          <div
            className={` ${
              item.handle === categoryHandle ? " bg-secondary-500" : ""
            } h-[12px] w-[12px] rounded-[6px] border border-neutral-200`}
          ></div>
        </div>
        {item.name}
      </div>
    </Link>
  )
}
