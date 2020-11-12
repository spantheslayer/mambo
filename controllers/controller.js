var Userdb = require("../model/model");
const { use } = require("../routes/router");

// create & save new user
exports.create = (req, res) => {
  try {
    // Validate The Request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }

    // new user
    const user = new Userdb({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status,
    });

    // save user in the database
    user.save(user).then((data) => {
      res.send(data);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error Occured",
    });
  }
};

// retrieve & return all users / retrieve & return single user
exports.find = (req, res) => {
  try {
    try {
      if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id).then((data) => {
          if (!data) {
            res.status(404).send({ message: "Not found user with id " + id });
          } else {
            res.send(data);
          }
        });
      } else {
        Userdb.find().then((user) => {
          res.send(user);
        });
      }
    } catch (err) {
      res.status(500).send({ message: " error retrieving user with id" + id });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Error Occured" });
  }
};

//Update a new identified user by user id
exports.update = (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
      (data) => {
        if (!data) {
          res
            .status(400)
            .send({ message: `Cannot update user with ${id}. user not found` });
        } else {
          res.send(data);
        }
      }
    );
  } catch (err) {
    res.status(500).send({ message: "Error update user info" });
  }
};

// Delete a user with a specified user id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id).then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete With Id ${id}` });
      } else {
        res.send({
          message: "User was deleted successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "could not delete user id = " + id,
    });
  }
};
