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
            var BaseUI = (function (_super) {
                __extends(BaseUI, _super);
                function BaseUI() {
                    var _this = _super.call(this) || this;
                    _this._displayWidth = -1;
                    _this._displayHeight = -1;
                    _this.isToStage = false;
                    _this.isCreated = false;
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.toStageHandler, _this);
                    return _this;
                }
                Object.defineProperty(BaseUI.prototype, "displayWidth", {
                    get: function () {
                        return this._displayWidth;
                    },
                    set: function (value) {
                        this._displayWidth = value;
                        this.resetPosition();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseUI.prototype, "displayHeighth", {
                    get: function () {
                        return this._displayHeight;
                    },
                    set: function (value) {
                        this._displayHeight = value;
                        this.resetPosition();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseUI.prototype, "displayRectangle", {
                    get: function () {
                        return this._displayRectangle;
                    },
                    set: function (value) {
                        this._displayRectangle = value;
                        this.resetPosition();
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseUI.prototype.resetDisplaySize = function (wid, hei) {
                    this._displayWidth = wid;
                    this._displayHeight = hei;
                    this.resetPosition();
                };
                BaseUI.prototype.startLogic = function () {
                };
                BaseUI.prototype.resetPosition = function () {
                    this.x = this._displayRectangle.x + (this._displayRectangle.width - this.displayWidth) / 2;
                    this.y = this.displayRectangle.y + (this.displayRectangle.height - this.displayHeighth) / 2;
                };
                BaseUI.prototype.toStageHandler = function (evt) {
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.offStageHandler, this);
                    this.isToStage = true;
                    if (this.isCreated) {
                        this.startLogic();
                    }
                };
                BaseUI.prototype.childrenCreated = function () {
                    this.isCreated = true;
                    if (this.isToStage) {
                        this.startLogic();
                    }
                };
                BaseUI.prototype.offStageHandler = function (evt) {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.offStageHandler, this);
                };
                BaseUI.prototype.destory = function () {
                    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.toStageHandler, this);
                    //this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.offStageHandler, this);
                    this.offStageHandler(null);
                };
                return BaseUI;
            }(egret.Sprite));
            display.BaseUI = BaseUI;
            __reflect(BaseUI.prototype, "com.lion.display.BaseUI");
        })(display = lion.display || (lion.display = {}));
    })(lion = com.lion || (com.lion = {}));
})(com || (com = {}));
//# sourceMappingURL=BaseUI.js.map