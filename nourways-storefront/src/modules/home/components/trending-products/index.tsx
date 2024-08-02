import { getCategoryByHandle } from "@lib/data"
import { Product, Region } from "@medusajs/medusa"
import { cache } from "react"
import { ProductCategoryWithChildren } from "types/global"
import Link from "next/link"
import { PiArrowRightDuotone } from "react-icons/pi"
import { TrendingProductsContainer } from "./trending-products-container"
import { getProductsList } from "@lib/util/get-category-products"

const getCategoriesWithProducts = cache(
  async (
    countryCode: string,
    handle: string
  ): Promise<ProductCategoryWithChildren[] | null> => {
    const { product_categories } = await getCategoryByHandle([handle])

    if (!product_categories) {
      return null
    }

    const categories_children: ProductCategoryWithChildren[] =
      product_categories[0].category_children

    const collectionIds = categories_children.map((category) => category.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { category_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let category

        if (categories_children) {
          category = categories_children.find(
            (category) => category.id === queryParams?.category_id?.[0]
          )
        }

        if (!category) {
          return
        }

        category.products = response.products as unknown as Product[]
      })
    )

    return categories_children as unknown as ProductCategoryWithChildren[]
  }
)
export default async function TrendingProducts({
  categories,
  handle,
  countryCode,
  region,
}: {
  categories: ProductCategoryWithChildren
  handle: string
  countryCode: string
  region: Region
}) {
  const trendingCategories = await getCategoriesWithProducts(
    countryCode,
    handle
  )

  return (
    <div className="py-6 px-3 w-full flex justify-center ">
      <div className=" w-full max-w-[1160px]">
        <div className="flex w-full justify-between mb-6 items-center">
          <div className=" text-xl sm:text-3xl text-neutral-700 font-bold capitalize">
            <div className=" mb-0 md:mb-3">{categories.name}</div>
            <div>For you!</div>
          </div>

          <Link
            href={categories.handle}
            className=" flex gap-x-3 items-center bg-secondary-500 px-5 md:px-14 capitalize py-1 md:py-2 rounded-3xl text-base md:text-lg text-white "
          >
            Voir tout
            <PiArrowRightDuotone
              className="group-hover:rotate-45 ease-in-out duration-150 "
              color={"white"}
              size={20}
            />
          </Link>
        </div>
        <TrendingProductsContainer
          countryCode={countryCode}
          region={region}
          trendingCategories={trendingCategories}
        />
      </div>
    </div>
  )
}
