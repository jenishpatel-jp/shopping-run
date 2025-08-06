import { ThemedView } from "../../components/themedComponents/ThemedView";
import { ThemedText } from "../../components/themedComponents/ThemedText";
import { StyleSheet, Pressable, View, TextInput, Text } from "react-native";
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


        return (
            
            <ThemedView style={styles.container}> 
            
                <Stack.Screen
                    options={{
                        headerTitle: 'Add Store',
                        presentation: 'formSheet',
                        sheetGrabberVisible: true,
                        headerLargeTitle: false,
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerTitleStyle: { color: '#FF6539', fontSize: 20, fontWeight: 'bold' },
                        headerLeft: () => 
                            <Pressable onPressIn={() => router.back()} >
                                <Text style={styles.text} >Cancel</Text>
                            </Pressable>,
                        headerRight: () =>
                            <Pressable onPressIn={handleAddStore}>
                                <Text style={styles.text} >Save</Text>
                            </Pressable>
                    }}
                
                />
             
                    <View style={styles.addStoreContainer}> 
                        <Text style={styles.labelTextInput}>Store Name</Text>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Enter store name"
                            placeholderTextColor="white"
                            selectionColor="white"
                            textAlign="center"
                            value={storeName}
                            onChangeText={setStoreName}
                        />
                        <Pressable 
                            style={styles.addButton} 
                            onPress= { () => handleAddStore() }
                            >
                            <ThemedText style={styles.addButtonText}>Add</ThemedText>
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
            backgroundColor: 'black',
        },
        addStoreContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            width: '90%',
            borderWidth: 4,
            padding: 10,
            marginBottom: 100,
            textAlign: 'left'
        },
        labelTextInput: {
            color: 'white',
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 'bold',
            paddingLeft: 10,
            alignSelf: 'flex-start',
        },
        textInput: {
            borderColor: 'white',
            borderWidth: 2,
            width: '100%',
            marginBottom: 10,
            height: 70,
            textAlign: 'center',
            fontSize: 24,
            color: 'white',
            borderRadius: 8,
            padding: 10,

        },
        addButton: {
            backgroundColor: 'black',
            color: 'white',
            width: '100%',
            padding: 4,
            alignItems: 'flex-end',
        },

        addButtonText: {
            color: 'white',
            fontSize: 20,
            width: '40%',
            borderColor: 'white',
            borderRadius: 8,
            borderWidth: 2,
            textAlign: 'center',
            padding: 10,
            paddingLeft: 10,
            
        },
        text: {
            color: '#FF6539',
            fontSize: 18,
            marginLeft: 10,
            fontWeight: 'bold',
        }
    })

