describe("ExampleLib", function() {

	"use strict";

	var lib = window.ExampleLib;

	describe("getRandomWord", function() {

		it("returns a word", function() {
			expect(lib.getRandomWord().length).toBeGreaterThan(0);
		});

	});

	describe("updateElement", function() {

		it("updates an element", function(done) {
			spyOn(lib, "getRandomWord").and.returnValue("FOWDconf");
			var testElement = document.createElement("div");
			var control = lib.updateElement(testElement, 250);
			setTimeout(function() {
				expect(testElement.innerHTML).toEqual("FOWDconf");
				control.stopUpdating();
				(done)();
			}, 300);
		});

	});

});