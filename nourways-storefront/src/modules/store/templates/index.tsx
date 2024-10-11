import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { FilterContainer } from "@modules/common/components/filter-container"
import { Header } from "@modules/common/components/header"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div
      className="flex flex-col px-0 small:items-start py-6 "
      data-testid="category-container"
    >
      <Header title="Produits" />

      <div className="py-10 px-3 w-full flex justify-center ">
        <div className=" w-full max-w-[1160px]">
          <div className="flex w-full gap-x-6">
            <div className=" hidden md:block">
              <div className=" text-neutral-900 capitalize text-2xl">
                option de filtre
              </div>
              <div className="mt-5">
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

export default StoreTemplate
