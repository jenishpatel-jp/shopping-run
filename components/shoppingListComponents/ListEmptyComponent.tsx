import { Link, Router } from "expo-router";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { state$ } from "../../lib/state"; 

const ListEmptyComponent = () => {

    const colorScheme = useColorScheme();

    const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
    const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
    const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;

    const listOfStores = state$.stores.get();

    console.log(listOfStores)
    console.log(listOfStores.length)

    return (
        

        <View style={[styles.container, themeBackgroundColour, themeBorderColour]}>

            {listOfStores.length === 0 ? 
            <Link href="/add">
                <Text style={[styles.text, themeColour]} >Add a store to get started</Text>
            </Link> : 
            <Link href="/add/addItem">
                <Text style={[styles.text, themeColour]} >Add items to your store</Text>
            </Link>
            }

        </View>
    )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#0A1931',
        borderWidth: 2,
        margin: 10,
        padding: 20,
        borderRadius: 10,
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

