const currentID = 124;
const database = {
  users: [
    {
      id: "123",
      name: "Andrei",
      email: "andrei@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

module.exports.users = database.users;
module.exports.currentID = currentID;
