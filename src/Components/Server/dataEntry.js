import mongoose from "mongoose";

//Schema is done
const dataSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
});

//we make a model
const DataEntry = mongoose.model("DataEntry", dataSchema);

//we export here
export default DataEntry;
