document.addEventListener('DOMContentLoaded', function() {
  const floatNav = document.getElementById('floatNav');
  const navHeader = floatNav.querySelector('.nav-header');
  const kiwiImage = floatNav.querySelector('.kiwi-bird');
  
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  // 初始化拖拽
  navHeader.style.cursor = 'grab';
  
  // 开始拖动
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    // 获取鼠标初始位置
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // 更改光标样式和添加拖拽类
    navHeader.style.cursor = 'grabbing';
    floatNav.classList.add('dragging');
    
    // 添加移动和停止事件监听
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  
  // 拖动过程
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    // 计算新位置
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // 获取新的top和left值
    let newTop = floatNav.offsetTop - pos2;
    let newLeft = floatNav.offsetLeft - pos1;
    
    // 限制在窗口范围内
    const maxX = window.innerWidth - floatNav.offsetWidth;
    const maxY = window.innerHeight - floatNav.offsetHeight;
    
    newTop = Math.min(Math.max(0, newTop), maxY);
    newLeft = Math.min(Math.max(0, newLeft), maxX);
    
    // 设置新位置
    floatNav.style.top = newTop + "px";
    floatNav.style.left = newLeft + "px";
    floatNav.style.right = 'auto';
    floatNav.style.bottom = 'auto';
  }
  
  // 停止拖动
  function closeDragElement() {
    navHeader.style.cursor = 'grab';
    floatNav.classList.remove('dragging');
    document.onmouseup = null;
    document.onmousemove = null;
    
    // 保存位置
    localStorage.setItem('floatNavPosition', JSON.stringify({
      top: floatNav.style.top,
      left: floatNav.style.left
    }));
  }
  
  // 触摸事件处理
  function handleTouchStart(e) {
    floatNav.classList.add('dragging');
    const touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;
  }
  
  function handleTouchMove(e) {
    e.preventDefault();
    if (!e.touches.length) return;
    
    const touch = e.touches[0];
    
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    
    let newTop = floatNav.offsetTop - pos2;
    let newLeft = floatNav.offsetLeft - pos1;
    
    const maxX = window.innerWidth - floatNav.offsetWidth;
    const maxY = window.innerHeight - floatNav.offsetHeight;
    
    newTop = Math.min(Math.max(0, newTop), maxY);
    newLeft = Math.min(Math.max(0, newLeft), maxX);
    
    floatNav.style.top = newTop + "px";
    floatNav.style.left = newLeft + "px";
    floatNav.style.right = 'auto';
    floatNav.style.bottom = 'auto';
  }
  
  function handleTouchEnd() {
    floatNav.classList.remove('dragging');
    localStorage.setItem('floatNavPosition', JSON.stringify({
      top: floatNav.style.top,
      left: floatNav.style.left
    }));
  }
  
  // 添加事件监听
  navHeader.onmousedown = dragMouseDown;
  navHeader.addEventListener('touchstart', handleTouchStart, { passive: false });
  navHeader.addEventListener('touchmove', handleTouchMove, { passive: false });
  navHeader.addEventListener('touchend', handleTouchEnd);
  
  // 恢复保存的位置
  const savedPosition = localStorage.getItem('floatNavPosition');
  if (savedPosition) {
    try {
      const { top, left } = JSON.parse(savedPosition);
      floatNav.style.top = top;
      floatNav.style.left = left;
      floatNav.style.right = 'auto';
      floatNav.style.bottom = 'auto';
    } catch (e) {
      console.error('Error restoring position:', e);
    }
  } else {
    // 如果没有保存的位置，设置默认位置
    floatNav.style.right = '30px';
    floatNav.style.top = '20%';
  }
  
  // 窗口大小改变时调整位置
  window.addEventListener('resize', function() {
    const maxX = window.innerWidth - floatNav.offsetWidth;
    const maxY = window.innerHeight - floatNav.offsetHeight;
    
    let currentLeft = parseInt(floatNav.style.left);
    let currentTop = parseInt(floatNav.style.top);
    
    if (currentLeft > maxX) {
      floatNav.style.left = maxX + 'px';
    }
    if (currentTop > maxY) {
      floatNav.style.top = maxY + 'px';
    }
  });
  
  // 点击效果
  if (kiwiImage) {
    let isAnimating = false;
    kiwiImage.addEventListener('click', function() {
      if (isAnimating) return;
      isAnimating = true;
      floatNav.classList.add('clicking');
      kiwiImage.style.transform = 'rotate(-5deg) scale(1.1)';
      
      setTimeout(() => {
        kiwiImage.style.transform = '';
        floatNav.classList.remove('clicking');
        isAnimating = false;
      }, 200);
    });
  }
}); 