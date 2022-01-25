const http = require("./src/http")
const request = require("./src/request")

const res = request.builder()
  .withBaseURL("https://reqres.in")
  .withPath("/api/users")
  .build()
  .execute(http.get)

res.then(res => console.log(res.data))
  .catch(err => console.error(err))
