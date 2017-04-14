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
            var BaseMainScene = (function (_super) {
                __extends(BaseMainScene, _super);
                function BaseMainScene() {
                    var _this = _super.call(this) || this;
                    _this.childrenRemainedNum = 0;
                    _this.sceneMap = {};
                    return _this;
                }
                BaseMainScene.prototype.registScene = function (sceneId, scene) {
                    this.destoryScene(sceneId);
                    this.sceneMap[sceneId] = scene;
                };
                BaseMainScene.prototype.getSceneById = function (sceneId) {
                    return this.sceneMap[sceneId];
                };
                BaseMainScene.prototype.init = function () {
                };
                BaseMainScene.prototype.toStageHandler = function (evt) {
                    _super.prototype.toStageHandler.call(this, evt);
                    this.init();
                };
                BaseMainScene.prototype.switchScene = function (sceneId, data) {
                    if (data === void 0) { data = null; }
                    if (this.currentSceneId == sceneId) {
                        return;
                    }
                    this.clearScene();
                    this.currentSceneId = sceneId;
                    var curScene = this.getSceneById(sceneId);
                    if (!curScene) {
                        console.log("no scene for id: " + sceneId);
                        return;
                    }
                    curScene.show(data);
                };
                BaseMainScene.prototype.destoryScene = function (sceneId) {
                    var curScene = this.getSceneById(sceneId);
                    if (curScene)
                        curScene.destory();
                    delete this.sceneMap[sceneId];
                };
                BaseMainScene.prototype.clearScene = function () {
                    var tempScene = this.getSceneById(this.currentSceneId);
                    if (tempScene)
                        tempScene.hide();
                };
                return BaseMainScene;
            }(display.BaseUI));
            display.BaseMainScene = BaseMainScene;
            __reflect(BaseMainScene.prototype, "com.lion.display.BaseMainScene");
        })(display = lion.display || (lion.display = {}));
    })(lion = com.lion || (com.lion = {}));
})(com || (com = {}));
//# sourceMappingURL=BaseMainScene.js.map