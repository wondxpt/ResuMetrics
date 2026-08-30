// Simple, dependency-free i18n dictionary. No external translation
// service - everything is a plain JS object bundled with the app.

export const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "fa", label: "فارسی", dir: "rtl" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "zh", label: "中文", dir: "ltr" },
];

export const DEFAULT_LANGUAGE = "en";

const translations = {
  en: {
    appTitle: "ResuMetrics",

    languageSelect: {
      title: "Choose Your Language",
      subtitle:
        "Select the language you'd like to use throughout the app. You can change this anytime.",
      tagline: "AI resumes, ATS-ready for the US & Canada",
      continueButton: "Continue",
    },
    nav: {
      templates: "Templates",
      personal: "Personal",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      certifications: "Certifications",
      preview: "Preview",
      language: "Select Language",
      next: "Next",
      back: "Back",
      theme: "Theme",
      themeAuto: "Automatic",
      themeLight: "Light",
      themeDark: "Dark",
      themeDarkActive: "Currently dark",
      themeLightActive: "Currently light",

    },
    templatesPage: {
      heading: "Select Resume Template",
      useTemplate: "Use This Template",
      viewFullscreen: "View fullscreen",
      exitFullscreen: "Exit fullscreen",
      bestForLabel: "Best for",
    },
    templates: {
      chronological: {
        name: "Canadian Standard",
        description:
          "ATS-friendly reverse chronological design built for North American job applications.",
        bestFor: "North American Job Market",
      },
      combination: {
        name: "Combination Hybrid",
        description:
          "A balanced layout that highlights both strengths and professional experience.",
        bestFor: "Career Changers & Tech Professionals",
      },
      functional: {
        name: "Functional Skills Based",
        description:
          "A skills-centered format ideal for career transitions and non-linear experience.",
        bestFor: "Career Changes & Consulting",
      },
      two_column: {
        name: "Modern Two Column",
        description:
          "A contemporary and polished layout suited to modern direct applications.",
        bestFor: "Creative & Direct Applications",
      },
      minimal: {
        name: "Minimal ATS",
        description:
          "Clean, structured and highly readable for corporate, engineering and finance roles.",
        bestFor: "Corporate, Engineering & Finance",
      },
      creative_photo: {
        name: "Creative European",
        description:
          "A refined European-style template with a natural portrait section and polished visual flow.",
        bestFor: "European & Creative Roles",
      },
    },

    personalPage: {
      title: "Personal Information",
      fullName: "Full Name",
      targetTitle: "Target Job Title",
      location: "Location",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      summary: "Professional Summary",
      summaryPlaceholder:
        "Write a concise professional summary highlighting your experience, strengths, and career focus.",
      summaryHelper: "Recommended: 2–4 sentences",
      profilePhoto: "Profile Photo",
      uploadPhoto: "Upload Photo",
      editPhoto: "Edit Photo",
      remove: "Remove",
      next: "Next: Experience",
    },

    experiencePage: {
      title: "Work Experience",
      jobTitle: "Job Title",
      jobTitlePlaceholder: "Senior Business Analyst",
      company: "Company",
      companyPlaceholder: "ABC Consulting Inc.",
      location: "Location",
      locationPlaceholder: "Toronto, ON",
      startDate: "Start Date",
      endDate: "End Date",
      month: "Month",
      year: "Year",
      status: "Status",
      selectEndDate: "Select end date",
      present: "Present",
      responsibilities: "Responsibilities & Achievements",
      bulletPoint: "Bullet Point",
      bulletPlaceholder:
        "Led requirements gathering across multiple enterprise projects.",
      bulletHelper:
        "Add each responsibility or achievement as a separate bullet",
      addBullet: "Add Bullet",
      addExperience: "+ Add Experience",
      addedExperience: "Added Experience",
      back: "← Back",
      next: "Next: Education",
    },

    educationPage: {
      title: "Education",
      degree: "Degree / Field of Study",
      degreePlaceholder: "Bachelor of Business Administration",
      institution: "School / University",
      institutionPlaceholder: "University of Toronto",
      location: "Location",
      locationPlaceholder: "Toronto, ON",
      startDate: "Start Date",
      month: "Month",
      year: "Year",
      graduationDate: "Graduation Date",
      status: "Status",
      selectGraduationDate: "Select graduation date",
      currentlyStudying: "Currently Studying",
      educationDetails: "Education Details",
      educationBullet: "Education Bullet",
      educationBulletPlaceholder:
        "Relevant coursework, academic achievement, specialization, project, or other education detail",
      addBullet: "Add Bullet",
      addEducation: "+ Add Education",
      addedEducation: "Added Education",
      back: "← Back",
      next: "Next: Skills",
    },

    skillsPage: {
      title: "Skills & Languages",
      professionalSkills: "Professional Skills",
      skillTitle: "Skill Title",
      skillTitlePlaceholder: "React.js",
      suggestedForRole: "Suggested for your role",
      skillDescription: "Skill Description",
      skillDescriptionPlaceholder:
        "Experienced in building responsive web applications and reusable React components.",
      skillDescriptionHelper:
        "Optional — briefly describe your experience or level. Use a new line for separate points.",
      addSkill: "Add Skill",
      addedSkills: "Added Skills",
      languagesSection: "Languages",
      language: "Language",
      level: "Level",
      addLanguage: "Add Language",
      languageOptions: {
        english: "English",
        french: "French",
        german: "German",
        spanish: "Spanish",
        persian: "Persian",
      },
      levels: {
        beginner: "Beginner",
        basic: "Basic",
        intermediate: "Intermediate",
        upperIntermediate: "Upper-Intermediate",
        advanced: "Advanced",
        fluent: "Fluent",
        native: "Native",
      },
      back: "← Back",
      next: "Next: Certifications",
    },

    certificationsPage: {
      title: "Certifications",
      subtitle:
        "Add your professional certifications, licenses, and credentials.",
      emptyTitle: "No certifications added yet.",
      emptySubtitle: "Add your first certification below.",
      certificationLabel: "Certification",
      certificationField: "Certification",
      certificationPlaceholder: "PMP, AWS Certified Solutions Architect",
      issuer: "Issuer",
      issuerPlaceholder: "PMI, Amazon Web Services",
      issueDate: "Issue Date",
      issueDatePlaceholder: "January 2025",
      expirationDate: "Expiration Date",
      expirationDatePlaceholder: "January 2028",
      credentialId: "Credential ID",
      credentialIdPlaceholder: "Optional",
      credentialUrl: "Credential URL",
      credentialUrlPlaceholder: "https://...",
      addCertification: "+ Add Certification",
      back: "← Back",
      next: "Next: Preview",
    },

    previewPage: {
      title: "Resume Preview",
      back: "Back",
      pdf: "PDF",
      generating: "Generating…",
      fullscreen: "Fullscreen",
      exit: "Exit",
      page: "page",
      pages: "pages",
      pageBreakLabel: "Page {n} starts here",
      errorNoPreview: "Couldn't find the preview on screen. Try again.",
      errorNoContent:
        "Couldn't find the resume content to export. Try again.",
      errorGeneric: "PDF generation failed. Please try again.",
      pdfDownloaded: "PDF downloaded.",
      pdfDownloadedPages: "PDF downloaded ({n} pages).",
    },

    guidance: {
      showTips: "Show tips",
      personal: {
        title: "Before you start",
        tips: [
          "Use a professional email address, not a nickname.",
          "Keep your summary to 2-4 sentences focused on your target role.",
          "A photo is only shown on the Two Column and Creative templates.",
        ],
      },
      experience: {
        title: "Writing strong experience bullets",
        tips: [
          "Start each bullet with an action verb (Led, Built, Managed).",
          "Add a number where you can - %, $, or people affected.",
          "List your most recent job first.",
        ],
      },
      education: {
        title: "Education tips",
        tips: [
          "List your highest or most recent degree first.",
          "Include your field of study, not just the degree type.",
          "Only add GPA if it's strong and relevant.",
        ],
      },
      skills: {
        title: "Choosing the right skills",
        tips: [
          "List skills you can actually speak to in an interview.",
          "Mix technical skills with a couple of soft skills.",
          "Match wording from the job posting where it's genuinely true.",
        ],
      },
      certifications: {
        title: "Certifications tips",
        tips: [
          "Only include certifications relevant to your target role.",
          "Add the issuing organization exactly as it's officially named.",
          "Leave off expired certifications unless still relevant.",
        ],
      },
    },

    atsScore: {
      heading: "ATS Match Score",
      subtitle:
        "Paste a job description to see how well your resume's wording overlaps with it.",
      placeholder: "Paste the job description here...",
      calculate: "Check Match",
      recalculate: "Recalculate",
      scoreLabel: "Match Score",
      matched: "Matched keywords",
      missing: "Missing keywords",
    },

    completeness: {
      title: "Section completeness",
      personal: {
        fullName: "Add your full name",
        targetTitle: "Add a target job title",
        email: "Add an email address",
        phone: "Add a phone number",
        location: "Add your location",
        summary: "Add a professional summary",
        summaryTooShort: "Summary is quite short - aim for 2-4 sentences",
      },
      experience: {
        jobTitle: "Add a job title",
        company: "Add a company name",
        noBullets: "Add at least one bullet point",
        fewBullets: "Add a second bullet point",
        noMetrics: "Add a number to at least one bullet",
      },
      education: {
        degree: "Add a degree/field of study",
        school: "Add a school or university",
      },
      skills: {
        none: "Add at least one skill",
        tooFew: "Add a few more skills",
        noLanguages: "Add at least one language",
      },
      certifications: {
        missingName: "Add a name to every certification",
      },
    },

    polish: {
      button: "Polish with AI",
      translateButton: "Translate & Polish",
      downloadingModel: "Downloading translation model ({n}%)…",
      undo: "Undo",
      applied: "Updated!",
      tipsTitle: "Tips",
      translationUnavailable:
        "Translation isn't available for this language yet.",
      translationFailed: "Translation failed. Please try again.",
    },
  },

  fa: {
    appTitle: "ResuMetrics",

    languageSelect: {
      title: "زبان خود را انتخاب کنید",
      subtitle:
        "زبانی که می‌خواهید در سراسر اپ استفاده شود را انتخاب کنید. هر زمان می‌توانید آن را تغییر دهید.",
      tagline: "رزومه‌ساز هوشمند با ATS مخصوص آمریکا و کانادا",
      continueButton: "ادامه",
    },
    nav: {
      templates: "قالب‌ها",
      personal: "اطلاعات فردی",
      experience: "تجربه‌کاری",
      education: "تحصیلات",
      skills: "مهارت‌ها",
      certifications: "گواهینامه‌ها",
      preview: "پیش‌نمایش",
      language: "انتخاب زبان",
      next: "بعدی",
      back: "قبلی",
      theme: "پوسته",
      themeAuto: "خودکار",
      themeLight: "روشن",
      themeDark: "تاریک",
      themeDarkActive: "در حال حاضر تاریک",
      themeLightActive: "در حال حاضر روشن",

    },
    templatesPage: {
      heading: "انتخاب قالب رزومه",
      useTemplate: "استفاده از این قالب",
      viewFullscreen: "نمایش تمام‌صفحه",
      exitFullscreen: "خروج از تمام‌صفحه",
      bestForLabel: "مناسب برای",
    },
    templates: {
      chronological: {
        name: "استاندارد کانادایی",
        description:
          "طراحی زمانی-معکوس سازگار با ATS، ساخته‌شده برای بازار کار آمریکای شمالی.",
        bestFor: "بازار کار آمریکای شمالی",
      },
      combination: {
        name: "ترکیبی هیبرید",
        description:
          "چیدمانی متعادل که هم نقاط قوت و هم تجربه‌ی حرفه‌ای را برجسته می‌کند.",
        bestFor: "تغییر مسیر شغلی و متخصصان فناوری",
      },
      functional: {
        name: "کارکردی مبتنی بر مهارت",
        description:
          "قالبی مهارت‌محور، مناسب برای تغییر مسیر شغلی و سوابق غیرخطی.",
        bestFor: "تغییر شغل و مشاوره",
      },
      two_column: {
        name: "دو ستونه مدرن",
        description:
          "چیدمانی مدرن و شیک، مناسب برای درخواست‌های مستقیم امروزی.",
        bestFor: "نقش‌های خلاقانه و درخواست مستقیم",
      },
      minimal: {
        name: "مینیمال سازگار با ATS",
        description:
          "تمیز، منظم و بسیار خوانا برای نقش‌های شرکتی، مهندسی و مالی.",
        bestFor: "شرکتی، مهندسی و مالی",
      },
      creative_photo: {
        name: "خلاقانه‌ی اروپایی",
        description:
          "قالبی به‌سبک اروپایی با بخش عکس پرتره و جریان بصری شیک.",
        bestFor: "نقش‌های اروپایی و خلاقانه",
      },
    },

    personalPage: {
      title: "اطلاعات فردی",
      fullName: "نام کامل",
      targetTitle: "عنوان شغلی هدف",
      location: "موقعیت مکانی",
      email: "ایمیل",
      phone: "تلفن",
      linkedin: "لینکدین",
      summary: "خلاصه حرفه‌ای",
      summaryPlaceholder:
        "یک خلاصه حرفه‌ای کوتاه بنویسید که تجربه، نقاط قوت و مسیر شغلی شما را برجسته کند.",
      summaryHelper: "پیشنهاد می‌شود: ۲ تا ۴ جمله",
      profilePhoto: "عکس پروفایل",
      uploadPhoto: "بارگذاری عکس",
      editPhoto: "ویرایش عکس",
      remove: "حذف",
      next: "بعدی: تجربه کاری",
    },

    experiencePage: {
      title: "تجربه کاری",
      jobTitle: "عنوان شغلی",
      jobTitlePlaceholder: "تحلیل‌گر ارشد کسب‌وکار",
      company: "شرکت",
      companyPlaceholder: "شرکت مشاوره‌ای ABC",
      location: "موقعیت مکانی",
      locationPlaceholder: "تورنتو، انتاریو",
      startDate: "تاریخ شروع",
      endDate: "تاریخ پایان",
      month: "ماه",
      year: "سال",
      status: "وضعیت",
      selectEndDate: "انتخاب تاریخ پایان",
      present: "در حال حاضر",
      responsibilities: "مسئولیت‌ها و دستاوردها",
      bulletPoint: "مورد فهرستی",
      bulletPlaceholder:
        "هدایت جمع‌آوری نیازمندی‌ها در چندین پروژه سازمانی.",
      bulletHelper:
        "هر مسئولیت یا دستاورد را به‌صورت جداگانه اضافه کنید",
      addBullet: "افزودن مورد",
      addExperience: "+ افزودن تجربه کاری",
      addedExperience: "تجربه‌های افزوده‌شده",
      back: "← بازگشت",
      next: "بعدی: تحصیلات",
    },

    educationPage: {
      title: "تحصیلات",
      degree: "مدرک / رشته تحصیلی",
      degreePlaceholder: "کارشناسی مدیریت بازرگانی",
      institution: "مدرسه / دانشگاه",
      institutionPlaceholder: "دانشگاه تورنتو",
      location: "موقعیت مکانی",
      locationPlaceholder: "تورنتو، انتاریو",
      startDate: "تاریخ شروع",
      month: "ماه",
      year: "سال",
      graduationDate: "تاریخ فارغ‌التحصیلی",
      status: "وضعیت",
      selectGraduationDate: "انتخاب تاریخ فارغ‌التحصیلی",
      currentlyStudying: "در حال تحصیل",
      educationDetails: "جزئیات تحصیلی",
      educationBullet: "مورد تحصیلی",
      educationBulletPlaceholder:
        "دروس مرتبط، دستاورد علمی، گرایش تخصصی، پروژه یا سایر جزئیات تحصیلی",
      addBullet: "افزودن مورد",
      addEducation: "+ افزودن تحصیلات",
      addedEducation: "تحصیلات افزوده‌شده",
      back: "← بازگشت",
      next: "بعدی: مهارت‌ها",
    },

    skillsPage: {
      title: "مهارت‌ها و زبان‌ها",
      professionalSkills: "مهارت‌های حرفه‌ای",
      skillTitle: "عنوان مهارت",
      skillTitlePlaceholder: "React.js",
      suggestedForRole: "پیشنهادشده برای این نقش شغلی",
      skillDescription: "توضیح مهارت",
      skillDescriptionPlaceholder:
        "دارای تجربه در ساخت اپلیکیشن‌های وب واکنش‌گرا و کامپوننت‌های قابل‌استفاده مجدد در React.",
      skillDescriptionHelper:
        "اختیاری — تجربه یا سطح خود را به‌طور خلاصه شرح دهید. برای هر نکته از یک خط جدید استفاده کنید.",
      addSkill: "افزودن مهارت",
      addedSkills: "مهارت‌های افزوده‌شده",
      languagesSection: "زبان‌ها",
      language: "زبان",
      level: "سطح",
      addLanguage: "افزودن زبان",
      languageOptions: {
        english: "انگلیسی",
        french: "فرانسوی",
        german: "آلمانی",
        spanish: "اسپانیایی",
        persian: "فارسی",
      },
      levels: {
        beginner: "مبتدی",
        basic: "پایه",
        intermediate: "متوسط",
        upperIntermediate: "متوسط رو به بالا",
        advanced: "پیشرفته",
        fluent: "روان",
        native: "زبان مادری",
      },
      back: "← بازگشت",
      next: "بعدی: گواهینامه‌ها",
    },

    certificationsPage: {
      title: "گواهینامه‌ها",
      subtitle:
        "گواهینامه‌ها، مجوزها و مدارک حرفه‌ای خود را اضافه کنید.",
      emptyTitle: "هنوز هیچ گواهینامه‌ای اضافه نشده است.",
      emptySubtitle: "اولین گواهینامه خود را در زیر اضافه کنید.",
      certificationLabel: "گواهینامه",
      certificationField: "گواهینامه",
      certificationPlaceholder: "PMP، AWS Certified Solutions Architect",
      issuer: "صادرکننده",
      issuerPlaceholder: "PMI، Amazon Web Services",
      issueDate: "تاریخ صدور",
      issueDatePlaceholder: "ژانویه ۲۰۲۵",
      expirationDate: "تاریخ انقضا",
      expirationDatePlaceholder: "ژانویه ۲۰۲۸",
      credentialId: "شناسه گواهینامه",
      credentialIdPlaceholder: "اختیاری",
      credentialUrl: "آدرس گواهینامه",
      credentialUrlPlaceholder: "https://...",
      addCertification: "+ افزودن گواهینامه",
      back: "← بازگشت",
      next: "بعدی: پیش‌نمایش",
    },

    previewPage: {
      title: "پیش‌نمایش رزومه",
      back: "بازگشت",
      pdf: "PDF",
      generating: "در حال تولید…",
      fullscreen: "تمام‌صفحه",
      exit: "خروج",
      page: "صفحه",
      pages: "صفحه",
      pageBreakLabel: "صفحه {n} از اینجا شروع می‌شود",
      errorNoPreview: "پیش‌نمایش روی صفحه پیدا نشد. دوباره تلاش کنید.",
      errorNoContent:
        "محتوای رزومه برای خروجی گرفتن پیدا نشد. دوباره تلاش کنید.",
      errorGeneric: "تولید PDF ناموفق بود. لطفاً دوباره تلاش کنید.",
      pdfDownloaded: "PDF دانلود شد.",
      pdfDownloadedPages: "PDF دانلود شد ({n} صفحه).",
    },

    guidance: {
      showTips: "نمایش نکات",
      personal: {
        title: "قبل از شروع",
        tips: [
          "از یک ایمیل حرفه‌ای استفاده کنید، نه یک نام مستعار.",
          "خلاصه‌ی خود را در ۲ تا ۴ جمله و متمرکز بر شغل هدف نگه دارید.",
          "عکس فقط در قالب‌های دو ستونه و خلاقانه نمایش داده می‌شود.",
        ],
      },
      experience: {
        title: "نوشتن بولت‌پوینت‌های قوی تجربه‌کاری",
        tips: [
          "هر بولت را با یک فعل عملی شروع کنید (رهبری کردم، ساختم، مدیریت کردم).",
          "در صورت امکان یک عدد اضافه کنید - درصد، مبلغ یا تعداد افراد.",
          "جدیدترین شغل خود را اول لیست کنید.",
        ],
      },
      education: {
        title: "نکات تحصیلات",
        tips: [
          "بالاترین یا جدیدترین مدرک را اول ذکر کنید.",
          "رشته‌ی تحصیلی را هم بنویسید، نه فقط نوع مدرک.",
          "معدل را فقط در صورتی اضافه کنید که بالا و مرتبط باشد.",
        ],
      },
      skills: {
        title: "انتخاب مهارت‌های مناسب",
        tips: [
          "مهارت‌هایی رو لیست کنید که واقعاً می‌تونید توی مصاحبه دربارشون صحبت کنید.",
          "مهارت‌های فنی رو با چند مهارت نرم ترکیب کنید.",
          "در صورت صحت، از عبارات آگهی شغلی استفاده کنید.",
        ],
      },
      certifications: {
        title: "نکات گواهینامه‌ها",
        tips: [
          "فقط گواهینامه‌های مرتبط با شغل هدف را اضافه کنید.",
          "نام سازمان صادرکننده را دقیقاً مطابق نام رسمی بنویسید.",
          "گواهینامه‌های منقضی‌شده را حذف کنید مگر همچنان مرتبط باشند.",
        ],
      },
    },

    atsScore: {
      heading: "امتیاز تطابق با ATS",
      subtitle:
        "متن آگهی شغلی را وارد کنید تا ببینید متن رزومه‌ی شما چقدر با آن همپوشانی دارد.",
      placeholder: "متن آگهی شغلی را اینجا وارد کنید...",
      calculate: "بررسی تطابق",
      recalculate: "محاسبه‌ی مجدد",
      scoreLabel: "امتیاز تطابق",
      matched: "کلمات کلیدی مطابقت‌یافته",
      missing: "کلمات کلیدی جامانده",
    },

    completeness: {
      title: "کامل‌بودن بخش",
      personal: {
        fullName: "نام کامل خود را اضافه کنید",
        targetTitle: "عنوان شغلی هدف اضافه کنید",
        email: "یک ایمیل اضافه کنید",
        phone: "شماره تماس اضافه کنید",
        location: "محل سکونت خود را اضافه کنید",
        summary: "خلاصه‌ی حرفه‌ای اضافه کنید",
        summaryTooShort: "خلاصه کمی کوتاه است - ۲ تا ۴ جمله بنویسید",
      },
      experience: {
        jobTitle: "عنوان شغلی اضافه کنید",
        company: "نام شرکت اضافه کنید",
        noBullets: "حداقل یک مورد اضافه کنید",
        fewBullets: "یک مورد دیگر اضافه کنید",
        noMetrics: "به حداقل یک مورد یک عدد اضافه کنید",
      },
      education: {
        degree: "مدرک / رشته‌ی تحصیلی اضافه کنید",
        school: "نام دانشگاه یا مدرسه اضافه کنید",
      },
      skills: {
        none: "حداقل یک مهارت اضافه کنید",
        tooFew: "چند مهارت دیگر اضافه کنید",
        noLanguages: "حداقل یک زبان اضافه کنید",
      },
      certifications: {
        missingName: "برای هر گواهینامه یک نام اضافه کنید",
      },
    },

    polish: {
      button: "بهبود با هوش مصنوعی",
      translateButton: "ترجمه و بهبود",
      downloadingModel: "در حال دانلود مدل ترجمه ({n}%)…",
      undo: "بازگردانی",
      applied: "به‌روزرسانی شد!",
      tipsTitle: "نکات",
      translationUnavailable: "ترجمه هنوز برای این زبان در دسترس نیست.",
      translationFailed: "ترجمه ناموفق بود. دوباره تلاش کنید.",
    },
  },

  ar: {
    appTitle: "ResuMetrics",

    languageSelect: {
      title: "اختر لغتك",
      subtitle:
        "اختر اللغة التي تريد استخدامها في جميع أنحاء التطبيق. يمكنك تغييرها في أي وقت.",
      tagline: "سيرة ذاتية بالذكاء الاصطناعي، متوافقة مع ATS لأمريكا وكندا",
      continueButton: "متابعة",
    },
    nav: {
      templates: "القوالب",
      personal: "المعلومات الشخصية",
      experience: "الخبرة",
      education: "التعليم",
      skills: "المهارات",
      certifications: "الشهادات",
      preview: "معاينة",
      language: "اختر اللغة",
      next: "التالي",
      back: "رجوع",
      theme: "المظهر",
      themeAuto: "تلقائي",
      themeLight: "فاتح",
      themeDark: "داكن",
      themeDarkActive: "الوضع الحالي: داكن",
      themeLightActive: "الوضع الحالي: فاتح",

    },
    templatesPage: {
      heading: "اختر قالب السيرة الذاتية",
      useTemplate: "استخدام هذا القالب",
      viewFullscreen: "عرض ملء الشاشة",
      exitFullscreen: "الخروج من ملء الشاشة",
      bestForLabel: "الأنسب لـ",
    },
    templates: {
      chronological: {
        name: "المعيار الكندي",
        description:
          "تصميم زمني عكسي متوافق مع أنظمة تتبع المتقدمين، مصمم لسوق العمل في أمريكا الشمالية.",
        bestFor: "سوق العمل في أمريكا الشمالية",
      },
      combination: {
        name: "المزيج الهجين",
        description:
          "تخطيط متوازن يبرز نقاط القوة والخبرة المهنية معًا.",
        bestFor: "المتحولون الوظيفيون ومحترفو التقنية",
      },
      functional: {
        name: "الوظيفي القائم على المهارات",
        description:
          "تنسيق يركز على المهارات، مثالي لتغيير المسار الوظيفي والخبرة غير الخطية.",
        bestFor: "تغيير المسار الوظيفي والاستشارات",
      },
      two_column: {
        name: "عمودان حديث",
        description:
          "تخطيط عصري وأنيق يناسب الطلبات المباشرة الحديثة.",
        bestFor: "الأدوار الإبداعية والطلبات المباشرة",
      },
      minimal: {
        name: "بسيط ومتوافق مع ATS",
        description:
          "نظيف ومنظم وسهل القراءة للأدوار المؤسسية والهندسية والمالية.",
        bestFor: "الشركات والهندسة والمالية",
      },
      creative_photo: {
        name: "الإبداعي الأوروبي",
        description:
          "قالب بأسلوب أوروبي راقٍ مع قسم صورة شخصية وتدفق بصري أنيق.",
        bestFor: "الأدوار الأوروبية والإبداعية",
      },
    },

    personalPage: {
      title: "المعلومات الشخصية",
      fullName: "الاسم الكامل",
      targetTitle: "المسمى الوظيفي المستهدف",
      location: "الموقع",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      linkedin: "لينكدإن",
      summary: "الملخص المهني",
      summaryPlaceholder:
        "اكتب ملخصًا مهنيًا موجزًا يبرز خبرتك ونقاط قوتك ومسارك الوظيفي.",
      summaryHelper: "يُنصح بـ: ٢ إلى ٤ جمل",
      profilePhoto: "صورة الملف الشخصي",
      uploadPhoto: "تحميل صورة",
      editPhoto: "تعديل الصورة",
      remove: "إزالة",
      next: "التالي: الخبرة",
    },

    experiencePage: {
      title: "الخبرة العملية",
      jobTitle: "المسمى الوظيفي",
      jobTitlePlaceholder: "محلل أعمال أول",
      company: "الشركة",
      companyPlaceholder: "شركة ABC للاستشارات",
      location: "الموقع",
      locationPlaceholder: "تورونتو، أونتاريو",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
      month: "الشهر",
      year: "السنة",
      status: "الحالة",
      selectEndDate: "اختر تاريخ الانتهاء",
      present: "حتى الآن",
      responsibilities: "المسؤوليات والإنجازات",
      bulletPoint: "نقطة",
      bulletPlaceholder:
        "قيادة جمع المتطلبات عبر عدة مشاريع مؤسسية.",
      bulletHelper: "أضف كل مسؤولية أو إنجاز كنقطة منفصلة",
      addBullet: "إضافة نقطة",
      addExperience: "+ إضافة خبرة",
      addedExperience: "الخبرات المضافة",
      back: "← رجوع",
      next: "التالي: التعليم",
    },

    educationPage: {
      title: "التعليم",
      degree: "الدرجة العلمية / التخصص",
      degreePlaceholder: "بكالوريوس إدارة الأعمال",
      institution: "المدرسة / الجامعة",
      institutionPlaceholder: "جامعة تورونتو",
      location: "الموقع",
      locationPlaceholder: "تورونتو، أونتاريو",
      startDate: "تاريخ البدء",
      month: "الشهر",
      year: "السنة",
      graduationDate: "تاريخ التخرج",
      status: "الحالة",
      selectGraduationDate: "اختر تاريخ التخرج",
      currentlyStudying: "أدرس حاليًا",
      educationDetails: "تفاصيل التعليم",
      educationBullet: "نقطة تعليمية",
      educationBulletPlaceholder:
        "مقررات ذات صلة، إنجاز أكاديمي، تخصص، مشروع، أو أي تفاصيل تعليمية أخرى",
      addBullet: "إضافة نقطة",
      addEducation: "+ إضافة تعليم",
      addedEducation: "التعليم المضاف",
      back: "← رجوع",
      next: "التالي: المهارات",
    },

    skillsPage: {
      title: "المهارات واللغات",
      professionalSkills: "المهارات المهنية",
      skillTitle: "عنوان المهارة",
      skillTitlePlaceholder: "React.js",
      suggestedForRole: "مقترح لدورك الوظيفي",
      skillDescription: "وصف المهارة",
      skillDescriptionPlaceholder:
        "خبرة في بناء تطبيقات ويب متجاوبة ومكونات React قابلة لإعادة الاستخدام.",
      skillDescriptionHelper:
        "اختياري — صف باختصار خبرتك أو مستواك. استخدم سطرًا جديدًا لكل نقطة.",
      addSkill: "إضافة مهارة",
      addedSkills: "المهارات المضافة",
      languagesSection: "اللغات",
      language: "اللغة",
      level: "المستوى",
      addLanguage: "إضافة لغة",
      languageOptions: {
        english: "الإنجليزية",
        french: "الفرنسية",
        german: "الألمانية",
        spanish: "الإسبانية",
        persian: "الفارسية",
      },
      levels: {
        beginner: "مبتدئ",
        basic: "أساسي",
        intermediate: "متوسط",
        upperIntermediate: "متوسط إلى متقدم",
        advanced: "متقدم",
        fluent: "طلاقة",
        native: "اللغة الأم",
      },
      back: "← رجوع",
      next: "التالي: الشهادات",
    },

    certificationsPage: {
      title: "الشهادات",
      subtitle: "أضف شهاداتك المهنية وتراخيصك واعتماداتك.",
      emptyTitle: "لم تتم إضافة أي شهادات بعد.",
      emptySubtitle: "أضف شهادتك الأولى أدناه.",
      certificationLabel: "الشهادة",
      certificationField: "الشهادة",
      certificationPlaceholder: "PMP، AWS Certified Solutions Architect",
      issuer: "الجهة المانحة",
      issuerPlaceholder: "PMI، Amazon Web Services",
      issueDate: "تاريخ الإصدار",
      issueDatePlaceholder: "يناير ٢٠٢٥",
      expirationDate: "تاريخ الانتهاء",
      expirationDatePlaceholder: "يناير ٢٠٢٨",
      credentialId: "معرف الاعتماد",
      credentialIdPlaceholder: "اختياري",
      credentialUrl: "رابط الاعتماد",
      credentialUrlPlaceholder: "https://...",
      addCertification: "+ إضافة شهادة",
      back: "← رجوع",
      next: "التالي: المعاينة",
    },

    previewPage: {
      title: "معاينة السيرة الذاتية",
      back: "رجوع",
      pdf: "PDF",
      generating: "جارٍ الإنشاء…",
      fullscreen: "ملء الشاشة",
      exit: "خروج",
      page: "صفحة",
      pages: "صفحات",
      pageBreakLabel: "تبدأ الصفحة {n} من هنا",
      errorNoPreview: "تعذر العثور على المعاينة على الشاشة. حاول مرة أخرى.",
      errorNoContent:
        "تعذر العثور على محتوى السيرة الذاتية للتصدير. حاول مرة أخرى.",
      errorGeneric: "فشل إنشاء ملف PDF. يرجى المحاولة مرة أخرى.",
      pdfDownloaded: "تم تنزيل ملف PDF.",
      pdfDownloadedPages: "تم تنزيل ملف PDF ({n} صفحات).",
    },

    guidance: {
      showTips: "إظهار النصائح",
      personal: {
        title: "قبل أن تبدأ",
        tips: [
          "استخدم بريدًا إلكترونيًا مهنيًا، وليس اسمًا مستعارًا.",
          "اجعل ملخصك من 2 إلى 4 جمل تركز على وظيفتك المستهدفة.",
          "الصورة تظهر فقط في قالبي العمودين والإبداعي.",
        ],
      },
      experience: {
        title: "كتابة نقاط خبرة قوية",
        tips: [
          "ابدأ كل نقطة بفعل حركي (قدت، بنيت، أدرت).",
          "أضف رقمًا حيثما أمكن - نسبة مئوية أو مبلغًا أو عدد أشخاص.",
          "اذكر وظيفتك الأحدث أولاً.",
        ],
      },
      education: {
        title: "نصائح التعليم",
        tips: [
          "اذكر أعلى أو أحدث شهادة أولاً.",
          "أدرج مجال دراستك، وليس فقط نوع الشهادة.",
          "أضف المعدل التراكمي فقط إذا كان مرتفعًا وذا صلة.",
        ],
      },
      skills: {
        title: "اختيار المهارات المناسبة",
        tips: [
          "اذكر مهارات يمكنك فعلاً الحديث عنها في المقابلة.",
          "امزج بين المهارات التقنية وبعض المهارات الشخصية.",
          "طابق صياغة إعلان الوظيفة إن كان ذلك صحيحًا بالفعل.",
        ],
      },
      certifications: {
        title: "نصائح الشهادات",
        tips: [
          "أضف فقط الشهادات ذات الصلة بوظيفتك المستهدفة.",
          "اكتب اسم الجهة المانحة كما هو رسميًا.",
          "احذف الشهادات المنتهية الصلاحية إلا إذا كانت لا تزال ذات صلة.",
        ],
      },
    },

    atsScore: {
      heading: "درجة التوافق مع ATS",
      subtitle:
        "الصق وصف الوظيفة لترى مدى تطابق صياغة سيرتك الذاتية معه.",
      placeholder: "الصق وصف الوظيفة هنا...",
      calculate: "فحص التطابق",
      recalculate: "إعادة الحساب",
      scoreLabel: "درجة التطابق",
      matched: "الكلمات المفتاحية المتطابقة",
      missing: "الكلمات المفتاحية الناقصة",
    },

    completeness: {
      title: "اكتمال القسم",
      personal: {
        fullName: "أضف اسمك الكامل",
        targetTitle: "أضف المسمى الوظيفي المستهدف",
        email: "أضف بريدًا إلكترونيًا",
        phone: "أضف رقم هاتف",
        location: "أضف موقعك",
        summary: "أضف ملخصًا مهنيًا",
        summaryTooShort: "الملخص قصير جدًا - اجعله من 2 إلى 4 جمل",
      },
      experience: {
        jobTitle: "أضف المسمى الوظيفي",
        company: "أضف اسم الشركة",
        noBullets: "أضف نقطة واحدة على الأقل",
        fewBullets: "أضف نقطة ثانية",
        noMetrics: "أضف رقمًا إلى نقطة واحدة على الأقل",
      },
      education: {
        degree: "أضف الدرجة / التخصص",
        school: "أضف اسم المدرسة أو الجامعة",
      },
      skills: {
        none: "أضف مهارة واحدة على الأقل",
        tooFew: "أضف بضع مهارات أخرى",
        noLanguages: "أضف لغة واحدة على الأقل",
      },
      certifications: {
        missingName: "أضف اسمًا لكل شهادة",
      },
    },

    polish: {
      button: "تحسين بالذكاء الاصطناعي",
      translateButton: "ترجمة وتحسين",
      downloadingModel: "جارٍ تنزيل نموذج الترجمة ({n}%)…",
      undo: "تراجع",
      applied: "تم التحديث!",
      tipsTitle: "نصائح",
      translationUnavailable: "الترجمة غير متوفرة لهذه اللغة بعد.",
      translationFailed: "فشلت الترجمة. يرجى المحاولة مرة أخرى.",
    },
  },

  es: {
    appTitle: "ResuMetrics",

    languageSelect: {
      title: "Elige tu idioma",
      subtitle:
        "Selecciona el idioma que deseas usar en toda la aplicación. Puedes cambiarlo en cualquier momento.",
      tagline: "CV con IA, listos para ATS en EE. UU. y Canadá",
      continueButton: "Continuar",
    },
    nav: {
      templates: "Plantillas",
      personal: "Datos Personales",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      certifications: "Certificaciones",
      preview: "Vista Previa",
      language: "Seleccionar Idioma",
      next: "Siguiente",
      back: "Atrás",
      theme: "Tema",
      themeAuto: "Automático",
      themeLight: "Claro",
      themeDark: "Oscuro",
      themeDarkActive: "Actualmente oscuro",
      themeLightActive: "Actualmente claro",

    },
    templatesPage: {
      heading: "Selecciona una Plantilla de CV",
      useTemplate: "Usar esta Plantilla",
      viewFullscreen: "Ver en pantalla completa",
      exitFullscreen: "Salir de pantalla completa",
      bestForLabel: "Ideal para",
    },
    templates: {
      chronological: {
        name: "Estándar Canadiense",
        description:
          "Diseño cronológico inverso compatible con ATS, creado para solicitudes en Norteamérica.",
        bestFor: "Mercado laboral norteamericano",
      },
      combination: {
        name: "Híbrido Combinado",
        description:
          "Un diseño equilibrado que destaca tanto tus fortalezas como tu experiencia profesional.",
        bestFor: "Cambios de carrera y profesionales tecnológicos",
      },
      functional: {
        name: "Funcional por Habilidades",
        description:
          "Un formato centrado en habilidades, ideal para cambios de carrera y experiencia no lineal.",
        bestFor: "Cambios de carrera y consultoría",
      },
      two_column: {
        name: "Dos Columnas Moderno",
        description:
          "Un diseño contemporáneo y pulido para solicitudes directas modernas.",
        bestFor: "Roles creativos y solicitudes directas",
      },
      minimal: {
        name: "Minimalista ATS",
        description:
          "Limpio, estructurado y muy legible para roles corporativos, de ingeniería y finanzas.",
        bestFor: "Corporativo, ingeniería y finanzas",
      },
      creative_photo: {
        name: "Europeo Creativo",
        description:
          "Una plantilla de estilo europeo refinado con una sección de retrato natural y un flujo visual pulido.",
        bestFor: "Roles europeos y creativos",
      },
    },

    personalPage: {
      title: "Información Personal",
      fullName: "Nombre Completo",
      targetTitle: "Puesto de Trabajo Objetivo",
      location: "Ubicación",
      email: "Correo Electrónico",
      phone: "Teléfono",
      linkedin: "LinkedIn",
      summary: "Resumen Profesional",
      summaryPlaceholder:
        "Escribe un resumen profesional conciso que destaque tu experiencia, fortalezas y enfoque profesional.",
      summaryHelper: "Recomendado: 2–4 frases",
      profilePhoto: "Foto de Perfil",
      uploadPhoto: "Subir Foto",
      editPhoto: "Editar Foto",
      remove: "Eliminar",
      next: "Siguiente: Experiencia",
    },

    experiencePage: {
      title: "Experiencia Laboral",
      jobTitle: "Puesto de Trabajo",
      jobTitlePlaceholder: "Analista de Negocios Senior",
      company: "Empresa",
      companyPlaceholder: "ABC Consulting Inc.",
      location: "Ubicación",
      locationPlaceholder: "Toronto, ON",
      startDate: "Fecha de Inicio",
      endDate: "Fecha de Fin",
      month: "Mes",
      year: "Año",
      status: "Estado",
      selectEndDate: "Selecciona la fecha de fin",
      present: "Actual",
      responsibilities: "Responsabilidades y Logros",
      bulletPoint: "Punto",
      bulletPlaceholder:
        "Lideré la recopilación de requisitos en múltiples proyectos empresariales.",
      bulletHelper:
        "Agrega cada responsabilidad o logro como un punto separado",
      addBullet: "Agregar Punto",
      addExperience: "+ Agregar Experiencia",
      addedExperience: "Experiencia Agregada",
      back: "← Atrás",
      next: "Siguiente: Educación",
    },

    educationPage: {
      title: "Educación",
      degree: "Título / Campo de Estudio",
      degreePlaceholder: "Licenciatura en Administración de Empresas",
      institution: "Escuela / Universidad",
      institutionPlaceholder: "Universidad de Toronto",
      location: "Ubicación",
      locationPlaceholder: "Toronto, ON",
      startDate: "Fecha de Inicio",
      month: "Mes",
      year: "Año",
      graduationDate: "Fecha de Graduación",
      status: "Estado",
      selectGraduationDate: "Selecciona la fecha de graduación",
      currentlyStudying: "Actualmente Estudiando",
      educationDetails: "Detalles Educativos",
      educationBullet: "Punto Educativo",
      educationBulletPlaceholder:
        "Cursos relevantes, logro académico, especialización, proyecto u otro detalle educativo",
      addBullet: "Agregar Punto",
      addEducation: "+ Agregar Educación",
      addedEducation: "Educación Agregada",
      back: "← Atrás",
      next: "Siguiente: Habilidades",
    },

    skillsPage: {
      title: "Habilidades e Idiomas",
      professionalSkills: "Habilidades Profesionales",
      skillTitle: "Título de la Habilidad",
      skillTitlePlaceholder: "React.js",
      suggestedForRole: "Sugerido para tu puesto",
      skillDescription: "Descripción de la Habilidad",
      skillDescriptionPlaceholder:
        "Experiencia en la creación de aplicaciones web responsivas y componentes React reutilizables.",
      skillDescriptionHelper:
        "Opcional — describe brevemente tu experiencia o nivel. Usa una nueva línea para cada punto.",
      addSkill: "Agregar Habilidad",
      addedSkills: "Habilidades Agregadas",
      languagesSection: "Idiomas",
      language: "Idioma",
      level: "Nivel",
      addLanguage: "Agregar Idioma",
      languageOptions: {
        english: "Inglés",
        french: "Francés",
        german: "Alemán",
        spanish: "Español",
        persian: "Persa",
      },
      levels: {
        beginner: "Principiante",
        basic: "Básico",
        intermediate: "Intermedio",
        upperIntermediate: "Intermedio Alto",
        advanced: "Avanzado",
        fluent: "Fluido",
        native: "Nativo",
      },
      back: "← Atrás",
      next: "Siguiente: Certificaciones",
    },

    certificationsPage: {
      title: "Certificaciones",
      subtitle:
        "Agrega tus certificaciones, licencias y credenciales profesionales.",
      emptyTitle: "Aún no se han agregado certificaciones.",
      emptySubtitle: "Agrega tu primera certificación a continuación.",
      certificationLabel: "Certificación",
      certificationField: "Certificación",
      certificationPlaceholder: "PMP, AWS Certified Solutions Architect",
      issuer: "Emisor",
      issuerPlaceholder: "PMI, Amazon Web Services",
      issueDate: "Fecha de Emisión",
      issueDatePlaceholder: "Enero 2025",
      expirationDate: "Fecha de Expiración",
      expirationDatePlaceholder: "Enero 2028",
      credentialId: "ID de Credencial",
      credentialIdPlaceholder: "Opcional",
      credentialUrl: "URL de Credencial",
      credentialUrlPlaceholder: "https://...",
      addCertification: "+ Agregar Certificación",
      back: "← Atrás",
      next: "Siguiente: Vista Previa",
    },

    previewPage: {
      title: "Vista Previa del CV",
      back: "Atrás",
      pdf: "PDF",
      generating: "Generando…",
      fullscreen: "Pantalla Completa",
      exit: "Salir",
      page: "página",
      pages: "páginas",
      pageBreakLabel: "La página {n} comienza aquí",
      errorNoPreview:
        "No se pudo encontrar la vista previa en pantalla. Inténtalo de nuevo.",
      errorNoContent:
        "No se pudo encontrar el contenido del CV para exportar. Inténtalo de nuevo.",
      errorGeneric: "Error al generar el PDF. Inténtalo de nuevo.",
      pdfDownloaded: "PDF descargado.",
      pdfDownloadedPages: "PDF descargado ({n} páginas).",
    },

    guidance: {
      showTips: "Mostrar consejos",
      personal: {
        title: "Antes de empezar",
        tips: [
          "Usa un correo profesional, no un apodo.",
          "Limita tu resumen a 2-4 frases centradas en tu puesto objetivo.",
          "La foto solo aparece en las plantillas Dos Columnas y Creativa.",
        ],
      },
      experience: {
        title: "Cómo escribir viñetas de experiencia sólidas",
        tips: [
          "Empieza cada viñeta con un verbo de acción (Lideré, Construí, Gestioné).",
          "Añade un número cuando puedas: %, $ o personas afectadas.",
          "Enumera tu trabajo más reciente primero.",
        ],
      },
      education: {
        title: "Consejos de educación",
        tips: [
          "Enumera primero tu título más alto o reciente.",
          "Incluye tu área de estudio, no solo el tipo de título.",
          "Añade el promedio solo si es alto y relevante.",
        ],
      },
      skills: {
        title: "Elegir las habilidades correctas",
        tips: [
          "Enumera habilidades sobre las que realmente puedas hablar en una entrevista.",
          "Combina habilidades técnicas con algunas habilidades blandas.",
          "Usa la terminología de la oferta de empleo cuando sea genuinamente cierto.",
        ],
      },
      certifications: {
        title: "Consejos de certificaciones",
        tips: [
          "Incluye solo certificaciones relevantes para tu puesto objetivo.",
          "Escribe el nombre de la organización emisora tal como aparece oficialmente.",
          "Omite certificaciones vencidas a menos que sigan siendo relevantes.",
        ],
      },
    },

    atsScore: {
      heading: "Puntuación de Coincidencia ATS",
      subtitle:
        "Pega una descripción de trabajo para ver cuánto coincide tu CV con ella.",
      placeholder: "Pega la descripción del trabajo aquí...",
      calculate: "Comprobar Coincidencia",
      recalculate: "Recalcular",
      scoreLabel: "Puntuación de Coincidencia",
      matched: "Palabras clave coincidentes",
      missing: "Palabras clave faltantes",
    },

    completeness: {
      title: "Integridad de la sección",
      personal: {
        fullName: "Añade tu nombre completo",
        targetTitle: "Añade un puesto objetivo",
        email: "Añade un correo electrónico",
        phone: "Añade un número de teléfono",
        location: "Añade tu ubicación",
        summary: "Añade un resumen profesional",
        summaryTooShort:
          "El resumen es bastante corto - intenta 2-4 frases",
      },
      experience: {
        jobTitle: "Añade un puesto",
        company: "Añade el nombre de la empresa",
        noBullets: "Añade al menos una viñeta",
        fewBullets: "Añade una segunda viñeta",
        noMetrics: "Añade un número a al menos una viñeta",
      },
      education: {
        degree: "Añade un título/área de estudio",
        school: "Añade una escuela o universidad",
      },
      skills: {
        none: "Añade al menos una habilidad",
        tooFew: "Añade algunas habilidades más",
        noLanguages: "Añade al menos un idioma",
      },
      certifications: {
        missingName: "Añade un nombre a cada certificación",
      },
    },

    polish: {
      button: "Mejorar con IA",
      translateButton: "Traducir y Mejorar",
      downloadingModel: "Descargando modelo de traducción ({n}%)…",
      undo: "Deshacer",
      applied: "¡Actualizado!",
      tipsTitle: "Consejos",
      translationUnavailable:
        "La traducción aún no está disponible para este idioma.",
      translationFailed: "La traducción falló. Inténtalo de nuevo.",
    },
  },

  fr: {
    appTitle: "ResuMetrics",

    languageSelect: {
      title: "Choisissez votre langue",
      subtitle:
        "Sélectionnez la langue que vous souhaitez utiliser dans toute l'application. Vous pouvez la modifier à tout moment.",
      tagline: "CV par IA, prêts pour l'ATS aux États-Unis et au Canada",
      continueButton: "Continuer",
    },
    nav: {
      templates: "Modèles",
      personal: "Infos Personnelles",
      experience: "Expérience",
      education: "Formation",
      skills: "Compétences",
      certifications: "Certifications",
      preview: "Aperçu",
      language: "Choisir la Langue",
      next: "Suivant",
      back: "Retour",
      theme: "Thème",
      themeAuto: "Automatique",
      themeLight: "Clair",
      themeDark: "Sombre",
      themeDarkActive: "Actuellement sombre",
      themeLightActive: "Actuellement clair",

    },
    templatesPage: {
      heading: "Choisissez un Modèle de CV",
      useTemplate: "Utiliser ce Modèle",
      viewFullscreen: "Voir en plein écran",
      exitFullscreen: "Quitter le plein écran",
      bestForLabel: "Idéal pour",
    },
    templates: {
      chronological: {
        name: "Standard Canadien",
        description:
          "Design chronologique inversé compatible ATS, conçu pour les candidatures nord-américaines.",
        bestFor: "Marché du travail nord-américain",
      },
      combination: {
        name: "Hybride Combiné",
        description:
          "Une mise en page équilibrée qui met en valeur à la fois vos points forts et votre expérience professionnelle.",
        bestFor: "Reconversion professionnelle et métiers tech",
      },
      functional: {
        name: "Fonctionnel par Compétences",
        description:
          "Un format axé sur les compétences, idéal pour une reconversion ou un parcours non linéaire.",
        bestFor: "Reconversion et conseil",
      },
      two_column: {
        name: "Deux Colonnes Moderne",
        description:
          "Une mise en page contemporaine et soignée adaptée aux candidatures directes modernes.",
        bestFor: "Rôles créatifs et candidatures directes",
      },
      minimal: {
        name: "Minimaliste ATS",
        description:
          "Épuré, structuré et très lisible pour les postes en entreprise, ingénierie et finance.",
        bestFor: "Entreprise, ingénierie et finance",
      },
      creative_photo: {
        name: "Créatif Européen",
        description:
          "Un modèle de style européen raffiné avec une section portrait naturelle et un rendu visuel soigné.",
        bestFor: "Rôles européens et créatifs",
      },
    },

    personalPage: {
      title: "Informations Personnelles",
      fullName: "Nom Complet",
      targetTitle: "Poste Visé",
      location: "Localisation",
      email: "E-mail",
      phone: "Téléphone",
      linkedin: "LinkedIn",
      summary: "Résumé Professionnel",
      summaryPlaceholder:
        "Rédigez un résumé professionnel concis mettant en avant votre expérience, vos points forts et votre orientation de carrière.",
      summaryHelper: "Recommandé : 2 à 4 phrases",
      profilePhoto: "Photo de Profil",
      uploadPhoto: "Télécharger une Photo",
      editPhoto: "Modifier la Photo",
      remove: "Supprimer",
      next: "Suivant : Expérience",
    },

    experiencePage: {
      title: "Expérience Professionnelle",
      jobTitle: "Intitulé du Poste",
      jobTitlePlaceholder: "Analyste d'Affaires Senior",
      company: "Entreprise",
      companyPlaceholder: "ABC Consulting Inc.",
      location: "Localisation",
      locationPlaceholder: "Toronto, ON",
      startDate: "Date de Début",
      endDate: "Date de Fin",
      month: "Mois",
      year: "Année",
      status: "Statut",
      selectEndDate: "Sélectionner la date de fin",
      present: "Actuel",
      responsibilities: "Responsabilités et Réalisations",
      bulletPoint: "Point",
      bulletPlaceholder:
        "Direction de la collecte des exigences sur plusieurs projets d'entreprise.",
      bulletHelper:
        "Ajoutez chaque responsabilité ou réalisation comme un point séparé",
      addBullet: "Ajouter un Point",
      addExperience: "+ Ajouter une Expérience",
      addedExperience: "Expériences Ajoutées",
      back: "← Retour",
      next: "Suivant : Formation",
    },

    educationPage: {
      title: "Formation",
      degree: "Diplôme / Domaine d'Étude",
      degreePlaceholder: "Licence en Administration des Affaires",
      institution: "École / Université",
      institutionPlaceholder: "Université de Toronto",
      location: "Localisation",
      locationPlaceholder: "Toronto, ON",
      startDate: "Date de Début",
      month: "Mois",
      year: "Année",
      graduationDate: "Date d'Obtention",
      status: "Statut",
      selectGraduationDate: "Sélectionner la date d'obtention",
      currentlyStudying: "En cours d'études",
      educationDetails: "Détails de la Formation",
      educationBullet: "Point de Formation",
      educationBulletPlaceholder:
        "Cours pertinents, réussite académique, spécialisation, projet ou autre détail de formation",
      addBullet: "Ajouter un Point",
      addEducation: "+ Ajouter une Formation",
      addedEducation: "Formations Ajoutées",
      back: "← Retour",
      next: "Suivant : Compétences",
    },

    skillsPage: {
      title: "Compétences et Langues",
      professionalSkills: "Compétences Professionnelles",
      skillTitle: "Titre de la Compétence",
      skillTitlePlaceholder: "React.js",
      suggestedForRole: "Suggéré pour votre poste",
      skillDescription: "Description de la Compétence",
      skillDescriptionPlaceholder:
        "Expérience dans la création d'applications web réactives et de composants React réutilisables.",
      skillDescriptionHelper:
        "Facultatif — décrivez brièvement votre expérience ou votre niveau. Utilisez une nouvelle ligne pour chaque point.",
      addSkill: "Ajouter une Compétence",
      addedSkills: "Compétences Ajoutées",
      languagesSection: "Langues",
      language: "Langue",
      level: "Niveau",
      addLanguage: "Ajouter une Langue",
      languageOptions: {
        english: "Anglais",
        french: "Français",
        german: "Allemand",
        spanish: "Espagnol",
        persian: "Persan",
      },
      levels: {
        beginner: "Débutant",
        basic: "Basique",
        intermediate: "Intermédiaire",
        upperIntermediate: "Intermédiaire Avancé",
        advanced: "Avancé",
        fluent: "Courant",
        native: "Langue Maternelle",
      },
      back: "← Retour",
      next: "Suivant : Certifications",
    },

    certificationsPage: {
      title: "Certifications",
      subtitle:
        "Ajoutez vos certifications, licences et accréditations professionnelles.",
      emptyTitle: "Aucune certification ajoutée pour le moment.",
      emptySubtitle: "Ajoutez votre première certification ci-dessous.",
      certificationLabel: "Certification",
      certificationField: "Certification",
      certificationPlaceholder: "PMP, AWS Certified Solutions Architect",
      issuer: "Émetteur",
      issuerPlaceholder: "PMI, Amazon Web Services",
      issueDate: "Date d'Émission",
      issueDatePlaceholder: "Janvier 2025",
      expirationDate: "Date d'Expiration",
      expirationDatePlaceholder: "Janvier 2028",
      credentialId: "ID d'Accréditation",
      credentialIdPlaceholder: "Facultatif",
      credentialUrl: "URL d'Accréditation",
      credentialUrlPlaceholder: "https://...",
      addCertification: "+ Ajouter une Certification",
      back: "← Retour",
      next: "Suivant : Aperçu",
    },

    previewPage: {
      title: "Aperçu du CV",
      back: "Retour",
      pdf: "PDF",
      generating: "Génération en cours…",
      fullscreen: "Plein Écran",
      exit: "Quitter",
      page: "page",
      pages: "pages",
      pageBreakLabel: "La page {n} commence ici",
      errorNoPreview:
        "Impossible de trouver l'aperçu à l'écran. Réessayez.",
      errorNoContent:
        "Impossible de trouver le contenu du CV à exporter. Réessayez.",
      errorGeneric: "Échec de la génération du PDF. Veuillez réessayer.",
      pdfDownloaded: "PDF téléchargé.",
      pdfDownloadedPages: "PDF téléchargé ({n} pages).",
    },

    guidance: {
      showTips: "Afficher les conseils",
      personal: {
        title: "Avant de commencer",
        tips: [
          "Utilisez une adresse e-mail professionnelle, pas un surnom.",
          "Limitez votre résumé à 2-4 phrases centrées sur votre poste visé.",
          "La photo n'apparaît que sur les modèles Deux Colonnes et Créatif.",
        ],
      },
      experience: {
        title: "Rédiger des points d'expérience percutants",
        tips: [
          "Commencez chaque point par un verbe d'action (Dirigé, Construit, Géré).",
          "Ajoutez un chiffre quand c'est possible : %, $ ou nombre de personnes.",
          "Listez votre poste le plus récent en premier.",
        ],
      },
      education: {
        title: "Conseils pour la formation",
        tips: [
          "Listez d'abord votre diplôme le plus élevé ou le plus récent.",
          "Indiquez votre domaine d'étude, pas seulement le type de diplôme.",
          "N'ajoutez la moyenne que si elle est élevée et pertinente.",
        ],
      },
      skills: {
        title: "Choisir les bonnes compétences",
        tips: [
          "Listez des compétences dont vous pouvez vraiment parler en entretien.",
          "Mélangez compétences techniques et quelques compétences comportementales.",
          "Reprenez les termes de l'offre d'emploi lorsque c'est réellement vrai.",
        ],
      },
      certifications: {
        title: "Conseils pour les certifications",
        tips: [
          "N'incluez que les certifications pertinentes pour votre poste visé.",
          "Indiquez le nom de l'organisme émetteur tel qu'officiellement écrit.",
          "Retirez les certifications expirées sauf si elles restent pertinentes.",
        ],
      },
    },

    atsScore: {
      heading: "Score de Correspondance ATS",
      subtitle:
        "Collez une offre d'emploi pour voir à quel point votre CV correspond.",
      placeholder: "Collez l'offre d'emploi ici...",
      calculate: "Vérifier la Correspondance",
      recalculate: "Recalculer",
      scoreLabel: "Score de Correspondance",
      matched: "Mots-clés correspondants",
      missing: "Mots-clés manquants",
    },

    completeness: {
      title: "Complétude de la section",
      personal: {
        fullName: "Ajoutez votre nom complet",
        targetTitle: "Ajoutez un poste visé",
        email: "Ajoutez une adresse e-mail",
        phone: "Ajoutez un numéro de téléphone",
        location: "Ajoutez votre localisation",
        summary: "Ajoutez un résumé professionnel",
        summaryTooShort:
          "Le résumé est assez court - visez 2-4 phrases",
      },
      experience: {
        jobTitle: "Ajoutez un intitulé de poste",
        company: "Ajoutez le nom de l'entreprise",
        noBullets: "Ajoutez au moins un point",
        fewBullets: "Ajoutez un deuxième point",
        noMetrics: "Ajoutez un chiffre à au moins un point",
      },
      education: {
        degree: "Ajoutez un diplôme/domaine d'étude",
        school: "Ajoutez une école ou université",
      },
      skills: {
        none: "Ajoutez au moins une compétence",
        tooFew: "Ajoutez quelques compétences supplémentaires",
        noLanguages: "Ajoutez au moins une langue",
      },
      certifications: {
        missingName: "Ajoutez un nom à chaque certification",
      },
    },

    polish: {
      button: "Améliorer avec l'IA",
      translateButton: "Traduire et Améliorer",
      downloadingModel: "Téléchargement du modèle de traduction ({n}%)…",
      undo: "Annuler",
      applied: "Mis à jour !",
      tipsTitle: "Conseils",
      translationUnavailable:
        "La traduction n'est pas encore disponible pour cette langue.",
      translationFailed: "Échec de la traduction. Veuillez réessayer.",
    },
  },

  zh: {
    appTitle: "ResuMetrics",

    languageSelect: {
      title: "选择您的语言",
      subtitle: "选择您希望在整个应用中使用的语言，您可以随时更改。",
      tagline: "AI 简历，适配美国与加拿大 ATS 系统",
      continueButton: "继续",
    },
    nav: {
      templates: "模板",
      personal: "个人信息",
      experience: "工作经历",
      education: "教育背景",
      skills: "技能",
      certifications: "证书",
      preview: "预览",
      language: "选择语言",
      next: "下一步",
      back: "上一步",
      theme: "主题",
      themeAuto: "自动",
      themeLight: "浅色",
      themeDark: "深色",
      themeDarkActive: "当前为深色",
      themeLightActive: "当前为浅色",

    },
    templatesPage: {
      heading: "选择简历模板",
      useTemplate: "使用此模板",
      viewFullscreen: "全屏查看",
      exitFullscreen: "退出全屏",
      bestForLabel: "最适合",
    },
    templates: {
      chronological: {
        name: "加拿大标准版",
        description:
          "兼容ATS的倒序时间线设计，专为北美求职申请打造。",
        bestFor: "北美就业市场",
      },
      combination: {
        name: "混合式简历",
        description:
          "均衡的布局，同时突出你的优势与专业经历。",
        bestFor: "转行者与科技从业者",
      },
      functional: {
        name: "技能导向型",
        description:
          "以技能为核心的格式，非常适合转行或经历不连续的求职者。",
        bestFor: "职业转型与咨询",
      },
      two_column: {
        name: "现代双栏式",
        description:
          "现代而精致的布局，适合当下的直接求职申请。",
        bestFor: "创意岗位与直接申请",
      },
      minimal: {
        name: "极简ATS版",
        description:
          "简洁、结构清晰、可读性强，适合企业、工程和金融类岗位。",
        bestFor: "企业、工程与金融",
      },
      creative_photo: {
        name: "欧式创意版",
        description:
          "精致的欧式风格模板，含自然肖像区块与流畅的视觉呈现。",
        bestFor: "欧洲岗位与创意岗位",
      },
    },

    personalPage: {
      title: "个人信息",
      fullName: "姓名",
      targetTitle: "目标职位",
      location: "所在地",
      email: "电子邮箱",
      phone: "电话",
      linkedin: "领英 (LinkedIn)",
      summary: "职业概述",
      summaryPlaceholder:
        "撰写一段简明的职业概述，突出你的经验、优势和职业方向。",
      summaryHelper: "建议：2-4句话",
      profilePhoto: "个人照片",
      uploadPhoto: "上传照片",
      editPhoto: "编辑照片",
      remove: "移除",
      next: "下一步：工作经历",
    },

    experiencePage: {
      title: "工作经历",
      jobTitle: "职位名称",
      jobTitlePlaceholder: "高级业务分析师",
      company: "公司",
      companyPlaceholder: "ABC 咨询公司",
      location: "所在地",
      locationPlaceholder: "多伦多，安大略省",
      startDate: "开始日期",
      endDate: "结束日期",
      month: "月",
      year: "年",
      status: "状态",
      selectEndDate: "选择结束日期",
      present: "至今",
      responsibilities: "职责与成就",
      bulletPoint: "条目",
      bulletPlaceholder: "主导多个企业项目的需求收集工作。",
      bulletHelper: "将每项职责或成就作为单独的条目添加",
      addBullet: "添加条目",
      addExperience: "+ 添加工作经历",
      addedExperience: "已添加的工作经历",
      back: "← 返回",
      next: "下一步：教育背景",
    },

    educationPage: {
      title: "教育背景",
      degree: "学位 / 专业",
      degreePlaceholder: "工商管理学士",
      institution: "学校 / 大学",
      institutionPlaceholder: "多伦多大学",
      location: "所在地",
      locationPlaceholder: "多伦多，安大略省",
      startDate: "开始日期",
      month: "月",
      year: "年",
      graduationDate: "毕业日期",
      status: "状态",
      selectGraduationDate: "选择毕业日期",
      currentlyStudying: "在读中",
      educationDetails: "教育详情",
      educationBullet: "教育条目",
      educationBulletPlaceholder:
        "相关课程、学术成就、专业方向、项目或其他教育细节",
      addBullet: "添加条目",
      addEducation: "+ 添加教育背景",
      addedEducation: "已添加的教育背景",
      back: "← 返回",
      next: "下一步：技能",
    },

    skillsPage: {
      title: "技能与语言",
      professionalSkills: "专业技能",
      skillTitle: "技能名称",
      skillTitlePlaceholder: "React.js",
      suggestedForRole: "为你的职位推荐",
      skillDescription: "技能描述",
      skillDescriptionPlaceholder:
        "具有构建响应式网页应用和可复用 React 组件的经验。",
      skillDescriptionHelper:
        "可选 — 简要描述你的经验或水平。每个要点请另起一行。",
      addSkill: "添加技能",
      addedSkills: "已添加的技能",
      languagesSection: "语言",
      language: "语言",
      level: "水平",
      addLanguage: "添加语言",
      languageOptions: {
        english: "英语",
        french: "法语",
        german: "德语",
        spanish: "西班牙语",
        persian: "波斯语",
      },
      levels: {
        beginner: "初级",
        basic: "基础",
        intermediate: "中级",
        upperIntermediate: "中高级",
        advanced: "高级",
        fluent: "流利",
        native: "母语",
      },
      back: "← 返回",
      next: "下一步：证书",
    },

    certificationsPage: {
      title: "证书",
      subtitle: "添加你的专业证书、执照和资质证明。",
      emptyTitle: "尚未添加任何证书。",
      emptySubtitle: "在下方添加你的第一个证书。",
      certificationLabel: "证书",
      certificationField: "证书",
      certificationPlaceholder: "PMP、AWS 认证解决方案架构师",
      issuer: "颁发机构",
      issuerPlaceholder: "PMI、Amazon Web Services",
      issueDate: "颁发日期",
      issueDatePlaceholder: "2025年1月",
      expirationDate: "有效期至",
      expirationDatePlaceholder: "2028年1月",
      credentialId: "证书编号",
      credentialIdPlaceholder: "可选",
      credentialUrl: "证书链接",
      credentialUrlPlaceholder: "https://...",
      addCertification: "+ 添加证书",
      back: "← 返回",
      next: "下一步：预览",
    },

    previewPage: {
      title: "简历预览",
      back: "返回",
      pdf: "PDF",
      generating: "生成中…",
      fullscreen: "全屏",
      exit: "退出",
      page: "页",
      pages: "页",
      pageBreakLabel: "第 {n} 页从这里开始",
      errorNoPreview: "未能在屏幕上找到预览，请重试。",
      errorNoContent: "未能找到要导出的简历内容，请重试。",
      errorGeneric: "PDF 生成失败，请重试。",
      pdfDownloaded: "PDF 已下载。",
      pdfDownloadedPages: "PDF 已下载（{n} 页）。",
    },

    guidance: {
      showTips: "显示提示",
      personal: {
        title: "开始之前",
        tips: [
          "使用专业的电子邮箱，而不是昵称。",
          "将简介控制在2-4句话，聚焦于你的目标职位。",
          "照片仅在双栏和创意模板中显示。",
        ],
      },
      experience: {
        title: "撰写有力的工作经历要点",
        tips: [
          "每个要点以动作动词开头（主导、构建、管理）。",
          "尽量加入数字 —— 百分比、金额或受影响的人数。",
          "最近的工作经历放在最前面。",
        ],
      },
      education: {
        title: "教育背景小贴士",
        tips: [
          "先列出最高或最近的学位。",
          "写明专业方向，而不仅仅是学位类型。",
          "只有在GPA较高且相关时才添加。",
        ],
      },
      skills: {
        title: "选择合适的技能",
        tips: [
          "只列出你在面试中真正能谈论的技能。",
          "技术技能与软技能相结合。",
          "在真实的前提下，尽量匹配招聘信息中的用词。",
        ],
      },
      certifications: {
        title: "证书小贴士",
        tips: [
          "只添加与目标职位相关的证书。",
          "颁发机构名称需与官方名称完全一致。",
          "已过期的证书除非仍然相关，否则不要添加。",
        ],
      },
    },

    atsScore: {
      heading: "ATS匹配分数",
      subtitle: "粘贴职位描述，查看你的简历用词与其匹配程度。",
      placeholder: "在此粘贴职位描述...",
      calculate: "检查匹配度",
      recalculate: "重新计算",
      scoreLabel: "匹配分数",
      matched: "匹配的关键词",
      missing: "缺失的关键词",
    },

    completeness: {
      title: "各部分完整度",
      personal: {
        fullName: "添加你的姓名",
        targetTitle: "添加目标职位",
        email: "添加电子邮箱",
        phone: "添加电话号码",
        location: "添加所在地",
        summary: "添加职业简介",
        summaryTooShort: "简介有点短 —— 建议写2-4句话",
      },
      experience: {
        jobTitle: "添加职位名称",
        company: "添加公司名称",
        noBullets: "至少添加一个要点",
        fewBullets: "再添加一个要点",
        noMetrics: "至少为一个要点添加一个数字",
      },
      education: {
        degree: "添加学位/专业方向",
        school: "添加学校或大学",
      },
      skills: {
        none: "至少添加一项技能",
        tooFew: "再添加几项技能",
        noLanguages: "至少添加一门语言",
      },
      certifications: {
        missingName: "为每个证书添加名称",
      },
    },

    polish: {
      button: "AI 润色",
      translateButton: "翻译并润色",
      downloadingModel: "正在下载翻译模型（{n}%）…",
      undo: "撤销",
      applied: "已更新！",
      tipsTitle: "提示",
      translationUnavailable: "该语言暂不支持翻译。",
      translationFailed: "翻译失败，请重试。",
    },
  },
};

export default translations;
