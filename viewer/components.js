var canvas=null;
var ctx=null;
var iP=0,jP=0,iA=0,jA=0,iB=0,jB=0,iC=0,jC=0,iD=0,jD=0,ip=0,jp=0,ia=0,ja=0,ib=0,jb=0,ic=0,jc=0,id=0,jd=0;
var s=30;
var x=0, y=0;
var p=0;
var a=0,b=0;

var dxp,dyp,dyP,dxP,dxa,dya,dxA,dyA,dxb,dyb,dxB,dyB,dxc,dyc,dxC,dyC,dxd,dxD,dyd,dyD;
var count=0;
var i2=0;

var map= ["WWWWWWWWWWWWWWWWWWWW",
"WEeeeWeeeeeeeeWeeeeW",
"WeWWeWeWWWWWWeWeWWeW",
"WeWeeeeeeAeBeeeeeWeW",
"WeWeWWeWW..WWeWWeWeW",
"WeeeeeeWC...WeeeeeeW",
"WeWeWWeWWWWWWeWWeWeW",
"WeWeeeeeeeeeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeD...PWeeeEW",
"WeeWWWWWeeeeWWWWWeeW",
"WEeeeWp...aeeeWeeeeW",
"WeWWeWeWWWWWWeWeWWeW",
"WeWeeeeeeeeeeeeeeWeW",
"WeWeWWeWWWWWWeWWeWeW",
"WeeeeeeW...bWeeeeeeW",
"WeWeWWeWW..WWeWWeWeW",
"WeWeeeeecedeeeeeeWeW",
"WeWWeWeWWWWWWeWeWWeW",
"WeeeeWeeeeeeeeWeeeEW",
"WWWWWWWWWWWWWWWWWWWW"];

var trace=new Array(7);
for (i=0; i <7; i++)
trace[i]=new Array(24);

trace[0]= [3,3,3,5,5,8,9,7,9,7,10,9,15,11,16,9,17,8,11,12,3,3,0,0];
trace[1]= [3,4,3,6,5,9,9,6,9,8,10,8,15,11,16,10,17,8,11,11,2,2,0,0];
trace[2]= [3,5,3,7,5,8,9,7,9,9,10,9,15,11,16,9,17,8,11,10,1,1,0,0];
trace[3]= [3,6,3,8,5,9,9,6,9,10,10,8,15,11,16,10,17,8,11,9,0,0,0,0];
trace[4]= [3,7,3,9,5,8,9,7,9,11,10,9,15,11,16,9,17,8,11,8,0,0,0,0];
trace[5]= [3,8,3,10,5,9,9,8,9,12,10,10,15,11,17,8,17,9,11,7,0,0,0,0];
trace[6]= [3,9,3,11,5,8,9,9,9,13,11,10,15,11,17,8,17,10,11,6,0,0,0,0];



