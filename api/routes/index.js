const express = require("express");
const app = express();
const {
  Gestures,
  Categories,
  Users,
  Progress,
  GestureProgress,
  TestResults,
} = require("./db");

app.get("/", (req, res) => {
  res.send("Learn2Surdo API");
});

app.post("/add-gesture", async (req, res) => {
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

app.post("/add-multiple-gestures", async (req, res) => {
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

app.post("/add-multiple-categories", async (req, res) => {
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

app.get("/all-gestures", async (req, res) => {
  await Gestures.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/gesture", async (req, res) => {
  const { category } = req.body;
  await Gestures.find({ category })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/get-categories", async (req, res) => {
  await Categories.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/delete-gesture", async (req, res) => {
  const { id } = req.body;
  await Gestures.deleteOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/refresh-gesture-information", async (req, res) => {
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

app.post("/resfresh-category-information", async (req, res) => {
  const { _id, title } = req.body;
  await Categories.updateOne({ _id }, { title })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.post("/delete-category", async (req, res) => {
  const { _id } = req.body;
  await Categories.deleteOne({ _id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/register", async (req, res) => {
  await Users.findOne({ login: req.body.login }).then((result) => {
    if (!result) {
      Users.create(req.body)
        .then(() => {
          Users.findOne({ login: req.body.login }).then((element) => {
            res.send({
              id: element._id,
              login: element.login,
              role: element.role,
            });
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

app.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne(req.body);
    if (user) {
      res.send({ id: user._id, login: user.login, role: user.role });
    } else {
      res.send({ message: "?????????????????????? ???????????? ?????????? ?????? ????????????" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/get-progress", async (req, res) => {
  try {
    const progress = await Progress.findOne(req.body);
    res.send(progress);
  } catch (err) {
    console.log(err);
  }
});

app.post("/set-progress", async (req, res) => {
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

app.post("/add-gesture-progress", async (req, res) => {
  await GestureProgress.insertMany(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/get-gesture-progress", async (req, res) => {
  await GestureProgress.find(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/set-test-result", async (req, res) => {
  await TestResults.create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/get-test-results", async (req, res) => {
  await TestResults.find(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
