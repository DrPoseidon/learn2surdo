// const { Router } = require("express");
// const router = Router();
// const bodyParser = require("body-parser");
// const { MongoClient, ObjectID } = require("mongodb");
// const uri =
//   "mongodb+srv://DrPoseidon:I2DGNYEtkCk5au5a@drposeidoncluster.cy20x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const cors = require("cors");
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
// router.use(bodyParser.json());
// router.use(cors());

// async function loadMongoCollection() {
//   try {
//     const client = await MongoClient.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("connection successful");
//     return client.db("learn2sudo").collection("collection");
//   } catch (err) {
//     console.log(err);
//   }
// }

// //добавление в базу
// router.post("/add", urlencodedParser, async (req, res) => {
//   const col = await loadMongoCollection();
//   try {
//     const { image, title, price, article, available, category } = req.body;
//     await col.insertOne({
//       image,
//       title,
//       price,
//       article,
//       available,
//       category,
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   res.status(201).send();
// });

// module.exports = router;
