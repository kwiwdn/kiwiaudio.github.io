// 页面过渡效果
class PageTransition {
  constructor() {
    this.isAnimating = false;
    this.overlay = this.createOverlay();
    this.init();
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    return overlay;
  }

  init() {
    // 监听所有需要过渡效果的链接
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-transition]');
      if (trigger) {
        e.preventDefault();
        if (!this.isAnimating) {
          this.navigate(trigger.href);
        }
      }
    });

    // 处理浏览器前进后退
    window.addEventListener('popstate', () => {
      if (!this.isAnimating) {
        this.navigate(window.location.href, true);
      }
    });
  }

  async navigate(url, isPopState = false) {
    this.isAnimating = true;

    // 开始过渡动画
    this.overlay.classList.add('active');
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      // 加载新页面内容
      if (!isPopState) {
        window.history.pushState({}, '', url);
      }
      window.location.href = url;
    } catch (err) {
      console.error('Navigation failed:', err);
      this.overlay.classList.remove('active');
      this.isAnimating = false;
    }
  }
}

// 初始化页面过渡
window.addEventListener('DOMContentLoaded', () => {
  window.pageTransition = new PageTransition();
}); 