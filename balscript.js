var canvass = document.getElementById('canvas_g');
var gl = canvass.getContext('2d');


var wid=canvass.width/2;
var hei=canvass.height-30;
var dw=4,dh=-4,ballRadius=10;
var paddleHeight=10,paddleWidth=75,paddleX=(canvass.width-paddleWidth)/2;
var rightKey=false,leftKey=false;
var brickRowCount=7, brickColumnCount=9, brickWidth=50, brickHeight=20, brickPadding=1, brickOffsetTop=30, brickOffsetLeft=30, bricks=[];
var score=0,lives=3,requestId;
var magic_row = Math.floor(Math.random()*brickRowCount);
var magic_column = Math.floor(Math.random()*brickColumnCount);
for(c=0;c<brickColumnCount;++c){
  bricks[c]=[];
  for(r=0;r<brickRowCount;++r){
    bricks[c][r]=
    {x:0,y:0,status:1};
  }
 
}
start();
//FIrstCalledForExecution
function changePos(){
gl.clearRect(0,0,canvass.width,canvass.height)
wid+=dw;
hei+=dh;
 if(wid+dw<ballRadius||wid+dw>canvass.width-ballRadius) dw=-dw;
 if(hei+dh<ballRadius) dh=-dh;//Top 
  else if(hei+dh>canvass.height-ballRadius-paddleHeight+0.7) {
      if(wid>paddleX-0.7&&wid<paddleX+paddleWidth+0.7) if(hei<=canvass.height) dh=-dh;
      else {
            lives--;
            if(!lives){stop();}
             wid=canvass.width/2;
             hei=canvass.height-30;
             dw=4;
             dh=-4;
             paddleX=(canvass.width-paddleWidth)/2;
         }
     } 
if(rightKey&&paddleX<canvass.width-paddleWidth) paddleX+=7;
if(leftKey&&paddleX>0) paddleX-=7;
drawBricks();
drawBall();
drawPaddle();
gameScore();
gameLives();
collisionBricks();
}
/*******************************************/
function restart(){//When Play Again Is Clicked
    document.location.reload();
}
var stopGame;
 function start(){
    
     stopGame=false;
      changePos();
      if (stopGame==false) {
          frame=requestAnimationFrame(start);
      }
    }
  function stop(){
  if(frame) {
     cancelAnimationFrame(frame);
     stopGame = true;
  }
 }
function drawBall(){
         gl.arc(wid,hei,10,0,Math.PI*2);
         gl.fillStyle='red';
         gl.fill();
}
function drawPaddle(){
gl.beginPath();
 gl.rect(paddleX,canvass.height-paddleHeight,paddleWidth,paddleHeight);
 gl.fillStyle='maroon';
 gl.fill();
gl.closePath();
}
function drawBricks(){
    for(c=0;c<brickColumnCount;++c){
      for(r=0;r<brickRowCount;++r){
         if(bricks[c][r].status==1){
   
           var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
           var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
           bricks[c][r].x=brickX;
           bricks[c][r].y=brickY;
           gl.beginPath();
           gl.rect(brickX,brickY,brickWidth,brickHeight);
           if(c == magic_column && r==magic_row) 
           gl.fillStyle="#000066";
           else if(c%2!=0)
             gl.fillStyle="#FF0000";
           else
             gl.fillStyle="#C2AA83";
           gl.fill();
           gl.closePath();
         }
      }
  }
  };
function collisionBricks(){
    for(c=0;c<brickColumnCount;c++)
     for(r=0;r<brickRowCount;r++)
        {  var b=bricks[c][r];
            if(b.status==1){
                if(wid>b.x && wid<b.x+brickWidth&&hei>b.y&&hei<b.y+brickHeight)
               { 
                   if (c==magic_column && r==magic_row)
                   {
                    console.log('magic');
                    dh = -dh;
                   // console.log(bricks[2][6+1]);
                   if(typeof bricks[magic_column][magic_row]!=='undefined') {console.log('Magic broke');bricks[magic_column][magic_row].status=0; score++;}
				 if(typeof bricks[magic_column][magic_row+1]!=='undefined') {console.log('Magic Down broke');bricks[magic_column][magic_row+1].status=0; score++; }
                 if(typeof bricks[magic_column][magic_row-1]!=='undefined') {console.log('Magic Up broke'); bricks[magic_column][magic_row-1].status=0; score++;}
				 if(c<brickColumnCount-1 && typeof bricks[magic_column+1][magic_row]!=='undefined'){console.log('Magic Right broke'); bricks[magic_column+1][magic_row].status=0; score++;}
				 if((c<0||c>=0) && ((c<brickColumnCount-1) && typeof bricks[magic_column-1][magic_row]!=='undefined')){console.log('Magic Left broke'); bricks[magic_column-1][magic_row].status=0; score++;}
                   }
                   else{console.log('magic');
                       dh=-dh;
                b.status=0;
                score++; }
                if(score==brickRowCount*brickColumnCount){
                    alert('You have Won!!');
                    score=0;
                    document.location.reload();
                }
               }
            }
        }
    
}
function gameScore(){
    gl.font='18px Segoe Print';
    gl.fillStyle='white';
    //ctx.fillRect((canvass.width-80)/2,canvass.height-30, 60, 25);    
    gl.fillText('Score:'+score,420,15);
}
function gameLives()
{
gl.font='18px Segoe Print';
gl.fillStyle='white';
gl.fillText('Lives:'+lives,canvass.width-500,15);
}
document.addEventListener("mousemove",function(e){
 var relX=e.clientX-canvass.offsetLeft;
 if(relX>0+paddleWidth/2&&relX<canvass.width-paddleWidth/2){
     paddleX=relX-paddleWidth/2;
 }
})
document.addEventListener("keydown",function keyDownFunc(e){
    if(e.keyCode==39) rightKey=true;
    else if(e.keyCode==37) leftKey=true;
});
document.addEventListener("keyup",function keyUpFunc(e){
    if(e.keyCode==39) rightKey=false;
    else if(e.keyCode==37) leftKey=false;
});
var clearPause;
document.addEventListener("keypress",function pause(e){
    var pause_status=document.getElementById('pause_status');
        pause_status.classList.remove('glow');
        clearTimeout(clearPause);
    if(e.keyCode==32&&stopGame==false) {
        pause_status.innerHTML='Game Paused';
        pause_status.style.opacity=1;
        stop(); 
    }
    else 
    {
        pause_status.innerHTML='Game Resumed';
        pause_status.style.opacity=1;
        clearPause=setTimeout(function(){
            pause_status.style.opacity=0;
        },900); 
        start();
    }
})
/*****************************************/