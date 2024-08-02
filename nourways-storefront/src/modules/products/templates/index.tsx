import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import Link from "next/link"
import { PiArrowLeftDuotone } from "react-icons/pi"
import { getProductPrice } from "@lib/util/get-product-price"
import TrendingPrice from "../components/trending-product/price"
import { FaStar } from "react-icons/fa6"
import repeat from "@lib/util/repeat"
import { MdCheck } from "react-icons/md"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const { cheapestPrice } = getProductPrice({
    product: product,
    region,
  })

  return (
    <>
      <div
        // className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        className="flex flex-col px-0 small:items-start py-6 "
        data-testid="product-container"
      >
        <div className="w-full bg-primary-500 relative h-[200px] md:h-[300px] flex justify-center items-center overflow-hidden">
          <div className=" text-white font-bold text-xl md:text-3xl capitalize">
            Products/{product.title}
          </div>
          <div className="absolute h-full w-full slider-bg opacity-[0.03] "></div>
        </div>

        <div className="py-10 px-3 w-full flex justify-center ">
          <div className=" w-full max-w-[1160px]">
            <div className=" w-full">
              <Link href={"/store"} className=" flex gap-x-2 items-center">
                <PiArrowLeftDuotone
                  className="group-hover:rotate-45 ease-in-out duration-150 text-secondary-500"
                  size={24}
                />
                <div className=" text-secondary-500 text-base">
                  Retour aux produits
                </div>
              </Link>
            </div>

            <div className="flex w-full md:items-start items-center justify-between gap-x-4 mt-4 gap-y-4 flex-col md:flex-row">
              <div className="w-[450px] max-w-full ">
                <div className="block w-full relative ">
                  <ImageGallery images={product?.images || []} />
                </div>
              </div>

              <div className="flex-1 w-[450px] md:w-auto max-w-full">
                <div className="w-full py-3 bg-grey-0 font-bold text-lg px-4 rounded-2xl text-neutral-600">
                  Information du produit
                </div>
                <div className="mt-6 text-neutral-400 font-semibold">
                  {product.title}
                </div>
                <div className="mt-4 text-neutral-500 text-lg max-w-[440px]">
                  {product.description}
                </div>
                <div className="mt-8 flex gap-x-3">
                  {cheapestPrice && (
                    <TrendingPrice
                      style={
                        "text-neutral-700 font-bold text-base sm:text-base"
                      }
                      price={cheapestPrice}
                    />
                  )}
                </div>

                <div className=" flex gap-x-6 mt-4 items-center">
                  <div className="flex items-center gap-x-1">
                    {repeat(5).map((index) => (
                      <FaStar color="#ffba35" size={16} />
                    ))}
                    <div className=" text-neutral-700 font-semibold ml-1">
                      4.9
                    </div>
                  </div>

                  <div className=" flex gap-x-2 items-center">
                    <div className="rounded-base border border-primary-500 h-[14px] w-[14px] flex justify-center items-center">
                      <MdCheck size={10} className=" text-primary-500" />
                    </div>
                    <div className=" text-primary-500  font-semibold">En stock</div>
                    {/* <div className="mx-1 h-3 w-[1px] bg-neutral-500"></div>
                    <div></div> */}
                  </div>
                </div>

                <div className="mt-6">
                  <Suspense
                    fallback={
                      <ProductActions
                        buttonType="normal"
                        disabled={true}
                        product={product}
                        region={region}
                      />
                    }
                  >
                    <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
                </div>
              </div>
            </div>

            <div
              className="content-container my-10 small:my-20"
              data-testid="related-products-container"
            >
              <Suspense fallback={<SkeletonRelatedProducts />}>
                <RelatedProducts product={product} countryCode={countryCode} />
              </Suspense>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div> */}

        {/* <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
        </div> */}
      </div>
    </>
  )
}

export default ProductTemplate
