import { ThemedView } from "../../components/themedComponents/ThemedView"
import { ThemedText } from "../../components/themedComponents/ThemedText"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import StoreSelectList from "../../components/shoppingListComponents/StoreSelectList";
import { state$ } from "../../lib/state";
import { useMemo, useState } from "react";
import { useItemDatabase } from "../../lib/items";
import { useSQLiteContext } from "expo-sqlite";
import { use$ } from "@legendapp/state/react";
import { router, Stack } from "expo-router";


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
          headerTitleStyle: { color: '#FFE4A1', fontSize: 20, fontWeight: 'bold' },
          headerStyle: { backgroundColor: '#003B66' },
          headerLeft: () => 
            <Pressable onPressIn={() => router.back()} style={{ marginLeft: 10 }}>
              <Text style={styles.headerText} >Cancel</Text>
            </Pressable>,
          headerRight: () => 
            <Pressable onPressIn={handleAddItem}>
              <Text style={styles.headerText} >Save</Text>
            </Pressable>
        }}
      />

      <View style={styles.inputContainer}> 

        <Text style={styles.inputHeaderText}>Name</Text>

        <TextInput 
          style={styles.textInput}
          placeholder="Enter item name"
          placeholderTextColor="#FFE4A1"
          selectionColor="#FFE4A1"
          textAlign="center"
          autoFocus={false}
          returnKeyType="done"
          value={itemName}
          onChangeText={setItemName}
        />
      </View>

      <View style={styles.inputContainer}> 
        <Text style={styles.inputHeaderText}>Quantity</Text>
        <TextInput 
          style={styles.textInput}
          value={itemQuantity}
          onChangeText={setItemQuantity}
          placeholder="Enter item quantity"
          placeholderTextColor="#FFE4A1"
          selectionColor="#FFE4A1"
          textAlign="center"
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>

      <View style={styles.inputContainer}> 
        <Text style={styles.inputHeaderText}>Store</Text>
        <StoreSelectList data={data} setSelectedStore={setSelectedStore} />
      </View>
      

    </ThemedView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: '#003B66',
  }, 
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#003B66',

  },

   inputHeaderText: {
    color: '#FFE4A1',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    paddingTop: 30,
    backgroundColor: '#003B66',
  },

  textInput: {
    borderColor: '#FFE4A1',
    borderWidth: 2,
    width: '80%',
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    color: '#FFE4A1',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#003B66',
  },
  addButton: {
    backgroundColor: '#003B66',
    color: '#FFE4A1',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFE4A1',
  }, 
  addButtonText: {
    color: '#FFE4A1',
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
  },
  headerText: {
        color: '#FFE4A1',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    },
 

})