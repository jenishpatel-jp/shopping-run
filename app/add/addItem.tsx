import { ThemedView } from "../../components/themedComponents/ThemedView"
import { ThemedText } from "../../components/themedComponents/ThemedText"
import { StyleSheet } from "react-native"


const addItem = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Add Item</ThemedText>

    </ThemedView>

  )
}

export default addItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }

})