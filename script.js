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

// 选集点击效果
document.querySelectorAll('.episode-item').forEach(item => {
    item.addEventListener('click', function() {
        // 如果是当前集数则不处理
        if(this.classList.contains('active')) return;
        
        // 移除所有active类
        document.querySelectorAll('.episode-item').forEach(el => {
            el.classList.remove('active');
        });
        
        // 给当前点击项添加active类
        this.classList.add('active');
        
        // 获取集数
        const episodeNum = this.querySelector('.episode-number').textContent;
        
        // 根据集数切换内容
        switch(episodeNum) {
            case '01':
                document.querySelector('video source').src = '黄山行（1）.mp4';
                document.querySelector('video').poster = '黄山行（1）-封面.jpg';
                document.querySelector('.video-title').textContent = 'EP01 - 初来乍到';
                document.querySelector('.video-desc').textContent = '这期内容比较短，之后可能就长点了……（可前往"精彩图片"查看更多）';
                break;
            case '02':
                document.querySelector('video source').src = '敬请期待.mp4';
                document.querySelector('video').poster = '敬请期待-封面.jpg';
                document.querySelector('.video-title').textContent = 'EP02 - 采茶体验';
                document.querySelector('.video-desc').textContent = '记录同学们体验采茶的精彩过程！';
                break;
        }
        
        // 重新加载视频
        const video = document.querySelector('video');
        video.load();
        video.play().catch(e => console.log('自动播放被阻止:', e));
    });
});


// 关闭横屏提示
document.querySelector('.close-tip').addEventListener('click', function() {
    document.getElementById('landscapeTip').style.display = 'none';
});
