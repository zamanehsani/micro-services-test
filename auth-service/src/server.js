// const app = require("./app");
import { app } from "./app.js";
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
