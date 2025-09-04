document.addEventListener("DOMContentLoaded", function () {
    // 角色数据
    const characters = [
        {
            name: "奥菲莉亚",
            description:
                "圣女骑士，以信仰之火照亮人们的道路。来自寒冷的弗莱姆格雷斯，肩负着完成圣火仪式的使命。",
            image: "char-image1",
        },
        {
            name: "赛勒斯",
            description:
                "学者，追寻知识的真理与智慧。来自阿特拉斯达姆王立学院的博学者，为解开古老的谜题而踏上旅程。",
            image: "char-image2",
        },
        {
            name: "特蕾莎",
            description:
                "商人，追寻财富与冒险的年轻女孩。来自海边小镇兰布尔的商人学徒，梦想成为一名优秀的商人。",
            image: "char-image3",
        },
        {
            name: "奥尔贝克",
            description:
                "剑士，寻找重拾剑之意义的骑士。曾是王国最强骑士，如今为寻找新的人生意义而战。",
            image: "char-image4",
        },
        {
            name: "普莉姆萝洁",
            description:
                "舞者，为复仇而起舞的贵族之女。在黑暗中寻找杀害父亲的凶手，用舞蹈掩饰内心的痛苦。",
            image: "char-image5",
        },
        {
            name: "阿尔芬",
            description:
                "药剂师，治愈他人伤痛的温柔青年。来自清澈溪流镇的年轻药剂师，立志帮助所有需要帮助的人。",
            image: "char-image6",
        },
        {
            name: "提利昂",
            description:
                "盗贼，带着秘密的孤独窃贼。精通偷盗技巧的神秘人，背负着不为人知的过去。",
            image: "char-image7",
        },
        {
            name: "海茵特",
            description:
                "猎人，追寻导师足迹的森林守护者。来自雪域之森的女猎人，为寻找失踪的导师而展开冒险。",
            image: "char-image8",
        },
    ];

    const container = document.getElementById("character-container");
    const images = container.getElementsByTagName("img");
    const indicators = container.querySelectorAll(".indicator");
    const prevBtn = document.getElementById("charPrevBtn");
    const nextBtn = document.getElementById("charNextBtn");
    const charName = document.getElementById("char-name");
    const charDescription = document.getElementById("char-description");

    let currentIndex = 0;
    let intervalId = null;

    // 初始化显示
    function initializeSlider() {
        // 显示第一个角色
        showCharacter(0);
        startAutoSlide();
    }

    // 切换到指定角色
    function showCharacter(index) {
        // 更新图片
        for (let i = 0; i < images.length; i++) {
            if (i === index) {
                images[i].classList.add("active");
            } else {
                images[i].classList.remove("active");
            }
        }

        // 更新指示器
        for (let i = 0; i < indicators.length; i++) {
            if (i === index) {
                indicators[i].classList.add("active");
            } else {
                indicators[i].classList.remove("active");
            }
        }

        // 更新角色信息
        charName.textContent = characters[index].name;
        charDescription.textContent = characters[index].description;

        // 更新当前索引
        currentIndex = index;
    }

    // 显示下一个角色
    function showNext() {
        let nextIndex = (currentIndex + 1) % images.length;
        showCharacter(nextIndex);
    }

    // 显示上一个角色
    function showPrev() {
        let prevIndex = (currentIndex - 1 + images.length) % images.length;
        showCharacter(prevIndex);
    }

    // 自动轮播
    function startAutoSlide() {
        if (intervalId === null) {
            intervalId = setInterval(showNext, 4000);
        }
    }

    // 停止自动轮播
    function stopAutoSlide() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // 绑定按钮事件
    prevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        stopAutoSlide();
        showPrev();
        startAutoSlide();
    });

    nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        stopAutoSlide();
        showNext();
        startAutoSlide();
    });

    // 绑定指示器点击事件
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", function () {
            stopAutoSlide();
            showCharacter(i);
            startAutoSlide();
        });
    }

    // 鼠标悬停暂停
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);

    // 初始化
    initializeSlider();
});
