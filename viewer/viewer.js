var canvas = null;

var ctx = null;

var score1 = 0;

var score2 = 0;



//positions of Pacman1, Ghost11, Ghost12, Ghost13, Ghost14, pacman2, Ghost21, Ghost22, Ghost23, Ghost24
var iP = 0,
    jP = 0,
    iA = 0,
    jA = 0,
    iB = 0,
    jB = 0,
    iC = 0,
    jC = 0,
    iD = 0,
    jD = 0,
    ip = 0,
    jp = 0,
    ia = 0,
    ja = 0,
    ib = 0,
    jb = 0,
    ic = 0,
    jc = 0,
    id = 0,
    jd = 0;

//block size
var s = 30;

//displacement along x and y
var dxp, dyp, dyP, dxP, dxa, dya, dxA, dyA, dxb, dyb, dxB, dyB, dxc, dyc, dxC, dyC, dxd, dxD, dyd, dyD;

//var count=0;
var map, map2;

var i2 = 0;

//initial state
var no_of_moves = 0;

String.prototype.setCharAt = function (index, chr) {

    if (index > this.length - 1) return str;

    return this.substr(0, index) + chr + this.substr(index + 1);

}





var zg = 0;

var arr = new Array(1001);

var arr1 = new Array(1001);

var trace = new Array(1001);

for (zg = 0; zg < 1001; zg++)

trace[zg] = new Array(24);



window.onload = main;



//Load the trace file

function fileLoad()

{

    var z = 0;

    $(document).ready(function () {

        $("#text").load("trace.txt");

        alert("The game begins now");

        var myTextField = document.getElementById('text').innerHTML;

        var zl, zb;

        arr = myTextField.split("\n");

        var num = arr.length - 1;

        no_of_moves = num;

        for (z = num - 1, zb = 0; z >= 0; z--, zb++)

        {

            trace[z] = arr[zb].split(" ");

        }



        for (z = 0; z < num; z++)

        {

            for (zl = 0; zl < 24; zl++)

            trace[z][zl] = parseInt(trace[z][zl], 10);

        }



    });



}



//Load the map

function loadMap()

{

    $(document).ready(function () {

        $("#text").load("./maps/map");

        alert("Map loaded");

        var myTextField = document.getElementById('text').innerHTML;

        var zl, zb;

        map = myTextField.split("\n");

        map2 = myTextField.split("\n");

        mapr = map.length - 1;

        mapc = map[0].length + 1;

    });

}

//Player1's ghosts

function drawGhost1(pc, prvx, prvy)

