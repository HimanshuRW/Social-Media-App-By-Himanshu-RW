const mongoose = require('mongoose');
mongoose.connect(process.env.DB_KEY
// ,{
//     useCreateIndex:true,
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }
).then(()=>{
    console.log("Database Connection Successfull...");
}).catch(e=>console.log(e));