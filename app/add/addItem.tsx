import { ThemedView } from "../../components/themedComponents/ThemedView"
import { ThemedText } from "../../components/themedComponents/ThemedText"
import { StyleSheet, TextInput } from "react-native"


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
  }

})