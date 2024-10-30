import * as SQLite from 'expo-sqlite';

var db: SQLite.SQLiteDatabase | null = null;

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}


export const initDatabase = async (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            console.log(initDatabase);
            db = await SQLite.openDatabaseAsync('little_lemon');
            //Create table
            console.log("after open")
            await db.execAsync("CREATE TABLE IF NOT EXISTS menu " +
                "(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price DOUBLE NOT NULL, description TEXT NOT NULL, image TEXT NOT NULL, category TEXT NOT NULL)");
            console.log("after create table")
            resolve(true);
        } catch (err) {
            console.log("initdbError")
            reject(err);
        }
    });
}

export function getItemsByNameAndCategories(name: string, categories: string[]) {
    return new Promise<MenuItem[]>(async (resolve, reject) => {
        try {
            // Check if the database is initialized
            if (!db) {
                reject("Database not initialized");
                return;
            }
            // Construct the conditions based on whether `name` or `categories` have values
            const nameCondition = name ? `name LIKE '%' || ? || '%'` : '1=1';
            const categoryCondition = categories.length > 0
                ? `AND category IN (${categories.map(() => '?').join(', ')})`
                : '';

            // Construct the final SQL query
            const sql = `
        SELECT * 
        FROM menu
        WHERE ${nameCondition}
        ${categoryCondition}
    `;

            // Bind parameters only if `name` has a value
            const params = name ? [name, ...categories] : categories;

            // Bind the parameters: name first, followed by each category in the array
            let dbResult = await db.getAllAsync<MenuItem>(sql, params);
            console.log("dbresult")
            console.log(dbResult);
            resolve(dbResult);
            // Construct placeholders for each item in the categories array
        }catch(err){
            console.log("getItemserror")
            console.log(err);
        }
    })
}

export const insertMenuData = async (name: string, price: number, description: string, image: string, category: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            if (!db) {
                reject("Database not initialized");
                return;
            }
            console.log("inserting data")
            console.log(name, price, description, image, category);
            await db.execAsync(`INSERT INTO menu (name, price, description, image, category) VALUES ('${name}', ${price}, '${description}', '${image}', '${category}')`);
            resolve(true);
        } catch (err) {
            console.log("insermenutdata error")
            console.log(err);
            reject(err);
        }
    });
}

export const fetchMenuData = async (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const data = await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json");
            const json = await data.json();
            console.log("fetchmenudata")
            console.log(json);
            if (json && json.menu && json.menu.length > 0) {
                for (let i = 0; i < json.menu.length; i++) {
                    const item = json.menu[i];
                    await insertMenuData(item.name, item.price, item.description, item.image, item.category);
                }
            }
            resolve(true);
        } catch (err) {
            console.log("fetchMenuDataError")
            reject(err);
        }
    });
}
