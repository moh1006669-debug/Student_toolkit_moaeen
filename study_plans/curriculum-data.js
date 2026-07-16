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
    color: "#0A4542",
    specs: [
      { id: "business-admin", name: "إدارة الأعمال", nameEn: "Business Administration", icon: "fa-briefcase", levels: {} },
      { id: "accounting", name: "المحاسبة", nameEn: "Accounting", icon: "fa-calculator", levels: {} },
      { id: "e-commerce", name: "التجارة الإلكترونية", nameEn: "E-Commerce", icon: "fa-cart-shopping", levels: {} },
      { id: "finance", name: "المالية", nameEn: "Finance", icon: "fa-money-bill-trend-up", levels: {} }
    ]
  },
  {
    id: "health",
    name: "كلية العلوم الصحية",
    nameEn: "College of Health Sciences",
    icon: "fa-heart-pulse",
    color: "#074842",
    specs: [
      { id: "public-health", name: "الصحة العامة", nameEn: "Public Health", icon: "fa-heart-pulse", levels: {} },
      { id: "health-informatics", name: "المعلوماتية الصحية", nameEn: "Health Informatics", icon: "fa-laptop-medical", levels: {} }
    ]
  },
  {
    id: "computing",
    name: "كلية الحوسبة والمعلوماتية",
    nameEn: "College of Computing & Informatics",
    icon: "fa-laptop-code",
    color: "#0A4542",
    specs: [
      { id: "it", name: "تقنية المعلومات", nameEn: "Information Technology", icon: "fa-network-wired", levels: {} },
      { id: "cs", name: "علوم الحاسب", nameEn: "Computer Science", icon: "fa-computer", levels: {} },
      { id: "ds", name: "علوم البيانات", nameEn: "Data Science", icon: "fa-database", levels: {} }
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
