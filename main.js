var ticTacToe = (function() {

	var context,
		border,
		height,
		weigth,
		xImageObj,
		cImageObj,
		xImageSource = "images/x.png",
		cImageSource = "images/c.png",
		imageSize = 48,
		plays = 0,
		matrixGame = [[0,0,0],[0,0,0],[0,0,0]],
		PLAYERX = 1,
		PLAYERY = 2,

		getContext = function () {
			if ( typeof context === "undefined" ) {
				context = jQuery('#canvas')[0].getContext("2d");
			}
		},

		configureMouseClick = function () {
			jQuery('#canvas').mousedown(drawNext);
		},

		load = function (obj, source, callback) {
			obj = new Image();
			obj.onload = callback;
			obj.src = source;
			return obj;
		},

		loadImages = function (callback) {
			xImageObj = load(xImageObj, xImageSource, callback);
			cImageObj = load(cImageObj, cImageSource, callback);
		},

		getRelativeMouseCoords = function (event){
		    var totalOffsetX = 0;
		    var totalOffsetY = 0;
		    var canvasX = 0;
		    var canvasY = 0;
		    var currentElement = event.currentTarget;

		    do{
		        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
		        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
		    }
		    while(currentElement = currentElement.offsetParent)

		    canvasX = event.pageX - totalOffsetX;
		    canvasY = event.pageY - totalOffsetY;

		    return {x:canvasX, y:canvasY}
		},

		verifyWinner = function() {
			for ( var i = 0; i < matrixGame.length; i++) {
				var sum = 0;
				for (var j = 1; j < matrixGame.length; j++) {
					sum += matrixGame[i][j];
				};

				if ( sum === 3 ) {
					alert("X is the winner!");
				} else if (sum === 6) {
					alert("Circle is the winner!");
				}
			}
		},

		drawX = function ( x, y, height ) {
			if ( context ) {
				if ( typeof xImageObj === "undefined" ) {
					return;
				}
				context.drawImage(xImageObj,x,y);
			}
		},

		drawC = function ( x, y, height ) {
			if ( context ) {
				if ( typeof cImageObj === "undefined" ) {
					return;
				}
				context.drawImage(cImageObj,x,y);
			}
		},

		drawNext = function(event) {
			var position = getRelativeMouseCoords(event);

			var x = position.x - border;
			var y = position.y - border;

			if ( x < 0 || y < 0) {
				return
			}

			indexX = parseInt(x / (height+weigth));
			indexY = parseInt(y / (height+weigth));
			x = (indexX*height)+border+(indexX*4*(height-imageSize));
			y = (indexY*height)+border+(indexY*3*(height-imageSize));

			if (plays % 2 === 0) {
				drawX(x, y, imageSize);
				matrixGame[indexX][indexY] = PLAYERX;
			} else {
				drawC(x, y, imageSize);
				matrixGame[indexX][indexY] = PLAYERY;
			}

			// verifyWinner();

			plays++;

		},

		drawTicTacToeBoard = function () {
			if ( context ) {

				var x = border, y = border;
				var path = [
					[x+height,y],
					[x+height,y+height],
					[x,y+height],
					[x,y+height+weigth],
					[x+height,y+height+weigth],
					[x+height,y+(2*height)+weigth],
					[x,y+(2*height)+weigth],
					[x,y+(2*height)+(2*weigth)],
					[x+height,y+(2*height)+(2*weigth)],
					[x+height,y+(3*height)+(2*weigth)],
					[x+height,y+(3*height)+(2*weigth)],
					[x+height+weigth,y+(3*height)+(2*weigth)],
					[x+height+weigth,y+(2*height)+(2*weigth)],
					[x+(2*height)+weigth,y+(2*height)+(2*weigth)],
					[x+(2*height)+(2*weigth),y+(2*height)+(2*weigth)],
					[x+(2*height)+(2*weigth),y+(3*height)+(2*weigth)],
					[x+(2*height)+(3*weigth),y+(3*height)+(2*weigth)],
					[x+(2*height)+(3*weigth),y+(2*height)+(2*weigth)],
					[x+(3*height)+(3*weigth),y+(2*height)+(2*weigth)],
					[x+(3*height)+(3*weigth),y+(2*height)+weigth],
					[x+(2*height)+(3*weigth),y+(2*height)+weigth],
					[x+(2*height)+(3*weigth),y+height+weigth],
					[x+(3*height)+(3*weigth),y+height+weigth],
					[x+(3*height)+(3*weigth),y+height],
					[x+(2*height)+(3*weigth),y+height],
					[x+(2*height)+(3*weigth),y],
					[x+(2*height)+(2*weigth),y],
					[x+(2*height)+(2*weigth),y+height],
					[x+height+weigth,y+height],
					[x+height+weigth,y]

				];

				context.beginPath();
				context.moveTo(path[0][0],path[0][1]);

				for (var i = 1; i < path.length; i++) {
					context.lineTo(path[i][0],path[i][1]);
				}

				context.fill();
				context.closePath();
				context.clearRect(x+height+weigth,y+height+weigth,height+weigth,height);
			}
		};


		return {
			initialize : function (b, h, w) {
				border = b;
				height = h;
				weigth = w;
				getContext();
				configureMouseClick();
				drawTicTacToeBoard();
				loadImages(function() {
					
				});
			}
			
		};

}());


ticTacToe.initialize(10, 50, 4);	


