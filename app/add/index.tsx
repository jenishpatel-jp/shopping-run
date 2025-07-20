import { ThemedView } from "../../components/themedComponents/ThemedView";
import { ThemedText } from "../../components/themedComponents/ThemedText";
import { StyleSheet, Pressable, View, TextInput } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useStoreDatabase } from "../../lib/store";
import { useState } from "react";
import { state$ } from "../../lib/state"; 
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useRouter } from "expo-router";


export default function AddStore (){

    const db = useSQLiteContext();
    const { addStore, fetchStores } = useStoreDatabase(db);

    const [storeName, setStoreName] = useState("");

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
            router.push("/"); // Navigate to add item screen after adding store
        } catch (error) {
            console.error("Error adding store:", error);
        }
    };


        return (
            <ThemedView style={styles.container}> 
                <View style={styles.addStoreContainer}> 
                    <TextInput 
                        style={styles.TextInput}
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
            justifyContent: "center",
            width: '100%',
            flex: 1,
        },
        addStoreContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            width: '90%',
            borderWidth: 4,
            padding: 10,
            marginBottom: 100,
        },
        TextInput: {
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
    })

