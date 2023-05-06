document.addEventListener("DOMContentLoaded", function () {
    timing_handler([
        {func: hello_sequence, timing: 700}
    ]);
});

function timing_handler(arr) {
    arr.forEach(process => {
        setTimeout(function () {
            (process.func)()
        }, process.timing)
    })
}

function hello_sequence() {
    helloSection = document.querySelector(".hello-intro");
    setTimeout(function () {
        helloSection.style.visibility = "visible";
        helloSection.style.opacity = "100%";
    }, 700);

    setTimeout(function () {
        progressBar = document.querySelector(".progress-bar .bar");
        progressText = document.querySelector(".progress-bar .bar .text");

        progressBar.classList.add("pb-active");

        for(let i = 0; i <= 100; i += 1) {
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
            progressText.style.transition = "opacity 0.2s, transform 0.3s";
            progressText.style.transform = "translateY(0px)";
        }, 1400);
        setTimeout(function () {
            progressText.classList.remove("shown");
        }, 1600);
    }, 1300);
}