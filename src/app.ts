import express from 'express';
import app from "./models/server";
import './database/connect';
app.use(express.json())
const PORT = process.env.PORT
app.get('/', (req, res) =>{
    console.log('OK');
    res.send('API running')
})
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    
})