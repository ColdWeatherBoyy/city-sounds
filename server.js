const express = require("express");
const { join } = require("path");
const { json, urlencoded } = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

// cors middleware
app.use(cors());

// express middleware for parsing
app.use(json());
app.use(
	urlencoded({
		extended: true,
	})
);

// setting static folder location
app.use(express.static(join(__dirname, "./")));

// creat a new route in that accepts a query parameter for deezer

app.get("/api/deezer/", async (req, res) => {
	try {
		const requestUrl = "https://api.deezer.com/user/637006841/playlists&limit=100";
		const headers = {
			"Content-Type": "application/json",
		};
		const response = await fetch(requestUrl, { headers });
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.log(error);
	}
});

app.get("/api/deezer/:searchId", async (req, res) => {
	try {
		const { searchId } = req.params;
		console.log(searchId);
		const requestUrl = `https://api.deezer.com/playlist/${searchId}`;
		const headers = {
			"Content-Type": "application/json",
		};
		const response = await fetch(requestUrl, { headers });
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.log(error);
	}
});

app.get("*", (req, res) => {
	res.sendFile(join(__dirname, "./index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
