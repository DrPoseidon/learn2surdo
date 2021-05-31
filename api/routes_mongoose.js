const mongoose = require("mongoose");
const router = require("express").Router();
const dbConnectionString =
  "mongodb+srv://DrPoseidon:I2DGNYEtkCk5au5a@drposeidoncluster.cy20x.mongodb.net/learn2sudo?retryWrites=true&w=majority";
const Gestures = require("./models/gestures");
const Categories = require("./models/categories");
const Users = require("./models/users");
const Progress = require("./models/progress");
const GestureProgress = require("./models/gestureProgress");
const TestResults = require("./models/testResults");

try {
  mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connection successful");
} catch (err) {
  console.error(err);
}

router.get("/", (req, res) => {
  res.send("Learn2Surdo API");
});

router.post("/add-gesture", async (req, res) => {
  const { title, description, category } = req.body;

  await Gestures.find({ title })
    .then((result) => {
      if (!result.length) {
        const gesture = new Gestures({
          title,
          description,
          category,
        });
        try {
          gesture.save();
          res.sendStatus(201);
        } catch (err) {
          console.error(err);
        }
      } else {
        res.sendStatus(409);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/add-multiple-gestures", async (req, res) => {
  let arr = [];
  req.body.forEach((el) => {
    arr.push(el.title);
  });
  await Gestures.find({
    title: arr,
  })
    .then((result) => {
      if (!result.length) {
        Gestures.insertMany(req.body);
        res.sendStatus(201);
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post("/add-multiple-categories", async (req, res) => {
  let arr = [];
  req.body.forEach((el) => {
    arr.push(el.title);
  });
  await Categories.find({
    title: arr,
  })
    .then((result) => {
      if (!result.length) {
        Categories.insertMany(req.body);
        res.sendStatus(201);
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get("/all-gestures", async (req, res) => {
  await Gestures.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/gesture", async (req, res) => {
  const { category } = req.body;
  await Gestures.find({ category })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/get-categories", async (req, res) => {
  await Categories.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/delete-gesture", async (req, res) => {
  const { id } = req.body;
  await Gestures.deleteOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/refresh-gesture-information", async (req, res) => {
  const { _id, title, description, fileName } = req.body;
  if (fileName) {
    await Gestures.updateOne({ _id }, { title, description, fileName })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    await Gestures.updateOne({ _id }, { title, description })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

router.post("/resfresh-category-information", async (req, res) => {
  const { _id, title } = req.body;
  await Categories.updateOne({ _id }, { title })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.post("/delete-category", async (req, res) => {
  const { _id } = req.body;
  await Categories.deleteOne({ _id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/register", async (req, res) => {
  await Users.findOne({ login: req.body.login }).then((result) => {
    if (!result) {
      Users.create(req.body)
        .then(() => {
          Users.findOne({ login: req.body.login }).then((element) => {
            res.send({ id: element._id, login: element.login });
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.send("error");
    }
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne(req.body);
    if (user) {
      res.send({ id: user._id, login: user.login });
    } else {
      res.send({ message: "Неправильно введен логин или пароль" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/get-progress", async (req, res) => {
  try {
    const progress = await Progress.findOne(req.body);
    res.send(progress);
  } catch (err) {
    console.log(err);
  }
});

router.post("/set-progress", async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userID: req.body.userID,
      category: req.body.category,
    });
    if (!progress) {
      await Progress.create(req.body);
      res.sendStatus(200);
    } else {
      await Progress.updateOne(
        { _id: progress._id },
        { beginIndex: req.body.beginIndex }
      );
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-gesture-progress", async (req, res) => {
  await GestureProgress.insertMany(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/get-gesture-progress", async (req, res) => {
  await GestureProgress.find(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/set-test-result", async (req, res) => {
  await TestResults.create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
