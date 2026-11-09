import type { AuthorId } from "@/content/authors";
import type { Locale } from "@/i18n/routing";

export interface Post {
  slug: string;
  /** 写作角色(笔名署名,必填):决定全文语气与选题边界,角色卡见 docs/personas/ */
  author: AuthorId;
  date: string; // 首发
  updated: string; // 最后更新(EEAT:展示维护状态)
  image?: string; // 题图(public/blog);缺省时列表卡片用标题占位
  i18n: Partial<Record<Locale, { title: string; description: string }>>;
}


export function getPostMeta(slug: string, locale: Locale) {
  const post = POSTS.find((p) => p.slug === slug);
  return post ? (post.i18n[locale] ?? post.i18n.en) : undefined;
}

/** 博客索引:新增文章在 src/content/blog/<slug>.<locale>.mdx 建文件并注册到 registry 后,在此登记。
 *  author 必填:先按选题选角色(docs/personas/),再按该角色卡的文风写作。 */
export const POSTS: Post[] = [
  {
    slug: "what-does-your-handwriting-say-about-you",
    author: "mara-voss",
    date: "2026-10-08",
    updated: "2026-10-27",
    image: "/blog/adult-practice.webp",
    i18n: { en: {
        title: "What does your handwriting say about you? The honest guide",
        description:
          "The five features people read in handwriting — slant, size, spacing, baseline, pressure — what science actually says, and how to change the habits you don't like.",
      } },
  },
  {
    slug: "handwritten-card-with-voice",
    author: "june-park",
    date: "2026-10-06",
    updated: "2026-10-13",
    image: "/blog/template-love.webp",
    i18n: { en: {
        title: "Write a greeting card with your voice in 3 minutes",
        description:
          "No calligraphy skills needed. Speak your wishes on a web page, pick a font and paper, export and print — with ready-to-use card copy ideas.",
      }, zh: {
        title: "用声音写贺卡:3 分钟生成一张手写贺卡",
        description:
          "不会写毛笔字也能送出手写贺卡。打开网页说一段祝福,选好字体纸张,导出打印即可,附赠文案思路。",
      }, },
  },
  {
    slug: "handwriting-image-generator",
    author: "theo-lindgren",
    date: "2026-10-06",
    updated: "2026-10-07",
    image: "/blog/workspace.webp",
    i18n: { en: {
        title: "Handwriting image generator tutorial: speak, don't type",
        description:
          "Why voice input beats typing for handwriting images, plus tuning tips for realism, paper and ink settings.",
      }, zh: {
        title: "你的字迹说明了什么?读得出习惯,读不出性格",
        description:
          "字迹读得出习惯,读不出性格。1989 年 Neter 与 Ben-Shakhar 的荟萃分析里,笔迹师不比瞎猜更准。字号和占格用田字格练,签名另练。",
      }, },
  },
  {
    slug: "xiaohongshu-handwritten-images",
    author: "theo-lindgren",
    date: "2026-10-06",
    updated: "2026-10-07",
    image: "/blog/templates.webp",
    i18n: { en: {
        title: "Handwritten quote cards for social media, done in a browser",
        description:
          "Handwritten quote images get high engagement on social platforms. Batch-produce them with voice input, with cover and layout tips.",
      }, zh: {
        title: "小红书手写文案配图怎么做?一个浏览器搞定",
        description:
          "手写风文案图是小红书的高互动形式。教你用声音转手写工具批量产出金句卡片,含封面与排版建议。",
      }, },
  },
  {
    slug: "audio-to-handwriting",
    author: "theo-lindgren",
    date: "2026-10-07",
    updated: "2026-10-07",
    i18n: { en: {
        title: "Transcribe recordings into handwritten notes, free and local",
        description:
          "Upload an audio file and transcribe it with in-browser Whisper, then export as handwriting. Zero cost, audio never uploaded — with real test results and honest limitations.",
      }, zh: {
        title: "录音怎么免费转成手写笔记?浏览器本地方案实测",
        description:
          "上传音频文件,在浏览器本地用 Whisper 转写成文字再排版手写。零成本、音频不上传,含实测结果与诚实的局限说明。",
      }, },
  },
  {
    slug: "handwriting-templates-guide",
    author: "theo-lindgren",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/templates.webp",
    i18n: { en: {
        title: "Handwriting template library: six scenarios, pick one and write",
        description:
          "Love letters, apologies, thank-you notes, birthdays, Teachers' Day, New Year — copy and handwriting style in one tap, ready to export.",
      }, zh: {
        title: "手写体图片在线生成教程:不打字,说出来就行",
        description:
          "对比打字型手写体工具,介绍语音输入生成手写体图片的方法,以及仿真度、纸张、墨色的调参技巧。",
      }, },
  },
];

