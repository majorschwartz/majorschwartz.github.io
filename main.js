document.addEventListener("DOMContentLoaded", function () {
    timing_handler([
        {func: hello_sequence, delay: 700, duration: 1500},
        {func: reveal_card, delay: 700, duration: 1}
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