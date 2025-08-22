import mysql from 'mysql2/promise';

let connection;
const connectDB = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST ,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

}
    return connection;
};

export default connectDB;