window.onload=main;
function drawGhost1(psx,psy,pc,prvx,prvy)
{if(canvas.getContext)
{
//ctx.style.clear="#000000";
var i,j;
if(pc==1)
ctx.fillStyle ="#FF0000";
else if(pc==2)
    ctx.fillStyle="pink";
else if(pc==3)
    ctx.fillStyle="blue";
else
    ctx.setfillStyle="#FFE4B5";



if(pc==1)
{
i=ia;
j=ja;
}
else if(pc==2)
{i=ib;
j=jb;
}

else if(pc==3)
{
i=ic;
j=jc;
}

else if(pc==4)
{
i=id;
j=jd;
}

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
function drawGhost2(psx,psy,pc,prvx,prvy)
{if(canvas.getContext)
{
//ctx.style.clear="#000000";
var i,j;
if(pc==1)
ctx.fillStyle ="#FF0000";
else if(pc==2)
    ctx.fillStyle="pink";
else if(pc==3)
    ctx.fillStyle="blue";
else
    ctx.setfillStyle="#FFE4B5";



if(pc==1)
{
i=iA;
j=jA;
}
else if(pc==2)
{
i=iB;
j=jB;
}
else if(pc==3)
{
i=iC;
j=jC;
}
else
{
i=iD;
j=jD;
}
}
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
function draw5(posx,posy,s,c)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
if(c==1)
{ctx.strokeStyle = "#FFFF00";
ctx.fillStyle = "yellow";

}
else
{ctx.strokeStyle = "#1E90FF";
ctx.fillStyle = "#1E90FF";
}
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

function drawPacman1(psx,psy,p1,prvx,prvy,c)
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
//ctx.clearRect(psx*s,psy*s,psx*s+30,psy*s+30);
ctx.save();
var i=ip;
var j=jp;
ctx.translate(prvx*s+15+i,prvy*s+15+j);
ctx.rotate(rotate*Math.PI/180);
ctx.translate(-(prvx*s+15+i),-(prvy*s+15+j));
if(c==1)
{
ctx.strokeStyle = "#FFFF00";
 ctx.fillStyle="yellow";
}
else
{ctx.strokeStyle = "#1E90FF";
 ctx.fillStyle="#1E90FF";
}

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
function draw0(posx,posy,s,n,p)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
//if(p==1)
//{
if(n==1)
ctx.fillStyle ="#FF0000";
else if(n==2)
    ctx.fillStyle="pink";
else if(n==3)
    ctx.fillStyle="blue";
else
    ctx.fillStyle="#FFE4B5";
/*}
else
{if(n==1)
    ctx.setfillStyle="green";

else if(n==2)
    ctx.setfillStyle="#9370DB";

else if(n==3)
    ctx.setfillStyle="#9370DB";

else if(n==4)
    ctx.setfillStyle="#9370DB";
}
*/
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
function draw01(posx,posy,s,n)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
//if(p==1)
//{
if(n==1)
ctx.fillStyle ="#FF0000";
else if(n==2)
    ctx.fillStyle="pink";
else if(n==3)
    ctx.fillStyle="blue";
else
    ctx.fillStyle="#FFE4B5";
/*}
else
{if(n==1)
    ctx.setfillStyle="green";

else if(n==2)
    ctx.setfillStyle="#9370DB";

else if(n==3)
    ctx.setfillStyle="#9370DB";

else if(n==4)
    ctx.setfillStyle="#9370DB";
}
*/
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
function draw(posx, posy,s)
{
    var canvas=document.getElementById("canvas");

if(canvas.getContext)
{
    var ctx=canvas.getContext("2d");

ctx.strokeStyle = "#FFA500";
ctx.fillStyle = "#FFA500";
ctx.beginPath();
ctx.arc(posx*s+15,posy*s+15,5,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();
//ctx.fillStyle="#000000";
//ctx.fill();
}
}

function doMovep1() {
dxa=trace[i2+1][0]-trace[i2][0];
 dya=trace[i2+1][1]-trace[i2][1];
 
  dxb=trace[i2+1][2]-trace[i2][2];
 dyb=trace[i2+1][3]-trace[i2][3];
 
  dxc=trace[i2+1][4]-trace[i2][4];
 dyc=trace[i2+1][5]-trace[i2][5];
 
  dxd=trace[i2+1][6]-trace[i2][6];
 dyd=trace[i2+1][7]-trace[i2][7];
 
 dxp=trace[i2+1][8]-trace[i2][8];
 dyp=trace[i2+1][9]-trace[i2][9];
 
dxA=trace[i2+1][10]-trace[i2][10];
 dyA=trace[i2+1][11]-trace[i2][11];

dxB=trace[i2+1][12]-trace[i2][12];
 dyB=trace[i2+1][13]-trace[i2][13];

dxC=trace[i2+1][14]-trace[i2][14];
 dyC=trace[i2+1][15]-trace[i2][15];

dxD=trace[i2+1][16]-trace[i2][16];
 dyD=trace[i2+1][17]-trace[i2][17];

dxP=trace[i2+1][18]-trace[i2][18];
 dyP=trace[i2+1][19]-trace[i2][19]; 


var t=setInterval(function(){
ctx.clearRect(0, 0, canvas.width, canvas.height);

 for(x=0;x<21;x=x+1){
    for(y=0;y<21;y=y+1){
       switch(map[x].charAt(y)){
            case 'W':
                drawWall(y,x,30);
                break;
            case 'e':
                draw(y,x,30);
                break;
            case 'E':
                draw3(y,x,30);
                break;
        }
		}
		}

if(dxa>0)
ia+=5;
else if(dya>0)
ja+=5;
else if(dxa<0)
ia-=5;
else
ja-=5;

if(dxb>0)
ib+=5;
else if(dyb>0)
jb+=5;
else if(dxb<0)
ib-=5;
else
jb-=5;

if(dxc>0)
ic+=5;
else if(dyc>0)
jc+=5;
else if(dxc<0)
ic-=5;
else
jc-=5;

if(dxd>0)
id+=5;
else if(dyd>0)
jd+=5;
else if(dxd<0)
id-=5;
else
jd-=5;

var p1
if(dxp>0)
{ip=ip+5;
p1=4;
}
else if(dxp<0)
{ip=ip-5;
p1=3;
}
else if(dyp>0)
{jp=jp+5;
p1=2;
}
else if(dyp<0)
{jp=jp-5;
p1=1;
}

var p2
if(dxP>0)
{iP=iP+5;
p2=4;
}
else if(dxP<0)
{i=i-5;
p2=3;
}
else if(dyP>0)
{jP=jP+5;
p2=2;
}
else if(dyP<0)
{jP=jP-5;
p2=1;
}


if(dxA>0)
iA+=5;
else if(dyA>0)
jA+=5;
else if(dxA<0)
iA-=5;
else
jA-=5;

if(dxB>0)
iB+=5;
else if(dyB>0)
jB+=5;
else if(dxB<0)
iB-=5;
else
jB-=5;

if(dxC>0)
iC+=5;
else if(dyC>0)
jC+=5;
else if(dxC<0)
iC-=5;
else
jC-=5;

if(dxD>0)
iD+=5;
else if(dyD>0)
jD+=5;
else if(dxD<0)
iD-=5;
else
jD-=5;


for(x=0;x<21;x=x+1){
    for(y=0;y<21;y=y+1){
       switch(map[x].charAt(y)){
           case 'W':
                drawWall(y,x,30);
                break;
           case 'e':
                draw(y,x,30);
                break;
            case 'E':
                draw3(y,x,30);
                break;
        
            case 'p':
                
                    if(dxp>0 || dyp>0)
                    {ctx. fillStyle = "#FF0000";
//ctx.clearRect(trace[i2][8]*s, trace[i2][9]*s, trace[i2][8]*s+30, trace[i2][9]*s+30);     
drawPacman1(trace[i2+1][8],trace[i2+1][9],p1,trace[i2][8],trace[i2][9],1);
                        }
else
    draw5(y,x,30,1);
	break;
                
               case 'a':
                    
                        if(dxa>0 || dya>0)
                            drawGhost1(trace[i2+1][i2+1],trace[1][1],1,trace[i2][0],trace[i2][1]);

						else
                               draw0(y,x,30,1);
                            break;
                    
                    case 'b':
                        
                           // document.write(dxb);
							//document.write(dyb);
							if(dxb>0 || dyb>0)
                                drawGhost1(trace[i2+1][i2+2],trace[1][3],2,trace[i2][2],trace[i2][3]);
                            else
                                draw0(y,x,30,2);
                                break;
                        
                        case 'c':
                            
                                if(dxc>0 || dyc>0)
                                    drawGhost1(trace[i2+1][4],trace[i2+1][5],3,trace[i2][4],trace[i2][5]);
                                else
                                    draw0(y,x,30,3);
                                    break;
                            
                       case 'd':
                             
                                 if(dxd>0 || dyd>0)
                                     drawGhost1(trace[i2+1][6],trace[i2+1][7],4,trace[i2][6],trace[i2][7]);
                                 else
                                     draw0(y,x,30,4);
									 case 'p':
                
                    if(dxP>0 || dyP>0)
                    {ctx. fillStyle = "#FF0000";
//ctx.clearRect (trace[i2][18]*s, trace[i2][19]*s, trace[i2][18]*s+30, trace[i2][19]*s+30);    
drawPacman1(trace[i2+1][18],trace[i2+1][19],p2,trace[i2][18],trace[i2][19],2);
                        }
else
    draw5(y,x,30,2);
	break;
                
                case 'A':
                    
                        if(dxA>0 || dyA>0)
                            drawGhost2(trace[i2+1][10],trace[i2+1][11],1,trace[i2][10],trace[i2][11]);

						else
                               draw01(y,x,30,1);
                            break;
                    
                    case 'B':
                        
                            if(dxB>0 || dyB>0)
                                drawGhost2(trace[i2+1][12],trace[i2+1][13],2,trace[i2][12],trace[i2][13]);
                            else
                                draw0(y,x,30,2);
                                break;
                        
                        case 'C':
                            
                                if(dxC>0 || dyC>0)
                                    drawGhost2(trace[i2+1][14],trace[i2+1][15],3,trace[i2][14],trace[i2][15]);
                                else
                                    draw0(y,x,30,3);
                                    break;
                            
                       case 'D':
                             
                                 if(dxD>0 || dyD>0)
                                     drawGhost2(trace[i2+1][16],trace[i2+1][17],4,trace[i2][16],trace[i2][17]);
                                 else
                                     draw0(y,x,30,4);
                             
    }
}
}



//ctx.clearRect(0, 0, canvas.width, canvas.height);


},100);

count=count+1;
setTimeout(function(){clearInterval(t);},700);

}


function main(){
canvas=document.getElementById("canvas");
canvas.style.backgroundColor="000000";
ctx=canvas.getContext("2d");
//initial map
for(x=0;x<21;x=x+1){
    for(y=0;y<21;y=y+1){
       switch(map[x].charAt(y)){
            case 'W':
                drawWall(y,x,30);
                break;
            case 'e':
                draw(y,x,30);
                break;
            case 'E':
                draw3(y,x,30);
                break;
        
            case 'p':
                
				draw5(y,x,30);
				break;
                
            case 'a':
			draw0(y,x,30,1);
			break;
			
			case 'A':
						
                draw0(y,x,30,1);
                break;
                    
            case 'b':
			draw0(y,x,30,2);
			break;
			
			case 'B':
                            
                draw0(y,x,30,2);
                break;
            
			case 'c':
			draw0(y,x,30,3);
			break;
			
			case 'C':
                draw0(y,x,30,3);
                break;
                     
			case 'd':
			draw0(y,x,30,4);
			break;
			case 'D':
                draw0(y,x,30,4);
                             }
}
}


var intervalId = setInterval(function(){
//getMove;

doMovep1();

i=0;
j=0;


i2++;
},1000);
}