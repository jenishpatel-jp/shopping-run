import { StyleSheet, TextInput, type TextInputProps } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColour';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

const ThemedTextInput = ( { style, lightColor, darkColor, ...otherProps } : ThemedTextInputProps ) => {

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const placeHolderTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <TextInput  
            style={[ { backgroundColor, padding: 12, borderRadius: 8 }, style ]}
            placeholderTextColor={placeHolderTextColor}
            {...otherProps} 
        />
    );   
};

export default ThemedTextInput;