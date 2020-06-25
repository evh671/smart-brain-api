const handleProfileGet = (req, res, db) => {
  const userId = req.params.userId;

  db.select("*")
    .from("users")
    .where("id", "=", userId)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User Not Found!");
      }
    })
    .catch((err) => res.status(400).json("Error Getting User!"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
