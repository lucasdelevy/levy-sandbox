var max_question_counter = 9 // number of questions - 1
var vocabulary_item // item queried from database
var n_level = 5 // default level (N1 ~ N5)
var n_button // array of level buttons
var question_counter = 0 // variable with current question - 1
var previous_button // button to previous question
var next_button // button to next question
var question_div // div where question is written
var question_num_div // div where question number is written
var answer_div // div where answer textbox is written by user
var answers // array of answers provided by user
var score_div // div where final score is written
var mistakes // array with index of wrong answers provided
var mistakes_table // table with mistakes
var table_is_shown

$(document).ready(function()
{
	if(!String.prototype.trim)
	{  
		String.prototype.trim = function ()
		{  
	    		return this.replace(/^\s+|\s+$/g,'');  
	  	};
	} 

	question_div = document.getElementById('question_div')

	$.getJSON('/jlpt/vocabulary/sample',
	{
		level: 5,
		num_questions: max_question_counter+1
	})
	.done(function(repos_data)
	{
		
		for (var idx = 0; idx < repos_data.length; idx++)
			console.log(repos_data[idx].kanji,repos_data[idx].hiragana)

    vocabulary_item = repos_data
    question_div.innerHTML = vocabulary_item[question_counter].kanji
	})

	n_button = 	[	document.getElementById('n1_button'),
					document.getElementById('n2_button'),
					document.getElementById('n3_button'),
					document.getElementById('n4_button'),
					document.getElementById('n5_button')]
	previous_button = document.getElementById('previous_button')
	next_button = document.getElementById('next_button')
	question_num_div = document.getElementById('question_num')
	
	answer_div = document.getElementById('text_answer')
	wanakana.bind(answer_div)

	answers = new Array(max_question_counter+1).join('.').split('.')
	score_div = document.getElementById('score_div')
	mistakes_div = document.getElementById('mistakes_div')
	mistakes = new Array()
	mistakes_items = new Array()
	mistakes_table = document.createElement('TABLE')
	mistakes_table.setAttribute('width', '100%')
  	mistakes_table.setAttribute('border', '1')
	table_is_shown = false;

	document.getElementById("text_answer").addEventListener("keyup", 
		function(event)
		{
  		event.preventDefault();
  		if (event.keyCode == 13)
    		document.getElementById("next_button").click();
		});
})

function submitAnswer()
{
	answers[question_counter] = answer_div.value

	var score = 0
	
	for(i = 0; i <= max_question_counter; i++)
	{
		var find_string = (!answers[i].trim() ? 'no answer' : answers[i].trim())
		console.log(find_string)
		if(vocabulary_item[i].hiragana.indexOf(find_string) >= 0)
			score++
		else
			mistakes.push(i)
	}

	score_div.innerHTML = 'Final score: '.concat(score).concat('/').concat(max_question_counter+1)

// Updating table
  for(var i = 0; i <= max_question_counter+1; i++)
  {
  	if(!table_is_shown)
  	{
	  	mistakes_table.insertRow()

			mistakes_table.rows[i].insertCell();
			mistakes_table.rows[i].insertCell();
		}

		if(!i)
		{
			mistakes_table.rows[0].cells[0].innerHTML = 'Your answer'
  		mistakes_table.rows[0].cells[1].innerHTML = 'Correct answer'
		}
		else
		{
			mistakes_table.rows[i].cells[0].innerHTML = answers[i-1].trim() == '' ? 'no answer' : answers[i-1]
			mistakes_table.rows[i].cells[1].innerHTML = vocabulary_item[i-1].hiragana.replace('[\"','').replace('\", \"',', ').replace('\"]', '')

  		if(mistakes.indexOf(i-1) >= 0)
  			mistakes_table.rows[i].style.color = '#AD3737';
  		else
  			mistakes_table.rows[i].style.color = '#7DA234';
		}
  }

	mistakes_div.appendChild(mistakes_table)
	mistakes = []
	table_is_shown = true;
}

function setQuestion(question_adder)
{
	// Saving answer before erasing text
	answers[question_counter] = answer_div.value

	// Adding current question counter
	question_counter = question_counter + question_adder
	answer_div.value = answers[question_counter]

	// Disabling or enabling previous and next buttons
	previous_button.disabled = false
	next_button.disabled = false
	if(question_counter <= 0)
		previous_button.disabled = true
	else if(question_counter >= max_question_counter)
		next_button.disabled = true

	// Changing question number and question itself
	question_num_div.innerHTML = 'Question 0'.concat(question_counter+1)
	question_div.innerHTML = vocabulary_item[question_counter].kanji
}

function setLevel(set_level)
{
	n_button[n_level-1].disabled = false
	n_level = set_level
	n_button[set_level-1].disabled = true

	$.getJSON('/jlpt/vocabulary/sample',
	{
		level: set_level,
		num_questions: max_question_counter+1
	})
	.done(function(repos_data)
	{
		for (var idx = 0; idx < repos_data.length; idx++)
			console.log(repos_data[idx].kanji)

	    vocabulary_item = repos_data
	    document.getElementById('question_div').innerHTML = vocabulary_item[question_counter].kanji
	})
}