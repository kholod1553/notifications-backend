import express from "express";
import notificationRoutes from "./src/modules/notification/notification.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notifications API is running");
});

app.use("/notifications", notificationRoutes);

export default app;