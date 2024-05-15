import Items from '@/components/Items';
import Lists from '@/components/Lists';
import Store from '@/components/Store';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ShoppingRun() {
  const [storeList, setStoreList] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<{[key:string]: string[]} > ({});

  const addStore = (storeName: string ) => {
    if (storeName && !storeList.includes(storeName)){
      setStoreList([...storeList, storeName])
    }
  };

  const editStore = (storeIndex:number) => {
    console.log(`Editing store: ${storeList[storeIndex]}`)
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
  }

  const addItem = (store: string, item: string) => {
    if (store && item) {
      setShoppingList( prevList => {
        const items = prevList[store] ? [...prevList[store], item] : [item];
        const newList = {...prevList, [store]: items};
        return newList;
      } );
    }
  };

  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container}>
          <Store addStore={addStore} />
          <Items storeList={storeList} addItem={addItem} editStore={editStore} deleteStore={deleteStore} />
          <Lists shoppingList={shoppingList}/>
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
