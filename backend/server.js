import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import departmentRoute from "./routes/departemntRoute.js";
import courseRoute from "./routes/courseRoutes.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://student-management-five-delta.vercel.app",
    ],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", studentRoutes);
app.use("/api", departmentRoute);
app.use("/api", authRoute);
app.use("/api", courseRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
