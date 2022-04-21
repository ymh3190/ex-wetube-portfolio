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

/***/ "./src/public/js/watch/like.js":
/*!*************************************!*\
  !*** ./src/public/js/watch/like.js ***!
  \*************************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar video = document.querySelector(\"video\");\nvar userImg = document.getElementById(\"userImg\");\nvar likeIcon = document.getElementById(\"likeIcon\");\nvar dislikeIcon = document.getElementById(\"dislikeIcon\");\nvar likedCount = document.getElementById(\"likedCount\");\n\nfunction countLike(count) {\n  likedCount.innerText = count;\n\n  if (likeIcon.style.color === \"\") {\n    likeIcon.style.color = \"blue\";\n  } else {\n    likeIcon.style.color = \"\";\n  }\n}\n\nfunction handleClickLike() {\n  return _handleClickLike.apply(this, arguments);\n}\n\nfunction _handleClickLike() {\n  _handleClickLike = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var videoId, userId, response, _yield$response$json, liked;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            videoId = video.dataset.id;\n            userId = userImg.dataset.id;\n            _context.next = 4;\n            return fetch(\"/api/like\", {\n              method: \"post\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                videoId: videoId,\n                userId: userId\n              })\n            });\n\n          case 4:\n            response = _context.sent;\n\n            if (!(response.status === 201)) {\n              _context.next = 11;\n              break;\n            }\n\n            _context.next = 8;\n            return response.json();\n\n          case 8:\n            _yield$response$json = _context.sent;\n            liked = _yield$response$json.liked;\n            countLike(liked);\n\n          case 11:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _handleClickLike.apply(this, arguments);\n}\n\nlikeIcon.addEventListener(\"click\", handleClickLike);\n\n//# sourceURL=webpack://wetube/./src/public/js/watch/like.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/public/js/watch/like.js"]();
/******/ 	
/******/ })()
;