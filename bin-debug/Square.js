var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(len) {
        var _this = _super.call(this) || this;
        _this.isMegered = false;
        _this.isRemoved = false;
        _this.num = 2;
        _this.len = 80;
        _this.colors = [0xD9ADAD, 0xE6B789, 0xF2C261, 0xFFCC00, 0xFF9965, 0xFF9932, 0xFF9900, 0xFF6602, 0xFF3300, 0xCC3200, 0xCC0000, 0x9A0000];
        _this.values = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
        _this.len = len;
        _this.init();
        return _this;
    }
    Square.prototype.init = function () {
        this.txt = new egret.TextField();
        this.txt.width = this.len;
        this.txt.height = this.len;
        this.txt.size = this.len / 3;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.txt);
        this.update();
    };
    Square.prototype.update = function () {
        if (this.num) {
            for (var i = this.values.length - 1; i > -1; i--)
                if (this.num >= this.values[i])
                    break;
            this.graphics.clear();
            this.graphics.beginFill(this.colors[i]);
            this.graphics.drawRoundRect(0, 0, this.len, this.len, this.len / 4, this.len / 4);
            this.graphics.endFill();
            this.txt.text = this.num.toString();
        }
        else
            this.txt.text = "";
    };
    return Square;
}(egret.Sprite));
__reflect(Square.prototype, "Square");
//# sourceMappingURL=Square.js.map