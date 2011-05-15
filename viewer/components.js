function draw(posx, posy,s)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
var clr="#FFA500";
ctx.strokeStyle = clr;
ctx.fillStyle = "#FFA500";
ctx.beginPath();
ctx.arc(posx*s+15,posy*s+15,5,0,Math.PI*2,true);
ctx.closePath();
ctx.stroke();
ctx.fill();

}
}
function draw1(posx,posy,s)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
ctx.fillStyle ="#FF0000";
ctx.beginPath();

ctx.moveTo(posx*s+5,posy*s+ 22.5);
ctx.quadraticCurveTo(posx*s+5, posy*s+2.5, posx*s+15,  posy*s+2.5);
ctx.quadraticCurveTo(posx*s+25,posy*s+ 2.5,posx*s+ 25,  posy*s+22.5);

ctx.quadraticCurveTo(posx*s+25,posy*s+27.2,posx*s+22,posy*s+27.5);
ctx.quadraticCurveTo(posx*s+19,posy*s+27.5,posx*s+19,posy*s+22.5);

ctx.quadraticCurveTo(posx*s+18,posy*s+27.5,posx*s+15,posy*s+ 27.5);
ctx.quadraticCurveTo(posx*s+12,posy*s+27.5,posx*s+12,posy*s+22.5);

ctx.quadraticCurveTo(posx*s+11,posy*s+27.5,posx*s+8,posy*s+27.5);
ctx.quadraticCurveTo(posx*s+5,posy*s+27.5,posx*s+5,posy*s+22.5);
ctx.closePath();
ctx.fill();

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

function draw2(posx,posy,s)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
ctx.strokeStyle = "#FFFF00";
ctx.fillStyle = "#FFF000";
ctx.beginPath();
ctx.arc(posx*s+15,posy*s+15,12,0,Math.PI*2,true);
ctx.stroke();
ctx.closePath();
ctx.fill();

ctx.strokeStyle="#FFFFFF"
ctx.fillStyle="#FFFFFF";
ctx.beginPath();
ctx.moveTo(posx*s+15,posy*s+15);
ctx.lineTo(posx*s+26,posy*s+10);
ctx.arc(posx*s+15,posy*s+15,12,-Math.PI/8,Math.PI/8,false);

ctx.lineTo(posx*s+15,posy*s+15);
ctx.stroke();
ctx.closePath();
ctx.fill();

ctx.strokeStyle = "#EEE";
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(posx*s+14,posy*s+8,1,0,Math.PI*2,true);
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
function draw4(posx,posy,s)
{var canvas=document.getElementById("canvas");
if(canvas.getContext)
{var ctx=canvas.getContext("2d");
ctx.strokeStyle="000000";
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