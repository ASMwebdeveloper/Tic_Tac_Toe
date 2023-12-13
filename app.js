let main = document.querySelector("main")
let boxs = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new_game_btn")
let winContainer = document.querySelector(".win-container")
let winMsg = document.querySelector(".win-msg")
let resetBtn = document.querySelector("#reset_btn");
const jsConfetti = new JSConfetti()

let turnO = true;


const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
}

const newGame = () => {
    turnO = true;
    enableBoxes();
    winContainer.classList.add("hide");
    main.classList.remove("hide");
}

boxs.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) { // player1
            box.innerText = "O"
            turnO = false
        }else{ // player2
            box.innerText = "X"
            turnO = true
        }
        box.disabled = true

        checkWinner()
    });

});

const disableBoxes = () => {
    for (let box of boxs) {
        box.disabled = true;        
    }
}

const enableBoxes = () => {
    for (let box of boxs) {
        box.disabled = false;        
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    jsConfetti.addConfetti().then(
    () => winMsg.innerText = `Congratulation winner is ${winner}`);
    winContainer.classList.remove("hide");
    main.classList.add("hide");
    disableBoxes();
}

const checkWinner = () =>{
    for (let pattern of winPatterns) {
        let pos1Val = boxs[pattern[0]].innerText;
        let pos2Val = boxs[pattern[1]].innerText;
        let pos3Val = boxs[pattern[2]].innerText;
        if (pos1Val == "" && pos2Val == "" && pos3Val == "" ) return
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
        }    
    }
};

resetBtn.addEventListener('click', resetGame)
newGameBtn.addEventListener('click', newGame)