import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list"

const [selected, setSelected] = useState("");

type StoreSlectListProp = {
    data: {
        key: string;
        value: string;
    }[];
};

const StoreSelectList  = ( { data } : StoreSlectListProp ) => {

  return (
    <SelectList 
        setSelected={(val:string) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={{
          borderColor: 'white',
          borderWidth: 2,
          padding: 10,
          width: '80%',
          marginBottom: 10,
        }}
        inputStyles={{
          color: 'white',
          fontSize: 24,
          textAlign: 'center',
        }}
        dropdownStyles={{
          backgroundColor: 'black',
          borderColor: 'white',
          borderWidth: 2,
        }}
        dropdownTextStyles={{
          color: 'white',
          fontSize: 24,
        }}
      />
  )
}

export default StoreSelectList