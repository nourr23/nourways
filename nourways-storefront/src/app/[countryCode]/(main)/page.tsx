import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getProductsList, getRegion, getCategoryByHandle } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCategoryWithChildren } from "types/global"
import { cache } from "react"
import BannerSlider from "@modules/home/components/banner-slider"
import { SECTION_TYPES } from "@lib/constants"
import NewCollections from "@modules/home/components/new-collections"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const getCategoriesWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCategoryWithChildren[] | null> => {
    const { product_categories } = await getCategoryByHandle(["home"])

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

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const categories = await getCategoriesWithProducts(countryCode)
  // console.log("product_categories", categories && categories[1])
  const region = await getRegion(countryCode)

  if (!categories || !region) {
    return null
  }

  const HomeSectionRenderer = ({ payload, countryCode }: any) => {
    switch (payload.name) {
      case SECTION_TYPES.BANNER_SLIDER:
        return <BannerSlider region={region} categories={payload} />
      case SECTION_TYPES.NEW_COLLECTIONS:
        return (
          <NewCollections
            countryCode={countryCode}
            handle={payload.handle}
            categories={payload}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className="">
        <ul className="flex flex-col gap-x-6 ">
          {/* <FeaturedProducts collections={collections} region={region} /> */}
          {categories.map((section: any) => (
            <HomeSectionRenderer
              key={section.id}
              payload={section}
              countryCode={countryCode}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
