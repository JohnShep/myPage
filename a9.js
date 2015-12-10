/*
 
 File:  http://weblab.cs.uml.edu/~jshepple/a9.js
 Created by JT Shepple on 12/4/15. john_shepple@student.uml.edu
 Student at UMass Lowell Taking course 91.461: GUI Programming I
 Copyright (c) 2014 JT Shepple. All rights reserved.
 This is JT's Personal Website used mainly for displaying GUI assignments.
 Last updated by JT on 12/4
 Last updated by JT on 12/5
 Last updated by JT on 12/6
 Last updated by JT on 12/7
 */

//Left off with working on doubling the entire word. Have doubling the letter working.


//I asked Jason for help on how to setup these arrays for the pieces, game tiles and the board.
var pieces = [
    {"letter":"A", "value":1,  "amount":9},
    {"letter":"B", "value":3,  "amount":2},
    {"letter":"C", "value":3,  "amount":2},
    {"letter":"D", "value":2,  "amount":4},
    {"letter":"E", "value":1,  "amount":12},
    {"letter":"F", "value":4,  "amount":2},
    {"letter":"G", "value":2,  "amount":3},
    {"letter":"H", "value":4,  "amount":2},
    {"letter":"I", "value":1,  "amount":9},
    {"letter":"J", "value":8,  "amount":1},
    {"letter":"K", "value":5,  "amount":1},
    {"letter":"L", "value":1,  "amount":4},
    {"letter":"M", "value":3,  "amount":2},
    {"letter":"N", "value":1,  "amount":6},
    {"letter":"O", "value":1,  "amount":8},
    {"letter":"P", "value":3,  "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1,  "amount":6},
    {"letter":"S", "value":1,  "amount":4},
    {"letter":"T", "value":1,  "amount":6},
    {"letter":"U", "value":1,  "amount":4},
    {"letter":"V", "value":4,  "amount":2},
    {"letter":"W", "value":4,  "amount":2},
    {"letter":"X", "value":8,  "amount":1},
    {"letter":"Y", "value":4,  "amount":2},
    {"letter":"Z", "value":10, "amount":1},
    {"letter":"_", "value":0,  "amount":2}
];

// JavaScript object of game board
var game_board = [
    {"id": "drop0",  "tile": "NONE"},
    {"id": "drop1",  "tile": "NONE"},
    {"id": "drop2",  "tile": "NONE"},
    {"id": "drop3",  "tile": "NONE"},
    {"id": "drop4",  "tile": "NONE"},
    {"id": "drop5",  "tile": "NONE"},
    {"id": "drop6",  "tile": "NONE"},
    {"id": "drop7",  "tile": "NONE"},
    {"id": "drop8",  "tile": "NONE"},
    {"id": "drop9",  "tile": "NONE"},
    {"id": "drop10", "tile": "NONE"},
    {"id": "drop11", "tile": "NONE"},
    {"id": "drop12", "tile": "NONE"},
    {"id": "drop13", "tile": "NONE"},
    {"id": "drop14", "tile": "NONE"}
]


// JavaScript array of objects
var game_tiles = [
    {"id": "piece0", "letter": "A"},
    {"id": "piece1", "letter": "B"},
    {"id": "piece2", "letter": "C"},
    {"id": "piece3", "letter": "D"},
    {"id": "piece4", "letter": "E"},
    {"id": "piece5", "letter": "F"},
    {"id": "piece6", "letter": "G"}
]



//------------------------------------Functions-----------------------------
function find_word() {
    var word = "";
    var score = 0;
    // goes through board and lists letters into word
    for(var i = 0; i < 15; i++) {
        if(game_board[i].tile != "NONE") {
            word += find_letter(game_board[i].tile);
            score += find_score(game_board[i].tile);
        }
    }
    // decides to double the score and save it
    score += (score * should_double());
    $("#score").html(score);
    if(word != "") {
        $("#word").html(word);
        return;
    }
    //if no letters it sets it blank
    $("#word").html("___");
}

// Decide if it should double word
function should_double() {
//currently working on this
    return 0;
}


// updates score
function find_score(given_id) {
    var letter = find_letter(given_id);
    var score = 0;
    for(var i = 0; i < 27; i++) {
        var obj = pieces[i];
        if(obj.letter == letter) {
            score = obj.value;
            // If it is a double letter
            score += (score * should_double_letter(given_id));
            return score;
        }
    }
    return -1;
}


// Double the letter score
function should_double_letter(given_id) {
    var dropID = find_tile_pos(given_id);
    if(dropID == "drop3" || dropID == "drop11") {
        return 1;
    }
    return 0;
}


function find_letter(given_id) {
    for(var i = 0; i < 7; i++) {
        if(game_tiles[i].id == given_id) {
            return game_tiles[i].letter;
        }
    }
    return -1;
}

// returns arrayposition
function find_board_pos(given_id) {
    for(var i = 0; i < 15; i++){
        if(game_board[i].id == given_id) {
            return i;
        }
    }
    return -1;
}

// return drop_ID
function find_tile_pos(given_id) {
    for(var i = 0; i < 15; i++){
        if(game_board[i].tile == given_id) {
            return game_board[i].id;
        }
    }
    return -1;
}

// loads pieces onto rack
function load_pieces() {
    var base_url = "Scrabble/";   // base URL of the image
    var returned_number = 1;
    var piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + returned_number + ".jpg" + "'></img>";
    var piece_ID = "";
    var what_piece = "";
    
    for(var i = 0; i < 7; i++) {
        var loop = true;
        while(loop == true){
            returned_number = getRandomInt(0, 26);
            // remove letters
            if(pieces[returned_number].amount != 0) {
                loop = false;
                pieces[returned_number].amount--;
            }
        }
        // append the tiles
        piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + pieces[returned_number].letter + ".jpg" + "'></img>";
        piece_ID = "#piece" + i;
        game_tiles[i].letter = pieces[returned_number].letter;
        var pos = $("#the_rack").position();
        //move the board pieces
        var img_left = 480 + (10 * i);
        var img_top = -130;
        $("#rack").append(piece);
        $(piece_ID).css("left", img_left).css("top", img_top).css("position", "relative");
        $(piece_ID).draggable();
    }
}


// load places to move letters
function load_targets() {
    var img_url = "img/scrabble/Scrabble_Droppable.png";   // URL of the image
    var drop = "<img class='droppable' id='drop" + i + "' src='" + img_url + "'></img>";
    var drop_ID = "#drop" + i;
    
    for(var i = 0; i < 15; i++) {
        drop_ID = "#drop" + i;

        $("#board").append(drop);

        $(drop_ID).droppable({
                             
                drop: function(event, ui) {
                     var draggableID = ui.draggable.attr("id");
                     var droppableID = $(this).attr("id");
                                 
                     // tile was dropped
                     game_board[find_board_pos(droppableID)].tile = draggableID;
                     find_word();
                 },
                 out: function(event, ui) {
                     var draggableID = ui.draggable.attr("id");
                     var droppableID = $(this).attr("id");

                     if(draggableID != game_board[find_board_pos(droppableID)].tile) {

                     return;
                 }
                 game_board[find_board_pos(droppableID)].tile = "NONE";
                 // refresh word
                 find_word();
             }
        });
    }
}

// gives random int between range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
