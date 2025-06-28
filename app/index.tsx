import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { ThemedView } from "../components/themedComponents/ThemedView";


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Stack, useRouter } from "expo-router";

export default function ShoppingList() {

  const router = useRouter();

  return (
    <>
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
