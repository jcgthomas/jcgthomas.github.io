let playerLeftCards = [];
let playerRightCards = [];
let playStack = [];
let leftTurn = true;
let cardArea = document.getElementById("cardArea");
let leftSpace = document.getElementById("playerLeft");
let rightSpace = document.getElementById("playerRight");
let leftCount = document.getElementById("leftCount");
let rightCount = document.getElementById("rightCount");
let popup = document.getElementById("myPopup");
let cardTopText = document.getElementById("cardTopText");
let cardMiddleText = document.getElementById("cardMiddleText");
let cardBottomText = document.getElementById("cardBottomText");
let leftCards = document.getElementById("leftCards");
let rightCards = document.getElementById("rightCards");

//cardCount determines how many cards are left in the players hand and updates the CSS to represent the size of the stack visually, as well as the cards inner text with a numerical count of the remaining cards. It also determines whether the player has no cards left and accordingly sets the CSS properties for this situation.
let cardCount = function(lor) {
        let l = playerLeftCards.length;
        let r = playerRightCards.length;
        leftCount.innerText = "Cards remaining: " + l;
        rightCount.innerText = "Cards remaining: " + r;
        if (l > 0) {
            leftCards.style.setProperty("visibility", "visible");
            leftCards.style.setProperty("box-shadow", `-${l*(20/52)}px ${l*(10/52)}px ${l*(15/52)}px ${l*(15/52)}px rgba(0, 0, 0, 0.7)`);
        } else {
            leftCards.style.setProperty("visibility", "hidden");
        }
        if (r > 0) {
            rightCards.style.setProperty("visibility", "visible");
            rightCards.style.setProperty("box-shadow", `${r*(20/52)}px ${r*(10/52)}px ${r*(15/52)}px ${r*(15/52)}px rgba(0, 0, 0, 0.7)`);
        } else {
            rightCards.style.setProperty("visibility", "hidden");
        }
        
}

//cardFormat takes a 'card' from the players hand array (in a card code format constructed in the 'deal' function below) and uses this information to create a pure CSS representation of the playing card. At the moment the formatting is quite basic and doesn't include multiples of the suit icon in the center of the card, but each icon and number is displayed on each corner of the card to easily identify consecutive cards when randomly stacked.
let cardFormat = function(a) {
    //cardNums uses regex to find the number value of the card.
    let cardNums = a.match(/[1-9]+/g).join("");
    //cardStr uses regex to find the suit of the card.
    let cardStr = a.match(/(&)[a-z]*;/gm);
    let newStr;
    let colorClass;
    //rotation sets a random rotation value for the card to be placed on the playstack.
    let rotation = Math.floor(Math.random()*100) - 50;
    //translation sets a random transformation value for the card to be placed on the playstack.
    let translation = Math.floor(Math.random()*10) - 5;
    //Determines the card value based on the number of the card code.
    if (cardNums == "1") {
        newStr = cardStr + "A";
    } else if (cardNums == "11") {
        newStr = cardStr + "J";
    } else if (cardNums == "12") {
        newStr = cardStr + "Q";
    } else if (cardNums == "13") {
        newStr = cardStr + "K";
    } else {
        newStr = a;
    }
    //Determines the colour of the text within the card based on the suit of the card code.
    if (cardStr == "&hearts;" || cardStr == "&diams;") {
        colorClass = "red";
    } else {
        colorClass = "black";
    }
    //Adds the newly formatted card to the visible card stack (cardArea).
    cardArea.innerHTML += `<div class="card ${colorClass}"
        style="transform: rotate(${rotation}deg) 
                translateX(${translation}vh)">
                <div id="cardTopText">${newStr} ${newStr}</div>
                <div id="cardMiddleText">${newStr}</div>
                <div id="cardBottomText">${newStr} ${newStr}</div>
                </div>`;
}

