var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SquareMap = (function () {
    function SquareMap(row, col) {
        this.anyChange = true;
        this.row = row;
        this.col = col;
        this.resetMap();
    }
    SquareMap.prototype.resetMap = function () {
        this.smap = [];
        for (var i = 0; i < this.row; i++) {
            var temp = [];
            for (var j = 0; j < this.col; j++) {
                temp.push(null);
            }
            this.smap.push(temp);
        }
    };
    SquareMap.prototype.getAvailablePosition = function () {
        if (!this.anyChange)
            return null;
        var pt = new egret.Point();
        do {
            pt.x = Math.floor(Math.random() * this.col);
            pt.y = Math.floor(Math.random() * this.row);
        } while (this.smap[pt.y][pt.x]);
        return pt;
    };
    SquareMap.prototype.moveSquares = function (direction) {
        var score = 0;
        var temp;
        var getFunc;
        var limit;
        var att;
        this.anyChange = false;
        if (direction < 3) {
            temp = this.col;
            //	getFunc = this.getSquareByCol;
            att = "y";
            limit = direction == 1 ? 0 : this.row - 1;
        }
        else {
            temp = this.row;
            //	getFunc = this.getSquareByRow;
            att = "x";
            limit = direction == 3 ? 0 : this.col - 1;
        }
        for (var i = 0; i < temp; i++) {
            var arr;
            if (direction < 3)
                arr = this.getSquareByCol(i, direction % 2);
            else
                arr = this.getSquareByRow(i, direction % 2);
            for (var j = 1; j < arr.length; j++) {
                if (arr[j] == null)
                    continue;
                for (var k = j - 1; k > -1; k--)
                    if (arr[k] && arr[k].isRemoved == false)
                        break;
                if (k < 0) {
                    arr[j].position[att] = limit;
                    this.anyChange = true;
                }
                else {
                    if (arr[k].isMegered || arr[k].num != arr[j].num) {
                        var newAtt = arr[k].position[att] + (direction % 2 ? 1 : -1);
                        if (arr[j].position[att] != newAtt) {
                            this.anyChange = true;
                            arr[j].position[att] = newAtt;
                        }
                    }
                    else if (arr[k].num == arr[j].num) {
                        arr[j].isRemoved = true;
                        arr[j].position = arr[k].position;
                        arr[k].isMegered = true;
                        arr[k].num *= 2;
                        this.anyChange = true;
                        score++;
                    }
                }
            }
        }
        return score;
    };
    SquareMap.prototype.updateSquares = function () {
        for (var i = 0; i < this.row; i++)
            for (var j = 0; j < this.col; j++)
                if (this.smap[i][j] && this.smap[i][j].isRemoved == false)
                    this.smap[i][j].update();
    };
    SquareMap.prototype.checkAlive = function () {
        for (var i = 0; i < this.row; i++)
            for (var j = 0; j < this.col; j++)
                if (this.smap[i][j] == null)
                    return true;
        for (i = 0; i < this.row; i++)
            for (j = 0; j < this.col; j++) {
                if (i < this.row - 1) {
                    if (this.smap[i][j].num == this.smap[i + 1][j].num)
                        return true;
                }
                if (j < this.col - 1) {
                    if (this.smap[i][j].num == this.smap[i][j + 1].num)
                        return true;
                }
            }
        return false;
    };
    SquareMap.prototype.setSquare = function (square) {
        this.smap[square.position.y][square.position.x] = square;
    };
    /**
     *
     * @param row
     * @param direction 非0表示从右往左 ；0表示从左往右
     * @return
     *
     */
    SquareMap.prototype.getSquareByRow = function (row, direction) {
        var arr = [];
        for (var i = 0; i < this.smap[row].length; i++)
            arr.push(this.smap[row][i]);
        if (direction)
            return arr;
        else
            return arr.reverse();
    };
    /**
     *
     * @param col
     * @param direction 非0表示从上往下，0表示从下往上
     * @return
     *
     */
    SquareMap.prototype.getSquareByCol = function (col, direction) {
        var arr = [];
        for (var i = 0; i < this.row; i++) {
            arr.push(this.smap[i][col]);
        }
        if (direction)
            return arr;
        else
            return arr.reverse();
    };
    SquareMap.prototype.getAllSquares = function () {
        var arr = [];
        for (var i = 0; i < this.smap.length; i++)
            for (var j = 0; j < this.smap[i].length; j++)
                if (this.smap[i][j])
                    arr.push(this.smap[i][j]);
        return arr;
    };
    return SquareMap;
}());
__reflect(SquareMap.prototype, "SquareMap");
//# sourceMappingURL=SquareMap.js.map