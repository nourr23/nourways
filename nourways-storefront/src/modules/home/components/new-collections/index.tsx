import { Product, Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren } from "types/global"
import { FirstCollection } from "./first-collection"
import { SecondCollection } from "./second-collection"
import { ThirdCollection } from "./third-collection"
import { cache } from "react"
import { getProductsList, getCategoryByHandle } from "@lib/data"

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

export default async function NewCollections({
  categories,
  handle,
  countryCode,
}: {
  categories: ProductCategoryWithChildren
  handle: string
  countryCode: string
}) {
  const collections = await getCategoriesWithProducts(countryCode, handle)
  return (
    <div className=" w-full flex justify-center py-6 px-3">
      <div className=" w-full max-w-[1300px]">
        <div className=" sm:w-full md:w-auto lg:w-full flex gap-4 flex-col lg:flex-row ">
          <div className=" flex flex-col gap-y-4 w-full lg:w-[55%]">
            {collections && (
              <>
                <FirstCollection categories={collections[0]} />
                <SecondCollection categories={collections[1]} />
              </>
            )}
          </div>
          {collections && <ThirdCollection categories={collections[2]} />}
        </div>
      </div>
    </div>
  )
}
