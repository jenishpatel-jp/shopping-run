import { ThemedView } from "../../components/themedComponents/ThemedView"
import { ThemedText } from "../../components/themedComponents/ThemedText"
import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native"
import StoreSelectList from "../../components/shoppingListComponents/StoreSelectList";
import { state$ } from "../../lib/state";
import { useMemo, useState } from "react";
import { useItemDatabase } from "../../lib/items";
import { useSQLiteContext } from "expo-sqlite";
import { use$ } from "@legendapp/state/react";
import { router, Stack } from "expo-router";


// Format the data for the StoreSelectList component

export default function  addItem() {

  const stores = use$(state$.stores);
  const data = useMemo(() => {
    return stores.map((store) => ({
      key: store.storeId.toString(),
      value: store.storeName,
    }));
  }, [stores]);



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

  const colorScheme = useColorScheme();
  const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
  const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
  const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;

  return (
    <ThemedView style={[styles.container, themeBackgroundColour]}>

      <Stack.Screen 
        options={{
          headerTitle: 'Add Item',
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          headerLargeTitle: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: [styles.headerTitleIcons, themeColour ] ,
          headerStyle: { backgroundColor: colorScheme === 'dark' ? '#0A1931' : '#FFE4A1'},
          headerLeft: () => 
            <Pressable onPressIn={() => router.back()} style={[styles.headerPressable]} >
              <Text style={[styles.headerText, themeColour]} >Cancel</Text>
            </Pressable>,
          headerRight: () => 
            <Pressable onPressIn={handleAddItem} style={[styles.headerPressable]} >
              <Text style={[styles.headerText, themeColour]} >Save</Text>
            </Pressable>
        }}
      />

      <View style={[styles.inputContainer, themeBackgroundColour]}> 

        <Text style={[styles.inputHeaderText, themeBackgroundColour, themeColour]}>Name</Text>

        <TextInput 
          style={[styles.textInput, themeBackgroundColour, themeColour, themeBorderColour]}
          placeholder="Enter item name"
          placeholderTextColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
          selectionColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
          textAlign="center"
          autoFocus={false}
          returnKeyType="done"
          value={itemName}
          onChangeText={setItemName}
        />
      </View>

      <View style={[styles.inputContainer, themeBackgroundColour]}> 
        <Text style={[styles.inputHeaderText, themeBackgroundColour, themeColour]}>Quantity</Text>
        <TextInput 
          style={[styles.textInput, themeBackgroundColour, themeColour, themeBorderColour]}
          value={itemQuantity}
          onChangeText={setItemQuantity}
          placeholder="Enter item quantity"
          placeholderTextColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
          selectionColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
          textAlign="center"
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>

      <View style={[styles.inputContainer, themeBackgroundColour]}> 
        <Text style={[styles.inputHeaderText, themeBackgroundColour, themeColour]}>Store</Text>
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
  }, 
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

   inputHeaderText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    paddingTop: 30,
  },

  textInput: {
    borderWidth: 2,
    width: '80%',
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 8,
    padding: 10,
  },
  headerText: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    },
  lightBackgroundColour: {
    backgroundColor: "#FFE4A1",
  },
  darkBackgroundColour: {
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
  headerTitleIcons: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  headerPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
 

})