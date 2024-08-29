import { ButtonProps } from "@/types/type";
import React from "react";

import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "bg-red-100";
    case "success":
      return "bg-green-100";
    default:
      return "text-white";
  }
};

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
    className={`w-full rounded-full flex flex-row justify-center p-3 mb-1 items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
