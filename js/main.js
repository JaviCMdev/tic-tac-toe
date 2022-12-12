/* Players and wincombo */

let player1 = "X";
let player2 = "O";
let players = ["", "", "", "", "", "", "", "", ""];
let player_turn = 0;
let turnText = document.getElementById("turns")
let rcounter = false;
let winner = "";
let box_number;
let flag = 0;
let selected_box;
let winner_combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/* Play/Reset */

const cpu = () => {
    rplay()
    window.open("../index.html");
    
}

const rplay = () => {
    reset();
    rcounter = true;
}

/* CPU */

const rcountf = () => {
    check_draw();
    if (flag == 0) {
        box_number = Math.floor(Math.random() * 8);
        for (var i = 0; i < 9; i++) {
            if (players[i] == player2 && players[i + 1] == player2) { box_number = i + 2; }
            else if (players[i - 1] == player2 && players[i + 1] == player2) { box_number = i; }
            else if (players[i + 2] == player2 && players[i + 1] == player2) { box_number = i; }
            else {
                box_number = Math.floor(Math.random() * 8);
            }
        }
        if (players[box_number] == "") {
            draw(box_number, player2);
            turns.innerHTML = `¡Es tu turno, ${player1}!`;
        }
        else {
            rcountf();
        }

    }
    check_draw();
}

/* Player Turns */

const playerturn = (id) => {
    if (flag == 0) {
        box_number = id;
        if (player_turn % 2 == 0) {
            if (players[id] == "") {
                draw(box_number, player1);
                turns.innerHTML = `¡Es tu turno, ${player2}!`;
                if (rcounter == true) {
                    player_turn++;
                    rcountf();
                }
            }
            else {
                alert("Esta celda esta ocupada, elige otra");
                player_turn--;
            }

        }
        else {
            if (players[id] == "") {
                draw(box_number, player2);
                turns.innerHTML = `¡Es tu turno, ${player1}!`;
            }
            else {
                alert("Esta celda esta ocupada, elige otra");
                player_turn--;
            }
        }
        player_turn++;
    }
    else {
        alert("Game Over," + winner + " ha ganado!");
    }
    check_draw();
}

/* Check win/lose/draw */

const draw = (box_number, player) => {
    selected_box = document.getElementById(box_number);
    selected_box.innerHTML = player;
    players[box_number] = player;
    check_winner();
    check_draw();
}

const check_winner = () => {
    if (players[0] == player1 && players[1] == player1 && players[2] == player1 ||
        players[3] == player1 && players[4] == player1 && players[5] == player1 ||
        players[6] == player1 && players[7] == player1 && players[8] == player1 ||
        players[0] == player1 && players[3] == player1 && players[6] == player1 ||
        players[1] == player1 && players[4] == player1 && players[7] == player1 ||
        players[2] == player1 && players[5] == player1 && players[8] == player1 ||
        players[0] == player1 && players[4] == player1 && players[8] == player1 ||
        players[2] == player1 && players[4] == player1 && players[6] == player1) {
        document.getElementById("winimg").style.visibility = "visible";
        document.getElementById("turns").style.visibility = "hidden";
        winner = player1;
        flag = 1;
    }
    else if (players[0] == player2 && players[1] == player2 && players[2] == player2 ||
        players[3] == player2 && players[4] == player2 && players[5] == player2 ||
        players[6] == player2 && players[7] == player2 && players[8] == player2 ||
        players[0] == player2 && players[3] == player2 && players[6] == player2 ||
        players[1] == player2 && players[4] == player2 && players[7] == player2 ||
        players[2] == player2 && players[5] == player2 && players[8] == player2 ||
        players[0] == player2 && players[4] == player2 && players[8] == player2 ||
        players[2] == player2 && players[4] == player2 && players[6] == player2) {
        document.getElementById("winimg").innerHTML = "O gana";
        document.getElementById("winimg").style.visibility = "visible";
        document.getElementById("turns").style.visibility = "hidden";
        winner = player2;
        flag = 1;
    }
}
const check_draw = () => {
    if (player_turn >= 9 && winner == "") {
        document.getElementById("winimg").innerHTML = " Empate";
        document.getElementById("winimg").style.visibility = "visible";
        document.getElementById("turns").style.visibility = "hidden";
    }
}

/* Reset */

const reset = () => {
    players = ["", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < 9; i++) {
        selected_box = document.getElementById(i);
        selected_box.innerHTML = "";
    }
    flag = 0; rcounter = false;
    player_turn = 0;
    document.getElementById("winimg").innerHTML = "X gana";

    document.getElementById("winimg").style.visibility = "hidden";
    document.getElementById("turns").style.visibility = "visible";
}