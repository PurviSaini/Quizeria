//import for animation
import { timeline } from 'wix-animations'

$w.onReady(function () {
    //adding animation to image
    const target1 = $w('#image1');
    const reset = { y: 0, x: 0, scale: 1, duration: 1600, easing: 'easeOutBack' };

    timeline({ repeat: -1, yoyo: true })
        .add(target1, { y: 10, x: 0, scale: 1, duration: 1000, easing: 'easeInBack' })
        .play()

});