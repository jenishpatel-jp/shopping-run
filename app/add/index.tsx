import { ThemedView } from "../../components/themedComponents/ThemedView";
import { ThemedText } from "../../components/themedComponents/ThemedText";
import { StyleSheet, Pressable, View, TextInput, Text, useColorScheme } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useStoreDatabase } from "../../lib/store";
import { useState } from "react";
import { state$ } from "../../lib/state"; 
import { Stack, useRouter } from "expo-router";


export default function AddStore (){

    const [storeName, setStoreName] = useState("");

    const db = useSQLiteContext();
    const { addStore, fetchStores } = useStoreDatabase(db);

    

    const router = useRouter();

    const arrayObjectOfStores = state$.stores.get(); 
    const checkStoreExists = arrayObjectOfStores.some(store => store.storeName === storeName);

    const handleAddStore = async () => {
        if (storeName.trim() === ""){
            console.warn("Store name cannot be empty");
            return;
        };

        if (checkStoreExists) {
            console.warn("Store already exists");
            return;
        };

        try {
            await addStore(storeName);
            const updatedStores = await fetchStores();
            state$.stores.set(updatedStores); // Update the global state with the new store list
            setStoreName(""); // Clear input after adding
            console.log("Store added successfully");
            router.back(); // Navigate to add item screen after adding store
        } catch (error) {
            console.error("Error adding store:", error);
        }
    };

    const colorScheme = useColorScheme();
    const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColor : styles.lightBackgroundcolour;
    const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;
    const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
    


        return (
            
            <ThemedView style={[styles.container, themeBackgroundColour]}> 
            
                <Stack.Screen
                    options={{
                        headerTitle: 'Add Store',
                        presentation: 'formSheet',
                        sheetGrabberVisible: true,
                        headerLargeTitle: false,
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerTitleStyle: [styles.headerTitleIcons, themeColour],
                        headerStyle: { backgroundColor: colorScheme === 'dark' ? '#0A1931' : '#FFE4A1' },
                        headerLeft: () => 
                            <Pressable onPressIn={() => router.back()} >
                                <Text style={[styles.text, themeColour]} >Cancel</Text>
                            </Pressable>,
                        headerRight: () =>
                            <Pressable onPressIn={handleAddStore}>
                                <Text style={[styles.text, themeColour]} >Save</Text>
                            </Pressable>
                    }}
                
                />
             
                    <View style={[styles.addStoreContainer, themeBorderColour]}> 
                        <Text style={[styles.labelTextInput, themeColour]}>Store Name</Text>
                        <TextInput 
                            style={[styles.textInput, themeBorderColour, themeColour]}
                            placeholder="Enter store name"
                            placeholderTextColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
                            selectionColor={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
                            textAlign="center"
                            value={storeName}
                            onChangeText={setStoreName}
                        />
                        <Pressable 
                            style={[styles.addButton, themeBackgroundColour]} 
                            onPress= { () => handleAddStore() }
                            >
                            <ThemedText style={[styles.addButtonText, themeColour, themeBorderColour]}>Add</ThemedText>
                        </Pressable>
                    </View>
               
            </ThemedView>
          
        )
    };
    
const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            paddingTop: 100,
            width: '100%',
            flex: 1,
        },
        lightBackgroundcolour: {
            backgroundColor: "#FFE4A1",
        },
        darkBackgroundColor: {
            backgroundColor: "#0A1931",
        }, 
        lightColour: {
            color: "#0A1931",
        },
        darkColour: {
            color: "#FFE4A1",
        },
        addStoreContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            width: '90%',
            borderWidth: 2,
            padding: 10,
            marginBottom: 100,
            textAlign: 'left',
        },
        lightBorderColour: {
            borderColor: '#0A1931',
        },
        darkBorderColour: {
            borderColor: '#FFE4A1',
        },

        labelTextInput: {
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 'bold',
            paddingLeft: 10,
            alignSelf: 'flex-start',
        },
        textInput: {
            borderWidth: 2,
            width: '100%',
            marginBottom: 10,
            height: 70,
            textAlign: 'center',
            fontSize: 24,
            borderRadius: 8,
            padding: 10,

        },
        addButton: {
            width: '100%',
            padding: 4,
            alignItems: 'flex-end',
        },

        addButtonText: {
            fontSize: 20,
            width: '40%',
            borderRadius: 8,
            borderWidth: 2,
            textAlign: 'center',
            padding: 10,
            paddingLeft: 10,
            
        },
        text: {
            fontSize: 18,
            marginLeft: 10,
            fontWeight: 'bold',
        },
        headerTitleIcons: {
            fontSize: 20, 
            fontWeight: 'bold'
        },
    })

