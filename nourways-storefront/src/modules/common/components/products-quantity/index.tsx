import { FiMinus, FiPlus } from "react-icons/fi"

export const ProductQuantity = ({
  counter,
  setCounter,
  maxQuantity,
}: {
  counter: number
  setCounter: any
  maxQuantity: number
}) => {
  return (
    <>
      <div className=" bg-grey-0 rounded-3xl p-1 flex justify-between gap-x-4 items-center">
        <button
          disabled={counter == 1}
          onClick={() => setCounter(counter - 1)}
          className={` ${
            counter == 1 ? " cursor-not-allowed" : ""
          } bg-white h-[24px] w-[24px] rounded-[13px] flex items-center justify-center border-none outline-none `}
        >
          <FiMinus size={16} className=" text-neutral-500" />
        </button>
        <div className=" text-neutral-700 font-semibold text-base">
          {counter}
        </div>
        <button
          onClick={() => setCounter(counter + 1)}
          disabled={counter == maxQuantity}
          className={` ${
            counter == maxQuantity ? " cursor-not-allowed" : ""
          } bg-white h-[24px] w-[24px] rounded-[13px] flex items-center justify-center border-none outline-none `}
        >
          <FiPlus size={16} className=" text-neutral-500" />
        </button>
      </div>
    </>
  )
}
