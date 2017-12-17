const express = require ('express');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.update({
  region: "us-east-1",
  endpoint: "arn:aws:dynamodb:us-east-1:704381840790:table/testDB"
});

let docClient = new AWS.DynamoDB.DocumentClient();

let table = "testDb";


AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack); 
  else console.log("Access Key and SecretAccessKey Obtained");
});

app.get('/', (req,res) => {
	res.sendFile(__dirname + 'index.html');
})

app.post('/', (req,res) => {
	let name = req.body.name;
	let email = req.body.email;
	let params = {
		TableName:table,
		Item:{	
			"email": email,
			"name": name
			}
				}

	console.log("Adding a new item...");
	docClient.put(params, function(err, data) {
	    if (err) {
	        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	        console.log("Added item:", JSON.stringify(data, null, 2));
}
}
)
})



app.listen(3000,() => {
	console.log('App has started on port 3000')
});

// let assumeRoleResult = AssumeRole(role-arn);
// let tempCredentials = new SessionAWSCredentials(
//    assumeRoleResult.AccessKeyId, 
//    assumeRoleResult.SecretAccessKey, 
//    assumeRoleResult.SessionToken);
// s3Request = CreateAmazonS3Client(tempCredentials);

// AWS.config.getCredentials(function(err) {
//   if (err) console.log(err.stack); // credentials not loaded
//   else console.log("Access Key:" +  AWS.config.credentials.accessKeyId);
// })