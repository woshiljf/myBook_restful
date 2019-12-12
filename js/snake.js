
// 第一步，定义自调用构造函数

(function() {


    var position = 'absolute';
    var elements =[];
	function Snake(options) {
      
		options = options || {};
		this.width = options.width || 35;
		this.height = options.height || 26;
		this.direction =options.direction || 'right';
		//蛇身,使用数组存放，第一项为蛇头
		this.body =[
         
         //非常好的方法，以后多多参考使用 
		 { x: 3,y: 2, color: '#CC3333'},
		 { x: 2,y: 2, color: '#FFCCCC'},
		 { x: 1,y: 2, color: '#66CCCC'}

		];

	}

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
 

// var map =document.getElementById('map');
// var snake = new Snake();

// snake.rend(map);

 