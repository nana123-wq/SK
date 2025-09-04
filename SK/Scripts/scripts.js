document.addEventListener("DOMContentLoaded", function () {
    // 剧本数据
    const scripts = [
        {
            name: "如故",
            difficulty: "★★★★☆",
            description: "古风情感本，讲述一段跨越时空的爱恨情仇。玩家将体验古代宫廷中的权谋斗争与凄美爱情。",
            players: "6人（3男3女）",
            duration: "4-5小时",
            image: "/img/如故.jpg"
        },
        {
            name: "局",
            difficulty: "★★★★★",
            description: "现代推理本，一场精心设计的谋杀案，每个角色都有不可告人的秘密。需要玩家抽丝剥茧找出真相。",
            players: "5人（3男2女）",
            duration: "5-6小时",
            image: "/img/局.jpg"
        },
        {
            name: "搞钱",
            difficulty: "★★★☆☆",
            description: "欢乐机制本，以商业竞争为背景，玩家需要通过各种手段赚钱，最终成为商业大亨。",
            players: "8人（4男4女）",
            duration: "3-4小时",
            image: "/img/搞钱.jpg"
        },
        {
            name: "年轮",
            difficulty: "★★★★☆",
            description: "硬核推理本，围绕一棵神秘古树展开的离奇命案，时间循环的设定让案件更加扑朔迷离。",
            players: "5人（3男2女）",
            duration: "4-5小时",
            image: "/img/年轮.png"
        },
        {
            name: "酒大奇迹",
            difficulty: "★★☆☆☆",
            description: "欢乐喝酒本，在微醺状态下完成各种任务和挑战，适合朋友聚会轻松娱乐。",
            players: "7-10人（性别不限）",
            duration: "3-4小时",
            image: "/img/酒大奇迹.png"
        },
        {
            name: "死者在幻夜中醒来",
            difficulty: "★★★★★",
            description: "日式硬核推理本，多重叙诡和精妙设计，挑战玩家的推理极限。",
            players: "6-7人（性别不限）",
            duration: "5-7小时",
            image: "/img/幻夜.png"
        },
        {
            name: "刀鞘",
            difficulty: "★★★★☆",
            description: "民国阵营机制本，国共谍战背景，充满策略与欺骗的精彩对决。",
            players: "7人（4男3女）",
            duration: "4-5小时",
            image: "/img/刀鞘.png"
        }
    ];

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentIndex = 0;
    let cards = [];

    // 初始化轮播
    function initCarousel() {
        carouselWrapper.innerHTML = '';

        // 创建剧本卡片
        scripts.forEach((script, index) => {
            const card = document.createElement('div');
            card.className = 'script-card';
            card.innerHTML = `
                <img src="${script.image}" alt="${script.name}">
                <div class="script-info">
                    <h3>${script.name}</h3>
                    <p>难度：${script.difficulty}</p>
                    <p>${script.description}</p>
                    <p>人数：${script.players}</p>
                    <p>时长：${script.duration}</p>
                </div>
            `;
            carouselWrapper.appendChild(card);
            cards.push(card);

            // 点击卡片跳转到详情页
            card.addEventListener('click', () => {
                // 这里可以添加跳转逻辑
                console.log(`跳转到 ${script.name} 详情页`);
            });
        });

        updateCarousel();
    }

    // 更新轮播位置
    function updateCarousel() {
        cards.forEach((card, index) => {
            // 计算相对位置
            let position = (index - currentIndex + scripts.length) % scripts.length;

            // 重置所有卡片类
            card.className = 'script-card';

            // 根据位置设置样式
            if (position === 0) {
                card.classList.add('center');
            } else if (position === 1) {
                card.classList.add('right-1');
            } else if (position === 2) {
                card.classList.add('right-2');
            } else if (position === scripts.length - 1) {
                card.classList.add('left-1');
            } else if (position === scripts.length - 2) {
                card.classList.add('left-2');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // 下一张
    function nextScript() {
        currentIndex = (currentIndex + 1) % scripts.length;
        updateCarousel();
    }

    // 上一张
    function prevScript() {
        currentIndex = (currentIndex - 1 + scripts.length) % scripts.length;
        updateCarousel();
    }

    // 自动轮播
    let autoPlayInterval;
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextScript, 3500);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 事件监听
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopAutoPlay();
        prevScript();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopAutoPlay();
        nextScript();
        startAutoPlay();
    });

    // 鼠标悬停暂停
    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);

    // 触摸事件支持
    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextScript();
        } else if (touchEndX > touchStartX + threshold) {
            prevScript();
        }
    }

    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextScript();
        } else if (e.key === 'ArrowLeft') {
            prevScript();
        }
    });

    // 初始化
    initCarousel();
    startAutoPlay();
});