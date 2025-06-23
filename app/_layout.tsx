import { Stack } from  'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// SQLite imports 
import { SQLiteProvider } from 'expo-sqlite';
import { setupDatabase } from '../lib/db';

export default function RootLayout(){
    return (
        <SQLiteProvider databaseName='shoppingList' onInit={setupDatabase}>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }}/>
            </SafeAreaProvider>
        </SQLiteProvider>
    )
};