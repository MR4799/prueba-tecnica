import express from 'express';
import app from "./models/server";
import './database/connect';
import users from './routes/users.routes';
import trucks from './routes/trucks.routes';
import locations from './routes/locations.routes';
import orders from './routes/orders.routes';
app.use(express.json())
const PORT = process.env.PORT
app.get('/', (_req, res) =>{
    console.log('OK');
    res.send('API running')
})
app.use('/users', users);
app.use('/trucks', trucks);
app.use('/locations', locations);
app.use('/orders', orders);
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    
})