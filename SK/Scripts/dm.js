/**
 * DM 模块轮播逻辑
 * 包含数据定义、卡片生成、轮播交互等功能
 */
document.addEventListener("DOMContentLoaded", function () {
    // DM 数据（可根据实际需求扩展字段或从接口动态获取）
    const dms = [
        {
            name: "推理大师小宇",
            popularity: "★★★★☆",
            description: "擅长硬核推理本，曾带《死者在幻夜中醒来》，逻辑清晰，引导玩家沉浸式推理。",
            skill: "快速梳理复杂线索，还原案件细节；擅长调节推理氛围，新手友好",
            image: "/img/dm1.jpg"
        },
        {
            name: "情感本达人阿悦",
            popularity: "★★★★★",
            description: "主打古风情感本，带《如故》时感染力极强，让玩家共情角色爱恨情仇。",
            skill: "细腻解读角色情感，精准带动情绪；可根据玩家状态调整剧情节奏",
            image: "/img/dm2.jpg"
        },
        {
            name: "欢乐本搞怪阿凯",
            popularity: "★★★☆☆",
            description: "欢乐机制本首选，带《搞钱》全程爆笑，把控欢乐节奏一流。",
            skill: "自带搞笑 buff，活跃气氛；擅长设计趣味小游戏，增强互动",
            image: "/img/dm3.jpg"
        },
        {
            name: "民国本专家小周",
            popularity: "★★★★☆",
            description: "民国阵营本《刀鞘》带本经验丰富，还原谍战氛围，策略讲解清晰。",
            skill: "熟悉民国历史，补充背景故事；引导玩家阵营博弈，提升对抗性",
            image: "/img/dm4.jpg"
        },
        {
            name: "喝酒本女王小萌",
            popularity: "★★☆☆☆",
            description: "《酒大奇迹》专属 DM，把控喝酒节奏，让玩家微醺又不醉。",
            skill: "调酒小能手，搭配特色酒品；组织酒局小游戏，活跃聚会氛围",
            image: "/img/dm5.jpg"
        },
        {
            name: "硬核本新秀小泽",
            popularity: "★★★★☆",
            description: "新兴硬核推理 DM，带《局》时逻辑严谨，引导玩家破解复杂凶案。",
            skill: "创新推理思路，提供新视角；用思维导图辅助玩家梳理案件",
            image: "/img/dm6.jpg"
        },
        {
            name: "恐怖本女王阿琳",
            popularity: "★★★★☆",
            description: "专注恐怖沉浸本，带《纸妻》时氛围营造极强，让玩家体验毛骨悚然的感觉。",
            skill: "灯光音效设计专家；擅长扮演恐怖NPC，增强代入感",
            image: "/img/dm7.jpg"
        }
    ];

    // DOM 元素获取
    const dmCarouselWrapper = document.querySelector('#dm-carousel .carousel-wrapper');
    const dmPrevBtn = document.getElementById('dmCarouselPrev');
    const dmNextBtn = document.getElementById('dmCarouselNext');
    let dmCurrentIndex = 0;      // 当前轮播索引
    let dmCards = [];            // 存储所有 DM 卡片 DOM 元素

    /**
     * 初始化 DM 轮播
     * 1. 清空容器
     * 2. 遍历数据生成卡片
     * 3. 绑定点击事件
     * 4. 更新轮播样式
     */
    function initDmCarousel() {
        dmCarouselWrapper.innerHTML = ''; // 清空现有内容

        dms.forEach((dm, index) => {
            // 创建卡片 DOM
            const card = document.createElement('div');
            card.className = 'script-card'; // 复用剧本卡片基础样式，可根据需求调整
            card.innerHTML = `
                <img src="${dm.image}" alt="${dm.name}">
                <div class="script-info">
                    <h3>${dm.name}</h3>
                    <p>人气值：${dm.popularity}</p>
                    <p>擅长领域：${dm.description}</p>
                    <p>个人技能：${dm.skill}</p>
                </div>
            `;
            dmCarouselWrapper.appendChild(card);
            dmCards.push(card);

            // 卡片点击事件（可扩展为跳转到详情页）
            card.addEventListener('click', () => {
                console.log(`触发 ${dm.name} 详情页跳转逻辑`);
                // 实际项目中可替换为：window.location.href = `dm-detail.html?id=${dm.id}`;
            });
        });

        updateDmCarousel(); // 初始化轮播位置样式
    }

    /**
     * 更新轮播位置样式
     * 根据当前索引计算卡片位置，添加对应样式类
     */
    function updateDmCarousel() {
        dmCards.forEach((card, index) => {
            // 计算相对位置（处理循环逻辑）
            const position = (index - dmCurrentIndex + dms.length) % dms.length;

            // 重置基础样式
            card.className = 'script-card';

            // 根据位置添加定位样式（与剧本模块逻辑一致，确保交互统一）
            if (position === 0) {
                card.classList.add('center');
            } else if (position === 1) {
                card.classList.add('right-1');
            } else if (position === 2) {
                card.classList.add('right-2');
            } else if (position === dms.length - 1) {
                card.classList.add('left-1');
            } else if (position === dms.length - 2) {
                card.classList.add('left-2');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    /**
     * 切换到下一个 DM
     * 索引 +1 后取模，保证循环
     */
    function nextDm() {
        dmCurrentIndex = (dmCurrentIndex + 1) % dms.length;
        updateDmCarousel();
    }

    /**
     * 切换到上一个 DM
     * 索引 -1 后处理负数，保证循环
     */
    function prevDm() {
        dmCurrentIndex = (dmCurrentIndex - 1 + dms.length) % dms.length;
        updateDmCarousel();
    }

    // ================ 自动播放逻辑 ================
    let dmAutoPlayInterval; // 自动播放定时器

    /**
     * 启动自动播放
     * 先清除旧定时器，再设置新定时器
     */
    function startDmAutoPlay() {
        stopDmAutoPlay(); // 防止重复启动
        dmAutoPlayInterval = setInterval(nextDm, 3500); // 3.5 秒切换一次
    }

    /**
     * 停止自动播放
     * 清除定时器
     */
    function stopDmAutoPlay() {
        clearInterval(dmAutoPlayInterval);
    }

    // ================ 事件绑定 ================
    /**
     * 上一页按钮点击事件
     * 停止自动播放 → 切换上一页 → 重新启动自动播放
     */
    dmPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡（避免触发父元素逻辑）
        stopDmAutoPlay();
        prevDm();
        startDmAutoPlay();
    });

    /**
     * 下一页按钮点击事件
     * 停止自动播放 → 切换下一页 → 重新启动自动播放
     */
    dmNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopDmAutoPlay();
        nextDm();
        startDmAutoPlay();
    });

    /**
     * 鼠标悬停轮播容器事件
     * 悬停时停止自动播放
     */
    dmCarouselWrapper.addEventListener('mouseenter', stopDmAutoPlay);

    /**
     * 鼠标离开轮播容器事件
     * 离开时重新启动自动播放
     */
    dmCarouselWrapper.addEventListener('mouseleave', startDmAutoPlay);

    // ================ 触摸事件支持（移动端） ================
    let dmTouchStartX = 0; // 触摸起始 X 坐标
    let dmTouchEndX = 0;   // 触摸结束 X 坐标

    /**
     * 触摸开始事件
     * 记录起始坐标，停止自动播放
     */
    dmCarouselWrapper.addEventListener('touchstart', (e) => {
        dmTouchStartX = e.changedTouches[0].screenX;
        stopDmAutoPlay();
    }, { passive: true });

    /**
     * 触摸结束事件
     * 计算滑动距离，判断切换方向
     */
    dmCarouselWrapper.addEventListener('touchend', (e) => {
        dmTouchEndX = e.changedTouches[0].screenX;
        handleDmSwipe(); // 处理滑动逻辑
        startDmAutoPlay(); // 重新启动自动播放
    }, { passive: true });

    /**
     * 处理触摸滑动逻辑
     * 滑动距离超过阈值（50px）时切换上/下一页
     */
    function handleDmSwipe() {
        const threshold = 50; // 滑动阈值（可根据需求调整）
        if (dmTouchEndX < dmTouchStartX - threshold) {
            nextDm(); // 左滑 → 下一页
        } else if (dmTouchEndX > dmTouchStartX + threshold) {
            prevDm(); // 右滑 → 上一页
        }
    }

    // ================ 键盘导航支持 ================
    /**
     * 键盘按键事件
     * 监听方向键，切换上/下一页
     */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextDm(); // 右箭头 → 下一页
        } else if (e.key === 'ArrowLeft') {
            prevDm(); // 左箭头 → 上一页
        }
    });

    // ================ 初始化执行 ================
    initDmCarousel(); // 初始化卡片和轮播
    startDmAutoPlay(); // 启动自动播放
});