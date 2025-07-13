import { type SQLiteDatabase } from "expo-sqlite";

export const useItemDatabase = (db: SQLiteDatabase) => {

    // Add a new item to the database 
    const addItem = async (storeId: number, itemName: string, quantity: number, completed: boolean) => {
        try {
            const result = await db.runAsync(
                `INSERT INTO items  (storeId, itemName, quanntity, completed) VALUES (?, ?, ?, ?);`,
                [storeId, itemName, quantity, completed ? 1 : 0]
            );
            console.log("Item added successfully:", result);
        } catch (error){
            console.error("Error addting item:", error);
            throw error;
        }
    };

}