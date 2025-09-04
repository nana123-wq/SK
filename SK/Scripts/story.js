var cards,
    nCards,
    cover,
    openContent,
    openContentText,
    pageIsOpen = false,
    openContentImage,
    closeContent,
    windowWidth,
    windowHeight,
    currentCard;

// 初始化
init();

function init() {
    resize();
    selectElements();
    attachListeners();
}

// 选择DOM元素
function selectElements() {
    cards = document.querySelectorAll("#story .card");
    nCards = cards.length;
    cover = document.getElementById("cover");
    openContent = document.getElementById("open-content");
    openContentText = document.getElementById("open-content-text");
    openContentImage = document.getElementById("open-content-image");
    closeContent = document.getElementById("close-content");
}

// 添加事件监听
function attachListeners() {
    for (var i = 0; i < nCards; i++) {
        attachListenerToCard(i);
    }
    closeContent.addEventListener("click", onCloseClick);
    window.addEventListener("resize", resize);
}

function attachListenerToCard(i) {
    cards[i].addEventListener("click", function (e) {
        e.preventDefault();
        var card = getCardElement(e.target);
        onCardClick(card, i);
    });
}

/* 点击卡片时的处理 */
function onCardClick(card, i) {
    currentCard = card;
    currentCard.classList.add("clicked");
    setTimeout(function () {
        animateCoverUp(currentCard);
    }, 500);
    animateOtherCards(currentCard, true);
    openContent.classList.add("open");
}

function animateCoverUp(card) {
    var cardPosition = card.getBoundingClientRect();
    var cardStyle = getComputedStyle(card);

    setCoverPosition(cardPosition);
    setCoverColor(cardStyle);
    scaleCoverToFillWindow(cardPosition);

    // 根据卡片标题设置不同的内容
    var title = card.querySelector("h1").textContent;
    var content = "";
    switch (title) {
        case "欧式演绎房":
            content = "华丽的水晶吊灯、精美的浮雕立柱与洛可可风格家具，完美复刻18世纪欧洲宫廷的奢华氛围，搭配复古油画与雕花地毯，让玩家瞬间沉浸于贵族社交场景。<br><br><strong>推荐剧本</strong>: 《古堡秘事》《路易十四的晚宴》";
            break;
        case "新中式房":
            content = "以红木榫卯家具为主体，搭配水墨山水屏风与青瓷摆件，融入现代极简设计元素。墙面悬挂苏绣卷轴，地面铺设青砖拼花，营造出‘移步易景’的东方美学意境。<br><br><strong>推荐剧本</strong>: 《兰亭序密码》《故宫里的幽灵》";
            break;
        case "民国演绎房":
            content = "留声机里流淌着老上海爵士乐，青砖地面搭配实木八仙桌，墙上挂着泛黄的月份牌广告。老式皮箱、铜制台灯与旗袍衣架，还原1930年代十里洋场的市井风情。<br><br><strong>推荐剧本</strong>: 《上海滩风云》《夜上海1937》";
            break;
        case "田园主题房":
            content = "原木色家具搭配碎花布艺沙发，墙面装饰手绘田园风光壁画，窗台摆放多肉植物与藤编花篮。暖黄色灯光与木质地板营造出温馨自然的乡村氛围，适合家庭主题剧本体验。<br><br><strong>推荐剧本</strong>: 《丰收的季节》《农场里的秘密》";
            break;
    }

    openContentText.innerHTML = content;
    openContentImage.src = card.querySelector("img").src;

    setTimeout(function () {
        window.scroll(0, 0);
        pageIsOpen = true;
    }, 300);
}

function animateCoverBack(card) {
    var cardPosition = card.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
    cover.style.transform = "scaleX(1) scaleY(1) translate3d(0, 0, 0)";
    setTimeout(function () {
        openContentText.innerHTML = "";
        openContentImage.src = "";
        cover.style.width = "0px";
        cover.style.height = "0px";
        pageIsOpen = false;
        currentCard.classList.remove("clicked");
    }, 301);
}

function setCoverPosition(cardPosition) {
    cover.style.left = cardPosition.left + "px";
    cover.style.top = cardPosition.top + "px";
    cover.style.width = cardPosition.width + "px";
    cover.style.height = cardPosition.height + "px";
}

function setCoverColor(cardStyle) {
    cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
    var scaleX = windowWidth / cardPosition.width;
    var scaleY = windowHeight / cardPosition.height;
    var offsetX =
        (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
    var offsetY =
        (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
    cover.style.transform =
        "scaleX(" +
        scaleX +
        ") scaleY(" +
        scaleY +
        ") translate3d(" +
        offsetX +
        "px, " +
        offsetY +
        "px, 0px)";
}

function onCloseClick(e) {
    e.preventDefault();
    e.stopPropagation();

    openContent.classList.remove("open");

    animateCoverBack(currentCard);
    animateOtherCards(currentCard, false);

    setTimeout(function () {
        window.scrollTo({
            top: document.getElementById("story").offsetTop,
            behavior: "smooth"
        });
    }, 300);
}

function animateOtherCards(card, out) {
    var delay = 100;
    for (var i = 0; i < nCards; i++) {
        if (cards[i] === card) continue;
        if (out) animateOutCard(cards[i], delay);
        else animateInCard(cards[i], delay);
        delay += 100;
    }
}

function animateOutCard(card, delay) {
    setTimeout(function () {
        card.classList.add("out");
    }, delay);
}

function animateInCard(card, delay) {
    setTimeout(function () {
        card.classList.remove("out");
    }, delay);
}

function getCardElement(el) {
    while (el && !el.classList.contains("card")) {
        el = el.parentElement;
    }
    return el;
}

function resize() {
    if (pageIsOpen) {
        var cardPosition = currentCard.getBoundingClientRect();
        setCoverPosition(cardPosition);
        scaleCoverToFillWindow(cardPosition);
    }
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

// 添加ESC键关闭功能
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && pageIsOpen) {
        onCloseClick(e);
    }
});

// 添加点击背景关闭功能
openContent.addEventListener("click", function (e) {
    if (e.target === openContent) {
        onCloseClick(e);
    }
});
