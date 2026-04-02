/**
 * Mandarin Chinese translations for demo questions.
 * Keyed by question ID → { questionText, choices[] }
 */
export const demoQuestionsZh: Record<string, { questionText: string; choices: { label: string; text: string }[] }> = {
  'demo-q01': {
    questionText: '在制作卷寿司时，将寿司饭铺在海苔上，饭层应该多厚？',
    choices: [
      { label: 'A', text: '尽可能厚，这样卷会更饱满' },
      { label: 'B', text: '薄而均匀的一层，大约0.5厘米厚' },
      { label: 'C', text: '只铺在边缘，中间留空' },
      { label: 'D', text: '厚度无所谓——竹帘会帮你塑形' },
    ],
  },
  'demo-q02': {
    questionText: '铺寿司饭之前，应该怎样处理双手以防止米饭粘手？',
    choices: [
      { label: 'A', text: '涂上植物油' },
      { label: 'B', text: '撒上面粉' },
      { label: 'C', text: '蘸上混有米醋的水' },
      { label: 'D', text: '戴上乳胶手套' },
    ],
  },
  'demo-q03': {
    questionText: '将海苔放在竹帘上制作卷寿司时，哪一面应该朝上？',
    choices: [
      { label: 'A', text: '光滑面' },
      { label: 'B', text: '粗糙面' },
      { label: 'C', text: '哪面都行——没有区别' },
      { label: 'D', text: '有明显纹路的那一面' },
    ],
  },
  'demo-q04': {
    questionText: '制作标准卷寿司时，整张海苔应该怎样放在竹帘上？',
    choices: [
      { label: 'A', text: '长边与竹帘的竹条平行' },
      { label: 'B', text: '与竹帘成45度角' },
      { label: 'C', text: '短边与竹条平行' },
      { label: 'D', text: '先对折，再放到竹帘上' },
    ],
  },
  'demo-q05': {
    questionText: '制作细卷（hosomaki）时，海苔片怎么处理？',
    choices: [
      { label: 'A', text: '用整张' },
      { label: 'B', text: '切成一半' },
      { label: 'C', text: '切成四分之一' },
      { label: 'D', text: '折成三等份' },
    ],
  },
  'demo-q06': {
    questionText: '你正在制作一个包含黄瓜、牛油果和奶油芝士三种馅料的卷寿司。应该怎样摆放？',
    choices: [
      { label: 'A', text: '三种馅料在中间叠放' },
      { label: 'B', text: '均匀铺满整个米饭表面' },
      { label: 'C', text: '在中间排成一排，并列放置' },
      { label: 'D', text: '最重的食材放在外侧边缘' },
    ],
  },
  'demo-q07': {
    questionText: '在卷寿司中添加馅料时，应该在哪个边缘留出一条空白的海苔？',
    choices: [
      { label: 'A', text: '靠近你的那一边' },
      { label: 'B', text: '离你最远的那一边' },
      { label: 'C', text: '两边都留同样宽度' },
      { label: 'D', text: '不需要留空白' },
    ],
  },
  'demo-q08': {
    questionText: '卷寿司时馅料总是偏向一侧。最可能的摆放错误是什么？',
    choices: [
      { label: 'A', text: '馅料放得太靠近身前的边缘' },
      { label: 'B', text: '馅料没有摆成一条直线' },
      { label: 'C', text: '海苔上的米饭太多了' },
      { label: 'D', text: '海苔方向放反了' },
    ],
  },
  'demo-q09': {
    questionText: '用竹帘卷寿司时，正确的第一个动作是什么？',
    choices: [
      { label: 'A', text: '一次性将整个竹帘翻卷过去' },
      { label: 'B', text: '提起竹帘的近端边缘，将其翻过馅料，将海苔边缘贴紧馅料的远侧' },
      { label: 'C', text: '直接向下按压竹帘来压实所有材料' },
      { label: 'D', text: '一边按压一边向前推动竹帘' },
    ],
  },
  'demo-q10': {
    questionText: '卷寿司的第一次折卷后，你发现中间有气泡。应该怎么做？',
    choices: [
      { label: 'A', text: '展开重新来过' },
      { label: 'B', text: '用力按压卷的顶部把气泡挤破' },
      { label: 'C', text: '在完成卷制前，用竹帘轻轻挤压并重新塑形' },
      { label: 'D', text: '不用管——切的时候气泡就会消失' },
    ],
  },
  'demo-q11': {
    questionText: '切卷寿司时，寿司被压碎了。米饭粘在刀上并被扯散。哪种组合方法能解决根本问题？',
    choices: [
      { label: 'A', text: '用锯齿刀慢慢切' },
      { label: 'B', text: '每次切之前用水润湿刀刃，使用拉切动作而不是向下压切' },
      { label: 'C', text: '把卷放冰箱冷冻5分钟，然后用干刀切' },
      { label: 'D', text: '先用竹帘把卷压扁一些，然后用任何快刀来切' },
    ],
  },
  'demo-q12': {
    questionText: '标准卷寿司应该切成几块？均匀切割的技巧是什么？',
    choices: [
      { label: 'A', text: '6块——先切成两半，每半再切成三等分' },
      { label: 'B', text: '8块——先切两半，每半再切两半，每个四分之一再切两半' },
      { label: 'C', text: '6或8块——先切成两半，然后将两半并排放在一起同时切割，确保大小一致' },
      { label: 'D', text: '10块——先用刀尖标出等距的位置，再切' },
    ],
  },
  'demo-q13': {
    questionText: '切好的卷寿司沿接缝处裂开了。米饭和馅料看起来都没问题。最可能的根本原因是什么？',
    choices: [
      { label: 'A', text: '海苔不新鲜或者吸收了太多米饭的水分' },
      { label: 'B', text: '远端没有留出足够的空白海苔来封卷' },
      { label: 'C', text: '馅料太重了' },
      { label: 'D', text: '刀太钝了' },
    ],
  },
  'demo-q14': {
    questionText: '你在潮湿的厨房做卷寿司。海苔在你卷完之前就变软了。在不更换食材的情况下，哪种方法最能解决这个问题？',
    choices: [
      { label: 'A', text: '加快速度——先准备好所有馅料，每卷在60秒内完成' },
      { label: 'B', text: '使用前在火焰上烤一下海苔，未使用的海苔放在密封袋中并加入干燥剂' },
      { label: 'C', text: '用两张海苔叠在一起' },
      { label: 'D', text: '使用前先将海苔放入冰箱冷藏' },
    ],
  },
  'demo-q15': {
    questionText: '一个学生在做卷寿司，反映说："切之前卷看起来很好，但一切就散了。"米饭的质地正确，海苔也很新鲜。你应该首先检查什么？',
    choices: [
      { label: 'A', text: '是否馅料放得不够多' },
      { label: 'B', text: '卷的力度——很可能卷得太松，层与层之间有空隙' },
      { label: 'C', text: '使用的竹帘类型' },
      { label: 'D', text: '切之前是否等了足够长的时间' },
    ],
  },
  'demo-q16': {
    questionText: '反卷（uramaki）与普通卷寿司有什么不同？',
    choices: [
      { label: 'A', text: '它使用糙米而不是白米' },
      { label: 'B', text: '米饭在外面，海苔在里面' },
      { label: 'C', text: '它完全不使用海苔' },
      { label: 'D', text: '它上面总是浇有酱汁' },
    ],
  },
  'demo-q17': {
    questionText: '制作反卷时，在海苔上铺好米饭后，下一步是什么？',
    choices: [
      { label: 'A', text: '在米饭上面放馅料' },
      { label: 'B', text: '将海苔翻面，使米饭朝下' },
      { label: 'C', text: '立即开始卷' },
      { label: 'D', text: '在上面再加一张海苔' },
    ],
  },
  'demo-q18': {
    questionText: '为什么制作反卷时要在竹帘上铺保鲜膜？',
    choices: [
      { label: 'A', text: '为了保持竹帘清洁以便重复使用' },
      { label: 'B', text: '防止现在在外面的米饭粘在竹帘上' },
      { label: 'C', text: '增加额外的压力使卷更紧' },
      { label: 'D', text: '保鲜膜是可选的，只有初学者才用' },
    ],
  },
  'demo-q19': {
    questionText: '制作反卷时，保鲜膜应该怎样铺在竹帘上？',
    choices: [
      { label: 'A', text: '松散地盖在上面' },
      { label: 'B', text: '紧紧地包裹整个竹帘，没有褶皱' },
      { label: 'C', text: '只覆盖竹帘中间的三分之一' },
      { label: 'D', text: '铺在竹帘下面，而不是上面' },
    ],
  },
  'demo-q20': {
    questionText: '你正在给反卷的外面撒芝麻。什么时候加芝麻最好？',
    choices: [
      { label: 'A', text: '卷好并切好之后' },
      { label: 'B', text: '卷之前——在米饭还平铺在竹帘上时撒上' },
      { label: 'C', text: '卷的过程中——边卷边撒' },
      { label: 'D', text: '先把芝麻泡水，切好后再压上去' },
    ],
  },
  'demo-q21': {
    questionText: '鱼子（tobiko）切好后总是从反卷上掉下来。什么技巧能解决这个问题？',
    choices: [
      { label: 'A', text: '多放些米饭，让鱼子有更粘的表面' },
      { label: 'B', text: '卷好后、切之前，用竹帘轻轻将鱼子压入米饭中' },
      { label: 'C', text: '把鱼子混入米饭中再铺' },
      { label: 'D', text: '加鱼子之前先涂一层蛋黄酱作为粘合剂' },
    ],
  },
  'demo-q22': {
    questionText: '你正在设计一款新的反卷。哪种馅料组合能创造最佳的口感对比？',
    choices: [
      { label: 'A', text: '奶油芝士、牛油果和芒果' },
      { label: 'B', text: '天妇罗虾、黄瓜和牛油果' },
      { label: 'C', text: '三种生鱼片' },
      { label: 'D', text: '米饭、豆腐和牛油果' },
    ],
  },
  'demo-q23': {
    questionText: '搭配反卷馅料时，为什么加入脆口食材（如黄瓜或天妇罗）很重要？',
    choices: [
      { label: 'A', text: '脆口食材能吸收多余的水分' },
      { label: 'B', text: '它们提供结构支撑，使卷保持形状' },
      { label: 'C', text: '口感对比使每一口都更有层次感，这是寿司搭配的关键原则' },
      { label: 'D', text: '这是必须遵守的传统规则' },
    ],
  },
  'demo-q24': {
    questionText: '你正在制作一个反卷，馅料是辣金枪鱼（湿）、奶油芝士（软）和芒果（多汁）。所有馅料水分都很重。最佳的结构策略是什么？',
    choices: [
      { label: 'A', text: '多放米饭来吸收水分' },
      { label: 'B', text: '在湿馅料和海苔之间加一条细黄瓜条作为隔水层，同时略微减少米饭量使卷更紧实' },
      { label: 'C', text: '组装前将所有馅料冷藏至非常冷' },
      { label: 'D', text: '用两张海苔叠在一起' },
    ],
  },
  'demo-q25': {
    questionText: '反卷总是失去圆形，变成椭圆形。米饭的量是正确的。技术上应该怎样修正？',
    choices: [
      { label: 'A', text: '卷的时候向自己方向拉竹帘，卷得更紧' },
      { label: 'B', text: '卷好后，用竹帘轻轻从顶部和两侧按压塑形，先压方再修圆' },
      { label: 'C', text: '用更厚的保鲜膜增加缓冲' },
      { label: 'D', text: '让卷接缝朝下静置5分钟再处理' },
    ],
  },
  'demo-q26': {
    questionText: '你正在装盘8块龙卷（反卷上铺牛油果片）。哪种摆放方式能最大化视觉冲击力？',
    choices: [
      { label: 'A', text: '在盘子上排成一条直线' },
      { label: 'B', text: '排成两排，每排4块' },
      { label: 'C', text: '排成轻微的S形曲线模拟龙的身体，两端的寿司块倾斜以暗示龙头和龙尾' },
      { label: 'D', text: '堆成金字塔形' },
    ],
  },
  'demo-q27': {
    questionText: '给装盘的反卷淋酱汁时，哪种技巧展现了专业水准的摆盘？',
    choices: [
      { label: 'A', text: '均匀地将酱汁浇在所有寿司块上' },
      { label: 'B', text: '酱汁放在旁边的小碟子里' },
      { label: 'C', text: '用挤瓶在寿司和盘子上画细细的对角线，交替使用两种互补的酱汁' },
      { label: 'D', text: '装盘前先把每块寿司蘸上酱汁' },
    ],
  },
  'demo-q28': {
    questionText: '正确制作的手卷（temaki）应该是什么形状？',
    choices: [
      { label: 'A', text: '圆柱形，像卷寿司一样' },
      { label: 'B', text: '锥形，像冰淇淋甜筒' },
      { label: 'C', text: '扁平的卷饼状' },
      { label: 'D', text: '方形小袋' },
    ],
  },
  'demo-q29': {
    questionText: '制作手卷锥形时，哪只手握海苔？',
    choices: [
      { label: 'A', text: '惯用手' },
      { label: 'B', text: '非惯用手——它托着海苔，惯用手负责放馅料和塑形' },
      { label: 'C', text: '双手同时' },
      { label: 'D', text: '不用握——海苔放在砧板上' },
    ],
  },
  'demo-q30': {
    questionText: '制作单个手卷通常使用多大的海苔？',
    choices: [
      { label: 'A', text: '整张' },
      { label: 'B', text: '半张' },
      { label: 'C', text: '四分之一张' },
      { label: 'D', text: '细长条' },
    ],
  },
  'demo-q31': {
    questionText: '为什么海苔的新鲜度对手卷比卷寿司更重要？',
    choices: [
      { label: 'A', text: '手卷用的海苔更多' },
      { label: 'B', text: '手卷是用手吃的，不新鲜的海苔太韧，咬不断' },
      { label: 'C', text: '手卷的海苔味道更明显' },
      { label: 'D', text: '其实一样——新鲜度对所有类型都同样重要' },
    ],
  },
  'demo-q32': {
    questionText: '你的手卷总是溢出来，锥形合不上。最可能的问题是什么？',
    choices: [
      { label: 'A', text: '海苔片太小了' },
      { label: 'B', text: '米饭放得太多了——手卷只需要薄薄一层，大约2汤匙' },
      { label: 'C', text: '馅料需要切得更小' },
      { label: 'D', text: '需要卷得更紧' },
    ],
  },
  'demo-q33': {
    questionText: '在比例恰当的手卷中，馅料应该延伸到哪里？',
    choices: [
      { label: 'A', text: '与锥形顶部齐平' },
      { label: 'B', text: '略高于海苔锥形，像扇子一样展开' },
      { label: 'C', text: '在边缘以下，从外面看不到' },
      { label: 'D', text: '大量溢出以增加视觉效果' },
    ],
  },
  'demo-q34': {
    questionText: '怎样封住手卷底部的尖端，防止馅料掉出来？',
    choices: [
      { label: 'A', text: '在海苔上沾一点水粘住' },
      { label: 'B', text: '卷之前在底角放一粒米饭——淀粉是天然的粘合剂' },
      { label: 'C', text: '像卷饼一样把底部折上去' },
      { label: 'D', text: '锥形本身就会自然密封' },
    ],
  },
  'demo-q35': {
    questionText: '手卷的外侧海苔瓣成型后总是松开。怎么解决？',
    choices: [
      { label: 'A', text: '捏住30秒等海苔变硬' },
      { label: 'B', text: '完成卷制前在海苔外缘涂一条细细的米饭线——淀粉能粘合海苔瓣' },
      { label: 'C', text: '用牙签固定' },
      { label: 'D', text: '用保鲜膜裹住定型' },
    ],
  },
  'demo-q36': {
    questionText: '你要为8位客人的晚宴提供手卷，每人3个。要保持海苔酥脆，最佳的上菜策略是什么？',
    choices: [
      { label: 'A', text: '提前做好全部24个，一起端上盘子' },
      { label: 'B', text: '设置一个手卷DIY台，让客人自己组装，海苔用到的时候才拆封' },
      { label: 'C', text: '分批制作，每次做8个' },
      { label: 'D', text: '每做好一个就用保鲜膜包起来保鲜' },
    ],
  },
  'demo-q37': {
    questionText: '手卷做好后，理想的食用时间窗口是多久？为什么？',
    choices: [
      { label: 'A', text: '30分钟——鱼生开始变质' },
      { label: 'B', text: '2-3分钟——之后米饭的水分会使海苔变软，无法干脆地咬断' },
      { label: 'C', text: '10分钟——餐厅标准上菜时间' },
      { label: 'D', text: '只要食材新鲜就没有时间限制' },
    ],
  },
  'demo-q38': {
    questionText: '一位客人不能吃麸质，不能用酱油。你在为他们做手卷。哪种调整方法能在无麸质的情况下保持鲜味？',
    choices: [
      { label: 'A', text: '直接不配蘸料' },
      { label: 'B', text: '用椰子氨基酸或无麸质酱油（tamari）做蘸料，并在卷内加一片紫苏叶增加风味层次' },
      { label: 'C', text: '用照烧酱代替' },
      { label: 'D', text: '多加芥末来弥补' },
    ],
  },
  'demo-q39': {
    questionText: '你想做手卷但没有海苔。哪种替代品能做出结构最稳固、味道最好的手卷？',
    choices: [
      { label: 'A', text: '冰山生菜叶——柔韧但味道寡淡且水分大' },
      { label: 'B', text: '豆皮纸（mamenori）——专门设计作为海苔替代品，保形性好，有多种口味' },
      { label: 'C', text: '米纸——需要先泡水' },
      { label: 'D', text: '薄切黄瓜片——好看但太脆弱，做不成锥形' },
    ],
  },
  'demo-q40': {
    questionText: '你在教寿司课，一个学生想做甜品手卷。哪种组合最能将手卷技巧运用到甜味食材上？',
    choices: [
      { label: 'A', text: '用海苔做锥形，填入巧克力慕斯和草莓' },
      { label: 'B', text: '用薄饼代替海苔做外皮，甜糯米做底，填入芒果、红豆沙和一片薄荷叶——模仿咸味手卷的米饭底、多样馅料、清新点缀的结构' },
      { label: 'C', text: '用碎饼干裹冰淇淋' },
      { label: 'D', text: '用果皮卷代替海苔，配普通寿司饭' },
    ],
  },
};
