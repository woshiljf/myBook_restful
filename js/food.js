
// 为了让不同的js文件避免会有函数和变量名冲突，可以使用自调用函数

// (function() {
// 	console.log('我是一个自调用函数');
// })();


(function() {

	var elements =[];   //先创建元素数组，为之后蛇和食物相遇删除作准备

	function Food(options) {
	   
	    options = options || {};
	    this.x = options.x || 0;
	  	this.y = options.y || 0;

	  	this.width = options.width || 35;
	  	this.height = options.height  || 26;
	  	this.color = options.color || 'pink';
	}


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






// var map = document.getElementById('map');
// var f = new	Food();

// f.rend(map);