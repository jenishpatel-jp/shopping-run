import { Stack } from  'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// SQLite imports 
import { SQLiteProvider } from 'expo-sqlite';
import { setupDatabase } from '../lib/db';

export default function RootLayout(){
    return (
        <SQLiteProvider databaseName='shoppingList' onInit={setupDatabase}>
            <SafeAreaProvider>
                    <Stack screenOptions={{ headerShown: true, title: 'Shopping List' }}>
                        <Stack.Screen 
                            name='index.tsx' 
                            options={{
                                headerTitle: 'Shopping List',
                                presentation: 'formSheet',
                                sheetGrabberVisible: true,
                            }}
                            
                            />
                    </Stack>
      
            </SafeAreaProvider>
        </SQLiteProvider>
    )
};