/** 面向美国用户的长尾词文章;各文章可用语言以 blog/registry 注册为准(2026-11-09 恢复双语:28 篇有 zh 正文) */
const US_POSTS: Post[] = [
  {
    slug: "name-tracing-generator",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/tracing-worksheet.webp",
    i18n: {
      en: {
        title: "Free name tracing generator: editable worksheets to print",
        description:
          "Type any name, print a personalized tracing worksheet in seconds — example row, light-gray tracing, three-line guides, free PDF. No signup.",
      }, zh: {
        title: "名字描红生成器:免费可打印的个性化练习纸",
        description:
          "输入任意名字,几秒生成可打印的个性化描红练习纸——深色示例行、浅灰描红、三线格,免费 PDF,无需注册、无水印。",
      },
    },
  },
  {
    slug: "free-printable-lined-paper",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-13",
    image: "/blog/lined-paper.webp",
    i18n: {
      en: {
        title: "Free printable lined paper: college, wide, graph & 3-line",
        description:
          "Print college-ruled, wide-ruled, graph and three-line handwriting paper on Letter or A4 — choose line color and spacing, download a crisp free PDF.",
      }, zh: {
        title: "免费打印横线纸:窄行距、宽行距、方格与三线",
        description:
          "免费打印窄行距、宽行距、方格与三线写字纸:支持 Letter 与 A4 纸张,行距、线条颜色和红色边线都可以自定义,页面按打印机分辨率绘制,线条清晰锐利,无需注册、没有水印,在家就能打印,PDF 数量不限。",
      },
    },
  },
  {
    slug: "cursive-practice-worksheets",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "Custom cursive practice worksheets, free and printable",
        description:
          "Generate cursive practice sheets from any name or sentence with real cursive fonts, three-line guides and free PDF downloads.",
      }, zh: {
        title: "自定义英文草书练习字帖,免费可打印",
        description:
          "输入任意姓名或句子,即可生成英文草书(连笔英文)练习字帖:内置真实的草书字体与三线格引导线,可免费下载 PDF。全部在你的浏览器中生成,输入的内容不会上传,打印后即可开始每天 15 分钟的描红与抄写练习。",
      },
    },
  },
  {
    slug: "kindergarten-handwriting-paper",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-13",
    image: "/blog/handwriting-paper.webp",
    i18n: {
      en: {
        title: "Kindergarten handwriting paper: the three lines, explained",
        description:
          "What the top, dashed and bottom lines teach, tall/small/tail letter families, and free printable three-line handwriting paper for kindergarten.",
      }, zh: {
        title: "幼儿园三线格书写纸:三条线详解",
        description:
          "孩子在幼儿园写的每个字母,都落在这三条线上:顶线留给高字母,中间的虚线决定小写字母的个子,底线让每个字母站稳、带尾巴的字母向下钻。分清高字母、小字母、下降字母三个家族,然后在家免费打印幼儿园用的三线格书写纸。",
      },
    },
  },
  {
    slug: "letter-to-santa-template",
    author: "june-park",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/santa-letter.webp",
    i18n: {
      en: {
        title: "Free printable letter to Santa template (kids can write it)",
        description:
          "A print-ready letter to Santa template: speak or type the words, print in a friendly handwriting font, add a traced signature. Free PDF.",
      }, zh: {
        title: "给圣诞老人的信模板:免费打印,孩子自己写",
        description:
          "一份可以直接打印的给圣诞老人的信模板:让孩子说出或输入想写的话,挑选手写风格的字体打印出来,再配上一页描红签名练习。整个过程在浏览器里完成,语音识别不上传任何内容,导出 PDF 免费、无水印,无需注册账号,Letter 和 A4 纸都能全质量打印。",
      },
    },
  },
  {
    slug: "handwritten-thank-you-notes",
    author: "june-park",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/thank-you-note.webp",
    i18n: {
      en: {
        title: "How to write a thank you note people keep (with examples)",
        description:
          "The four-part thank you note formula with copy-ready examples for weddings, interviews and teachers — plus options if your handwriting is bad.",
      }, zh: {
        title: "感谢卡怎么写:四段式公式与可直接抄用的范例",
        description:
          "一张手写的感谢卡,说的是「你值得我花二十分钟和一张邮票」。本文给出四段式公式,以及婚礼、求职面试、答谢老师等场合可直接抄用的范例;如果嫌自己的字不好看,还有放慢速度、横格纸打底、手写字体打印三个补救办法可用。",
      },
    },
  },
  {
    slug: "diy-wedding-calligraphy",
    author: "june-park",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/wedding-script.webp",
    i18n: {
      en: {
        title: "DIY wedding calligraphy: place cards & signs without a pro",
        description:
          "Calligraphy-style place cards, menus, signs and vow keepsakes from your own printer — script fonts, cardstock tips and the window-tracing trick.",
      }, zh: {
        title: "DIY 婚礼书法:自己动手做席位卡与指示牌",
        description:
          "婚礼席位卡、菜单、迎宾牌和誓词纪念品,不必请书法师:用免费的手写体工具排好版,自家打印机或图文店就能输出。字体怎么选、卡纸怎么印、一百个名字如何保持同一斜度——窗户描字法一次讲清。免费、无需注册,当天就能出成品。",
      },
    },
  },
  {
    slug: "pen-pal-letters-for-kids",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/pen-pal-letter.webp",
    i18n: {
      en: {
        title: "Pen pal letters for kids: friendly letter format & prompts",
        description:
          "The five parts of a friendly letter, prompt ideas that get replies, and free printable pen pal paper matched to your child's handwriting.",
      }, zh: {
        title: "手写模板库:6 个场景,选一个就能写",
        description:
          "情书、道歉信、感谢信、生日、教师节、新年——6 个场景的手写模板,文案与样式一键套用,改几个字就能导出。",
      },
    },
  },
  {
    slug: "how-to-improve-handwriting-adults",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-12",
    image: "/blog/adult-practice.webp",
    i18n: {
      en: {
        title: "How to improve your handwriting as an adult: 4-week plan",
        description:
          "Diagnose size, spacing, slant and baseline, then drill with a 15-minute daily plan — free custom practice sheets from your own sentences.",
      }, zh: {
        title: "成年人如何练好字:4周计划",
        description:
          "成年人练字不必从零开始:先诊断字的大小、间距、倾斜和基线,找出问题所在,再按每天15分钟的四周计划针对性练习——并用你自己的句子免费生成定制练字帖,打开浏览器即可使用,输入的内容不会上传,坚持四周就能写出更清晰整齐的字。",
      },
    },
  },
  {
    slug: "handwriting-practice-struggling-writers",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/tracing-worksheet.webp",
    i18n: {
      en: {
        title: "Handwriting for struggling writers (dysgraphia-friendly)",
        description:
          "Low-pressure handwriting adjustments for kids who fight the pencil: taller bands, light-gray tracing, short sessions and voice input.",
      }, zh: {
        title: "写字吃力孩子的练字方法(书写障碍友好)",
        description:
          "孩子一练字就握紧笔、掉眼泪?我们整理了作业治疗师常用的低压力调整:更高的书写格、浅灰描红行、更短的练习时间和语音输入。附免费可打印的三线格练字纸与名字描红生成器,帮书写障碍的孩子按自己的节奏练出信心。",
      },
    },
  },
];

