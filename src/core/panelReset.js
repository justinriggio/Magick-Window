var inactivityTime = function () {
    console.log("Inactivity time");
    const inactivityMillisecond = 30000; //1000 milliseconds = 1 second

    var inactivityTimeout;
    var modal;
    var span;
    var resetTimeout;

    if (document.title !== "Home")  {   // if not on home page
        window.onload = resetTimer;
        // DOM Events
        document.onkeydown = resetTimer;
        document.onmousemove = resetTimer;
        document.onmousedown = resetTimer; // touchscreen presses
        document.ontouchstart = resetTimer;
        document.onclick = resetTimer;     // touchpad clicks
        resetTimer();
    }
    

    function resetCountDown() {
        modal = document.getElementById("myModal");
        modal.style.display = "block";
        var timeleft = 10;
        console.log(`reset started`);
        db.tracking.add({page : document.title, timestamp : Date.now(), status : 'reset started', notes : 'Panel Kiosk'});
        resetTimeout = setInterval(function(){
            if(timeleft <= 0){
                clearInterval(resetTimeout);
                document.getElementById("countdown").innerHTML = "Finished";
                console.log(`reset finished`);
                db.tracking.add({page : document.title, timestamp : Date.now(), status : 'reset finished', notes : 'Panel Kiosk'});
                location.href = 'index.html'
            } else {
                document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            }
            timeleft -= 1;
        }, 1000);
    }

    if (document.title !== "Admin")  {   // if not on home page
        // Get the <span> element that closes the modal
        span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            clearInterval(resetTimeout);
            modal.style.display = "none";
            document.getElementById("countdown").innerHTML = " ";
            console.log(`reset cancelled`);
            db.tracking.add({page : document.title, timestamp : Date.now(), status : 'reset cancelled', notes : 'Panel Kiosk'});
        };
    }
    

    function resetTimer() {
        console.log(`reset timer started`);
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(resetCountDown, inactivityMillisecond)
        // 1000 milliseconds = 1 second
    };
};


window.onload = function() {
    console.log("Window loaded");
    inactivityTime();
};
