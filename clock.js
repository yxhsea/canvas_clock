var dom = document.getElementById('clock');//获取dom元素
var ctx = dom.getContext('2d');//创建context对象
var width = ctx.canvas.width;//canvas宽度
var height = ctx.canvas.height;//canvas高度
var r = width/2;
var rem = width/200;

//绘制背景
function drawBackground(){
	ctx.save();//保存当前环境的状态
	ctx.translate(r,r);//重新映射画布上原点位置
	ctx.beginPath();//起始路径
	ctx.lineWidth = 4 * rem;//定义线条宽度
	ctx.arc(0,0,r - ctx.lineWidth/2,0,2*Math.PI,false);//创建圆
	ctx.stroke();//绘制路径
	
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 18 * rem + 'px Arial';//设置字体
	ctx.textAlign = 'center';//文本内容对齐
	ctx.textBaseline = 'middle';//绘制文本时使用的当前文本基线
	//遍历时间
	hourNumbers.forEach(function(number,i){
		var rad = 2*Math.PI/12 * i;//弧度
		var x = Math.cos(rad) * (r - 30 * rem);//x坐标
		var y = Math.sin(rad) * (r - 30 * rem);//y坐标
		ctx.fillText(number,x,y);//填充文本
	});

	//绘制出60个点
	for(var i = 0;i < 60;i++){
		var rad = 2 * Math.PI/60 * i;
		var x = Math.cos(rad) * (r - 18 * rem);
		var y = Math.sin(rad) * (r - 18 * rem);
		ctx.beginPath();
		if(i % 5 === 0){
			ctx.fillStyle = '#000';
			ctx.arc(x,y,2 * rem,0,2*Math.PI,false);
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x,y,2 * rem,0,2*Math.PI,false);
		}
		ctx.fill();
	}
}

//绘制时针
function drawHour(hour,minute){
	ctx.save();//保存当前环境的状态
	ctx.beginPath();//起始路径
	var rad = 2*Math.PI/12 * hour;//计算弧度
	var mrad = 2*Math.PI/12/60 * minute;
	ctx.rotate(rad+mrad);//旋转当前绘图
	ctx.lineWidth = 6 * rem;//定义时钟线宽度
	ctx.lineCap = 'round';//线条末端为圆形样式
	ctx.moveTo(0,10 * rem);//把路径移动到画布中的指定点，不创建线条
	ctx.lineTo(0,-r/2);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
	ctx.stroke();//绘制已定义的路径
	ctx.restore();//返回之前保存过的路径状态和属性
}

//绘制分钟
function drawMinute(minute){
	ctx.save();//保存当前环境的状态
	ctx.beginPath();//起始路径
	var rad = 2*Math.PI/60 * minute;//计算弧度
	ctx.rotate(rad);//旋转当前绘图
	ctx.lineWidth = 4 * rem;//定义时钟线宽度
	ctx.lineCap = 'round';//线条末端为圆形样式
	ctx.moveTo(0,10 * rem);//把路径移动到画布中的指定点，不创建线条
	ctx.lineTo(0,-r + 30 * rem);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
	ctx.stroke();//绘制已定义的路径
	ctx.restore();//返回之前保存过的路径状态和属性
}

//绘制秒钟
function drawSecond(second){
	ctx.save();//保存当前环境的状态
	ctx.beginPath();//起始路径
	ctx.fillStyle = '#c14543';
	var rad = 2*Math.PI/60 * second;//计算弧度
	ctx.rotate(rad);//旋转当前绘图
	ctx.moveTo(-2 * rem,20 * rem);//把路径移动到画布中的指定点，不创建线条
	ctx.lineTo(2 * rem,20 * rem);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
	ctx.lineTo(1,-r + 18 * rem);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
	ctx.lineTo(-1,-r + 18 * rem);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
	ctx.fill();//填充
	ctx.restore();//返回之前保存过的路径状态和属性
}

//绘制中心圆
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0,0,3,0,2*Math.PI,false);
	ctx.fill();
}


//绘制动态时间
function draw(){
	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();//返回之前保存过的路径状态和属性
}
draw();
setInterval(draw,1000);