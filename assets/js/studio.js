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

/***/ "./src/public/js/studio.js":
/*!*********************************!*\
  !*** ./src/public/js/studio.js ***!
  \*********************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar visibilitySelects = document.querySelectorAll(\"#visibilitySelect\");\n\nfunction handleChangeVisiblity(_x) {\n  return _handleChangeVisiblity.apply(this, arguments);\n}\n\nfunction _handleChangeVisiblity() {\n  _handleChangeVisiblity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {\n    var visibilitySelect, parentElement, video, id, response;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            visibilitySelect = e.target, parentElement = e.target.parentElement.parentElement.parentElement;\n            video = parentElement.querySelector(\"video\");\n            id = video.dataset.id;\n\n            if (visibilitySelect.value) {\n              _context.next = 5;\n              break;\n            }\n\n            return _context.abrupt(\"return\");\n\n          case 5:\n            _context.next = 7;\n            return fetch(\"/api/changeVisibility\", {\n              method: \"post\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                id: id,\n                visibility: visibilitySelect.value\n              })\n            });\n\n          case 7:\n            response = _context.sent;\n\n            if (!(response.status === 201)) {\n              _context.next = 10;\n              break;\n            }\n\n            return _context.abrupt(\"return\", alert(\"비디오 공개 여부가 변경됐습니다.\"));\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _handleChangeVisiblity.apply(this, arguments);\n}\n\nvisibilitySelects.forEach(function (visibilitySelect) {\n  return visibilitySelect.addEventListener(\"change\", handleChangeVisiblity);\n});\n\n//# sourceURL=webpack://wetube/./src/public/js/studio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/public/js/studio.js"]();
/******/ 	
/******/ })()
;