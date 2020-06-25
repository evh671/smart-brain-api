const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "08a27dddb7644acc8461f3ef7594ea7c",
});

const handleAPICall = (req, res) => {
  const { input } = req.body;

  app.models
    .predict("c0c0ac362b03416da06ab3fa36fb58e3", input)
    .then((response) => res.json(response))
    .catch((err) => {
      res.status(400).json("Unable To Work With API!");
    });
};

const handleImage = (req, res, db) => {
  const { userId } = req.body;

  db("users")
    .where("id", "=", userId)
    .increment("entries", 1)
    .returning("*")
    .then((currentUser) => {
      console.log("Current User: ", currentUser);
      res.json(currentUser[0]);
    })
    .catch((err) => res.status(400).json("Unable To Get Entries!"));
};

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall,
};
