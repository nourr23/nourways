import Link from "next/link"
import Image from "next/image"

export const FeturedcategoriesItem = ({ item, bgImage }: any) => {
  return (
    <>
      <Link
        href={`/categories/${item.handle}`}
        className=" flex flex-col gap-y-4 items-center"
      >
        <div className=" h-[190px] w-[190px] gap-y-3 flex-col flex justify-center items-center bg-grey-0 rounded-[95px]">
          {bgImage && (
            <Image
              src={bgImage}
              width={item.metadata.image_width as number}
              height={item.metadata.image_height as number}
              alt={item.metadata.image_name as string}
              objectFit="cover"
            />
          )}
        </div>
        <div className=" font-bold capitalize text-primary-500 text-lg">
          {item.name}
        </div>
      </Link>
    </>
  )
}
