var canvass = document.getElementById('canvas_g');
var gl = canvass.getContext('2d');
var pause_status=document.getElementById('pause_status');
var highscore_button=document.getElementById('button');
var wid=canvass.width/2;
var hei=canvass.height-30;
var dw=5,dh=-5,ballRadius=10;
var paddleHeight=20,paddleWidth=110,paddleX=(canvass.width-paddleWidth)/2;
var rightKey=false,leftKey=false;
var brickRowCount=8, brickColumnCount=9, brickWidth=50, brickHeight=20, brickPadding=1, brickOffsetTop=30, brickOffsetLeft=30, bricks=[];
var score=0,lives=3;
var highScore = localStorage.getItem('highScore') || 0;
var magic_row = Math.floor(Math.random() * brickRowCount);
var magic_column = Math.floor(Math.random() * brickColumnCount);
for (c = 0; c < brickColumnCount; ++c) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; ++r) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }

}
start();//FIrstCalledForExecution
function changePos(){
    gl.clearRect(0,0,canvass.width,canvass.height)
    wid+=dw;
    hei+=dh;
    collisionBricks();
    gameStats();
     if(wid+dw<ballRadius||wid+dw>canvass.width-ballRadius) dw=-dw;
     if(hei+dh<ballRadius) dh=-dh;//Top 
      else if(hei+dh>canvass.height-ballRadius-paddleHeight) {
          if(wid>paddleX&wid<paddleX+paddleWidth) dh=-dh;
          else{
               lives--;
               wid=canvass.width/2;
               hei=canvass.height-30;
               paddleX=(canvass.width-paddleWidth)/2;
               dw=hh=-4;
           if(lives==0){ stop();}}} 
    if(rightKey&&paddleX<canvass.width-paddleWidth) paddleX+=7;
    if(leftKey&&paddleX>0) paddleX-=7;
    if (score> highScore) {
        highScore = parseInt(score);
        localStorage.setItem('highScore', highScore);
     }highscore_button.innerHTML='High Score:'+highScore;
       drawBall();
       drawPaddle(); 
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
    stopGame = true;}
  }
  function drawBall(){     
    gl.beginPath();
         gl.arc(wid,hei,10,0,Math.PI*2);
         gl.fillStyle='red';
         gl.fill();   
     gl.closePath();
  }
function drawPaddle() {
    img1 = new Image();
    img1.src = 'paddle.jpg';
    gl.beginPath();
     gl.drawImage(img1,paddleX,canvass.height-paddleHeight,paddleWidth,paddleHeight);
    gl.closePath();
    }   
function collisionBricks() {
    for (c = 0; c < brickColumnCount; c++)
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
               gl.beginPath(); 
                if (magic_column == c && magic_row == r) gl.fillStyle = "yellow"; 
                else if (c % 2 != 0) gl.fillStyle = "#FF0000";
                else gl.fillStyle = "#C2AA83";
                gl.fillRect(brickX, brickY, brickWidth, brickHeight);
               gl.closePath();
                if (wid > b.x && wid < b.x + brickWidth && hei > b.y && hei < b.y + brickHeight) {
                    if (c == magic_column && r == magic_row) {
                        console.log('magic');
                        dh = -dh;
                        if (typeof bricks[magic_column][magic_row] !== 'undefined') {
                            console.log('Magic broke');
                            bricks[magic_column][magic_row].status = 0;
                            score++;
                        }
                        if (typeof bricks[magic_column][magic_row + 1] !== 'undefined' && bricks[magic_column][magic_row + 1].status == 1) {
                            console.log('Magic Down broke');
                            bricks[magic_column][magic_row + 1].status = 0;
                            score++;
                        }
                        if (typeof bricks[magic_column][magic_row - 1] !== 'undefined' && bricks[magic_column][magic_row - 1].status == 1) {
                            console.log('Magic Up broke');
                            bricks[magic_column][magic_row - 1].status = 0;
                            score++;
                        }
                        if (((magic_column + 1) < brickColumnCount) && (typeof bricks[magic_column + 1][magic_row] !== 'undefined' && bricks[magic_column + 1][magic_row].status == 1)) {
                            console.log('Magic Right broke');
                            bricks[magic_column + 1][magic_row].status = 0;
                            score++;
                        }
                        if ((magic_column != 0) && (typeof bricks[magic_column - 1][magic_row] !== 'undefined' && bricks[magic_column - 1][magic_row].status == 1)) {
                            console.log('Magic Left broke');
                            bricks[magic_column - 1][magic_row].status = 0;
                            score++;
                        }
                    } else {
                        console.log('normal');
                        dh = -dh;
                        b.status = 0;
                        score++;
                    }

                    if (score == brickRowCount * brickColumnCount) {
                        alert('You have Won!!');
                        score = 0;
                        document.location.reload();
                    }
                }
            }
        }
}
function gameStats(){
   gl.beginPath(); 
    gl.font='18px Segoe Print';
    gl.fillStyle='black';
    gl.fillText('Score:'+score,420,15);
    gl.fillText('Lives:'+lives,canvass.width-500,15);
   gl.closePath(); 
}
document.addEventListener("mousemove",function(e){
 var relX=e.clientX-canvass.offsetLeft;
 if(relX>0+paddleWidth/2&&relX<canvass.width-paddleWidth/2){
     paddleX=relX-paddleWidth/2;
 }
})
document.addEventListener("keydown",function(e){
    if(e.keyCode==39) rightKey=true;
    else if(e.keyCode==37) leftKey=true;
});
document.addEventListener("keyup",function(e){
    if(e.keyCode==39) rightKey=false;
    else if(e.keyCode==37) leftKey=false;
});
var clearPause;
document.addEventListener("keypress",function(e){
var clearPause;
    if(lives>0){   
       if(e.keyCode==32&&stopGame==false) {
          pause_status.src='pause.jpg';
          pause_status.style.opacity=1;
          stop(); 
        }else{
            pause_status.src='play.png';
            pause_status.style.opacity=1;
            clearPause=setTimeout(function(){
             pause_status.style.opacity=0;},900); 
            start();}
    }else{return;}
});

/*****************************************/