{

    if (canvas.getContext)

    {

        var i, j;

        if (trace[i2][22] == 1)

        ctx.fillStyle = "#F5FFFA";

        else ctx.fillStyle = "pink";

        if (pc == 1)

        {

            i = iA;

            j = jA;

        } else if (pc == 2)

        {

            i = iB;

            j = jB;

        } else if (pc == 3)

        {

            i = iC;

            j = jC;

        } else if (pc == 4)

        {

            i = iD;

            j = jD;

        }

        ctx.beginPath();

        ctx.moveTo(prvx * s + 5 + i, prvy * s + 22.5 + j);

        ctx.quadraticCurveTo(prvx * s + 5 + i, prvy * s + 2.5 + j, prvx * s + 15 + i, prvy * s + 2.5 + j);

        ctx.quadraticCurveTo(prvx * s + 25 + i, prvy * s + 2.5 + j, prvx * s + 25 + i, prvy * s + 22.5 + j);

        ctx.quadraticCurveTo(prvx * s + 25 + i, prvy * s + 27.2 + j, prvx * s + 22 + i, prvy * s + 27.5 + j);

        ctx.quadraticCurveTo(prvx * s + 19 + i, prvy * s + 27.5 + j, prvx * s + 19 + i, prvy * s + 22.5 + j);

        ctx.quadraticCurveTo(prvx * s + 18 + i, prvy * s + 27.5 + j, prvx * s + 15 + i, prvy * s + 27.5 + j);

        ctx.quadraticCurveTo(prvx * s + 12 + i, prvy * s + 27.5 + j, prvx * s + 12 + i, prvy * s + 22.5 + j);

        ctx.quadraticCurveTo(prvx * s + 11 + i, prvy * s + 27.5 + j, prvx * s + 8 + i, prvy * s + 27.5 + j);

        ctx.quadraticCurveTo(prvx * s + 5 + i, prvy * s + 27.5 + j, prvx * s + 5 + i, prvy * s + 22.5 + j);

        ctx.closePath();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(prvx * s + 19 + i, prvy * s + 12.5 + j, 3, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(prvx * s + 11 + i, prvy * s + 12.5 + j, 3, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.arc(prvx * s + 19 + i, prvy * s + 12.5 + j, 1.5, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.arc(prvx * s + 11 + i, prvy * s + 12.5 + j, 1.5, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

    }

}



//Player2's ghosts

function drawGhost2(pc, prvx, prvy)

{

    if (canvas.getContext)

    {

        var i, j;

        if (trace[i2][23] == 1)

        ctx.fillStyle = "#F5FFFA";

        else ctx.fillStyle = "#FF0000";

        if (pc == 1)

        {

            i = ia;

            j = ja;

        } else if (pc == 2)

        {

            i = ib;

            j = jb;

        } else if (pc == 3)

        {

            i = ic;

            j = jc;

        } else

        {

            i = id;

            j = jd;

        }



        ctx.beginPath();



        ctx.moveTo(prvx * s + 5 + i, prvy * s + 22.5 + j);

        ctx.quadraticCurveTo(prvx * s + 5 + i, prvy * s + 2.5 + j, prvx * s + 15 + i, prvy * s + 2.5 + j);

        ctx.quadraticCurveTo(prvx * s + 25 + i, prvy * s + 2.5 + j, prvx * s + 25 + i, prvy * s + 22.5 + j);



        ctx.quadraticCurveTo(prvx * s + 25 + i, prvy * s + 27.2 + j, prvx * s + 22 + i, prvy * s + 27.5 + j);

        ctx.quadraticCurveTo(prvx * s + 19 + i, prvy * s + 27.5 + j, prvx * s + 19 + i, prvy * s + 22.5 + j);



        ctx.quadraticCurveTo(prvx * s + 18 + i, prvy * s + 27.5 + j, prvx * s + 15 + i, prvy * s + 27.5 + j);

        ctx.quadraticCurveTo(prvx * s + 12 + i, prvy * s + 27.5 + j, prvx * s + 12 + i, prvy * s + 22.5 + j);



        ctx.quadraticCurveTo(prvx * s + 11 + i, prvy * s + 27.5 + j, prvx * s + 8 + i, prvy * s + 27.5 + j);

        ctx.quadraticCurveTo(prvx * s + 5 + i, prvy * s + 27.5 + j, prvx * s + 5 + i, prvy * s + 22.5 + j);

        ctx.closePath();

        ctx.fill();



        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(prvx * s + 19 + i, prvy * s + 12.5 + j, 3, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(prvx * s + 11 + i, prvy * s + 12.5 + j, 3, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();



        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.arc(prvx * s + 19 + i, prvy * s + 12.5 + j, 1.5, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.arc(prvx * s + 11 + i, prvy * s + 12.5 + j, 1.5, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();



    }

}



//Stationary pacman

function spacman(posx, posy, c)

{

    var canvas = document.getElementById("canvas");

    if (canvas.getContext)

    {

        var ctx = canvas.getContext("2d");

        if (c == 1)

        {

            ctx.strokeStyle = "#FFFF00";

            ctx.fillStyle = "yellow";

        } else

        {

            ctx.strokeStyle = "#1E90FF";

            ctx.fillStyle = "#1E90FF";

        }

        ctx.beginPath();

        ctx.arc(posx * s + 15, posy * s + 15, 12, 0, Math.PI * 2, true);

        ctx.stroke();

        ctx.closePath();

        ctx.fill();

        ctx.strokeStyle = "#000000";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.moveTo(posx * s + 15, posy * s + 15);

        ctx.lineTo(posx * s + 26, posy * s + 10);

        ctx.arc(posx * s + 15, posy * s + 15, 12.5, -Math.PI / 8, Math.PI / 8, false);

        ctx.lineTo(posx * s + 15, posy * s + 15);

        ctx.stroke();

        ctx.closePath();

        ctx.fill();



    }

}

//Player1's pacman

function drawPacman1(p, prvx, prvy)

{

    if (canvas.getContext)

    {

        var rotate = 0;

        if (p == 1)

        rotate = 270;

        if (p == 2)

        rotate = 90;

        if (p == 3)

        rotate = 180;

        ctx.save();

        var i = iP;

        var j = jP;

        ctx.translate(prvx * s + 15 + i, prvy * s + 15 + j);

        ctx.rotate(rotate * Math.PI / 180);

        ctx.translate(-(prvx * s + 15 + i), -(prvy * s + 15 + j));



        ctx.strokeStyle = "#FFFF00";

        ctx.fillStyle = "yellow";



        ctx.beginPath();

        ctx.arc(prvx * s + 15 + i, prvy * s + 15 + j, 12, 0, Math.PI * 2, true);

        ctx.stroke();

        ctx.closePath();

        ctx.fill();



        ctx.strokeStyle = "#000000"

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.moveTo(prvx * s + 15 + i, prvy * s + 15 + j);

        ctx.lineTo(prvx * s + 26 + i, prvy * s + 10 + j);

        ctx.arc(prvx * s + 15 + i, prvy * s + 15 + j, 12.5, -Math.PI / 8, Math.PI / 8, false);



        ctx.lineTo(prvx * s + 15 + i, prvy * s + 15 + j);

        ctx.stroke();

        ctx.closePath();

        ctx.fill();



        ctx.restore();

    }

}



//Player2's pacman

function drawPacman2(p, prvx, prvy)

{

    if (canvas.getContext)

    {

        var rotate = 0;

        if (p == 1)

        rotate = 270;

        if (p == 2)

        rotate = 90;

        if (p == 3)

        rotate = 180;

        ctx.save();

        var i = ip;

        var j = jp;

        ctx.translate(prvx * s + 15 + i, prvy * s + 15 + j);

        ctx.rotate(rotate * Math.PI / 180);

        ctx.translate(-(prvx * s + 15 + i), -(prvy * s + 15 + j));

        ctx.strokeStyle = "#1E90FF";

        ctx.fillStyle = "#1E90FF";



        ctx.beginPath();

        ctx.arc(prvx * s + 15 + i, prvy * s + 15 + j, 12, 0, Math.PI * 2, true);

        ctx.stroke();

        ctx.closePath();

        ctx.fill();



        ctx.strokeStyle = "#000000"

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.moveTo(prvx * s + 15 + i, prvy * s + 15 + j);



        ctx.lineTo(prvx * s + 26 + i, prvy * s + 10 + j);

        ctx.arc(prvx * s + 15 + i, prvy * s + 15 + j, 12.5, -Math.PI / 8, Math.PI / 8, false);



        ctx.lineTo(prvx * s + 15 + i, prvy * s + 15 + j);

        ctx.stroke();

        ctx.closePath();

        ctx.fill();



        ctx.restore();

    }

}



//Stationary ghost

function sghost(posx, posy, n, p)

{

    var canvas = document.getElementById("canvas");

    if (canvas.getContext)

    {

        var ctx = canvas.getContext("2d");

        if (n == 1)

        ctx.fillStyle = "pink";

        else ctx.fillStyle = "#FF0000";

        ctx.beginPath();



        ctx.moveTo(posx * s + 5, posy * s + 22.5);

        ctx.quadraticCurveTo(posx * s + 5, posy * s + 2.5, posx * s + 15, posy * s + 2.5);

        ctx.quadraticCurveTo(posx * s + 25, posy * s + 2.5, posx * s + 25, posy * s + 22.5);

        //3 wavy things
        ctx.quadraticCurveTo(posx * s + 25, posy * s + 27.2, posx * s + 22, posy * s + 27.5);

        ctx.quadraticCurveTo(posx * s + 19, posy * s + 27.5, posx * s + 19, posy * s + 22.5);



        ctx.quadraticCurveTo(posx * s + 18, posy * s + 27.5, posx * s + 15, posy * s + 27.5);

        ctx.quadraticCurveTo(posx * s + 12, posy * s + 27.5, posx * s + 12, posy * s + 22.5);



        ctx.quadraticCurveTo(posx * s + 11, posy * s + 27.5, posx * s + 8, posy * s + 27.5);

        ctx.quadraticCurveTo(posx * s + 5, posy * s + 27.5, posx * s + 5, posy * s + 22.5);

        ctx.closePath();

        ctx.fill();

        //eye
        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(posx * s + 19, posy * s + 12.5, 3, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(posx * s + 11, posy * s + 12.5, 3, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        //eye balls
        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.arc(posx * s + 19, posy * s + 12.5, 1.5, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "#EEE";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.arc(posx * s + 11, posy * s + 12.5, 1.5, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

    }

}



//Wall

function drawWall(posx, posy)

{

    if (canvas.getContext)

    {

        ctx.strokeStyle = "000000";

        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.moveTo(posx * s + 0, posy * s + 0);

        ctx.lineTo(posx * s + 30, posy * s + 0);

        ctx.lineTo(posx * s + 30, posy * s + 30);

        ctx.lineTo(posx * s + 0, posy * s + 30);

        ctx.lineTo(posx * s + 0, posy * s + 0);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

        ctx.strokeStyle = "000000";

        ctx.fillStyle = "#B22222";

        ctx.beginPath();

        ctx.moveTo(posx * s + 2, posy * s + 2);

        ctx.lineTo(posx * s + 28, posy * s + 2);

        ctx.lineTo(posx * s + 28, posy * s + 28);

        ctx.lineTo(posx * s + 2, posy * s + 28);

        ctx.lineTo(posx * s + 2, posy * s + 2);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

    }

}

//Power pellet

function drawPp(posx, posy)

{

    var canvas = document.getElementById("canvas");

    if (canvas.getContext)

    {

        var ctx = canvas.getContext("2d");

        ctx.strokeStyle = "#808080";

        ctx.fillStyle = "#DCDCDC";

        ctx.beginPath();

        ctx.arc(posx * s + 15, posy * s + 15, 8, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

    }

}



//Pellet

function drawP(posx, posy)

{

    var canvas = document.getElementById("canvas");

    if (canvas.getContext)

    {

        var ctx = canvas.getContext("2d");

        ctx.strokeStyle = "#FFA500";

        ctx.fillStyle = "#FFA500";

        ctx.beginPath();

        ctx.arc(posx * s + 15, posy * s + 15, 5, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.stroke();

        ctx.fill();

    }

}



function doMove()

{

    if (i2 == no_of_moves)

    {

        ctx.font = "bold 40px sans-serif";

        ctx.fillStyle = "#FFFF00";

        if (trace[i2 - 1][22] == -1 && trace[i2 - 1][23] == -1)

        {

            if (score1 > score2)

            ctx.fillText("Player 1 wins!", mapc * 30 + 20, 500);

            else if (score2 > score1)

            ctx.fillText("Player 2 wins!", mapc * 30 + 20, 500);

            else ctx.fillText("Tie!", mapc * 30 + 20, 500);



        } else if (trace[i2 - 1][22] == -1)

        {

            ctx.fillText("Player 2 wins!", mapc * 30 + 20, 500);

        } else if (trace[i2 - 1][23] == -1)

        {

            ctx.fillText("Player 1 wins!", mapc * 30 + 20, 500);

        } else if (trace[i2 - 1][22] != -1 && trace[i2 - 1][23] != -1)

        {

            if (score1 > score2)

            ctx.fillText("Player 1 wins!", mapc * 30 + 20, 500);

            else if (score2 > score1)

            ctx.fillText("Player 2 wins!", mapc * 30 + 20, 500);

            else ctx.fillText("Tie!", mapc * 30 + 20, 500);

        }





    }

    if (i2 < no_of_moves)

    {

        var t = setInterval(function () {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (no_of_moves >= i2)

            {

                score1 = trace[i2 - 1][20];

                score2 = trace[i2 - 1][21];

            }



            ctx.font = "bold 20px sans-serif";

            ctx.fillStyle = "#FFFFFF";

            var str = "Player 1 Score:" + score1;

            var str1 = "Player 2 Score:" + score2;

            ctx.fillText(str, mapc * 30 + 20, 200);

            ctx.fillText(str1, mapc * 30 + 20, 300);

            ctx.fill();

            for (x = 0; x < mapr; x = x + 1)

            {

                for (y = 0; y < mapc - 1; y = y + 1)

                {

                    switch (map2[x].charAt(y))

                    {

                    case 'W':

                        drawWall(y, x);

                        break;

                    case 'e':

                        drawP(y, x);

                        break;

                    case 'E':

                        drawPp(y, x);

                        break;

                    }

                }

            }

            //update map2
            map2[trace[i2 - 1][18]] = map2[trace[i2 - 1][18]].setCharAt(trace[i2 - 1][19], '.');

            map2[trace[i2 - 1][8]] = map2[trace[i2 - 1][8]].setCharAt(trace[i2 - 1][9], '.');



            if (dxa > 0)

            ia += 5;

            else if (dya > 0)

            ja += 5;

            else if (dxa < 0)

            ia -= 5;

            else if (dya < 0)

            ja -= 5;



            if (dxb > 0)

            ib += 5;

            else if (dyb > 0)

            jb += 5;

            else if (dxb < 0)

            ib -= 5;

            else if (dyb < 0)

            jb -= 5;



            if (dxc > 0)

            ic += 5;

            else if (dyc > 0)

            jc += 5;

            else if (dxc < 0)

            ic -= 5;

            else if (dyc < 0)

            jc -= 5;



            if (dxd > 0)

            id += 5;

            else if (dyd > 0)

            jd += 5;

            else if (dxd < 0)

            id -= 5;

            else if (dyd < 0)

            jd -= 5;



            var p2;

            if (dxp > 0)

            {

                ip = ip + 5;

                p2 = 4;

            } else if (dxp < 0)

            {

                ip = ip - 5;

                p2 = 3;

            } else if (dyp > 0)

            {

                jp = jp + 5;

                p2 = 2;

            } else if (dyp < 0)

            {

                jp = jp - 5;

                p2 = 1;

            }



            var p1;

            if (dxP > 0)

            {

                iP = iP + 5;

                p1 = 4;

            } else if (dxP < 0)

            {

                iP = iP - 5;

                p1 = 3;

            } else if (dyP > 0)

            {

                jP = jP + 5;

                p1 = 2;

            } else if (dyP < 0)

            {

                jP = jP - 5;

                p1 = 1;

            }



            if (dxA > 0)

            iA += 5;

            else if (dyA > 0)

            jA += 5;

            else if (dxA < 0)

            iA -= 5;

            else if (dyA < 0)

            jA -= 5;



            if (dxB > 0)

            iB += 5;

            else if (dyB > 0)

            jB += 5;

            else if (dxB < 0)

            iB -= 5;

            else if (dyB < 0)

            jB -= 5;



            if (dxC > 0)

            iC += 5;

            else if (dyC > 0)

            jC += 5;

            else if (dxC < 0)

            iC -= 5;

            else if (dyC < 0)

            jC -= 5;



            if (dxD > 0)

            iD += 5;

            else if (dyD > 0)

            jD += 5;

            else if (dxD < 0)

            iD -= 5;

            else if (dyD < 0)

            jD -= 5;





            for (x = 0; x < mapr; x = x + 1)

            {

                for (y = 0; y < mapc - 1; y = y + 1)

                {

                    switch (map[x].charAt(y))

                    {

                    case 'P':

                        if (dxP != 0 || dyP != 0)

                        drawPacman1(p1, trace[i2 - 1][9], trace[i2 - 1][8]);

                        else spacman(trace[i2 - 1][9], trace[i2 - 1][8], 1);

                        break;

                    case 'p':

                        if (dxp != 0 || dyp != 0)

                        drawPacman2(p2, trace[i2 - 1][19], trace[i2 - 1][18]);

                        else spacman(trace[i2 - 1][19], trace[i2 - 1][18], 2);

                        break;

                    case 'A':

                        if (dxA != 0 || dyA != 0)

                        drawGhost1(1, trace[i2 - 1][1], trace[i2 - 1][0]);

                        else sghost(trace[i2 - 1][1], trace[i2 - 1][0], 1);

                        break;

                    case 'B':

                        if (dxB != 0 || dyB != 0)

                        drawGhost1(2, trace[i2 - 1][3], trace[i2 - 1][2]);

                        else sghost(trace[i2 - 1][3], trace[i2 - 1][2], 1);

                        break;



                    case 'C':

                        if (dxC != 0 || dyC != 0)

                        drawGhost1(3, trace[i2 - 1][5], trace[i2 - 1][4]);

                        else sghost(trace[i2 - 1][5], trace[i2 - 1][4], 1);

                        break;



                    case 'D':

                        if (dxD != 0 || dyD != 0)

                        drawGhost1(4, trace[i2 - 1][7], trace[i2 - 1][6]);

                        else sghost(y, x, 1);

                        break;



                    case 'a':

                        if (dxa != 0 || dya != 0)

                        drawGhost2(1, trace[i2 - 1][11], trace[i2 - 1][10]);

                        else sghost(trace[i2 - 1][11], trace[i2 - 1][10], 2);

                        break;



                    case 'b':

                        if (dxb != 0 || dyb != 0)

                        drawGhost2(2, trace[i2 - 1][13], trace[i2 - 1][12]);

                        else sghost(trace[i2 - 1][13], trace[i2 - 1][12], 2);

                        break;



                    case 'c':

                        if (dxc != 0 || dyc != 0)



                        drawGhost2(3, trace[i2 - 1][15], trace[i2 - 1][14]);

                        else sghost(trace[i2 - 1][15], trace[i2 - 1][14], 2);

                        break;



                    case 'd':

                        if (dxd != 0 || dyd != 0)

                        drawGhost2(4, trace[i2 - 1][17], trace[i2 - 1][16]);

                        else sghost(trace[i2 - 1][17], trace[i2 - 1][16], 2);

                    }

                }

            }





            //update map


            map[trace[i2][18]] = map[trace[i2][18]].setcharAt(trace[i2][19], 'p');

            map[trace[i2][8]] = map[trace[i2][8]].setcharAt(trace[i2][9], 'P');

            map[trace[i2][16]] = map[trace[i2][16]].setcharAt(trace[i2][17], 'd');

            map[trace[i2][6]] = map[trace[i2][6]].setcharAt(trace[i2][7], 'D');

            map[trace[i2][14]] = map[trace[i2][14]].setcharAt(trace[i2][15], 'c');

            map[trace[i2][4]] = map[trace[i2][4]].setcharAt(trace[i2][5], 'C');

            map[trace[i2][12]] = map[trace[i2][12]].setcharAt(trace[i2][13], 'b');

            map[trace[i2][2]] = map[trace[i2][2]].setcharAt(trace[i2][3], 'B');

            map[trace[i2][10]] = map[trace[i2][10]].setcharAt(trace[i2][11], 'a');

            map[trace[i2][0]] = map[trace[i2][0]].setcharAt(trace[i2][1], 'A');

            document.write(map);

        }, 100);



        setTimeout(function () {
            clearInterval(t);
        }, 700);

    }

}



function main()

{

    canvas = document.getElementById("canvas");

    canvas.style.backgroundColor = "000000";

    ctx = canvas.getContext("2d");



    //initial map
    fileLoad();

    loadMap();

    for (x = 0; x < mapr; x = x + 1)

    {

        for (y = 0; y < mapc - 1; y = y + 1)

        {

            switch (map[x].charAt(y))

            {

            case 'W':

                drawWall(y, x);

                break;

            case 'e':

                drawP(y, x);

                break;

            case 'E':

                drawPp(y, x);

                break;

            case 'p':

                spacman(y, x, 2);

                break;

            case 'P':

                spacman(y, x, 1);

                break;



            case 'A':

                sghost(y, x, 1);

                break;



            case 'a':

                sghost(y, x, 2);

                break;

            case 'B':

                sghost(y, x, 1);

                break;



            case 'b':

                sghost(y, x, 2);

                break;



            case 'C':

                sghost(y, x, 1);

                break;



            case 'c':

                sghost(y, x, 2);

                break;



            case 'D':

                sghost(y, x, 1);

                break;



            case 'd':

                sghost(y, x, 2);

            }

        }

    }



    //call doMove every 1 second
    var intervalId = setInterval(function () {

        //getMove;


        dyA = trace[i2 + 1][0] - trace[i2][0];

        dxA = trace[i2 + 1][1] - trace[i2][1];



        dyB = trace[i2 + 1][2] - trace[i2][2];

        dxB = trace[i2 + 1][3] - trace[i2][3];



        dyC = trace[i2 + 1][4] - trace[i2][4];

        dxC = trace[i2 + 1][5] - trace[i2][5];



        dyD = trace[i2 + 1][6] - trace[i2][6];

        dxD = trace[i2 + 1][7] - trace[i2][7];



        dyP = trace[i2 + 1][8] - trace[i2][8];

        dxP = trace[i2 + 1][9] - trace[i2][9];



        dya = trace[i2 + 1][10] - trace[i2][10];

        dxa = trace[i2 + 1][11] - trace[i2][11];



        dyb = trace[i2 + 1][12] - trace[i2][12];

        dxb = trace[i2 + 1][13] - trace[i2][13];



        dyc = trace[i2 + 1][14] - trace[i2][14];

        dxc = trace[i2 + 1][15] - trace[i2][15];



        dyd = trace[i2 + 1][16] - trace[i2][16];

        dxd = trace[i2 + 1][17] - trace[i2][17];



        dyp = trace[i2 + 1][18] - trace[i2][18];

        dxp = trace[i2 + 1][19] - trace[i2][19];







        doMove();



        ip = 0;

        jp = 0;

        ia = 0;

        ib = 0;

        ic = 0;

        id = 0;

        ja = 0;

        jb = 0;

        jc = 0;

        jd = 0;



        iP = 0;

        jP = 0;

        iA = 0;

        iB = 0;

        iC = 0;

        iD = 0;

        jA = 0;

        jB = 0;

        jC = 0;

        jD = 0;





        i2++;



    }, 1000);





    if (i2 == no_of_moves)

    clearInterval(intervalId);

}
