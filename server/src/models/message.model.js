import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    messageText: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString()
    },
    received: {
        type: Boolean,
        default: false
    }
});

//Restring to only return limited message information
messageSchema.methods.toJSON = function() {
    const message = this;
    const messageObj = message.toObject();

    delete messageObj.__v;

    return messageObj;
}

const messageModal = mongoose.model('message', messageSchema);


export default messageModal;