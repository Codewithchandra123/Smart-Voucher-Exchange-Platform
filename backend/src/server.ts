import Env from "./config/env";
import app from "./app";
import { connectDatabase } from "./config/database";
import { initFirebase } from "./config/firebase";

import { initScheduler } from "./services/scheduler.service";
import mongoose from "mongoose"; // Added based on the 'mongoose.connect' in the provided code edit

async function startServer() {
  try {
    await mongoose.connect(Env.mongoUri);
    console.log("Connected to MongoDB via", Env.mongoUri);

    // Start automated tasks
    initScheduler();

    app.listen(Env.port, () => {
      console.log(`Server running on port ${Env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
