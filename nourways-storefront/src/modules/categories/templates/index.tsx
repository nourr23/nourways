import { notFound } from "next/navigation"
import { Suspense, cache } from "react"

import { ProductCategoryWithChildren } from "types/global"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CategoriesLink } from "@modules/common/components/categories-link"
import Link from "next/link"
import { getCategoryByHandle } from "@lib/data"
import { FilterContainer } from "@modules/common/components/filter-container"
import { CiFilter } from "react-icons/ci"

const getCategoriesParent = cache(
  async (handle: any): Promise<ProductCategoryWithChildren[] | null> => {
    const { product_categories } = await getCategoryByHandle([handle])
    if (!product_categories) {
      return null
    }

    return product_categories as unknown as ProductCategoryWithChildren[]
  }
)

export default async function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: ProductCategoryWithChildren[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  const categoriesChildrenIds: string[] | null =
    category.category_children.length > 0
      ? category.category_children.map((c) => c.id)
      : null

  if (!category || !countryCode) notFound()

  let parent_category =
    categories[0].category_children.length === 0 &&
    categories[0].parent_category &&
    (await getCategoriesParent(categories[0].parent_category.handle as string))

  return (
    <div
      className="flex flex-col px-0 small:items-start py-6 "
      data-testid="category-container"
    >
      <div className="w-full bg-primary-500 relative h-[300px] flex justify-center items-center overflow-hidden">
        <div className=" text-white font-bold text-3xl capitalize">
          {category.name}
        </div>
        <div className="absolute h-full w-full slider-bg opacity-[0.03] "></div>
      </div>

      <div className="py-10 px-3 w-full flex justify-center ">
        <div className=" w-full max-w-[1300px]">
          <div className="my-4 flex gap-x-4 pb-2  pr-3 x-global-bg overflow-x-scroll w-full md:hidden">
            {category.category_children.length > 0 ? (
              <>
                <CategoriesLink
                  categoryHandle={category.handle}
                  item={categories[0]}
                />
                {category.category_children?.map((item: any, index: number) => (
                  <CategoriesLink item={item} />
                ))}
              </>
            ) : (
              <>
                {parent_category && (
                  <>
                    <CategoriesLink item={parent_category[0]} />
                    {parent_category[0].category_children.map((item) => (
                      <div key={item.id}>
                        <CategoriesLink
                          categoryHandle={category.handle}
                          item={item}
                        />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>

          <div className="flex w-full gap-x-6">
            <div className=" hidden md:block">
              <div className=" text-neutral-900 capitalize text-3xl">
                option de filtre
              </div>
              <div className="mt-5">
                <FilterContainer title="Sous catégories">
                  <div className=" mt-3 flex flex-col gap-y-3 items-start">
                    {category.category_children.length > 0 ? (
                      <>
                        <CategoriesLink
                          categoryHandle={category.handle}
                          item={categories[0]}
                        />
                        {category.category_children?.map((c) => (
                          <div key={c.id}>
                            <CategoriesLink item={c} />
                          </div>
                        ))}
                      </>
                    ) : (
                      parent_category && (
                        <>
                          <CategoriesLink item={parent_category[0]} />
                          {parent_category[0].category_children.map((c) => (
                            <div key={c.id}>
                              <CategoriesLink
                                item={c}
                                categoryHandle={category.handle}
                              />
                            </div>
                          ))}
                        </>
                      )
                    )}
                  </div>
                </FilterContainer>

                <FilterContainer title={"Trier Par"}>
                  <RefinementList
                    sortBy={sortBy || "created_at"}
                    data-testid="sort-by-container"
                  />
                </FilterContainer>
              </div>
            </div>

            <div className=" flex-1">
              <Suspense fallback={<SkeletonProductGrid />}>
                <PaginatedProducts
                  sortBy={sortBy || "created_at"}
                  page={pageNumber}
                  categoryId={
                    categoriesChildrenIds
                      ? [...categoriesChildrenIds]
                      : [category.id]
                  }
                  countryCode={countryCode}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
