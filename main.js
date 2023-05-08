document.addEventListener("DOMContentLoaded", function () {
    timing_handler([
        {func: hello_sequence, delay: 700, duration: 1500},
        {func: reveal_card, delay: 2200, duration: 700},
        {func: recorrect_card, delay: 2900, duration: 400}
    ]);
});

function timing_handler(arr) {
    arr.forEach(process => {
        setTimeout(function () {
            (process.func)(process.duration)
        }, process.delay)
    })
}

function hello_sequence(duration) {
    helloText = document.querySelector(".hello-text");
    progressBar = document.querySelector(".progress-bar .bar");
    progressText = document.querySelector(".progress-bar .bar .text");
    
    helloText.classList.add("shown");

    setTimeout(function () {
        progressBar.classList.add("pb-active");

        complete_percent = 100;
        for(let i = 0; i <= complete_percent; i += 1) {
            if (!progressText.classList.contains("shown")) {
                if (i > 5) {
                    progressText.classList.add("shown");
                }
            }
            setTimeout(function () {
                progressText.innerText = `${i}%`;
            }, i * 10);
            console.log(i * ((duration - 200) / complete_percent));
        }

        setTimeout(function () {
            progressText.style.transform = "translateY(-22%)";
        }, duration - 100);
        setTimeout(function () {
            progressText.classList.remove("shown");
        }, duration);
    }, 300);
}

function reveal_card(duration) {
    card = document.querySelector(".card");
    helloText = document.querySelector(".hello-text");
    num = parseFloat((Math.random() * 12 - 6).toFixed(2));

    card.style.transition = "transform 0s";
    card.style.transform = "translate(" + num.toString() + "vw, 80vh)";
    card.style.rotate = (num * -1).toString() + "deg";

    card.style.transition = "transform " + (duration / 1000).toFixed(2).toString() + "s";
    card.style.transform = "translate(" + (num * -1).toString() + "vw, 15vh)";

    helloText.style.transition = "opacity " + ((duration / 1000) * 0.33).toFixed(2).toString() + "s";
    helloText.classList.add("zero-opacity");
    // card.style.transform = "translateY(" + (20 + arr[0]).toString() + "vh)";
    setTimeout(function () {
        card.style.transition = "transform 0s";
    }, duration)
}

function recorrect_card(duration) {

}

function change_card(selected_card) {
    console.log(selected_card);
    cards = ["intro-card", "about-card", "like-card", "exp-card", "contact-card"];

    cards.forEach(card => {
        c = document.querySelector("." + card);
        if (!(selected_card == card)) {
            if (!(c.classList.contains("hidden-card"))) {
                c.classList.add("hidden-card");
            }
        } else {
            c.classList.remove("hidden-card");
        }
    });



}