import PptxGenJS from 'pptxgenjs';

interface SlideContent {
  title: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  tools?: string[];
}

const PRIMARY_COLOR = 'D4A853';
const BG_COLOR = '0A0A0B';
const TEXT_COLOR = 'FFFFFF';
const MUTED_COLOR = 'A1A1AA';

export const exportToPPT = async () => {
  const pptx = new PptxGenJS();
  
  // 设置PPT属性
  pptx.author = '何亚鹏';
  pptx.title = '何亚鹏 - 个人作品集';
  pptx.subject = '设计作品展示';
  pptx.company = '';
  
  // 设置默认布局
  pptx.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
  pptx.layout = 'LAYOUT_WIDE';

  // === 第1页：封面 ===
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_COLOR };
  
  // 标题
  slide1.addText('你好，我是', {
    x: 0.5,
    y: 2.5,
    w: 12,
    h: 0.8,
    fontSize: 32,
    color: TEXT_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide1.addText('何亚鹏', {
    x: 0.5,
    y: 3.2,
    w: 12,
    h: 1.2,
    fontSize: 64,
    bold: true,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  // AI技术亮点
  slide1.addText('能够熟练的使用 AI 最新技术高效的完成工作内容', {
    x: 0.5,
    y: 4.5,
    w: 12,
    h: 0.6,
    fontSize: 20,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  // 描述
  slide1.addText('专注平面设计与3D美术。熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke 等平面设计软件和三维动画制作软件。', {
    x: 0.5,
    y: 5.3,
    w: 10,
    h: 1,
    fontSize: 14,
    color: MUTED_COLOR,
    fontFace: 'Microsoft YaHei',
  });

  // === 第2页：游戏UI设计 ===
  const slide2 = pptx.addSlide();
  slide2.background = { color: BG_COLOR };
  
  slide2.addText('游戏UI设计', {
    x: 0.5,
    y: 0.5,
    w: 12,
    h: 1,
    fontSize: 40,
    bold: true,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide2.addText('专注于游戏界面设计，打造沉浸式用户体验。从概念设计到最终实现，每一个像素都经过精心打磨，确保视觉与功能的完美融合。', {
    x: 0.5,
    y: 1.5,
    w: 10,
    h: 0.8,
    fontSize: 14,
    color: MUTED_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide2.addText('工具: Figma · Photoshop · After Effects · Unity', {
    x: 0.5,
    y: 2.3,
    w: 10,
    h: 0.5,
    fontSize: 12,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  // 添加作品图片网格提示
  slide2.addShape('rect', {
    x: 0.5, y: 3, w: 5.8, h: 4,
    fill: { color: '1A1A1B' },
    line: { color: PRIMARY_COLOR, width: 1 },
  });
  slide2.addText('作品图片 1\n/image/works/youxi/', {
    x: 0.5, y: 3, w: 5.8, h: 4,
    fontSize: 14, color: MUTED_COLOR, align: 'center', valign: 'middle',
    fontFace: 'Microsoft YaHei',
  });
  
  slide2.addShape('rect', {
    x: 6.5, y: 3, w: 5.8, h: 4,
    fill: { color: '1A1A1B' },
    line: { color: PRIMARY_COLOR, width: 1 },
  });
  slide2.addText('作品图片 2\n查看完整作品集', {
    x: 6.5, y: 3, w: 5.8, h: 4,
    fontSize: 14, color: MUTED_COLOR, align: 'center', valign: 'middle',
    fontFace: 'Microsoft YaHei',
  });

  // === 第3页：绘画 ===
  const slide3 = pptx.addSlide();
  slide3.background = { color: BG_COLOR };
  
  slide3.addText('绘画', {
    x: 0.5,
    y: 0.5,
    w: 12,
    h: 1,
    fontSize: 40,
    bold: true,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide3.addText('数字绘画与插画创作，融合传统技法与现代数字工具，创造富有表现力的视觉作品。', {
    x: 0.5,
    y: 1.5,
    w: 10,
    h: 0.8,
    fontSize: 14,
    color: MUTED_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide3.addText('工具: Procreate · Photoshop · Clip Studio Paint · Wacom', {
    x: 0.5,
    y: 2.3,
    w: 10,
    h: 0.5,
    fontSize: 12,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide3.addShape('rect', {
    x: 0.5, y: 3, w: 5.8, h: 4,
    fill: { color: '1A1A1B' },
    line: { color: PRIMARY_COLOR, width: 1 },
  });
  slide3.addText('绘画作品 1\n/image/works/huihua/', {
    x: 0.5, y: 3, w: 5.8, h: 4,
    fontSize: 14, color: MUTED_COLOR, align: 'center', valign: 'middle',
    fontFace: 'Microsoft YaHei',
  });
  
  slide3.addShape('rect', {
    x: 6.5, y: 3, w: 5.8, h: 4,
    fill: { color: '1A1A1B' },
    line: { color: PRIMARY_COLOR, width: 1 },
  });
  slide3.addText('绘画作品 2\n查看完整作品集', {
    x: 6.5, y: 3, w: 5.8, h: 4,
    fontSize: 14, color: MUTED_COLOR, align: 'center', valign: 'middle',
    fontFace: 'Microsoft YaHei',
  });

  // === 第4页：3D设计 ===
  const slide4 = pptx.addSlide();
  slide4.background = { color: BG_COLOR };
  
  slide4.addText('3D设计', {
    x: 0.5,
    y: 0.5,
    w: 12,
    h: 1,
    fontSize: 40,
    bold: true,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide4.addText('建模 · 材质贴图 · 渲染 · 三维动画', {
    x: 0.5,
    y: 1.3,
    w: 10,
    h: 0.5,
    fontSize: 16,
    color: TEXT_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide4.addText('三维建模、材质贴图、渲染及动画制作。从角色到场景，从产品到建筑，全方位的3D视觉解决方案。', {
    x: 0.5,
    y: 1.9,
    w: 10,
    h: 0.8,
    fontSize: 14,
    color: MUTED_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide4.addText('工具: Blender · Cinema 4D · Substance Painter · ZBrush · Unreal Engine', {
    x: 0.5,
    y: 2.7,
    w: 10,
    h: 0.5,
    fontSize: 12,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  // 4个子类别
  const subCategories = ['建模作品', '材质贴图', '灯光渲染', '三维动画'];
  subCategories.forEach((cat, i) => {
    const x = 0.5 + (i % 2) * 6.2;
    const y = 3.3 + Math.floor(i / 2) * 2.1;
    
    slide4.addShape('rect', {
      x, y, w: 5.8, h: 1.8,
      fill: { color: '1A1A1B' },
      line: { color: PRIMARY_COLOR, width: 1 },
    });
    slide4.addText(cat, {
      x, y, w: 5.8, h: 1.8,
      fontSize: 18, color: TEXT_COLOR, align: 'center', valign: 'middle',
      fontFace: 'Microsoft YaHei',
    });
  });

  // === 第5页：平面设计 ===
  const slide5 = pptx.addSlide();
  slide5.background = { color: BG_COLOR };
  
  slide5.addText('平面设计', {
    x: 0.5,
    y: 0.5,
    w: 12,
    h: 1,
    fontSize: 40,
    bold: true,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide5.addText('品牌视觉、海报设计与排版。将创意转化为引人注目的视觉传达，提升品牌价值与识别度。', {
    x: 0.5,
    y: 1.5,
    w: 10,
    h: 0.8,
    fontSize: 14,
    color: MUTED_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide5.addText('工具: Illustrator · InDesign · Photoshop · Canva', {
    x: 0.5,
    y: 2.3,
    w: 10,
    h: 0.5,
    fontSize: 12,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
  });
  
  slide5.addShape('rect', {
    x: 0.5, y: 3, w: 5.8, h: 4,
    fill: { color: '1A1A1B' },
    line: { color: PRIMARY_COLOR, width: 1 },
  });
  slide5.addText('平面设计作品 1\n/image/works/pinmian/', {
    x: 0.5, y: 3, w: 5.8, h: 4,
    fontSize: 14, color: MUTED_COLOR, align: 'center', valign: 'middle',
    fontFace: 'Microsoft YaHei',
  });
  
  slide5.addShape('rect', {
    x: 6.5, y: 3, w: 5.8, h: 4,
    fill: { color: '1A1A1B' },
    line: { color: PRIMARY_COLOR, width: 1 },
  });
  slide5.addText('平面设计作品 2\n查看完整作品集', {
    x: 6.5, y: 3, w: 5.8, h: 4,
    fontSize: 14, color: MUTED_COLOR, align: 'center', valign: 'middle',
    fontFace: 'Microsoft YaHei',
  });

  // === 第6页：联系方式 ===
  const slide6 = pptx.addSlide();
  slide6.background = { color: BG_COLOR };
  
  slide6.addText('联系我', {
    x: 0.5,
    y: 2,
    w: 12,
    h: 1,
    fontSize: 48,
    bold: true,
    color: PRIMARY_COLOR,
    fontFace: 'Microsoft YaHei',
    align: 'center',
  });
  
  slide6.addText('感谢您浏览我的作品集\n期待与您合作', {
    x: 0.5,
    y: 3.5,
    w: 12,
    h: 1.5,
    fontSize: 20,
    color: MUTED_COLOR,
    fontFace: 'Microsoft YaHei',
    align: 'center',
  });
  
  slide6.addText('📧 联系邮箱  |  📱 微信咨询', {
    x: 0.5,
    y: 5.5,
    w: 12,
    h: 0.6,
    fontSize: 16,
    color: TEXT_COLOR,
    fontFace: 'Microsoft YaHei',
    align: 'center',
  });

  // 生成并下载
  await pptx.writeFile({ fileName: '何亚鹏_作品集.pptx' });
};
