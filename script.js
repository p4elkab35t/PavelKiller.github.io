var snakeElement, //переменная для создания одинаковых квадратных элементов, для добавления змее длины
	playingZone = document.getElementById('playing_zone'), //игровая зона
	gameAnimation,
	snakeElementX,//текущие координаты каждого элемента, эта от левого края
	snakeElementY,//эта от верхнего края
	snakeElementCurrent,//переменная для элемента, коордианты которого мы будем изменять
	snakeElementsCollection,
	snakeElementLast,
	snakeElementDirection = ['right'],
	snakeRouteBreakpoints = [],
	snakeElementNumber=1,
	snakeElement2Delete,
	snakeLives=3,
	appleOld,
	appleNew,
	appleX,
	appleY,
	highScore=0,
	i, g, //счетчики
	score=0;
	createdBreakpointsEncounter=0,
	deletedBreakpointsEncounter=0,
	debug_encounter=0;
      //---------------------------//
     //        переменные         //
    //---------------------------//
    alert('У вас есть 3 жизни, каждый раз врезаясь в себя вы теряете одну жизнь и часть своего хвоста.');
    alert('Упарвление: змея двигается автоматически, поворот наверх - стрелочка вверх, вниз - стрелочка вниз и тд.');
    alert('Ешьте яблоки, растите и не врезайтесь в себя.');
    alert('Для начала игры нажмите play');
    document.getElementById('snakeElementNo_1').style.left=rand()+'px';
	document.getElementById('snakeElementNo_1').style.top=rand()+'px';
function snakeElementAdd(){
	snakeElementLast=document.getElementById('snakeElementNo_'+snakeElementNumber);
	snakeElementX = snakeElementLast.getBoundingClientRect().left;
	snakeElementY = snakeElementLast.getBoundingClientRect().top;
	snakeElementDirection[snakeElementNumber]=snakeElementDirection[snakeElementNumber-1];
	snakeElementNumber++;
	snakeElement = document.createElement('div');
	snakeElement.classList.add('snake_body_element');
	snakeElement.id='snakeElementNo_'+snakeElementNumber;
	switch(snakeElementDirection[snakeElementNumber-1]){
		case 'top':		
			snakeElement.style.top=snakeElementY + 10 + 'px';
			snakeElement.style.left=snakeElementX + 'px';
			break;
		case 'right':		
			snakeElement.style.top=snakeElementY + 'px';
			snakeElement.style.left=snakeElementX - 10 +'px';
			break;
		case 'bottom':		
			snakeElement.style.top=snakeElementY - 10 +'px';
			snakeElement.style.left=snakeElementX + 'px';
			break;
		case 'left':		
			snakeElement.style.top=snakeElementY + 'px';
			snakeElement.style.left=snakeElementX + 10 + 'px';
			break;
	
	}
	playingZone.appendChild(snakeElement);
}// функция добавления змейке длины, путем добавления одинаковых квадратных элементов к ее концу, с разными id и общим классом 'snake_body_element';
function snakeElementMoveToward(snakeDirection, elementNumber){
	snakeElementCurrent = document.getElementById('snakeElementNo_'+elementNumber);
	snakeElementX = snakeElementCurrent.getBoundingClientRect().left;
	snakeElementY = snakeElementCurrent.getBoundingClientRect().top;
	switch(snakeDirection){
		case 'left':
			snakeElementCurrent.style.left=snakeElementX-10+'px';
			break;
		case 'right':
			snakeElementCurrent.style.left=snakeElementX+10+'px';
			break;
		case 'top':
			snakeElementCurrent.style.top=snakeElementY-10+'px';
			break;
		case 'bottom':
			snakeElementCurrent.style.top=snakeElementY+10+'px';
			break;
	}
}
addEventListener("keydown", function(event){
	switch(event.keyCode){
		case 32: 
			snakeElementAdd();
			break;
		case 37: 
			snakeTurn('left');
			break;
		case 40:
			snakeTurn('bottom');
			break;
		case 39: 
			snakeTurn('right');
			break;
		case 38: 
			snakeTurn('top');
			break;
	}
});
function snakeTurn(direction){
	snakeElementCurrent = document.getElementById('snakeElementNo_1');
	if(snakeElementDirection[0]!=direction){
		if((direction=="top" & snakeElementDirection[0]!="bottom")||(direction=="left" & snakeElementDirection[0]!="right")||(direction=="right" & snakeElementDirection[0]!="left")||(direction=="bottom" & snakeElementDirection[0]!="top")){
			snakeRouteBreakpoints[createdBreakpointsEncounter]={
				breakpointX: snakeElementCurrent.getBoundingClientRect().left,
				breakpointY: snakeElementCurrent.getBoundingClientRect().top,
				snakeDirection: direction,
			};
			createdBreakpointsEncounter++;
		}
	}
	//console.log(snakeRouteBreakpoints[createdBreakpointsEncounter-1]);
	//console.log(createdBreakpointsEncounter);
}
function deleteBreakpoint(breakpointsNumber){
	snakeRouteBreakpoints[breakpointsNumber].breakpointX=null;
	snakeRouteBreakpoints[breakpointsNumber].breakpointY=null;
	deletedBreakpointsEncounter++;
}


