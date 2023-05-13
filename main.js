document.addEventListener("DOMContentLoaded", function () {
    timing_handler([
        { func: define_vars, delay: 0, duration: 0 },
        { func: init_hide_cards, delay: 0, duration: 0 },
        { func: hello_sequence, delay: 700, duration: 1200 },
        { func: reveal_card, delay: 2200, duration: 1700 },
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

function clog(func) {
    console.log("-----\n\n" + func.toString() + "() end of function met.\n\n-----");
}

function define_vars() {
    root          = document.querySelector(":root");
    card          = document.querySelector(".card");
    bmenu         = document.querySelector(".bottom-menu");
    helloText     = document.querySelector(".hello-text");
    helloSection  = document.querySelector(".hello-intro");
    progress      = document.querySelector(".progress-bar");
    progressBar   = document.querySelector(".progress-bar .bar");
    progressText  = document.querySelector(".progress-bar .bar .text");

    clog("define_vars");
}

function hello_sequence(duration) {
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

    clog("hello_sequence");
}

function reveal_card(duration) {
    duration_in_seconds = ((duration - 1000) / 1000).toFixed(2);

    arr = Array.from({ length: 2 }, () =>
        parseFloat((Math.random() * (-5 - -10) - 10).toFixed(2))
    );

    card.style.transition = "transform 0s";
    card.style.transform = "translate(-" + (50 + arr[0]).toString() + "%, 80%) scale(0.5)";

    card.style.transition =
        "transform " +
        duration_in_seconds.toString() +
        "s";
    
    card.style.transform =
        "translate(-" +
        (50 + arr[0] * -1).toString() +
        "%, -" +
        (100 + arr[0]).toString() +
        "%) scale(0.5) rotate(" +
        (arr[0] * 0.8).toString() +
        "deg";

    helloText.style.transition =
        "opacity " + (((duration - 1000) / 1000) * 0.33).toFixed(2).toString() + "s";
    helloText.classList.add("zero-opacity");

    setTimeout(function() {
        recorrect_card(1000);
    }, (duration - 1000) * 0.8);

    clog("reveal_card");
}

function bye_bye_hello(duration) {
    helloSection.style.display = "none";

    clog("bye_bye_hello");
}

function recorrect_card(duration) {
    duration_in_seconds = (duration / 1000).toFixed(2).toString();

    helloSection.classList.add("backset");
    progress.classList.add("backset");

    card.classList.add("topset");

    card.style.transition =
        "transform " +
        duration_in_seconds +
        "s";
    
    card.classList.add("center-set");

    setTimeout(function () {
        card.style.transition = "all 0s";
    }, duration);

    clog("recorrect_card");
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

    clog("change_card");
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

    clog("init_hide_cards");
}

function show_bmenu() {
    bmenu_items = document.querySelectorAll(
        ".bottom-menu .bottom-list .row-item"
    );

    bmenu.classList.add("shown");

    for (let i = 0; i < bmenu_items.length; i++) {
        bmenu_items[i].style.transition = "transform 0.5s";
        setTimeout(function () {
            bmenu_items[i].style.transform = "translateY(220%)";
        }, (i + 1) * 100);
    }

    clog("show_bmenu");
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

    clog("item_fade");
}