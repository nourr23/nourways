import { notFound } from "next/navigation"
import { Suspense } from "react"

import { ProductCategoryWithChildren } from "types/global"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Link from "next/link"

export default function CategoryTemplate({
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
  console.log("categories", categories)

  if (!category || !countryCode) notFound()

  return (
    <div
      className="flex flex-col px-0 small:items-start py-6 "
      data-testid="category-container"
    >
      <div className="w-full bg-primary-500 relative h-[300px] flex justify-center items-center overflow-hidden">
        <div className=" text-white font-bold text-3xl">Catégories</div>
        <div className="absolute h-full w-full slider-bg opacity-[0.03] "></div>
      </div>

      {/* <RefinementList
        sortBy={sortBy || "created_at"}
        data-testid="sort-by-container"
      /> */}
      <div className="py-10 px-3 w-full flex justify-center ">
        <div className=" w-full max-w-[1300px]">
          <div className="flex w-full">
            <div>
              <div className=" text-neutral-900 capitalize text-3xl">
                Filter Option
              </div>
              <div className="mt-5">
                <div className="rounded-3xl border border-neutral-200 p-5 min-w-[280px]">
                  <div className=" text-neutral-700 capitalize text-2xl">
                    Sous catégories
                  </div>
                  <div className=" mt-3 flex flex-col gap-y-3 items-start">
                    {category.category_children &&
                      category.category_children?.map((c) => (
                        <div key={c.id}>
                          <Link
                            href={`/categories/${c.handle}`}
                            // href={`/categories/${categories[0].handle}/subcategory/${c.handle}`}
                          >
                            <div className=" rounded-3xl border items-center border-neutral-200 capitalize text-lg text-neutral-900 flex gap-x-2 py-2 px-6">
                              <div
                                className={` h-[12px] w-[12px] rounded-[6px] border border-neutral-200`}
                              ></div>
                              {c.name}
                            </div>
                          </Link>
                        </div>
                      ))}

                    {/* {parents &&
                      parents.map((parent) => (
                        <span key={parent.id} className="text-ui-fg-subtle">
                          <LocalizedClientLink
                            className="mr-4 hover:text-black"
                            href={`/categories/${parent.handle}`}
                            data-testid="sort-by-link"
                          >
                            {parent.name}
                          </LocalizedClientLink>
                          /
                        </span>
                      ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sortBy || "created_at"}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
      {/* <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div> */}
    </div>
  )
}
