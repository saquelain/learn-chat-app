import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    username: String,
    message: String,
    timesstamp: Date,
});

export const chatModel = mongoose.model('Chat', chatSchema);