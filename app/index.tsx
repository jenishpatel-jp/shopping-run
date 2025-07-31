import { StatusBar } from "expo-status-bar";
import { Pressable, SectionList, StyleSheet, Text, useColorScheme, View } from "react-native";
import { ThemedView } from "../components/themedComponents/ThemedView";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import { useSQLiteContext } from "expo-sqlite";
import { useStoreDatabase } from "../lib/store";

import { state$ } from "../lib/state"; // Import the global state
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Stores } from "../components/shoppingListComponents/Stores";
import { useItemDatabase } from "../lib/items";
import { use$ } from "@legendapp/state/react";
import SectionListItem from "../components/shoppingListComponents/SectionListItem";
import SectionListHeader from "../components/shoppingListComponents/SectionListHeader";



export default function ShoppingList() {

  const db = useSQLiteContext();
  const { fetchStores } = useStoreDatabase(db);
  const { fetchAllItems } = useItemDatabase(db);
  const stores = use$(state$.stores);

  const router = useRouter();

  useEffect(() => {
    const syncInitialData = async () => {
      try {
        const stores = await fetchStores();
        const items = await fetchAllItems();
        state$.stores.set(stores); // Update the global state with the fetched stores
        state$.items.set(items); // Update the global state with the fetched items
      } catch(error){
        console.error("Error during initial data sync:", error);
      }
    };

    syncInitialData();

  }, [] );

  // Sectionlist Data

  const sectionedItems = () => {
    const items = state$.items.get();
    const stores = state$.stores.get();

    return stores.map(store => ({
      title: store.storeName,
      storeId: store.storeId,
      data: items.filter(item => item.storeId === store.storeId)
    }));
  };

  const sectionedData = sectionedItems();
  const filteredSectionedData = sectionedData.filter(section => section.data && section.data.length > 0);

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
                  onPressIn={() => router.push("/add")}
                  > 
                  <MaterialCommunityIcons name="store-plus" size={30} color="white" />
                </Pressable>
                <Pressable 
                  style={styles.headerRightButton}
                  onPressIn={() => router.push("/add/addItem")}
                  > 
                  <Ionicons name="add-circle-outline" size={30} color="white" />
                </Pressable>

              </View>,
            }}
          
          />
          <ThemedView style={styles.container}> 
            <StatusBar style="auto" />            

            <SectionList 
              sections={filteredSectionedData}
              keyExtractor={(item:any, index:number) => item.itemId + index}
              renderItem={({item}) => (
                <SectionListItem item={item.itemName} db={db}/>)}
              renderSectionHeader={({section: { title }}) => (
                <SectionListHeader title={title} />)}
              style={styles.sectionListContainer}
              contentContainerStyle={styles.sectionListContent}
            
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
  sectionListContainer: {
    width: "100%",
    backgroundColor: "black",

  },
  sectionListContent: {
    justifyContent: "center",
  },
});
