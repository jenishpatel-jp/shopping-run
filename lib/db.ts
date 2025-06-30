import { type SQLiteDatabase } from "expo-sqlite";

// setup the database scheme

export const setupDatabase = async (db: SQLiteDatabase) => {

    try {
        await db.execAsync('PRAGMA jounal_mode = WAL;');

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS stores (
                storeId INTEGER PRIMARY KEY AUTOINCREMENT,
                storeName TEXT NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS items (
                itemId INTEGER PRIMARY KEY AUTOINCREMENT,
                itemName TEXT NOT NULL UNIQUE
            );

            `);
    }catch(error){
        console.error("Error setting up database:", error);
        throw error;
    }

}