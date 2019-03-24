import mongoose from "mongoose";
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  userType: { type: "String", required: true },
  userName: { type: "String", required: true },
  userID: { type: "String", required: true },
  category: { type: "String", required: true },
  title: { type: "String", required: true },
  content: { type: "String", required: true },
  url: { type: "String", required: true },
  slug: { type: "String", required: true },
  objectId: { type: "String", required: true },
  dateAdded: { type: "Date", default: Date.now, required: true }, //Converted to type String in Database
  resolveStatus: { type: "Boolean", required: true },
  replyscuid: [String]
});

export default mongoose.model("Issues", issueSchema);

