; (function () {
    "use strict"
    var _global;
    Array.prototype.superobject = function () {
        var result = {};
        this.map(function (a, i) {
            function findResult(kv, aValue) {
                if (result[kv] === undefined) {
                    result[kv] = { accurate: true, value: aValue, index: i, superInfo: '以获取精准定位，目标=this' };
                } else {
                    // 已经存在
                    if (result[kv].explainArr) {
                        result[kv].explainArr.push({ value: aValue, index: i });
                        result[kv].arr.push(aValue);
                    } else {
                        var obj = {
                            accurate: false,
                            superInfo: '目标包含多个搜索内容，具体见参数explainArr或arr',
                            explainArr: [],
                            arr: [],
                        };
                        delete result[kv].superInfo;
                        obj.explainArr.push(result[kv], { value: aValue, index: i });
                        obj.arr.push(result[kv].value, aValue);
                        result[kv] = obj;
                    }
                }
            }
            if (typeof a === 'object' && !(a instanceof Array)) {
                for (var key in a) {
                    if (typeof a[key] !== 'object') {
                        // condition key=value
                        var kv = key + '=' + a[key];
                        findResult(kv, a);
                    }
                }
            }
            if (typeof a !== 'object' && !(a instanceof Array)) {
                findResult(a, a);
            }
            if ((a instanceof Array)) {
                findResult('array(index=' + i + ')', a.superobject());
            }
        });
        return result;
    }
    // _global = (function () { return this || (0, eval)('this'); }());
    // if (typeof module !== "undefined" && module.exports) {
    //     module.exports = Array;
    // } else if (typeof define === "function" && define.amd) {
    //     define(function () { return Array; });
    // } else {
    //     !('Array' in _global) && (_global.Array = Array);
    // }
}());