export type Language = 'en' | 'zh';

const translations = {
  en: {
    // ─── Common / Navigation ─────────────────────────────────────────
    common: {
      diagnostic: 'Diagnostic',
      results: 'Results',
      practice: 'Practice',
      dashboard: 'Dashboard',
      minutes: 'minutes',
      questions: 'questions',
      adaptive: 'Adaptive',
      mastered: 'Mastered',
      developing: 'Developing',
      weak: 'Weak',
      needsWork: 'Needs Work',
      notEnoughData: 'Not Enough Data',
      accuracy: 'Accuracy',
      correct: 'correct',
      totalTime: 'total time',
      skillsAssessed: 'skills assessed',
      points: 'Points',
    },

    // ─── Homepage ────────────────────────────────────────────────────
    home: {
      heroTitle: 'Skill Mastery',
      heroSubtitle: 'Diagnostic',
      heroDescription: 'Adaptive diagnostic pinpoints exactly which skills you\'ve mastered and which need work. Then practice only what matters.',
      free: 'Free',
      always: 'always',
      startFree: 'Start Free Diagnostic',
      noAccount: 'No account required',
      howItWorks: 'How It Works',
      step1Title: 'Diagnostic',
      step1Desc: 'Take a free adaptive assessment that identifies your weak spots.',
      step2Title: 'Results',
      step2Desc: 'Get a skill-by-skill breakdown showing exactly what to work on.',
      step3Title: 'Practice',
      step3Desc: 'Focus only on skills you need to improve with targeted practice.',
      getStarted: 'Get Started',
      topicsCovered: 'Topics Covered',
    },

    // ─── Diagnostic Page ─────────────────────────────────────────────
    diagnostic: {
      title: 'Skill Mastery Diagnostic',
      subtitle: 'Discover exactly what you know and what you need to learn',
      detailed: 'Detailed',
      report: 'report',
      whatYouGet: 'What you\'ll get:',
      benefit1: 'Skill-by-skill breakdown of your strengths and weaknesses',
      benefit2: 'Personalized practice recommendations based on your gaps',
      benefit3: 'Questions that adapt to your level in real time',
      startDiagnostic: 'Start Diagnostic',
      preparing: 'Preparing your diagnostic...',
      noAccountNote: 'No account required. Results saved automatically.',
      topicsCovered: 'Topics Covered',
      question: 'Question',
      complete: 'Diagnostic Complete!',
      answeredQuestions: 'You answered {count} questions in {minutes}m {seconds}s',
      toImprove: 'To Improve',
      viewResults: 'View Your Results',
    },

    // ─── Results Page ────────────────────────────────────────────────
    results: {
      title: 'Your Diagnostic Report',
      byTopic: 'By Topic',
      strengths: 'Your Strengths',
      areasToImprove: 'Areas to Improve',
      skillBreakdown: 'Skill-by-Skill Breakdown',
      recommendedPath: 'Recommended Practice Path',
      recommendedDesc: 'Work through these in order for the fastest improvement',
      startPracticing: 'Start Practicing',
      retakeDiagnostic: 'Retake Diagnostic',
    },

    // ─── Practice Page ───────────────────────────────────────────────
    practice: {
      title: 'Practice',
      subtitle: 'Focus on your weak skills with targeted practice',
      takeDiagnosticFirst: 'Take the Diagnostic First',
      takeDiagnosticDesc: 'Complete the diagnostic to get personalized practice recommendations based on your weak skills.',
      takeDiagnostic: 'Take Diagnostic',
      skillsToPractice: 'Skills to Practice',
      skillsToImprove: '{count} skill(s) to improve',
      accuracyLabel: 'accuracy',
      attempted: 'attempted',
      review: 'Review',
      emptyState: 'Your personalized practice plan will appear here after the diagnostic.',
    },

    // ─── Dashboard Page ──────────────────────────────────────────────
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Track your progress',
      skillMastery: 'Skill Mastery',
      fullReport: 'Full Report',
      emptySkills: 'Complete a diagnostic to see your skill mastery',
      quickActions: 'Quick Actions',
      takeDiagnostic: 'Take Diagnostic',
      retakeDiagnostic: 'Retake Diagnostic',
      practiceWeak: 'Practice Weak Skills',
      viewFullReport: 'View Full Report',
      noResults: 'No Diagnostic Results Yet',
      noResultsDesc: 'Take the diagnostic to see your personalized skill breakdown',
      startDiagnostic: 'Start Diagnostic',
    },

    // ─── Question Card ───────────────────────────────────────────────
    questionCard: {
      question: 'Question',
      selectAll: 'Select all that apply',
      yourAnswer: 'Your Answer',
      placeholder: 'Enter your answer here...',
      showHint: 'Show Hint',
      hideHint: 'Hide Hint',
      submitting: 'Submitting...',
      submit: 'Submit Answer →',
    },

    // ─── Lesson Page ─────────────────────────────────────────────────
    lesson: {
      title: 'AI Lesson',
      placeholder: 'Ask a question...',
      send: 'Send',
      thinking: 'Thinking...',
      backToResults: 'Back to Results',
      startLesson: 'Start Lesson',
    },

    // ─── Session Page ────────────────────────────────────────────────
    session: {
      title: 'Live Session',
      subtitle: 'Join or create a live tutoring session with video and whiteboard',
      tutor: 'Tutor',
      student: 'Student',
      roomName: 'Room Name',
      roomPlaceholder: 'e.g., sushi-lesson-101',
      yourName: 'Your Name',
      namePlaceholder: 'Enter your name',
      createAndJoin: 'Create & Join',
      joinSession: 'Join Session',
      connecting: 'Connecting...',
      shareRoom: 'Share the room name with students so they can join the same session.',
      participants: 'participant(s)',
      waitingForParticipants: 'Waiting for participants...',
      fillAllFields: 'Please fill in all fields',
      bookSession: 'Book a Live Session',
    },
  },

  zh: {
    // ─── Common / Navigation ─────────────────────────────────────────
    common: {
      diagnostic: '诊断测试',
      results: '测试结果',
      practice: '针对练习',
      dashboard: '学习面板',
      minutes: '分钟',
      questions: '题目',
      adaptive: '自适应',
      mastered: '已掌握',
      developing: '发展中',
      weak: '薄弱',
      needsWork: '需加强',
      notEnoughData: '数据不足',
      accuracy: '正确率',
      correct: '正确',
      totalTime: '总用时',
      skillsAssessed: '已评估技能',
      points: '积分',
    },

    // ─── Homepage ────────────────────────────────────────────────────
    home: {
      heroTitle: '技能掌握',
      heroSubtitle: '诊断测试',
      heroDescription: '自适应诊断精确识别您已掌握和需要加强的技能，只练习最重要的内容。',
      free: '免费',
      always: '永久',
      startFree: '开始免费诊断',
      noAccount: '无需注册账号',
      howItWorks: '使用流程',
      step1Title: '诊断测试',
      step1Desc: '参加免费的自适应评估，识别您的薄弱环节。',
      step2Title: '查看结果',
      step2Desc: '获得逐项技能分析，精确了解需要改进的方向。',
      step3Title: '针对练习',
      step3Desc: '只专注于需要提高的技能，进行有针对性的练习。',
      getStarted: '立即开始',
      topicsCovered: '涵盖主题',
    },

    // ─── Diagnostic Page ─────────────────────────────────────────────
    diagnostic: {
      title: '技能掌握诊断',
      subtitle: '精确了解您的知识掌握程度',
      detailed: '详细',
      report: '报告',
      whatYouGet: '您将获得：',
      benefit1: '逐项技能分析，展示您的优势与不足',
      benefit2: '基于薄弱环节的个性化练习建议',
      benefit3: '实时自适应调整的智能题目',
      startDiagnostic: '开始诊断',
      preparing: '正在准备您的诊断...',
      noAccountNote: '无需注册账号，结果自动保存。',
      topicsCovered: '涵盖主题',
      question: '第{number}题',
      complete: '诊断完成！',
      answeredQuestions: '您回答了 {count} 道题，用时 {minutes}分{seconds}秒',
      toImprove: '待提高',
      viewResults: '查看测试结果',
    },

    // ─── Results Page ────────────────────────────────────────────────
    results: {
      title: '您的诊断报告',
      byTopic: '按主题分类',
      strengths: '您的优势',
      areasToImprove: '待提高领域',
      skillBreakdown: '逐项技能分析',
      recommendedPath: '推荐练习路径',
      recommendedDesc: '按顺序完成以下练习，获得最快提升',
      startPracticing: '开始练习',
      retakeDiagnostic: '重新诊断',
    },

    // ─── Practice Page ───────────────────────────────────────────────
    practice: {
      title: '针对练习',
      subtitle: '专注于薄弱技能，进行有针对性的练习',
      takeDiagnosticFirst: '请先完成诊断测试',
      takeDiagnosticDesc: '完成诊断测试后，将根据您的薄弱技能生成个性化练习建议。',
      takeDiagnostic: '开始诊断',
      skillsToPractice: '待练习技能',
      skillsToImprove: '{count} 项技能待提高',
      accuracyLabel: '正确率',
      attempted: '已作答',
      review: '复习',
      emptyState: '完成诊断测试后，您的个性化练习计划将显示在这里。',
    },

    // ─── Dashboard Page ──────────────────────────────────────────────
    dashboard: {
      title: '学习面板',
      subtitle: '跟踪您的学习进度',
      skillMastery: '技能掌握度',
      fullReport: '完整报告',
      emptySkills: '完成诊断测试后查看技能掌握情况',
      quickActions: '快捷操作',
      takeDiagnostic: '开始诊断',
      retakeDiagnostic: '重新诊断',
      practiceWeak: '练习薄弱技能',
      viewFullReport: '查看完整报告',
      noResults: '暂无诊断结果',
      noResultsDesc: '完成诊断测试后查看个性化技能分析',
      startDiagnostic: '开始诊断',
    },

    // ─── Question Card ───────────────────────────────────────────────
    questionCard: {
      question: '第{number}题',
      selectAll: '选择所有正确答案',
      yourAnswer: '您的答案',
      placeholder: '请在此输入您的答案...',
      showHint: '显示提示',
      hideHint: '隐藏提示',
      submitting: '提交中...',
      submit: '提交答案 →',
    },

    // ─── Lesson Page ─────────────────────────────────────────────────
    lesson: {
      title: 'AI 课程',
      placeholder: '提问...',
      send: '发送',
      thinking: '思考中...',
      backToResults: '返回结果',
      startLesson: '开始学习',
    },

    // ─── Session Page ────────────────────────────────────────────────
    session: {
      title: '在线课堂',
      subtitle: '加入或创建带有视频和白板的在线辅导课堂',
      tutor: '老师',
      student: '学生',
      roomName: '房间名称',
      roomPlaceholder: '例如：寿司课程-101',
      yourName: '您的姓名',
      namePlaceholder: '请输入姓名',
      createAndJoin: '创建并加入',
      joinSession: '加入课堂',
      connecting: '连接中...',
      shareRoom: '将房间名称分享给学生，他们即可加入同一课堂。',
      participants: '位参与者',
      waitingForParticipants: '等待参与者加入...',
      fillAllFields: '请填写所有字段',
      bookSession: '预约在线课堂',
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
export default translations;
