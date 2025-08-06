import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list"

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


  return (
    <SelectList 
        setSelected={setSelectedStore}
        save="key"
        data={data}
        boxStyles={{
          borderColor: '#FFE4A1',
          borderWidth: 2,
          padding: 10,
          width: '80%',
          marginBottom: 10,
        }}
        inputStyles={{
          color: '#FFE4A1',
          fontSize: 24,
          textAlign: 'center',
        }}
        dropdownStyles={{
          backgroundColor: '#003B66',
          borderColor: '#FFE4A1',
          borderWidth: 2,
        }}
        dropdownTextStyles={{
          color: '#FFE4A1',
          fontSize: 24,
        }}
      />
  )
}

export default StoreSelectList