//deal resets both players hands and the cards in play then deals a new set of 26 cards to each player, then calls cardCount to show the cards in each players area.
let deal = function() {
    playerLeftCards = [];
    playerRightCards = [];
    playStack = [];
    let cards = [];
    for (let i = 0; i < 4; i++) {
        let suit;
            switch (i) {
                case 0:
                    suit = "&clubs;";
                    break;
                case 1:
                    suit = "&hearts;";
                    break;
                case 2:
                    suit = "&spades;";
                    break;
                case 3:
                    suit = "&diams;";
                    break;
            };
        for (let j = 1; j < 14; j++) {
            cards.push(suit + String(j))
        }
    }
    for (let k = 0; k < 52; k++) {
        if (k % 2 == 0) {
            playerLeftCards.push(String(cards.splice(Math.floor(Math.random() * cards.length), 1)));
        } else {
            playerRightCards.push(String(cards.splice(Math.floor(Math.random() * cards.length), 1)));
        }
    }
    cardCount();
};

//sleep is used to create a pause in the game for the players to visualize the outcome of cards being claimed and is used in the async function below.
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

//claimCards takes a 'player' (left or right) depending on the newRound function below and displays an animation of the cards from the playStack being moved to the winning players hand.
let claimCards = async function(player) {
    await sleep(1000);
    let cards = document.querySelectorAll('.card');
    if (player == "left") {
        leftCards.style.setProperty("visibility", "visible");
        let l = playerLeftCards.length;
        for(let i = cards.length - 1; i >= 0; i--) {
            document.documentElement.style.setProperty("--newLocation", "-200vw, 350vh");
            cards[i].style.animation = "collect 0.3s";
            await sleep(40);
            cards[i].remove();
            leftCards.style.setProperty("box-shadow", `-${l*(11/52)}px ${l*(5.5/52)}px ${l*(8/52)}px ${l*(8/52)}px rgba(0, 0, 0, 0.7)`);
            l += 1;
        }
    }
    if (player == "right") {
        rightCards.style.setProperty("visibility", "visible");
        let r = playerRightCards.length;
        for(let i = cards.length - 1; i >= 0; i--) {
            document.documentElement.style.setProperty("--newLocation", "200vw, 350vh");
            cards[i].style.animation = "collect 0.3s";
            await sleep(40);
            cards[i].remove();
            rightCards.style.setProperty("box-shadow", `${r*(11/52)}px ${r*(5.5/52)}px ${r*(8/52)}px ${r*(8/52)}px rgba(0, 0, 0, 0.7)`);
            r += 1;
        }
    }
    cardCount();
}

//reDeal is used in the case of both players running out of cards so the play stack is divided evenly between the two again.
let reDeal = async function() {
    await sleep(1000);
    leftCards.style.setProperty("visibility", "visible");
    rightCards.style.setProperty("visibility", "visible");
    let cards = document.querySelectorAll('.card');
    let j = 0;
    for(let i = cards.length - 1; i >= 0; i--) {
        j++;
        let lor = "200vw";
        if (i % 2 == 0) {
            lor = "-200vw";
        };
        leftCards.style.setProperty("box-shadow", `-${j*(11/52)}px ${j*(5.5/52)}px ${j*(8/52)}px ${j*(8/52)}px rgba(0, 0, 0, 0.7)`);
        rightCards.style.setProperty("box-shadow", `${j*(11/52)}px ${j*(5.5/52)}px ${j*(8/52)}px ${j*(8/52)}px rgba(0, 0, 0, 0.7)`);
        document.documentElement.style.setProperty("--newLocation", `${lor}, 350vh`);
        cards[i].style.animation = "collect 0.3s";
        await sleep(40);
        cards[i].remove();
    }
    deal();
}

