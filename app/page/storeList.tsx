import { ThemedView } from "../../components/themedComponents/ThemedView"
import { FlatList, Pressable, SectionList, StyleSheet, Text, useColorScheme } from "react-native"
import { Stack, useRouter } from "expo-router";
import { state$ } from "../../lib/state";
import { use$ } from "@legendapp/state/react";
import FlatListItem from "../../components/storeListComponents/FlatListItem";

// Format the data for the StoreSelectList component

export default function StoreList() {

  const colorScheme = useColorScheme();
  const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
  const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;

  const router = useRouter();

  const stores = state$.stores.get();

  const FlatListItems = () => {
    const stores = use$(state$.stores);
    return stores.map(store => (
      {
        storeId: store.storeId,
        storeName: store.storeName,
      }
    ))
  };

  const flatListData = FlatListItems();

  const flatListContentStyle = stores.length === 0 ? styles.flatListContentWithItems : null;


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

      <FlatList 
        data={flatListData}
        keyExtractor={(item) => item.storeId.toString()}
        renderItem={({ item }) => (
          <FlatListItem storeName={item.storeName} />
        )}
        style={styles.flatListContainer}
        contentContainerStyle={flatListContentStyle}
      />

    </ThemedView>

  );
};


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
  flatListContainer: {
    width: "100%",
    flex: 1,
    height: "100%",
  },
  flatListContentWithItems : {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
    borderWidth: 2,
    borderColor: 'white',
  }
})