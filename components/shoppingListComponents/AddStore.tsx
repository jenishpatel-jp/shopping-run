import { ThemedView } from "../themedComponents/ThemedView";
import { ThemedTextInput } from "../themedComponents/ThemedTextInput";
import { ThemedText } from "../themedComponents/ThemedText";
import { ThemedButton } from "../themedComponents/ThemedButton";
import { StyleSheet } from "react-native";

const AddStore = () => {
    return (
        <ThemedView style={styles.container}> 
            <ThemedTextInput 
                placeholder="Enter store name"

            />
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
    }
})