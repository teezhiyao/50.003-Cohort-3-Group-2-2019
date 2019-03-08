import { Router } from "express";

const router = new Router();

var request = require("request");

var options = {
  method: "POST",
  url: "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users",
  headers: {
    "cache-control": "no-cache",
    "Server-Token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1cDZnbzhaNWtwTlI5bHk4U1lONEh5RlVTZEp2WE5oZkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MDEsImV4cCI6MTU1MjU0NDkwMSwiYXpwIjoiNXA2Z284WjVrcE5SOWx5OFNZTjRIeUZVU2RKdlhOaGYiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.cPm5fS0jQ2R60dtG5gsL97g0ukUGogB9KjbinzvOPHMCmC1YB58tnYTJle3BnG3DePzpQTQlpB9QSaOyE8uXsmNb1rFfOK9oFLLJ9pU7912oYp8KAHfXxtyYs_ajZ6Q9SWbYvPD9OAm5ZhpIb4OmQ4pUkwxoUwWejsHzh0K7u1987X-_wJt-XIb0vn1twJFoTI0qZ_pXwOo7TKNsjYDJkvvA3em-S2CYDqJmD7Nqsg3xEf0yPoH9SQiojqHQt7hgcsMymFVYuV5SOkYknMn3TFHGFQI-iQ3zftKm3iv6i3oxcFEceuOdjPGjXUSWN08xS6gJbxc5N9yzIBB6rgRI8A",
    "Content-Type": "application/json"
  },
  body: { username: "lmao", password: "nihaoma", phone: "415-392-0202" },
  json: true
};
//Creating a user
router.route("/createUser").post(function(req, res) {
  console.log(req);
  request(options, function(error, response, body) {
    console.log("error:", error); // Print the error if one occurred and handle it
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    res.send(body);
  });
});

export default router;
