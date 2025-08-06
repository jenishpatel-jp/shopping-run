import { ThemedView } from "../../components/themedComponents/ThemedView"
import { ThemedText } from "../../components/themedComponents/ThemedText"
import { Pressable, StyleSheet, Text, TextInput } from "react-native"
import StoreSelectList from "../../components/shoppingListComponents/StoreSelectList";
import { state$ } from "../../lib/state";
import { useMemo, useState } from "react";
import { useItemDatabase } from "../../lib/items";
import { useSQLiteContext } from "expo-sqlite";
import { use$ } from "@legendapp/state/react";
import { Stack } from "expo-router";


// Format the data for the StoreSelectList component


export default function  addItem() {

  const formattedStores = () => {
    const stores = use$(state$.stores);
    const formattedData = stores.map((store) => ({
      key: store.storeId.toString(),
      value: store.storeName
    }));
    return formattedData;
  };

  const data = formattedStores();


//   const formattedData = stores.map((store) => ({
//   key: store.storeId.toString(),
//   value: store.storeName,
// }));

  const db = useSQLiteContext();

  const [selectedStore, setSelectedStore] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const { fetchAllItems, addItem } = useItemDatabase(db);

  const handleAddItem = async () => {
    if (itemName.trim() === "" || itemQuantity.trim() === "") {
      console.warn("Item name and quantity cannot be empty");
      return;
    }

    if (!selectedStore) {
      console.warn("Please select a store");
      return;
    }

    // Logic to add item to the shopping list
    // This would typically involve updating the state or database
    console.log(`Item added: ${itemName}, Quantity: ${itemQuantity}, Store: ${selectedStore}`);

    await addItem(parseInt(selectedStore), itemName, parseInt(itemQuantity), 0);
    setItemName("");
    setItemQuantity("");
    const updatedItems = await fetchAllItems();
    state$.items.set(updatedItems); // Update the global state with the new items
    console.log(state$.items.get());
  };

  return (
    <ThemedView style={styles.container}>

      <Stack.Screen 
        options={{
          headerTitle: 'Add Item',
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          headerLargeTitle: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => 
            <Pressable onPressIn={() => console.log("Cancel pressed")} style={{ marginLeft: 10 }}>
              <Text style={styles.text} >Cancel</Text>
            </Pressable>,
          headerRight: () => 
            <Pressable onPressIn={handleAddItem}>
              <Text style={styles.text} >Save</Text>
            </Pressable>
        }}
      
      />


      <TextInput 
        style={styles.textInput}
        placeholder="Enter item name"
        placeholderTextColor="white"
        selectionColor="white"
        textAlign="center"
        autoFocus={false}
        returnKeyType="done"
        value={itemName}
        onChangeText={setItemName}
    
      
      />
      <TextInput 
        style={styles.textInput}
        value={itemQuantity}
        onChangeText={setItemQuantity}
        placeholder="Enter item quantity"
        placeholderTextColor="white"
        selectionColor="white"
        textAlign="center"
        keyboardType="numeric"
        returnKeyType="done"
       
      />
      
      <StoreSelectList data={data} setSelectedStore={setSelectedStore} />
      
      <Pressable 
        style={styles.addButton} 
        onPress={handleAddItem} // Placeholder for item addition logic
        >
        <ThemedText style={styles.addButtonText}>Add Item</ThemedText>
      </Pressable>

    </ThemedView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }, 
  textInput: {
    borderColor: 'white',
    borderWidth: 2,
    width: '80%',
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'black',
    color: 'white',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  }, 
  addButtonText: {
    color: 'white',
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
  },
  text: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    }

})