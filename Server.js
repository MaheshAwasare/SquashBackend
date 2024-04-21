const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
  });

  

  //Start the server
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
