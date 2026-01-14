import PptxGenJS from 'pptxgenjs';

const PRIMARY_COLOR = 'D4A853';
const BG_COLOR = '0A0A0B';
const TEXT_COLOR = 'FFFFFF';
const MUTED_COLOR = 'A1A1AA';

// 取消控制器
let abortController: AbortController | null = null;

// 创建非阻塞进度提示UI（右下角浮动）
const createProgressUI = () => {
  const existing = document.getElementById('ppt-progress-toast');
  if (existing) existing.remove();

  abortController = new AbortController();

  const toast = document.createElement('div');
  toast.id = 'ppt-progress-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #1a1a1b;
    border-radius: 12px;
    padding: 16px 20px;
    border: 1px solid #333;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    z-index: 99999;
    min-width: 280px;
    max-width: 320px;
    animation: slideIn 0.3s ease;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  `;

  const title = document.createElement('div');
  title.style.cssText = `
    color: #D4A853;
    font-size: 14px;
    font-weight: bold;
  `;
  title.textContent = '正在生成PPT';

  const cancelBtn = document.createElement('button');
  cancelBtn.id = 'ppt-cancel-btn';
  cancelBtn.style.cssText = `
    background: transparent;
    border: 1px solid #555;
    color: #a1a1aa;
    padding: 4px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;
  `;
  cancelBtn.textContent = '取消';
  cancelBtn.onmouseenter = () => {
    cancelBtn.style.borderColor = '#D4A853';
    cancelBtn.style.color = '#D4A853';
  };
  cancelBtn.onmouseleave = () => {
    cancelBtn.style.borderColor = '#555';
    cancelBtn.style.color = '#a1a1aa';
  };
  cancelBtn.onclick = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  header.appendChild(title);
  header.appendChild(cancelBtn);

  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    width: 100%;
    height: 6px;
    background: #333;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 8px;
  `;

  const progressFill = document.createElement('div');
  progressFill.id = 'ppt-progress-fill';
  progressFill.style.cssText = `
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #D4A853, #f0d78c);
    border-radius: 3px;
    transition: width 0.2s ease;
  `;
  progressBar.appendChild(progressFill);

  const footer = document.createElement('div');
  footer.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const progressText = document.createElement('div');
  progressText.id = 'ppt-progress-text';
  progressText.style.cssText = `
    color: #a1a1aa;
    font-size: 12px;
  `;
  progressText.textContent = '准备中...';

  const percentText = document.createElement('div');
  percentText.id = 'ppt-progress-percent';
  percentText.style.cssText = `
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  `;
  percentText.textContent = '0%';

  footer.appendChild(progressText);
  footer.appendChild(percentText);

  toast.appendChild(header);
  toast.appendChild(progressBar);
  toast.appendChild(footer);
  document.body.appendChild(toast);

  return {
    update: (progress: number, message: string) => {
      const fill = document.getElementById('ppt-progress-fill');
      const text = document.getElementById('ppt-progress-text');
      const percent = document.getElementById('ppt-progress-percent');
      if (fill) fill.style.width = `${Math.round(progress)}%`;
      if (text) text.textContent = message;
      if (percent) percent.textContent = `${Math.round(progress)}%`;
    },
    success: (message: string) => {
      const toastEl = document.getElementById('ppt-progress-toast');
      const titleEl = toastEl?.querySelector('div > div:first-child') as HTMLElement;
      const cancelBtn = document.getElementById('ppt-cancel-btn');
      if (titleEl) {
        titleEl.textContent = '✓ ' + message;
        titleEl.style.color = '#4ade80';
      }
      if (cancelBtn) cancelBtn.style.display = 'none';
      setTimeout(() => {
        if (toastEl) {
          toastEl.style.animation = 'slideOut 0.3s ease forwards';
          setTimeout(() => toastEl.remove(), 300);
        }
      }, 2000);
    },
    error: (message: string) => {
      const toastEl = document.getElementById('ppt-progress-toast');
      const titleEl = toastEl?.querySelector('div > div:first-child') as HTMLElement;
      const cancelBtn = document.getElementById('ppt-cancel-btn');
      if (titleEl) {
        titleEl.textContent = '✗ ' + message;
        titleEl.style.color = '#f87171';
      }
      if (cancelBtn) cancelBtn.style.display = 'none';
      setTimeout(() => {
        if (toastEl) {
          toastEl.style.animation = 'slideOut 0.3s ease forwards';
          setTimeout(() => toastEl.remove(), 300);
        }
      }, 2500);
    },
    remove: () => {
      const el = document.getElementById('ppt-progress-toast');
      if (el) {
        el.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => el.remove(), 300);
      }
    },
    isAborted: () => abortController?.signal.aborted ?? false,
  };
};

