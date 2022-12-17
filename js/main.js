/* Default info */

let player1 = "X";
let player2 = "O";
let players = ["", "", "", "", "", "", "", "", ""];
let player_turn = 0;
let turnText = document.getElementById("turns")
let cpumode = false;
let winner = "";
let box_number;
let turnstop = 0;
let selected_box;

/* Save names */

const login = () => {
    let name1 = document.getElementById("player1").value;
    let name2 = document.getElementById("player2").value;
    
    localStorage.setItem("player1", name1);
    localStorage.setItem("player2", name2);

    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";

    window.location.href = "../pages/ingame.html"

}

const logincpu = () => {
    let name1 = document.getElementById("player1").value;
    let name2 = document.getElementById("player2").value;
    
    localStorage.setItem("player1", name1);
    localStorage.setItem("player2", name2);

    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";

    window.location.href = "../pages/ingamecpu.html"

}

/* Activar CPU */

const cpuon = () => {
    reset();
    cpumode = true;
}

/* CPU random draw */

const cputurn = () => {
    check_draw();
    if (turnstop == 0) {
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
            cputurn();
        }

    }
    check_draw();
}

/* Player Turns */

const playerturn = (id) => {
    if (turnstop == 0) {
        box_number = id;
        if (player_turn % 2 == 0) {
            if (players[id] == "") {
                draw(box_number, player1);
                turns.innerHTML = `¡Es tu turno, ${player2}!`;
                if (cpumode == true) {
                    player_turn++;
                    cputurn();
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
        alert("Game Over, " + winner + " ha ganado!");
    }
    check_draw();
}

/* Draw box */

const draw = (box_number, player) => {
    selected_box = document.getElementById(box_number);
    selected_box.innerHTML = player;
    players[box_number] = player;
    check_winner();
    check_draw();
}

/* Check winner */

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
        turnstop = 1;
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
        turnstop = 1;
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
    turnstop = 0; cpumode = false;
    player_turn = 0;
    document.getElementById("winimg").innerHTML = "X gana";
    document.getElementById("winimg").style.visibility = "hidden";
    document.getElementById("turns").style.visibility = "visible";
}

const resetcpu = () => {
    players = ["", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < 9; i++) {
        selected_box = document.getElementById(i);
        selected_box.innerHTML = "";
    }
    turnstop = 0; cpumode = false;
    player_turn = 0;
    document.getElementById("winimg").innerHTML = "X gana";
    document.getElementById("winimg").style.visibility = "hidden";
    document.getElementById("turns").style.visibility = "visible";
    cpuon()
}