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

