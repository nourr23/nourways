"use client"

import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PiArrowLeftDuotone, PiArrowRightDuotone } from "react-icons/pi"

export function Pagination({
  page,
  totalPages,
  "data-testid": dataTestid,
}: {
  page: number
  totalPages: number
  "data-testid"?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx("txt-xlarge-plus text-ui-fg-muted", {
        "text-ui-fg-base hover:text-ui-fg-subtle": isCurrent,
      })}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  )

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="txt-xlarge-plus text-ui-fg-muted items-center cursor-default"
    >
      ...
    </span>
  )

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  // Render the component
  return (
    <div className="flex justify-between md:justify-center w-full gap-x-6 mt-12">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page == 1}
        className={`${
          page == 1
            ? "border-neutral-100 text-neutral-600"
            : " text-secondary-500 border-secondary-500 bg-secondary-200 "
        } rounded-3xl  border text-sm md:text-base  px-4 flex items-center gap-2 py-1`}
      >
        <PiArrowLeftDuotone
          className="group-hover:rotate-45 ease-in-out duration-150"
          color={`${page == 1 ? "#525252 " : "#d09423"}`}
          size={20}
        />
        Previews
      </button>
      <div className="flex gap-3 items-end" data-testid={dataTestid}>
        {renderPageButtons()}
      </div>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page == totalPages}
        className={`${
          page == totalPages
            ? "border-neutral-100 text-neutral-600"
            : " text-secondary-500 border-secondary-500 bg-secondary-200 "
        } rounded-3xl  border text-sm md:text-base  px-4 flex items-center gap-2 py-1`}
      >
        Next
        <PiArrowRightDuotone
          className="group-hover:rotate-45 ease-in-out duration-150"
          color={`${page == totalPages ? "#525252 " : "#d09423"}`}
          size={20}
        />
      </button>
    </div>
  )
}
