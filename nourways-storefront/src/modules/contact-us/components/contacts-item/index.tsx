"use client"

export const ContactsItem = ({ item, children }: any) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={` w-12 aspect-square rounded-md flex items-center justify-center `}
        style={{ backgroundColor: item.bg }}
      >
        {children}
      </div>
      <div className=" flex flex-col">
        <div className=" text-neutral-500 text-sm capitalize">{item.title}</div>
        <div className=" text-neutral-900 text-sm">{item.value}</div>
      </div>
    </div>
  )
}
