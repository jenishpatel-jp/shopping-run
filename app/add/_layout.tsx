import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddLayout(){

    const router = useRouter();

    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ 
                headerShown: false, 
                title: 'Add Store', 
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'black' }
            }}>
                <Stack.Screen 
                    name='index' 
                    options={{
                        headerTitle: 'Add Store',
                        presentation: 'formSheet',
                        sheetGrabberVisible: true,
                        headerLargeTitle: false,
                        headerShown: true,
                }}
                />
                <Stack.Screen 
                    name='addItem' 
                    options={{
                        headerTitle: 'Add Item',
                        presentation: 'formSheet',
                        sheetGrabberVisible: true,
                        headerLargeTitle: false,
                        headerTitleAlign: 'center',
                        headerShown: true,
                        headerLeft: () => 
                            <Pressable 
                                onPress={() => router.back()}
                                style={{ marginLeft: 10 }}
                            >
                                <Text style={styles.cancelText} >Cancel</Text>
                                
                            </Pressable>
                }}
                
                />
            </Stack>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    cancelText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',

    }

});