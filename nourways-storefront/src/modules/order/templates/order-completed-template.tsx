import { Order } from "@medusajs/medusa"
import { Heading } from "@medusajs/ui"
import { cookies } from "next/headers"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import { Header } from "@modules/common/components/header"
import order_complete from "../../../../public/order-complete.png"
import Image from "next/image"
import { OrderCompleteSummary } from "./order-complete-summary"

type OrderCompletedTemplateProps = {
  order: Order
}

export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const isOnboarding = cookies().get("_medusa_onboarding")?.value === "true"

  return (
    <div className="flex flex-col px-0 small:items-start ">
      <Header title="Commande complète" />
      <div className=" py-5 xsmall:py-10 px-3 w-full flex flex-col items-center ">
        {/* <div className=" w-full max-w-[1160px]">
        </div> */}
        <div className=" xsmall:w-[386px] xsmall:h-[193px] w-[340px] h-[170px]">
          <Image
            src={order_complete}
            width={386}
            height={193}
            alt={"order complete"}
            objectFit="cover"
          />
        </div>

        <Heading
          level="h1"
          className="flex flex-col gap-y-3 text-ui-fg-base text-3xl my-4"
        >
          <span>Merci pour votre achat!</span>
        </Heading>
        <div className=" text-neutral-600 text-base font-semibold">
          Votre commande a été traitée avec succès !
        </div>
        <div className=" text-neutral-600 text-base font-semibold">
          Voici les détails
        </div>
        <div className=" max-w-[500px] w-full">
          <OrderCompleteSummary order={order} />
          <div className="xsmall:mt-10 mt-6">
            <div className=" font-bold text-xl text-neutral-900">
              Statut de la commande
            </div>
            <div className=" text-neutral-500 mt-2 text-sm font-semibold w-full">
              {order.fulfillment_status === "shipped"
                ? "Votre commande a été livrée avec succès"
                : order.fulfillment_status === "not_fulfilled"
                ? "Votre commande est maintenant terminée et sera expédiée. Vous recevrez un e-mail de confirmation ou un appel téléphonique contenant des informations de suivi une fois vos articles expédiés."
                : order.fulfillment_status === "canceled"
                ? "Votre commande a été annulée"
                : ""}
            </div>
            <div className=" text-neutral-500 mt-2 text-sm font-semibold w-full">
              Merci d'avoir effectué vos achats chez nous ! Si vous avez des
              questions ou des préoccupations, n'hésitez pas à contacter notre
              équipe de support client à email : email@email.com
              {/* to change  */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
      </div> */}
    </div>
  )
}
