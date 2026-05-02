import SQLite from 'react-native-sqlite-storage';


export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'expense.db', location: 'default' });
};


// CREATE TABLE
export const createExpenseTypeTable = async (db:any) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS expense_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);

  const defaultTypes = ['Food', 'Transport', 'Shopping', 'Bills'];

  for (const type of defaultTypes) {
    await db.executeSql(
      `INSERT OR IGNORE INTO expense_types (name) VALUES (?)`,
      [type]
    );
  }
};

// GET TYPES
export const getExpenseTypes = async (db:any) => {
  const results = await db.executeSql(`SELECT * FROM expense_types`);
  return results[0].rows.raw();
};

// ADD
export const addExpenseType = async (db:any, name:any) => {
  await db.executeSql(
    `INSERT INTO expense_types (name) VALUES (?)`,
    [name]
  );
};

// UPDATE
export const updateExpenseType = async (db:any, id:any, name:any) => {
  await db.executeSql(
    `UPDATE expense_types SET name = ? WHERE id = ?`,
    [name, id]
  );
};

// DELETE
export const deleteExpenseType = async (db:any, id:any) => {
  await db.executeSql(
    `DELETE FROM expense_types WHERE id = ?`,
    [id]
  );
};