import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"
import Link from "next/link"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { TopFooter } from "./top-footer"
import { LogoFooter } from "./logo-footer"
import { BottomFooter } from "./bottom-footer"

export default async function Footer() {
  // const { collections } = await getCollectionsList(0, 6)
  // const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className=" w-full">
      <div className=" !px-0 flex flex-col w-full">
        <TopFooter />
        <LogoFooter />
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-20">
          <div className=" grid md:grid-cols-3 px-2 xsmall:px-10 2xsmall:grid-cols-2 2xsmall:gap-x-20 2xsmall:gap-y-8 gap-y-6 md:w-full ">
            <div className=" ">
              <div className=" md:text-3xl text-neutral-900 font-semibold mb-5">
                Informations
              </div>
              <div className="flex flex-col gap-y-1">
                <Link
                  href={"/store"}
                  className="text-neutral-600 md:text-lg text-base"
                >
                  Nouveaux produit
                </Link>
                <Link
                  href={"/store"}
                  className="text-neutral-600 md:text-lg text-base"
                >
                  Promotions
                </Link>
                <Link
                  href={"/contact-us"}
                  className="text-neutral-600 md:text-lg text-base"
                >
                  Contactez-nous
                </Link>
                <Link
                  href={""}
                  className="text-neutral-600 md:text-lg text-base"
                >
                  A propos
                </Link>
              </div>
            </div>
            <div>
              <div className=" md:text-3xl text-neutral-900 font-semibold mb-5">
                Mon compte
              </div>
              <div className="flex flex-col gap-y-1">
                <Link
                  href={"/account/orders"}
                  className="text-neutral-600 md:text-lg text-base"
                >
                  Mes commandes
                </Link>
                <Link
                  href={"/account/addresses"}
                  className="text-neutral-600 md:text-lg text-base"
                >
                  Mes adresses
                </Link>
                <Link
                  href={"/account/profile"}
                  className="text-neutral-600 md:text-lg text-base"
                >
                  Mes informations personnelles
                </Link>
              </div>
            </div>
            <div>
              <div className=" md:text-3xl text-neutral-900 font-semibold mb-5">
                Service client
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="text-neutral-600 md:text-lg text-base">
                  <div>Tel</div>
                  <div className=" text-secondary-500">+216 94 077 836</div>
                </div>
                <div className="text-neutral-600 md:text-lg text-base">
                  <div>Email</div>
                  <div className=" text-secondary-500">examlpe@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomFooter />
      </div>
    </footer>
  )
}
