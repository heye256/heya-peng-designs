import PptxGenJS from 'pptxgenjs';

const PRIMARY_COLOR = 'D4A853';
const BG_COLOR = '0A0A0B';
const TEXT_COLOR = 'FFFFFF';
const MUTED_COLOR = 'A1A1AA';

// 将图片转为base64
const imageToBase64 = (url: string): Promise<string> => {
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
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        reject(new Error('Canvas context not available'));
      }
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

// 作品数据
const worksData = {
  gameUI: {
    title: '游戏UI设计',
    description: '专注于游戏界面设计，打造沉浸式用户体验。从概念设计到最终实现，每一个像素都经过精心打磨。',
    tools: 'Figma · Photoshop · After Effects · Unity',
    images: [
      '/image/works/youxi/000.webp',
      '/image/works/youxi/012.webp',
      '/image/works/youxi/002.webp',
      '/image/works/youxi/003.webp',
    ],
  },
  painting: {
    title: '绘画',
    description: '数字绘画与插画创作，融合传统技法与现代数字工具，创造富有表现力的视觉作品。',
    tools: 'Procreate · Photoshop · Clip Studio Paint · Wacom',
    images: [
      '/image/works/huihua/huihua.webp',
      '/image/works/huihua/002.webp',
      '/image/works/huihua/003.webp',
      '/image/works/huihua/004.webp',
    ],
  },
  threeD: {
    title: '3D设计',
    subtitle: '建模 · 材质贴图 · 渲染 · 三维动画',
    description: '三维建模、材质贴图、渲染及动画制作。从角色到场景，全方位的3D视觉解决方案。',
    tools: 'Blender · Cinema 4D · Substance Painter · ZBrush',
    images: [
      '/image/works/3d/mode/001.webp',
      '/image/works/3d/caizhi/001.webp',
      '/image/works/3d/xuanran/001.webp',
      '/image/works/3d/mode/002.webp',
    ],
  },
  graphic: {
    title: '平面设计',
    description: '品牌视觉、海报设计与排版。将创意转化为引人注目的视觉传达，提升品牌价值与识别度。',
    tools: 'Illustrator · InDesign · Photoshop · Canva',
    images: [
      '/image/works/pinmian/001.webp',
      '/image/works/pinmian/002.webp',
      '/image/works/pinmian/003.webp',
      '/image/works/pinmian/004.webp',
    ],
  },
};

export const exportToPPT = async () => {
  const pptx = new PptxGenJS();
  
  // 设置PPT属性
  pptx.author = '何亚鹏';
  pptx.title = '何亚鹏 - 个人作品集';
  pptx.subject = '设计作品展示';
  
  pptx.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
  pptx.layout = 'LAYOUT_WIDE';

  const baseUrl = window.location.origin;

  // === 第1页：封面 ===
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_COLOR };
  
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

  // 加载所有图片
  const allImages: { [key: string]: string } = {};
  
  try {
    for (const [category, data] of Object.entries(worksData)) {
      for (const imgPath of data.images) {
        const fullUrl = `${baseUrl}${imgPath}`;
        try {
          allImages[imgPath] = await imageToBase64(fullUrl);
        } catch (e) {
          console.warn(`Failed to load image: ${imgPath}`);
        }
      }
    }
  } catch (e) {
    console.error('Error loading images:', e);
  }

  // === 创建作品页面的辅助函数 ===
  const createWorksSlide = (
    data: { title: string; subtitle?: string; description: string; tools: string; images: string[] }
  ) => {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    
    slide.addText(data.title, {
      x: 0.5, y: 0.3, w: 12, h: 0.8,
      fontSize: 36, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    if (data.subtitle) {
      slide.addText(data.subtitle, {
        x: 0.5, y: 1.0, w: 10, h: 0.4,
        fontSize: 14, color: TEXT_COLOR, fontFace: 'Microsoft YaHei',
      });
    }
    
    slide.addText(data.description, {
      x: 0.5, y: data.subtitle ? 1.4 : 1.1, w: 10, h: 0.6,
      fontSize: 12, color: MUTED_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    slide.addText(`工具: ${data.tools}`, {
      x: 0.5, y: data.subtitle ? 2.0 : 1.7, w: 10, h: 0.4,
      fontSize: 11, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei',
    });
    
    // 添加图片网格 - 2x2布局
    const imgPositions = [
      { x: 0.5, y: 2.5, w: 6, h: 4.5 },
      { x: 6.7, y: 2.5, w: 6, h: 4.5 },
    ];
    
    data.images.slice(0, 2).forEach((imgPath, i) => {
      const pos = imgPositions[i];
      const base64 = allImages[imgPath];
      
      if (base64) {
        slide.addImage({
          data: base64,
          x: pos.x,
          y: pos.y,
          w: pos.w,
          h: pos.h,
          sizing: { type: 'contain', w: pos.w, h: pos.h },
        });
      } else {
        // 占位符
        slide.addShape('rect', {
          x: pos.x, y: pos.y, w: pos.w, h: pos.h,
          fill: { color: '1A1A1B' },
          line: { color: PRIMARY_COLOR, width: 1 },
        });
        slide.addText('图片加载中...', {
          x: pos.x, y: pos.y, w: pos.w, h: pos.h,
          fontSize: 14, color: MUTED_COLOR, align: 'center', valign: 'middle',
        });
      }
    });
    
    return slide;
  };

  // === 第2页：游戏UI设计 ===
  createWorksSlide(worksData.gameUI);

  // === 第3页：绘画 ===
  createWorksSlide(worksData.painting);

  // === 第4页：3D设计 ===
  createWorksSlide(worksData.threeD);

  // === 第5页：平面设计 ===
  createWorksSlide(worksData.graphic);

  // === 第6页：联系方式 ===
  const slide6 = pptx.addSlide();
  slide6.background = { color: BG_COLOR };
  
  slide6.addText('联系我', {
    x: 0.5, y: 2, w: 12, h: 1,
    fontSize: 48, bold: true, color: PRIMARY_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
  });
  
  slide6.addText('感谢您浏览我的作品集\n期待与您合作', {
    x: 0.5, y: 3.5, w: 12, h: 1.5,
    fontSize: 20, color: MUTED_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
  });
  
  slide6.addText('📧 联系邮箱  |  📱 微信咨询', {
    x: 0.5, y: 5.5, w: 12, h: 0.6,
    fontSize: 16, color: TEXT_COLOR, fontFace: 'Microsoft YaHei', align: 'center',
  });

  // 生成并下载
  await pptx.writeFile({ fileName: '何亚鹏_作品集.pptx' });
};
