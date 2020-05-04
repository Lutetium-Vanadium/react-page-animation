"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
function PageAnimation(_a) {
    var children = _a.children, grid = _a.grid, timeout = _a.timeout, classExtension = _a.classExtension, _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.className, className = _c === void 0 ? null : _c, _d = _a.bias, bias = _d === void 0 ? "vertical" : _d;
    var history = react_router_dom_1.useHistory();
    var _e = react_1.useState([
        {
            Component: function (_a) {
                var className = _a.className;
                return (react_1.default.createElement("div", { className: className + " " + classExtension, style: {
                        position: "absolute",
                    } }, react_1.default.Children.map(children, function (element) {
                    return react_1.default.cloneElement(element, { location: history.location });
                })));
            },
            className: "",
            pathname: history.location.pathname,
            key: "start",
        },
    ]), pages = _e[0], setPages = _e[1];
    react_1.useEffect(function () {
        var unlisten = history.listen(function (location) {
            setPages(function (pages) {
                var _a;
                if (location.pathname === pages[pages.length - 1].pathname || !animate)
                    return pages;
                var dir = getDir(location.pathname, pages[pages.length - 1].pathname, grid, bias);
                var NewPage = function (_a) {
                    var className = _a.className;
                    return (react_1.default.createElement("div", { className: className + " " + classExtension, style: {
                            position: "absolute",
                        } }, react_1.default.Children.map(children, function (element) {
                        return react_1.default.cloneElement(element, { location: location });
                    })));
                };
                setTimeout(function () {
                    setPages(function (pages) {
                        pages[1].className = classExtension + "-done";
                        return pages.slice(1);
                    });
                }, timeout);
                var className = classExtension + "-" + dir;
                pages[pages.length - 1].className = className + "-leave";
                return __spreadArrays(pages, [
                    {
                        Component: NewPage,
                        className: className + "-enter",
                        pathname: location.pathname,
                        key: (_a = location.key) !== null && _a !== void 0 ? _a : Math.random().toPrecision(6),
                    },
                ]);
            });
        });
        return unlisten;
    }, [animate]);
    if (!animate) {
        return children;
    }
    return (react_1.default.createElement("div", { className: className }, pages.map(function (_a) {
        var Component = _a.Component, className = _a.className, key = _a.key;
        console.log(key);
        return react_1.default.createElement(Component, { className: className, key: key });
    })));
}
exports.default = PageAnimation;
var getDir = function (pathname, prevpath, grid, bias) {
    var pathnameIndex;
    var prevpathIndex;
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (grid[i][j].test(pathname)) {
                pathnameIndex = [j, i];
            }
            if (grid[i][j].test(prevpath)) {
                prevpathIndex = [j, i];
            }
        }
    }
    if (!pathnameIndex || !prevpathIndex || pathnameIndex === prevpathIndex) {
        return "nothing";
    }
    if (bias === "vertical") {
        if (pathnameIndex[1] < prevpathIndex[1])
            return "top";
        if (pathnameIndex[1] > prevpathIndex[1])
            return "bottom";
        if (pathnameIndex[0] < prevpathIndex[0])
            return "left";
        if (pathnameIndex[0] > prevpathIndex[0])
            return "right";
    }
    else if (bias === "horizontal") {
        if (pathnameIndex[0] < prevpathIndex[0])
            return "left";
        if (pathnameIndex[0] > prevpathIndex[0])
            return "right";
        if (pathnameIndex[1] < prevpathIndex[1])
            return "top";
        if (pathnameIndex[1] > prevpathIndex[1])
            return "bottom";
    }
    if (pathname.split("/").length > prevpath.split("/").length)
        return "same-forward";
    if (pathname.split("/").length < prevpath.split("/").length)
        return "same-backward";
    return "same";
};
//# sourceMappingURL=PageAnimation.js.map