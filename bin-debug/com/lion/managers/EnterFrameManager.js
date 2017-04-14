var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var lion;
    (function (lion) {
        var managers;
        (function (managers) {
            var EnterFrameManager = (function () {
                function EnterFrameManager() {
                    this.shape = new egret.Shape();
                    if (EnterFrameManager.instance) {
                        throw new Error("enterframe manager is singlon");
                    }
                    this.frameNumber = 0;
                    this.items = [];
                    this.shape.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
                }
                EnterFrameManager.getInstance = function () {
                    if (EnterFrameManager.instance == null) {
                        EnterFrameManager.instance = new EnterFrameManager();
                    }
                    return EnterFrameManager.instance;
                };
                EnterFrameManager.prototype.enterFrameHandler = function (evt) {
                    this.frameNumber++;
                    for (var i = 0; i < this.items.length; i++) {
                        this.items[i].updateFrame(this.frameNumber);
                    }
                };
                EnterFrameManager.prototype.addItem = function (item) {
                    var ind = this.items.indexOf(item);
                    if (ind == -1)
                        this.items.push(item);
                };
                EnterFrameManager.prototype.removeItem = function (item) {
                    var ind = this.items.indexOf(item);
                    if (ind != -1)
                        this.items.splice(ind, 1);
                };
                EnterFrameManager.prototype.destory = function () {
                    if (EnterFrameManager.instance) {
                        this.shape.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
                        this.items = [];
                        EnterFrameManager.instance = null;
                    }
                };
                return EnterFrameManager;
            }());
            managers.EnterFrameManager = EnterFrameManager;
            __reflect(EnterFrameManager.prototype, "com.lion.managers.EnterFrameManager");
        })(managers = lion.managers || (lion.managers = {}));
    })(lion = com.lion || (com.lion = {}));
})(com || (com = {}));
//# sourceMappingURL=EnterFrameManager.js.map