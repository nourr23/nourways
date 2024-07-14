import { Product, Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren } from "types/global"
import { FirstFlash } from "./first-flash"
import { SecondFlash } from "./second-flash"

export default async function FlashSale({
  categories,
  countryCode,
  region,
}: {
  categories: ProductCategoryWithChildren
  countryCode: string
  region: Region
}) {
  console.log("flashSale", categories && categories.products)
  return (
    <div className="py-6 px-3 w-full flex justify-center ">
      <div className=" w-full max-w-[1300px]">
        <div className="flex gap-4 lg:flex-row flex-col">
          {/* first section */}
          <FirstFlash product={categories.products[1]} name={categories.name} />
          {/* second section  */}
          <div className="flex flex-col sm:flex-row lg:flex-col flex-auto lg:flex-1 gap-4">
            <SecondFlash product={categories.products[0]} />
            <SecondFlash product={categories.products[0]} />
          </div>
        </div>
      </div>
    </div>
  )
}
