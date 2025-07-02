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
// 修改为B站视频切换逻辑
const bilibiliVideos = {
    "01": {
        bvid: "BV1cfgSzpEvA", // 替换为第一集的BV号
        title: "EP01 - 初来乍到",
        desc: "这期内容比较短，之后可能就长点了……（可前往“精彩图片”查看更多）"
    },
    "02": {
        bvid: "BV1vY3WzMEAj", // 替换为第二集的BV号
        title: "EP02 - 采茶体验",
        desc: "记录同学们体验采茶的精彩过程！"
    }
};

// 选集点击事件
document.querySelectorAll('.episode-item').forEach(item => {
    item.addEventListener('click', function() {
        //检查是否有“即将上线”标记
        if (this.querySelector('.badge')) {
          this.classList.add('clicked');
          alert("这集内容正在制作中，敬请期待！");
          setTimeout(() => this.classList.remove('clicked'), 1000);
          return;
        }

        if(this.classList.contains('active')) return;
        
        // 更新active状态
        document.querySelectorAll('.episode-item').forEach(el => {
            el.classList.remove('active');
        });
        this.classList.add('active');
        
        // 获取集数
        const episodeNum = this.querySelector('.episode-number').textContent;
        const videoData = bilibiliVideos[episodeNum];
        
        // 更新iframe的src
        const iframe = document.querySelector('.bilibili-video');
        iframe.src = `//player.bilibili.com/player.html?bvid=${videoData.bvid}&page=1`;
        
        // 更新标题和描述
        document.querySelector('.video-title').textContent = videoData.title;
        document.querySelector('.video-desc').textContent = videoData.desc;
    });
});



// 关闭横屏提示
document.querySelector('.close-tip').addEventListener('click', function() {
    document.getElementById('landscapeTip').style.display = 'none';
});