//newRound is the main function which uses event listeners for each player to detect a card placement or a snap attempt.
let newRound = function() {
    leftSpace.classList.add("turn");
    document.addEventListener("keydown", (event) => {

        // Alternates players turns and adds cards from hand to cards in play
        if (event.code == ("ShiftLeft")) {
            if (leftTurn) {
                playStack.push(String(playerLeftCards.splice(0, 1)));
                if (playerRightCards.length > 0) {
                    leftTurn = false;
                }
                playStack[playStack.length - 1] == undefined ? cardInPlay.innerText = "" : 
                cardFormat(playStack[playStack.length - 1]);
                cardCount("left");
            }
        }
        if (event.code == ("ShiftRight")) {
            if (!leftTurn) {
                playStack.push(String(playerRightCards.splice(0, 1)));
                if (playerLeftCards.length > 0) {
                    leftTurn = true;
                }
                playStack[playStack.length - 1] == undefined ? cardInPlay.innerText = "" : 
                cardFormat(playStack[playStack.length - 1]);
                cardCount("right");
            } 
        }

        //Indicates which players turn it is using a CSS background in the according players area.
        if (leftTurn) {
            leftSpace.classList.add("turnLeft");
            rightSpace.classList.remove("turnRight");
        } else {
            leftSpace.classList.remove("turnLeft");
            rightSpace.classList.add("turnRight");
        }
    
        //popUpHTML determines the content of the popup depending on the winning conditions.
        let popUpHTML = async function(phrase) {
            popupWindow = phrase +  `<div id="buttons">
                                    <button id="yes">Yes</button>
                                    <button id="no">No</button>
                                    </div>`;
            popup.innerHTML = popupWindow;
            let btnYes = document.getElementById("yes");
            let btnNo = document.getElementById("no");
            //New game options after victory is achieved.
            btnYes.addEventListener("click", () => {
                window.location = "/Snap_Game/index.html";
            })
            btnNo.addEventListener("click", () => {
                popup.style.setProperty("visibility", "hidden");
            })
        }

        //Checks for snap, bad snap and win conditions for left player.
        if (event.code == ("ControlLeft")) {
            if (playStack.length >= 2) {
                let last2 = [];
                last2.push(playStack[playStack.length - 1].match(/[1-9]+/g).join(""));
                last2.push(playStack[playStack.length - 2].match(/[1-9]+/g).join(""));
                if(last2[0] == last2[1]) {
                    //Correct snap for left player.
                    if (playerRightCards.length == 0) {
                        popUpHTML("LEFT PLAYER WINS! PLAY AGAIN?");
                        popup.classList.toggle("show");
                    } else {
                        claimCards("left");
                        let newLeftCards = playerLeftCards.concat(playStack);
                        playerLeftCards = newLeftCards;
                        playStack = [];
                        leftTurn = false;
                    }
                    //Bad snap for left player.
                } else if (playerLeftCards.length == 0) {
                    popUpHTML("BAD SNAP! RIGHT PLAYER WINS! PLAY AGAIN?");
                    popup.classList.toggle("show");
                } else {
                    claimCards("right")
                    let newRightCards = playerRightCards.concat(playStack);
                    playerRightCards = newRightCards;
                    playStack = [];
                    leftTurn = false;
                }
            }
        }

        //Checks for snap, bad snap and win conditions for right player.
        if (event.code == ("ControlRight")) {
            if (playStack.length >= 2) {
                let last2 = [];
                last2.push(playStack[playStack.length - 1].match(/[1-9]+/g).join(""));
                last2.push(playStack[playStack.length - 2].match(/[1-9]+/g).join(""));
                if(last2[0] == last2[1]) {
                    //Correct snap for right player.
                    if (playerLeftCards.length == 0) {
                        popUpHTML("RIGHT PLAYER WINS! PLAY AGAIN?");
                        popup.classList.toggle("show");
                    } else {
                        claimCards("right");
                        let newRightCards = playerRightCards.concat(playStack);
                        playerRightCards = newRightCards;
                        playStack = [];
                        leftTurn = true;
                    }
                    //Bad snap for right player.
                } else if (playerRightCards.length == 0) {
                    popUpHTML("BAD SNAP! LEFT PLAYER WINS! PLAY AGAIN?");
                    popup.classList.toggle("show");
                } else {
                    claimCards("left");
                    let newLeftCards = playerLeftCards.concat(playStack);
                    playerLeftCards = newLeftCards;
                    playStack = [];
                    leftTurn = true;
                }
            }
        }

        //Checks if both players have run out of cards and no SNAP has been declared
        if (playerLeftCards.length == 0 && playerRightCards.length == 0) {
            reDeal();
            console.log("New hands have been dealt");
        }
    })
}

deal();
newRound();