//(function() {
$(document).ready(function() {

	"use strict";

	var ipc = require("ipc");

    var tweetsDiv = document.getElementById("tweets");

    ipc.on("tweets", function(tweets) {
        if (!tweets) {
            return;
        }

        var chain = Promise.resolve();

        tweets.forEach(function(tweet) {
            var el = $('<div class="tweet" style="display: none">' + tweet.text + '</div>');
            tweetsDiv.appendChild(el[0]);
            chain = chain.then(function() {
                return new Promise(function(resolve) {
                    el.fadeIn(300, function() {
                        setTimeout(resolve, 50);
                    });
                });
            });
        });

    });

});