import * as React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";
import * as motion from "motion/react-client";
import { Label } from "@radix-ui/react-label";

interface Props {
  options: {
    [key: string]: string;
  };
  value: string;
  onChange: (value: string) => void;
}

function StyledRadioGroup({ options, value, onChange }: Props) {
  const id = React.useId();
  return (
    <RadioGroup.Root
      className="flex gap-2 sm:gap-4"
      value={value}
      onValueChange={onChange}
    >
      {Object.keys(options).map((optionKey, index) => {
        const itemId = id + index;
        return (
          <div className="flex items-center gap-2" key={optionKey}>
            <RadioGroup.Item
              className="w-[24px] aspect-square rounded-full bg-white"
              value={optionKey}
              id={itemId}
            >
              <RadioGroup.Indicator className="grid place-items-center w-full aspect-square rounded-full ">
                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="w-[50%] aspect-square rounded-full bg-slate-950"
                />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <Label htmlFor={itemId}>{options[optionKey]}</Label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
}

export default StyledRadioGroup;
