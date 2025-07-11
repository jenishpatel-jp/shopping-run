import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
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

import { Stores, storesData } from "../components/shoppingListComponents/Stores";

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}> 
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
            <FlatList 
              data={storesData}
              renderItem={({ item }) => <Stores storeName={item.storeName} />} 
              keyExtractor={item => item.storeId.toString()}
              style={styles.flatListContainer}
              contentContainerStyle={styles.flatListContent}
            />
          </ThemedView>
        
        </SafeAreaView>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    width: "100%",
    borderWidth: 1,
    borderColor: "white"
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
  },
  item: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  flatListContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: 'red',
  },
  flatListContent: {
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "green", 
  }
});
