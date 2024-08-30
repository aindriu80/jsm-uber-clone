import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

interface InputFieldProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  icon?: { uri: string } | number;
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  className?: string;
  [key: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}) => (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-2 w-full">
        <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
          {label}
        </Text>
        <View
          className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
        >
          {icon && (
            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
          )}
          <TextInput
            className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
export default InputField;
