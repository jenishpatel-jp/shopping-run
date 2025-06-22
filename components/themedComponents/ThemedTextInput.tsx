import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColour";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedTextInput = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextInputProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textInputBackgroundColor"
  );
  const placeHolderTextColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <TextInput
      style={[{ backgroundColor, padding: 12, fontSize: 16, width: '100%'}, style]}
      placeholderTextColor={placeHolderTextColor}
      {...otherProps}
    />
  );
};

