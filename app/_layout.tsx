import { Stack, useRouter } from  'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';

// SQLite imports 
import { SQLiteProvider } from 'expo-sqlite';
import { setupDatabase } from '../lib/db';

// Legend State Imports 
import { configureSynced, syncObservable } from '@legendapp/state/sync';
import { observablePersistSqlite } from '@legendapp/state/persist-plugins/expo-sqlite';
import Storage from 'expo-sqlite/kv-store';
import { state$ } from '../lib/state';  
import { Text, View, StyleSheet } from 'react-native';

// Global configuration
const persistOptions = configureSynced({
    persist: {
        plugin: observablePersistSqlite(Storage)
    },
});

syncObservable(
    state$,
    persistOptions({
        persist: {
            name: 'store',
        },
    }),
);

export default function RootLayout(){

    return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                            <Stack.Screen 
                                name="add"
                                options={{
                                    headerShown: true,
                                    presentation: 'formSheet',
                                    sheetGrabberVisible: true,         
                                    headerLargeTitle: false,
                                    sheetAllowedDetents: [0.8, 1],         
                                    
                                }}
                            
                            />
                        </Stack>
        
                </SafeAreaProvider>
           
        </SQLiteProvider>
    </GestureHandlerRootView>
    )
};

