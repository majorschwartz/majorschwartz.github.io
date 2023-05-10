document.addEventListener("DOMContentLoaded", function () {
    timing_handler([
        { func: init_hide_cards, delay: 0, duration: 0 },
        { func: hello_sequence, delay: 700, duration: 1200 },
        { func: reveal_card, delay: 2200, duration: 700 },
        { func: recorrect_card, delay: 2700, duration: 1000 },
        { func: bye_bye_hello, delay: 3700, duration: 0 },
    ]);
});

function timing_handler(arr) {
    arr.forEach((process) => {
        setTimeout(function () {
            process.func(process.duration);
        }, process.delay);
    });
}

function hello_sequence(duration) {
    helloText = document.querySelector(".hello-text");
    progressBar = document.querySelector(".progress-bar .bar");
    progressText = document.querySelector(".progress-bar .bar .text");

    helloText.classList.add("shown");

    setTimeout(function () {
        progressBar.classList.add("pb-active");

        complete_percent = 100;
        for (let i = 0; i <= complete_percent; i += 1) {
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
        }, duration - 200);
        setTimeout(function () {
            progressText.classList.remove("shown");
        }, duration);
    }, 300);
}

function reveal_card(duration) {
    duration_in_seconds = (duration / 1000).toFixed(2);
    card = document.querySelector(".card");
    helloText = document.querySelector(".hello-text");
    helloSection = document.querySelector(".hello-intro");
    arr = Array.from({ length: 2 }, () =>
        parseFloat((Math.random() * (-5 - -10) - 10).toFixed(2))
    );

    card.style.transition = "transform 0s";
    card.style.transform = "translate(-" + (50 + arr[0]).toString() + "%, 80%)";

    card.style.transition =
        "transform " +
        duration_in_seconds.toString() +
        "s, rotate " +
        duration_in_seconds.toString() +
        "s";
    card.style.transform =
        "translate(-" +
        (50 + arr[0] * -1).toString() +
        "%, -" +
        (150 + arr[0]).toString() +
        "%)";
    card.style.rotate = (arr[0] * 0.8).toString() + "deg";

    helloText.style.transition =
        "opacity " + ((duration / 1000) * 0.33).toFixed(2).toString() + "s";
    helloText.classList.add("zero-opacity");
}

function bye_bye_hello(duration) {
    hello_wrap = document.querySelector(".hello-intro");
    hello_wrap.style.display = "none";
}

function recorrect_card(duration) {
    duration_in_seconds = (duration / 1000).toFixed(2).toString();
    card = document.querySelector(".card");
    card_childs = document.querySelectorAll(".card *");
    root = document.querySelector(":root");
    helloSection = document.querySelector(".hello-intro");

    helloSection.classList.add("backset");
    // card.classList.add("topset");

    // card.style.transition = "all " + duration_in_seconds + "s";
    // root.style.setProperty("--card-main", "70vw");
    // set_card_main(duration, 70);

    card_childs.forEach((ele) => {
        ele.style.transition = "--card-main " + duration_in_seconds + "s";
        ele.classList.add("expanded");
    });
    card.style.transition =
        "--card-main " +
        duration_in_seconds +
        "s, rotate " +
        duration_in_seconds +
        "s, transform " +
        duration_in_seconds +
        "s";
    card.classList.add("expanded");
    card.style.rotate = "0deg";
    card.style.transform = "translate(-50%, -50%)";

    setTimeout(function () {
        card_childs.forEach((ele) => {
            ele.style.transition = "all 0s";
        });
        card.style.transition = "all 0s";
    }, duration);
}

function set_card_main(duration, vw) {
    card = document.querySelector(".card");
    root = document.querySelector(":root");
    main = document.querySelector("main");

    card.style.transition = "width 0s, height 0s";

    current_main = card.getBoundingClientRect().width;
    new_main = main.getBoundingClientRect().width * (vw / 100);

    for (let i = 0; i < duration; i += 5) {
        setTimeout(function () {
            root.style.setProperty(
                "--card-main",
                (
                    current_main +
                    (i / duration) * (new_main - current_main)
                ).toString() + "px"
            );
        }, i);
    }

    setTimeout(function () {
        root.style.setProperty("--card-main", vw + "vw");
    }, duration);
}

