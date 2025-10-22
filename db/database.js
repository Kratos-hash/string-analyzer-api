import DataStore from "nedb-promises";


const db = DataStore.create({ filename: "strings.db", autoload: true });

export default db;