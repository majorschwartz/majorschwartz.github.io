document.addEventListener("DOMContentLoaded", function () {
    timing_handler([
        { func: define_vars, delay: 0, duration: 0 },
        { func: add_event_listeners, delay: 0, duration: 0 },
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
    console.log(
        "-----\n\n" + func.toString() + "() end of function met.\n\n-----"
    );
}

function define_vars() {
    root = document.querySelector(":root");
    card = document.querySelector(".card");
    bmenu = document.querySelector(".bottom-menu");
    helloText = document.querySelector(".hello-text");
    helloSection = document.querySelector(".hello-intro");
    progress = document.querySelector(".progress-bar");
    progressBar = document.querySelector(".progress-bar .bar");
    progressText = document.querySelector(".progress-bar .bar .text");
    email = document.querySelector(".contact-email");
    copyAni = document.querySelector(".copy-ani");
    cursorWrap = document.querySelector(".copy-ani .cursor-wrapper");

    clog("define_vars");
}

function add_event_listeners() {
    email_btn = document.querySelector("#copy-contact-email");
    email_btn.addEventListener("click", function (event) {
        email_text = document.querySelector(".contact-email");
        try {
            navigator.clipboard.writeText("me@majorschwartz.com");
        } catch (e) { console.log("clipboard.writeText() failure, trying document.execCommand().") }
        range = document.createRange();
        range.selectNode(email_text);
        window.getSelection().addRange(range);

        try {
            success = document.execCommand("copy");
            msg = success ? "successful" : "unsuccessful";
            console.log("Copy " + msg + ".");
        } catch (err) {
            console.log("Copy failure.");
        }

        window.getSelection().removeAllRanges();
    });
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
    card.style.transform =
        "translate(-" + (50 + arr[0]).toString() + "%, 80%) scale(0.5)";

    card.style.transition = "transform " + duration_in_seconds.toString() + "s";

    card.style.transform =
        "translate(-" +
        (50 + arr[0] * -1).toString() +
        "%, -" +
        (100 + arr[0]).toString() +
        "%) scale(0.5) rotate(" +
        (arr[0] * 0.8).toString() +
        "deg";

    helloText.style.transition =
        "opacity " +
        (((duration - 1000) / 1000) * 0.33).toFixed(2).toString() +
        "s";
    helloText.classList.add("zero-opacity");

    setTimeout(function () {
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

    card.style.transition = "transform " + duration_in_seconds + "s";

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
        bfs(current_card);

        total.reverse();

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

            // HIDE PREVIOUS CARD
            current_card.classList.add("hidden-card");

            // SHOWING NEXT CARD
            selected_card.classList.remove("hidden-card");

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

function copy_email() {
    if (copyAni.classList.contains("active")) {
        return false;
    }

    copyAni.classList.add("active");

    emailText = "me@majorschwartz.com";

    refresh_ele(document.querySelector("#poof"));
    copyAni.classList.remove("hidden");

    setTimeout(function () {
        copyAni.classList.add("swing-copy");
        cursorWrap.classList.add("swing-copy");
    }, 300);

    setTimeout(function () {
        document.querySelector("#cursor").src = "/files/cursors/ibeam.png";

        // for (let i = 0; i <= emailText.length; i++) {
        //     setTimeout(function() {
        //         if (window.getSelection) {
        //             selection = window.getSelection();
        //             range = document.createRange();

        //             range.setStart(email.firstChild, 0);
        //             range.setEnd(email.firstChild, i);

        //             selection.removeAllRanges();
        //             selection.addRange(range);
        //         }
        //     }, i * 27);
        // }

        select_text();
    }, 700);

    setTimeout(function () {
        document.querySelector("#cursor").src = "/files/cursors/default.png";
    }, 700 + emailText.length * 27);

    setTimeout(function () {
        document.querySelector(".keys").classList.remove("zero-opacity");
        copyAni.classList.add("click");
        cursorWrap.classList.add("click");
        setTimeout(function () {
            document.querySelector("#cursor").src =
                "/files/cursors/pointer.png";
        }, 600);
        setTimeout(function () {
            click_and_close();
        }, 1000);
    }, 1000 + emailText.length * 24);
}

function select_text() {
    ele = document.querySelector(".contact-email");
    text = ele.innerText || ele.textContent;

    range = document.createRange();
    selection = window.getSelection();
    range.selectNodeContents(ele);

    let currentIndex = 0;

    function selectNextLetter() {
        if (currentIndex < text.length) {
            range.setStart(ele.firstChild, 0);
            range.setEnd(ele.firstChild, currentIndex + 1);
            selection.removeAllRanges();
            selection.addRange(range);

            currentIndex++;
            setTimeout(selectNextLetter, 22);
        }
    }
    selectNextLetter();
}

function click_and_close() {
    document.querySelector(".keys").classList.add("pressed");

    window.getSelection().removeAllRanges();

    setTimeout(function () {
        copyAni.classList.add("zero-opacity");
    });

    setTimeout(function () {
        document.querySelector(".keys").classList.add("zero-opacity");
        copyAni.classList.remove("click");
        cursorWrap.classList.remove("click");
        copyAni.classList.remove("swing-copy");
        cursorWrap.classList.remove("swing-copy");

        copyAni.classList.add("hidden");
        copyAni.classList.remove("zero-opacity");
    }, 600);

    setTimeout(function () {
        document.querySelector(".keys").classList.remove("pressed");
        document.querySelector("#cursor").src = "/files/cursors/default.png";
        copyAni.classList.remove("active");
    }, 800);
}

function refresh_ele(ele) {
    return (ele.src = ele.src.split("?")[0] + "?=" + +new Date());
}