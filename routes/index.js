var AppController = require("../controllers/AppController");

module.exports = function(app) {

	app.get("/api/getclipbyid/:id", AppController.getClipById);
	app.get("/api/getclipbyname/:name", AppController.getClipByName);
	app.get("/api/getallclips", AppController.getAllClips);
	app.post("/api/uploadclip", AppController.uploadClip);
	app.put("/api/updateclip", AppController.updateClip);
	app.delete("/api/deleteclip/:id", AppController.deleteClip);

};