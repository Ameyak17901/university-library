"use client";

import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        #<HexColorInput color={value} onChange={onPickerChange} />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
