class MainScene extends egret.Sprite implements com.lion.managers.interfaces.ISecondCountable{

	private colNum = 4;
	private rowNum = 4;
	private space = 20;
	private gap = 5;
	private len = 50;
	
	private needAnimate = true;
	private aniTime = 300;
	private aniSpeed = 600;
	private squareMap:SquareMap;
	
	private timeSpend = 0;
	private score = 0;

	private beginPoint:egret.Point;
	private minDis:number = 20;

	private touchLayer:egret.Sprite;
	private squareLayer:egret.Sprite;

	private timeTxt:egret.TextField;
	private scoreTxt:egret.TextField;

	public constructor(row:number, col:number) {
		super();
		this.colNum = col;
		this.rowNum = row;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}
	private init():void
	{
		this.squareLayer = new egret.Sprite();
		this.touchLayer = new egret.Sprite();
		this.addChild(this.squareLayer);
		this.addChild(this.touchLayer);

		var rate1:number = 1 / 15;
		var rate2:number = 4 / 15
		this.len = 1080 / (rate2 + (1 + rate1) * this.colNum + rate2);
		this.gap = this.len * rate1;
		this.space = this.len * rate2;
	
		for (var i = 0; i < this.rowNum; i++) 
		{
			for (var j = 0; j < this.colNum; j++) 
			{
				var shape:egret.Shape = new egret.Shape();
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
		this.scoreTxt.x = 540 + this.space ;
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
	}
	public updateSecond(seconds:number):void{
		this.timeSpend ++;
		console.log(this.timeSpend);
		this.timeTxt.text = "Time: " + this.getTimeString(this.timeSpend);
	}
	private addScore(score:number):void{
		this.score += score;
		this.scoreTxt.text = "Score: " + this.score;
	}
	private initKey():void
	{
		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
	}
	private unableKey():void
	{
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
	}
	private touchBeginHandler(evt:egret.TouchEvent):void{
		this.beginPoint.x = evt.stageX;
		this.beginPoint.y = evt.stageY;
	}
	private touchEndHandler(evt:egret.TouchEvent):void{
		var lenx = this.beginPoint.x - evt.stageX;
		var leny = this.beginPoint.y - evt.stageY;
		var direction = 0;
		if(Math.abs(lenx) < this.minDis && Math.abs(leny) <　this.minDis)
			return;
		var va = 0;
		if(Math.abs(lenx) > Math.abs(leny))
			va = lenx < 0 ? 4 : 3;
		else
			va = leny < 0 ? 2 : 1;	
		this.animateSquares(va);
	}
	private animateSquares(direction:number):void
	{
		this.addScore(this.squareMap.moveSquares(direction));
		if(!this.squareMap.anyChange)
			return;
		this.unableKey();
		var arr = this.squareMap.getAllSquares();
		if(this.needAnimate)
		{
			for (var i = 0; i < arr.length; i++) 
			{
				var square:Square = arr[i];
				var newPt:egret.Point = this.getPositionByIndexes(square.position.y, square.position.x);
				square.alpha = 1;
				if(i != arr.length - 1)
					egret.Tween.get(square).to({x:newPt.x, y:newPt.y}, this.aniTime);
				else
					egret.Tween.get(square).to({x:newPt.x, y:newPt.y}, this.aniTime).call(this.animateOver, this, [arr]);
			}
		}
		else
		{
			for (i = 0; i < arr.length; i++) 
			{
				square = arr[i];
				newPt = this.getPositionByIndexes(square.position.y, square.position.x);
				square.alpha = 1;
				square.x = newPt.x;
				square.y = newPt.y;
			}
			
			this.animateOver(arr);
		}
	}
	private animateOver(arr:Square[]):void
	{
		this.squareMap.updateSquares();
		this.squareMap.resetMap();
		
		for (var i = 0; i < arr.length; i++) 
		{
			if(arr[i].isRemoved)
			{
				this.squareLayer.removeChild(arr[i]);
			}
			else
			{
				arr[i].isMegered = false;
				this.squareMap.setSquare(arr[i]);
			}
		}
		
		this.addRandomSquare();
		if(!this.squareMap.checkAlive())
		{
			console.log("dead");
			com.lion.managers.SecondManager.getInstance().removeItem(this);
			
			return;
		}
		this.initKey();
	}
	private addRandomSquare():void
	{
		var square:Square = this.getRandomSquare();
		if(!square)
			return;
		this.squareLayer.addChild(square);
		this.squareMap.setSquare(square);
		var spt:egret.Point = this.getPositionByIndexes(square.position.y, square.position.x);
		square.x = spt.x;
		square.y = spt.y;
		square.width = this.len;
		square.height = this.len;
		square.alpha = 0;
		egret.Tween.get(square).to({alpha:1}, this.aniTime);
	}
	private getPositionByIndexes(row:number, col:number):egret.Point
	{
		var pt = new egret.Point();
		pt.x = this.space + this.gap + col * (this.gap + this.len);
		pt.y = this.space + this.gap + row * (this.gap + this.len);
		return pt;
	}
	private getRandomSquare():Square
	{
		var square:Square = this.borrowSquare();
		var pt:egret.Point = this.squareMap.getAvailablePosition();
		if(!pt)
			return null;
		square.position = pt
		return square;
	}
	private borrowSquare():Square
	{
		return new Square(this.len);
	}
	private returnSquare(square:Square):void
	{
		square = null;
	}
	public getTimeString(seconds:number, needHour = false):string
	{
		var result:string = "";
		var hs:string = Math.floor(seconds / 3600).toString();
		var ms:string;
		if(needHour)
			ms = Math.floor((seconds % 3600) / 60).toString();
		else
			ms = Math.floor(seconds / 60).toString();
		var ss:string = (seconds % 60).toString();
		
		hs = hs.length < 2 ? "0" + hs : hs;
		ms = ms.length < 2 ? "0" + ms : ms;
		ss = ss.length < 2 ? "0" + ss : ss;
		
		if(needHour)
			result = hs + " : " + ms + " : " + ss;
		else
			result = ms + " : " + ss;
		
		return result;
	}
}