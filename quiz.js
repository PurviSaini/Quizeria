//import for using local storage
import { local } from 'wix-storage';

$w.onReady(function () {

    //defining some variables
    let score = 0; //contain the score
    let data; //will contain response from api
    let start = 6; // starting no. of the button with options on them
    //getting the values for theme and level selected on themes.js page
    let theme = local.getItem("theme");
    let level = local.getItem("level");

    //creating an ajax request 
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        `https://opentdb.com/api.php?amount=5&category=${theme}&difficulty=${level}&type=multiple`,
        true
    );
    //dealing with the response from api
    xhr.onload = function () {
        data = JSON.parse(this.responseText) //data is now a object
        data = (data["results"]) //"results" key in data contains questions and answers

        //traversing over the data object which is somewhat like this
        /*
        {
            "response_code": 0,
            "results": [
            {
            "category": "Science & Nature",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which is the longest bone in the human body? ",
            "correct_answer": "Femur",
            "incorrect_answers": [
            "Scapula",
            "Fibula",
            "Ulna"
            ]
            },
            {
            "category": "Science & Nature",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What is the first element on the periodic table?",
            "correct_answer": "Hydrogen",
            "incorrect_answers": [
            "Helium",
            "Oxygen",
            "Lithium"
            ]
            },......
        */
        for (let index = 0; index < data.length; index++) {
            let question = (data[index]["question"]); //getting the question
            //modifying question: replacing html codes with their respective special characters
           
            question = question.replaceAll('&#38;', '&');
            question = question.replaceAll('&#62;', '>');
            question = question.replaceAll('&#60;', '<');
            question = question.replaceAll('&quot;', '"');
            question = question.replaceAll('&#35;', '#');
            question = question.replaceAll('&amp;', '&');
            question = question.replaceAll('&#39;', "'");
            question = question.replaceAll('&#40;', '(');
            question = question.replaceAll('&#41;', ')');
            question = question.replaceAll('&#44;', ',');
            question = question.replaceAll('&#45;', '-');
            question = question.replaceAll('&#47;', ')');
            question = question.replaceAll('&#41;', '/');
            question = question.replaceAll('&#58;', ':');
            question = question.replaceAll('&#59;', ';');
            question = question.replaceAll('&lt;', '<');
            question = question.replaceAll('&gt;', '>');
            question = question.replaceAll('&#61;', '=');
            question = question.replaceAll('&#63;', '?');
            question = question.replaceAll('&#64;', '@');
            question = question.replaceAll('&#95;', '_');
            question = question.replaceAll('&deg;', '°');
            question = question.replaceAll('&#039;', "'");

           
          

            let options = data[index]["incorrect_answers"]; //first storing the incorrect ans into options array
            options.push(data[index]["correct_answer"]) //storing the correct answer from data object
            //randomly changing the position of correct ans
            let randomPosition = Math.floor(Math.random() * (3 - 0 + 1)) + 0 //computing a random position for correct ans to be swapped with the array element at this random position
            //swapping
            let temp = options[3];
            options[3] = options[randomPosition];
            options[randomPosition] = temp;

            // console.log("Question\n", question, "\nOPtions\n", options)
            //filling the text boxes on webpage with questions
            $w(`#textBox${index+1}`).value = question;
            //filling the buttons on webpage with options
            for (let i = 0; i <= 3; i++) {
                options[i] = options[i].replaceAll('&#039;', "'");
                options[i] = options[i].replaceAll('&deg;', '°');
                options[i] = options[i].replaceAll('&quot;', '"');
                $w(`#button${start}`).label = options[i];
                start++;
            }

        }
    }
    xhr.send(); //sending the request

    //after user clicks on any option 

    //storing the users answers
    //btn 6,7,8,9-> question 1
    //btn 10,11,12,13 ->q 2
    //btn 14,15,16,17-> q3
    //btn 18,19,20,21->q4
    //btn 22 23 24 25->q5
    for (let index = 6; index <= 25; index++) {
        $w(`#button${index}`).onClick(function () {
            if (index >= 22) { //it's q5
                let userAns = $w(`#button${index}`).label;
                if (userAns == data[4]["correct_answer"]) { //if user clicked ans is same as correct ans then increase the score
                    score++;
                }
            } else if (index >= 18) { //it's q4
                let userAns = $w(`#button${index}`).label;
                if (userAns == data[3]["correct_answer"]) {
                    score++;
                }
            } else if (index >= 14) { //it's q4
                let userAns = $w(`#button${index}`).label;
                if (userAns == data[2]["correct_answer"]) {
                    score++;
                }
            } else if (index >= 10) { //it's q4
                let userAns = $w(`#button${index}`).label;
                if (userAns == data[1]["correct_answer"]) {
                    score++;
                }
            } else if (index >= 6) { //it's q4
                let userAns = $w(`#button${index}`).label;
                if (userAns == data[0]["correct_answer"]) {
                    score++;
                }
            }
            local.setItem("score", score); //storing the final score in local storage
        })

    }

});