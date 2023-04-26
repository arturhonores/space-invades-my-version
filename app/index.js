window.onload = () => {
    const startButton = document.getElementById("start-button");
    const imgInicio = document.querySelector(".img-inicio");
    const startGame = () => {
        imgInicio.remove()
        game.init();
        startButton.removeEventListener("click", startGame)
    };
    startButton.addEventListener("click", startGame)
};

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => location.reload())
