class SquareMap {
	public smap:Square[][];
	private row:number;
	private col:number;
	
	public anyChange = true;
	public constructor(row:number, col:number) {
		this.row = row;
		this.col = col;
		this.resetMap();
	}
	public resetMap():void
	{
		this.smap = [];
		for (var i = 0; i < this.row; i++) 
		{
			var temp:Square[] = [];
			for (var j = 0; j < this.col; j++) 
			{
				temp.push(null);
			}
			this.smap.push(temp);
		}
	}
	public getAvailablePosition():egret.Point
	{
		if(!this.anyChange)
			return null;
		var pt = new egret.Point();
		do 
		{
			pt.x = Math.floor(Math.random() * this.col);
			pt.y = Math.floor(Math.random() * this.row);
		} while(this.smap[pt.y][pt.x]);
		return pt;
	}
	public moveSquares(direction:number):number
	{
		var score = 0;
		var temp;
		var getFunc;
		var limit;
		var att:string;
		this.anyChange = false;
		if(direction < 3)
		{
			temp = this.col;
		//	getFunc = this.getSquareByCol;
			att = "y";
			limit = direction == 1 ? 0 : this.row - 1;
		}
		else
		{
			temp = this.row;
		//	getFunc = this.getSquareByRow;
			att = "x";
			limit = direction == 3 ? 0 : this.col - 1;
		}
		
		for (var i = 0; i < temp; i++) 
		{
			var arr:Square[];
			if(direction < 3)
				arr = this.getSquareByCol(i, direction % 2);
			else
				arr = this.getSquareByRow(i, direction % 2);
			for (var j = 1; j < arr.length; j++) 
			{
				if(arr[j] == null)
					continue;
				for (var k = j - 1; k > -1; k--) 
					if(arr[k] && arr[k].isRemoved == false)
						break;
				if(k < 0)
				{
					arr[j].position[att] = limit;
					this.anyChange = true;
				}
				else
				{
					if(arr[k].isMegered || arr[k].num != arr[j].num)
					{
						var newAtt = arr[k].position[att] + (direction % 2 ? 1 : -1);
						if(arr[j].position[att] != newAtt)
						{
							this.anyChange = true;
							arr[j].position[att] = newAtt;
						}
					}
					else if(arr[k].num == arr[j].num)
					{
						arr[j].isRemoved = true;
						arr[j].position = arr[k].position;
						arr[k].isMegered = true;
						arr[k].num *= 2;
						this.anyChange = true;
						score ++;
					}
				}
			}
		}
		
		return score;
	}
	
	public updateSquares():void
	{
		for (var i = 0; i < this.row; i++) 
			for (var j = 0; j < this.col; j++) 
				if(this.smap[i][j] && this.smap[i][j].isRemoved == false)
					this.smap[i][j].update();
	}
	public checkAlive():boolean
	{
		for (var i = 0; i < this.row; i++) 
			for (var j = 0; j < this.col; j++) 
				if(this.smap[i][j] == null)
					return true;
		for(i = 0 ; i < this.row ; i ++)
			for(j = 0 ; j < this.col ; j ++)
			{
				if(i < this.row - 1)
				{
					if(this.smap[i][j].num == this.smap[i + 1][j].num)
						return true;
				}
				if(j < this.col - 1)
				{
					if(this.smap[i][j].num == this.smap[i][j + 1].num)
						return true;
				}
			}
		
		return false;
	}
	public setSquare(square:Square):void
	{
		this.smap[square.position.y][square.position.x] = square;
	}
	/**
	 * 
	 * @param row
	 * @param direction 非0表示从右往左 ；0表示从左往右
	 * @return 
	 * 
	 */		
	public getSquareByRow(row:number, direction:number):Square[]
	{
		var arr = [];
		for(var i = 0 ; i < this.smap[row].length ; i ++)
			arr.push(this.smap[row][i]);
		if(direction)
			return arr;
		else
			return arr.reverse();
	}
	/**
	 *  
	 * @param col
	 * @param direction 非0表示从上往下，0表示从下往上
	 * @return 
	 * 
	 */		
	public getSquareByCol(col:number, direction:number):Square[]
	{
		var arr = [];
		for (var i = 0; i < this.row; i++) 
		{
			arr.push(this.smap[i][col]);
		}
		if(direction)
			return arr;
		else
			return arr.reverse();
	}
	public getAllSquares():Square[]
	{
		var arr = [];
		for (var i = 0; i < this.smap.length; i++) 
			for (var j = 0; j < this.smap[i].length; j++)
				if(this.smap[i][j])
					arr.push(this.smap[i][j]);
		return arr;
	}
}
