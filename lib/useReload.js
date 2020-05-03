"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useReload = function () {
    var _a = react_1.useState(false), _ = _a[0], setReload = _a[1];
    return function () {
        setReload(function (reload) { return !reload; });
    };
};
exports.default = useReload;
//# sourceMappingURL=useReload.js.map