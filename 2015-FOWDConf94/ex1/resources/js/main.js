(function() {

	var terms = [
		"build tools",
		"package managers",
		"task runners",
		"minifiers",
		"compilers",
		"linters",
		"test suites",
		"communities",
		"โปรแกรมเมอร์"
	];

	var lib = window.ExampleLib = {

		getRandomWord: function() {
			var randomIndex = Math.floor(Math.random() * terms.length);
			return terms[randomIndex];
		},

		updateElement: function(el, time) {
			var updateMethod = function() {
					el.innerHTML = lib.getRandomWord();
				},
				updateInterval = setInterval(updateMethod, time);
			(updateMethod)();
			return {
				stopUpdating: function() {
					clearInterval(updateInterval);
				}
			};
		}

	};

})();
