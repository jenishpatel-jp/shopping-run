import { type SQLiteDatabase } from "expo-sqlite";

export const useItemDatabase = (db: SQLiteDatabase) => {

    // Add a new item to the database 
    const addItem = async (storeId: number, itemName: string, quantity: number, completed: boolean) => {
        try {
            const result = await db.runAsync(
                `INSERT INTO items (storeId, itemName, quanntity, completed) VALUES (?, ?, ?, ?);`,
                [storeId, itemName, quantity, completed ? 1 : 0]
            );
            console.log("Item added successfully:", result);
        } catch (error){
            console.error("Error addting item:", error);
            throw error;
        }
    };

    const deleteItem = async (itemId: number) => {
        try {
            const result = await db.runAsync(
                `DELETE FROM items WHERE itemId = ?;`, [itemId]
            );
            if (result.changes > 0){
                console.log("Item deleted successfully:", itemId);
            } else {
                console.log("No item found with ID:", itemId);
            }
        } catch (error ){
            console.error("Error deleting item:", error);
            throw error;
        }
    };

}