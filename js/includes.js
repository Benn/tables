var list = [1,2,3,4,5,6,7,8,9,10];
var combinedList = [];
var combinedChances =  [];
var initialTotalChance = 0;
var operation = "+";
var timer = 0; //initiate timer variable
var great = 7; 
var ok = 9;
var average = 11;
var poor = 13;

// sets combinedList to an one dimensional array of all possible combinations with the selected numbers and the associated probability of 10 in combinedChances
function initiateCombinedLists() {
	console.log("== initiateCombinedLists ==");
	combinedList = [];
	combinedChances = [];
	list.forEach(function(item) {
		for (var i =0; i<10; i++) {
			if(operation=="-") {
				combinedList.push((parseInt(item)+i).toString()+"-"+item);
			} else if (operation == "/") {
				combinedList.push(((i+1)*parseInt(item)).toString()+operation+item);
			} else {
				combinedList.push(i+1+operation+item);					
			}
			combinedChances.push(10);
		}
	});
	initialTotalChance = combinedChances.reduce((acc, el) => acc + el, 0);	
	$('#progressbar').css("width", 0 + "%")
	$('#progressbar').html("0%")
	console.log("initialTotalChance = "+initialTotalChance);
	console.log(combinedList);
	console.log(combinedChances);
}

function initiateResultsTable() {
	console.log("== initiateResultsTable ==");
	$('#results').html("");
// create table

$('#results').append($('<table id="resultsTable">'));
// thead
$('#resultsTable').append('<thead>').children('thead').append('<tr id="columns" />');
$('#resultsTable').append('<tbody />').children('tbody');
for (var i =1; i<=10; i++) {
	$('#resultsTable>tbody').append('<tr id="ligne'+i+'"/>');
}
list.forEach(function(item) {
	$('tr#columns').append('<th>' + item + '</th>');
});
//tbody
for (var i =1; i<=10; i++) {
	for (var  j=1; j<=list.length; j++) {
		id = combinedList[(j-1)*10 + i-1];
		$('tr#ligne'+i).append('<td id="'+  id+ '" number="0">' + beautifyQuestion(id) + '<span class="cellAverage" style="display:none;"><br/><span id="average' + id + '">0</span>s</span></td>');
	}
}
}

//picks a random item from list based on the probability in chances
function chooseWeighted(list, chances) {
	console.log('== chooseWeighted ==');
	var sum = chances.reduce((acc, el) => acc + el, 0);
	var acc = 0;
	chances = chances.map(el => (acc = el + acc));
	var rand = Math.random() * sum;
	return list[chances.filter(el => el <= rand).length];
}

// picks and displays a random combination of numbers
function entrainement() {
	console.log("== entrainement ==");
	pick = chooseWeighted(combinedList, combinedChances);
	console.log(pick);

// Displays the pick on the screen
$("#question").html(beautifyQuestion(pick));
//$("#operand").html((operation=="*")?"x":operation);
$('#result').focus();
}

function beautifyQuestion(question) {
	return (question.replace("*","x")).replace("/","&divide;");
}

function uglifyQuestion(question) {
	return (question.replace("x","*")).replace("÷","/").replace("&divide;","/");
}

// start the timer
function startTimer() {
	console.log("== startTimer ==");
	setInterval(function () {
		timer++;
		$('#timer').html((parseFloat(timer)/10).toFixed(1));
	}, 100);
}

// handles a wrong answer
function error() {
	console.log("== error ==");
$("#success").hide(); //in case it's still displayed
// display the error icon for half a second
$("#error").show().delay(500).queue(function(n) {
	$(this).hide();
});
}

