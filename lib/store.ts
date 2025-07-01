import { type SQLiteDatabase } from "expo-sqlite";

export const useDatabase = (db: SQLiteDatabase) => {

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

    return { addStore }


};