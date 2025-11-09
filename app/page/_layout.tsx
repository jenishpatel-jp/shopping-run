import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddLayout(){

    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ 
                headerShown: false, 
                title: 'Add', 
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'black' }
            }}>
            </Stack>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    }
});