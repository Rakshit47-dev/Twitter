const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database'); 
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likeRoutes');

const app = express();
app.use(cors({
  origin: "http://mypostapp.s3-website.eu-north-1.amazonaws.com", 
  credentials: true,               
})); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use('/api/v1/likes', likeRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT,'0.0.0.0', async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected.");

    await db.sync(); 
    console.log("📦 Models synchronized.");

    console.log(`🚀 Server is running on PORT: ${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
});
