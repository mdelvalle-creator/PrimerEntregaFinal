const express = require("express");
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes);

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("Server listening on port " + listener.address().port);
});
