import { useState } from "react";
import { useColorScheme } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet } from "react-native";

// This component is used to select a store from a dropdown list
// Doc on the SelectList: https://www.npmjs.com/package/react-native-dropdown-select-list

type StoreSlectListProp = {
    data: {
        key: string;
        value: string;
    }[],
    setSelectedStore: (value: string) => void; // Optional prop to set selected store
};

const StoreSelectList  = ( { data, setSelectedStore } : StoreSlectListProp ) => {

  const colorScheme = useColorScheme();

  const themeBackground = colorScheme === "dark" ? styles.darkBackgroundColor : styles.lightBackgroundcolour;
  const themeBorder = colorScheme === "dark" ? styles.darkBorderColour : styles.lightBorderColour;
  const themeText = colorScheme === "dark" ? styles.darkColour : styles.lightColour;
  const themePlaceholder = colorScheme === "dark" ? "#FFE4A1" : "#0A1931";

  return (
    <SelectList 
        setSelected={setSelectedStore}
        save="key"
        data={data}
        boxStyles={{...styles.boxStyles, ...themeBorder,}}
        inputStyles={{
          ...styles.inputStyles,
          ...themeText,
        }}
        dropdownStyles={{
          ...themeBackground,
          ...themeBorder,
          borderWidth: 2,
        }}
        dropdownTextStyles={{
          ...themeText,
          fontSize: 24,
        }}
      />
  )
}

export default StoreSelectList;

const styles = StyleSheet.create({

  lightBackgroundcolour: {
    backgroundColor: "#FFE4A1",
    },
  darkBackgroundColor: {
    backgroundColor: "#0A1931",
    }, 
  lightColour: {
    color: "#0A1931",
    },
  darkColour: {
    color: "#FFE4A1",
    },
  lightBorderColour: {
    borderColor: '#0A1931',
  },
  darkBorderColour: {
    borderColor: '#FFE4A1',
  },
  boxStyles: {
    borderWidth: 2,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  inputStyles: {
    fontSize: 24,
    textAlign: 'center',
  },
  dropDownStyles: {
    borderWidth: 2,
  },
})