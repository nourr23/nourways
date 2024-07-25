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
        <div className=" text-white font-bold text-3xl">Catégories</div>
        <div className="absolute h-full w-full slider-bg opacity-[0.03] "></div>
      </div>

      <div className="py-10 px-3 w-full flex justify-center ">
        <div className=" w-full max-w-[1300px]">
          <button className=" md:hidden block mb-4">
            <CiFilter className=" text-secondary-500" size={30} />
          </button>
          <div className="flex w-full gap-x-8">
            <div className=" hidden md:block">
              <div className=" text-neutral-900 capitalize text-3xl">
                option de filtre
              </div>
              <div className="mt-5">
                <FilterContainer>
                  <div className=" text-neutral-700 capitalize text-2xl">
                    Sous catégories
                  </div>
                  <div className=" mt-3 flex flex-col gap-y-3 items-start">
                    {category.category_children.length > 0 ? (
                      <>
                        <Link href={`/categories/${categories[0].handle}`}>
                          <div
                            className={` bg-neutral-100 rounded-3xl border items-center border-neutral-200 capitalize text-lg text-neutral-900 flex gap-x-2 py-2 px-6`}
                          >
                            <div className=" h-[14px] w-[14px] rounded-[7px] border border-secondary-500 flex justify-center items-center">
                              <div
                                className={` h-[12px] w-[12px] rounded-[6px] border bg-secondary-500`}
                              ></div>
                            </div>
                            All
                          </div>
                        </Link>
                        {category.category_children?.map((c) => (
                          <div key={c.id}>
                            <CategoriesLink item={c} />
                          </div>
                        ))}
                      </>
                    ) : (
                      parent_category && (
                        <>
                          <Link
                            href={`/categories/${parent_category[0].handle}`}
                          >
                            <div className=" rounded-3xl border items-center border-neutral-200 capitalize text-lg text-neutral-900 flex gap-x-2 py-2 px-6">
                              <div
                                className={` h-[12px] w-[12px] rounded-[6px] border border-neutral-200`}
                              ></div>
                              All
                            </div>
                          </Link>
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

                <FilterContainer>
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
