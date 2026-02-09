const app = express();
app.use(express.json());
app.use("/notifications", notificationRoutes);
export default app;