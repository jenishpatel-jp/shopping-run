import { ThemedView } from "../../components/themedComponents/ThemedView"
import { ThemedText } from "../../components/themedComponents/ThemedText"
import { Pressable, StyleSheet, TextInput } from "react-native"
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from "react";
import StoreSelectList from "../../components/shoppingListComponents/StoreSelectList";
import { storesData } from "../../components/shoppingListComponents/Stores";

const data = [
  { key: '1', value: 'Coles' },
  { key: '2', value: 'Aldi' },
  { key: '3', value: 'Grocery Stores' },
];



const addItem = () => {

  return (
    <ThemedView style={styles.container}>
      <TextInput 
        style={styles.textInput}
        placeholder="Enter item name"
        placeholderTextColor="white"
        selectionColor="white"
        textAlign="center"
        autoFocus
        returnKeyType="done"
        onSubmitEditing={() => console.log("Item added")} // Placeholder for item addition logic
      
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Enter item quantity"
        placeholderTextColor="white"
        selectionColor="white"
        textAlign="center"
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={() => console.log("Quantity added")} // Placeholder for quantity addition logic
      />
      
      <StoreSelectList data={storesData} />
      <Pressable 
        style={styles.addButton} 
        onPress={() => console.log("Item added to list")} // Placeholder for item addition logic
        >
        <ThemedText style={styles.addButtonText}>Add Item</ThemedText>
      </Pressable>

    </ThemedView>

  )
}

export default addItem

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

})