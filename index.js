'use strict'
let correctAnswers = 0;
let questionNum = 1;

const questionSet =[{
    number: 1,
    question: `Which one is not an object oriented programing language?`,
    answer1: `Java`,
    answer2: `C#`,
    answer3: `C++`,
    answer4: `C`
},
{
    number: 2,
    question: `What is the symbol to comment out one line in JavaScript?`,
    answer1: `//This is a comment`,
    answer2: `**This is a comment`,
    answer3: `%%This is a comment`,
    answer4: `**This is a comment**`
},
{
    number: 3,
    question: `Which language is used for web apps?`,
    answer1: `PHP`,
    answer2: `Python`,
    answer3: `Javascript`,
    answer4: `All of the above`
},
{
    number: 4,
    question: `Which is not a CSS selector?`,
    answer1: `.select`,
    answer2: `#select`,
    answer3: `p`,
    answer4: `@select`
},
{
    number: 5,
    question: `Inside which HTML element do we put the JavaScript?`,
    answer1: `javascript`,
    answer2: `scripting`,
    answer3: `script`,
    answer4: `.js`
}
];

const ANSWER = [`C`, `//This is a comment`, `All of the above`, `@select`, `script`];

function questionTemplate(correctAnswers, question, questionsAnswered){
    return `
    <section id="questions" role="main">
    <legend class="headercontainer">
    <h2 id="question">${question.question}</h2>
    </legend>
    <form>
        <fieldset>
            <label for="choice1">
                <input class="answer" id="choice1" type="radio" value="${question.answer1}" name="option" checked/>
                <span>${question.answer1}</span>
            </label><br>
        
  
            <label for="choice2">
                <input class="answer" id="choice2" value="${question.answer2}" type="radio" name="option"/>
                <span>${question.answer2}</span>
            </label><br>
        
  
            <label for="choice3">
                <input class="answer" id="choice3" value="${question.answer3}" type="radio" name="option"/>
                <span>${question.answer3}</span>
            </label><br>
        
  
            <label for="choice4">
                <input class="answer" id="choice4" value="${question.answer4}" type="radio" name="option"/>
                <span>${question.answer4}</span>
            </label><br>
        
      
         <button id="submitbutton">Submit</button>
        </fieldset>
    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/5 </span>
      <span id="score-count"> Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function startButton(){
    $('.container').on('click', '#startbutton',(event)=>{
        
        currentQuestion();
    });
    }

function submitButton(){
    $('.container').on('click', '#submitbutton', function(event){
        
        event.preventDefault();
        const answer = $('input:checked').siblings('span');
        const correct = checkAnswer(answer);
        if(correct){
        
                $('.container').html(isCorrect());
        }else{
           
           $('.container').html(isWrong());
            
        }
    });
}

function currentQuestion(){
    let question = questionSet[questionNum - 1];
    let questionsAnswered = questionNum;
    $('.container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}


function checkAnswer(an){
    if(an.text() === ANSWER[questionNum-1]){
        
        correctAnswers++;
        
        return true;
    } else{
        return false;
    }
}

function isWrong(){
    return `<section id="wrongfeedback">
            <h1 class="wrong">"Wrong!"</h1>
            <p class="wronganswer">The answer is <span id="correctanswer">"${ANSWER[questionNum-1]}"</span></p>
            <fieldset>
            <button id="wrongbutton">Next</button>
            </fieldset>
            </section>`;
}

function wrongButton(){
    $('.container').on('click', '#wrongbutton', function(event){
        event.preventDefault();
        questionNum++
        if(questionNum !== 6){
            currentQuestion();
        } else{
            $('.container').html(resultFeed());
        }
        
    });
}

function isCorrect(){
    

    return `<section id="correctfeedback">
            <h1 class="correct">"Correct!"</h1>
            
            <button id="nextbutton">Next</button>
            </section>`;
}

function correctButton(){
    $('.container').on('click', '#nextbutton', function(event){
        event.preventDefault();
        questionNum++;
        if(questionNum !== 6){
            currentQuestion();
        } else{
            $('.container').html(resultFeed());
        }
        
    })
}

function resultFeed(){
    return `<section id="resultfeed">
    <h1 class="resultheader">You have completed the quiz!</h1>
    <p class="results">You got<span id="resulttext"> ${correctAnswers}</span> correct out of 5</p>
    <fieldset>
    <button id="restartbutton">Restart</button>
    </fieldset>
    </section>`;
}

function restartButton(){
    $('.container').on('click', '#restartbutton', function(event){
        event.preventDefault();
        questionNum = 1;
        correctAnswers = 0;
        currentQuestion();
    })
}


function handleButtons(){
    startButton();
submitButton();
wrongButton();
correctButton();
restartButton();
}

$(handleButtons);