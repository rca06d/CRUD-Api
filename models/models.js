var mongoose = require("mongoose");

var audioClip = mongoose.Schema({
    name: String, // display name for clip
    mimeType: String,
    dateCreated: { type: Date, default: Date.now }, 
    transcript: String, // transcript of the video
    serverPath: String, // path on server
    clientPath: String, // path for use in browser
});

exports.AudioClip = mongoose.model("audioClip", audioClip);