import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet, useColorScheme, Pressable } from "react-native";
import { state$ } from "../../lib/state"; 
import { use } from "react";

const ListEmptyComponent = () => {

    const colorScheme = useColorScheme();

    const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
    const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
    const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;

    const listOfStores = state$.stores.get();

    const router = useRouter();

    return (
        

        <View style={[styles.container, themeBackgroundColour, themeBorderColour]}>

            {listOfStores.length === 0 ? 
            <Pressable 
                onPressIn={() => router.push("/page")}
            >
                <Text style={[styles.text, themeColour]} >Add a store to get started</Text>
            </Pressable> : 
            <Pressable 
                onPressIn={() => router.push("/page/addItem")}
            >
                <Text style={[styles.text, themeColour]} >Add items to your store</Text>
            </Pressable>
            }

        </View>
    )
    }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#0A1931',
        borderWidth: 2,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    text: {
        fontSize: 18,
    },
    lightBackgroundColour: {
        backgroundColor: "#FFE4A1",
    },
    darkBackgroundColour: {
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

export default ListEmptyComponent;

