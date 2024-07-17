import { getCategoryByHandle } from "@lib/data"
import { Region } from "@medusajs/medusa"
import { cache } from "react"
import { ProductCategoryWithChildren } from "types/global"
import { FeaturedCategoriesSlider } from "./featured-categories-slider"

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

    return categories_children as unknown as ProductCategoryWithChildren[]
  }
)

export default async function FeaturedCategories({
  categories,
  handle,
  countryCode,
}: {
  categories: ProductCategoryWithChildren
  handle: string
  countryCode: string
}) {
  const featuredCategories = await getCategoriesWithProducts(
    countryCode,
    handle
  )

  return (
    <div className=" py-6 px-3 w-full flex justify-center ">
      <div className=" w-full max-w-[1300px]">
        <FeaturedCategoriesSlider
          featuredCategories={featuredCategories}
          name={categories.name}
        />
      </div>
    </div>
  )
}