function animationSet(){
	/*for(debug_encounter=0;debug_encounter<10;debug_encounter++)*/
	//console.log(debug_encounter);
	for(g=1;g<=snakeElementNumber;g++){
		for(i=0;i<createdBreakpointsEncounter;i++){
			//console.log(snakeRouteBreakpoints[i].breakpointX,snakeRouteBreakpoints[i].breakpointY, document.getElementById('snakeElementNo_'+g).getBoundingClientRect().left,document.getElementById('snakeElementNo_'+g).getBoundingClientRect().top);
			if((snakeRouteBreakpoints[i].breakpointX == document.getElementById('snakeElementNo_'+g).getBoundingClientRect().left)&(snakeRouteBreakpoints[i].breakpointY == document.getElementById('snakeElementNo_'+g).getBoundingClientRect().top)){
					//console.log(11111);
					snakeElementDirection[g-1]=snakeRouteBreakpoints[i].snakeDirection;
			}
		}	
	}
	/*for(g=1;g<=snakeElementNumber;g++){
		//snakeElementMoveToward(snakeElementDirection[g-1],g)
		
	}*/
	for(i=0;i<createdBreakpointsEncounter;i++){
		if((document.getElementById('snakeElementNo_'+snakeElementNumber).getBoundingClientRect().left==snakeRouteBreakpoints[i].breakpointX)&(document.getElementById('snakeElementNo_'+snakeElementNumber).getBoundingClientRect().top==snakeRouteBreakpoints[i].breakpointY)){
			deleteBreakpoint(i);
			//console.log(snakeRouteBreakpoints);
		}
	}
	for(i=1;i<=snakeElementNumber;i++){
		snakeElementMoveToward(snakeElementDirection[i-1], i);
		
		//console.log(i);
	}
	for(i=1;i<=snakeElementNumber;i++){
		if(document.getElementById('snakeElementNo_'+i).getBoundingClientRect().left>499){
			document.getElementById('snakeElementNo_'+i).style.left=0+'px';
		}
		else if(document.getElementById('snakeElementNo_'+i).getBoundingClientRect().left<0){
			document.getElementById('snakeElementNo_'+i).style.left=490+'px';
		}
		else if(document.getElementById('snakeElementNo_'+i).getBoundingClientRect().top<0){
			document.getElementById('snakeElementNo_'+i).style.top=490+'px';
		}
		else if(document.getElementById('snakeElementNo_'+i).getBoundingClientRect().top>499){
			document.getElementById('snakeElementNo_'+i).style.top=0+'px';
		}
	}
	if(document.getElementById('snakeElementNo_1').getBoundingClientRect().left==appleX && document.getElementById('snakeElementNo_1').getBoundingClientRect().top==appleY){
		appleOld = document.getElementById('apple');
		appleOld.parentNode.removeChild(appleOld);
		score=score+10;
		document.getElementById('scoreTab').textContent=score;
		appleGenerator();
		snakeElementAdd();
		switch(score){
			case 10:
				gameMain(210);
			break;
			case 20:
				gameMain(180);
			break;
			case 30:
				gameMain(160);
			break;
			case 40:
				gameMain(140);
			break;
			case 50:
				gameMain(120);
			break;
			case 70:
				gameMain(110);
			break;
			case 90:
				gameMain(100);
			break;
			case 310:
				gameMain(40);
			break;
			case 500:
				gameMain(20);
			break;
			case 200:
				gameMain(50);
			break;
		}
	}
	for(i=2;i<=snakeElementNumber;i++){
		if((document.getElementById('snakeElementNo_1').getBoundingClientRect().left==document.getElementById('snakeElementNo_'+i).getBoundingClientRect().left)&&(document.getElementById('snakeElementNo_1').getBoundingClientRect().top==document.getElementById('snakeElementNo_'+i).getBoundingClientRect().top)){
			snakeLives--;
			if(snakeLives==0){
				gameOver();
			}
			/*score=score-50;*/
			document.getElementById('livesTab').textContent=snakeLives;
			for(g=snakeElementNumber;g>i-1;g--){
				snakeElement2Delete = document.getElementById('snakeElementNo_'+g);
				snakeElement2Delete.parentNode.removeChild(snakeElement2Delete);
				snakeElementNumber=i-1;
				document.getElementById('scoreTab').textContent=score;
			}
		}
	}
}
appleGenerator();
function appleGenerator(){
	appleNew = document.createElement('div');
	appleNew.classList.add('apples');
	appleNew.id='apple';
	appleNew.style.top=rand()+'px';
	appleNew.style.left=rand()+'px';
	playingZone.appendChild(appleNew);
	appleX = document.getElementById('apple').getBoundingClientRect().left;
	appleY = document.getElementById('apple').getBoundingClientRect().top;
}
function gameMain(difficulty){
	document.getElementById('playButton').disabled=true;
	document.getElementById('pauseButton').disabled=false;
	clearInterval(gameAnimation);
	console.log(difficulty);
	gameAnimation = setInterval(animationSet, difficulty);
} 

