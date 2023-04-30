document.addEventListener("DOMContentLoaded", function () {
    hello_sequence();
});

function hello_sequence() {
    helloSection = document.querySelector(".hello-intro");
    setTimeout(function () {
        helloSection.style.visibility = "visible";
        helloSection.style.opacity = "100%";
    }, 700);

    setTimeout(function () {
        progressBar = document.querySelector(".progress-bar .bar");
        progressText = document.querySelector(".progress-bar .bar .text");
        for(let i = 0; i <= 100; i++) {
            if (i == 5) {
                progressText.style.visibility = "visible";
                progressText.style.opacity = "100%";
            }
            setTimeout(function () {
                progressBar.style.width = `${i}%`;
                progressText.innerText = `${i}%`;
            }, i * 7.5);
        }
        setTimeout(function () {
            progressText.style.transition = "opacity 0.2s, transform 0.3s";
            progressText.style.transform = "translateY(0px)";
        }, 1400);
        setTimeout(function () {
            progressText.style.visibility = "hidden";
        }, 1600);
    }, 1300);
}