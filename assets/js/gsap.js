/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/js/gsap.js":
/*!*******************************!*\
  !*** ./src/public/js/gsap.js ***!
  \*******************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar timeline = document.getElementById(\"timeline\");\nvar timelineDrag = document.getElementById(\"timelineDrag\");\nvar timelineProgress = document.getElementById(\"timelineProgress\");\n\nvideo.onplay = function () {\n  gsap.ticker.add(vidUpdate);\n};\n\nvideo.onpause = function () {\n  gsap.ticker.remove(vidUpdate);\n};\n\nvideo.onended = function () {\n  gsap.ticker.remove(vidUpdate);\n};\n\nfunction displayTimeSpan(time) {\n  if (time < 60) {\n    return new Date(time * 1000).toISOString().substring(14, 19);\n  } else if (time >= 3600) {\n    return new Date(time * 1000).toISOString().substring(11, 19);\n  }\n}\n\nfunction vidUpdate() {\n  TweenMax.set(timelineProgress, {\n    scaleX: (video.currentTime / video.duration).toFixed(5),\n    time: function time() {\n      currentTimeSpan.innerText = displayTimeSpan(Math.ceil(video.currentTime));\n    }\n  });\n  TweenMax.set(timelineDrag, {\n    x: (video.currentTime / video.duration * timeline.offsetWidth).toFixed(4),\n    time: function time() {\n      currentTimeSpan.innerText = displayTimeSpan(Math.ceil(video.currentTime));\n    }\n  });\n}\n\nDraggable.create(timelineDrag, {\n  type: \"x\",\n  trigger: timeline,\n  bounds: timeline,\n  onPress: function onPress(e) {\n    video.currentTime = this.x / this.maxX * video.duration;\n    TweenMax.set(this.target, {\n      x: this.pointerX - timeline.getBoundingClientRect().left\n    });\n    this.update();\n    var progress = this.x / timeline.offsetWidth;\n    TweenMax.set(timelineProgress, {\n      scaleX: progress\n    });\n  },\n  onDrag: function onDrag() {\n    video.currentTime = this.x / this.maxX * video.duration;\n    var progress = this.x / timeline.offsetWidth;\n    TweenMax.set(timelineProgress, {\n      scaleX: progress\n    });\n  },\n  onClick: function onClick() {\n    video.currentTime = this.x / this.maxX * video.duration;\n    var progress = this.x / timeline.offsetWidth;\n    TweenMax.set(timelineProgress, {\n      scaleX: progress\n    });\n  },\n  onRelease: function onRelease(e) {\n    e.preventDefault();\n  }\n});\n\n//# sourceURL=webpack://wetube/./src/public/js/gsap.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/public/js/gsap.js"]();
/******/ 	
/******/ })()
;