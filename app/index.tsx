import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { ThemedView } from "../components/themedComponents/ThemedView";
import { ThemedText } from "../components/themedComponents/ThemedText";
import { ThemedTextInput } from "../components/themedComponents/ThemedTextInput";
import AddStore from "../components/shoppingListComponents/AddStore";

export default function ShoppingList() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <AddStore />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
