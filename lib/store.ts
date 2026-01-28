import { type SQLiteDatabase } from "expo-sqlite";

export const useStoreDatabase = (db: SQLiteDatabase) => {

    // Add a new store to the database
    const addStore = async (storeName: string) => {
        try { 
            const result = await db.runAsync(
                'INSERT INTO stores (storeName) VALUES (?);', [storeName]
            );
            console.log("Store added successfully:", result);
        } catch (error) {
            console.error("Error adding store:", error);
            throw error;
        }
    };

    // Edit a store from the database 

    const editStore = async (storeId: number, storeName: string) => {
        try {
            const result = await db.runAsync(
                'Update stores SET storeName = ? WHERE storeId =? ;', [storeName, storeId]
            );
            if (result.changes > 0){
                console.log("Store updated successfully:", storeId);
            } else {
                console.log("No store found with ID:", storeId);
            }
            
        } catch (error){
            console.error("Error editing store:", error);
            throw error;
        }
    };

    // Delete a store from the database
    const deleteStore = async (storeId: number) => {
        try {
            const result = await db.runAsync(
                `DELETE FROM stores WHERE storeId = ?;`, [storeId]
            );
            if (result.changes > 0){
                console.log("Store deleted successfully:", storeId);
            } else {
                console.log("No store found with ID:", storeId);
            }
        } catch (error) {
            console.error("Error deleting store:", error);
            throw error;
        }
    };

    // Deleete all stores from the database
    const deleteAllStores = async () => {
        try {
            const result = await db.runAsync('DELETE FROM stores;');
            console.log("All stores deleted successfully:", result);
        } catch (error) {
            console.error("Error deleting all stores:", error);
            throw error;
        }
    };

    // fetch all stores from the database
    type Stores = {
        storeId: number;
        storeName: string;
    }


    // Returns ann array of objects with storeId and storeName
    const fetchStores = async() => {
        try {
            const result = await db.getAllAsync<Stores>(
                `SELECT storeId, storeName FROM stores;`
            );
            return result;
        } catch (error) {
            console.error("Error fetching stores:", error);
            throw error;
        };
    }


    return { addStore, editStore, deleteStore, deleteAllStores, fetchStores }

};