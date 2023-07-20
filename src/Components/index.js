import express from "express";
import mongoose from "mongoose";
import DataEntry from "./Server/dataEntry.js";
import cors from "cors";
const app = express();
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/UserData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Data Connection is Open!");
  })
  .catch((err) => {
    console.log("Connection Error");
    console.log(err);
  });

app.use(express.json());

app.post("/UserInfo", async (req, res) => {
  const {Email, Password, PhoneNumber} = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await DataEntry.findOne({Email});
    if (existingUser) {
      return res.status(400).json({message: "Email already taken"});
    }

    const newData = new DataEntry({Email, Password, PhoneNumber});
    await newData.save();
    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving data");
  }
});

app.post("/UserSignIn", async (req, res) => {
  const {Email, Password} = req.body;

  // Query the MongoDB collection to find the user by email
  const user = await DataEntry.findOne({Email});

  // Check if the user exists and compare the password
  if (!user || user.Password !== Password) {
    return res.status(401).json({message: "Invalid email or password"});
  }

  // User is authenticated, return success response
  return res.status(200).json({message: "Sign-in successful"});
});

app.listen(3000, () => {
  console.log("App is Listening to Port 3000!");
});

//Display Data in Dashboard
app.get("/UserInfo", async (req, res) => {
  try {
    const users = await DataEntry.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting data");
  }
});

// Delete user by ID
app.delete("/UserInfo/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const result = await DataEntry.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
});

// Update user by ID
app.put("/UserInfo/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {Email, Password, PhoneNumber} = req.body;
    const user = await DataEntry.findByIdAndUpdate(
      id,
      {Email, Password, PhoneNumber},
      {new: true} // This option returns the updated document
    );
    res.status(200).json({message: "User updated successfully", user});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
});
