var correct_answer

$(document).ready(function()
{
    if(!String.prototype.trim)
    {  
        String.prototype.trim = function ()
        {  
                return this.replace(/^\s+|\s+$/g,'');  
        };
    } 

    setQuestion()

})

function submitAnswer()
{
    submitted_answer = document.getElementById('text_answer').value
    answer_div = document.getElementById('answer_div')
    
    if (submitted_answer == correct_answer)
        answer_div.innerHTML = 'BOA, RAPAZ. DÁ \''.concat(correct_answer).concat('\' MESMO')
    else
        answer_div.innerHTML = 'ERROU!'
}

function setQuestion()
{
    question_div = document.getElementById('question_div')
    answer_div = document.getElementById('answer_div')
    submitted_answer = document.getElementById('text_answer')

    /* Clearing up */
    answer_div.innerHTML = '<br>'
    submitted_answer.value = null

    /* Getting terms */
    num_terms = Math.round(getRandomArbitrary(1,2))

    terms = []
    terms[0] = Math.round(getRandomArbitrary(1,100))
    for (i = 1; i <= num_terms-1; i++)
        terms[i] = Math.round(getRandomArbitrary(-100,100))
    terms[num_terms] = terms.reduce(add,0) + Math.round(getRandomArbitrary(1,100))

    /* Assemblying equation */
    pos_question = Math.round(getRandomArbitrary(0,num_terms-1))
    equation = ''
    sum_left = 0
    for (i = 0; i <= num_terms-1; i++)
    {
        if (i == pos_question && i > 0)
            equation = equation.concat(' + ?')
        else if (i == pos_question && i == 0)
            equation = equation.concat('? + ')

        if (terms[i] > 0 && i > 0)
            equation = equation.concat(' + '.concat(terms[i]))
        else if (terms[i] > 0)
            equation = equation.concat(terms[i])
        else if (terms[i] < 0 && i > 0)
            equation = equation.concat(' - '.concat(Math.abs(terms[i])))

        sum_left += terms[i]
    }
    equation = equation.concat(' = '.concat(terms[num_terms]))
    
    question_div.innerHTML = equation

    /* Getting correct answer */
    correct_answer = terms[num_terms] - sum_left
}

function showAnswer()
{
    answer_div = document.getElementById('answer_div')
    answer_div.innerHTML = 'A resposta é: '.concat(correct_answer)
}

function getRandomArbitrary(min, max)
{
    num = Math.random() * (max - min) + min;
    return num
}

function add(a, b)
{
    return a + b;
}