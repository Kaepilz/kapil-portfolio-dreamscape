import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        services: 'Services',
        projects: 'Projects',
        contact: 'Contact',
      },
      // Hero Section
      hero: {
        greeting: "Hi, I'm",
        name: 'Kapil',
        title: 'Web Developer & Designer',
        description: 'I craft beautiful, functional websites and digital experiences that help businesses grow and succeed in the digital world. Let\'s build something amazing together.',
        viewWork: 'View My Work',
        contactMe: 'Contact Me',
        resume: 'Resume',
        discoverMore: 'Discover More'
      },
      // About Section
      about: {
        title: 'About Me',
        subtitle: 'Passionate developer from Tokyo',
        description: 'I\'m a 16-year-old web developer and designer currently studying at Nerima Technical High School in Tokyo, Japan. My journey in technology started with curiosity and has evolved into a passion for creating digital experiences that make a difference.',
        stats: {
          projectsCompleted: 'Projects Completed',
          yearsExperience: 'Years Learning',
          happyClients: 'Happy Clients',
          linesOfCode: 'Lines of Code'
        },
        tabs: {
          skills: 'Skills',
          experience: 'Experience',
          education: 'Education'
        }
      },
      // Skills Section
      skills: {
        title: 'Technical Skills',
        description: 'A comprehensive overview of my technical expertise and design capabilities, constantly evolving with the latest technologies and best practices.',
        getInTouch: 'Get in Touch',
        categories: {
          all: 'All',
          frontend: 'Frontend',
          backend: 'Backend',
          design: 'Design',
          tools: 'Tools'
        }
      },
      // Services Section
      services: {
        title: 'My Services',
        description: 'Comprehensive digital solutions tailored to help your business grow and succeed in the modern digital landscape.',
        webDevelopment: {
          title: 'Web Development',
          description: 'Custom websites and web applications built with modern technologies and best practices.'
        },
        uiuxDesign: {
          title: 'UI/UX Design',
          description: 'User-centered design solutions that create engaging and intuitive digital experiences.'
        },
        mobileFirst: {
          title: 'Mobile-First Design',
          description: 'Responsive designs that work perfectly across all devices and screen sizes.'
        },
        brandIdentity: {
          title: 'Brand Identity',
          description: 'Complete branding packages including logos, color schemes, and visual identity systems.'
        }
      },
      // Projects Section
      projects: {
        title: 'My Projects',
        description: 'Check out some of my recent projects. Each project represents my dedication to creating beautiful and functional digital experiences.',
        viewDemo: 'View Demo',
        viewCode: 'View Code',
        loadMore: 'Load More Projects',
        categories: {
          all: 'All',
          webDevelopment: 'Web Development',
          uiuxDesign: 'UI/UX Design',
          brandIdentity: 'Brand Identity'
        }
      },
      // Contact Section
      contact: {
        title: 'Get In Touch',
        description: 'Have a project in mind or want to collaborate? Feel free to reach out to me through the contact form or using the information below.',
        downloadResume: 'Download Resume',
        contactInfo: 'Contact Information',
        contactDescription: 'Feel free to reach out using any of these methods',
        location: 'Location',
        email: 'Email',
        phone: 'Phone',
        connect: 'Let\'s Connect',
        socialDescription: 'Follow me on social media for updates',
        sendMessage: 'Send Me a Message',
        formDescription: 'Fill out the form below and I\'ll get back to you as soon as possible.',
        form: {
          name: 'Your Name',
          email: 'Your Email',
          subject: 'Subject',
          message: 'Your Message',
          messagePlaceholder: 'Tell me about your project...',
          send: 'Send Message',
          sending: 'Sending...'
        }
      },
      // Footer
      footer: {
        description: 'A passionate web developer and designer creating digital experiences that make a difference.',
        quickLinks: 'Quick Links',
        services: 'Services',
        contact: 'Contact',
        followMe: 'Follow Me',
        allRightsReserved: 'All rights reserved.'
      },
      // Success Messages
      messages: {
        messageSent: 'Message Sent!',
        messageDescription: 'Thank you for your message. I\'ll get back to you soon.'
      },
      // Roadmap Section
      roadmap: {
        title: 'Learning Roadmap',
        description: 'My journey of continuous learning and skill development in technology',
        current: 'Current',
        inProgress: 'In Progress',
        future: 'Future',
        completed: 'Completed',
        keyTechnologies: 'Key Technologies',
        overallProgress: 'Overall Progress',
        target: 'Target',
        letsConnect: 'Let\'s Connect'
      },
      // Feedback Section
      feedback: {
        title: 'Share Your Feedback',
        description: 'Your feedback helps me improve and grow. I\'d love to hear your thoughts about my work, skills, or potential collaboration opportunities.',
        name: 'Name',
        email: 'Email (Optional)',
        rating: 'Overall Rating (Optional)',
        category: 'Feedback Category',
        message: 'Your Message',
        messagePlaceholder: 'Share your thoughts, suggestions, or feedback...',
        send: 'Send Feedback',
        sending: 'Submitting...',
        categories: {
          general: 'General Feedback',
          design: 'Design & UI/UX', 
          technical: 'Technical Skills',
          collaboration: 'Collaboration'
        },
        whyMatters: 'Why Your Feedback Matters',
        whatNext: 'What Happens Next?'
      }
    }
  },
  jp: {
    translation: {
      // Navigation
      nav: {
        home: 'ホーム',
        about: '私について',
        skills: 'スキル',
        services: 'サービス',
        projects: 'プロジェクト',
        contact: 'お問い合わせ',
      },
      // Hero Section
      hero: {
        greeting: 'こんにちは、',
        name: 'カピルです',
        title: 'ウェブ開発者 & デザイナー',
        description: '美しく機能的なウェブサイトとデジタル体験を制作し、ビジネスの成長とデジタル世界での成功をサポートします。一緒に素晴らしいものを作りましょう。',
        viewWork: '作品を見る',
        contactMe: 'お問い合わせ',
        resume: '履歴書',
        discoverMore: 'もっと見る'
      },
      // About Section
      about: {
        title: '私について',
        subtitle: '東京出身の情熱的な開発者',
        description: '私は16歳のウェブ開発者兼デザイナーで、現在東京の練馬工業高等学校で学んでいます。技術への探求心から始まった私の旅は、違いを生み出すデジタル体験を創造する情熱へと発展しました。',
        stats: {
          projectsCompleted: '完成プロジェクト',
          yearsExperience: '学習年数',
          happyClients: '満足したクライアント',
          linesOfCode: 'コード行数'
        },
        tabs: {
          skills: 'スキル',
          experience: '経験',
          education: '教育'
        }
      },
      // Skills Section
      skills: {
        title: '技術スキル',
        description: '私の技術的専門知識とデザイン能力の包括的な概要です。最新の技術とベストプラクティスで常に進化しています。',
        getInTouch: 'お問い合わせ',
        categories: {
          all: '全て',
          frontend: 'フロントエンド',
          backend: 'バックエンド',
          design: 'デザイン',
          tools: 'ツール'
        }
      },
      // Services Section
      services: {
        title: 'サービス',
        description: '現代のデジタル環境でビジネスの成長と成功を支援するための包括的なデジタルソリューション。',
        webDevelopment: {
          title: 'ウェブ開発',
          description: 'モダンな技術とベストプラクティスで構築されたカスタムウェブサイトとウェブアプリケーション。'
        },
        uiuxDesign: {
          title: 'UI/UXデザイン',
          description: '魅力的で直感的なデジタル体験を創造するユーザー中心のデザインソリューション。'
        },
        mobileFirst: {
          title: 'モバイルファーストデザイン',
          description: 'あらゆるデバイスと画面サイズで完璧に動作するレスポンシブデザイン。'
        },
        brandIdentity: {
          title: 'ブランドアイデンティティ',
          description: 'ロゴ、カラースキーム、ビジュアルアイデンティティシステムを含む完全なブランディングパッケージ。'
        }
      },
      // Projects Section
      projects: {
        title: 'プロジェクト',
        description: '最近のプロジェクトをご覧ください。各プロジェクトは、美しく機能的なデジタル体験を創造することへの私の献身を表しています。',
        viewDemo: 'デモを見る',
        viewCode: 'コードを見る',
        loadMore: 'もっとプロジェクトを読み込む',
        categories: {
          all: '全て',
          webDevelopment: 'ウェブ開発',
          uiuxDesign: 'UI/UXデザイン',
          brandIdentity: 'ブランドアイデンティティ'
        }
      },
      // Contact Section
      contact: {
        title: 'お問い合わせ',
        description: 'プロジェクトのアイデアがありますか？コラボレーションをお考えですか？お気軽に下記のフォームまたは連絡先からお問い合わせください。',
        downloadResume: '履歴書をダウンロード',
        contactInfo: '連絡先情報',
        contactDescription: 'どの方法でもお気軽にお問い合わせください',
        location: '所在地',
        email: 'メール',
        phone: '電話',
        connect: 'つながりましょう',
        socialDescription: '最新情報はソーシャルメディアでフォローしてください',
        sendMessage: 'メッセージを送る',
        formDescription: '下記のフォームに記入していただければ、できるだけ早くお返事いたします。',
        form: {
          name: 'お名前',
          email: 'メールアドレス',
          subject: '件名',
          message: 'メッセージ',
          messagePlaceholder: 'プロジェクトについて教えてください...',
          send: 'メッセージを送信',
          sending: '送信中...'
        }
      },
      // Footer
      footer: {
        description: '違いを生み出すデジタル体験を創造する情熱的なウェブ開発者兼デザイナー。',
        quickLinks: 'クイックリンク',
        services: 'サービス',
        contact: 'お問い合わせ',
        followMe: 'フォローする',
        allRightsReserved: '全著作権所有。'
      },
      // Success Messages
      messages: {
        messageSent: 'メッセージが送信されました！',
        messageDescription: 'メッセージをありがとうございます。すぐにお返事いたします。'
      },
      // Roadmap Section
      roadmap: {
        title: '学習ロードマップ',
        description: '技術における継続的な学習とスキル開発の旅',
        current: '現在',
        inProgress: '進行中',
        future: '将来',
        completed: '完了',
        keyTechnologies: '主要技術',
        overallProgress: '全体的な進捗',
        target: '目標',
        letsConnect: 'つながりましょう'
      },
      // Feedback Section  
      feedback: {
        title: 'フィードバックをお聞かせください',
        description: 'あなたのフィードバックは私の成長と改善に役立ちます。私の仕事、スキル、またはコラボレーションの機会についてお聞かせください。',
        name: 'お名前',
        email: 'メールアドレス（任意）',
        rating: '総合評価（任意）',
        category: 'フィードバックカテゴリ',
        message: 'メッセージ',
        messagePlaceholder: 'ご意見、提案、フィードバックをお聞かせください...',
        send: 'フィードバックを送信',
        sending: '送信中...',
        categories: {
          general: '一般的なフィードバック',
          design: 'デザイン & UI/UX',
          technical: '技術スキル',
          collaboration: 'コラボレーション'
        },
        whyMatters: 'フィードバックが重要な理由',
        whatNext: '次に何が起こりますか？'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Add language change listener
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;