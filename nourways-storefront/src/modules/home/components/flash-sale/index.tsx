import { Product, Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren } from "types/global"
import { FirstFlash } from "./first-flash"
import { SecondFlash } from "./second-flash"
import { cache } from "react"
import { getCategoryByHandle } from "@lib/data"
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

export default async function FlashSale({
  categories,
  countryCode,
  region,
  handle,
}: {
  categories: ProductCategoryWithChildren
  countryCode: string
  region: Region
  handle: string
}) {
  const flashSale = await getCategoriesWithProducts(countryCode, handle)
  return (
    <>
      {flashSale ? (
        <div className="py-6 px-3 w-full flex justify-center ">
          <div className=" w-full max-w-[1160px]">
            <div className="flex gap-4 lg:flex-row flex-col">
              {/* first section */}
              {flashSale[0].products[2] && (
                <FirstFlash
                  region={region}
                  product={flashSale[0].products[2]}
                  name={categories.name}
                />
              )}
              {/* second section  */}
              <div className="flex flex-col sm:flex-row lg:flex-col flex-auto lg:flex-1 gap-4">
                <SecondFlash product={flashSale[0].products[1]} />
                <SecondFlash product={flashSale[0].products[0]} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
