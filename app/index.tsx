import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { ThemedView } from "../components/themedComponents/ThemedView";
import { ThemedText } from "../components/themedComponents/ThemedText";
import { ThemedTextInput } from "../components/themedComponents/ThemedTextInput";
import AddStore from "../components/shoppingListComponents/AddStore";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Stack } from "expo-router";

export default function ShoppingList() {
  const colorScheme = useColorScheme();

  return (
    <>
        <Stack.Screen 
          options={{
            headerTitle: "Shopping List",
            headerRight: () => 
            <View style={styles.headerRightView}>
              <Pressable 
                style={styles.headerRightButton}
                onPress={() => { console.log("Add Store Pressed") }}
                > 
                <MaterialCommunityIcons name="store-plus" size={30} color="black" />
              </Pressable>
              <Pressable 
                style={styles.headerRightButton}
                onPress={() => { console.log("Add Item Pressed") }}
                > 
                <Ionicons name="add-circle-outline" size={30} color="black" />
              </Pressable>

            </View>,
          }}
        
        />
        <ThemedView style={styles.container}>
          <StatusBar style="auto" />
          <AddStore />
        </ThemedView>
    </>
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
  headerRightView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 100,
    height: 50,
  },
  headerRightButton: {
    padding: 5,
  }
});
