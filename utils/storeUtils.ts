export const addStore = (
    storeName: string, 
    storeList: string[], 
    setStoreList: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
    if (storeName && !storeList.includes(storeName)){
        setStoreList([...storeList, storeName]);
    }
};

export const editStore = (
    storeIndex: number, 
    storeList: string[],
    setEditingStoreIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setNewStoreName: React.Dispatch<React.SetStateAction<string>>
) => {
    setEditingStoreIndex(storeIndex);
    setNewStoreName(storeList[storeIndex])
};

export const updateStoreName = (
    editingStoreIndex: number | null,
    newStoreName: string, 
    storeList: string[],
    setStoreList: React.Dispatch<React.SetStateAction<string[]>>,
    setShoppingList: React.Dispatch<React.SetStateAction<{ [key: string] : string[]}>>,
    setEditingStoreIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setNewStoreName: React.Dispatch<React.SetStateAction<string>>
) => {
    //updating the store name
    if (editingStoreIndex !== null && newStoreName){
        const updatedStoreList = [...storeList];
        const oldStoreName = updatedStoreList[editingStoreIndex];
        updatedStoreList[editingStoreIndex] = oldStoreName;
        setStoreList(updatedStoreList);


    //updating the store name in the shopping list 
        setShoppingList(prevShoppingList => {
            const updatedShoppingList = {...prevShoppingList};
            if (updatedShoppingList[oldStoreName]){
                updatedShoppingList[newStoreName] = updatedShoppingList[oldStoreName];
                delete updatedShoppingList[oldStoreName];
            }
            return updatedShoppingList
        });
        setEditingStoreIndex(null);
        setNewStoreName("");
    }
};

export const deleteStore = (
    storeIndex: number,
    storeList: string[],
    setStoreList: React.Dispatch<React.SetStateAction<string[]>>,
    setShoppingList: React.Dispatch<React.SetStateAction<{ [key:string] : string[] }>>
) => {
    //Delete the store from the store list array
    const storeToDelete = storeList[storeIndex];
    const updatedStoreList = storeList.filter(store => store !== storeToDelete);
    setStoreList(updatedStoreList);

    //Delete the store from the shopping list object
    setShoppingList(prevShoppingList => {
        const updatedShoppingList = { ...prevShoppingList };
        delete updatedShoppingList[storeToDelete];
        return updatedShoppingList;
    });
};

export const deleteStoreIfNoItems = (
    shoppingList:{ [key:string] : string[] },
    setShoppingList: React.Dispatch<React.SetStateAction< { [key:string] : string[] } >>
) => {

    let storeToDelete: string;

    for (const store in shoppingList){
        if (shoppingList[store].length === 0){
            storeToDelete = store;
        }
    };

    setShoppingList(prevShoppingList => {
        const updatedShoppingList = { ...prevShoppingList };
        delete updatedShoppingList[storeToDelete];
        return updatedShoppingList;
    })
}

