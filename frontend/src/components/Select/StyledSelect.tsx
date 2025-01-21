"use client";

import React, { useState } from "react";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import { motion } from "motion/react";
import { Label } from "@radix-ui/react-label";

export interface SelectProps {
  options: { [key: string]: string };
  placeholder: string;
  size: "regular" | "large";
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SIZES = {
  regular: {
    padding: "px-2 py-1",
    fontSize: "text-base",
    width: "w-[220px]",
    chevronSize: "size-6",
    checkIconSize: "size-5",
    gapBetweenElements: "sm:gap-2",
    viewportPadding: "p-2",
  },
  large: {
    padding: "px-4 py-2",
    fontSize: "text-xl",
    width: "w-[300px]",
    chevronSize: "size-10",
    checkIconSize: "size-6",
    gapBetweenElements: "sm:gap-4",
    viewportPadding: "p-4",
  },
};
function StyledSelect({ options, placeholder, size, label, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = React.useId() + "-select";

  const sizeConfig = SIZES[size];
  return (
    <div
      className={`
        flex flex-col items-baseline sm:flex-row w-fit
        ${sizeConfig.gapBetweenElements} 
        ${sizeConfig.fontSize}
    `}
    >
      <Label className="font-bold" htmlFor={id}>
        {label}
      </Label>
      <Select.Root
        onOpenChange={setIsOpen}
        onValueChange={onChange}
        value={value}
      >
        <Select.Trigger
          id={id}
          className={`
          border-gray-300 border-2
          flex flex-row justify-between items-center
          ${sizeConfig.padding}
          rounded-md
          ${sizeConfig.fontSize}
          ${sizeConfig.width}`}
        >
          <Select.Value placeholder={placeholder} className="" />
          <Select.Icon>
            <motion.div
              animate={{
                rotateZ: isOpen ? -180 : 0,
              }}
            >
              <ChevronDownIcon className={`${sizeConfig.chevronSize}`} />
            </motion.div>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.0 }}
              exit={{ scale: 0 }}
              style={{ transformOrigin: "top left" }}
            >
              <Select.ScrollUpButton>
                <ChevronUpIcon className="size-10" />
              </Select.ScrollUpButton>

              <Select.Viewport
                className={`bg-slate-800 ${sizeConfig.viewportPadding} rounded-md ${sizeConfig.width}`}
              >
                {Object.keys(options).map((optionKey) => (
                  <Select.Item
                    data-key={optionKey}
                    key={optionKey}
                    value={optionKey}
                    className={`
                  flex ${sizeConfig.gapBetweenElements} items-center
                  p-1
                  hover:bg-slate-900 focus:bg-slate-900`}
                  >
                    <Select.ItemText>{options[optionKey]}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon className={`${sizeConfig.checkIconSize}`} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>

              <Select.ScrollDownButton />
              <Select.Arrow />
            </motion.div>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export default StyledSelect;
