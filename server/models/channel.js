import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, unique: true, lowercase: true, required: true },
  entries: { type: Array }
});

export default mongoose.model('channel', channelSchema);
