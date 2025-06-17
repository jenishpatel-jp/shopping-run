/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '../constants/Colours';
import { useColorScheme } from '../hooks/useColourScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colourFromProps = props[theme];

  if (colourFromProps) {
    return colourFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
