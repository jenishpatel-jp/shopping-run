import { useThemeColor } from "../../hooks/useThemeColour";
import { Pressable, type PressableProps } from "react-native";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedButton = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedButtonProps) => {

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor }, 
    "borderColor" 
  );

  return <Pressable style={[{ backgroundColor, borderColor }]} {...otherProps} ></Pressable>

};
