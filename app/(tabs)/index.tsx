import Items from '@/components/Items/Items';
import Lists from '@/components/Lists/Lists';
import Store from '@/components/Store/Store';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { addStore, editStore, updateStoreName, deleteStore } from '../../utils/storeUtils';
import { addItem, deleteItem, editItem, updateItemName } from '../../utils/itemsUtils';

export default function ShoppingRun() {

  const [storeList, setStoreList] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<{[key:string]: string[]}> ({});
  const [editingStoreIndex, setEditingStoreIndex] = useState<number | null>(null);
  const [newStoreName, setNewStoreName] = useState<string>('');
  const [newItemName, setNewItemName] = useState<string>("");
  const [storeOfItem, setStoreOfItem] = useState<string|null >("");
  const [indexOfItem, setIndexOfItem] = useState<number|null>(null);

  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container}>
          <Store addStore={(storeName: string) => addStore(storeName, storeList, setStoreList) } />
          <Items 
            storeList={storeList} 
            addItem={(store: string, item: string) => addItem(store, item, setShoppingList)} 
            editStore={(storeIndex: number) => editStore(storeIndex, storeList, setEditingStoreIndex, setNewStoreName)} 
            deleteStore={(storeIndex: number) => deleteStore(storeIndex, storeList, setStoreList, setShoppingList)} 
            updateStoreName={() => updateStoreName(editingStoreIndex, newStoreName, storeList, setStoreList, setShoppingList, setEditingStoreIndex, setNewStoreName)} 
            editingStoreIndex={editingStoreIndex} 
            newStoreName={newStoreName} 
            setNewStoreName={setNewStoreName} 
            />
          <Lists 
            shoppingList={shoppingList} 
            deleteItem={(store: string, item: string) => deleteItem(store, item, setShoppingList)}
            updateItemName={() => updateItemName(storeOfItem, newItemName, indexOfItem, setShoppingList, setStoreOfItem, setIndexOfItem, setNewItemName)}
            editItem={(store: string, item: string) => editItem(store, item, shoppingList, setStoreOfItem, setIndexOfItem, setNewItemName)}
            newItemName={newItemName}
            setNewItemName={setNewItemName}
            indexOfItem={indexOfItem}
            storeOfItem={storeOfItem}
            />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#40146B',
      paddingTop: 50,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#F5A318',
    },
  });
