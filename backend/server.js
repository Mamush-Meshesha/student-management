import express from 'express';
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api", studentRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});