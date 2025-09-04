document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const images = container.getElementsByTagName("img");
  const indicators = container.getElementsByClassName("indicator");
  const prevBtn = container.querySelector(".prev-btn");
  const nextBtn = container.querySelector(".next-btn");
  let currentIndex = 0;
  let intervalId = null;

  // 初始化显示
  function initializeSlider() {
    images[0].classList.add("active");
    startAutoSlide();
  }

  // 切换到指定图片
  function showImage(index) {
    // 移除所有active类
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove("active");
      indicators[i].classList.remove("active");
    }

    // 显示目标图片
    images[index].classList.add("active");
    indicators[index].classList.add("active");
  }

  // 显示下一张图片
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // 显示上一张图片
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // 开始自动轮播
  function startAutoSlide() {
    if (intervalId === null) {
      intervalId = setInterval(showNextImage, 3000);
    }
  }

  // 停止自动轮播
  function stopAutoSlide() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // 绑定事件
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showPrevImage();
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showNextImage();
  });

  // 指示器点击事件
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener("click", function () {
      currentIndex = i;
      showImage(currentIndex);
    });
  }

  // 鼠标悬停暂停
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);

  // 初始化
  initializeSlider();

  // 添加新闻导航交互
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((nav) => nav.classList.remove("nav-item-active"));
      this.classList.add("nav-item-active");
    });
  });
});