// 优化：压缩图片质量，限制尺寸
const imageToBase64WithSize = (url: string, quality = 0.5): Promise<{ data: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 限制最大尺寸以减小文件大小
      const maxDim = 1400;
      let width = img.width;
      let height = img.height;
      
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve({
          data: canvas.toDataURL('image/jpeg', quality),
          width,
          height,
        });
      } else {
        reject(new Error('Canvas context not available'));
      }
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

// 视频转换为base64（压缩后嵌入）
const videoToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};

// 获取视频缩略图（用于封面）
const getVideoThumbnail = (url: string, quality = 0.6): Promise<{ data: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';
    
    video.onloadeddata = () => {
      video.currentTime = 1;
    };
    
    video.onseeked = () => {
      const maxDim = 1400;
      let width = video.videoWidth;
      let height = video.videoHeight;
      
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        resolve({
          data: canvas.toDataURL('image/jpeg', quality),
          width,
          height,
        });
      } else {
        reject(new Error('Canvas context not available'));
      }
    };
    
    video.onerror = () => reject(new Error(`Failed to load video: ${url}`));
    video.src = url;
  });
};

// 联系方式数据
const contactInfo = {
  email: '2855785353@qq.com',
  wechat: 'HEYAPENG-H',
  phone: '15184430418',
};

