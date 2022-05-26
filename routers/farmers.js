const express = require("express");
const config = require("config");
const Farmers = require("../model/Farmer");
const auth = require("../middleware/response_auth");
const bcrypt = require("bcrypt");
const { patient } = require("../middleware/role");

const router = express.Router();

//add patient by the doctors
router.post("/addfarmers", [auth], async (req, res) => {
  const { name, phone, age, date, cnic } = req.body;

  Farmers.findOne({ cnic: cnic })
    .then((farmers) => {
      if (farmers === null) {
        console.log("hello");

        const obj = {
          name: name,
          phone: phone,
          age: age,
          date: date,
          cnic: cnic,
        };
        Farmers.create(obj, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log(docs);
            res.send(docs);
          }
        });
      } else {
        res.send("Farmer already register!");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/allfarmers", [auth], async (req, res) => {
  Farmers.find().then((farmers) => {
    res.send(farmers);
  });
});

router.put("/update", [auth], async (req, res) => {
  Farmers.updateOne(
    { cnic: req.body.cnic },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        date: req.body.date,
      },
    },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      res.json(doc);
    }
  );
});

router.post("/delete", [auth], async (req, res) => {
  Farmers.deleteOne(
    { cnic: req.body.cnic },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      res.json(doc);
    }
  );
});
module.exports = router;
