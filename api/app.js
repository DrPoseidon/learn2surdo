const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes_mongoose");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT);
