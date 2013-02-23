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
		moves = 0,
		matrixGame = [[0,0,0],[0,0,0],[0,0,0]],
		PLAYERX = 1,
		PLAYERY = 5,
		gameover = false,

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
			var sumh = 0,
				sumv = 0,
				sumdiagonal1 = 0,
				sumdiagonal2 = 0;
			for ( var i = 0; i < matrixGame.length; i++) {

				var indexdiagonal2 = ( matrixGame.length - 1 - i); 

				sumdiagonal1 += matrixGame[i][i];
				sumdiagonal2 += matrixGame[i][indexdiagonal2];

				console.log (i + " " + indexdiagonal2);

				for (var j = 0; j < matrixGame.length; j++) {
					sumh += matrixGame[i][j];
					sumv += matrixGame[j][i];
				};

				if ( sumh === 3 || sumv === 3 || sumdiagonal1 === 3 || sumdiagonal2 === 3 ) {
					alert("X is the winner!");
					return true;
				} else if ( sumh === 15 || sumv === 15 || sumdiagonal1 === 15 || sumdiagonal2 === 15 ) {
					alert("Circle is the winner!");
					return true;
				}

				sumh = 0;
				sumv = 0;
			}
			return false;
		},

		drawX = function ( position, height ) {
			if ( context ) {
				if ( typeof xImageObj === "undefined" ) {
					return;
				}
				context.drawImage(xImageObj,position.x,position.y);
			}
		},

		drawC = function ( position, height ) {
			if ( context ) {
				if ( typeof cImageObj === "undefined" ) {
					return;
				}
				context.drawImage(cImageObj,position.x,position.y);
			}
		},

		isSpotFree = function ( x, y) {
			if ( matrixGame[x][y] === 0 ) {
				return true;
			}
			return false;
		},

		adjustToSpotPosition = function ( position ) {

				var x = position.x - border;
				var y = position.y - border;

				if ( x < 0 || y < 0) {
					return
				}

				position.indexX = parseInt(x / (height+weigth));
				position.indexY = parseInt(y / (height+weigth));
				position.x = border+(position.indexX*height)+(position.indexX*weigth)+((height-imageSize)/2);
				position.y = border+(position.indexY*height)+(position.indexY*weigth)+((height-imageSize)/2);

				return position;

		},

		drawNext = function(event) {

			if ( gameover === false ) {
				var position = getRelativeMouseCoords(event);

				position = adjustToSpotPosition(position);

				if ( isSpotFree(position.indexX, position.indexY)) {
					if (moves % 2 === 0) {
						drawX(position, imageSize);
						matrixGame[position.indexX][position.indexY] = PLAYERX;
					} else {
						drawC(position, imageSize);
						matrixGame[position.indexX][position.indexY] = PLAYERY;
					}

					moves++;

					gameover = verifyWinner();
				}
			} else {
				restartGame();
			}


		},

		clearCanvas = function () {
			context.clearRect ( 0 , 0 , context.canvas.width , context.canvas.height );
		},

		drawTicTacToeBoard = function () {
			if ( context ) {
				clearCanvas();
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
		},

		startGame = function () {
			getContext();
			configureMouseClick();
			drawTicTacToeBoard();
			loadImages();
		},

		restartGame = function () {
			moves = 0;
			matrixGame = [[0,0,0],[0,0,0],[0,0,0]];	
			gameover = false;
			startGame();
		};


		return {
			initialize : function (b, h, w) {
				border = b;
				height = h;
				weigth = w;
				startGame();
			},
			reset : function () {
				restartGame();
			}
			
		};

}());


ticTacToe.initialize(10, 50, 4);	


