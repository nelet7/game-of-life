// Variables de configuración
var anchuraCelula;
var columnas;
var filas;
var tablero;
var nuevoTablero;

function setup() {

	// Crea canvas y lo cuelga del div para poder personalizar con css
  var canvas = createCanvas(500, 500);
	canvas.parent('div-canvas');

  //Calcula filas y columnas del array bi-dimensional (tablero) - 10 = 500/50
	anchuraCelula = 50;
  columnas = floor(width/anchuraCelula);
  filas = floor(height/anchuraCelula);

  // Crear tablero mediante array bi-dimensional
  tablero = new Array(columnas);
  for (var i = 0; i < columnas; i++) {
    tablero[i] = new Array(filas);
  }

  // Crear tablero que se usará para guardar la siguiente generación
  nuevoTablero = new Array(columnas);
  for (i = 0; i < columnas; i++) {
    nuevoTablero[i] = new Array(filas);
  }

  init();
}

// Dibujar el tablero mediante los parámetros de configuración
function draw() {
  background(255);
  generate();
  for ( var i = 0; i < columnas;i++) {
    for ( var j = 0; j < filas;j++) {
      if ((tablero[i][j] == 1)) fill(0);
      else fill(255);
      stroke(0);
      rect(i*anchuraCelula, j*anchuraCelula, anchuraCelula-1, anchuraCelula-1);
    }
  }

}

// Rellenar el tablero con 0(célula muerta) y 1(célula viva) aleatoriamente
function init() {
  for (var i = 0; i < columnas; i++) {
    for (var j = 0; j < filas; j++) {

      // Controlando ejes
      if (i == 0 || j == 0 || i == columnas-1 || j == filas-1) tablero[i][j] = 0;

			// Random todo lo demás
      else tablero[i][j] = floor(random(2));
      nuevoTablero[i][j] = 0;

    }
  }
}

// Función para generar el nuevo estado de las células del tablero
function generate() {

  // Recorrer cada célula y contar las células vecinas (neighbors)
	// que estén vivas (sumar 1's alrededor)
  for (var x = 1; x < columnas - 1; x++) {
    for (var y = 1; y < filas - 1; y++) {
      var neighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          neighbors += tablero[x+i][y+j];
        }
      }

      // Al recorrer el espacio de 3x3 alrededor de cada célula
			// hay que restar su propio estado
      neighbors -= tablero[x][y];

      // Reglas de evolución de las células

			// Muerte por soledad
      if      ((tablero[x][y] == 1) && (neighbors <  2)) nuevoTablero[x][y] = 0;

			// Muerte por sobrepoblación
      else if ((tablero[x][y] == 1) && (neighbors >  3)) nuevoTablero[x][y] = 0;

			// Vive por reproducción
      else if ((tablero[x][y] == 0) && (neighbors == 3)) nuevoTablero[x][y] = 1;

			// Si no, mismo estado
      else                                               nuevoTablero[x][y] = tablero[x][y];
    }
  }

  // Cambiar tablero nuevo por tablero original
  var temp = tablero;
  tablero = nuevoTablero;
  nuevoTablero = temp;
}
