var mongoose = require("mongoose");

var audioClip = mongoose.Schema({
    name: String, // display name for clip
    path: String, // path on server
    length: Number, // length in seconds
    sampleRate: Number, // sample rate (44100, 48000, 88200, 96000)
    bitDepth: Number, // bit depth (16, 24)
    position: Number // position in seconds on the timeline
});

exports.AudioClip = mongoose.model("audioClip", audioClip);