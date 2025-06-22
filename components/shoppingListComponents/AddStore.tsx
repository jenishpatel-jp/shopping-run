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
                <ThemedText style={styles.addButtonText}>Add</ThemedText>
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
        color: 'black',
        width: '100%',
        padding: 4,
        alignItems: 'flex-end',
    },
    addButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        width: '40%',
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        paddingLeft: 10,
    },
})