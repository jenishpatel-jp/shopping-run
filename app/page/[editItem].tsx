import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native"
import StoreSelectList from "../../components/shoppingListComponents/StoreSelectList";
import { state$ } from "../../lib/state";
import { use, useMemo, useState } from "react";
import { useItemDatabase } from "../../lib/items";
import { useSQLiteContext } from "expo-sqlite";
import { use$ } from "@legendapp/state/react";
import { router, Stack, useLocalSearchParams } from "expo-router";


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

    const items = use$(state$.items);
    const { itemId } = useLocalSearchParams<{ itemId: string }>();
    const itemToEdit = items.find(item => item.itemId.toString() === itemId);
    const itemNameToEdit = itemToEdit ? itemToEdit.itemName : "";
    const itemQuantityToEdit = itemToEdit ? itemToEdit.quantity : "";

    const db = useSQLiteContext();

    const [selectedStore, setSelectedStore] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");

    const colorScheme = useColorScheme();
    const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
    const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
    const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;
    

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
 

});