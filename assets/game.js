(function(exports){

exports.cell = function() {
	function cell(x,y){
		this.generation = 0;
		this.coordinates = {};
		this.coordinates.x = x;
		this.coordinates.y = y;
		this.coordinates.toString = function() {
			return x.toString() + "," + y.toString();
		};
		this.neighbourCount = 0;
	};

	cell.prototype.getCoordinates = function() {
		return this.coordinates;
	};

	cell.prototype.getGeneration = function() {
		return this.generation;
	};	

	cell.prototype.incrementGeneration = function() {
		this.generation++;
	};

	cell.prototype.getNeighbourCount = function() {
		return this.neighbourCount;
	};

	cell.prototype.incrementNeighbourCount = function() {
		return ++this.neighbourCount;
	};
	
	cell.prototype.resetNeighbourCount = function() {
		this.neighbourCount = 0;
	};

	cell.prototype.listNeighbours = function () {
		var neighbours = [];
		neighbours.push((this.coordinates.x - 1).toString() + "," + (this.coordinates.y - 1).toString());
		neighbours.push((this.coordinates.x - 1).toString() + "," + (this.coordinates.y).toString());
		neighbours.push((this.coordinates.x - 1).toString() + "," + (this.coordinates.y + 1).toString());
		neighbours.push((this.coordinates.x).toString() + "," + (this.coordinates.y - 1).toString());
		neighbours.push((this.coordinates.x).toString() + "," + (this.coordinates.y + 1).toString());
		neighbours.push((this.coordinates.x + 1).toString() + "," + (this.coordinates.y - 1).toString());
		neighbours.push((this.coordinates.x + 1).toString() + "," + (this.coordinates.y).toString());
		neighbours.push((this.coordinates.x + 1).toString() + "," + (this.coordinates.y + 1).toString());
		return neighbours;		
	};

	cell.prototype.informNeighbours = function(cellGroup) {
		var neighbours = this.listNeighbours();
		for (var i = 0; i < neighbours.length; i++) {
			var neighbour = neighbours[i];
			if (cellGroup[neighbour] === undefined) {
				cellGroup[neighbour] = exports.cellFromString(neighbour);
			}
			cellGroup[neighbour].incrementNeighbourCount();
		}
	};

	cell.prototype.nextGeneration = function() {
		if (this.generation === 0 && this.neighbourCount !== 3) {
			this.generation = -1;
		} else if (this.neighbourCount < 2 || this.neighbourCount > 3) {
			this.generation = -1;
		} else {
			this.generation++;
		}
	};

	return cell;
}();

exports.cellFromString = function(coordinates) {
	var xandy = coordinates.split(',');
	return new exports.cell(parseInt(xandy[0]), parseInt(xandy[1]));
};

exports.cellGroup = function() {
	function cellGroup(listOfCells){
		this.cells = {};
		for (var i = 0; i < listOfCells.length; i++) {
			var cellString = listOfCells[i].getCoordinates().toString();
			this.cells[cellString] = listOfCells[i];
		}
	};

	cellGroup.prototype.getCellPositions = function(){
		var cellPositions = [];
		for (var key in this.cells) {
			if (this.cells.hasOwnProperty(key)) {
				cellPositions.push(this.cells[key].getCoordinates().toString());
			}
		}
		return cellPositions;
	};

	cellGroup.prototype.getCell = function(cellString) {
		return this.cells[cellString];
	};

	cellGroup.prototype.initialGeneration = function() {
		for (var key in this.cells) {
			if (this.cells.hasOwnProperty(key)) {
				this.cells[key].incrementGeneration();
			}
		}
	};

	cellGroup.prototype.spawnNextGeneration = function() {
		// reset neighbour counts
		for (var key in this.cells) {
			if (this.cells.hasOwnProperty(key)) {
				this.cells[key].resetNeighbourCount();
			}
		} 

		// anounce neighbours
		for (var key in this.cells) {
			if (this.cells.hasOwnProperty(key)) {
				this.cells[key].informNeighbours(this.cells);
			}
		}

		// work out who lives and dies
		for (var key in this.cells) {
			if (this.cells.hasOwnProperty(key)) {
				this.cells[key].nextGeneration();
			}
		}

		// create list of cells that are alive
		var nextGen = [];
		for (var key in this.cells) {
			if (this.cells.hasOwnProperty(key)) {
				if (this.cells[key].generation > 0) {
					nextGen.push(this.cells[key]);
				}
			}
		}

		// return new cell group
		return new exports.cellGroup(nextGen);
	};

	return cellGroup;
}();

exports.sayHello = function() {
	alert("hello");
}

var cell1 = new exports.cell(1,1);
var cell2 = new exports.cell(1,2);
var cell3 = new exports.cell(1,3);
var cell4 = new exports.cell(23,5);
var cell5 = new exports.cell(23,4);
var cell6 = new exports.cell(23,3);
var cell7 = new exports.cell(22,3);
var cell8 = new exports.cell(21,4);
var startCells = new exports.cellGroup([cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8]);
startCells.initialGeneration();
var nextCells= {}
var cellGroups = [startCells, nextCells];
var currentCellGroup = 0;

exports.generateSeed = function() {
	var numberOfStartCells  =Math.floor(Math.random()*101);
	numberOfStartCells += 50;
	var cellList = [];
	for (var i = 0; i < numberOfStartCells; i++)
	{
		var randx  = Math.floor(Math.random()*31);
		var randy  = Math.floor(Math.random()*31);
		var cell = new exports.cell(randx, randy);
		cellList.push(cell);
	}
	cellGroups[0] = new exports.cellGroup(cellList);
	cellGroups[0].initialGeneration();
	cellGroups[1] = {};
	currentCellGroup = 0;
	exports.drawPoints();
}

exports.drawPoints = function() {
	var pointsToDraw;
	if (currentCellGroup === 0)
	{
		cellGroups[1] = cellGroups[0].spawnNextGeneration();
		currentCellGroup = 1;
		pointsToDraw = cellGroups[1].getCellPositions();
	}
	else
	{
		cellGroups[0] = cellGroups[1].spawnNextGeneration();
		currentCellGroup = 0;
		pointsToDraw = cellGroups[0].getCellPositions();
	}
	var c=document.getElementById("gameOfLifeCanvas");
	var ctx=c.getContext("2d");
	c.width = c.width;
	for (var i = 0; i < pointsToDraw.length; i++)
	{
		var coords = pointsToDraw[i].split(',');
		var x = parseInt(coords[0]);
		var y = parseInt(coords[1]);
		x = x * 10;
		y = y * 10;
		x = x + 150;
		y = y + 150;

		ctx.beginPath();
		ctx.arc(x,y,5,0,2*Math.PI);
		ctx.stroke();
	}
}


})(typeof exports === 'undefined'? this['gameOfLife']={}: exports);