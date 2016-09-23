var dibujo, contexto, canvasLim, punta, col;
var etiqDibujo=false; // nos dice si pintar o no
var actualPos; // la posición actual donde hice click

function inicio()
{
    dibujo = document.getElementById("canvas");
    contexto = dibujo.getContext("2d");
    canvasLim = dibujo.getBoundingClientRect(); // obtenemos los limites del canvas
// inputs sobre la punta y el color, al presionar el boton detona dibujar
    punta = document.getElementById("puntero");
    col = document.getElementById("color");
// captura del mouse
    dibujo.addEventListener('mousedown', estados, false);
    dibujo.addEventListener('mouseup', estados, false);
    dibujo.addEventListener('mousemove', pintaLinea, false);
    dibujo.style.cursor="hand";
// borra el contexto del canva
    borrado = document.getElementById("borrador");
    borrado.addEventListener("click", borrar, false);
}

function estados()
{
    etiqDibujo =! etiqDibujo;
    actualPos = coordenadaMouse(event);
}

function coordenadaMouse(event)
{
    var posX;
    var posY;
    if (event.pageX || event.pageY)
    {
        posX = event.pageX- canvasLim.left;
        posY = event.pageY- canvasLim.top;
    }
    else
    {
        posX = event.clientX - canvasLim.left;
        posY = event.clientY - canvasLim.top;
    }
    return { x:posX, y:posY };
}

function pintaLinea(event)
{
    if (etiqDibujo)
    {
        //grilla de bordes
        contexto.beginPath();
        contexto.moveTo(0,0);
        contexto.lineTo(900,0);
        contexto.lineTo(900,500);
        contexto.lineTo(0,500);
        contexto.lineTo(0,0);
        contexto.strokeStyle = "#AAA";
        contexto.stroke ();
        contexto.closePath ();
        // dibuja el curso del mouse
        var coordenadas = coordenadaMouse(event);
        contexto.beginPath(); // comenzamos a dibujar
        contexto.strokeStyle = col.value; // color de la linea
        contexto.lineWidth = punta.value; // color de la linea
        contexto.moveTo (actualPos.x, actualPos.y);
        contexto.lineTo (coordenadas.x,coordenadas.y);
        actualPos = { x:coordenadas.x, y:coordenadas.y};
        contexto.stroke(); // dibujamos la linea
        contexto.closePath ();
    }
}

function borrar()
{
    contexto.clearRect(0, 0, dibujo.width, dibujo.height);
}