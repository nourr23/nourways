import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"
import { ChangeEvent } from "react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col items-start gap-y-3">
      <Text className="text-neutral-700 capitalize text-2xl">{title}</Text>
      <RadioGroup data-testid={dataTestId}>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx(
              "rounded-3xl cursor-pointer border items-center border-neutral-200 capitaliz flex gap-x-2 py-2 px-6",
              {
                "bg-neutral-100": i.value === value,
              }
            )}
          >
            {/* {i.value === value && <EllipseMiniSolid />} */}
            <RadioGroup.Item
              checked={i.value === value}
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLButtonElement>,
                  i.value
                )
              }
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <div
              className={` ${
                i.value === value ? " border" : " "
              } h-[14px] w-[14px] flex rounded-[7px] border-secondary-500 justify-center items-center`}
            >
              <div
                className={` ${
                  i.value === value ? " bg-secondary-500" : ""
                } h-[12px] w-[12px] rounded-[6px] border border-neutral-200`}
              ></div>
            </div>
            <Label
              placeholder={i.label}
              htmlFor={i.value}
              // className={clx(
              //   "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
              //   {
              //     "text-ui-fg-base": i.value === value,
              //   }
              // )}
              className="cursor-pointer text-lg text-neutral-900"
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
