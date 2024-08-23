import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import { CartWithCheckoutStep } from "types/global"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { Customer, EmptyQueryParams } from "@medusajs/medusa"
import { Header } from "@modules/common/components/header"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: CartWithCheckoutStep | null
  customer: Omit<Customer, "password_hash"> | null
}) => {
  return (
    <>
      <div
        className="flex flex-col px-0 small:items-start "
        data-testid="product-container"
      >
        <Header title="Panier" />

        <div className="py-10 px-3 w-full flex justify-center ">
          <div className=" w-full max-w-[1160px]">
            {cart?.items.length ? (
              <div className="flex w-full md:items-start items-center justify-center  gap-x-10 mt-4 gap-y-4 flex-col md:flex-wrap md:flex-row">
                <ItemsTemplate region={cart?.region} items={cart?.items} />
                {cart && cart.region && (
                  <>
                    <Summary cart={cart} />
                  </>
                )}
              </div>
            ) : (
              <EmptyCartMessage />
            )}
          </div>
        </div>
      </div>

      {/* <div className="py-12">
        <div className="content-container" data-testid="cart-container">
          {cart?.items.length ? (
            <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
              <div className="flex flex-col bg-white py-6 gap-y-6">
                {!customer && (
                  <>
                    <SignInPrompt />
                    <Divider />
                  </>
                )}
                <ItemsTemplate region={cart?.region} items={cart?.items} />
              </div>
              <div className="relative">
                <div className="flex flex-col gap-y-8 sticky top-12">
                  {cart && cart.region && (
                    <>
                      <div className="bg-white py-6">
                        <Summary cart={cart} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <EmptyCartMessage />
            </div>
          )}
        </div>
      </div> */}
    </>
  )
}

export default CartTemplate
