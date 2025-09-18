document.addEventListener("DOMContentLoaded", () => {

  
  const memoriaArea = document.querySelector('[data-juego="memoria-historica"]');
  const memoriaBtn = document.querySelector('#juego-memoria-historica .btn-jugar');

  memoriaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    memoriaArea.innerHTML = "";
    const cartas = ["1810", "1810", "Bolívar", "Bolívar"];
    let seleccionadas = [];

    cartas.sort(() => Math.random() - 0.5).forEach(valor => {
      const carta = document.createElement("div");
      carta.textContent = "?";
      carta.style.width = "60px";
      carta.style.height = "60px";
      carta.style.margin = "10px";
      carta.style.background = "#ff0000";
      carta.style.color = "#fff";
      carta.style.display = "flex";
      carta.style.alignItems = "center";
      carta.style.justifyContent = "center";
      carta.style.cursor = "pointer";
      carta.style.borderRadius = "8px";
      carta.dataset.valor = valor;

      carta.addEventListener("click", () => {
        if (carta.textContent !== "?") return;
        carta.textContent = valor;
        seleccionadas.push(carta);

        if (seleccionadas.length === 2) {
          setTimeout(() => {
            if (seleccionadas[0].dataset.valor === seleccionadas[1].dataset.valor) {
              seleccionadas.forEach(c => c.style.background = "#16a085");
            } else {
              seleccionadas.forEach(c => c.textContent = "?");
            }
            seleccionadas = [];
          }, 800);
        }
      });

      memoriaArea.appendChild(carta);
    });
  });


  
  const razonamientoArea = document.querySelector('[data-juego="razonamiento-logico"]');
  const razonamientoBtn = document.querySelector('#juego-razonamiento-logico .btn-jugar');

  razonamientoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    razonamientoArea.innerHTML = "";

    const pregunta = document.createElement("p");
    pregunta.textContent = "Si 2+2=4, ¿cuánto es 15-7?";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Tu respuesta";

    const btn = document.createElement("button");
    btn.textContent = "Responder";

    const feedback = document.createElement("p");

    btn.addEventListener("click", () => {
      if (input.value.trim() === "8") {
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";
      } else {
        feedback.textContent = "Respuesta incorrecta";
        feedback.style.color = "red";
      }
    });

    razonamientoArea.append(pregunta, input, btn, feedback);
  });


  const laberintoArea = document.querySelector('[data-juego="laberinto"]');
  const laberintoBtn = document.querySelector('#juego-laberinto .btn-jugar');

  laberintoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    laberintoArea.innerHTML = "";
    const filas = 5, cols = 5;
    let jugador = {x: 0, y: 0};
    const meta = {x: 4, y: 4};

    function render() {
      laberintoArea.innerHTML = "";
      for (let y = 0; y < filas; y++) {
        const fila = document.createElement("div");
        fila.style.display = "flex";
        for (let x = 0; x < cols; x++) {
          const celda = document.createElement("div");
          celda.style.width = "40px";
          celda.style.height = "40px";
          celda.style.border = "1px solid #999";

          if (jugador.x === x && jugador.y === y) {
            celda.style.background = "#3498db";
          } else if (meta.x === x && meta.y === y) {
            celda.style.background = "#e74c3c";
          }

          fila.appendChild(celda);
        }
        laberintoArea.appendChild(fila);
      }
    }

    render();

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" && jugador.y > 0) jugador.y--;
      if (e.key === "ArrowDown" && jugador.y < filas-1) jugador.y++;
      if (e.key === "ArrowLeft" && jugador.x > 0) jugador.x--;
      if (e.key === "ArrowRight" && jugador.x < cols-1) jugador.x++;
      render();

      if (jugador.x === meta.x && jugador.y === meta.y) {
        setTimeout(() => alert("¡Ganaste el laberinto!"), 100);
      }
    });
  });



const gusanoArea = document.querySelector('[data-juego="gusano-manzanas"]');
const gusanoBtn = document.querySelector('#juego-gusano-manzanas .btn-jugar');

gusanoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gusanoArea.innerHTML = "";

  const gridSize = 5;
  let gusano = {x: 0, y: 0};
  let manzana = {x: Math.floor(Math.random()*gridSize), y: Math.floor(Math.random()*gridSize)};
  let preguntas = [
    {q: "¿Capital de Colombia?", a: "bogotá"},
    {q: "5 + 7 = ?", a: "12"},
    {q: "¿Color del cielo?", a: "azul"}
  ];

  function render() {
    gusanoArea.innerHTML = "";
    for (let y=0; y<gridSize; y++) {
      const fila = document.createElement("div");
      fila.style.display = "flex";
      for (let x=0; x<gridSize; x++) {
        const celda = document.createElement("div");
        celda.style.width = "50px";
        celda.style.height = "50px";
        celda.style.border = "1px solid #999";
        celda.style.display = "flex";
        celda.style.alignItems = "center";
        celda.style.justifyContent = "center";
        celda.style.fontSize = "1.5rem";

        if (gusano.x === x && gusano.y === y) {
          celda.textContent = "🐛";
        } else if (manzana.x === x && manzana.y === y) {
          celda.textContent = "🍎";
        }

        fila.appendChild(celda);
      }
      gusanoArea.appendChild(fila);
    }
  }

  render();


  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && gusano.y > 0) gusano.y--;
    if (e.key === "ArrowDown" && gusano.y < gridSize-1) gusano.y++;
    if (e.key === "ArrowLeft" && gusano.x > 0) gusano.x--;
    if (e.key === "ArrowRight" && gusano.x < gridSize-1) gusano.x++;


    if (gusano.x === manzana.x && gusano.y === manzana.y) {
      const pregunta = preguntas[Math.floor(Math.random()*preguntas.length)];
      const input = prompt(pregunta.q);

      if (input && input.toLowerCase() === pregunta.a) {
        alert("✅ Correcto, el gusano sigue creciendo!");
      } else {
        alert("❌ Incorrecto, intenta otra vez!");
      }

      manzana = {x: Math.floor(Math.random()*gridSize), y: Math.floor(Math.random()*gridSize)};
    }

    render();
  });
});


});
