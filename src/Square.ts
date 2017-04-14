class Square extends egret.Sprite{
	public isMegered = false;
	public isRemoved = false;
	public num = 2;
	public len = 80;
	public position:egret.Point;

	private colors = [0xD9ADAD, 0xE6B789, 0xF2C261, 0xFFCC00, 0xFF9965, 0xFF9932, 0xFF9900, 0xFF6602, 0xFF3300, 0xCC3200, 0xCC0000, 0x9A0000];
	private values = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
	private txt:egret.TextField;
	public constructor(len:number) {
		super();
		this.len = len;
		this.init();
	}
	private init():void{
		this.txt = new egret.TextField();
		this.txt.width = this.len;
		this.txt.height = this.len;
		this.txt.size = this.len / 3;
		this.txt.textAlign = egret.HorizontalAlign.CENTER;
		this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;

		this.addChild(this.txt);
		this.update();
	}
	public update():void
	{
		if(this.num)
		{
			for (var i = this.values.length - 1; i > -1 ; i--) 
				if(this.num >= this.values[i])
					break;
			
			this.graphics.clear();
			this.graphics.beginFill(this.colors[i]);
			this.graphics.drawRoundRect(0, 0, this.len, this.len, this.len / 4, this.len / 4);
			this.graphics.endFill();
			
			this.txt.text = this.num.toString();
		}
		else
			this.txt.text = "";
	}
}