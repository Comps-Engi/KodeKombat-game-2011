var canvas=null;
var ctx=null;
var i=0,j=0;
var s=30;
var x=0, y=0;
var p=0;
var a=0,b=0;
var prevx=[24,25,25,25,25,25,25,26,27,27,27], prevy=[9,9,9,9,9,9,9,9,9,9,9],cposx=[25,25,25,25,25,25,26,27,27,27,28],cposy=[9,9,9,9,9,9,9,9,9,9,9];
var prevx1=[26,26,26,26,26,26,26,26,26,26,26], prevy1=[5,5,5,5,5,5,5,5,5,5,5],posx1=[26,26,26,26,26,26,26,26,26,26,26],posy1=[5,5,5,5,5,5,5,5,5,5,5];
var prevx2=[27,27,27,27,27,27,27,27,27,27,27], prevy2=[5,5,5,5,4,5,5,5,5,5,5], cposx2=[27,27,27,27,27,27,27,27,27,27,27], cposy2=[5,5,5,4,5,5,5,5,5,5,5];
var prevx3=[28,28,28,28,28,29,30,30,30,31,31], prevy3=[5,5,4,3,3,3,3,3,3,3,3], cposx3=[28,28,28,28,29,30,30,30,31,31,31], cposy3=[5,4,3,3,3,3,3,3,3,3,3];
var prevx4=[29,29,29,29,29,29,29,29,29,29,29], prevy4=[5,5,5,5,5,5,5,5,5,5,5], cposx4=[29,29,29,29,29,29,29,29,29,29,29], cposy4=[5,5,5,5,5,5,5,5,5,5,5];
var array=[1,4,4,3,4,4,1,1,4];
var count=0;
var i2=0;

