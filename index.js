import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "romyy";
const yourPassword = "romyy";
const yourAPIKey = "38614128-e903-4831-8005-9d1687646580";
const yourBearerToken = "Bearer a6603dd9-f1cb-4946-802a-704dfdea3fc1";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const random =  await axios.get(API_URL + "random");
    //const result = random.data;
    res.render("index.ejs", { content : JSON.stringify(random.data) } );
  }catch(error){
    console.log(error);
  }
});

app.get("/basicAuth",async (req, res) => {
 try{
 //   const allend = await axios.get(`https://secrets-api.appbrewery.com/all?page=2`);
 // }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
 
  const all = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
    auth: {
        username: yourUsername,
        password: yourPassword
    },

}) 
res.render("index.ejs", {content : JSON.stringify(all.data)})
}catch(error){
  console.log(error.message)
}
});


app.get("/apiKey", async (req, res) => {
//  const emScore = 5;
//  const filter = `https://secrets-api.appbrewery.com/filter?score=${emScore}&apiKey=${yourAPIKey}`;
try{
  const filterAuth = await axios.get(API_URL+"filter",{
    params: {
      score : 5,
      apiKey : yourAPIKey,
    },
  });
  res.render("index.ejs", {content : JSON.stringify(filterAuth.data)})
}catch(error){console.log(error)}

});

app.get("/bearerToken", async (req, res) => {
  try{
    const id = 42;
    const bear = await axios.get(API_URL+`secrets/${id}`,{
      headers : {
        Authorization: yourBearerToken,
      },
    })
    res.render("index.ejs", {content: JSON.stringify(bear.data)});
  }catch(error){console.log(error)}

  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
