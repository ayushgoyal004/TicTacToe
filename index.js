const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBTn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //UI pr bhi boxes ko empty karna padega on clicking New game toh wo bhi handle kar lete hai 
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //One more thing after winning,initialise boxes with css properties again
        box.classList=`box box${index+1}`;
    });
    newGameBTn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer= "O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
        &&(gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]])){
            //check if winner is X
            if(gameGrid[position[0]]=="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            //disable all pointer events so ki dono player na jeete,Ek ke jeetne k bad game end ho jaaye
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //now we know X or O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        } 
    });
    

    //If we have executed this function successfully,means we have a winner
    if(answer!==""){
        gameInfo.innerText=`Winner Player- ${answer}`;
        newGameBTn.classList.add("active");
        return;
    }


    //When there is no winner i.e tie case of the game
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    });
    //board is filled,Game is tie
    if(fillCount===9){
        gameInfo.innerText="Game Tied!";
        newGameBTn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap the turn
        swapTurn();
        //Check if the game is completed i.e. someone has won or not
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBTn.addEventListener("click",initGame); 