// handles a correct answer
function success(i, j) {
$("#error").hide(); //in case it's still displayed
console.log("== success ==");
cell = $('#'+i+"\\"+operation+j); //corresponding cell in the resultsTable
averageCell = $('#average'+i+"\\"+operation+j); //corresponding average cell in the resultsTable
console.log('#'+i+operation+j);
// display the success icon for half a second
$("#success").show().delay(500).queue(function(n) {
	$(this).hide(); n();
});

console.log("time for " + i + operation + j + " : " + timer/10);
number = parseFloat(cell.attr('number')); //number of times this combination has been picked in the past
cell.attr('number',number+1); //increment it
average = parseFloat(averageCell.html()); //past average time for this combination
newaverage = Math.round((average*number+timer/10)/(number+1)*10)/10; //calculate new average
averageCell.html(newaverage); //update average

cell.removeClass(); //remove all classes from the cell
index = combinedList.indexOf(i+operation+j); //index of the combination in combinedList and combinedChances
//update the class in resultsTalbe and the probability in combinedChances
if (newaverage<=great) {
	newClass  = "great";
	combinedChances[index] = Math.round(combinedChances[index]/5); 
} else
if (newaverage<=ok) {
	newClass  = "ok";
	combinedChances[index] = Math.round(combinedChances[index]/3); 
} else
if (newaverage<=average) {
	newClass  = "average";
} else
if (newaverage<=poor) {
	newClass  = "poor";
	combinedChances[index] = Math.round(combinedChances[index]*1.5); 
} else
{
	newClass  = "bad";
	combinedChances[index] = combinedChances[index]*2; 
}
cell.addClass(newClass); //add the class to the cell

//set the progress bar
totalChance = combinedChances.reduce((acc, el) => acc + el, 0); //sum of all current probabilities
percentage = Math.floor(((initialTotalChance-totalChance)/initialTotalChance)*100);
$('#progressbar').css("width", (percentage).toString() + "%");
$('#progressbar').html((percentage).toString() + "%");		
//If totalChance = 0, the game is won	
if (totalChance==0) {
	$("#question").html("Gagné !!");
	$("#result").prop('disabled', true);
	$("#pause").attr("status","victory").html("Recommencer");
	$("#timer").hide();
	return;
}
entrainement();
timer=0;
}

//sets the legend under the table
function setLegend() {
	console.log("== setLegend ==");
	$("#legend .great").html("<"+great + "s");
	$("#legend .ok").html("<"+ok + "s");
	$("#legend .average").html("<"+average + "s");
	$("#legend .poor").html("<"+poor + "s");
	$("#legend .bad").html(">"+poor + "s");
}

//resets the results everything based on currently selected params
function reset() {
	console.log("== reset ==");
	initiateCombinedLists();
	initiateResultsTable();
//activate input box
$("#result").prop('disabled', true);
//reset the pause button
$("#pause").html("Démarrer").attr("status","paused");
entrainement();
setLegend();
$("#timer").hide();
timer=0;
}

// Check input as we go (if the first caracters of the input isn't the first caracters of the result, return false)
function checkInput(input, expected) {
	console.log("== checkInput ==")
	console.log("expected : "+expected.substring(0, input.length));
	console.log("input : "+input);
	return (expected.substring(0, input.length) == input)
}


$( document ).ready(function() {
	console.log( "ready!" );
	reset();
	startTimer();

	//=========================
	//         Events        //
	//=========================

	// speed selection
	$("#speed").change(function() {			
		console.log("== Change speed ==");
		great = parseInt($(this).val());
		ok = parseInt($(this).val())+2;
		average = parseInt($(this).val())+4;
		poor = parseInt($(this).val())+6;
		console.log(poor);
		reset();
	})

	// Operation selection
	$("#operation").change(function () {
		console.log("== Change operation ==");
		operation=$(this).val();
		console.log("Operation = " + operation);
		reset();
	});

	// list of tables to work on selection
	$("#tables").change(function() {
		console.log("== Change list ==");
		list = $(this).val();
		reset();
	})


	// on input change
	$("#result").on("input", function () {
		console.log("== Change result ==");
		question = uglifyQuestion($("#question").html());
		console.log(question);
		number1 = parseInt(question.split(operation)[0]);
		number2 = parseInt(question.split(operation)[1]);
		correctAnswer = eval(question);
		console.log("res "+ correctAnswer);
		answer = $("#result").val();
		if (checkInput(answer, correctAnswer.toString()))  {
			answer = parseInt(answer);
			if (answer == correctAnswer) {
				console.log(answer + " = " + correctAnswer);
				console.log("bonne réponse");					
				$("#result").val('')
				success(number1, number2);
			} 
		}
		else {
			error();
			$("#result").val('')			
		} 
	})


	// on displayTimes click
	$("#displayTimes").click(function () {
		console.log("== displayTimes click ==");
		$(".cellAverage").toggle();
		if ($(this).html() == "Afficher Moyennes") $(this).html("Masquer Moyennes");
		else $(this).html("Afficher Moyennes");
	})

	// on pause press
	$("#pause").click(function () {
		console.log("== Paused clicked ==");
		if ($(this).attr("status") == "running"){
			$("#result").prop('disabled', true);
			$(this).html("Démarrer").attr("status","paused");
			$("#timer").hide();
		} else if ($(this).attr("status") == "victory") {
			reset();
		} else {
			$("#result").prop('disabled', false);
			$(this).html("Pause").attr("status","running");

			$("#timer").show();
			entrainement();
			timer = 0;
		}
	})

	// on reset press
	$("#reset").click(function () {
		console.log("reset clicked");
		reset();
	})
});