// 完整的作品数据
const allWorksData = {
  heroVideo: '/videos/hero-bg.mp4',
  gameUI: {
    title: '游戏UI设计',
    description: '专注于游戏界面设计，打造沉浸式用户体验',
    images: [
      '/image/works/youxi/000.webp',
      '/image/works/youxi/012.webp',
      '/image/works/youxi/001.png',
      '/image/works/youxi/011.png',
      '/image/works/youxi/002.webp',
      '/image/works/youxi/003.webp',
      '/image/works/youxi/004.webp',
      '/image/works/youxi/005.webp',
      '/image/works/youxi/006.webp',
      '/image/works/youxi/007.webp',
      '/image/works/youxi/008.webp',
      '/image/works/youxi/009.webp',
      '/image/works/youxi/010.webp',
    ],
  },
  painting: {
    title: '绘画',
    description: '数字绘画与插画创作',
    images: [
      '/image/works/huihua/huihua.webp',
      '/image/works/huihua/002.webp',
      '/image/works/huihua/003.webp',
      '/image/works/huihua/004.webp',
      '/image/works/huihua/005.webp',
      '/image/works/huihua/006.webp',
      '/image/works/huihua/008.webp',
      '/image/works/huihua/009.webp',
      '/image/works/huihua/010.webp',
      '/image/works/huihua/014.webp',
      '/image/works/huihua/015.webp',
      '/image/works/huihua/016.webp',
      '/image/works/huihua/017.webp',
      '/image/works/huihua/018.webp',
      '/image/works/huihua/019.webp',
      '/image/works/huihua/020.webp',
      '/011.webp',
      '/012.webp',
      '/013.webp',
    ],
  },
  threeD: {
    title: '3D设计',
    description: '三维建模、材质贴图、渲染及动画制作',
    subCategories: {
      modeling: {
        title: '建模作品',
        images: [
          '/image/works/3d/mode/001.webp',
          '/image/works/3d/mode/002.webp',
          '/image/works/3d/mode/003.webp',
          '/image/works/3d/mode/004.webp',
          '/image/works/3d/mode/005.webp',
          '/image/works/3d/mode/006.webp',
          '/image/works/3d/mode/007.webp',
          '/image/works/3d/mode/008.webp',
          '/image/works/3d/mode/010.webp',
          '/image/works/3d/mode/011.webp',
          '/image/works/3d/mode/012.webp',
          '/image/works/3d/mode/013.webp',
          '/image/works/3d/mode/014.webp',
          '/image/works/3d/mode/015.webp',
          '/image/works/3d/mode/016.webp',
          '/image/works/3d/mode/017.webp',
          '/image/works/3d/mode/018.webp',
          '/image/works/3d/mode/019.webp',
          '/image/works/3d/mode/020.webp',
          '/image/works/3d/mode/021.webp',
          '/image/works/3d/mode/022.webp',
        ],
      },
      texturing: {
        title: '材质贴图',
        images: [
          '/image/works/3d/caizhi/001.webp',
          '/image/works/3d/caizhi/002.webp',
          '/image/works/3d/caizhi/003.webp',
          '/image/works/3d/caizhi/004.webp',
          '/image/works/3d/caizhi/005.webp',
          '/image/works/3d/caizhi/006.webp',
          '/image/works/3d/caizhi/007.webp',
          '/image/works/3d/caizhi/008.webp',
          '/image/works/3d/caizhi/009.webp',
          '/image/works/3d/caizhi/010.webp',
        ],
      },
      rendering: {
        title: '灯光渲染',
        images: [
          '/image/works/3d/xuanran/001.webp',
          '/image/works/3d/xuanran/002.webp',
          '/image/works/3d/xuanran/003.webp',
          '/image/works/3d/xuanran/004.webp',
          '/image/works/3d/xuanran/005.webp',
          '/image/works/3d/xuanran/006.webp',
          '/image/works/3d/xuanran/007.webp',
          '/image/works/3d/xuanran/008.webp',
          '/image/works/3d/xuanran/009.webp',
          '/image/works/3d/xuanran/010.webp',
          '/image/works/3d/xuanran/011.webp',
          '/image/works/3d/xuanran/012.webp',
          '/image/works/3d/xuanran/013.webp',
          '/image/works/3d/xuanran/014.webp',
          '/image/works/3d/xuanran/015.webp',
          '/image/works/3d/xuanran/016.webp',
        ],
      },
      animation: {
        title: '三维动画',
        videos: [
          '/videos/001.mp4',
          '/videos/002.mp4',
          '/videos/003.mp4',
          '/videos/004.mp4',
          '/videos/005.mp4',
          '/videos/007.mp4',
          '/videos/009.mp4',
          '/videos/010.mp4',
          '/videos/011.mp4',
          '/videos/012.mp4',
          '/videos/013.mp4',
          '/videos/014.mp4',
          '/videos/015.mp4',
        ],
      },
    },
  },
  graphic: {
    title: '平面设计',
    description: '品牌视觉、海报设计与排版',
    images: [
      '/image/works/pinmian/001.webp',
      '/image/works/pinmian/002.webp',
      '/image/works/pinmian/003.webp',
      '/image/works/pinmian/004.webp',
      '/image/works/pinmian/005.webp',
      '/image/works/pinmian/006.webp',
      '/image/works/pinmian/007.webp',
      '/image/works/pinmian/008.webp',
      '/image/works/pinmian/009.webp',
      '/image/works/pinmian/010.webp',
      '/image/works/pinmian/011.webp',
      '/image/works/pinmian/012.webp',
      '/image/works/pinmian/013.webp',
    ],
  },
};

interface ImageData {
  data: string;
  width: number;
  height: number;
}

