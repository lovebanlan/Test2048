var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene(row, col) {
        var _this = _super.call(this) || this;
        _this.colNum = 4;
        _this.rowNum = 4;
        _this.space = 20;
        _this.gap = 5;
        _this.len = 50;
        _this.needAnimate = true;
        _this.aniTime = 300;
        _this.aniSpeed = 600;
        _this.timeSpend = 0;
        _this.score = 0;
        _this.minDis = 20;
        _this.colNum = col;
        _this.rowNum = row;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    MainScene.prototype.init = function () {
        this.squareLayer = new egret.Sprite();
        this.touchLayer = new egret.Sprite();
        this.addChild(this.squareLayer);
        this.addChild(this.touchLayer);
        var rate1 = 1 / 15;
        var rate2 = 4 / 15;
        this.len = 1080 / (rate2 + (1 + rate1) * this.colNum + rate2);
        this.gap = this.len * rate1;
        this.space = this.len * rate2;
        for (var i = 0; i < this.rowNum; i++) {
            for (var j = 0; j < this.colNum; j++) {
                var shape = new egret.Shape();
                shape.graphics.beginFill(0xeaeaea, .8);
                shape.graphics.drawRoundRect(this.space + this.gap + j * (this.gap + this.len), this.space + this.gap + i * (this.gap + this.len), this.len, this.len, this.len / 4, this.len / 4);
                shape.graphics.endFill();
                this.squareLayer.addChild(shape);
            }
        }
        shape = new egret.Shape();
        shape.graphics.lineStyle(this.space / 10, 0xCC6600, .5);
        shape.graphics.moveTo(this.space, this.space);
        shape.graphics.lineTo(this.gap + this.space + (this.len + this.gap) * this.colNum, this.space);
        shape.graphics.lineTo(this.gap + this.space + (this.len + this.gap) * this.colNum, this.gap + this.space + (this.len + this.gap) * this.rowNum);
        shape.graphics.lineTo(this.space, this.gap + this.space + (this.len + this.gap) * this.rowNum);
        shape.graphics.lineTo(this.space, this.space);
        this.squareLayer.addChild(shape);
        this.timeTxt = new egret.TextField();
        this.scoreTxt = new egret.TextField();
        this.timeTxt.width = this.scoreTxt.width = 500;
        this.timeTxt.height = this.scoreTxt.height = this.len / 2;
        this.timeTxt.x = this.space + this.gap;
        this.scoreTxt.x = 540 + this.space;
        this.timeTxt.y = this.scoreTxt.y = this.space;
        //this.timeTxt.border = this.scoreTxt.border = true;
        this.timeTxt.size = this.scoreTxt.size = this.len / 3;
        this.addChild(this.timeTxt);
        this.addChild(this.scoreTxt);
        this.timeTxt.textAlign = egret.HorizontalAlign.LEFT;
        this.scoreTxt.textAlign = egret.HorizontalAlign.LEFT;
        this.timeTxt.text = "Time: ";
        this.scoreTxt.text = "Score: ";
        this.squareLayer.y = this.timeTxt.y + this.timeTxt.height - this.space;
        this.beginPoint = new egret.Point();
        this.initKey();
        this.squareMap = new SquareMap(this.rowNum, this.colNum);
        this.addRandomSquare();
        com.lion.managers.SecondManager.getInstance().addItem(this);
    };
    MainScene.prototype.updateSecond = function (seconds) {
        this.timeSpend++;
        console.log(this.timeSpend);
        this.timeTxt.text = "Time: " + this.getTimeString(this.timeSpend);
    };
    MainScene.prototype.addScore = function (score) {
        this.score += score;
        this.scoreTxt.text = "Score: " + this.score;
    };
    MainScene.prototype.initKey = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    };
    MainScene.prototype.unableKey = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    };
    MainScene.prototype.touchBeginHandler = function (evt) {
        this.beginPoint.x = evt.stageX;
        this.beginPoint.y = evt.stageY;
    };
    MainScene.prototype.touchEndHandler = function (evt) {
        var lenx = this.beginPoint.x - evt.stageX;
        var leny = this.beginPoint.y - evt.stageY;
        var direction = 0;
        if (Math.abs(lenx) < this.minDis && Math.abs(leny) < this.minDis)
            return;
        var va = 0;
        if (Math.abs(lenx) > Math.abs(leny))
            va = lenx < 0 ? 4 : 3;
        else
            va = leny < 0 ? 2 : 1;
        this.animateSquares(va);
    };
    MainScene.prototype.animateSquares = function (direction) {
        this.addScore(this.squareMap.moveSquares(direction));
        if (!this.squareMap.anyChange)
            return;
        this.unableKey();
        var arr = this.squareMap.getAllSquares();
        if (this.needAnimate) {
            for (var i = 0; i < arr.length; i++) {
                var square = arr[i];
                var newPt = this.getPositionByIndexes(square.position.y, square.position.x);
                square.alpha = 1;
                if (i != arr.length - 1) {
                    egret.Tween.get(square).to({ x: newPt.x, y: newPt.y }, this.aniTime);
                }
                else {
                    egret.Tween.get(square).to({ x: newPt.x, y: newPt.y }, this.aniTime).call(this.animateOver, this, [arr]);
                }
            }
        }
        else {
            for (i = 0; i < arr.length; i++) {
                square = arr[i];
                newPt = this.getPositionByIndexes(square.position.y, square.position.x);
                square.alpha = 1;
                square.x = newPt.x;
                square.y = newPt.y;
            }
            this.animateOver(arr);
        }
    };
    MainScene.prototype.animateOver = function (arr) {
        this.squareMap.updateSquares();
        this.squareMap.resetMap();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].isRemoved) {
                this.squareLayer.removeChild(arr[i]);
            }
            else {
                arr[i].isMegered = false;
                this.squareMap.setSquare(arr[i]);
            }
        }
        this.addRandomSquare();
        if (!this.squareMap.checkAlive()) {
            console.log("dead");
            // SecondManager.getInstance().removeItem(this);
            return;
        }
        this.initKey();
    };
    MainScene.prototype.addRandomSquare = function () {
        var square = this.getRandomSquare();
        if (!square)
            return;
        this.squareLayer.addChild(square);
        this.squareMap.setSquare(square);
        var spt = this.getPositionByIndexes(square.position.y, square.position.x);
        square.x = spt.x;
        square.y = spt.y;
        square.width = this.len;
        square.height = this.len;
        square.alpha = 0;
        egret.Tween.get(square).to({ alpha: 1 }, this.aniTime);
    };
    MainScene.prototype.getPositionByIndexes = function (row, col) {
        var pt = new egret.Point();
        pt.x = this.space + this.gap + col * (this.gap + this.len);
        pt.y = this.space + this.gap + row * (this.gap + this.len);
        return pt;
    };
    MainScene.prototype.getRandomSquare = function () {
        var square = this.borrowSquare();
        var pt = this.squareMap.getAvailablePosition();
        if (!pt)
            return null;
        square.position = pt;
        return square;
    };
    MainScene.prototype.borrowSquare = function () {
        return new Square(this.len);
    };
    MainScene.prototype.returnSquare = function (square) {
        square = null;
    };
    MainScene.prototype.getTimeString = function (seconds, needHour) {
        if (needHour === void 0) { needHour = false; }
        var result = "";
        var hs = Math.floor(seconds / 3600).toString();
        var ms;
        if (needHour)
            ms = Math.floor((seconds % 3600) / 60).toString();
        else
            ms = Math.floor(seconds / 60).toString();
        var ss = (seconds % 60).toString();
        hs = hs.length < 2 ? "0" + hs : hs;
        ms = ms.length < 2 ? "0" + ms : ms;
        ss = ss.length < 2 ? "0" + ss : ss;
        if (needHour)
            result = hs + " : " + ms + " : " + ss;
        else
            result = ms + " : " + ss;
        return result;
    };
    return MainScene;
}(egret.Sprite));
__reflect(MainScene.prototype, "MainScene", ["com.lion.managers.interfaces.ISecondCountable"]);
//# sourceMappingURL=MainScene.js.map