import shipping from "../../../../../../public/footer/shipping.png"
import easy_to_shop from "../../../../../../public/footer/easy-to-shop.png"
import support from "../../../../../../public/footer/support.png"
import free_returns from "../../../../../../public/footer/free-returns.png"
import Image from "next/image"

export const TopFooter = () => {
  const items = [
    {
      id: 1,
      title: "expédition rapide",
      image: shipping,
    },
    {
      id: 2,
      title: "facile à acheter",
      image: easy_to_shop,
    },
    {
      id: 3,
      title: "24/7 support",
      image: support,
    },
    {
      id: 4,
      title: "retours sans tracas",
      image: free_returns,
    },
  ]
  const TopFooterItem = ({ children, item }: any) => {
    return (
      <div className=" flex justify-center ">
        <div className=" flex flex-col gap-y-3">
          <div className=" ">
            <div className="rounded-full bg-[#e6ebe7] w-12 aspect-square relative">
              <div className="absolute h-full w-full bg-secondary-300 top-0 left-2 flex items-center justify-center rounded-full">
                {children}
              </div>
            </div>
          </div>
          <div className=" max-w-[130px] font-semibold text-2xl text-neutral-900 capitalize">
            {item.title}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className=" w-full flex justify-center md:py-10 py-5 md:px-16">
      <div className=" grid md:grid-cols-4 2xsmall:grid-cols-2 2xsmall:gap-x-20 2xsmall:gap-y-8 gap-y-6 md:w-full ">
        {items.map((item) => (
          <TopFooterItem key={item.id} item={item}>
            {item.image && (
              <Image
                src={item.image.src}
                width={item.image.width as number}
                height={item.image.height as number}
                alt={item.title as string}
                //   objectFit="cover"
              />
            )}
          </TopFooterItem>
        ))}
      </div>
    </div>
  )
}
