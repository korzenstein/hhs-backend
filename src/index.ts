import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import wardsRouter from "./routes/wards";
import nunrsesRouter from './routes/nurses'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

app.use("/wards", wardsRouter);
app.use("/nurses", nunrsesRouter);

app.get("/", (_, res) => {
  res.send("Nurse Management Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
