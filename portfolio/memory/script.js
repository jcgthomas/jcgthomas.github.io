let boxes = Array.from(document.getElementsByClassName("box"));
let btn = document.getElementById("start");
let roundNum = document.getElementById("roundNum");
let mem = [];
let attempt = [];
let round = 0;

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

let newRound = async function(round) {
    roundNum.innerText = round + 1;
    await sleep(1000);
//Sets a random pattern depending on which round the player has reached
    for (let i = 0; i < round + 1; i++) {
        let num = Math.floor(Math.random()*9);
        mem.push(num);
        boxes[num].classList.add("light");
        setTimeout(function() {
            boxes[num].classList.remove("light");
        },350);
        await sleep(450 + (600/round));
    } 
};


//Takes an input of guesses from the player and pushes them to [attempt]
let boxClick = boxes.forEach(box => box.addEventListener("click", () => {
    box.classList.add("light");
    setTimeout(function() {
        box.classList.remove("light");
    },300);
    attempt.push(parseInt(box.id));

    //Checks for loss
    if (mem.length > 0 && attempt[attempt.length-1] != mem[attempt.length-1]) {
        boxes.forEach(box => {
            box.classList.add("flash-red");
            setTimeout(() => {
                box.classList.remove("flash-red");
                },2000);
            })
        btn.innerText = `You lose! You reached round ${round+1}. Play again?`
        round = 0;
        mem = [];
        attempt = [];
        }

    //Checks for win
    if (attempt.length > 0 && attempt.length == mem.length) {
        round += 1;
        mem = [];
        attempt = [];
        boxes.forEach(box => {
            box.classList.add("flash-green");
            setTimeout(function() {
            box.classList.remove("flash-green");
        },1000);
        })
        btn.innerText = "Next round";
    };
}));

btn.addEventListener("click", () => {
    btn.innerText = "Next round";
    newRound(round);
});