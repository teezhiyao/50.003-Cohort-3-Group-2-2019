import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const replySchema = new Schema({
    reply: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    replyURL: { type: 'String', required: true}, 
    dateAdded: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Reply', replySchema);
