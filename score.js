//basic import
import { local } from 'wix-storage';

$w.onReady(function () {
    //getting the score from local storage
    let score = local.getItem("score");
    $w("#button11").label = score + " / 5"; //displaying the score on webpage

});