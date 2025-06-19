import { useThemeColor } from "../hooks/useThemeColour";
import { Button, type ButtonProps } from "react-native";

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
};

const ThemedButton = ( { lightColor, darkColor, ...otherProps } : ThemedButtonProps ) => {

}