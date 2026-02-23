const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Database Connected Successfully");
    
}).catch(error=>{
    console.log("Database Connection Failed");
    console.log(error);
    
    
})