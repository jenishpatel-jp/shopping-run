
import { StyleSheet, Pressable, View, TextInput, Text, useColorScheme } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useStoreDatabase } from "../../lib/store";


const EditStore = () => {
    
    const colourScheme = useColorScheme();
    const themeBackgroundColour = colourScheme === 'dark' ? styles.darkBackgroundColor : styles.lightBackgroundcolour;
    const themeBorderColour = colourScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;
    const themeColour = colourScheme === 'dark' ? styles.darkColour : styles.lightColour;

    const db = useSQLiteContext();
    const { addStore, fetchStores } = useStoreDatabase(db);



    return (
        <View style={[styles.container, themeBackgroundColour]}>
            <Text style={[styles.labelTextInput, themeColour]}>Edit Store Page</Text>
        </View>
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
    lightBorderColour: {
            borderColor: '#0A1931',
        },
    darkBorderColour: {
            borderColor: '#FFE4A1',
        },
});