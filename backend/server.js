import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./utilities/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js"



dotenv.config({ quiet: true });
// rest object

//middlewares
const app = express();
app.use(cors())
app.use(json())


//rest api
app.use("/api/user",userRoutes);

//Port
const PORT = process.env.PORT;
//app

app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`);
   connectDB();

});
