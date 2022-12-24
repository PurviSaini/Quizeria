//basic imports
import { local } from 'wix-storage';
import { timeline } from 'wix-animations'

$w.onReady(function () {
    //creating some variables 
    let themeToNum = {
        "CARTOON &": 32,
        "ANIMATION": 32,
        "FILM": 11,
        "SPORTS": 21,
        "SCIENCE &": 17,
        "TECHNOLOGY": 17
    }
    let theme;
    let level;

    //looping over all the button elements of themes to set click event on all the buttons
    for (let index = 4; index <= 9; index++) {
        $w(`#button${index}`).onClick(function () {
            theme = ($w(`#button${index}`).label);
            //mapping the user selected theme with its number
            theme = themeToNum[theme]; //number of theme is accepted by api

        });

    }
    //looping over all the button elements of levels to set click event on all the buttons
    for (let index = 1; index <= 3; index++) {
        $w(`#button${index}`).onClick(function () {
            $w(`#button${index}`).style.color = "green";
            level = ($w(`#button${index}`).label);
            level = level.toLowerCase(); //storing the value of level clicked into level variable

        });

    }
    $w("#button10").onClick(function () {
        //storing the value of theme and level in local storage so as to access it on quiz.js file
        local.setItem("theme", theme);
        local.setItem("level", level);

    })
    //adding animations to images of themes
    const target5 = $w('#image3'); //theme image

    timeline({ repeat: -1, yoyo: true })
        .add(target5, { y: 10, x: 0, scale: 1, duration: 1000, easing: 'easeInBack' })
        .play()

const target6 = $w('#image4'); //theme image

    timeline({ repeat: -1, yoyo: true })
        .add(target6, { y: 10, x: 0, scale: 1, duration: 1000, easing: 'easeOutBack' })
        .play()

        const target7 = $w('#image5'); //theme image

    timeline({ repeat: -1, yoyo: true })
        .add(target7, { y: 10, x: 0, scale: 1, duration: 1000, easing: 'easeInBack' })
        .play()

        const target8 = $w('#image6'); //theme image

    timeline({ repeat: -1, yoyo: true })
        .add(target8, { y: 10, x: 0, scale: 1, duration: 1000, easing: 'easeOutBack' })
        .play()
    //adding animation to theme and level titles
    const reset = { y: 0, x: 0, scale: 1, duration: 1600, easing: 'easeOutBack' };

    const target2 = $w('#image8'); //level image
    timeline({ repeat: -1, yoyo: true })
        .add(target2, { y: 10, x: 0, scale: 1, duration: 1000, easing: 'easeInBack' })
        .play()

    //adding animation to text within theme and level


    const target4 = $w('#text3'); //level text
    timeline({ repeat: -1, yoyo: true })
        .add(target4, { y: 10, x: 0, scale: 1, duration: 1000, easing: 'easeInBack' })
        .play()

});