

// -----tools--------
;(function(){

  	var tools = {
	     getRandom: function(min,max) {
			return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
		}
	}

	window.tools =tools;
})()


// -----food----------

// 为了让不同的js文件避免会有函数和变量名冲突，可以使用自调用函数

// (function() {
// 	console.log('我是一个自调用函数');
// })();

// -------------------parent------------------

;(function() {


   function Parent(window,options) {

   	  options = options ||{};

   	  this.width = options.width || 35;
   	  this.height = options.height || 26;


   }

   window.Parent = Parent;
   Parent.prototype.test = function () {

   	  console.log('我是父类函数')


   }





})(window,undefined)



;(function() {

	var elements =[];   //先创建元素数组，为之后蛇和食物相遇删除作准备

	function Food(options) {
	   
	    options = options || {};
	    this.x = options.x || 0;
	  	this.y = options.y || 0;

	  	Parent.call(this,options);
	  	this.color = options.color || 'pink';
	}

	Food.prototype  = new Parent();
	Food.prototype.constructor = Food;


	Food.prototype.render = function(map) {
		// body...
	    remove(); //动态创建食物之前，先删除元素

	    this.x = tools.getRandom(0,map.offsetWidth /this.width -1 )*this.width;
	    this.y = tools.getRandom(0,map.offsetHeight /this.height -1 )*this.height;
		var div = document.createElement('div');
		map.appendChild(div);

		elements.push(div);  //添加元素到数组

		div.style.width = this.width +'px';
		div.style.height =this.height +'px';
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.position = 'absolute';
	    div.style.backgroundColor = this.color;
	    div.style.background = 'url(images/birds.png) no-repeat -8px -10px';



	};

	

	function remove() {

		for(var i=elements.length-1; i>=0; i--) {

			elements[i].parentNode.removeChild(elements[i]);   //把自己删除,页面中删除
			elements.splice(i,1) //数组中删除

		}
	}
    //让Food构造函数，外部可以使用
	window.Food = Food;  //使用了自调用函数之后，外部无法访问，但是系统的所有的变量window都可以访问，定义window即可

})()

// ---------snake-----------


// 第一步，定义自调用构造函数

;(function() {


    var position = 'absolute';
    var elements =[];
	function Snake(options) {
      
		options = options || {};

		Parent.call(this,options);   //借用父类构造函数定义width 和heigth属性

		this.direction =options.direction || 'right';
		//蛇身,使用数组存放，第一项为蛇头
		this.body =[
         
         //非常好的方法，以后多多参考使用 
		 { x: 3,y: 2, color: '#CC3333'},
		 { x: 2,y: 2, color: '#FFCCCC'},
		 { x: 1,y: 2, color: '#66CCCC'}

		];

	}

	Snake.prototype  = new Parent();
	Snake.prototype.constructor = Snake;

	Snake.prototype.render = function(map) {

		// body...

		// 每次渲染前，先删除蛇
		remove();
		for (var i=0, len = this.body.length; i<len; i++) {

			var obj = this.body[i];

			var div = document.createElement('div');
			map.appendChild(div);

			//记录当前蛇
			elements.push(div);



			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.left = obj.x*this.width + 'px';
			div.style.top = obj.y*this.height + 'px';
			div.style.position = position;
			div.style.backgroundColor = obj.color;
			div.style.borderRadius = '10px';

		}


	};

    //私有成员
	function remove () {

		for (var i= elements.length -1; i>=0; i--) {

			elements[i].parentNode.removeChild(elements[i]);   //把自己删除,页面中删除
			elements.splice(i,1)  //数组中删除


		}



	}

	Snake.prototype.move = function(food,map) {
		// body...

		for (var i = this.body.length-1; i>0; i--) {
            
            //蛇身移动
		    this.body[i].x = this.body[i-1].x;
		    this.body[i].y = this.body[i-1].y;

		}

		//蛇头移动
		var head = this.body[0];
		switch(this.direction){

			case 'right' : 
				head.x +=1;
				break;

			case 'left' : 
				head.x -=1;
				break;
			case 'up' :
				head.y -=1;
				break;
			case 'down' : 
				head.y +=1;
				break;

		}
    

       var headX =head.x *this.width;
       var headY =head.y *this.height;

       if(headX === food.x && headY === food.y) {

       	   var last = this.body[this.body.length -1];
       	   //小技巧，要记住，直接把蛇最后一节重新添加到body中,前赋予最后一节的位置
       	   var r = tools.getRandom(0,255);
     	   var g = tools.getRandom(0,255);
     	   var b = tools.getRandom(0,255);

       	   this.body.push({
       	   	x: last.x,
       	   	y: last.y,
       	   	color: 'rgb('+r+','+g+','+b+')'

       	   });

           food.render(map); 


       }
      



	};



      window.Snake = Snake;

})()
 

// ----------game----------
//game.js 包含food对象，snake对象，
// start方法

;(function(){
     

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
        	  if( that.snake.direction =='right')
        	  {
        	  	return;
        	  }
        	  that.snake.direction = 'left';
        	  break;
        	case 38:

        	  if( that.snake.direction =='down')
        	  {
        	  	return;
        	  }
        	  that.snake.direction = 'up';
        	  break;

        	case 39:

        	  if( that.snake.direction =='left')
        	  {
        	  	return;
        	  }

        	  that.snake.direction = 'right';
        	  break;
        	case 40:

        	  if( that.snake.direction =='up')
        	  {
        	  	return;
        	  }
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
        
      
		if (headY < 0 || headY >= maxY-1) {

			alert('game over');
			clearInterval(timeId);

		}

		for (var i = 1,len = this.snake.body.length; i<len; i++) {

			 var tail = this.snake.body[i];
			 var tailX = tail.x * this.snake.width;
			 var tailY = tail.y * this.snake.height;
			 if (headX * this.snake.width == tailX && headY * this.snake.height == tailY) {
                  alert('game over');
				  clearInterval(timeId);

			 }

			console.log(headX * this.snake.width);
        		
        	console.log(headY * this.snake.height);

		}









		}.bind(that),150);


	}

	window.Game = Game;



})()


// --------函数入口main--------

;(function(){

  var map = document.getElementById('map');

  var game = new Game(map);  //能不能走点心，对象创建

  game.start();

})()





