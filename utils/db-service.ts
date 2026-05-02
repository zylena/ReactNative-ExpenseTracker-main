import * as SQLite from 'expo-sqlite';

type SQLiteDatabase = SQLite.WebSQLDatabase;

let db: SQLiteDatabase | null = null;

export const getDBConnection = (): SQLiteDatabase => {
  if (db) return db;
  try {
    db = SQLite.openDatabase('expense.db');
    console.log('DB connected');
    return db;
  } catch (error) {
    console.error('DB connection failed:', error);
    throw new Error('Could not connect to database');
  }
};

// Helper to run a query with promise
const executeSql = (
  db: SQLiteDatabase,
  query: string,
  params: any[] = []
): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

// CREATE TABLE
export const createExpenseTypeTable = async (db: SQLiteDatabase): Promise<void> => {
  await executeSql(db, `
    CREATE TABLE IF NOT EXISTS expense_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);

  const defaultTypes = ['Food', 'Transport', 'Shopping', 'Bills'];
  for (const type of defaultTypes) {
    await executeSql(
      db,
      `INSERT OR IGNORE INTO expense_types (name) VALUES (?)`,
      [type]
    );
  }
};

// GET TYPES
export const getExpenseTypes = async (db: SQLiteDatabase): Promise<any[]> => {
  const result = await executeSql(db, `SELECT * FROM expense_types`);
  const rows = [];
  for (let i = 0; i < result.rows.length; i++) {
    rows.push(result.rows.item(i));
  }
  return rows;
};

// ADD
export const addExpenseType = async (db: SQLiteDatabase, name: string): Promise<void> => {
  await executeSql(db, `INSERT INTO expense_types (name) VALUES (?)`, [name]);
};

// UPDATE
export const updateExpenseType = async (db: SQLiteDatabase, id: number, name: string): Promise<void> => {
  await executeSql(db, `UPDATE expense_types SET name = ? WHERE id = ?`, [name, id]);
};

// DELETE
export const deleteExpenseType = async (db: SQLiteDatabase, id: number): Promise<void> => {
  await executeSql(db, `DELETE FROM expense_types WHERE id = ?`, [id]);
};