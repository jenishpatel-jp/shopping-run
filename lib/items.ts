import { type SQLiteDatabase } from "expo-sqlite";

export const useItemDatabase = (db: SQLiteDatabase) => {

    // Add a new item to the database 
    const addItem = async (storeId: number, itemName: string, quantity: number, completed: number) => {
        try {
            const result = await db.runAsync(
                `INSERT INTO items (storeId, itemName, quantity, completed) VALUES (?, ?, ?, ?);`,
                [storeId, itemName, quantity, completed ? 1 : 0]
            );
            console.log("Item added successfully:", result);
        } catch (error){
            console.error("Error addting item:", error);
            throw error;
        }
    };

    // Delete an item from the database
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

    // Delete all items from the database
    const deleteAllItems = async () => {
        try {
            const result = await db.runAsync('DELETE FROM items;');
            console.log("All items deleted successfully:", result);

        } catch (error) {
            console.error("Error deleting all items:", error);
            throw error;
        }
    };

    // Fetch all items from the database
    type Items = {
        itemId: number;
        storeId: number;
        itemName: string;
        quantity: number;
        completed: number;
    };


    // Returns an array of objects with itemId, storeId, itemName, quantity, and completed
    const fetchAllItems = async () => {
        try {
            const result = await db.getAllAsync<Items>(
                `SELECT itemId, storeId, itemName, quantity, completed FROM items;`
            );
            return result;
        } catch (error){
            console.error("Error fetching items:", error);
            throw error;    
        }
    };

    const updateItem = async (itemId: number, completed: number) => {
        try {
            const result = await db.runAsync(
                `UPDATE items 
                SET completed = ?
                WHERE itemId = ?;`,
                [completed, itemId]
            );
            console.log("Item updated successfully:", result);

        } catch (error) {
           console.error("Error updating item:", error); 
        }
    };

    return { addItem, deleteItem, deleteAllItems, fetchAllItems, updateItem };

}