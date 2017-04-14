var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var lion;
    (function (lion) {
        var managers;
        (function (managers) {
            var SecondManager = (function () {
                function SecondManager() {
                    if (SecondManager.instance) {
                        throw new Error("second manager is singlon");
                    }
                    SecondManager.instance = this;
                    this.seconds = 0;
                    this.items = [];
                    this.lastTime = egret.getTimer();
                    this.seconds = 0;
                    managers.EnterFrameManager.getInstance().addItem(this);
                }
                SecondManager.getInstance = function () {
                    if (SecondManager.instance == null) {
                        SecondManager.instance = new SecondManager();
                    }
                    return SecondManager.instance;
                };
                SecondManager.prototype.updateFrame = function (frameNum) {
                    var newTime = egret.getTimer();
                    if (newTime - this.lastTime - this.seconds * SecondManager.secondTime > SecondManager.secondTime) {
                        this.seconds = Math.floor((newTime - this.lastTime) / SecondManager.secondTime);
                        console.log(this.items);
                        for (var i = this.items.length - 1; i > -1; i--) {
                            this.items[i].updateSecond(this.seconds);
                        }
                    }
                };
                SecondManager.prototype.addItem = function (item) {
                    var ind = this.items.indexOf(item);
                    if (ind == -1)
                        this.items.push(item);
                };
                SecondManager.prototype.removeItem = function (item) {
                    var ind = this.items.indexOf(item);
                    if (ind != -1)
                        this.items.splice(ind, 1);
                };
                SecondManager.prototype.destory = function () {
                    if (SecondManager.instance) {
                        managers.EnterFrameManager.getInstance().removeItem(this);
                        this.items = [];
                        SecondManager.instance = null;
                    }
                };
                return SecondManager;
            }());
            SecondManager.secondTime = 1000;
            managers.SecondManager = SecondManager;
            __reflect(SecondManager.prototype, "com.lion.managers.SecondManager", ["com.lion.managers.interfaces.IEnterFrameAble"]);
        })(managers = lion.managers || (lion.managers = {}));
    })(lion = com.lion || (com.lion = {}));
})(com || (com = {}));
//# sourceMappingURL=SecondManager.js.map