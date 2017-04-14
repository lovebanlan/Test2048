var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var lion;
    (function (lion) {
        var data;
        (function (data) {
            var AnimateConfigVo = (function () {
                function AnimateConfigVo(time, distance) {
                    if (time === void 0) { time = .5; }
                    if (distance === void 0) { distance = 50; }
                    this.animateTime = time;
                    this.animateDistance = distance;
                }
                return AnimateConfigVo;
            }());
            data.AnimateConfigVo = AnimateConfigVo;
            __reflect(AnimateConfigVo.prototype, "com.lion.data.AnimateConfigVo");
        })(data = lion.data || (lion.data = {}));
    })(lion = com.lion || (com.lion = {}));
})(com || (com = {}));
//# sourceMappingURL=AnimateConfigVo.js.map