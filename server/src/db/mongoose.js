import mongoose from "mongoose";
import Pusher from "pusher";

const DB_URL = process.env.MONGO_DB_URL;

mongoose.connect(DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Adding Pusher for messages synching
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true
});

const db = mongoose.connection;
db.once("open", () => {
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType == "insert") {
      const { _id, name, messageText, timestamp, received} = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        _id,
        name,
        messageText,
        timestamp,
        received
      });
    } else {
      console.log('Error triggering Pusher...')
    }
  });
});
