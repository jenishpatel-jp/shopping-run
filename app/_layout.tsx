import { Stack } from  'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// SQLite imports 
import { SQLiteProvider } from 'expo-sqlite';
import { setupDatabase } from '../lib/db';

export default function RootLayout(){
    return (
        <SQLiteProvider databaseName='shoppingList' onInit={setupDatabase}>
            <SafeAreaProvider>
                    <Stack screenOptions={{ 
                        headerShown: true, 
                        title: 'Shopping List', 
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: 'black' }
                    
                        }}>
                        <Stack.Screen 
                            name='index' 
                            options={{
                                headerTitle: 'Shopping List',
                                presentation: 'formSheet',
                                sheetGrabberVisible: true,
                                headerLargeTitle: false,

                                
                            }}
                            
                            />
                    </Stack>
      
            </SafeAreaProvider>
        </SQLiteProvider>
    )
};