function change_card(selected_card) {
    cards = [
        "intro-card",
        "about-card",
        "like-card",
        "exp-card",
        "contact-card",
    ];

    // GETTING CURRENT CARD
    cards.forEach(function (card_ele) {
        if (
            !document
                .querySelector("." + card_ele)
                .classList.contains("hidden-card")
        ) {
            current_card = card_ele;
        }
    });
    console.log(current_card);
    console.log(selected_card);

    if (!(current_card == selected_card)) {
        current_card = document.querySelector("." + current_card);
        selected_card = document.querySelector("." + selected_card);

        // HIDING CURRENT CARD ITEMS
        total = [];
        children = [];
        function bfs(ele) {
            ele.childNodes.forEach(function (child) {
                children.push(child);
                total.push(child);
            });
            save = children;
            children = [];
            save.forEach(function (child) {
                bfs(child);
            });
        }
        current_card.classList.add("hidden-card");
        bfs(current_card);

        total.reverse();
        console.log(total);

        milli_between = 8;
        sec_transition = 0.5;
        for (let i = 0; i < total.length; i++) {
            ele = total[i];
            item_fade(ele, true, i * milli_between, sec_transition);
        }

        // CALCULATING LENGTH OF PREVIOUS HIDE
        next_delay = total.length * milli_between + sec_transition * 1000;

        setTimeout(function () {
            // IF BOTTOM MENU ISNT SHOWN
            bmenu = document.querySelector(".bottom-menu");
            if (!bmenu.classList.contains("shown")) {
                show_bmenu();
            }

            // SHOWING NEXT CARD
            total = [];
            children = [];
            function bfs(ele) {
                ele.childNodes.forEach(function (child) {
                    children.push(child);
                    total.push(child);
                });
                save = children;
                children = [];
                save.forEach(function (child) {
                    bfs(child);
                });
            }
            selected_card.classList.remove("hidden-card");
            bfs(selected_card);

            milli_between = 8;
            sec_transition = 0.5;
            for (let i = 0; i < total.length; i++) {
                ele = total[i];
                item_fade(ele, false, i * milli_between, sec_transition);
            }
        }, next_delay);
    }
}

function init_hide_cards(duration) {
    cards = ["about-card", "like-card", "exp-card", "contact-card"];

    cards.forEach(function (card_ele) {
        // HIDING CURRENT CARD ITEMS
        total = [];
        children = [];
        function bfs(ele) {
            ele.childNodes.forEach(function (child) {
                children.push(child);
                total.push(child);
            });
            save = children;
            children = [];
            save.forEach(function (child) {
                bfs(child);
            });
        }
        card_ele = document.querySelector("." + card_ele);
        card_ele.classList.add("hidden-card");
        bfs(card_ele);

        total.reverse();

        // for (let i = 0; i < total.length; i++) {
        //     ele = total[i];
        //     item_fade(ele, true, 0, 0);
        // }

        total.forEach(function (ele) {
            item_fade(ele, true, 0, 0);
        });
    });
}

function show_bmenu() {
    bmenu = document.querySelector(".bottom-menu");
    bmenu_items = document.querySelectorAll(
        ".bottom-menu .bottom-list .row-item"
    );

    bmenu.classList.add("shown");

    for (let i = 0; i < bmenu_items.length; i++) {
        bmenu_items[i].style.transition = "transform 0.5s";
        setTimeout(function () {
            bmenu_items[i].style.transform = "translateY(180%)";
        }, (i + 1) * 100);
    }
}

function item_fade(element, fade_out, delay, duration) {
    if (!fade_out) {
        try {
            element.style.visibility = "visible";
        } catch (e) {}
    } else {
        setTimeout(function () {
            try {
                element.style.visibility = "hidden";
            } catch (e) {}
        }, delay + duration * 1000);
    }

    setTimeout(function () {
        try {
            element.style.transition = "opacity " + duration.toString() + "s";
        } catch (e) {}
        if (fade_out) {
            try {
                element.style.opacity = "0%";
            } catch (e) {}
        } else {
            try {
                element.style.opacity = "100%";
            } catch (e) {}
        }
    }, delay);
}

//     if (!(selected_card == card)) {
//         if (!(c.classList.contains("hidden-card"))) {
//             c.classList.add("hidden-card");
//         }
//     } else {
//         c.classList.remove("hidden-card");
//     }

// });
