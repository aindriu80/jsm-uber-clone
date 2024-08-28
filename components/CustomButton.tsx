import { ButtonProps } from "@/types/type";
import React from "react";

const getTextVariantStyle= (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    default:
      return "bg-[#028ff]";
  }
};

import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286FF]";
  }
};

interface CustomButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title?: string;
  bgVariant?: "primary" | "secondary" | "danger"; // You can expand this with more variants
  textVariant?: "default" | "bold" | "italic"; // You can expand this with more variants
  IconLeft?: React.ComponentType;
  IconRight?: React.ComponentType;
  className?: string; // Assuming you're using something like Tailwind or other utility classes
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    {...props}
    className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
  >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
