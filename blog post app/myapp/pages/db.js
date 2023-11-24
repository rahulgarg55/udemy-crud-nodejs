import {client} from 'pg'; //imports client object from 'pg' module.
const db = new client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});
db.connect()
.then(()=>{
  console.log('connected to pg database');
})
.catch((err)=>{
  console.log('error connecting to pg database',err);
});