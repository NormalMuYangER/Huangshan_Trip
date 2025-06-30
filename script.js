document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && 
        (linkPath === currentPath || 
         (currentPath === 'index.html' && linkPath === '.') ||
         (currentPath === '' && linkPath === 'index.html'))) {
      link.classList.add('active');
    }
  });
});

// 检测移动设备和横竖屏
function checkOrientation() {
    const tip = document.getElementById('landscapeTip');
    if (!tip) return;
    
    // 检测是否为移动设备且竖屏
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    
    tip.style.display = (isMobile && isPortrait) ? 'block' : 'none';
}

// 页面加载和屏幕旋转时都检测
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

document.querySelector('.close-tip').addEventListener('click', function() {
    document.getElementById('landscapeTip').style.display = 'none';
    
    // 可选：设置cookie/localStorage记住用户选择
    localStorage.setItem('hideLandscapeTip', 'true');
});

// 在checkOrientation函数中添加
if (localStorage.getItem('hideLandscapeTip') === 'true') {
    document.getElementById('landscapeTip').style.display = 'none';
}
