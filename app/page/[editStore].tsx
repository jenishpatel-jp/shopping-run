
import { StyleSheet, Pressable, View, TextInput, Text, useColorScheme } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useStoreDatabase } from "../../lib/store";
import { useRouter, useLocalSearchParams, Stack, router } from "expo-router";
import { use$ } from "@legendapp/state/react";
import { state$ } from "../../lib/state";


const EditStore = () => {
    
    const colourScheme = useColorScheme();
    const themeBackgroundColour = colourScheme === 'dark' ? styles.darkBackgroundColor : styles.lightBackgroundcolour;
    const themeBorderColour = colourScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;
    const themeColour = colourScheme === 'dark' ? styles.darkColour : styles.lightColour;

    const db = useSQLiteContext();
    const { addStore, fetchStores } = useStoreDatabase(db);

    // Get storeId from route params and find the store to edit
    const { storeId } = useLocalSearchParams<{ storeId: string }>();
    const stores = use$(state$.stores);
    const storeToEdit = stores.find(store => store.storeId.toString() === storeId);
    const storeName = storeToEdit ? storeToEdit.storeName : "";

    return (
        <View style={[styles.container, themeBackgroundColour]}>

            <Stack.Screen
                    options={{
                        headerTitle: 'Add Store',
                        presentation: 'formSheet',
                        sheetGrabberVisible: true,
                        headerLargeTitle: false,
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerTitleStyle: [styles.headerTitleIcons, themeColour],
                        headerStyle: { backgroundColor: colourScheme === 'dark' ? '#0A1931' : '#FFE4A1' },
                        headerLeft: () => 
                            <Pressable onPressIn={() => router.back()} >
                                <Text style={[styles.text, themeColour]} >Cancel</Text>
                            </Pressable>,
                        headerRight: () =>
                            <Pressable  >
                                <Text style={[styles.text, themeColour]} >Save</Text>
                            </Pressable>
                    }}
                
                />

            <View style={[styles.editStoreContainer, themeBorderColour]}>
                <Text style={[styles.labelTextInput, themeColour]}>Edit Store</Text>
                <TextInput
                    style={[styles.textInput, themeBorderColour, themeColour]}
                    placeholder={storeName}
                    placeholderTextColor={colourScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
                    selectionColor={colourScheme === 'dark' ? "#FFE4A1" : "#0A1931"}
                />
                <Pressable
                    style={[styles.addButton, themeBackgroundColour]}
                    onPress={() => {
                        // Handle update store action here
                    }}
                >
                    <Text style={[styles.labelTextInput, themeColour, themeBorderColour]}>Update</Text>
                </Pressable>
            </View>
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
    editStoreContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            width: '90%',
            borderWidth: 2,
            padding: 10,
            marginBottom: 100,
            textAlign: 'left',
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