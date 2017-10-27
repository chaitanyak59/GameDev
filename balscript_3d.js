var canvas= document.getElementById('canvas_g');
var gl = canvas.getContext('webgl');
var wid=canvas.width/2;
var hei=canvas.height-30;
var dw=2,dh=-2,ballRadius=10;
var paddleHeight=10,paddleWidth=75,paddleX=(canvas.width-paddleHeight)/2;
var rightKey=false,leftKey=false;

function changePos(){
    gl.clearRect(0,0,canvas.width,canvas.height)
    wid+=dw;
    hei+=dh;
    if(wid+dw<ballRadius||wid+dw>canvas.width-ballRadius) dw=-dw;
     if(hei+dh>canvas.height-ballRadius+paddleHeight) {
        
        if(wid>paddleX-2&&wid<paddleX+paddleWidth+2) dh=-dh;  
        else {console.log('GAME OVER');document.location.reload()};
      }
      else if(hei+dh<ballRadius) dh=-dh;
    if(rightKey&&paddleX<canvas.width-paddleWidth) paddleX+=7;
    if(leftKey&&paddleX>0) paddleX-=7;
    drawBall();
    drawPaddle();
    }
    /*******************************************/
function drawBall(){
    gl.beginPath();
        gl.arc(wid,hei,10,0,Math.PI*2);
        gl.fillStyle='red';
        gl.fill();
    gl.closePath();
}
function drawPaddle(){
   gl.beginPath();
       gl.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
       gl.fillStyle='pink';
       gl.fill();
   gl.closePath();

}
document.addEventListener("keydown",function keyDownFunc(e){
   if(e.keyCode==39) rightKey=true;
   else if(e.keyCode==37) leftKey=true;
});
document.addEventListener("keyup",function keyUpFunc(e){
   if(e.keyCode==39) rightKey=false;
   else if(e.keyCode==37) leftKey=false;
});
/*****************************************/