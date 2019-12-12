//game.js 包含food对象，snake对象，
// start方法


(function(){
     

    var that;  //记录当前构造函数中this
	function Game(map) {

		this.food = new Food();   //food属性
		this.snake = new Snake();  //snake属性
		this.map = map;   //地图属性
        that = this  //小技巧

	}

	Game.prototype.start = function() {
		// body...

		this.food.render(this.map);
		this.snake.render(this.map);
		/*
		1 让蛇移动起来(定时器)
		2 通过键盘控制方向
		3 蛇遇到食物，处理
		4 蛇遇到边界
		*/
		runSnake();

		//注册键盘事件
		bindKey();

		//蛇吃食物


	};

    function bindKey() {

    	//使用document的addElementListener来获取键盘事件
        //给文档设置监听事件
    	document.addEventListener( 'keydown', function(e) {

         console.log(e.keyCode);
        /* 键盘码
        top :38  right: 39 left:37 down:40
        */

        switch(e.keyCode) {

        	case 37:
        	  that.snake.direction = 'left';
        	  break;
        	case 38:
        	  that.snake.direction = 'up';
        	  break;
        	case 39:
        	  that.snake.direction = 'right';
        	  break;
        	case 40:
        	  that.snake.direction = 'down';
        	  break;

        }



    	},false)




    }




	//蛇运动
	function runSnake() {

		var timeId = setInterval(function() {

        this.snake.move(this.food ,this.map);
        this.snake.render(this.map);  //render 有参数

        //判断蛇出界停止游戏

		var maxX = this.map.offsetWidth / this.snake.width;  //能容纳蛇的个数
		var maxY = this.map.offsetHeight / this.snake.height;
		var headX = this.snake.body[0].x;
		var headY = this.snake.body[0].y;

		if (headX < 0 || headX >= maxX) {

			alert('game over');
			clearInterval(timeId);
		}
        
        console.log(headY);
        console.log(maxY);
		if (headY < 0 || headY >= maxY-1) {

			alert('game over');
			clearInterval(timeId);

		}

		//判断蛇是否要到自己的尾巴，而结束游戏

		for (var i = 1,len = this.snake.body.length; i<len; i++) {

			 var tail = this.snake.body[i];
			 var tailX = tail.x * this.snake.width;
			 var tailY = tail.y * this.snake.height;
			 if (headX * this.width == tailX && headY * this.height == tailY) {
                  alert('game over');
				  clearInterval(timeId);

			 }

		}














		}.bind(that),150);


	}

	window.Game = Game;



})()



