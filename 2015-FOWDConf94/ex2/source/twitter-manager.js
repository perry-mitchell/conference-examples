(function(module) {

	"use strict";

	var Twitter = require("twitter");

	var variablesInPlace = true,
		twitterKeys = require(global.__base + "/public/twitter-credentials.js");
		console.log(twitterKeys);

	var client = new Twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	var params = {
		screen_name: "perry_mitchell"
	};

	module.exports = {

		read: function(mainWindow) {
			client.get("statuses/user_timeline", params, function(error, tweets, response) {
				if (error) {
					console.log(error);
					return;
				}

				var textContentOfTweets = tweets.map(function(t) { return { text: t.text, user: t.user.screen_name }; });
				mainWindow.webContents.send("tweets", textContentOfTweets);
			});
		}

	};

})(module);