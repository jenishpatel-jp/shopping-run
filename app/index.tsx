import { StatusBar } from "expo-status-bar";
import { Pressable, SectionList, StyleSheet, Text, useColorScheme, View } from "react-native";
import { ThemedView } from "../components/themedComponents/ThemedView";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import { useSQLiteContext } from "expo-sqlite";
import { useStoreDatabase } from "../lib/store";

import { state$ } from "../lib/state"; // Import the global state
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useItemDatabase } from "../lib/items";
import { use$ } from "@legendapp/state/react";
import SectionListItem from "../components/shoppingListComponents/SectionListItem";
import SectionListHeader from "../components/shoppingListComponents/SectionListHeader";


export default function ShoppingList() {

  const db = useSQLiteContext();
  const { fetchStores } = useStoreDatabase(db);
  const { fetchAllItems } = useItemDatabase(db);

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
    const items = use$(state$.items)
    const stores = use$(state$.stores)

    return stores.map(store => ({
      title: store.storeName,
      storeId: store.storeId,
      data: items.filter(item => item.storeId === store.storeId)
    }));
  };

  const sectionedData = sectionedItems();
  const filteredSectionedData = sectionedData.filter(section => section.data && section.data.length > 0);

  const colorScheme = useColorScheme();

  const themeBackgroundColour = colorScheme === "dark" ? styles.darkBackgroundColour : styles.lightBackgroundColour;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundColour]}> 
          <Stack.Screen 
            options={{
              headerTitle: "",
              headerRight: () => 
              <View style={[styles.headerRightView]}>
                <Pressable 
                  style={styles.headerRightButton}
                  onPressIn={() => router.push("/add")}
                  > 
                  <MaterialCommunityIcons name="store-plus" size={30} color={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"} />
                </Pressable>
                <Pressable 
                  style={styles.headerRightButton}
                  onPressIn={() => router.push("/add/addItem")}
                  > 
                  <Ionicons name="add-circle-outline" size={30} color={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"} />
                </Pressable>
              </View>,
              headerLeft: () => {
                return (
                  <Pressable onPressIn={() => console.log("Settings button pressed!")} style={{ paddingLeft: 10 }}>
                    <Feather name="settings" size={30} color={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"} />
                  </Pressable>
                );
              },
              headerStyle: { backgroundColor: colorScheme === 'dark' ? '#0A1931' : '#FFE4A1' },
            }}
          
          />
          <ThemedView style={[styles.container, themeBackgroundColour]}> 
            <StatusBar style="auto" />            

            <SectionList 
              sections={filteredSectionedData}
              keyExtractor={(item:any, index:number) => item.itemId + index}
              renderItem={({item}) => (
                <SectionListItem itemName={item.itemName} db={db}/>)}
              renderSectionHeader={({section: { title, storeId }}) => (
                <SectionListHeader title={title} db={db} storeId={storeId}/>)}
              style={styles.sectionListContainer}
              contentContainerStyle={styles.sectionListContent}
            
            />
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
    backgroundColor: "#0A1931",
    width: "100%",
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
  sectionListContainer: {
    width: "100%",
  },
  sectionListContent: {
    justifyContent: "center",
  },
});
