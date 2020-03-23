import mongoose from 'mongoose';
import { database } from '../../config.js';

const URL = database.url;

export async function connect(){
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
        console.log('DB MONGODB is connected');
}
catch(e){
    console.log('something goes wrong');
    console.log(e);
    }
}