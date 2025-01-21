"use client";

import React, { JSX, useState } from "react";

import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { motion } from "motion/react";

export interface SelectProps {
  options: JSX.Element;
  placeholder: string;
  size: "regular" | "large";
  id: string;
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
function StyledSelect({
  options,
  placeholder,
  size,
  id,
  value,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeConfig = SIZES[size];

  return (
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
              {options}
            </Select.Viewport>
            <Select.ScrollDownButton />
            <Select.Arrow />
          </motion.div>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default StyledSelect;
