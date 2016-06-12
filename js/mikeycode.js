/*
 * mikeycode-JS ~ 
 * :: Now with support for touch events and multiple instances for 
 * :: those situations that call for multiple easter eggs!
 * Code: https://github.com/snaptortoise/mikeycode-js
 * Examples: http://www.snaptortoise.com/mikeycode-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.5 (3/2/2016)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var MikeyCode = function (callback) {
	var mikeycode = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event, ref_obj);
				}
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		input: "",
		pattern: "10910510710112110511511610410198101115116",
		load: function (link) {
			this.addEvent(document, "keydown", function (e, ref_obj) {
				if (ref_obj) mikeycode = ref_obj; // IE
				mikeycode.input += e ? e.keyCode : event.keyCode;
				if (mikeycode.input.length > mikeycode.pattern.length)
					mikeycode.input = mikeycode.input.substr((mikeycode.input.length - mikeycode.pattern.length));
				if (mikeycode.input == mikeycode.pattern) {
					mikeycode.code(link);
					mikeycode.input = "";
					e.preventDefault();
					return false;
				}
			}, this);
			this.iphone.load(link);
		},
		code: function (link) {
			window.location = link
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tap: false,
			capture: false,
			orig_keys: "",
			keys: ["DOWN", "DOWN", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
			code: function (link) {
				mikeycode.code(link);
			},
			load: function (link) {
				this.orig_keys = this.keys;
				mikeycode.addEvent(document, "touchmove", function (e) {
					if (e.touches.length == 1 && mikeycode.iphone.capture == true) {
						var touch = e.touches[0];
						mikeycode.iphone.stop_x = touch.pageX;
						mikeycode.iphone.stop_y = touch.pageY;
						mikeycode.iphone.tap = false;
						mikeycode.iphone.capture = false;
						mikeycode.iphone.check_direction();
					}
				});
				mikeycode.addEvent(document, "touchend", function (evt) {
					if (mikeycode.iphone.tap == true) mikeycode.iphone.check_direction(link);
				}, false);
				mikeycode.addEvent(document, "touchstart", function (evt) {
					mikeycode.iphone.start_x = evt.changedTouches[0].pageX;
					mikeycode.iphone.start_y = evt.changedTouches[0].pageY;
					mikeycode.iphone.tap = true;
					mikeycode.iphone.capture = true;
				});
			},
			check_direction: function (link) {
				x_magnitude = Math.abs(this.start_x - this.stop_x);
				y_magnitude = Math.abs(this.start_y - this.stop_y);
				x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
				y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
				result = (x_magnitude > y_magnitude) ? x : y;
				result = (this.tap == true) ? "TAP" : result;

				if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
				if (this.keys.length == 0) {
					this.keys = this.orig_keys;
					this.code(link);
				}
			}
		}
	}

	typeof callback === "string" && mikeycode.load(callback);
	if (typeof callback === "function") {
		mikeycode.code = callback;
		mikeycode.load();
	}

	return mikeycode;
};