var map= ["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWeeWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWghosWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeWpeeeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"];
window.onload=main;
function drawGhost1(psx,psy,p1,prvx,prvy)
{if(canvas.getContext)
{

if(ele==2)
ctx.fillStyle ="#FF0000";
if(ele==3)
    ctx.fillStyle="pink";
if(ele==4)
    ctx.fillStyle="blue";
if(ele==5)
    ctx.setfillStyle="#FFE4B5";
ctx.beginPath();

ctx.moveTo(prvx*s+5+i,prvy*s+ 22.5+j);
ctx.quadraticCurveTo(prvx*s+5+i, prvy*s+2.5+j, prvx*s+15+i,  prvy*s+2.5+j);
ctx.quadraticCurveTo(prvx*s+25+i,prvy*s+ 2.5+j,prvx*s+ 25+i,  prvy*s+22.5+j);

ctx.quadraticCurveTo(prvx*s+25+i,prvy*s+27.2+j,prvx*s+22+i,prvy*s+27.5+j);
ctx.quadraticCurveTo(prvx*s+19+i,prvy*s+27.5+j,prvx*s+19+i,prvy*s+22.5+j);

ctx.quadraticCurveTo(prvx*s+18+i,prvy*s+27.5+j,prvx*s+15+i,prvy*s+ 27.5+j);
ctx.quadraticCurveTo(prvx*s+12+i,prvy*s+27.5+j,prvx*s+12+i,prvy*s+22.5+j);

ctx.quadraticCurveTo(prvx*s+11+i,prvy*s+27.5+j,prvx*s+8+i,prvy*s+27.5+j);
ctx.quadraticCurveTo(prvx*s+5+i,prvy*s+27.5+j,prvx*s+5+i,prvy*s+22.5+j);
ctx.closePath();
ctx.fill();

ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#FFFFFF";
ctx.beginPath();
ctx.arc(prvx*s+19+i,prvy*s+12.5+j,3,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();
ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#FFFFFF";
ctx.beginPath();
ctx.arc(prvx*s+11+i,prvy*s+12.5+j,3,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();

ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(prvx*s+19+i,prvy*s+12.5+j,1.5,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();
ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(prvx*s+11+i,prvy*s+12.5+j,1.5,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();

}
}
function draw5(posx,posy,s)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
ctx.strokeStyle = "#FFFF00";
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(posx*s+15,posy*s+15,12,0,Math.PI*2,true);
ctx.stroke();
ctx.closePath();
ctx.fill();

ctx.strokeStyle="#000000";
ctx.fillStyle="#000000";
ctx.beginPath();
ctx.moveTo(posx*s+15,posy*s+15);
ctx.lineTo(posx*s+26,posy*s+10);
ctx.arc(posx*s+15,posy*s+15,12.5,-Math.PI/8,Math.PI/8,false);
ctx.lineTo(posx*s+15,posy*s+15);
ctx.stroke();
ctx.closePath();
ctx.fill();

}
}

function drawPacman1(psx,psy,p1,prvx,prvy)
{   
    if(canvas.getContext)

{
    var rotate=0;
//alert("enters");
if(p1==1)
rotate=270;
if(p1==2)
rotate=90;
if(p1==3)
rotate=180;
ctx.save();
ctx.translate(prvx*s+15+i,prvy*s+15+j);
ctx.rotate(rotate*Math.PI/180);
ctx.translate(-(prvx*s+15+i),-(prvy*s+15+j));
ctx.strokeStyle = "#FFFF00";
 ctx.fillStyle="yellow";

ctx.beginPath();
ctx.arc(prvx*s+15+i,prvy*s+15+j,12,0,Math.PI*2,true);
ctx.stroke();
ctx.closePath();
ctx.fill();


ctx.strokeStyle="#000000"
ctx.fillStyle="#000000";
ctx.beginPath();
ctx.moveTo(prvx*s+15+i,prvy*s+15+j);
ctx.lineTo(prvx*s+26+i,prvy*s+10+j);
ctx.arc(prvx*s+15+i,prvy*s+15+j,12.5,-Math.PI/8,Math.PI/8,false);

ctx.lineTo(prvx*s+15+i,prvy*s+15+j);
ctx.stroke();
ctx.closePath();
ctx.fill();

ctx.restore();
}
}
function draw0(posx,posy,s,n)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");

if(n==2)
ctx.fillStyle ="#FF0000";
if(n==3)
    ctx.fillStyle="pink";
if(n==4)
    ctx.fillStyle="blue";
if(n==5)
    ctx.fillStyle="#FFE4B5";

ctx.beginPath();

ctx.moveTo(posx*s+5,posy*s+ 22.5);
ctx.quadraticCurveTo(posx*s+5, posy*s+2.5, posx*s+15,  posy*s+2.5);
ctx.quadraticCurveTo(posx*s+25,posy*s+ 2.5,posx*s+ 25,  posy*s+22.5);
//3 wavy things
ctx.quadraticCurveTo(posx*s+25,posy*s+27.2,posx*s+22,posy*s+27.5);
ctx.quadraticCurveTo(posx*s+19,posy*s+27.5,posx*s+19,posy*s+22.5);

ctx.quadraticCurveTo(posx*s+18,posy*s+27.5,posx*s+15,posy*s+ 27.5);
ctx.quadraticCurveTo(posx*s+12,posy*s+27.5,posx*s+12,posy*s+22.5);

ctx.quadraticCurveTo(posx*s+11,posy*s+27.5,posx*s+8,posy*s+27.5);
ctx.quadraticCurveTo(posx*s+5,posy*s+27.5,posx*s+5,posy*s+22.5);
ctx.closePath();
ctx.fill();
//eye
ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#FFFFFF";
ctx.beginPath();
ctx.arc(posx*s+19,posy*s+12.5,3,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();
ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#FFFFFF";
ctx.beginPath();
ctx.arc(posx*s+11,posy*s+12.5,3,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();
//eye balls

ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(posx*s+19,posy*s+12.5,1.5,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();
ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(posx*s+11,posy*s+12.5,1.5,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();

}
}
function drawWall(posx,posy,s)
{if(canvas.getContext)
{ctx.strokeStyle="000000";
ctx.fillStyle ="#000000";
ctx.beginPath();
ctx.moveTo(posx*s+0,posy*s+0);
ctx.lineTo(posx*s+30,posy*s+0);
ctx.lineTo(posx*s+30,posy*s+30);
ctx.lineTo(posx*s+0,posy*s+30);
ctx.lineTo(posx*s+0,posy*s+0);
ctx.closePath();
ctx.stroke();
ctx.fill();
ctx.strokeStyle="000000";
ctx.fillStyle ="#B22222";
ctx.beginPath();
ctx.moveTo(posx*s+2,posy*s+2);
ctx.lineTo(posx*s+28,posy*s+2);
ctx.lineTo(posx*s+28,posy*s+28);
ctx.lineTo(posx*s+2,posy*s+28);
ctx.lineTo(posx*s+2,posy*s+2);
ctx.closePath();
ctx.stroke();
ctx.fill();

}
}
function draw3(posx,posy,s)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");

ctx.strokeStyle = "#808080";
ctx.fillStyle = "#DCDCDC";
ctx.beginPath();
ctx.arc(posx*s+15,posy*s+15,8,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();

}
}
function draw(posx, posy,s,n)
{
    var canvas=document.getElementById("canvas");

if(canvas.getContext)
{
    var ctx=canvas.getContext("2d");

var clr="#FFA500";
ctx.strokeStyle = clr;
if(n==1)
ctx.fillStyle = "#FFA500";
else
    ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(posx*s+15,posy*s+15,5,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();

}
}

function doMovep1() {


var t=setInterval(function(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
var dx=0, dy=0;
ele=array[i2];
if(ele==1)
    { //alert("enters1");
 dx=cposx[count]-prevx[count];
 dy=cposy[count]-prevy[count];
    }
    else if(ele==2)
        {
        //  alert("enters2");
             dx=posx1[count]-prevx1[count];
             dy=posy1[count]-prevy1[count];
        }
     else if(ele==3)
         {// alert("enters3");
             dx=cposx2[count]-prevx2[count];
             dy=cposy2[count]-prevy2[count];
         }
      else if(ele==4)
          {
               dx=cposx3[count]-prevx3[count];
             dy=cposy3[count]-prevy3[count];
          }
var p1
if(dx>0)
{i=i+5;
p1=4;
}
else if(dx<0)
{i=i-5;
p1=3;
}
else if(dy>0)
{j=j+5;
p1=2;
}
else if(dy<0)
{j=j-5;
p1=1;
}
for(x=0;x<12;x=x+1){
    for(y=0;y<39;y=y+1){
       switch(map[x].charAt(y)){
            case 'W':
                drawWall(y,x,30);
                break;
            case 'e':
                draw(y,x,30,1);
                break;
            case 'E':
                draw3(y,x,30);
                break;
        
            case 'p':
                {
                    if(ele==1)
                     {

                     draw(prevx[count],prevy[count],30,0);
drawPacman1(cposx[count],cposy[count],p1,prevx[count],prevy[count]);
                        draw(cposx[count],cposy[count],30,0);
                     }
else
    draw5(y,x,30);
	break;
                }
                case 'g':
                    {
                        if(ele==2)
                            {

                            draw(prevx1[count],prevy1[count],30,0);
                            drawGhost1(posx1[count],posy1[count],p1,prevx1[count],prevy1[count]);
                                
                            }
                     /*   else if(ele==3)
                            drawGhost1(posx2[count],posy2[count],p1,prevx2[count],prevy2[count]);
                            */else
                               draw0(y,x,30,2);
                            break;
                    }
                    case 'h':
                        {
                            if(ele==3)
                                drawGhost1(cposx2[count],cposy2[count],p1,prevx2[count],prevy2[count]);
                            else
                                draw0(y,x,30,3);
                                break;
                        }
                        case 'o':
                            {
                                if(ele==4)
                                    {

                                    draw(cposx3[count],cposy3[count],30,0);
                                    drawGhost1(cposx3[count],cposy3[count],p1,prevx3[count],prevy3[count]);

                                    }
                                else
                                    draw0(y,x,30,4);
                                    break;
                            }
                       case 's':
                             
                                 if(ele==5)
                                     drawGhost1(cposx4[count],cposy4[count],p1,prevx4[count],prevy4[count]);
                                 else
                                     draw0(y,x,30,5);
                             
    }
}
}



//ctx.clearRect(0, 0, canvas.width, canvas.height);


},100);

count=count+1;
setTimeout(function(){clearInterval(t);},700);

}
function update()
{ if(i2==0)
map= ["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWeeWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWghosWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeWpeeeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"];

    if(i2==1)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWeeWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWghosWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW.peeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"];
else if(i2==2)
     map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWeoWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWgh.sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW.peeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"];
else if(i2==3)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeoeeeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWeeWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWgh.sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW.peeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"];
else if(i2==4)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeoeeeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWheWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWg..sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW.peeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"]
else if(i2==5)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeoeeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWheWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWg..sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW.peeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"]

else if(i2==6)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeoeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWheWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWg..sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW.peeeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"]

else if(i2==7)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeoeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWheWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWg..sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW..peeeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"]

else if(i2==8)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeoeeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWheWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWg..sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW...peeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"]

else if(i2==9)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeoeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWheWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWg..sWeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW...peeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"]

else if(i2==10)
    map=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeeeeeWeeeeeeeeWeeeEW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeoeeeWeW",
"WeWeWWeWWeeWWeWWeWeeWeWWeWWheWWeWWeWeW",
"WeeeeeeWGGGGWeeeeeeeeeeeeWg.s.WeeeeeeW",
"WeWeWWeWWWWWWeWWeWeeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeePWeeeEEeeeW...peeeeWeeeeW",
"WeeWWWWWeeeeWWWWWeeeeWWWWWeeeeWWWWWeeW",
"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"]
}

function main(){
canvas=document.getElementById("canvas");
canvas.style.backgroundColor="000000";
ctx=canvas.getContext("2d");

for(x=0;x<12;x=x+1){
    for(y=0;y<39;y=y+1){
       switch(map[x].charAt(y)){
            case 'W':
                drawWall(y,x,30);
                break;
            case 'e':
                draw(y,x,30,1);
                break;
            case 'E':
                draw3(y,x,30);
                break;
        
            case 'p':
                
				draw5(y,x,30);
				break;
                
            case 'g':
						
                draw0(y,x,30,2);
                break;
                    
            case 'h':
                            
                draw0(y,x,30,3);
                break;
            
			case 'o':
                draw0(y,x,30,4);
                break;
                     
			case 's':
                draw0(y,x,30,5);
                             }
}
}



var intervalId = setInterval(function(){
//getMove;
doMovep1();
i=0;
j=0;
i2++;
update();

},1000);
}