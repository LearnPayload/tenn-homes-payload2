import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckedState } from "@radix-ui/react-checkbox"

export const FilterGroupItem = ({
  id,
  value,
  checked,
  children,
  onChange,
}: {
  id: string
  value: string
  checked: CheckedState
  children: React.ReactNode
  onChange: (value: string, checked: CheckedState) => void
}) => {
  return (
    <Label
      htmlFor={id}
      className="has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:text-primary ring ring-input has-data-[state=checked]:ring-primary flex items-center justify-center gap-1 border rounded-md p-4 w-full hover:bg-gray-100 cursor-pointer"
    >
      <Checkbox
        value={value}
        id={id}
        className="sr-only hidden"
        checked={checked}
        onCheckedChange={(checked) => {
          onChange(value, checked)
        }}
      />
      <div>{children}</div>
    </Label>
  )
}
