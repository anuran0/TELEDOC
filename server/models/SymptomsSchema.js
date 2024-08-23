import mongoose from "mongoose";

const SymptomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});

const Symptoms = mongoose.model("Symptoms", SymptomsSchema);

export default Symptoms;



