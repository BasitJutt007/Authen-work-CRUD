import express from "express";
import formidable from "formidable";
import cors from "cors";
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dwyzguwaj",
  api_key: "115296989125151",
  api_secret: "XBs9DxEtZDNC1vNQYgbgjWbXsmU",
});

app.use(cors());

app.listen(port, () => {
  console.log("Backend Server is Running on Port 5000");
});

app.get("/checkFile/:filename", async function (req, res) {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "uploads", filename);

    try {
      await fs.promises.access(filePath);
      res.status(200).json({exists: true});
    } catch (error) {
      res.status(200).json({exists: false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Server error"});
  }
});
app.post("/upload/:filename", async function (req, res) {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "uploads", filename);

    // Check if the file exists
    try {
      await fs.promises.access(filePath);
    } catch (error) {
      res.status(400).json({error: "File does not exist"});
      return;
    }

    const stream = cloudinary.v2.uploader.upload_stream(
      {
        public_id: filename,
        resource_type: "auto",
        tags: ["filepond", "upload"],
      },
      (error, result) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .json({error: "Error while uploading file to Cloudinary"});
          return;
        }

        // Retrieve the URL from the Cloudinary response
        const {secure_url: fileUrl, public_id: id} = result;
        console.log("File uploaded to Cloudinary:", fileUrl);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({fileUrl, id});
      }
    );

    fs.createReadStream(filePath).pipe(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Server error"});
  }
});

console.log("This is __DIR: " + __dirname);

app.post("/uploadToLocal", async function (req, res) {
  try {
    const form = formidable({multiples: true});

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({error: "Error parsing form"});
        return;
      }

      if (!files.filepond || files.filepond.length === 0) {
        res.status(400).json({error: "No file uploaded"});
        return;
      }

      const file = files.filepond[0];
      const originalPath = file.filepath;
      const newFilename = file.originalFilename;
      const newFilePath = path.join(__dirname, "uploads", newFilename);

      // Create the uploads directory if it doesn't exist
      const uploadDir = path.join(__dirname, "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Read file from the temporary location
      const fileData = await fs.promises.readFile(originalPath);

      // Write the file to local storage
      await fs.promises.writeFile(newFilePath, fileData);

      // Send the file path back to the client
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json({id: newFilePath});
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Server error"});
  }
});
app.delete("/deleteFile/:filename", async function (req, res) {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  try {
    await fs.promises.unlink(filePath);
    res.status(200).json({message: "File deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error deleting file"});
  }
});
