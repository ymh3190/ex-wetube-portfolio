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

/***/ "./src/public/js/history.js":
/*!**********************************!*\
  !*** ./src/public/js/history.js ***!
  \**********************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar deleteBtns = document.querySelectorAll(\"#deleteBtn\");\nvar leftDate = document.getElementById(\"leftDate\");\n\nfunction deleteHistory(dateContainer) {\n  var term = dateContainer.previousSibling;\n  leftDate.removeChild(dateContainer);\n  var dateContainers = leftDate.querySelectorAll(\".historycontainer-left-date__container\");\n\n  if (!dateContainers.length) {\n    leftDate.removeChild(term);\n  }\n}\n\nfunction handleClickDelete(_x) {\n  return _handleClickDelete.apply(this, arguments);\n}\n\nfunction _handleClickDelete() {\n  _handleClickDelete = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {\n    var id, dateContainer, response;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            id = e.target.dataset.id, dateContainer = e.target.parentElement.parentElement.parentElement;\n            _context.next = 3;\n            return fetch(\"/api/delHistory\", {\n              method: \"post\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                id: id\n              })\n            });\n\n          case 3:\n            response = _context.sent;\n\n            if (response.status === 201) {\n              deleteHistory(dateContainer);\n            }\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _handleClickDelete.apply(this, arguments);\n}\n\nif (deleteBtns) {\n  deleteBtns.forEach(function (deleteBtn) {\n    return deleteBtn.addEventListener(\"click\", handleClickDelete);\n  });\n}\n\n//# sourceURL=webpack://wetube/./src/public/js/history.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/public/js/history.js"]();
/******/ 	
/******/ })()
;