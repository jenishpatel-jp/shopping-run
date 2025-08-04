import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddLayour(){
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
                        headerShown: true,
                }}
                
                />
            </Stack>
        </SafeAreaProvider>
    );
}