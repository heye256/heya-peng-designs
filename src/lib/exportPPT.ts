import PptxGenJS from 'pptxgenjs';

const PRIMARY_COLOR = 'D4A853';
const BG_COLOR = '0A0A0B';
const TEXT_COLOR = 'FFFFFF';
const MUTED_COLOR = 'A1A1AA';

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

// 从视频获取第一帧截图
const videoToBase64 = (url: string): Promise<{ data: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';
    
    video.onloadeddata = () => {
      video.currentTime = 1; // 跳到第1秒获取截图
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

// 完整的作品数据 - 从 WorksSection 同步
const allWorksData = {
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
  const pptx = new PptxGenJS();
  
  // 设置PPT属性
  pptx.author = '何亚鹏';
  pptx.title = '何亚鹏 - 个人作品集';
  pptx.subject = '设计作品展示';
  
  pptx.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
  pptx.layout = 'LAYOUT_WIDE';

  const baseUrl = window.location.origin;
  const loadedImages: Map<string, ImageData> = new Map();

  // 显示加载提示
  console.log('正在加载图片和视频...');

  // 加载首页视频截图
  let heroVideoData: ImageData | null = null;
  try {
    heroVideoData = await videoToBase64(`${baseUrl}/videos/hero-bg.mp4`);
    console.log('首页视频截图加载成功');
  } catch (e) {
    console.warn('首页视频加载失败');
  }

  // 加载所有图片
  const loadImage = async (path: string) => {
    if (loadedImages.has(path)) return;
    try {
      const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
      const data = await imageToBase64WithSize(url);
      loadedImages.set(path, data);
    } catch (e) {
      console.warn(`图片加载失败: ${path}`);
    }
  };

  // 加载视频截图
  const loadVideo = async (path: string) => {
    if (loadedImages.has(path)) return;
    try {
      const data = await videoToBase64(`${baseUrl}${path}`);
      loadedImages.set(path, data);
    } catch (e) {
      console.warn(`视频加载失败: ${path}`);
    }
  };

  // 并行加载所有资源
  const allImagePaths: string[] = [];
  const allVideoPaths: string[] = [];

  allImagePaths.push(...allWorksData.gameUI.images);
  allImagePaths.push(...allWorksData.painting.images);
  allImagePaths.push(...allWorksData.threeD.subCategories.modeling.images);
  allImagePaths.push(...allWorksData.threeD.subCategories.texturing.images);
  allImagePaths.push(...allWorksData.threeD.subCategories.rendering.images);
  allVideoPaths.push(...allWorksData.threeD.subCategories.animation.videos);
  allImagePaths.push(...allWorksData.graphic.images);

  // 分批加载避免内存溢出
  const batchSize = 10;
  for (let i = 0; i < allImagePaths.length; i += batchSize) {
    const batch = allImagePaths.slice(i, i + batchSize);
    await Promise.all(batch.map(loadImage));
  }
  
  for (let i = 0; i < allVideoPaths.length; i += batchSize) {
    const batch = allVideoPaths.slice(i, i + batchSize);
    await Promise.all(batch.map(loadVideo));
  }

  console.log(`已加载 ${loadedImages.size} 个资源`);

  // === 第1页：封面（含首页视频截图） ===
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_COLOR };
  
  // 添加首页视频截图作为背景
  if (heroVideoData) {
    slide1.addImage({
      data: heroVideoData.data,
      x: 0,
      y: 0,
      w: 13.33,
      h: 7.5,
      sizing: { type: 'cover', w: 13.33, h: 7.5 },
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

  // 添加单张图片到页面（保持原始比例，居中显示）
  const addSingleImageSlide = (title: string, imgPath: string, subtitle?: string) => {
    const imgData = loadedImages.get(imgPath);
    if (!imgData) return;

    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };

    // 标题
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

    // 计算保持比例的尺寸
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

  // 添加多张图片到一页（自由排列，保持比例）
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

    // 根据图片数量选择布局
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

  // === 游戏UI设计 - 每页一张 ===
  allWorksData.gameUI.images.forEach((imgPath, idx) => {
    addSingleImageSlide(
      allWorksData.gameUI.title,
      imgPath,
      idx === 0 ? allWorksData.gameUI.description : undefined
    );
  });

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

  // === 3D设计 - 三维动画（视频截图） ===
  const animationVideos = allWorksData.threeD.subCategories.animation.videos;
  for (let i = 0; i < animationVideos.length; i += 6) {
    addMultiImageSlide(
      `${allWorksData.threeD.title} - ${allWorksData.threeD.subCategories.animation.title}`,
      animationVideos,
      i,
      6,
      i === 0 ? '动画作品视频截图' : undefined
    );
  }

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

  // === 最后一页：联系方式 ===
  const slideContact = pptx.addSlide();
  slideContact.background = { color: BG_COLOR };
  
  slideContact.addText('联系我', {
    x: 0.5, y: 2, w: 12, h: 1,
    fontSize: 48, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
  });
  
  slideContact.addText('感谢您浏览我的作品集\n期待与您合作', {
    x: 0.5, y: 3.5, w: 12, h: 1.5,
    fontSize: 20, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
  });
  
  slideContact.addText('📧 联系邮箱  |  📱 微信咨询', {
    x: 0.5, y: 5.5, w: 12, h: 0.6,
    fontSize: 16, color: TEXT_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
  });

  // 生成并下载
  console.log('正在生成PPT...');
  await pptx.writeFile({ fileName: '何亚鹏_作品集.pptx' });
  console.log('PPT下载完成！');
};
