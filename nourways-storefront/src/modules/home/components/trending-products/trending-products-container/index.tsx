import { Product, Region } from "@medusajs/medusa"
import TrendingProductsItem from "@modules/products/components/trending-product"
import { ProductPreviewType } from "types/global"

import { cache } from "react"
import { getProductsList } from "@lib/data"

// const getSubCategoriesProducts = cache(
//   async (
//     category_id: string,
//     countryCode: string
//   ): Promise<Product[] | null> => {
//     console.log("test before", countryCode, category_id)
//     await getProductsList({
//       queryParams: { category_id: [category_id] },
//       countryCode,
//     }).then((responses) => console.log("response for test", responses))

//     return null
//   }
// )

export const TrendingProductsContainer = async ({
  trendingCategories,
  region,
}: // countryCode,
{
  trendingCategories: any
  region: Region
  // countryCode: string
}) => {
  // const products = await getSubCategoriesProducts(
  //   trendingCategories[0].id,
  //   countryCode
  // )
  // const getProducts = async (categoryId: string, countryCode: string) => {
  //   return await getSubCategoriesProducts(categoryId, countryCode)
  // }
  // const [activeItem, setActiveItem] = useState(0)
  return (
    <div className=" w-full">
      <div className="my-4 flex gap-x-4 pb-3 md:pb-0 pr-3 md:pr-0 x-global-bg overflow-x-scroll md:overflow-x-auto w-full md:w-auto md:gap-x-5">
        {trendingCategories?.map((item: any, index: number) => (
          <button
            className=" bg-transparent border-none outline-none"
            // onClick={ ()=> getProducts(trendingCategories[index].id, countryCode)}
          >
            <div
              className={` ${
                item.id === trendingCategories[1].id
                  ? "font-bold text-primary-500 underline"
                  : "text-neutral-700"
              } md:text-lg text-sm whitespace-nowrap capitalize`}
            >
              {item.name}
            </div>
          </button>
        ))}
      </div>
      <div className=" x-global-bg pb-4 lg:pb-0 flex w-full justify-between  overflow-x-scroll lg:overflow-x-hidden gap-x-2">
        {trendingCategories[1].products
          .slice(0, 3)
          .map((item: ProductPreviewType) => (
            <TrendingProductsItem item={item} region={region} />
          ))}
      </div>
      <div className=" x-global-bg pb-4 lg:pb-0 w-full justify-between  overflow-x-scroll lg:overflow-x-hidden flex gap-x-2 my-4">
        {trendingCategories[1].products
          .slice(3, 6)
          .map((item: ProductPreviewType) => (
            <TrendingProductsItem item={item} region={region} />
          ))}
      </div>
    </div>
  )
}
