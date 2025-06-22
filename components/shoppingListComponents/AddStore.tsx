import { ThemedView } from "../themedComponents/ThemedView";
import { ThemedTextInput } from "../themedComponents/ThemedTextInput";
import { ThemedText } from "../themedComponents/ThemedText";
import { ThemedButton } from "../themedComponents/ThemedButton";
import { StyleSheet, Pressable } from "react-native";

const AddStore = () => {
    return (
        <ThemedView style={styles.container}> 
            <ThemedTextInput 
                placeholder="Enter store name"

            />
            <Pressable style={styles.addButton} >
                <ThemedText style={styles.addButtonText} >Add</ThemedText>
            </Pressable>
        </ThemedView>
    )
}

export default AddStore;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 4,
        width: '90%',
    },
    addButton: {
        backgroundColor: 'white',
        borderRadius: 5,
        color: 'black',
        width: '100%',
    },
    addButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
        borderColor: 'red',
        borderRadius: 4,
        borderWidth: 2
    },
})