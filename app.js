const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static(__dirname))// Static is used to fetch local files when external css are embededd
app.use(bodyParser.urlencoded({extended: true}));// bodyParser is needfull in extracting data



app.get('/', function (req, res){
  res.sendFile(__dirname + "/Signup.html")
});

app.post('/', function(req, res){

const firstname = req.body.fName;
const lastname = req.body.lName;
const email = req.body.email;

console.log(firstname, lastname,email);


var data = {
  members:[
    {
    email_address: email,
    status: "subscribed",
    merge_fields:{
      FNAME: firstname,
      LNAME: lastname,
    }
  }
]
};


const jsonData = JSON.stringify(data);
const url ="https://us14.api.mailchimp.com/3.0/lists/315e238a0a";


const options = {
  method: "POST",
  auth: "Beniah:56d4c0c2236ecf3516aeca42998c02e7-us14"
}
const request =  https.request(url,options, function(response){

  if(response.statusCode === 200) {

res.sendFile(__dirname + "/Success.html");
} else{
  res.sendFile(__dirname + "/Failure.html");
}

response.on("data", function(data){
  console.log(JSON.parse(data));
})
})
// request.write(jsonData);
request.write(jsonData);
request.end();
});

//failure route
app.post("/Failure", function(req, res){
  res.redirect('/');
})







app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on port 3000")
});

//us14

//API key
//56d4c0c2236ecf3516aeca42998c02e7-us14

//List ID
// 315e238a0a
