import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native"
import StoreSelectList from "../../components/shoppingListComponents/StoreSelectList";
import { state$ } from "../../lib/state";
import { use, useMemo, useState } from "react";
import { useItemDatabase } from "../../lib/items";
import { useSQLiteContext } from "expo-sqlite";
import { use$ } from "@legendapp/state/react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { parse } from "@babel/core";


const EditItem = () => {

    // Format the data for the Store SelectList component
    const stores = use$(state$.stores);

    // data for StoreSelectList
    const data = useMemo(() => {
        return stores.map((store) => ({
        key: store.storeId.toString(),
        value: store.storeName,
        }));
    }, [stores]);

    // Get the item to edit from the global state using the itemId from the URL parameters
    const items = use$(state$.items);
    const { itemId } = useLocalSearchParams<{ itemId: string }>();
    const itemToEdit = items.find(item => item.itemId.toString() === itemId);
    const itemNameToEdit = itemToEdit ? itemToEdit.itemName : "";
    const itemQuantityToEdit = itemToEdit ? itemToEdit.quantity : "";

    const db = useSQLiteContext();

    // useStates for the input fields and selected store
    const [selectedStore, setSelectedStore] = useState("");
    const [newItemName, setNewItemName] = useState(itemNameToEdit);
    const [newItemQuantity, setNewItemQuantity] = useState(itemQuantityToEdit.toString());


    // Colour scheme for dark mode and light mode
    const colorScheme = useColorScheme();
    const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
    const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
    const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;

    // Handle Edit Item Function

    const { editItem, fetchAllItems } = useItemDatabase(db); 

    const handleEditItem = async () => {
        if (newItemName.trim() === "" || newItemQuantity.trim() === "" || selectedStore === "") {
            console.warn("Please fill in all fields");
            return;         
        };

        try {
          await editItem(
            parseInt(itemId),
            parseInt(selectedStore),
            newItemName,
            parseInt(newItemQuantity),
            0 // Assuming completed is set to 0 when editing an item, you can modify this as needed
          );
          setNewItemName("");
          setNewItemQuantity("");
          const updatedItems = await fetchAllItems();
          state$.items.set(updatedItems); // Update the global state with the new items
          console.log("Item edited successfully");
          router.back(); // Navigate back after editing item
        } catch (error) {
        
            console.error("Error editing item:", error);
        }

    }

    return (
        <View style={[styles.container, themeBackgroundColour]}>
            <View style={[styles.inputContainer, themeBackgroundColour]}> 

                <Text style={[styles.inputHeaderText, themeBackgroundColour, themeColour]}>Name</Text>

                <TextInput 
                style={[styles.textInput, themeBackgroundColour, themeColour, themeBorderColour]}
                placeholder={itemNameToEdit}
                placeholderTextColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
                selectionColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
                textAlign="center"
                autoFocus={false}
                returnKeyType="done"
                value={newItemName}
                onChangeText={setNewItemName}
                />
            </View>

            <View style={[styles.inputContainer, themeBackgroundColour]}> 
                <Text style={[styles.inputHeaderText, themeBackgroundColour, themeColour]}>Quantity</Text>
                <TextInput 
                style={[styles.textInput, themeBackgroundColour, themeColour, themeBorderColour]}
                value={newItemQuantity}
                onChangeText={setNewItemQuantity}
                placeholder={itemQuantityToEdit.toString()}
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
            <Pressable
                style={[styles.updateButton, themeBackgroundColour]}
                onPress={handleEditItem}
            >
                <Text style={[styles.updateButtonText, themeColour, themeBorderColour]}>Update</Text>
            </Pressable>

        </View>
    )
}

export default EditItem

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
  updateButton: {
    width: '100%',
    padding: 4,
    alignItems: 'flex-end',
    marginRight: '20%',
    marginTop:'5%',
  },

  updateButtonText: {
    fontSize: 20,
    width: '40%',
    borderRadius: 8,
    borderWidth: 2,
    textAlign: 'center',
    padding: 10,
    paddingLeft: 10,
  },
 

});