POSTS.push(...US_POSTS);

/** /cursive 落地页配套的 cursive 词簇长尾文章,按 E-E-A-T 结构撰写 */
const CURSIVE_POSTS: Post[] = [
  {
    slug: "how-to-write-in-cursive",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "How to write in cursive: a beginner's guide that works",
        description:
          "Learn cursive from scratch: the four strokes, letter families, connection rules and a 30-day plan — with free printable practice sheets.",
      }, zh: {
        title: "儿童笔友信:友好信件格式、写作提示与免费信纸",
        description:
          "笔友信怎么写?我们整理了美国学校教的友好信件五部分格式、能让对方想回信的提问示例,以及行距和线条颜色都能自由调节的免费可打印信纸,帮孩子的书写保持在横线内;名字描红页还能顺便练签名。",
      },
    },
  },
  {
    slug: "cursive-alphabet-chart",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-11-02",
    image: "/blog/cursive-alphabet.webp",
    i18n: {
      en: {
        title: "The cursive alphabet, organized the way you'll learn it",
        description:
          "Every cursive letter grouped into stroke families — lowercase and capitals, the five letters that cause most mistakes, plus a free printable chart.",
      }, zh: {
        title: "英文连笔怎么写:真正有效的初学者指南",
        description:
          "从零开始学英文连笔:按手写老师的教学顺序,先练四种基本笔画,再按字母家族(而非字母表顺序)掌握字母,讲清连接规则,并给出可执行的30天计划——每天10~15分钟即可,练习时可随时输入单词,免费生成练字帖并打印描摹。",
      },
    },
  },
  {
    slug: "cursive-name-signature",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-10",
    image: "/blog/cursive-signature.webp",
    i18n: {
      en: {
        title: "How to write your name in cursive (and build a signature)",
        description:
          "Two-stage method: write your name in legible cursive with printable tracing sheets, then design a signature you can actually reproduce.",
      }, zh: {
        title: "如何用英文连笔写自己的名字(并练出签名)",
        description:
          "两阶段练习法:先用可在线生成、免费打印的描红字帖,把你的名字写成清晰可读的英文连笔字——每天五分钟,一周就能稳定成形;再在此基础上设计一个快速、稳定、你真的能重复写出来的签名。",
      },
    },
  },
  {
    slug: "is-cursive-still-taught",
    author: "mara-voss",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "Is cursive still taught in schools? The state of cursive",
        description:
          "Cursive left Common Core in 2010 and has been coming back since 2016 — which states require it now, what research says, and what to do about it.",
      }, zh: {
        title: "学校还教英文草书吗?美国草书教学现状",
        description:
          "英文草书在 2010 年被 Common Core(美国共同核心州立标准)移出,自 2016 年起在美国各州陆续回归。现在哪些州要求教草书?研究实际发现了什么?家长、孩子和成年人分别该怎么练?这篇文章一次讲清楚。",
      },
    },
  },
  {
    slug: "cursive-vs-print",
    author: "mara-voss",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "Cursive vs print: which handwriting style should you learn?",
        description:
          "Speed, legibility, learning curve and what studies actually show — an honest comparison of cursive and print handwriting.",
      }, zh: {
        title: "英文连笔字还是印刷体?该学哪种手写方式?",
        description:
          "连笔字和印刷体,到底该练哪个?我们从速度、易读性、学习曲线和日常实用性出发,诚实地对比两种英文手写方式,并整理研究的实际发现:决定书写水平的是熟练度,而非字体选择,而大多数成年人其实两种都用得上。文中还给出用同一句话同时练习两种字体的方法。",
      },
    },
  },
  {
    slug: "how-to-teach-cursive-kids",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-13",
    image: "/blog/tracing-cursive.webp",
    i18n: {
      en: {
        title: "How to teach cursive writing to kids at home (10 min)",
        description:
          "Readiness signs, letter-family teaching order, and 10-minute lessons with free printable cursive practice sheets for every step.",
      }, zh: {
        title: "如何在家教孩子写英文连笔字(10分钟小课)",
        description:
          "孩子什么时候适合学英文连笔字、字母按什么顺序教、每次10分钟的一课怎么上——这里有准备信号、字母家族教学顺序和课程结构,每一步都配免费可打印的连笔字练习纸。",
      },
    },
  },
  {
    slug: "handwriting-vs-typing-brain",
    author: "mara-voss",
    date: "2026-10-08",
    updated: "2026-10-08",
    image: "/blog/handwriting-vs-typing-brain.webp",
    i18n: {
      en: {
        title: "Handwriting vs typing: what the brain research actually says",
        description:
          "EEG studies, the Mueller & Oppenheimer note-taking debate, and what research does — and doesn't — say about handwriting and cognitive decline.",
      }, zh: {
        title: "按学习方式整理的英文草书字母表(免费打印图表)",
        description:
          "把所有英文草书字母按笔画家族分组:小写与大写全覆盖,单独点出最容易写错的五个字母,并附免费可打印的字母表图表。把任意字母行输入草书生成器,选好字体和字号,即可下载 PDF 打印描红,按家族逐组练习。",
      },
    },
  },
  {
    slug: "how-to-improve-your-handwriting",
    author: "wes-morales",
    date: "2026-10-08",
    updated: "2026-10-08",
    image: "/blog/improve-your-handwriting.webp",
    i18n: {
      en: {
        title: "How to improve your handwriting: the complete guide",
        description:
          "Diagnose the four levers (size, spacing, baseline, slant), run a 15-minute daily routine, pick a model style — with free printable practice tools.",
      }, zh: {
        title: "如何改善你的字迹:完整指南",
        description:
          "诊断出大小、间距、基线、倾斜这四个杠杆中是哪一个在拖后腿,执行每天15分钟的练字流程,选定一个值得模仿的范本风格,避开白白浪费几个月的常见错误——坚持两到四周就能看到真实变化,文中所有练习工具都可以免费打印使用。",
      },
    },
  },
  {
    slug: "sight-word-tracing-worksheets",
    author: "clara-hartley",
    date: "2026-10-08",
    updated: "2026-10-08",
    i18n: {
      en: {
        title: "Sight word tracing worksheets you can print before homework",
        description:
          "A kindergarten sight word tracing sheet with exact generator settings: eight starter words, row size by age, and the same page for this week's spelling list.",
      }, zh: {
        title: "手写与打字:大脑研究究竟说了什么",
        description:
          "脑电图(EEG)研究、Mueller 与 Oppenheimer 引发的笔记方法之争,以及手写与认知衰退之间究竟是什么关系——本文梳理手写与打字对大脑影响的科学证据,区分研究真正证明了什么、还没证明什么,并告诉你如何把每天 15 分钟的手写用起来。",
      },
    },
  },
  {
    slug: "how-many-sheets-handwriting",
    author: "theo-lindgren",
    date: "2026-10-08",
    updated: "2026-10-08",
    i18n: {
      en: {
        title: "How many sheets does handwritten text take?",
        description:
          "500 words on college-ruled US Letter takes 3 sheets — about 220 words a side. The calculator settings, then what changes when you paste the real text.",
      },
    },
  },
  {
    slug: "handwriting-workbook",
    author: "wes-morales",
    date: "2026-10-08",
    updated: "2026-10-08",
    i18n: {
      en: {
        title: "A handwriting workbook built from words you actually write",
        description:
          "A two-week adult handwriting workbook: fifteen lines, the exact generator settings, and a 15-minute daily drill. Print it, then make the next one.",
      },
    },
  },
  {
    slug: "cursive-sentences-to-practice",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "Cursive sentences to practice: free printable pages",
        description:
          "Free cursive sentence worksheets by grade: ten starter sentences built on the o-b-v-w joins, plus the exact tracing and copy-page generator settings. Trace first, then copy.",
      },
    },
  },
  {
    slug: "copywork-generator",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "A free copywork generator for your homeschool",
        description:
          "Build free printable copywork pages in five minutes: page anatomy by age (5–6 tracing to 12+ paragraphs), the exact generator settings, and a week of starter passages.",
      },
    },
  },
  {
    slug: "cursive-text-generator",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "Cursive text generator: cursive you can copy and paste",
        description:
          "Type or speak your words and copy them back as cursive text — the six Unicode styles, which one works where, and why it is not a font.",
      },
    },
  },
  {
    slug: "name-tracing-with-lines",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/name-tracing-lines.webp",
    i18n: {
      en: {
        title: "Name tracing with lines: free three-line worksheets to print",
        description:
          "Why the three lines are the lesson, which row height fits which age, and how to print a personalized name tracing worksheet with lines — free PDF.",
      }, zh: {
        title: "名字描红带线条：免费三线格工作表打印",
        description:
          "三条线各自教什么、几岁用多高的行距，以及怎么用名字描红生成器打印带线条的个性化工作表——免费 PDF。",
      },
    },
  },
  {
    slug: "calligraphy-motto-cards",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/calligraphy-motto.webp",
    i18n: {
      en: {
        title: "Calligraphy motto cards: from trending phrase to card",
        description:
          "Turn 'motto of a calligraphy enthusiast' into a real card: Dancing Script, blue-black ink, blank paper — tested settings, motto copy and export sizes.",
      }, zh: {
        title: "书法风金句卡片：把座右铭做成手写卡片",
        description:
          "用语音或打字输入座右铭，Dancing Script 配蓝黑墨水与空白纸——实测参数、6 条现成文案与 Pinterest 竖版导出。",
      },
    },
  },
  {
    slug: "cursive-laws-by-state",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "Cursive laws by state (2026): where US schools must teach it",
        description:
          "An updated state-by-state table of cursive handwriting laws — bill numbers, grade levels, effective dates, and what to do if your state just added it.",
      },
    },
  },
  {
    slug: "best-cursive-fonts",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/best-cursive-fonts.webp",
    i18n: {
      en: {
        title: "Best free cursive fonts: 13 open-source picks reviewed",
        description:
          "Thirteen free cursive fonts, including signature scripts, compared by job — preview them with your text and export PNG, SVG or PDF, no install.",
      },
    },
  },
  {
    slug: "tracing-numbers-by-age",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    image: "/blog/tracing-numbers-by-age.webp",
    i18n: {
      en: {
        title: "How to teach number tracing by age, one number a night",
        description:
          "How to teach number tracing by age: ages 3 to 4 stay on lines, ages 5 to 6 trace one numeral a night, and age 7 copies with the model covered. Use the table.",
      },
    },
  },
  {
    slug: "spelling-list-word-work",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    i18n: {
      en: {
        title: "How to do word work with this week's spelling list",
        description:
          "How to do word work from four spelling words: write each three times, then fill the missing letter. What fits on Letter, and why the Dolch list does not.",
      },
    },
  },
  {
    slug: "color-a-name-before-tracing",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    i18n: {
      en: {
        title: "Color a name before tracing letters at ages 3 to 6",
        description:
          "Color a name before tracing the letters: one name, a thick outline, stars or none. Ages 3 to 4 use a crayon. Ages 5 to 6 trace the same name the next night.",
      },
    },
  },
  {
    slug: "one-character-in-the-grid",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    i18n: {
      en: {
        title: "Practice one character in the grid, one row a night",
        description:
          "Practice one character in the grid: one character, keep the cross, stop after the dark row. A4, three scripts, and why a sentence fills the squares wrong.",
      },
    },
  },
  {
    slug: "print-handwritten-letters-and-envelopes",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/print-handwritten-letters.webp",
    i18n: {
      en: {
        title: "Print a handwritten letter and envelope for three people",
        description:
          "A three-person thank-you list, Patrick Hand, US Letter notes and #10 envelopes. Free, no signup — the settings, the pages, and what the two PDFs actually contain.",
      },
    },
  },
  {
    slug: "practice-one-handwriting-problem",
    author: "wes-morales",
    date: "2026-10-12",
    updated: "2026-10-12",
    i18n: {
      en: {
        title: "How to fix one handwriting problem",
        description:
          "How to fix one handwriting problem: size, slant, spacing, or print. One sentence, three blank lines, then stop. The model is a font, not a score.",
      },
    },
  },
  {
    slug: "handwriting-worksheets",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/handwriting-worksheets.webp",
    i18n: { en: {
        title: "How to make handwriting worksheets for a whole week, tonight",
        description:
          "How to make handwriting worksheets in one sitting: what to type by age, five lists for five school days, and what the sheets will not do. Free generator, no signup.",
      }, zh: {
        title: "手写练习纸怎么排:今晚做好一周的五张",
        description:
          "怎么给孩子做手写练习纸:一次做完周一到周五的五张,分龄词表、星期到周五的清单,以及练习纸做不到的事。免费生成器,无需注册。",
      }, },
  },
  {
    slug: "numbers-in-cursive",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/numbers-in-cursive.webp",
    i18n: { en: {
        title: "Numbers in cursive: what 1 to 10 look like and how to practice them",
        description:
          "Numbers in cursive: numerals stand alone instead of joining, the loops show up in 2, 6, and 8, and the practice page prints with one number per row. Free, no signup.",
      }, zh: {
        title: "连笔里的数字:1 到 10 长什么样,怎么练",
        description:
          "连笔里的数字不连写:环在 2、6、8,7 在部分字体没有横杠;练习页一行一个数字。免费,无需注册。",
      }, },
  },
  {
    slug: "graphisme-maternelle",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/graphisme-maternelle.webp",
    i18n: {
      en: {
        title: "Graphisme: pre-writing patterns in French maternelle",
        description:
          "How French maternelle builds writing through graphisme: the strokes to train in PS, MS, and GS, the five pattern families, and free printable pre-writing sheets.",
      },
    },
  },
  {
    slug: "quiet-voice-before-handwriting",
    author: "theo-lindgren",
    date: "2026-10-16",
    updated: "2026-10-16",
    image: "/blog/quiet-voice-before-handwriting.webp",
    i18n: {
      en: {
        title: "Fix a quiet voice memo before you turn it into handwriting",
        description:
          "High-pass the rumble, peak-normalize, then boost with a limiter. Then import the file and export a handwritten page. Free, no signup.",
      },
    },
  },
  {
    slug: "handwriting-personality-test",
    author: "theo-lindgren",
    date: "2026-10-20",
    updated: "2026-10-27",
    image: "/blog/handwriting-personality-test.webp",
    i18n: {
      en: {
        title: "Handwriting personality test: pick the shapes you write",
        description:
          "A free handwriting personality test with no upload. Eight shape answers, a fictional label, and one drill to bring back to a practice sheet.",
      },
    },
  },
  {
    slug: "bubble-letters-for-a-display-name",
    author: "theo-lindgren",
    date: "2026-10-26",
    updated: "2026-10-26",
    image: "/blog/bubble-letters-peach2.webp",
    i18n: {
      en: {
        title: "Bubble letters for a short display name",
        description:
          "Type a short name and copy bubble letters for a display name: one heart, bow, or flower. Use a handwriting font when the name has to be a picture.",
      },
    },
  },
  {
    slug: "november-in-cursive",
    author: "wes-morales",
    date: "2026-11-02",
    updated: "2026-11-02",
    image: "/blog/november-cursive.webp",
    i18n: {
      en: {
        title: "November in cursive: the month plus all 12 months",
        description:
          "The capital N rule, the m-b crowd spot and every junction in the word — plus all twelve months ranked by difficulty, with a free printable practice sheet.",
      },
    },
  },
];

POSTS.push(...CURSIVE_POSTS);

// de/fr/pt 等后补语言在此合并
