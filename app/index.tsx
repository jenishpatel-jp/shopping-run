import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { ThemedView } from "../components/themedComponents/ThemedView";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import { useSQLiteContext } from "expo-sqlite";
import { useDatabase } from "../lib/store";

import { state$ } from "../lib/state"; // Import the global state
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../components/themedComponents/ThemedText";

export default function ShoppingList() {

  const db = useSQLiteContext();
  const { fetchStores } = useDatabase(db);

  const router = useRouter();

  useEffect(() => {
    const syncInitialData = async () => {
      try {
        const stores = await fetchStores();
        state$.stores.set(stores); // Update the global state with the fetched stores
      } catch(error){
        console.error("Error during initial data sync:", error);
      }
    };

    syncInitialData();

  }, [] );

  const storesData = state$.stores.get(); // Access the global state for stores

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}> 
          <Stack.Screen 
            options={{
              headerTitle: "Shopping List",
              headerRight: () => 
              <View style={styles.headerRightView}>
                <Pressable 
                  style={styles.headerRightButton}
                  onPress={() => router.push("/add")}
                  > 
                  <MaterialCommunityIcons name="store-plus" size={30} color="white" />
                </Pressable>
                <Pressable 
                  style={styles.headerRightButton}
                  onPress={() =>  router.push("/add/addItem")}
                  > 
                  <Ionicons name="add-circle-outline" size={30} color="white" />
                </Pressable>

              </View>,
            }}
          
          />
          <ThemedView style={styles.container}> 
            <StatusBar style="auto" />
            <ThemedText> Shopping List </ThemedText>
          </ThemedView>
        
        </SafeAreaView>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
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
