const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.static("public"))
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.q67w9vb.mongodb.net/registrationForm`,{
    useNewUrlParser : true , 
    useUnifiedTopology : true
})

const userSchema = mongoose.Schema({
    firstName : String , 
    secondName : String , 
    phoneNo : Number , 
    gender : String ,
    password : String , 
    email : String
})

const User = mongoose.model("User" , userSchema);
app.use(bodyParser.urlencoded(
    {
        extended : true
    }
))
app.get("/", (req, res) => {
    return res.redirect("index.html");
});

const PORT = 5000;
app.post('/signup', async(req, res) => {
    console.log(req.body);
    try{
        const { firstName , secondName , phoneNo , email , password , gender} = req.body;
        const userData = new User({
            firstName , 
            secondName  , 
            phoneNo  , 
            gender  ,
            password , 
            email 
        })
        await userData.save();
        res.redirect('/signup_success.html')
    }
    catch(err){
        console.log(err);
        res.redirect('error');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
