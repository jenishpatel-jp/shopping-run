import { type SQLiteDatabase } from "expo-sqlite";

// setup the database scheme

export const setupDatabase = async (db: SQLiteDatabase) => {

    try {
        await db.execAsync('PRAGMA jounal_mode = WAL;');

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS stores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );

            `);
    }catch(error){
        console.error("Error setting up database:", error);
        throw error;
    }

}