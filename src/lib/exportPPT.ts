import PptxGenJS from 'pptxgenjs';

const PRIMARY_COLOR = 'D4A853';
const BG_COLOR = '0A0A0B';
const TEXT_COLOR = 'FFFFFF';
const MUTED_COLOR = 'A1A1AA';

// 进度回调类型
type ProgressCallback = (progress: number, message: string) => void;

// 创建进度提示UI
const createProgressUI = () => {
  // 移除已存在的进度条
  const existing = document.getElementById('ppt-progress-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'ppt-progress-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    backdrop-filter: blur(8px);
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    background: #1a1a1b;
    border-radius: 16px;
    padding: 32px 48px;
    text-align: center;
    border: 1px solid #333;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    min-width: 320px;
  `;

  const title = document.createElement('div');
  title.style.cssText = `
    color: #D4A853;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  `;
  title.textContent = '正在生成PPT作品集';

  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    width: 100%;
    height: 8px;
    background: #333;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 16px;
  `;

  const progressFill = document.createElement('div');
  progressFill.id = 'ppt-progress-fill';
  progressFill.style.cssText = `
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #D4A853, #f0d78c);
    border-radius: 4px;
    transition: width 0.3s ease;
  `;
  progressBar.appendChild(progressFill);

  const progressText = document.createElement('div');
  progressText.id = 'ppt-progress-text';
  progressText.style.cssText = `
    color: #a1a1aa;
    font-size: 14px;
  `;
  progressText.textContent = '准备中...';

  const percentText = document.createElement('div');
  percentText.id = 'ppt-progress-percent';
  percentText.style.cssText = `
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin-top: 12px;
  `;
  percentText.textContent = '0%';

  container.appendChild(title);
  container.appendChild(progressBar);
  container.appendChild(progressText);
  container.appendChild(percentText);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  return {
    update: (progress: number, message: string) => {
      const fill = document.getElementById('ppt-progress-fill');
      const text = document.getElementById('ppt-progress-text');
      const percent = document.getElementById('ppt-progress-percent');
      if (fill) fill.style.width = `${Math.round(progress)}%`;
      if (text) text.textContent = message;
      if (percent) percent.textContent = `${Math.round(progress)}%`;
    },
    remove: () => {
      const el = document.getElementById('ppt-progress-overlay');
      if (el) {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s';
        setTimeout(() => el.remove(), 300);
      }
    },
  };
};

// 将图片转为base64并获取尺寸
const imageToBase64WithSize = (url: string): Promise<{ data: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve({
          data: canvas.toDataURL('image/jpeg', 0.85),
          width: img.width,
          height: img.height,
        });
      } else {
        reject(new Error('Canvas context not available'));
      }
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

// 将视频转为base64
const videoToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => reject(new Error('Failed to read video'));
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};

// 从视频获取第一帧截图（用于封面）
const getVideoThumbnail = (url: string): Promise<{ data: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';
    
    video.onloadeddata = () => {
      video.currentTime = 1;
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        resolve({
          data: canvas.toDataURL('image/jpeg', 0.85),
          width: video.videoWidth,
          height: video.videoHeight,
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
    tools: 'Figma · Photoshop · After Effects · Unity',
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
    description: '数字绘画与插画创作，融合传统技法与现代数字工具',
    tools: 'Procreate · Photoshop · Clip Studio Paint · Wacom',
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
    subtitle: '建模 · 材质贴图 · 渲染 · 三维动画',
    description: '三维建模、材质贴图、渲染及动画制作',
    tools: 'Blender · Cinema 4D · Substance Painter · ZBrush',
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
    tools: 'Illustrator · InDesign · Photoshop · Canva',
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

    progressUI.update(0, '正在加载资源...');

    // 加载图片
    const loadImage = async (path: string) => {
      if (loadedImages.has(path)) return;
      try {
        const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
        const data = await imageToBase64WithSize(url);
        loadedImages.set(path, data);
      } catch (e) {
        console.warn(`图片加载失败: ${path}`);
      }
      loadedCount++;
      const progress = (loadedCount / totalResources) * 60;
      progressUI.update(progress, `正在加载资源 (${loadedCount}/${totalResources})`);
    };

    // 加载视频
    const loadVideo = async (path: string) => {
      try {
        const url = `${baseUrl}${path}`;
        const data = await videoToBase64(url);
        loadedVideos.set(path, data);
      } catch (e) {
        console.warn(`视频加载失败: ${path}`);
      }
      loadedCount++;
      const progress = (loadedCount / totalResources) * 60;
      progressUI.update(progress, `正在加载资源 (${loadedCount}/${totalResources})`);
    };

    // 并行加载（分批避免内存溢出）
    const batchSize = 5;
    for (let i = 0; i < allImagePaths.length; i += batchSize) {
      const batch = allImagePaths.slice(i, i + batchSize);
      await Promise.all(batch.map(loadImage));
    }
    
    for (let i = 0; i < allVideoPaths.length; i += batchSize) {
      const batch = allVideoPaths.slice(i, i + batchSize);
      await Promise.all(batch.map(loadVideo));
    }

    // 加载首页视频缩略图（用于封面背景）
    let heroVideoThumbnail: ImageData | null = null;
    try {
      heroVideoThumbnail = await getVideoThumbnail(`${baseUrl}${allWorksData.heroVideo}`);
    } catch (e) {
      console.warn('首页视频缩略图加载失败');
    }

    progressUI.update(65, '正在创建PPT页面...');

    // === 第1页：封面 ===
    const slide1 = pptx.addSlide();
    slide1.background = { color: BG_COLOR };
    
    // 添加首页视频
    const heroVideoData = loadedVideos.get(allWorksData.heroVideo);
    if (heroVideoData) {
      // 添加缩略图作为背景
      if (heroVideoThumbnail) {
        slide1.addImage({
          data: heroVideoThumbnail.data,
          x: 0,
          y: 0,
          w: 13.33,
          h: 7.5,
          sizing: { type: 'cover', w: 13.33, h: 7.5 },
        });
      }
      // 添加视频（可在PPT中播放）
      slide1.addMedia({
        type: 'video',
        data: heroVideoData,
        x: 0,
        y: 0,
        w: 13.33,
        h: 7.5,
      });
      // 添加遮罩
      slide1.addShape('rect', {
        x: 0, y: 0, w: 13.33, h: 7.5,
        fill: { color: BG_COLOR, transparency: 50 },
      });
    }
    
    slide1.addText('你好，我是', {
      x: 0.5, y: 2.5, w: 12, h: 0.8,
      fontSize: 32, color: TEXT_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    slide1.addText('何亚鹏', {
      x: 0.5, y: 3.2, w: 12, h: 1.2,
      fontSize: 64, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    slide1.addText('能够熟练的使用 AI 最新技术高效的完成工作内容', {
      x: 0.5, y: 4.5, w: 12, h: 0.6,
      fontSize: 20, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    slide1.addText('专注平面设计与3D美术。熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke 等软件。', {
      x: 0.5, y: 5.3, w: 10, h: 1,
      fontSize: 14, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
    });

    progressUI.update(70, '正在添加游戏UI设计...');

    // 添加单张图片到页面
    const addSingleImageSlide = (title: string, imgPath: string, subtitle?: string) => {
      const imgData = loadedImages.get(imgPath);
      if (!imgData) return;

      const slide = pptx.addSlide();
      slide.background = { color: BG_COLOR };

      slide.addText(title, {
        x: 0.3, y: 0.2, w: 12, h: 0.5,
        fontSize: 18, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
      });

      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.3, y: 0.6, w: 12, h: 0.3,
          fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
        });
      }

      const maxW = 12.5;
      const maxH = 6.3;
      const imgRatio = imgData.width / imgData.height;
      const areaRatio = maxW / maxH;

      let w: number, h: number;
      if (imgRatio > areaRatio) {
        w = maxW;
        h = maxW / imgRatio;
      } else {
        h = maxH;
        w = maxH * imgRatio;
      }

      const x = (13.33 - w) / 2;
      const y = 0.9 + (maxH - h) / 2;

      slide.addImage({
        data: imgData.data,
        x, y, w, h,
      });
    };

    // 添加多张图片到一页
    const addMultiImageSlide = (title: string, images: string[], startIndex: number, count: number, subtitle?: string) => {
      const slide = pptx.addSlide();
      slide.background = { color: BG_COLOR };

      slide.addText(title, {
        x: 0.3, y: 0.15, w: 12, h: 0.4,
        fontSize: 16, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
      });

      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.3, y: 0.5, w: 12, h: 0.25,
          fontSize: 10, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
        });
      }

      const startY = subtitle ? 0.8 : 0.6;
      const areaH = 7.5 - startY - 0.2;
      const areaW = 12.8;
      const padding = 0.15;

      const imagesToShow = images.slice(startIndex, startIndex + count);
      const validImages = imagesToShow
        .map(path => ({ path, data: loadedImages.get(path) }))
        .filter((img): img is { path: string; data: ImageData } => !!img.data);

      if (validImages.length === 0) return 0;

      const layouts: { [key: number]: { cols: number; rows: number } } = {
        1: { cols: 1, rows: 1 },
        2: { cols: 2, rows: 1 },
        3: { cols: 3, rows: 1 },
        4: { cols: 2, rows: 2 },
        5: { cols: 3, rows: 2 },
        6: { cols: 3, rows: 2 },
      };

      const layout = layouts[Math.min(validImages.length, 6)] || { cols: 3, rows: 2 };
      const cellW = (areaW - padding * (layout.cols + 1)) / layout.cols;
      const cellH = (areaH - padding * (layout.rows + 1)) / layout.rows;

      validImages.slice(0, layout.cols * layout.rows).forEach((img, idx) => {
        const col = idx % layout.cols;
        const row = Math.floor(idx / layout.cols);

        const imgRatio = img.data.width / img.data.height;
        const cellRatio = cellW / cellH;

        let w: number, h: number;
        if (imgRatio > cellRatio) {
          w = cellW;
          h = cellW / imgRatio;
        } else {
          h = cellH;
          w = cellH * imgRatio;
        }

        const cellX = 0.25 + padding + col * (cellW + padding);
        const cellY = startY + padding + row * (cellH + padding);
        const x = cellX + (cellW - w) / 2;
        const y = cellY + (cellH - h) / 2;

        slide.addImage({
          data: img.data.data,
          x, y, w, h,
        });
      });

      return Math.min(validImages.length, layout.cols * layout.rows);
    };

    // 添加单个视频到页面
    const addVideoSlide = (title: string, videoPath: string, subtitle?: string) => {
      const videoData = loadedVideos.get(videoPath);
      if (!videoData) return;

      const slide = pptx.addSlide();
      slide.background = { color: BG_COLOR };

      slide.addText(title, {
        x: 0.3, y: 0.2, w: 12, h: 0.5,
        fontSize: 18, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
      });

      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.3, y: 0.6, w: 12, h: 0.3,
          fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
        });
      }

      // 视频居中放置
      const videoW = 10;
      const videoH = 5.6;
      const x = (13.33 - videoW) / 2;
      const y = 1.2;

      slide.addMedia({
        type: 'video',
        data: videoData,
        x, y, w: videoW, h: videoH,
      });
    };

    // === 游戏UI设计 - 每页一张 ===
    allWorksData.gameUI.images.forEach((imgPath, idx) => {
      addSingleImageSlide(
        allWorksData.gameUI.title,
        imgPath,
        idx === 0 ? allWorksData.gameUI.description : undefined
      );
    });

    progressUI.update(75, '正在添加绘画作品...');

    // === 绘画 - 每页6张 ===
    const paintingImages = allWorksData.painting.images;
    for (let i = 0; i < paintingImages.length; i += 6) {
      addMultiImageSlide(
        allWorksData.painting.title,
        paintingImages,
        i,
        6,
        i === 0 ? allWorksData.painting.description : undefined
      );
    }

    progressUI.update(80, '正在添加3D设计作品...');

    // === 3D设计 - 建模 ===
    const modelingImages = allWorksData.threeD.subCategories.modeling.images;
    for (let i = 0; i < modelingImages.length; i += 6) {
      addMultiImageSlide(
        `${allWorksData.threeD.title} - ${allWorksData.threeD.subCategories.modeling.title}`,
        modelingImages,
        i,
        6,
        i === 0 ? allWorksData.threeD.description : undefined
      );
    }

    // === 3D设计 - 材质贴图 ===
    const texturingImages = allWorksData.threeD.subCategories.texturing.images;
    for (let i = 0; i < texturingImages.length; i += 6) {
      addMultiImageSlide(
        `${allWorksData.threeD.title} - ${allWorksData.threeD.subCategories.texturing.title}`,
        texturingImages,
        i,
        6
      );
    }

    // === 3D设计 - 灯光渲染 ===
    const renderingImages = allWorksData.threeD.subCategories.rendering.images;
    for (let i = 0; i < renderingImages.length; i += 6) {
      addMultiImageSlide(
        `${allWorksData.threeD.title} - ${allWorksData.threeD.subCategories.rendering.title}`,
        renderingImages,
        i,
        6
      );
    }

    progressUI.update(85, '正在添加三维动画...');

    // === 3D设计 - 三维动画（嵌入原视频） ===
    const animationVideos = allWorksData.threeD.subCategories.animation.videos;
    animationVideos.forEach((videoPath, idx) => {
      addVideoSlide(
        `${allWorksData.threeD.title} - ${allWorksData.threeD.subCategories.animation.title}`,
        videoPath,
        idx === 0 ? '动画作品展示' : undefined
      );
    });

    progressUI.update(90, '正在添加平面设计...');

    // === 平面设计 - 每页6张 ===
    const graphicImages = allWorksData.graphic.images;
    for (let i = 0; i < graphicImages.length; i += 6) {
      addMultiImageSlide(
        allWorksData.graphic.title,
        graphicImages,
        i,
        6,
        i === 0 ? allWorksData.graphic.description : undefined
      );
    }

    progressUI.update(95, '正在添加联系方式...');

    // === 最后一页：联系方式 ===
    const slideContact = pptx.addSlide();
    slideContact.background = { color: BG_COLOR };
    
    slideContact.addText('联系方式', {
      x: 0.5, y: 1.5, w: 12.33, h: 1,
      fontSize: 48, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });
    
    slideContact.addText('感谢您浏览我的作品集，期待与您合作', {
      x: 0.5, y: 2.6, w: 12.33, h: 0.6,
      fontSize: 18, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });
    
    // 联系方式卡片
    const cardY = 3.5;
    const cardH = 2.2;
    const cardW = 3.5;
    const cardGap = 0.4;
    const totalCardsW = cardW * 3 + cardGap * 2;
    const startX = (13.33 - totalCardsW) / 2;

    // 邮箱卡片
    slideContact.addShape('rect', {
      x: startX, y: cardY, w: cardW, h: cardH,
      fill: { color: '1A1A1B' },
      line: { color: '333333', width: 1 },
      shadow: { type: 'outer', blur: 8, offset: 2, angle: 45, opacity: 0.3 },
    });
    slideContact.addText('📧', {
      x: startX, y: cardY + 0.3, w: cardW, h: 0.6,
      fontSize: 28, align: 'center',
    });
    slideContact.addText('邮箱', {
      x: startX, y: cardY + 0.9, w: cardW, h: 0.4,
      fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slideContact.addText(contactInfo.email, {
      x: startX, y: cardY + 1.3, w: cardW, h: 0.5,
      fontSize: 14, bold: true, color: TEXT_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });

    // 微信卡片
    slideContact.addShape('rect', {
      x: startX + cardW + cardGap, y: cardY, w: cardW, h: cardH,
      fill: { color: '1A1A1B' },
      line: { color: '333333', width: 1 },
      shadow: { type: 'outer', blur: 8, offset: 2, angle: 45, opacity: 0.3 },
    });
    slideContact.addText('💬', {
      x: startX + cardW + cardGap, y: cardY + 0.3, w: cardW, h: 0.6,
      fontSize: 28, align: 'center',
    });
    slideContact.addText('微信', {
      x: startX + cardW + cardGap, y: cardY + 0.9, w: cardW, h: 0.4,
      fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slideContact.addText(contactInfo.wechat, {
      x: startX + cardW + cardGap, y: cardY + 1.3, w: cardW, h: 0.5,
      fontSize: 14, bold: true, color: TEXT_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });

    // 电话卡片
    slideContact.addShape('rect', {
      x: startX + (cardW + cardGap) * 2, y: cardY, w: cardW, h: cardH,
      fill: { color: '1A1A1B' },
      line: { color: '333333', width: 1 },
      shadow: { type: 'outer', blur: 8, offset: 2, angle: 45, opacity: 0.3 },
    });
    slideContact.addText('📱', {
      x: startX + (cardW + cardGap) * 2, y: cardY + 0.3, w: cardW, h: 0.6,
      fontSize: 28, align: 'center',
    });
    slideContact.addText('电话', {
      x: startX + (cardW + cardGap) * 2, y: cardY + 0.9, w: cardW, h: 0.4,
      fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slideContact.addText(contactInfo.phone, {
      x: startX + (cardW + cardGap) * 2, y: cardY + 1.3, w: cardW, h: 0.5,
      fontSize: 14, bold: true, color: TEXT_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });

    // 页脚
    slideContact.addText('© 2024 何亚鹏 · 作品集', {
      x: 0.5, y: 6.5, w: 12.33, h: 0.4,
      fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
    });

    progressUI.update(98, '正在生成文件...');

    // 生成并下载
    await pptx.writeFile({ fileName: '何亚鹏_作品集.pptx' });

    progressUI.update(100, '下载完成！');
    setTimeout(() => progressUI.remove(), 1500);

  } catch (error) {
    console.error('PPT生成失败:', error);
    progressUI.update(0, '生成失败，请重试');
    setTimeout(() => progressUI.remove(), 2000);
  }
};
