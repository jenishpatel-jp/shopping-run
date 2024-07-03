import Items from '@/components/Items/Items';
import Lists from '@/components/Lists/Lists';
import Store from '@/components/Store/Store';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ShoppingRun() {

  const [storeList, setStoreList] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<{[key:string]: string[]} > ({});
  
  const [editingStoreIndex, setEditingStoreIndex] = useState<number | null>(null);
  const [newStoreName, setNewStoreName] = useState<string>('');

  const [newItemName, setNewItemName] = useState<string>("");
  const [storeOfItem, setStoreOfItem] = useState<string|null >("");
  const [indexOfItem, setIndexOfItem] = useState<number|null>(null);

  const addStore = (storeName: string ) => {
    if (storeName && !storeList.includes(storeName)){
      setStoreList([...storeList, storeName])
    }
  };

  const editStore = (storeIndex:number) => {
    setEditingStoreIndex(storeIndex);
    setNewStoreName(storeList[storeIndex]);
  };

  const updateStoreName = () => {
    if (editingStoreIndex !== null && newStoreName){
      const updatedStoreList = [...storeList];
      const oldStoreName = updatedStoreList[editingStoreIndex];
      updatedStoreList[editingStoreIndex] = newStoreName;

      setStoreList(updatedStoreList);
      
      setShoppingList(prevShoppingList =>  {
        const updatedShoppingList = { ...prevShoppingList };
        if (updatedShoppingList[oldStoreName]){
          updatedShoppingList[newStoreName] = updatedShoppingList[oldStoreName]
          delete updatedShoppingList[oldStoreName];
        }
        return updatedShoppingList;
      });

      setEditingStoreIndex(null);
      setNewStoreName("");
    }
  }

  const deleteStore = (storeIndex: number) => {
    const storeToDelete = storeList[storeIndex];
    const updatedStoreList = storeList.filter( store => store !== storeToDelete);
    setStoreList(updatedStoreList);

    setShoppingList(prevShoppingList => {
      const updatedShoppingList = {...prevShoppingList};
      delete updatedShoppingList[storeToDelete];
      return updatedShoppingList;
    })
  };


  const addItem = (store: string, item: string) => {
    if (store && item) {
      setShoppingList( prevList => {
        const items = prevList[store] ? [...prevList[store], item] : [item];
        const newList = {...prevList, [store]: items};
        return newList;
      } );
    }
  };

  const deleteItem = (store: string, item: string) => {
    setShoppingList(prevShoppingList => {
      const updatedShoppingList = {...prevShoppingList};
      if (updatedShoppingList[store]){
        updatedShoppingList[store] = updatedShoppingList[store].filter(i => i !== item);
      }
      return updatedShoppingList;
    })
  };

  const editItem = (store: string, item: string) => {
    setStoreOfItem(store);
    const index = shoppingList[store].indexOf(item);
    if (index !== -1){
      setIndexOfItem(index);
    }
    setNewItemName(shoppingList[store][index])
  };

  const updateItemName = () => {
    if (storeOfItem !== null && newItemName && indexOfItem!== null){
      setShoppingList(prevShoppingList => {
        const updatedShoppingList = {...shoppingList};
        updatedShoppingList[storeOfItem][indexOfItem] = newItemName;
      return (updatedShoppingList);
    });

    setStoreOfItem(null);
    setIndexOfItem(null);
    setNewItemName("");
  }
};

  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container}>
          <Store addStore={addStore} />
          <Items 
            storeList={storeList} 
            addItem={addItem} 
            editStore={editStore} 
            deleteStore={deleteStore} 
            updateStoreName={updateStoreName} 
            editingStoreIndex={editingStoreIndex} 
            newStoreName={newStoreName} 
            setNewStoreName={setNewStoreName} 
            />
          <Lists 
            shoppingList={shoppingList} 
            deleteItem={deleteItem}
            updateItemName={updateItemName}
            editItem={editItem}
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