export const exportToPPT = async () => {
  const progressUI = createProgressUI();

  try {
    const pptx = new PptxGenJS();
    
    pptx.author = '何亚鹏';
    pptx.title = '何亚鹏 - 个人作品集';
    pptx.subject = '设计作品展示';
    
    pptx.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
    pptx.layout = 'LAYOUT_WIDE';

    const baseUrl = window.location.origin;
    const loadedImages: Map<string, ImageData> = new Map();
    const loadedVideos: Map<string, string> = new Map();

    // 收集所有资源路径
    const allImagePaths: string[] = [];
    const allVideoPaths: string[] = [];

    allImagePaths.push(...allWorksData.gameUI.images);
    allImagePaths.push(...allWorksData.painting.images);
    allImagePaths.push(...allWorksData.threeD.subCategories.modeling.images);
    allImagePaths.push(...allWorksData.threeD.subCategories.texturing.images);
    allImagePaths.push(...allWorksData.threeD.subCategories.rendering.images);
    allImagePaths.push(...allWorksData.graphic.images);
    
    allVideoPaths.push(allWorksData.heroVideo);
    allVideoPaths.push(...allWorksData.threeD.subCategories.animation.videos);

    const totalResources = allImagePaths.length + allVideoPaths.length;
    let loadedCount = 0;

    progressUI.update(0, '加载资源中...');

    // 检查是否取消
    const checkAbort = () => {
      if (progressUI.isAborted()) {
        throw new Error('用户取消下载');
      }
    };

    // 加载图片（优化压缩）
    const loadImage = async (path: string) => {
      checkAbort();
      if (loadedImages.has(path)) return;
      try {
        const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
        const data = await imageToBase64WithSize(url, 0.5);
        loadedImages.set(path, data);
      } catch (e) {
        console.warn(`图片加载失败: ${path}`);
      }
      loadedCount++;
      const progress = (loadedCount / totalResources) * 50;
      progressUI.update(progress, `加载资源 ${loadedCount}/${totalResources}`);
    };

    // 加载视频（完整嵌入）
    const loadVideo = async (path: string) => {
      checkAbort();
      try {
        const url = `${baseUrl}${path}`;
        const data = await videoToBase64(url);
        loadedVideos.set(path, data);
        // 同时获取缩略图用于封面
        const thumbnail = await getVideoThumbnail(url, 0.6);
        loadedImages.set(path, thumbnail);
      } catch (e) {
        console.warn(`视频加载失败: ${path}`);
      }
      loadedCount++;
      const progress = (loadedCount / totalResources) * 50;
      progressUI.update(progress, `加载资源 ${loadedCount}/${totalResources}`);
    };

    // 并行加载（增大批次加快速度）
    const batchSize = 10;
    for (let i = 0; i < allImagePaths.length; i += batchSize) {
      checkAbort();
      const batch = allImagePaths.slice(i, i + batchSize);
      await Promise.all(batch.map(loadImage));
    }
    
    // 视频逐个加载（避免内存问题）
    for (const videoPath of allVideoPaths) {
      checkAbort();
      await loadVideo(videoPath);
    }

    checkAbort();
    progressUI.update(55, '创建封面...');

    // === 第1页：封面（完整文字） ===
    const slide1 = pptx.addSlide();
    slide1.background = { color: BG_COLOR };
    
    const heroData = loadedImages.get(allWorksData.heroVideo);
    if (heroData) {
      slide1.addImage({
        data: heroData.data,
        x: 0, y: 0, w: 13.33, h: 7.5,
        sizing: { type: 'cover', w: 13.33, h: 7.5 },
      });
      slide1.addShape('rect', {
        x: 0, y: 0, w: 13.33, h: 7.5,
        fill: { color: BG_COLOR, transparency: 40 },
      });
    }
    
    // 封面文字 - 完整显示
    slide1.addText('你好，我是', {
      x: 0.6, y: 1.8, w: 12, h: 0.7,
      fontSize: 28, color: TEXT_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    slide1.addText('何亚鹏', {
      x: 0.6, y: 2.4, w: 12, h: 1.2,
      fontSize: 60, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    slide1.addText('能够熟练的使用 AI 最新技术高效的完成工作内容', {
      x: 0.6, y: 3.7, w: 12, h: 0.5,
      fontSize: 18, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    slide1.addText([
      { text: '专注 ', options: { color: TEXT_COLOR } },
      { text: '平面设计', options: { color: PRIMARY_COLOR, bold: true } },
      { text: ' 与 ', options: { color: TEXT_COLOR } },
      { text: '3D美术', options: { color: PRIMARY_COLOR, bold: true } },
      { text: '。', options: { color: TEXT_COLOR } },
    ], {
      x: 0.6, y: 4.4, w: 12, h: 0.5,
      fontSize: 16, fontFace: 'Microsoft YaHei',
    });
    
    slide1.addText('熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke 等平面设计软件和三维动画制作软件。', {
      x: 0.6, y: 5.0, w: 11, h: 0.8,
      fontSize: 13, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
    });

    // 辅助函数：单图页面（游戏UI用）
    const addSingleImageSlide = (title: string, imgPath: string, subtitle?: string) => {
      const imgData = loadedImages.get(imgPath);
      if (!imgData) return;

      const slide = pptx.addSlide();
      slide.background = { color: BG_COLOR };

      // 简洁标题
      slide.addText(title, {
        x: 0.3, y: 0.15, w: 12, h: 0.4,
        fontSize: 14, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
      });

      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.3, y: 0.5, w: 12, h: 0.25,
          fontSize: 10, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
        });
      }

      const startY = subtitle ? 0.8 : 0.6;
      const maxW = 12.7, maxH = 7.5 - startY - 0.15;
      const imgRatio = imgData.width / imgData.height;
      const areaRatio = maxW / maxH;

      let w: number, h: number;
      if (imgRatio > areaRatio) { w = maxW; h = maxW / imgRatio; }
      else { h = maxH; w = maxH * imgRatio; }

      slide.addImage({
        data: imgData.data,
        x: (13.33 - w) / 2,
        y: startY + (maxH - h) / 2,
        w, h,
      });
    };

    // 辅助函数：多图页面（优化排版）
    const addMultiImageSlide = (title: string, images: string[], startIndex: number, count: number, subtitle?: string) => {
      const slide = pptx.addSlide();
      slide.background = { color: BG_COLOR };

      slide.addText(title, {
        x: 0.3, y: 0.1, w: 12, h: 0.35,
        fontSize: 14, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
      });

      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.3, y: 0.4, w: 12, h: 0.2,
          fontSize: 9, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
        });
      }

      const startY = subtitle ? 0.65 : 0.5;
      const areaH = 7.5 - startY - 0.1;
      const areaW = 12.9;
      const padding = 0.1;

      const validImages = images.slice(startIndex, startIndex + count)
        .map(path => ({ path, data: loadedImages.get(path) }))
        .filter((img): img is { path: string; data: ImageData } => !!img.data);

      if (validImages.length === 0) return;

      // 优化布局
      const layouts: { [key: number]: { cols: number; rows: number } } = {
        1: { cols: 1, rows: 1 }, 2: { cols: 2, rows: 1 }, 3: { cols: 3, rows: 1 },
        4: { cols: 2, rows: 2 }, 5: { cols: 3, rows: 2 }, 6: { cols: 3, rows: 2 },
      };

      const layout = layouts[Math.min(validImages.length, 6)] || { cols: 3, rows: 2 };
      const cellW = (areaW - padding * (layout.cols + 1)) / layout.cols;
      const cellH = (areaH - padding * (layout.rows + 1)) / layout.rows;

      validImages.slice(0, 6).forEach((img, idx) => {
        const col = idx % layout.cols;
        const row = Math.floor(idx / layout.cols);
        const imgRatio = img.data.width / img.data.height;
        const cellRatio = cellW / cellH;

        let w: number, h: number;
        if (imgRatio > cellRatio) { w = cellW; h = cellW / imgRatio; }
        else { h = cellH; w = cellH * imgRatio; }

        const cellX = 0.2 + padding + col * (cellW + padding);
        const cellY = startY + padding + row * (cellH + padding);

        slide.addImage({
          data: img.data.data,
          x: cellX + (cellW - w) / 2,
          y: cellY + (cellH - h) / 2,
          w, h,
        });
      });
    };

    // 辅助函数：视频页面（嵌入真实视频）
    const addVideoSlide = (title: string, videoPath: string, subtitle?: string) => {
      const videoData = loadedVideos.get(videoPath);
      const thumbnail = loadedImages.get(videoPath);
      if (!videoData || !thumbnail) return;

      const slide = pptx.addSlide();
      slide.background = { color: BG_COLOR };

      slide.addText(title, {
        x: 0.3, y: 0.15, w: 12, h: 0.4,
        fontSize: 14, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
      });

      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.3, y: 0.5, w: 12, h: 0.25,
          fontSize: 10, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
        });
      }

      const startY = subtitle ? 0.8 : 0.6;
      const maxW = 12, maxH = 6.5;
      const videoRatio = thumbnail.width / thumbnail.height;
      const areaRatio = maxW / maxH;

      let w: number, h: number;
      if (videoRatio > areaRatio) { w = maxW; h = maxW / videoRatio; }
      else { h = maxH; w = maxH * videoRatio; }

      // 嵌入视频
      slide.addMedia({
        type: 'video',
        data: videoData,
        x: (13.33 - w) / 2,
        y: startY + (maxH - h) / 2,
        w, h,
      });
    };

    checkAbort();
    progressUI.update(60, '添加游戏UI...');

    // === 游戏UI设计（每页一张）===
    allWorksData.gameUI.images.forEach((imgPath, idx) => {
      addSingleImageSlide(allWorksData.gameUI.title, imgPath, idx === 0 ? allWorksData.gameUI.description : undefined);
    });

    checkAbort();
    progressUI.update(68, '添加绘画作品...');

    // === 绘画（每页6张）===
    for (let i = 0; i < allWorksData.painting.images.length; i += 6) {
      addMultiImageSlide(allWorksData.painting.title, allWorksData.painting.images, i, 6, i === 0 ? allWorksData.painting.description : undefined);
    }

    checkAbort();
    progressUI.update(75, '添加3D作品...');

    // === 3D设计 ===
    const { modeling, texturing, rendering, animation } = allWorksData.threeD.subCategories;
    
    for (let i = 0; i < modeling.images.length; i += 6) {
      addMultiImageSlide(`${allWorksData.threeD.title} - ${modeling.title}`, modeling.images, i, 6, i === 0 ? allWorksData.threeD.description : undefined);
    }
    
    for (let i = 0; i < texturing.images.length; i += 6) {
      addMultiImageSlide(`${allWorksData.threeD.title} - ${texturing.title}`, texturing.images, i, 6);
    }
    
    for (let i = 0; i < rendering.images.length; i += 6) {
      addMultiImageSlide(`${allWorksData.threeD.title} - ${rendering.title}`, rendering.images, i, 6);
    }

    checkAbort();
    progressUI.update(82, '添加动画视频...');

    // === 动画视频（嵌入真实视频）===
    animation.videos.forEach((videoPath, idx) => {
      addVideoSlide(`${allWorksData.threeD.title} - ${animation.title}`, videoPath, idx === 0 ? '动画作品演示' : undefined);
    });

    checkAbort();
    progressUI.update(88, '添加平面设计...');

    // === 平面设计 ===
    for (let i = 0; i < allWorksData.graphic.images.length; i += 6) {
      addMultiImageSlide(allWorksData.graphic.title, allWorksData.graphic.images, i, 6, i === 0 ? allWorksData.graphic.description : undefined);
    }

    checkAbort();
    progressUI.update(92, '添加联系方式...');

    // === 联系方式 ===
    const slideContact = pptx.addSlide();
    slideContact.background = { color: BG_COLOR };
    
    slideContact.addText('联系方式', {
      x: 0.5, y: 1.8, w: 12.33, h: 1,
      fontSize: 48, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });
    
    slideContact.addText('感谢您浏览我的作品集，期待与您合作', {
      x: 0.5, y: 2.8, w: 12.33, h: 0.6,
      fontSize: 18, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });
    
    const cardY = 3.8, cardH = 1.8, cardW = 3.2, cardGap = 0.5;
    const startX = (13.33 - cardW * 3 - cardGap * 2) / 2;

    [
      { icon: '📧', label: '邮箱', value: contactInfo.email },
      { icon: '💬', label: '微信', value: contactInfo.wechat },
      { icon: '📱', label: '电话', value: contactInfo.phone },
    ].forEach((item, idx) => {
      const x = startX + (cardW + cardGap) * idx;
      slideContact.addShape('rect', {
        x, y: cardY, w: cardW, h: cardH,
        fill: { color: '1A1A1B' },
        line: { color: '333333', width: 1 },
      });
      slideContact.addText(item.icon, { x, y: cardY + 0.2, w: cardW, h: 0.5, fontSize: 24, align: 'center' });
      slideContact.addText(item.label, { x, y: cardY + 0.7, w: cardW, h: 0.3, fontSize: 11, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center' });
      slideContact.addText(item.value, { x, y: cardY + 1.1, w: cardW, h: 0.4, fontSize: 13, bold: true, color: TEXT_COLOR, fontFace: 'Microsoft YaHei', align: 'center' });
    });

    slideContact.addText('© 2024 何亚鹏 · 作品集', {
      x: 0.5, y: 6.5, w: 12.33, h: 0.4,
      fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });

    checkAbort();
    progressUI.update(96, '生成文件...');

    await pptx.writeFile({ fileName: '何亚鹏_作品集.pptx' });

    progressUI.success('下载完成！');

  } catch (error) {
    if ((error as Error).message === '用户取消下载') {
      progressUI.error('已取消下载');
    } else {
      console.error('PPT生成失败:', error);
      progressUI.error('生成失败，请重试');
    }
  }
};
