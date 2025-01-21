import * as Select from "@radix-ui/react-select";
import { CheckIcon } from "@heroicons/react/16/solid";

interface Props {
  options: { [key: string]: string };
}

function SelectOptions({ options }: Props) {
  return Object.keys(options).map((optionKey) => (
    <Select.Item
      key={optionKey}
      value={optionKey}
      className={`
          flex  items-center
          p-1
          hover:bg-slate-900 focus:bg-slate-900`}
    >
      <Select.ItemText>{options[optionKey]}</Select.ItemText>
      <Select.ItemIndicator>
        <CheckIcon className={`${options.checkIconSize}`} />
      </Select.ItemIndicator>
    </Select.Item>
  ));
}

export default SelectOptions;
