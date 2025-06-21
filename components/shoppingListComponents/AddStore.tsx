import { ThemedView } from "../themedComponents/ThemedView";
import { ThemedTextInput } from "../themedComponents/ThemedTextInput";
import { ThemedText } from "../themedComponents/ThemedText";
import { ThemedButton } from "../themedComponents/ThemedButton";

const AddStore = () => {
    return (
        <ThemedView>
            <ThemedTextInput 
                placeholder="Enter store name"
                
            />
        </ThemedView>
    )
}

export default AddStore;