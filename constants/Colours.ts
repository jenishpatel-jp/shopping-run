/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { TextInput } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const zincColors = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
};

export const Colors = {
  light: {
    text: "#5200A3",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#5200A3",
    borderColor: "black",
    placeHolderTextColor: "#687076",
    textInputBackgroundColor: "#40146B",
    textInputColor: "black",
  },
  dark: {
    text: "white",
    background: "black",
    tint: tintColorDark,
    icon: "#40146B",
    tabIconDefault: "#40146B",
    tabIconSelected: tintColorDark,
    border: "#F5A418",
    borderColor: "white",
    placeHolderTextColor: "#F5A418",
    textInputBackgroundColor: "white",
    textInputColor: "black",

  },
};
