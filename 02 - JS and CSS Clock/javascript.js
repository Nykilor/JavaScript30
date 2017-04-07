function getTime(date) {
    if(typeof(date) == "object") {
       return {
        "minutes": date.getMinutes(),
        "seconds": date.getSeconds(),
        "hours": date.getHours()
        }; 
    } else {
        throw new Error("Date got to be an object of Date");
    }
}

function setHand(type, elementClass, date) {
        const time = getTime(date);
        const hand = document.querySelector(elementClass);
        
        if(type == "hours") {
            var max = 12;
        } else {
            var max = 60;
        }
            
        var timeDegrees = ((time[type] / max) * 360) + 90;
        
        hand.style.transform = `rotate(${timeDegrees}deg)`;
}
function setTime(date) {
    const time = getTime(date);
    const timerElement = document.querySelector(".timer");
    timerElement.innerHTML = time['hours'] + " : " + time['minutes'] + " : " + time['seconds'];
}
function setDate() {
    const dateObject = new Date();
    
    setHand("seconds", ".second-hand", dateObject);
    setHand("minutes", ".min-hand", dateObject);
    setHand("hours", ".hour-hand", dateObject);
    setTime(dateObject);
    
}

setInterval(setDate, 1000);