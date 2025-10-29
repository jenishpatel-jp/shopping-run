import { ThemedView } from "../../components/themedComponents/ThemedView"
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native"
import { state$ } from "../../lib/state";
import { useItemDatabase } from "../../lib/items";
import { useSQLiteContext } from "expo-sqlite";
import { Stack, useRouter } from "expo-router";
import { useStoreDatabase } from "../../lib/store";


// Format the data for the StoreSelectList component

export default function Settings() {

  const router = useRouter();

  const db = useSQLiteContext();

  const { deleteAllItems } = useItemDatabase(db);
  const { deleteAllStores } = useStoreDatabase(db);

  const colorScheme = useColorScheme();
  const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
  const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
  const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;


  const handleDeleteAllItems = async () => {
    try {
      await deleteAllItems();
      state$.items.set([]); // Clear items in global state
      console.log("All items deleted successfully");
    } catch (error){
      console.error("Error deleting all items:", error);
    }
  }

  const handleDeleteAll = async () => {
    try {
      await deleteAllStores();
      state$.stores.set([]); // Clear stores in global state
      state$.items.set([]); // Clear items in global state
      console.log("All stores deleted successfully");
    } catch (error) {
      console.error("Error deleting all stores:", error);
    }
  }

  return (
    <ThemedView style={[styles.container, themeBackgroundColour]}>

      <Stack.Screen 

        options={{
          headerTitle: 'Settings',
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          headerLargeTitle: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: [styles.headerTitleIcons, themeColour ] ,
          headerStyle: { backgroundColor: colorScheme === 'dark' ? '#0A1931' : '#FFE4A1'},
          headerLeft: () => 
              <Pressable onPressIn={() => router.back()} >
                  <Text style={[styles.text, themeColour]} >Cancel</Text>
              </Pressable>,
        }}
      />

      {/* Delete All Items Button */}
      <View 
        style={[styles.viewContainer, themeBackgroundColour]}> 
  
        <Pressable 
          style={[styles.pressableButton, themeBackgroundColour, themeBorderColour]}
          onPressIn={handleDeleteAllItems}
          >
          <Text style={[styles.pressableButtonText, themeColour]}>Delete All Items</Text>
        </Pressable>
      </View>

      {/* Delete All Stores Button */}
      <View style={[styles.viewContainer, themeBackgroundColour]}> 
        <Pressable 
          style={[styles.pressableButton, themeBackgroundColour, themeBorderColour]}
          onPressIn={handleDeleteAll}
          >
          <Text style={[styles.pressableButtonText, themeColour]}>Delete All Stores</Text>
        </Pressable>
      </View>

      
      {/* View Store List Button */}
      <View style={[styles.viewContainer, themeBackgroundColour]}> 
        <Pressable 
          style={[styles.pressableButton, themeBackgroundColour, themeBorderColour]}
          >
          <Text style={[styles.pressableButtonText, themeColour]}>View Store List</Text>
        </Pressable>
      </View>

    </ThemedView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  }, 
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  pressableButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  pressableButton: {
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20,
    width: '60%',
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
})