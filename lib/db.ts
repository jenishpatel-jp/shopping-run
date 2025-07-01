import { type SQLiteDatabase } from "expo-sqlite";

// setup the database scheme

export const setupDatabase = async (db: SQLiteDatabase) => {

    try {
        
        await db.execAsync(`PRAGMA foreign_keys = ON;`)

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS stores (
                storeId INTEGER PRIMARY KEY AUTOINCREMENT,
                storeName TEXT NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS items (
                itemId INTEGER PRIMARY KEY AUTOINCREMENT,
                storeId INTEGER NOT NULL,
                itemName TEXT NOT NULL UNIQUE,
                completed INTEGER NOT NULL DEFAULT 0,
                quantity INTEGER NOT NULL,
                FOREIGN KEY (storeId) REFERENCES stores(storeId) ON DELETE CASCADE
            );

            `);
    }catch(error){
        console.error("Error setting up database:", error);
        throw error;
    }

}