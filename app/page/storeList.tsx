import { ThemedView } from "../../components/themedComponents/ThemedView"
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native"
import { Stack, useRouter } from "expo-router";

// Format the data for the StoreSelectList component

export default function StoreList() {

  const colorScheme = useColorScheme();
  const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
  const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;

  const router = useRouter();

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

      <Pressable onPressIn={() => router.push('/storeList')}>
        <Text style={[styles.text, themeColour]} >View Store List</Text>
      </Pressable>

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
})