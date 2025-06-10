const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database'); 
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');


const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
})); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", commentRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected.");

    await db.sync({ force: true }); 
    console.log("📦 Models synchronized.");

    console.log(`🚀 Server is running on PORT: ${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
});