/*console.log(document.getElementById('snakeElementNo_1').getBoundingClientRect());*/
function gameOver(){
	clearInterval(gameAnimation);
	if(score>highScore){
		highScore=score;
		alert('НОВЫЙ РЕКОРД! ЦЕЛЫХ '+score+' ОЧКОВ!!!');
	}
	else{
		alert('Ваш счет: '+score+' очков');
		alert('Ваш рекорд: '+highScore+' очков!');
	}
	document.getElementById('highScoreTab').textContent=highScore;
	for(g=snakeElementNumber;g>1;g--){
				snakeElement2Delete = document.getElementById('snakeElementNo_'+g);
				snakeElement2Delete.parentNode.removeChild(snakeElement2Delete);
	}
	snakeElementNumber=1;
	snakeRouteBreakpoints=[];
	snakeElementDirection = ['right']
	createdBreakpointsEncounter=0;
	snakeLives=3;
	document.getElementById('playButton').disabled=false;
	document.getElementById('pauseButton').disabled=true;
	document.getElementById('snakeElementNo_1').style.left=rand()+'px';
	document.getElementById('snakeElementNo_1').style.top=rand()+'px';
	score=0;
	document.getElementById('scoreTab').textContent=score;
}
function rand(){
	return 10 * Math.floor(Math.random() * 50);
}
function gamePause(){
	clearInterval(gameAnimation);
	document.getElementById('playButton').disabled=false;
	document.getElementById('pauseButton').disabled=true;
}