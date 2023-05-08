document.addEventListener("DOMContentLoaded", function () {
    timing_handler([
        {func: hello_sequence, delay: 700, duration: 1500},
        {func: reveal_card, delay: 2200, duration: 700},
        {func: recorrect_card, delay: 3200, duration: 1000}
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
}

function recorrect_card(duration) {
    duration_in_seconds = (duration / 1000).toFixed(2).toString();
    card = document.querySelector(".card");
    root = document.querySelector(":root");
    // Make it non-crooked, larger, and center
    
    // card.style.transition = "all " + duration_in_seconds + "s";
    // root.style.setProperty("--card-main", "70vw");
    set_card_main(duration, 70);

    setTimeout(function () {
        card.style.transition = "transform 0s";
    }, duration);
}

function set_card_main(duration, vw) {
    card = document.querySelector(".card");
    root = document.querySelector(":root");
    main = document.querySelector("main");
    
    card.style.transition = "width 0s, height 0s";
    
    current_main = card.getBoundingClientRect().width;
    new_main = main.getBoundingClientRect().width * (vw / 100);
    
    for (let i = 0; i < duration; i+=5) {
        setTimeout(function () {
            root.style.setProperty("--card-main", (current_main + ((i / duration) * (new_main - current_main))).toString() + "px");
        }, i)
    }

    setTimeout(function () {
        root.style.setProperty("--card-main", vw + "vw");
    }, duration);
}

function change_card(selected_card) {
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