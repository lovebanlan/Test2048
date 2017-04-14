var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    var lion;
    (function (lion) {
        var display;
        (function (display) {
            var BaseScene = (function (_super) {
                __extends(BaseScene, _super);
                function BaseScene(mainScene, animateVo) {
                    if (animateVo === void 0) { animateVo = null; }
                    var _this = _super.call(this) || this;
                    _this.mainScene = mainScene;
                    if (animateVo == null) {
                        _this.animateVo = new com.lion.data.AnimateConfigVo();
                    }
                    else {
                        _this.animateVo = animateVo;
                    }
                    return _this;
                }
                BaseScene.prototype.show = function (data) {
                    this.showData = data;
                    egret.Tween.removeTweens(this);
                    this.mainScene.addChild(this);
                    this.y = this.animateVo.animateDistance;
                    this.alpha = 0;
                    egret.Tween.get(this).to({ y: 0, alpha: 1 }, this.animateVo.animateTime).call(this.showAnimateOver);
                };
                BaseScene.prototype.hide = function () {
                    this.touchChildren = false;
                    egret.Tween.removeTweens(this);
                    egret.Tween.get(this).to({ y: this.animateVo.animateDistance, alpha: 0 }, this.animateVo.animateTime).call(this.hideAnimateOver);
                };
                BaseScene.prototype.hideAnimateOver = function () {
                    this.alpha = 1;
                    this.y = 0;
                    if (this.parent)
                        this.mainScene.removeChild(this);
                };
                BaseScene.prototype.showAnimateOver = function () {
                    this.touchChildren = true;
                };
                return BaseScene;
            }(display.BaseUI));
            display.BaseScene = BaseScene;
            __reflect(BaseScene.prototype, "com.lion.display.BaseScene");
        })(display = lion.display || (lion.display = {}));
    })(lion = com.lion || (com.lion = {}));
})(com || (com = {}));
//# sourceMappingURL=BaseScene.js.map