import mongoose from "mongoose";

const heartRateSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  bpm: {
    type: Number,
    required: true,
  },
  recordAt: {
    type: Date,
    default: Date.now,
  },
});

const HeartRate = mongoose.model("HeartRate", heartRateSchema);

export { HeartRate };
