import React from 'react'
import { StyleSheet, TextInput, type TextInputProps } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColour';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

const ThemedTextInput = ( { style, lightColor, darkColor, ...otherProps } : ThemedTextInputProps ) => {
  
    const placeHolderTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return <TextInput  style={[  {}, style ]}{...otherProps} />
}

export default ThemedTextInput;

const styles = StyleSheet.create({
    container: {
        borderRadius: 1,
        borderWidth: 3,
        width: '80%',
        borderColor: '#F5A418',
    }

})