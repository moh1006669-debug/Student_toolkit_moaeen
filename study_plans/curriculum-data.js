/* ============================================================
   منصة معين التعليمية — بيانات الخطط الدراسية
   Study Plans Data — منصة معين
   ============================================================
   الهيكل:
     COLLEGES = [
       { id, name, nameEn, icon, color, specs: [
           { id, name, nameEn, icon, levels: { "1": [...], "2": [...] } }
       ] }
     ]
   كل مادة: { code, name, hours, prereq (string) }
   ============================================================ */

var COLLEGES = [
  {
      id: "theoretical",
      name: "كلية العلوم والدراسات النظرية",
      nameEn: "College of Sciences & Theoretical Studies",
      icon: "fa-scale-balanced",
      color: "#074842",
      specs: [
        {
          id: "law",
          name: "القانون",
          nameEn: "Law",
          icon: "fa-gavel",
          levels: {
            "1": [
              { code: "CS003", name: "أساسيات الحاسب / Computer Essentials", hours: 3, prereq: "—" },
              { code: "CI003", name: "مهارات أكاديمية / Academic Skills", hours: 2, prereq: "—" },
              { code: "ENG003", name: "مهارات اللغة الإنجليزية / English Skills", hours: 8, prereq: "—" }
            ],
            "2": [
              { code: "COMM003", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "CS003, CI003, ENG003" },
              { code: "ISLM101", name: "العقيدة الإسلامية / Islamic Faith", hours: 2, prereq: "CS003, CI003, ENG003" },
              { code: "LAW121", name: "المدخل لدراسة علم القانون / Introduction to Law", hours: 3, prereq: "CS003, CI003, ENG003" },
              { code: "LAW122", name: "القانون الدستوري / Constitutional Law", hours: 3, prereq: "CS003, CI003, ENG003" },
              { code: "LAW123", name: "علم الإجرام والعقاب / Criminology and Punishment", hours: 3, prereq: "CS003, CI003, ENG003" },
              { code: "MATH003", name: "مقدمة في الرياضيات / Fundamentals of Math", hours: 3, prereq: "CS003, CI003, ENG003" }
            ],
            "3": [
              { code: "ISLM102", name: "الأخلاق وآداب المهنة في الإسلام / Professional Conduct & Ethics in Islam", hours: 2, prereq: "—" },
              { code: "LAW211", name: "المدخل لدراسة الفقه الإسلامي / Introduction to Islamic Jurisprudence", hours: 3, prereq: "—" },
              { code: "LAW212", name: "تاريخ القانون / History of Law", hours: 3, prereq: "LAW121, LAW123" },
              { code: "LAW213", name: "أحكام العقد / Contract Provision", hours: 3, prereq: "LAW121, LAW122" },
              { code: "LAW214", name: "القانون الإداري / Administrative Law", hours: 3, prereq: "LAW121, LAW122" }
            ],
            "4": [
              { code: "LAW221", name: "القانون الجزائي العام / Public Criminal Law", hours: 3, prereq: "LAW121, LAW123" },
              { code: "LAW222", name: "المسؤولية المدنية / Civil Responsibility", hours: 3, prereq: "LAW121, LAW211, LAW213" },
              { code: "LAW223", name: "القانون التجاري / Commercial Law", hours: 3, prereq: "LAW121, LAW213" },
              { code: "LAW224", name: "القضاء والإثبات / Judiciary and Evidence", hours: 3, prereq: "LAW121, LAW211" },
              { code: "LAW225", name: "القانون الدولي العام / Public International Law", hours: 3, prereq: "LAW121, LAW122" }
            ],
            "5": [
              { code: "ISLM103", name: "النظام الاقتصادي الإسلامي / Islamic Economic System", hours: 2, prereq: "ISLM101" },
              { code: "LAW311", name: "قانون العمل والتأمينات الاجتماعية / Labor & Social Security Law", hours: 3, prereq: "LAW121, LAW213" },
              { code: "LAW312", name: "القضاء الإداري / Administrative Judiciary", hours: 3, prereq: "LAW121, LAW122, LAW214" },
              { code: "LAW313", name: "العقود المدنية / Civil Contracts", hours: 3, prereq: "LAW121, LAW211, LAW213" },
              { code: "LAW314", name: "المواريث والوصايا والوقف / Inheritances, Wills & Endowment", hours: 3, prereq: "MATH003, LAW121, LAW211" },
              { code: "LAW315", name: "إجراءات التقاضي / Litigation Proceedings", hours: 3, prereq: "LAW121, LAW224" }
            ],
            "6": [
              { code: "ISLM104", name: "النظام الاجتماعي الإسلامي / Islamic Social System", hours: 2, prereq: "ISLM102" },
              { code: "LAW321", name: "ضمانات الديون / Debt Guarantees", hours: 3, prereq: "LAW121, LAW211, LAW213, LAW223" },
              { code: "LAW322", name: "الملكية والأموال / Property & Money", hours: 3, prereq: "LAW121, LAW211, LAW213" },
              { code: "LAW323", name: "العقود التجارية وعمليات البنوك / Commercial Contracts & Operation of Banks", hours: 3, prereq: "LAW121, LAW213, LAW223" },
              { code: "LAW324", name: "القانون الجزائي الخاص / Special Penal Code", hours: 3, prereq: "LAW121, LAW123, LAW221" },
              { code: "LAW325", name: "قانون الأسرة / Family Law", hours: 3, prereq: "LAW121, LAW211" }
            ],
            "7": [
              { code: "LAW411", name: "الأوراق التجارية / Commercial Papers", hours: 3, prereq: "LAW121, LAW213, LAW223, LAW323" },
              { code: "LAW412", name: "الزكاة والضرائب / Zakat & Taxes", hours: 3, prereq: "LAW121, LAW211" },
              { code: "LAW413", name: "العقود الإدارية / Administrative Contracts", hours: 3, prereq: "LAW121, LAW213, LAW214" },
              { code: "LAW414", name: "أصول الفقه / Principles of Jurisprudence", hours: 3, prereq: "LAW121, LAW211" },
              { code: "LAW415", name: "الملكية الفكرية / Intellectual Property", hours: 3, prereq: "LAW121, LAW223, LAW322" },
              { code: "LAW416/417", name: "القانون التجاري الدولي أو الصياغة القانونية / International Trade Law / Legal Drafting", hours: 3, prereq: "اختياري" }
            ],
            "8": [
              { code: "LAW421", name: "الإجراءات الجزائية / Penal Procedures", hours: 3, prereq: "LAW121, LAW123, LAW221, LAW224, LAW315, LAW324" },
              { code: "LAW422", name: "القانون الدولي الخاص / International Private Law", hours: 3, prereq: "LAW121, LAW213, LAW315" },
              { code: "LAW423", name: "قانون التنفيذ / Law Enforcement", hours: 3, prereq: "LAW121, LAW213, LAW223, LAW315, LAW325, LAW411" },
              { code: "LAW424", name: "القانون البحري والجوي / Maritime and Air Law", hours: 3, prereq: "LAW121, LAW213, LAW222, LAW223" },
              { code: "LAW425", name: "مبادئ البحث العلمي / Research Methods", hours: 3, prereq: "جميع المقررات السابقة" },
              { code: "LAW426/427", name: "قانون التأمين أو الأنظمة القانونية المعاصرة / Insurance Law / Contemporary Law System", hours: 3, prereq: "اختياري" }
            ]
          }
        },
        {
          id: "digital-media",
          name: "الإعلام الرقمي",
          nameEn: "Digital Media",
          icon: "fa-camera-retro",
          levels: {
            "1": [
              { code: "CS003", name: "أساسيات الحاسب / Computer Essentials", hours: 3, prereq: "—" },
              { code: "CI003", name: "المهارات الأكاديمية / Academic Skills", hours: 2, prereq: "—" },
              { code: "ENG003", name: "مهارات اللغة الإنجليزية / English Skills", hours: 8, prereq: "—" }
            ],
            "2": [
              { code: "COMM003", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "CS003, CI003, ENG003" },
              { code: "DMED101", name: "مقدمة في الإعلام الرقمي / Introduction to Digital Media", hours: 3, prereq: "CS003, CI003, ENG003" },
              { code: "DMED102", name: "التصميم الجرافيكي 1 / Graphic Designing I", hours: 3, prereq: "CS003, CI003, ENG003" },
              { code: "DMED103", name: "نظريات الاتصال / Theories of Mass Communication", hours: 3, prereq: "CS003, CI003, ENG003" },
              { code: "ARB211", name: "التحرير العربي 1 / Arabic Composition I", hours: 3, prereq: "CS003, CI003, ENG003" },
              { code: "MATH003", name: "مقدمة في الرياضيات / Fundamentals of Math", hours: 3, prereq: "CS003, CI003, ENG003" }
            ],
            "3": [
              { code: "DMED201", name: "فن التصوير الرقمي / Digital Photography", hours: 3, prereq: "DMED101" },
              { code: "DMED202", name: "تحرير الأخبار / News Editing", hours: 3, prereq: "ARB211" },
              { code: "DMED203", name: "المدخل إلى تقنيات الاتصال / Intro to Communication Technology", hours: 3, prereq: "DMED101" },
              { code: "DMED204", name: "التصميم الجرافيكي 2 / Graphic Designing II", hours: 3, prereq: "DMED102" },
              { code: "ARB260", name: "النحو والصرف التطبيقي / Applied Arabic Grammar", hours: 3, prereq: "ARB211" },
              { code: "ISLM101", name: "العقيدة الإسلامية / Islamic Faith", hours: 2, prereq: "—" }
            ],
            "4": [
              { code: "ISLM102", name: "الأخلاق وآداب المهنة في الإسلام / Professional Conduct & Ethics in Islam", hours: 2, prereq: "—" },
              { code: "DMED205", name: "قانون وأخلاقيات الإعلام الرقمي / Digital Media Law & Ethics", hours: 3, prereq: "DMED203" },
              { code: "DMED206", name: "العلاقات العامة الرقمية / Digital Public Relations", hours: 3, prereq: "DMED203" },
              { code: "DMED207", name: "الفنون الصحفية / Feature & Narrative Journalism", hours: 3, prereq: "DMED202" },
              { code: "DMPS101", name: "المدخل إلى علم السياسة / Intro to Political Science", hours: 3, prereq: "—" },
              { code: "DMED208", name: "النشر الرقمي / Digital Publishing", hours: 3, prereq: "DMED203" }
            ],
            "5": [
              { code: "DMED301", name: "الكتابة والتدوين / Writing & Blogging", hours: 3, prereq: "DMED202, ARB211" },
              { code: "ISLM103", name: "النظام الاقتصادي الإسلامي / Islamic Economic System", hours: 2, prereq: "ISLM101" },
              { code: "DMLO101", name: "التفكير المنطقي / Logical Thinking", hours: 2, prereq: "—" },
              { code: "DMED302", name: "المونتاج / Montage", hours: 3, prereq: "—" },
              { code: "DMED303", name: "الاتصال المؤسسي الرقمي / Digital Organizational Communication", hours: 3, prereq: "—" },
              { code: "DMIT202", name: "التفاعل بين الإنسان والحاسب / Human-Computer Interaction", hours: 3, prereq: "—" }
            ],
            "6": [
              { code: "DMED304", name: "الإنتاج التلفزيوني / TV Production", hours: 3, prereq: "DMED201, DMED302" },
              { code: "DMEM333", name: "التسويق الرقمي / Digital Marketing", hours: 3, prereq: "—" },
              { code: "ISLM104", name: "النظام الاجتماعي الإسلامي / Islamic Social System", hours: 2, prereq: "ISLM102" },
              { code: "DMED305", name: "كتابة النصوص / Scriptwriting", hours: 3, prereq: "DMED202" },
              { code: "DMED306", name: "الإبداع الإعلامي / Media Creativity", hours: 3, prereq: "DMED201" },
              { code: "DMSO101", name: "علم النفس الاجتماعي / Social Psychology", hours: 3, prereq: "—" }
            ],
            "7": [
              { code: "DMED402", name: "صحافة الهواتف الذكية / Smart Phones Journalism", hours: 3, prereq: "DMED302, DMED304" },
              { code: "DMED403", name: "استراتيجيات الإعلان / Advertising Strategies", hours: 3, prereq: "DMEM333" },
              { code: "DMED404", name: "الرسوم المتحركة / Animation", hours: 3, prereq: "—" },
              { code: "DMED405", name: "البحوث الإعلامية / Media Research", hours: 3, prereq: "—" },
              { code: "DMED406", name: "تحليل ونقد الإعلام الرقمي / Digital Media Criticism & Analysis", hours: 3, prereq: "DMSO101" },
              { code: "DMED408", name: "إدارة الإعلام الرقمي / Digital Media Management", hours: 3, prereq: "DMED205" }
            ],
            "8": [
              { code: "DMED407", name: "حالات دراسية في الإعلام الرقمي / Study Cases in Digital Media", hours: 3, prereq: "DMSO101" },
              { code: "DMED401", name: "التدريب العملي / Practical Training", hours: 3, prereq: "إنهاء المستوى السابع بنجاح" },
              { code: "DMED409", name: "مشروع التخرج / Graduation Project", hours: 3, prereq: "إنهاء المستوى السابع بنجاح" }
            ]
          }
        },
        {
          id: "english-translation",
          name: "اللغة الإنجليزية والترجمة",
          nameEn: "English Language & Translation",
          icon: "fa-language",
          levels: {
            "1": [
              { code: "CS001", name: "أساسيات الحاسب / Computer Essentials", hours: 3, prereq: "—" },
              { code: "CI001", name: "المهارات الأكاديمية / Academic Skills", hours: 2, prereq: "—" },
              { code: "ENG001", name: "مهارات اللغة الإنجليزية / English Language Skills", hours: 8, prereq: "—" }
            ],
            "2": [
              { code: "COMM001", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "—" },
              { code: "MATH001", name: "مقدمة في الرياضيات / Fundamentals of Math", hours: 3, prereq: "—" },
              { code: "ENG001", name: "مهارات اللغة الإنجليزية / English Language Skills", hours: 8, prereq: "—" }
            ],
            "3": [
              { code: "ENG201", name: "القواعد 1 / Grammar I", hours: 3, prereq: "ENG001, CS001, COMM001, MATH001, CI001" },
              { code: "ENG202", name: "الاستيعاب القرائي 1 / Reading Comprehension I", hours: 3, prereq: "ENG001, CS001, COMM001, MATH001, CI001" },
              { code: "ENG210", name: "الكتابة 1 / Writing I", hours: 3, prereq: "ENG001, CS001, COMM001, MATH001, CI001" },
              { code: "ENG220", name: "الاستماع والمحادثة 1 / Listening & Speaking I", hours: 3, prereq: "ENG001, CS001, COMM001, MATH001, CI001" },
              { code: "ISLM101", name: "العقيدة الإسلامية / Islamic Faith", hours: 2, prereq: "—" },
              { code: "ARB211", name: "التحرير العربي 1 / Arabic Composition I", hours: 3, prereq: "ENG001, CS001, COMM001, MATH001, CI001" }
            ],
            "4": [
              { code: "ENG230", name: "القواعد 2 / Grammar II", hours: 3, prereq: "ENG202" },
              { code: "ENG231", name: "الاستيعاب القرائي 2 / Reading Comprehension II", hours: 3, prereq: "ENG220" },
              { code: "ENG240", name: "الكتابة 2 / Writing II", hours: 3, prereq: "ENG201" },
              { code: "ENG250", name: "الاستماع والمحادثة 2 / Listening & Speaking II", hours: 3, prereq: "ENG210" },
              { code: "ISLM102", name: "الأخلاق وآداب المهنة في الإسلام / Professional Conduct & Ethics in Islam", hours: 2, prereq: "—" },
              { code: "ARB260", name: "النحو التطبيقي / Applied Arabic Grammar", hours: 3, prereq: "—" }
            ],
            "5": [
              { code: "ENG301", name: "القواعد 3 / Grammar III", hours: 3, prereq: "ENG230, ENG231, ENG240, ENG250" },
              { code: "ENG310", name: "الاستيعاب القرائي 3 / Reading Comprehension III", hours: 3, prereq: "ENG230, ENG231, ENG240, ENG250" },
              { code: "ENG320", name: "الكتابة 3 / Writing III", hours: 3, prereq: "ENG230, ENG231, ENG240, ENG250, ARB260" },
              { code: "TR330", name: "مدخل إلى الترجمة / Introduction to Translation", hours: 3, prereq: "ENG230, ENG231, ENG240, ENG250, ARB260, ARB211" },
              { code: "ENG340", name: "الاستماع والمحادثة 3 / Listening & Speaking III", hours: 3, prereq: "ENG230, ENG231, ENG240, ENG250" },
              { code: "ISLM103", name: "النظام الاقتصادي الإسلامي / Islamic Economic System", hours: 2, prereq: "ISLM101" }
            ],
            "6": [
              { code: "ENG350", name: "القواعد 4 / Grammar IV", hours: 3, prereq: "ENG301" },
              { code: "ENG360", name: "الاستيعاب القرائي 4 / Reading Comprehension IV", hours: 3, prereq: "ENG310" },
              { code: "TR370", name: "الترجمة 1 / Translation I", hours: 3, prereq: "TR330" },
              { code: "ENG380", name: "الكتابة 4 / Writing IV", hours: 3, prereq: "ENG320" },
              { code: "ISLM104", name: "النظام الاجتماعي الإسلامي / Islamic Social System", hours: 2, prereq: "ISLM102" },
              { code: "ARB221", name: "البلاغة / Rhetoric", hours: 3, prereq: "ARB211" }
            ],
            "7": [
              { code: "ENG401", name: "علم اللغة / Linguistics", hours: 3, prereq: "ENG301, ENG310, ENG320" },
              { code: "TR410", name: "الترجمة 2 / Translation II", hours: 3, prereq: "TR370" },
              { code: "TR420", name: "الترجمة المتخصصة 1 / Specialized Translation I", hours: 3, prereq: "TR370" },
              { code: "TR430", name: "الترجمة الفورية 1 / Interpretation I", hours: 3, prereq: "TR370" },
              { code: "TR440", name: "الترجمة الأدبية / Literary Translation", hours: 3, prereq: "TR370" },
              { code: "TR450", name: "الترجمة الإعلامية / Media Translation", hours: 3, prereq: "TR370" }
            ],
            "8": [
              { code: "TR460", name: "الترجمة المتخصصة 2 / Specialized Translation II", hours: 3, prereq: "TR420" },
              { code: "TR470", name: "الترجمة الفورية 2 / Interpretation II", hours: 3, prereq: "TR430" },
              { code: "TR480", name: "الترجمة القانونية / Legal Translation", hours: 3, prereq: "TR370" },
              { code: "TR490", name: "الترجمة العلمية / Scientific Translation", hours: 3, prereq: "TR370" },
              { code: "TR499", name: "مشروع التخرج / Graduation Project", hours: 3, prereq: "إنهاء المستوى السابع بنجاح" }
            ]
          }
        }
      ]
    },

  {
    id: "business",
    name: "كلية العلوم الإدارية والمالية",
    nameEn: "College of Administrative & Financial Sciences",
    icon: "fa-chart-line",
    color: "#074842",
    specs: [
        {
          id: "business-admin",
          name: "إدارة الأعمال",
          nameEn: "Business Administration",
          icon: "fa-briefcase",
          levels: {
            "1": [
            { code: "CS001", name: "أساسيات الحاسب / Computer Essentials", hours: 3, prereq: "—" },
            { code: "CI001", name: "المهارات الأكاديمية / Academic Skills", hours: 2, prereq: "—" },
            { code: "ENG001", name: "مهارات اللغة الإنجليزية / English Language Skills", hours: 8, prereq: "—" }
            ],
            "2": [
            { code: "COMM001", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "—" },
            { code: "MATH001", name: "أساسيات الرياضيات / Fundamentals of Math", hours: 3, prereq: "—" },
            { code: "ENG001", name: "مهارات اللغة الإنجليزية (استكمال)", hours: 8, prereq: "—" }
            ],
            "3": [
            { code: "ISLM101", name: "الثقافة الإسلامية / Islamic Culture", hours: 2, prereq: "اجتياز السنة الأولى" },
            { code: "STAT101", name: "الإحصاء / Statistics", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "LAW101", name: "البيئة القانونية للأعمال / Legal Environment of Business", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ECON101", name: "الاقتصاد الجزئي / Microeconomics", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "MGT101", name: "مبادئ الإدارة / Principles of Management", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ACCT101", name: "مبادئ المحاسبة / Principles of Accounting", hours: 3, prereq: "اجتياز السنة الأولى" }
            ],
            "4": [
            { code: "ISLM102", name: "السلوك المهني والأخلاقيات في الإسلام", hours: 2, prereq: "—" },
            { code: "STAT201", name: "الأساليب الكمية", hours: 3, prereq: "ACCT101" },
            { code: "FIN101", name: "مبادئ التمويل", hours: 3, prereq: "MGT101" },
            { code: "MGT201", name: "إدارة التسويق", hours: 3, prereq: "MGT101" },
            { code: "MGT211", name: "إدارة الموارد البشرية", hours: 3, prereq: "—" },
            { code: "ECOM101", name: "التجارة الإلكترونية", hours: 3, prereq: "STAT101" }
            ],
            "5": [
            { code: "ECON201", name: "الاقتصاد الكلي", hours: 3, prereq: "—" },
            { code: "MIS201", name: "نظم إدارة المعلومات", hours: 3, prereq: "MGT101" },
            { code: "ECOM201", name: "مقدمة في الإدارة الإلكترونية", hours: 3, prereq: "MGT101" },
            { code: "MGT301", name: "السلوك التنظيمي", hours: 3, prereq: "MGT211" },
            { code: "MGT311", name: "إدارة العمليات", hours: 3, prereq: "MGT101" },
            { code: "MGT312", name: "اتخاذ القرار وحل المشكلات", hours: 3, prereq: "MGT101" }
            ],
            "6": [
            { code: "ISLM103", name: "النظام الاقتصادي الإسلامي", hours: 2, prereq: "ISLM101" },
            { code: "ACCT301", name: "محاسبة التكاليف", hours: 3, prereq: "ACCT101" },
            { code: "MGT321", name: "الأعمال الدولية", hours: 3, prereq: "—" },
            { code: "MGT322", name: "إدارة اللوجستيات", hours: 3, prereq: "MGT101" },
            { code: "MGT323", name: "إدارة المشاريع", hours: 3, prereq: "MGT311" }
            ],
            "7": [
            { code: "ISLM104", name: "النظام الاجتماعي وحقوق الإنسان", hours: 2, prereq: "ISLM102" },
            { code: "MGT401", name: "الإدارة الاستراتيجية", hours: 3, prereq: "MGT201" },
            { code: "MGT324", name: "الإدارة العامة", hours: 3, prereq: "MGT101" },
            { code: "MGT402", name: "ريادة الأعمال", hours: 3, prereq: "MGT101" },
            { code: "MGT403", name: "إدارة المعرفة", hours: 3, prereq: "MGT101" }
            ],
            "8": [
            { code: "MGT404", name: "تصميم وتطوير المنظمات", hours: 3, prereq: "MGT101" },
            { code: "MGT421", name: "إدارة الاتصالات", hours: 3, prereq: "MGT101" },
            { code: "MGT422", name: "أخلاقيات الأعمال والمسؤولية الاجتماعية", hours: 3, prereq: "—" },
            { code: "MGT430", name: "التدريب التعاوني", hours: 6, prereq: "إكمال 90 ساعة" }
            ],
          }
        },
        {
          id: "accounting",
          name: "المحاسبة",
          nameEn: "Accounting",
          icon: "fa-calculator",
          levels: {
            "1": [
            { code: "ENG001", name: "مهارات اللغة الإنجليزية", hours: 8, prereq: "—" },
            { code: "CS001", name: "مقدمة في الذكاء الصناعي والحاسب", hours: 3, prereq: "—" },
            { code: "COMM001", name: "مهارات الاتصال", hours: 2, prereq: "—" }
            ],
            "2": [
            { code: "ENG001", name: "مهارات اللغة الإنجليزية (استكمال)", hours: 8, prereq: "—" },
            { code: "MATH001", name: "مقدمة في الرياضيات", hours: 3, prereq: "—" },
            { code: "CI001", name: "المهارات الأكاديمية", hours: 2, prereq: "—" }
            ],
            "3": [
            { code: "ISLM101", name: "الثقافة الإسلامية", hours: 2, prereq: "—" },
            { code: "STAT101", name: "الإحصاء", hours: 3, prereq: "—" },
            { code: "LAW101", name: "البيئة القانونية للأعمال", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ECON101", name: "الاقتصاد الجزئي", hours: 3, prereq: "—" },
            { code: "MGT101", name: "مبادئ الإدارة", hours: 3, prereq: "—" },
            { code: "ACCT101", name: "مبادئ المحاسبة", hours: 3, prereq: "—" }
            ],
            "4": [
            { code: "ISLM102", name: "الأخلاق وآداب المهنة", hours: 2, prereq: "—" },
            { code: "STAT201", name: "الأساليب الكمية", hours: 3, prereq: "STAT101" },
            { code: "FIN101", name: "مبادئ المالية", hours: 3, prereq: "ACCT101" },
            { code: "MGT201", name: "إدارة التسويق", hours: 3, prereq: "MGT101" },
            { code: "MGT211", name: "إدارة الموارد البشرية", hours: 3, prereq: "—" },
            { code: "ECOM101", name: "التجارة الإلكترونية", hours: 3, prereq: "—" }
            ],
            "5": [
            { code: "ECON201", name: "الاقتصاد الكلي", hours: 3, prereq: "—" },
            { code: "MIS201", name: "نظم إدارة المعلومات", hours: 3, prereq: "MGT101" },
            { code: "ECOM201", name: "الإدارة الإلكترونية", hours: 3, prereq: "MGT101" },
            { code: "MGT301", name: "السلوك التنظيمي", hours: 3, prereq: "MGT211" },
            { code: "MGT311", name: "إدارة العمليات", hours: 3, prereq: "MGT101" },
            { code: "ACCT201", name: "المحاسبة المالية", hours: 3, prereq: "ACCT101" }
            ],
            "6": [
            { code: "ISLM103", name: "النظام الاقتصادي الإسلامي", hours: 2, prereq: "ISLM101" },
            { code: "ACCT301", name: "محاسبة التكاليف", hours: 3, prereq: "ACCT101" },
            { code: "MGT321", name: "الأعمال الدولية", hours: 3, prereq: "—" },
            { code: "MGT322", name: "إدارة التوريد", hours: 3, prereq: "MGT101" },
            { code: "ACCT302", name: "المحاسبة المالية المتقدمة", hours: 3, prereq: "ACCT201" },
            { code: "ACCT405", name: "محاسبة المنشآت المالية", hours: 3, prereq: "ACCT201" }
            ],
            "7": [
            { code: "ISLM104", name: "النظام الاجتماعي وحقوق الإنسان", hours: 2, prereq: "ISLM102" },
            { code: "MGT401", name: "الإدارة الاستراتيجية", hours: 3, prereq: "MGT201" },
            { code: "ACCT401", name: "المراجعة", hours: 3, prereq: "ACCT302" },
            { code: "ACCT403", name: "بحوث محاسبية", hours: 3, prereq: "—" },
            { code: "ACCT402", name: "محاسبة نظم المعلومات", hours: 3, prereq: "ACCT101" },
            { code: "ACCT321", name: "المحاسبة الحكومية", hours: 3, prereq: "ACCT201" }
            ],
            "8": [
            { code: "ACCT422", name: "محاسبة الزكاة والضريبة", hours: 3, prereq: "ACCT201" },
            { code: "LAW401", name: "قانون الشركات", hours: 3, prereq: "LAW101" },
            { code: "ACCT322", name: "المحاسبة الإدارية", hours: 3, prereq: "ACCT301" },
            { code: "ACCT424", name: "محاسبة التأمين", hours: 3, prereq: "ACCT201" },
            { code: "ACCT430", name: "التدريب العملي", hours: 6, prereq: "إكمال 90 ساعة" }
            ],
          }
        },
        {
          id: "finance",
          name: "المالية",
          nameEn: "Finance",
          icon: "fa-money-bill-trend-up",
          levels: {
            "1": [
            { code: "ENG001", name: "مهارات اللغة الإنجليزية", hours: 8, prereq: "—" },
            { code: "CS001", name: "مقدمة في الذكاء الصناعي والحاسب", hours: 3, prereq: "—" },
            { code: "COMM001", name: "مهارات الاتصال", hours: 2, prereq: "—" }
            ],
            "2": [
            { code: "ENG001", name: "مهارات اللغة الإنجليزية (استكمال)", hours: 8, prereq: "—" },
            { code: "MATH001", name: "مقدمة في الرياضيات", hours: 3, prereq: "—" },
            { code: "CI001", name: "المهارات الأكاديمية", hours: 2, prereq: "—" }
            ],
            "3": [
            { code: "ISLM101", name: "الثقافة الإسلامية", hours: 2, prereq: "—" },
            { code: "STAT101", name: "الإحصاء", hours: 3, prereq: "—" },
            { code: "LAW101", name: "البيئة القانونية للأعمال", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ECON101", name: "الاقتصاد الجزئي", hours: 3, prereq: "—" },
            { code: "MGT101", name: "مبادئ الإدارة", hours: 3, prereq: "—" },
            { code: "ACCT101", name: "مبادئ المحاسبة", hours: 3, prereq: "—" }
            ],
            "4": [
            { code: "ISLM102", name: "الأخلاق وآداب المهنة", hours: 2, prereq: "—" },
            { code: "STAT201", name: "الأساليب الكمية", hours: 3, prereq: "STAT101" },
            { code: "FIN101", name: "مبادئ المالية", hours: 3, prereq: "ACCT101" },
            { code: "MGT201", name: "إدارة التسويق", hours: 3, prereq: "MGT101" },
            { code: "MGT211", name: "إدارة الموارد البشرية", hours: 3, prereq: "—" },
            { code: "ECOM101", name: "التجارة الإلكترونية", hours: 3, prereq: "—" }
            ],
            "5": [
            { code: "ECON201", name: "الاقتصاد الكلي", hours: 3, prereq: "—" },
            { code: "MIS201", name: "نظم إدارة المعلومات", hours: 3, prereq: "MGT101" },
            { code: "ECOM201", name: "الإدارة الإلكترونية", hours: 3, prereq: "MGT101" },
            { code: "MGT301", name: "السلوك التنظيمي", hours: 3, prereq: "MGT211" },
            { code: "MGT311", name: "إدارة العمليات", hours: 3, prereq: "MGT101" },
            { code: "FIN201", name: "الإدارة المالية", hours: 3, prereq: "FIN101" }
            ],
            "6": [
            { code: "ISLM103", name: "النظام الاقتصادي الإسلامي", hours: 2, prereq: "ISLM101" },
            { code: "FIN202", name: "الأسواق المالية", hours: 3, prereq: "FIN101" },
            { code: "FIN203", name: "التحليل المالي", hours: 3, prereq: "FIN201" },
            { code: "FIN204", name: "الاستثمار", hours: 3, prereq: "FIN201" },
            { code: "FIN205", name: "التمويل الدولي", hours: 3, prereq: "FIN101" },
            { code: "ACCT301", name: "محاسبة التكاليف", hours: 3, prereq: "ACCT101" }
            ],
            "7": [
            { code: "ISLM104", name: "النظام الاجتماعي وحقوق الإنسان", hours: 2, prereq: "ISLM102" },
            { code: "MGT401", name: "الإدارة الاستراتيجية", hours: 3, prereq: "MGT201" },
            { code: "FIN301", name: "إدارة المحافظ الاستثمارية", hours: 3, prereq: "FIN204" },
            { code: "FIN302", name: "إدارة المخاطر المالية", hours: 3, prereq: "FIN203" },
            { code: "FIN303", name: "التمويل العقاري", hours: 3, prereq: "FIN201" },
            { code: "FIN304", name: "التمويل السلوكي", hours: 3, prereq: "FIN201" }
            ],
            "8": [
            { code: "FIN401", name: "التمويل المتقدم", hours: 3, prereq: "FIN201" },
            { code: "FIN402", name: "التمويل الإسلامي", hours: 3, prereq: "FIN101" },
            { code: "FIN403", name: "إدارة المؤسسات المالية", hours: 3, prereq: "FIN202" },
            { code: "FIN404", name: "التحليل الكمي المالي", hours: 3, prereq: "FIN203" },
            { code: "FIN430", name: "التدريب العملي", hours: 6, prereq: "إكمال 90 ساعة" }
            ],
          }
        },
        {
          id: "e-commerce",
          name: "التجارة الإلكترونية",
          nameEn: "E-Commerce",
          icon: "fa-cart-shopping",
          levels: {
            "1": [
            { code: "ENG001", name: "مهارات اللغة الإنجليزية", hours: 8, prereq: "—" },
            { code: "CS001", name: "مقدمة في الذكاء الصناعي والحاسب", hours: 3, prereq: "—" },
            { code: "COMM001", name: "مهارات الاتصال", hours: 2, prereq: "—" }
            ],
            "2": [
            { code: "ENG001", name: "مهارات اللغة الإنجليزية (استكمال)", hours: 8, prereq: "—" },
            { code: "MATH001", name: "مقدمة في الرياضيات", hours: 3, prereq: "—" },
            { code: "CI001", name: "المهارات الأكاديمية", hours: 2, prereq: "—" }
            ],
            "3": [
            { code: "ISLM101", name: "الثقافة الإسلامية", hours: 2, prereq: "—" },
            { code: "STAT101", name: "الإحصاء", hours: 3, prereq: "—" },
            { code: "LAW101", name: "البيئة القانونية للأعمال", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ECON101", name: "الاقتصاد الجزئي", hours: 3, prereq: "—" },
            { code: "MGT101", name: "مبادئ الإدارة", hours: 3, prereq: "—" },
            { code: "ACCT101", name: "مبادئ المحاسبة", hours: 3, prereq: "—" }
            ],
            "4": [
            { code: "ISLM102", name: "الأخلاق وآداب المهنة", hours: 2, prereq: "—" },
            { code: "STAT201", name: "الأساليب الكمية", hours: 3, prereq: "STAT101" },
            { code: "FIN101", name: "مبادئ المالية", hours: 3, prereq: "ACCT101" },
            { code: "MGT201", name: "إدارة التسويق", hours: 3, prereq: "MGT101" },
            { code: "MGT211", name: "إدارة الموارد البشرية", hours: 3, prereq: "—" },
            { code: "ECOM101", name: "مقدمة في التجارة الإلكترونية", hours: 3, prereq: "—" }
            ],
            "5": [
            { code: "ECON201", name: "الاقتصاد الكلي", hours: 3, prereq: "—" },
            { code: "MIS201", name: "نظم إدارة المعلومات", hours: 3, prereq: "MGT101" },
            { code: "ECOM201", name: "مقدمة في الإدارة الإلكترونية", hours: 3, prereq: "MGT101" },
            { code: "MGT301", name: "السلوك التنظيمي", hours: 3, prereq: "MGT211" },
            { code: "MGT311", name: "إدارة العمليات", hours: 3, prereq: "MGT101" },
            { code: "ECOM301", name: "التجارة الإلكترونية المتقدمة", hours: 3, prereq: "ECOM101" }
            ],
            "6": [
            { code: "ISLM103", name: "النظام الاقتصادي الإسلامي", hours: 2, prereq: "ISLM101" },
            { code: "ECOM302", name: "التسويق الإلكتروني", hours: 3, prereq: "MGT201" },
            { code: "ECOM303", name: "إدارة المحتوى الرقمي", hours: 3, prereq: "ECOM201" },
            { code: "ECOM304", name: "منصات التجارة الإلكترونية", hours: 3, prereq: "ECOM101" },
            { code: "ECOM305", name: "أمن المعلومات للتجارة الإلكترونية", hours: 3, prereq: "CS001" },
            { code: "ACCT301", name: "محاسبة التكاليف", hours: 3, prereq: "ACCT101" }
            ],
            "7": [
            { code: "ISLM104", name: "النظام الاجتماعي وحقوق الإنسان", hours: 2, prereq: "ISLM102" },
            { code: "MGT401", name: "الإدارة الاستراتيجية", hours: 3, prereq: "MGT201" },
            { code: "ECOM401", name: "إدارة المشاريع الإلكترونية", hours: 3, prereq: "ECOM201" },
            { code: "ECOM402", name: "التحول الرقمي", hours: 3, prereq: "ECOM201" },
            { code: "ECOM403", name: "نماذج الأعمال الإلكترونية", hours: 3, prereq: "ECOM101" },
            { code: "ECOM404", name: "التحليلات الرقمية", hours: 3, prereq: "STAT101" }
            ],
            "8": [
            { code: "ECOM405", name: "التجارة عبر الهواتف الذكية", hours: 3, prereq: "ECOM301" },
            { code: "ECOM406", name: "إدارة الابتكار الرقمي", hours: 3, prereq: "ECOM402" },
            { code: "ECOM407", name: "ريادة الأعمال الرقمية", hours: 3, prereq: "ECOM403" },
            { code: "ECOM408", name: "التقنيات الناشئة في التجارة الإلكترونية", hours: 3, prereq: "CS001" },
            { code: "ECOM430", name: "التدريب العملي", hours: 6, prereq: "إكمال 90 ساعة" }
            ],
          }
        },
    ]
  },

  {
    id: "health",
    name: "كلية العلوم الصحية",
    nameEn: "College of Health Sciences",
    icon: "fa-heart-pulse",
    color: "#074842",
    specs: [
        {
          id: "public-health",
          name: "الصحة العامة",
          nameEn: "Public Health",
          icon: "fa-heart-pulse",
          levels: {
            "1": [
            { code: "001 نجل", name: "مهارات اللغة الإنجليزية", hours: 8, prereq: "—" },
            { code: "001 عال", name: "مهارات الحاسب الآلي", hours: 3, prereq: "—" },
            { code: "001 نهج", name: "مهارات أكاديمية", hours: 2, prereq: "—" }
            ],
            "2": [
            { code: "001 نجل", name: "مهارات اللغة الإنجليزية", hours: 8, prereq: "—" },
            { code: "001 ريض", name: "مقدمة في الرياضيات", hours: 3, prereq: "—" },
            { code: "001 علم", name: "مهارات الاتصال", hours: 2, prereq: "—" }
            ],
            "3": [
            { code: "101 حيا", name: "المصطلحات الطبية الأساسية", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "101 سلم", name: "مقدمة في الثقافة الإسلامية 1", hours: 2, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "101 درع", name: "إدارة الرعاية الصحية", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "121 صحة", name: "مقدمة في الإحصاء الحيوي", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "101 صحة", name: "مقدمة في الصحة العامة", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "102 درع", name: "السلوك التنظيمي", hours: 3, prereq: "—" }
            ],
            "4": [
            { code: "102 حيا", name: "مقدمة في علم التشريح وعلم وظائف الأعضاء", hours: 3, prereq: "101 حيا" },
            { code: "103 حيا", name: "مبادئ علم الأحياء الدقيقة للصحة العامة", hours: 3, prereq: "101 حيا" },
            { code: "113 درع", name: "السياسات الصحية ونظام الرعاية الصحية السعودية", hours: 3, prereq: "101 درع" },
            { code: "131 صحة", name: "مقدمة في علم الأوبئة", hours: 3, prereq: "121 صحة" },
            { code: "151 صحة", name: "الصحة البيئية", hours: 3, prereq: "101 صحة" },
            { code: "181 صحة", name: "علم الاجتماع في الصحة والمرض والرعاية الصحية", hours: 3, prereq: "101 صحة" }
            ],
            "5": [
            { code: "212 صحة", name: "مفاهيم التثقيف الصحي وتعزيزه", hours: 3, prereq: "101 حيا" },
            { code: "241 صحة", name: "المفاهيم الأساسية في الغذاء والتغذية", hours: 3, prereq: "101 صحة" },
            { code: "261 صحة", name: "الصحة المهنية", hours: 3, prereq: "151 صحة" },
            { code: "271 صحة", name: "مقدمة في علم الأمراض", hours: 3, prereq: "103 حيا" },
            { code: "281 صحة", name: "السلوك الصحي", hours: 3, prereq: "181 صحة" },
            { code: "102 سلم", name: "مقدمة إلى الثقافة الإسلامية 2", hours: 2, prereq: "—" }
            ],
            "6": [
            { code: "213 درع", name: "الإدارة المالية للرعاية الصحية", hours: 3, prereq: "101 درع" },
            { code: "215 صحة", name: "طرق البحث والتحليل في مجال الرعاية الصحية", hours: 3, prereq: "131 صحة" },
            { code: "216 صحة", name: "الأخلاقيات والأنظمة في الرعاية الصحية", hours: 3, prereq: "113 درع" },
            { code: "231 صحة", name: "مقدمة في علم الأوبئة في المستشفيات", hours: 3, prereq: "131 صحة" },
            { code: "273 صحة", name: "مقدمة في الصحة النفسية", hours: 3, prereq: "281 صحة" },
            { code: "274 صحة", name: "التخطيط الصحي", hours: 3, prereq: "212 صحة" },
            { code: "103 سلم", name: "مقدمة في الثقافة الإسلامية 3", hours: 2, prereq: "—" }
            ],
            "7": [
            { code: "311 صحة", name: "الصحة العالمية", hours: 3, prereq: "101 صحة" },
            { code: "312 صحة", name: "الاتصال الصحي", hours: 3, prereq: "216 صحة" },
            { code: "313 صحة", name: "الإصابات الناجمة عن حوادث الطرق والوقاية من الإعاقة", hours: 3, prereq: "281 صحة" },
            { code: "331 صحة", name: "وبائيات الأمراض المزمنة والوقاية منها", hours: 3, prereq: "131 صحة" },
            { code: "372 صحة", name: "إدارة الكوارث في الصحة العامة", hours: 3, prereq: "231 صحة" },
            { code: "373 صحة", name: "صحة الأم والطفل", hours: 3, prereq: "271 صحة" }
            ],
            "8": [
            { code: "374 صحة", name: "تعزيز صحة الفم", hours: 3, prereq: "212 صحة؛ 281 صحة" },
            { code: "314 صحة", name: "المجتمع والإدمان", hours: 3, prereq: "273 صحة؛ 312 صحة" },
            { code: "104 سلم", name: "مقدمة في الثقافة الإسلامية 4", hours: 2, prereq: "—" },
            { code: "اختياري 1", name: "مقرر من مسار الصحة العامة", hours: 3, prereq: "311 صحة؛ 331 صحة؛ 313 صحة؛ 312 صحة؛ 372 صحة؛ 373 صحة" },
            { code: "اختياري 2", name: "مقرر من مسار الصحة العامة", hours: 3, prereq: "311 صحة؛ 331 صحة؛ 313 صحة؛ 312 صحة؛ 372 صحة؛ 373 صحة" },
            { code: "اختياري 3", name: "مقرر من مسار الصحة العامة", hours: 3, prereq: "311 صحة؛ 331 صحة؛ 313 صحة؛ 312 صحة؛ 372 صحة؛ 373 صحة" }
            ],
          }
        },
        {
          id: "health-informatics",
          name: "المعلوماتية الصحية",
          nameEn: "Health Informatics",
          icon: "fa-laptop-medical",
          levels: {
            "1": [
            { code: "ENGL001", name: "مهارات اللغة الإنجليزية / English Skills 1", hours: 8, prereq: "—" },
            { code: "COMP001", name: "مهارات الحاسب الآلي / Computer Skills", hours: 3, prereq: "—" },
            { code: "NCA001", name: "مهارات أكاديمية / Academic Skills", hours: 2, prereq: "—" }
            ],
            "2": [
            { code: "ENGL002", name: "مهارات اللغة الإنجليزية 2 / English Skills 2", hours: 8, prereq: "—" },
            { code: "MATH001", name: "مقدمة في الرياضيات / Introduction to Mathematics", hours: 3, prereq: "—" },
            { code: "COMM001", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "—" }
            ],
            "3": [
            { code: "HCM101", name: "إدارة الرعاية الصحية / Healthcare Management", hours: 3, prereq: "First Year" },
            { code: "HCM102", name: "السلوك التنظيمي / Organizational Behavior", hours: 3, prereq: "First Year" },
            { code: "PHC121", name: "مقدمة في الإحصاء الحيوي / Intro to Biostatistics", hours: 3, prereq: "First Year" },
            { code: "IT231", name: "مقدمة في تقنية ونظم المعلومات / Intro to IT & IS", hours: 3, prereq: "First Year" },
            { code: "IT232", name: "برمجة الأشياء / Object Programming", hours: 3, prereq: "First Year" },
            { code: "BIOL101", name: "المصطلحات الطبية الأساسية / Basic Medical Terminology", hours: 3, prereq: "First Year" }
            ],
            "4": [
            { code: "ISLAM101", name: "العقيدة الإسلامية / Islamic Faith", hours: 2, prereq: "—" },
            { code: "BIOL102", name: "مقدمة في علم التشريح وعلم وظائف الأعضاء / Intro to Anatomy & Physiology", hours: 3, prereq: "—" },
            { code: "HCM113", name: "السياسات الصحية ونظام الرعاية الصحية السعودية / Health Policies & Saudi Healthcare System", hours: 3, prereq: "—" },
            { code: "PHC131", name: "مقدمة في علم الأوبئة / Intro to Epidemiology", hours: 3, prereq: "PHC121" },
            { code: "IT244", name: "مقدمة في قواعد البيانات / Introduction to Databases", hours: 3, prereq: "IT232" },
            { code: "IT245", name: "هيكلة البيانات / Data Structures", hours: 3, prereq: "IT232" }
            ],
            "5": [
            { code: "IT351", name: "شبكات الحاسب الآلي / Computer Networks", hours: 3, prereq: "IT231" },
            { code: "ISLAM102", name: "الثقافة الإسلامية الأخلاق وآداب المهنة / Islamic Ethics", hours: 2, prereq: "—" },
            { code: "PHC212", name: "مفاهيم التثقيف الصحي وتعزيزه / Health Education Concepts", hours: 3, prereq: "BIOL101" },
            { code: "HCI111", name: "مقدمة في المعلوماتية الصحية / Intro to Health Informatics", hours: 3, prereq: "—" },
            { code: "IT352", name: "تفاعل الإنسان مع الحاسوب / Human–Computer Interaction", hours: 3, prereq: "IT245" },
            { code: "IT353", name: "تحليل وتصميم النظم / Systems Analysis & Design", hours: 3, prereq: "IT245" }
            ],
            "6": [
            { code: "HCM213", name: "الإدارة المالية للرعاية الصحية / Healthcare Financial Management", hours: 3, prereq: "HCM101" },
            { code: "PHC216", name: "الأخلاقيات والأنظمة في الرعاية الصحية / Healthcare Ethics & Regulations", hours: 3, prereq: "—" },
            { code: "PHC215", name: "طرق البحث والتحليل / Research Methods", hours: 3, prereq: "PHC121" },
            { code: "IT361", name: "تقنيات الويب / Web Technologies", hours: 3, prereq: "IT352" },
            { code: "IT362", name: "إدارة مشاريع تقنية المعلومات / IT Project Management", hours: 3, prereq: "IT353" },
            { code: "HCI112", name: "السجلات الصحية الإلكترونية / Electronic Health Records", hours: 3, prereq: "IT231" }
            ],
            "7": [
            { code: "PHC312", name: "الاتصال الصحي / Health Communication", hours: 3, prereq: "PHC216" },
            { code: "ISLAM103", name: "النظام الاقتصادي في الإسلام / Islamic Economic System", hours: 2, prereq: "—" },
            { code: "IT475", name: "نظم دعم القرارات / Decision Support Systems", hours: 3, prereq: "IT244" },
            { code: "HCI214", name: "معلوماتية المستخدمين / Consumer Health Informatics", hours: 3, prereq: "HCI112" },
            { code: "IT476", name: "تقنية وسياسات أمن المعلومات / IT Security & Policies", hours: 3, prereq: "IT351" },
            { code: "HCI213", name: "الترميز والفواتير الطبية / Medical Coding & Billing", hours: 3, prereq: "HCI112" }
            ],
            "8": [
            { code: "ISLAM104", name: "النظام الاجتماعي وحقوق الإنسان / Islamic Social System", hours: 2, prereq: "—" },
            { code: "HCI314", name: "معلوماتية الصحة العامة / Public Health Informatics", hours: 3, prereq: "HCI213" },
            { code: "HCI315", name: "الرعاية الصحية عن بعد / Telemedicine", hours: 3, prereq: "HCI213" },
            { code: "HCI316", name: "الصحة الإلكترونية / e-Health", hours: 3, prereq: "HCI214" },
            { code: "Elective1", name: "مقرر اختياري 1 / Elective Course 1", hours: 3, prereq: "—" },
            { code: "Elective2", name: "مقرر اختياري 2 / Elective Course 2", hours: 3, prereq: "—" }
            ],
          }
        },
    ]
  },

  {
    id: "computing",
    name: "كلية الحوسبة والمعلوماتية",
    nameEn: "College of Computing & Informatics",
    icon: "fa-laptop-code",
    color: "#074842",
    specs: [
        {
          id: "it",
          name: "تقنية المعلومات",
          nameEn: "Information Technology",
          icon: "fa-network-wired",
          levels: {
            "1": [
            { code: "CS001", name: "مقدمة في الذكاء الاصطناعي والحوسبة / Introduction to Artificial Intelligent and Computing", hours: 3, prereq: "—" },
            { code: "CI001", name: "مهارات أكاديمية / Academic Skills", hours: 2, prereq: "—" },
            { code: "ENG001", name: "مهارات اللغة الإنجليزية 1 / English Skills 1", hours: 8, prereq: "—" }
            ],
            "2": [
            { code: "COMM001", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "—" },
            { code: "MATH001", name: "أساسيات الرياضيات / Fundamentals of Mathematics", hours: 3, prereq: "—" },
            { code: "ENG002", name: "مهارات اللغة الإنجليزية 2 / English Skills 2", hours: 8, prereq: "—" }
            ],
            "3": [
            { code: "IT231", name: "مقدمة في تقنية المعلومات ونظم المعلومات / Introduction to IT and IS", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "IT232", name: "البرمجة كائنية التوجه / Object Oriented Programming", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "IT233", name: "تنظيم الحاسوب / Computer Organization", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "MATH150", name: "الرياضيات المتقطعة / Discrete Mathematics", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "SCI101", name: "فيزياء عامة 1 / General Physics 1", hours: 3, prereq: "اجتياز السنة الأولى المشتركة" },
            { code: "ISLM101", name: "العقيدة الإسلامية / Islamic Faith", hours: 2, prereq: "اجتياز السنة الأولى المشتركة" }
            ],
            "4": [
            { code: "IT241", name: "أنظمة التشغيل / Operating Systems", hours: 3, prereq: "IT233" },
            { code: "IT244", name: "مقدمة في قواعد البيانات / Introduction to Database", hours: 3, prereq: "IT232" },
            { code: "IT245", name: "هياكل البيانات / Data Structure", hours: 3, prereq: "IT232" },
            { code: "ENG103", name: "الكتابة الفنية / Technical Writing", hours: 3, prereq: "—" },
            { code: "MATH251", name: "الجبر الخطي / Linear Algebra", hours: 3, prereq: "MATH150" },
            { code: "SCI201", name: "فيزياء عامة 2 / General Physics 2", hours: 3, prereq: "SCI101" }
            ],
            "5": [
            { code: "IT351", name: "شبكات الحاسب / Computer Networks", hours: 3, prereq: "IT241" },
            { code: "IT352", name: "التفاعل بين الإنسان والحاسوب / Human Computer Interaction", hours: 3, prereq: "IT231;IT245" },
            { code: "IT353", name: "تحليل وتصميم النظم / System Analysis and Design", hours: 3, prereq: "IT245" },
            { code: "IT354", name: "إدارة قواعد البيانات / Database Management Systems", hours: 3, prereq: "IT244" },
            { code: "STAT101", name: "الإحصاء / Statistics", hours: 3, prereq: "—" },
            { code: "ISLM102", name: "الأخلاق المهنية في الإسلام / Professional Conduct & Ethics in Islam", hours: 2, prereq: "—" }
            ],
            "6": [
            { code: "IT361", name: "تقنيات الويب / Web Technologies", hours: 3, prereq: "IT352;IT244" },
            { code: "IT362", name: "إدارة مشاريع تقنية المعلومات / IT Project Management", hours: 3, prereq: "IT353" },
            { code: "IT363", name: "إدارة الشبكات / Network Management", hours: 3, prereq: "IT351" },
            { code: "IT364", name: "ريادة الأعمال التقنية / IT Entrepreneurship and Innovation", hours: 3, prereq: "IT244" },
            { code: "IT365", name: "الأنظمة المؤسسية / Enterprise Systems", hours: 3, prereq: "IT352" },
            { code: "ISLM103", name: "النظام الاقتصادي الإسلامي / Islamic Economic System", hours: 2, prereq: "ISLM101" }
            ],
            "7": [
            { code: "IT471", name: "أمن المعلومات / Information Security", hours: 3, prereq: "IT363" },
            { code: "IT472", name: "الحوسبة السحابية / Cloud Computing", hours: 3, prereq: "IT365" },
            { code: "IT473", name: "تطوير تطبيقات الجوال / Mobile Application Development", hours: 3, prereq: "IT361" },
            { code: "IT474", name: "تنقيب البيانات / Data Mining", hours: 3, prereq: "IT354" },
            { code: "IT475", name: "التحول الرقمي / Digital Transformation", hours: 3, prereq: "IT362" },
            { code: "ISLM104", name: "النظام الاجتماعي الإسلامي / Islamic Social System", hours: 2, prereq: "ISLM102" }
            ],
            "8": [
            { code: "IT481", name: "إدارة الأمن السيبراني / Cybersecurity Management", hours: 3, prereq: "IT471" },
            { code: "IT482", name: "الذكاء الاصطناعي / Artificial Intelligence", hours: 3, prereq: "IT474" },
            { code: "IT483", name: "تحليل البيانات الضخمة / Big Data Analytics", hours: 3, prereq: "IT474" },
            { code: "IT484", name: "إنترنت الأشياء / Internet of Things", hours: 3, prereq: "IT473" },
            { code: "IT485", name: "مشروع التخرج / Capstone Project", hours: 4, prereq: "IT362;IT353" }
            ],
          }
        },
        {
          id: "cs",
          name: "علوم الحاسب الآلي",
          nameEn: "Computer Science",
          icon: "fa-computer",
          levels: {
            "1": [
            { code: "CS001", name: "مقدمة في الذكاء الاصطناعي والحوسبة / Introduction to Artificial Intelligent and Computing", hours: 3, prereq: "—" },
            { code: "CI001", name: "مهارات أكاديمية / Academic Skills", hours: 2, prereq: "—" },
            { code: "ENG001", name: "مهارات اللغة الإنجليزية 1 / English Skills 1", hours: 8, prereq: "—" }
            ],
            "2": [
            { code: "COMM001", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "—" },
            { code: "MATH001", name: "أساسيات الرياضيات / Fundamentals of Mathematics", hours: 3, prereq: "—" },
            { code: "ENG002", name: "مهارات اللغة الإنجليزية 2 / English Skills 2", hours: 8, prereq: "—" }
            ],
            "3": [
            { code: "SCI101", name: "فيزياء عامة 1 / General Physics 1", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "CS230", name: "البرمجة كائنية التوجه / Object Oriented Programming", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ENG103", name: "الكتابة الفنية / Technical Writing", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "MATH150", name: "الرياضيات المتقطعة / Discrete Mathematics", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "CS231", name: "تصميم المنطق الرقمي / Digital Logic Design", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ISLM101", name: "العقيدة الإسلامية / Islamic Faith", hours: 2, prereq: "اجتياز السنة الأولى" }
            ],
            "4": [
            { code: "SCI201", name: "فيزياء عامة 2 / General Physics 2", hours: 3, prereq: "SCI101" },
            { code: "CS240", name: "هياكل البيانات / Data Structure", hours: 3, prereq: "CS230" },
            { code: "CS241", name: "معمارية وتنظيم الحاسوب / Computer Architecture and Organization", hours: 3, prereq: "CS231" },
            { code: "CS242", name: "نظرية الحوسبة / Theory of Computing", hours: 3, prereq: "CS230" },
            { code: "CS243", name: "الرياضيات المتقطعة لعلوم الحاسب / Discrete Mathematics for CS", hours: 3, prereq: "MATH150" },
            { code: "ISLM102", name: "الأخلاق المهنية في الإسلام / Professional Conduct & Ethics in Islam", hours: 2, prereq: "—" }
            ],
            "5": [
            { code: "Math251", name: "الجبر الخطي / Linear Algebra", hours: 3, prereq: "MATH150" },
            { code: "CS350", name: "مقدمة في قواعد البيانات / Introduction to Database", hours: 3, prereq: "CS240" },
            { code: "CS351", name: "أنظمة التشغيل / Operating Systems", hours: 3, prereq: "CS241" },
            { code: "CS352", name: "تحليل وتصميم النظم / System Analysis and Design", hours: 3, prereq: "CS230" },
            { code: "CS353", name: "تصميم وتحليل الخوارزميات / Design and Analysis of Algorithms", hours: 3, prereq: "CS240;CS242" },
            { code: "ISLM103", name: "النظام الاقتصادي الإسلامي / Islamic Economic System", hours: 2, prereq: "ISLM101" }
            ],
            "6": [
            { code: "CS360", name: "شبكات الحاسب / Computer Networks", hours: 3, prereq: "CS351" },
            { code: "STAT101", name: "الإحصاء / Statistics", hours: 3, prereq: "MATH150" },
            { code: "CS361", name: "برمجة الويب / Web Programming", hours: 3, prereq: "CS350" },
            { code: "CS362", name: "الذكاء الاصطناعي / Artificial Intelligence", hours: 3, prereq: "CS353" },
            { code: "CS363", name: "مبادئ لغات البرمجة / Principles of Programming Languages", hours: 3, prereq: "CS240" },
            { code: "CS364", name: "ريادة الأعمال والابتكار في الحوسبة / Computing Entrepreneurship and Innovation", hours: 3, prereq: "CS350" }
            ],
            "7": [
            { code: "ISLM104", name: "النظام الاجتماعي الإسلامي / Islamic Social System", hours: 2, prereq: "ISLM102" },
            { code: "CS470", name: "التفاعل بين الإنسان والحاسوب / Human Computer Interaction", hours: 3, prereq: "CS352" },
            { code: "CS471", name: "أمن الحاسوب / Computer Security", hours: 3, prereq: "CS360" },
            { code: "CS479", name: "مشروع التخرج 1 / Senior Project 1", hours: 3, prereq: "CS350;CS352" },
            { code: "CS4xx", name: "مقرر اختياري 1 / Elective 1", hours: 3, prereq: "—" },
            { code: "CS4xx", name: "مقرر اختياري 2 / Elective 2", hours: 3, prereq: "—" }
            ],
            "8": [
            { code: "CS489", name: "مشروع التخرج 2 / Senior Project 2", hours: 3, prereq: "CS479" },
            { code: "CS480", name: "إدارة المشاريع الحاسوبية / Project Management in Computing", hours: 3, prereq: "CS352" },
            { code: "CS481", name: "الأخلاقيات المهنية في علوم الحاسب / Professional Ethics in Computer Science", hours: 3, prereq: "—" },
            { code: "CS4xx", name: "مقرر اختياري 3 / Elective 3", hours: 3, prereq: "—" },
            { code: "CS4xx", name: "مقرر اختياري 4 / Elective 4", hours: 3, prereq: "—" },
            { code: "CS499", name: "التدريب العملي / Practical Training", hours: 3, prereq: "اجتياز 86 ساعة" }
            ],
          }
        },
        {
          id: "ds",
          name: "علوم البيانات",
          nameEn: "Data Science",
          icon: "fa-database",
          levels: {
            "1": [
            { code: "CS001", name: "مقدمة في الذكاء الاصطناعي والحوسبة / Introduction to Artificial Intelligent and Computing", hours: 3, prereq: "—" },
            { code: "CI001", name: "مهارات أكاديمية / Academic Skills", hours: 2, prereq: "—" },
            { code: "ENG001", name: "مهارات اللغة الإنجليزية 1 / English Skills 1", hours: 8, prereq: "—" }
            ],
            "2": [
            { code: "COMM001", name: "مهارات الاتصال / Communication Skills", hours: 2, prereq: "—" },
            { code: "MATH001", name: "أساسيات الرياضيات / Fundamentals of Mathematics", hours: 3, prereq: "—" },
            { code: "ENG002", name: "مهارات اللغة الإنجليزية 2 / English Skills 2", hours: 8, prereq: "—" }
            ],
            "3": [
            { code: "SCI101", name: "فيزياء عامة 1 / General Physics 1", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "DS230", name: "البرمجة كائنية التوجه / Object Oriented Programming", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ENG103", name: "الكتابة الفنية / Technical Writing", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "MATH150", name: "الرياضيات المتقطعة / Discrete Mathematics", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "DS231", name: "مقدمة في برمجة علوم البيانات / Introduction to Data Science Programming", hours: 3, prereq: "اجتياز السنة الأولى" },
            { code: "ISLM101", name: "العقيدة الإسلامية / Islamic Faith", hours: 2, prereq: "اجتياز السنة الأولى" }
            ],
            "4": [
            { code: "MATH251", name: "الجبر الخطي / Linear Algebra", hours: 3, prereq: "MATH150" },
            { code: "DS240", name: "هياكل البيانات / Data Structure", hours: 3, prereq: "DS230" },
            { code: "MATH241", name: "الرياضيات المتقدمة / Advanced Mathematics", hours: 3, prereq: "—" },
            { code: "DS242", name: "برمجة علوم البيانات المتقدمة / Advanced Data Science Programming", hours: 3, prereq: "DS231" },
            { code: "DS243", name: "معمارية وتنظيم الحاسوب / Computer Architecture and Organization", hours: 3, prereq: "—" },
            { code: "ISLM102", name: "الأخلاق المهنية في الإسلام / Professional Conduct & Ethics in Islam", hours: 2, prereq: "—" }
            ],
            "5": [
            { code: "SCI201", name: "فيزياء عامة 2 / General Physics 2", hours: 3, prereq: "SCI101" },
            { code: "DS350", name: "مقدمة في قواعد البيانات / Introduction to Database", hours: 3, prereq: "DS240" },
            { code: "DS351", name: "أنظمة التشغيل / Operating Systems", hours: 3, prereq: "DS243" },
            { code: "STAT202", name: "مقدمة في الإحصاء والاحتمالات / Introduction to Statistics and Probabilities", hours: 3, prereq: "MATH150" },
            { code: "DS352", name: "تصميم وتحليل الخوارزميات / Design and Analysis of Algorithms", hours: 3, prereq: "DS240" },
            { code: "DS353", name: "إدارة المشاريع الحاسوبية / Project Management in Computing", hours: 3, prereq: "—" }
            ],
            "6": [
            { code: "DS360", name: "شبكات الحاسب / Computer Networks", hours: 3, prereq: "DS243" },
            { code: "DS361", name: "تحليل وتصميم النظم / System Analysis and Design", hours: 3, prereq: "DS240" },
            { code: "DS362", name: "برمجة الويب / Web Programming", hours: 3, prereq: "DS350" },
            { code: "DS363", name: "الذكاء الاصطناعي / Artificial Intelligence", hours: 3, prereq: "DS352" },
            { code: "DS364", name: "تنظيم وإدارة البيانات / Data Curation (Management and Organization)", hours: 3, prereq: "DS350" },
            { code: "ISLM103", name: "النظام الاقتصادي الإسلامي / Islamic Economic System", hours: 2, prereq: "ISLM101" }
            ],
            "7": [
            { code: "DS470", name: "أمن البيانات والخصوصية / Data Security and Privacy", hours: 3, prereq: "DS364" },
            { code: "DS471", name: "تعلم الآلة / Machine Learning", hours: 3, prereq: "DS363" },
            { code: "DS472", name: "تنقيب البيانات / Data Mining", hours: 3, prereq: "DS364" },
            { code: "DS479", name: "مشروع التخرج 1 / Senior Project 1", hours: 3, prereq: "DS361;DS362" },
            { code: "DS4xx", name: "مقرر اختياري 1 / Elective 1", hours: 3, prereq: "—" },
            { code: "DS4xx", name: "مقرر اختياري 2 / Elective 2", hours: 3, prereq: "—" }
            ],
            "8": [
            { code: "ISLM104", name: "النظام الاجتماعي الإسلامي / Islamic Social System", hours: 2, prereq: "ISLM102" },
            { code: "DS480", name: "تصوير البيانات / Data Visualization", hours: 3, prereq: "DS472" },
            { code: "DS481", name: "الأخلاقيات المهنية في علوم البيانات / Professional Ethics in Data Science", hours: 3, prereq: "—" },
            { code: "DS489", name: "مشروع التخرج 2 / Senior Project 2", hours: 3, prereq: "DS479" },
            { code: "DS4xx", name: "مقرر اختياري 3 / Elective 3", hours: 3, prereq: "—" },
            { code: "DS4xx", name: "مقرر اختياري 4 / Elective 4", hours: 3, prereq: "—" },
            { code: "DS499", name: "التدريب العملي / Practical Training", hours: 3, prereq: "اجتياز 86 ساعة" }
            ],
          }
        },
    ]
  }
];

/* ===== Helper: find spec by id ===== */
function findSpec(specId) {
  for (var i = 0; i < COLLEGES.length; i++) {
    for (var j = 0; j < COLLEGES[i].specs.length; j++) {
      if (COLLEGES[i].specs[j].id === specId) {
        return { college: COLLEGES[i], spec: COLLEGES[i].specs[j] };
      }
    }
  }
  return null;
}

/* ===== Helper: compute total hours for a spec ===== */
function totalHours(spec) {
  var total = 0;
  Object.keys(spec.levels).forEach(function (lvl) {
    spec.levels[lvl].forEach(function (c) { total += c.hours; });
  });
  return total;
}

/* ===== Helper: count courses ===== */
function totalCourses(spec) {
  var count = 0;
  Object.keys(spec.levels).forEach(function (lvl) { count += spec.levels[lvl].length; });
  return count;
}
