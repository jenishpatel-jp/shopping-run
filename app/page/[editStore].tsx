import { ThemedView } from "../../components/themedComponents/ThemedView";
import { ThemedText } from "../../components/themedComponents/ThemedText";
import { StyleSheet, Pressable, View, TextInput, Text, useColorScheme } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useStoreDatabase } from "../../lib/store";

const EditStore = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.labelTextInput}>Edit Store Page</ThemedText>
        </ThemedView>
    )
}

export default EditStore

const styles = StyleSheet.create({
    container: {
            alignItems: "center",
            paddingTop: 100,
            width: '100%',
            flex: 1,
        },
    labelTextInput: {
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 'bold',
            paddingLeft: 10,
            alignSelf: 'flex-start',
        },
});