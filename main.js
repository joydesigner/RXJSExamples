"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by xinzheng on 8/6/17.
 */
var rxjs_1 = require("rxjs");
var numbers = [1, 5, 10];
var source = rxjs_1.Observable.from(numbers);
var MyObserver = (function () {
    function MyObserver() {
    }
    MyObserver.prototype.next = function (value) {
        console.log("value: " + value);
    };
    MyObserver.prototype.error = function (e) {
        console.log("error: " + e);
    };
    MyObserver.prototype.complete = function () {
        console.log("complete");
    };
    return MyObserver;
}());
var Obs = new MyObserver();
source.subscribe(Obs);
//# sourceMappingURL=main.js.map