document.addEventListener("DOMContentLoaded", function () {
    function showAlert() {
        alert("Alejandro López Sepúlveda, 1 DAW, Lenguaje de Marcas 3º Trimestre Preparacion del proyecto final");
    }

    showAlert();

    const infoBtn = document.getElementById("info-btn");
    infoBtn.addEventListener("click", showAlert);

    const cells = document.querySelectorAll(".cell");
    const resetBtn = document.getElementById("reset-btn");
    let currentPlayer = 'greenCircle';
    let moves = 0;
  
    function checkWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    
        for (const line of lines) {
            const [a, b, c] = line;
            if (
                cells[a].classList.contains(currentPlayer) &&
                cells[b].classList.contains(currentPlayer) &&
                cells[c].classList.contains(currentPlayer)
            ) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        cells.forEach((cell) => {
            cell.innerHTML = '';
            cell.classList.remove("greenCircle", "redSquare");
        });
        moves = 0;
        currentPlayer = 'greenCircle';
        resetBtn.style.display = "none";
    }
  
    resetBtn.addEventListener("click", resetGame);
  
    cells.forEach((cell) => {
        cell.addEventListener("click", function (event) {
            if (!event.target.classList.contains("greenCircle") && !event.target.classList.contains("redSquare")) {
                const shape = document.createElement("div");
                shape.style.margin = "auto";
                shape.style.position = "absolute";
                shape.style.top = "50%";
                shape.style.left = "50%";
                shape.style.transform = "translate(-50%, -50%)";
        
                if (currentPlayer === 'greenCircle') {
                    shape.style.width = "80%";
                    shape.style.height = "80%";
                    shape.style.backgroundColor = "green";
                    shape.style.borderRadius = "50%";
                } else {
                    shape.style.width = "70%";
                    shape.style.height = "70%";
                    shape.style.backgroundColor = "red";
                }
        
                event.target.appendChild(shape);
                event.target.classList.add(currentPlayer);
                
                moves++;
                if (checkWinner()) {
                    setTimeout(() => {
                        alert(currentPlayer === 'greenCircle' ? 'Ganó el jugador del círculo verde' : 'Ganó el jugador del cuadrado rojo');
                        resetBtn.style.display = "block";
                    }, 100);
                } else if (moves === 9) {
                    alert('Empate');
                    resetBtn.style.display = "block";
                } else {
                    currentPlayer = currentPlayer === 'greenCircle' ? 'redSquare' : 'greenCircle';
                }
            }
        });
    });
});
