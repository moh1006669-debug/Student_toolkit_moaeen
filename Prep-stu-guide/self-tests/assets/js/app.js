/* ===== نافذة الإختبارات الذاتيه — منصة معين =====
   نسخة مستقلة (Vanilla JS) لصفحة ويب ثابتة — قابلة للنشر على GitHub Pages.
   منقولة بالكامل من نسخة Next.js الأصلية (نفس السلوك والتصميم والوظائف)
   مع استبدال حفظ النتائج عبر قاعدة البيانات بحفظ محلي (localStorage).

   الملفات:
   - assets/js/icons.js  → أيقونات lucide + أيقونات التواصل
   - assets/js/data.js   → بيانات المقررات والاختبارات وبنوك الأسئلة
   - assets/js/app.js    → منطق الصفحة (هذا الملف)
   - assets/brand/*.webp → الشعارات الرسمية (هيدر/فوتر) */

(function () {
  'use strict'

  var DATA = window.MUEEN_DATA
  var ICONS = window.MUEEN_ICONS
  var BRAND = window.MUEEN_BRAND

  if (!DATA || !ICONS || !BRAND) {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<div style="padding:16px;text-align:center;font-family:Tahoma;background:#e5c158;color:#012727">تعذر تحميل ملفات البيانات أو الأيقونات — تأكد من وجود مجلد assets بجانب الصفحة.</div>',
    )
    return
  }

  /* ================== الإعدادات ==================
     TOOLS_URL: وجهة زر «العودة للأدوات» —
     في النسخة المستقلة رابط مؤقت (#)، وعند الدمج داخل مكتبة أدوات معين
     اضبطه على رابط صفحة المكتبة (مثال: '/' أو '../index.html' أو رابط GitHub Pages الخاص بالمكتبة). */
  var CONFIG = {
    TOOLS_URL: '#',
    STORAGE_KEY: 'mueen-self-tests-stats-v1',
    WHATSAPP_HELP_URL: 'https://api.whatsapp.com/send?phone=966536004199',
    /* رابط قروب مساعد التحضيري — يُستبدل يدوياً عند توفره */
    PREP_GROUP_URL: '#',
    /* رابط المكتبه الرقميه الجامعيه */
    DIGITAL_LIBRARY_URL: 'https://seu-moaeen.vercel.app/library',
  }
  window.MUEEN_CONFIG = CONFIG

  var PAGE_TITLE = DATA.pageTitle

  /* ================== أدوات مساعدة ================== */

  /** أيقونة lucide بحجم محدد */
  function icon(name, size, extraAttrs) {
    var inner = ICONS[name]
    if (!inner) return ''
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (extraAttrs || '') + '>' + inner + '</svg>'
    )
  }

  /** شعار/أيقونة علامة تجارية */
  function brand(name, cls) {
    return BRAND[name] ? BRAND[name](cls || '') : ''
  }

  /** تهريب النصوص قبل إدراجها في HTML */
  function esc(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  /** تحويل ثوانٍ إلى صيغة عدّاد MM:SS */
  function formatClock(totalSeconds) {
    var safe = Math.max(0, totalSeconds)
    var minutes = Math.floor(safe / 60)
    var seconds = safe % 60
    return (
      (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  function shuffle(items) {
    var arr = items.slice()
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var tmp = arr[i]
      arr[i] = arr[j]
      arr[j] = tmp
    }
    return arr
  }

  /* ================== طبقة البيانات (منقولة من quiz-data.ts) ================== */

  var ARABIC_ORDINALS = [
    'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس',
    'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر',
  ]

  function coursesForPlan(plan) {
    return DATA.plans[plan === 'B' ? 'B' : 'A'] || []
  }

  var QUIZ_CACHE = {}

  function quizzesForCourse(course) {
    var cacheKey = course.key + course.plan
    if (QUIZ_CACHE[cacheKey]) return QUIZ_CACHE[cacheKey]
    var quizzes = []
    for (var i = 0; i < course.quizCount; i++) {
      quizzes.push({
        id: course.plan + '-' + course.key + '-' + (i + 1),
        plan: course.plan,
        courseKey: course.key,
        courseLabel: course.label,
        title: course.quizPrefix + ' ' + (ARABIC_ORDINALS[i] || String(i + 1)),
        index: i + 1,
      })
    }
    QUIZ_CACHE[cacheKey] = quizzes
    return quizzes
  }

  /** وصف بيانات إختبار: عدد الأسئلة والمدة والمصدر */
  function quizMeta(quiz) {
    var real = DATA.realQuizzes[quiz.id]
    if (real) {
      return {
        questionCount: real.length,
        durationSec: Math.max(
          DATA.constants.quizDurationSec,
          real.length * DATA.constants.secondsPerRealQuestion,
        ),
        source: 'real',
      }
    }
    return {
      questionCount: DATA.constants.questionsPerQuiz,
      durationSec: DATA.constants.quizDurationSec,
      source: 'bank',
    }
  }

  function bankSize(courseKey) {
    return (DATA.banks[courseKey] || []).length
  }

  /* خيارات شامله (جميع ما ذكر / لا شيء مما ذكر...) تعتمد على ما قبلها —
     تُثبَّت في آخر الخيارات ولا تُخلط حتى لا تفقد دلالتها */
  var CATCH_ALL_OPTION_RE = /^(?:جميع|كل)\s+(?:ما|مما)\s*ذك|لا شيء\s+(?:ما|مما)\s*ذك/

  /** ترتيب خيارات مخلوط مع تثبيت الخيارات الشامله في آخرها (بترتيبها الأصلي) */
  function shuffledOptionOrder(options) {
    var catchAll = []
    var rest = []
    options.forEach(function (opt, i) {
      if (CATCH_ALL_OPTION_RE.test(String(opt).trim())) catchAll.push(i)
      else rest.push(i)
    })
    return shuffle(rest).concat(catchAll)
  }

  /** اختيار عشوائي من بنك أسئلة المقرر */
  function buildBankQuestions(courseKey, count) {
    count = count || DATA.constants.questionsPerQuiz
    var bank = DATA.banks[courseKey] || []
    var picked = shuffle(bank).slice(0, Math.min(count, bank.length))
    return picked.map(function (q) {
      var order = shuffledOptionOrder(q.options)
      return {
        question: q.question,
        options: order.map(function (i) {
          return q.options[i]
        }),
        correctIndex: order.indexOf(q.correctIndex),
        explanation: q.explanation,
      }
    })
  }

  /** يبني أسئلة جلسة إختبار:
   *  - الإختبارات الرسمية: جميع الأسئلة بترتيب الملف الأصلي مع خلط ترتيب الخيارات
   *  - غيرها: اختيار عشوائي من بنك المقرر + خلط الخيارات */
  function buildQuizQuestions(quiz) {
    var real = DATA.realQuizzes[quiz.id]
    if (real && real.length > 0) {
      return real.map(function (q) {
        var order = shuffledOptionOrder(q.options)
        return {
          question: q.question,
          options: order.map(function (i) {
            return q.options[i]
          }),
          correctIndex: order.indexOf(q.correctIndex),
          explanation: q.explanation,
        }
      })
    }
    return buildBankQuestions(quiz.courseKey)
  }

  /* ================== مخزن النتائج (localStorage بديلاً عن قاعدة البيانات) ==================
     الشكل: { quizId: { best, attempts, lastPercentage, lastAt } } */

  var bestScores = {}
  var storageOk = true

  function loadStats() {
    try {
      var raw = window.localStorage.getItem(CONFIG.STORAGE_KEY)
      if (raw) {
        var parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') bestScores = parsed
      }
    } catch (e) {
      storageOk = false
    }
  }

  function saveStats() {
    if (!storageOk) return
    try {
      window.localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(bestScores))
    } catch (e) {
      storageOk = false
    }
  }

  /** تسجيل محاولة: تحديث أفضل نتيجة وعدد المحاولات وحفظها محلياً */
  function recordAttempt(quiz, result) {
    var current = bestScores[quiz.id]
    bestScores[quiz.id] = {
      best: Math.max(current ? current.best : 0, result.percentage),
      attempts: (current ? current.attempts : 0) + 1,
      lastPercentage: result.percentage,
      lastAt: new Date().toISOString(),
    }
    saveStats()
    refreshBestChip(quiz.id)
  }

  /* ================== حالة الصفحة ================== */

  var activePlan = 'A'

  /* ================== العرض: تبويبات الخطة ================== */

  function renderPlanTabs() {
    var root = document.getElementById('plan-tabs-root')
    root.innerHTML =
      '<div class="preparatory-plan-tabs" role="tablist" aria-label="خطط طلبة التحضيري">' +
      '<button type="button" class="preparatory-plan-tab' +
      (activePlan === 'A' ? ' active' : '') +
      '" role="tab" aria-selected="' + (activePlan === 'A') + '" data-plan="A">طلاب الخطة _ 🅰️</button>' +
      '<button type="button" class="preparatory-plan-tab' +
      (activePlan === 'B' ? ' active' : '') +
      '" role="tab" aria-selected="' + (activePlan === 'B') + '" data-plan="B">طلاب الخطة _ 🅱️</button>' +
      '</div>'
  }

  /* ================== العرض: الواجهة الرئيسية (بطاقات المقررات) ================== */

  var COURSE_ICONS = {
    academic: 'penTool',
    computer: 'laptop',
    english: 'languages',
    communication: 'messageSquare',
    math: 'squareRadical',
  }

  function renderHub() {
    var courses = coursesForPlan(activePlan)
    var html =
      '<main class="main-content" id="quizzes">' +
      '<div class="page-corner-badge">' +
      icon('clipboardList', 13) +
      '<span>تجميعات أسئلة واختبارات سابقة</span>' +
      '</div><div class="course-sections">'

    courses.forEach(function (course) {
      var quizzes = quizzesForCourse(course)
      var bankCount = bankSize(course.key)
      var realCount = 0
      quizzes.forEach(function (q) {
        if (quizMeta(q).source === 'real') realCount++
      })
      var iconKey = COURSE_ICONS[course.icon] || 'clipboardList'

      html +=
        '<section class="course-section" aria-label="مقرر ' + esc(course.label) + '">' +
        '<div class="course-section-title">' +
        '<span class="course-title-pill">' +
        icon(iconKey, 24) +
        '<span>' + esc(course.label) + '</span>' +
        '</span></div>' +
        '<div class="course-section-meta">' +
        '<span>' + esc(course.description) + '</span>' +
        '<span class="meta-dot" aria-hidden="true">•</span>' +
        '<span class="meta-strong">' + course.quizCount + ' اختبارات</span>' +
        '<span class="meta-dot" aria-hidden="true">•</span>' +
        (realCount > 0
          ? '<span class="meta-real">' + realCount + ' إختبارات من الملفات الرسمية</span>'
          : '<span>بنك ' + bankCount + ' سؤالاً</span>') +
        '</div>' +
        '<div class="quiz-grid">'

      quizzes.forEach(function (quiz) {
        html += quizCardHTML(quiz, bestScores[quiz.id])
      })

      html += resourcesCardHTML(course) + '</div></section>'
    })

    html += '</div></main>'
    document.getElementById('quiz-hub-root').innerHTML = html
  }

  /** بطاقة إختبار فرعية: الاسم + عدد الأسئلة + زر بدء الإختبار */
  function quizCardHTML(quiz, stat) {
    var meta = quizMeta(quiz)
    return (
      '<article class="quiz-card' + (meta.source === 'real' ? ' real' : '') + '" data-quiz-card="' + esc(quiz.id) + '">' +
      '<div class="quiz-card-top">' +
      '<span class="quiz-num-badge" aria-hidden="true">' + quiz.index + '</span>' +
      (meta.source === 'real'
        ? '<span class="quiz-real-chip" title="أسئلة هذا الإختبار مستخرجة من ملف الإختبار الرسمي">' +
          icon('badgeCheck', 11) + '<span>الملف الأصلي</span></span>'
        : '') +
      (stat
        ? '<span class="quiz-best-chip" title="أفضل نتيجة: ' + stat.best + '% — عدد المحاولات: ' + stat.attempts + '">' +
          icon('trophy', 11) + '<span dir="ltr">' + stat.best + '%</span></span>'
        : '') +
      '</div>' +
      '<h4 class="quiz-card-title">' + esc(quiz.title) + '</h4>' +
      '<div class="quiz-card-meta">' +
      '<span class="quiz-meta-chip">' + icon('fileQuestion', 10) +
      '<span>' + meta.questionCount + ' أسئلة</span></span>' +
      '<span class="quiz-meta-chip">' + icon('clock3', 10) +
      '<span dir="ltr">' + formatClock(meta.durationSec) + '</span></span>' +
      '</div>' +
      '<button type="button" class="quiz-start-btn" data-start="' + esc(quiz.id) + '"' +
      ' aria-label="بدء ' + esc(quiz.title) + ' — ' + esc(quiz.courseLabel) + '">' +
      icon('play', 13) + '<span>بدء الإختبار</span>' +
      '</button></article>'
    )
  }

  /** تحديث شريحة أفضل نتيجة على بطاقة إختبار دون إعادة رسم الواجهة كلها */
  function refreshBestChip(quizId) {
    var card = document.querySelector('[data-quiz-card="' + quizId + '"]')
    if (!card) return
    var top = card.querySelector('.quiz-card-top')
    if (!top) return
    var existing = top.querySelector('.quiz-best-chip')
    var stat = bestScores[quizId]
    var chip =
      '<span class="quiz-best-chip" title="أفضل نتيجة: ' + stat.best + '% — عدد المحاولات: ' + stat.attempts + '">' +
      icon('trophy', 11) + '<span dir="ltr">' + stat.best + '%</span></span>'
    if (existing) {
      existing.outerHTML = chip
    } else {
      top.insertAdjacentHTML('beforeend', chip)
    }
  }

  /* ================== بطاقه مصادر المقرر (بطاقه فرعيه ضمن شبكه بطاقات الإختبار) ================== */

  /** بطاقه واحده تضم: قروب مساعد التحضيري + المكتبه الرقميه الجامعيه */
  function resourcesCardHTML(course) {
    return (
      '<section class="resources-card" aria-label="مصادر مقرر ' + esc(course.label) + '">' +
      '<div class="resources-card-top">' +
      '<span class="resources-head-badge" aria-hidden="true">' + icon('bookMarked', 15) + '</span>' +
      '<h4 class="resources-card-title">مصادر المقرر</h4>' +
      '</div>' +
      '<div class="resource-row">' +
      '<span class="resource-icon" aria-hidden="true">' + icon('users', 16) + '</span>' +
      '<span class="resource-text">' +
      '<span class="resource-title">إنضم الى قروب مساعد التحضيري</span>' +
      '<span class="resource-sub">لمزيد من التجميعات والملخصات</span>' +
      '</span>' +
      '<a href="' + CONFIG.PREP_GROUP_URL + '" class="resource-btn" aria-label="إنضمام الى قروب مساعد التحضيري">' +
      '<span>إنضمام</span>' + icon('arrowLeft', 12) + '</a>' +
      '</div>' +
      '<div class="resource-row">' +
      '<span class="resource-icon" aria-hidden="true">' + icon('library', 16) + '</span>' +
      '<span class="resource-text">' +
      '<span class="resource-title">تصفح المكتبة الرقمية الجامعيه</span>' +
      '<span class="resource-sub">تجميعات وملخصات ومصادر المقررات</span>' +
      '</span>' +
      '<a href="' + CONFIG.DIGITAL_LIBRARY_URL + '" target="_blank" rel="noopener noreferrer" class="resource-btn"' +
      ' aria-label="فتح المكتبه الرقمية الجامعيه">' +
      '<span>فتح المكتبه</span>' + icon('externalLink', 12) + '</a>' +
      '</div>' +
      '</section>'
    )
  }

  /* ================== قائمة المشاركة ================== */

  function initShareMenu() {
    var dropdown = document.getElementById('share-dropdown')
    var btn = document.getElementById('share-btn')
    if (!dropdown || !btn) return

    function isOpen() {
      return dropdown.classList.contains('is-active')
    }

    function setOpen(open) {
      dropdown.classList.toggle('is-active', open)
      btn.setAttribute('aria-expanded', open ? 'true' : 'false')
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation()
      setOpen(!isOpen())
    })

    /* إغلاق عند النقر خارج القائمة */
    document.addEventListener('click', function (e) {
      if (isOpen() && !dropdown.contains(e.target)) setOpen(false)
    })

    /* زر Escape لإغلاق القائمة */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false)
    })

    function currentPageUrl() {
      return window.location.href
    }

    function openShareWindow(url) {
      var popup = window.open(url, '_blank', 'noopener,noreferrer')
      if (!popup) window.location.href = url
    }

    function shareViaWhatsapp() {
      var text = encodeURIComponent(PAGE_TITLE + '\n' + currentPageUrl())
      openShareWindow('https://api.whatsapp.com/send?text=' + text)
      setOpen(false)
    }

    function shareViaTelegram() {
      var url = encodeURIComponent(currentPageUrl())
      var text = encodeURIComponent(PAGE_TITLE)
      openShareWindow('https://t.me/share/url?url=' + url + '&text=' + text)
      setOpen(false)
    }

    function copyCurrentPageUrl() {
      var value = currentPageUrl()
      var copiedBtn = dropdown.querySelector('[data-share="copy"]')
      var done = function () {
        if (copiedBtn) {
          var labelSpan = copiedBtn.querySelector('span')
          var linkIcon = copiedBtn.querySelector('.link-icon')
          if (labelSpan) labelSpan.textContent = 'تم نسخ الرابط'
          if (linkIcon) linkIcon.outerHTML = icon('check', 20, ' class="link-icon"')
          copiedBtn.classList.add('copied')
        }
        window.setTimeout(function () {
          setOpen(false)
          /* إعادة الزر لحالته الأصلية بعد الإغلاق */
          window.setTimeout(function () {
            if (copiedBtn) {
              var span = copiedBtn.querySelector('span')
              if (span) span.textContent = 'نسخ رابط الصفحة'
              var svg = copiedBtn.querySelector('svg.link-icon')
              if (svg) svg.outerHTML = icon('link2', 20, ' class="link-icon"')
              copiedBtn.classList.remove('copied')
            }
          }, 250)
        }, 900)
      }

      var fallbackCopy = function () {
        var field = document.createElement('textarea')
        field.value = value
        field.setAttribute('readonly', '')
        field.style.position = 'fixed'
        field.style.opacity = '0'
        document.body.appendChild(field)
        field.select()
        try {
          document.execCommand('copy')
        } catch (err) {
          /* تجاهل فشل النسخ */
        }
        field.remove()
        done()
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(value)
          .then(done)
          .catch(fallbackCopy)
      } else {
        fallbackCopy()
      }
    }

    dropdown.addEventListener('click', function (e) {
      var option = e.target.closest('[data-share]')
      if (!option) return
      var kind = option.getAttribute('data-share')
      if (kind === 'whatsapp') shareViaWhatsapp()
      else if (kind === 'telegram') shareViaTelegram()
      else if (kind === 'copy') copyCurrentPageUrl()
    })
  }

  /* ================== طباعه المراجعه (مستند مستقل بهوية المنصه) ================== */

  /** يهرب النصوص قبل إدراجها في مستند الطباعه */
  function escapeForPrint(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  /** مستند طباعه مستقل لمحتوى مراجعة الإجابات بهوية منصة معين (RTL + ذهبي/أخضر داكن) */
  function buildReviewPrintDoc(opts) {
    var title = opts.title
    var courseLabel = opts.courseLabel
    var plan = opts.plan
    var questions = opts.questions
    var answers = opts.answers
    var result = opts.result
    var correctCount = 0
    questions.forEach(function (question, index) {
      if (answers[index] === question.correctIndex) correctCount++
    })
    var wrongCount = result.total - correctCount
    var printedAt = new Date().toLocaleDateString('ar-SA-u-ca-gregory-nu-latn', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    var items = questions
      .map(function (question, index) {
        var userAnswer = answers[index]
        var isCorrect = userAnswer === question.correctIndex
        var userText =
          userAnswer === null || userAnswer === undefined
            ? 'لم تُجب على هذا السؤال'
            : question.options[userAnswer]
        return (
          '<article class="item ' + (isCorrect ? 'correct' : 'wrong') + '">' +
          '<h3 class="q"><span class="num">' + (index + 1) + '</span><span>' + escapeForPrint(question.question) + '</span></h3>' +
          '<p class="row user"><span class="label">إجابتك:</span><span class="text">' + escapeForPrint(userText) +
          '</span><span class="badge ' + (isCorrect ? 'ok' : 'bad') + '">' + (isCorrect ? 'صحيحة' : 'خاطئة') + '</span></p>' +
          (isCorrect
            ? ''
            : '<p class="row key"><span class="label">الإجابة الصحيحة:</span><span class="text">' +
              escapeForPrint(question.options[question.correctIndex]) + '</span></p>') +
          (question.explanation
            ? '<p class="explain"><span class="label">التوضيح:</span> ' + escapeForPrint(question.explanation) + '</p>'
            : '') +
          '</article>'
        )
      })
      .join('')

    return '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8" />\n' +
      '<title>مراجعة الإجابات — ' + escapeForPrint(title) + '</title>\n<style>\n' +
      '@page { size: A4; margin: 12mm 10mm; }\n' +
      '* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n' +
      "body { margin: 0; font-family: 'Cairo', Tahoma, Arial, sans-serif; color: #1e293b; line-height: 1.7; background: #ffffff; }\n" +
      '.sheet-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-bottom: 10px; border-bottom: 3px solid #d4af37; }\n' +
      '.brand { display: flex; flex-direction: column; line-height: 1.4; }\n' +
      '.brand b { color: #012727; font-size: 15px; }\n' +
      '.brand span { color: #b8941f; font-size: 10px; letter-spacing: 1px; }\n' +
      '.doc-date { color: #64748b; font-size: 11px; font-weight: 700; }\n' +
      'h1 { margin: 14px 0 4px; color: #0f3057; font-size: 18px; font-weight: 800; text-align: center; }\n' +
      '.sub { margin: 0 0 12px; color: #64748b; font-size: 12px; font-weight: 700; text-align: center; }\n' +
      '.summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin: 0 0 14px; }\n' +
      '.summary div { border: 1px solid #e2e8eb; border-radius: 10px; padding: 8px 6px; text-align: center; }\n' +
      '.summary .v { display: block; color: #0f3057; font-size: 15px; font-weight: 900; direction: ltr; }\n' +
      '.summary .l { display: block; color: #64748b; font-size: 10px; font-weight: 700; }\n' +
      '.summary .ok .v { color: #167052; }\n' +
      '.summary .bad .v { color: #a33a4a; }\n' +
      '.item { border: 1px solid #e2e8eb; border-right: 4px solid #d4af37; border-radius: 10px; padding: 10px 12px; margin: 0 0 8px; break-inside: avoid; page-break-inside: avoid; }\n' +
      '.item.correct { border-right-color: #167052; }\n' +
      '.item.wrong { border-right-color: #dc3545; }\n' +
      '.q { margin: 0 0 6px; color: #0f3057; font-size: 13px; font-weight: 800; display: flex; gap: 8px; align-items: flex-start; }\n' +
      '.q .num { flex: 0 0 22px; width: 22px; height: 22px; border-radius: 50%; background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.5); color: #b8941f; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }\n' +
      '.row { margin: 3px 0; font-size: 11.5px; font-weight: 700; display: flex; align-items: flex-start; gap: 6px; flex-wrap: wrap; }\n' +
      '.row .label { color: #64748b; flex: 0 0 auto; }\n' +
      '.row.user .text { color: #0f3057; }\n' +
      '.row.key .text { color: #167052; }\n' +
      '.badge { margin-inline-start: auto; font-size: 10px; font-weight: 800; padding: 1px 8px; border-radius: 999px; }\n' +
      '.badge.ok { color: #167052; background: #dff5ea; border: 1px solid #b9e6d1; }\n' +
      '.badge.bad { color: #a33a4a; background: #fdebed; border: 1px solid #efb2b7; }\n' +
      '.explain { margin: 6px 0 0; padding: 8px 10px; background: #fffdf4; border: 1px dashed rgba(212, 175, 55, 0.55); border-radius: 8px; font-size: 11px; font-weight: 600; }\n' +
      '.explain .label { color: #b8941f; font-weight: 800; }\n' +
      '.foot { margin: 12px 0 0; padding-top: 8px; border-top: 1px solid #e2e8eb; color: #64748b; font-size: 10px; font-weight: 700; text-align: center; }\n' +
      '</style>\n</head>\n<body>\n' +
      '<header class="sheet-head">\n' +
      '<div class="brand"><b>منصة معين التعليمية</b><span>MOAEEN PLATFORM</span></div>\n' +
      '<div class="doc-date">تاريخ الطباعه: ' + printedAt + '</div>\n' +
      '</header>\n' +
      '<h1>مراجعة الإجابات — ' + escapeForPrint(title) + '</h1>\n' +
      '<p class="sub">' + escapeForPrint(courseLabel) + ' — خطة ' + escapeForPrint(plan) + '</p>\n' +
      '<div class="summary">\n' +
      '<div><span class="v">' + result.percentage + '%</span><span class="l">النتيجه</span></div>\n' +
      '<div class="ok"><span class="v">' + correctCount + ' / ' + result.total + '</span><span class="l">إجابات صحيحه</span></div>\n' +
      '<div class="bad"><span class="v">' + wrongCount + '</span><span class="l">إجابات خاطئه</span></div>\n' +
      '<div><span class="v">' + formatClock(result.durationSec) + '</span><span class="l">الوقت المستغرق</span></div>\n' +
      '</div>\n' + items + '\n' +
      '<p class="foot">نافذة الإختبارات الذاتيه — منصة معين التعليمية</p>\n' +
      '</body>\n</html>'
  }

  /* ================== نافذة أداء الإختبار ==================
     مقدمة → أسئلة بمؤقت → نتائج → مراجعة إجابات */

  var OPTION_LETTERS = ['أ', 'ب', 'ج', 'د']
  var session = null /* { quiz, questions, attempt, startImmediately } */

  function findQuizById(quizId) {
    var result = null
    ;['A', 'B'].forEach(function (plan) {
      coursesForPlan(plan).forEach(function (course) {
        quizzesForCourse(course).forEach(function (quiz) {
          if (quiz.id === quizId) result = quiz
        })
      })
    })
    return result
  }

  function startQuiz(quiz) {
    session = { quiz: quiz, questions: buildQuizQuestions(quiz), attempt: 1, startImmediately: false }
    mountQuizRunner()
  }

  function retryQuiz(quiz) {
    var attempt = session && session.quiz.id === quiz.id ? session.attempt + 1 : 1
    session = { quiz: quiz, questions: buildQuizQuestions(quiz), attempt: attempt, startImmediately: true }
    mountQuizRunner()
  }

  function closeQuiz() {
    session = null
    unmountQuizRunner()
  }

  var runner = null /* حالة نافذة الإختبار النشطة */

  function mountQuizRunner() {
    unmountQuizRunner()

    var quiz = session.quiz
    var questions = session.questions
    var meta = quizMeta(quiz)
    var durationSec = meta.durationSec

    var state = {
      phase: session.startImmediately ? 'running' : 'intro',
      answers: questions.map(function () {
        return null
      }),
      current: 0,
      deadline: session.startImmediately ? Date.now() + durationSec * 1000 : 0,
      remaining: durationSec,
      confirmExit: false,
      confirmSubmit: false,
      result: null,
      startedAt: session.startImmediately ? Date.now() : 0,
      finished: false,
      intervalId: null,
      escHandler: null,
    }

    var root = document.getElementById('quiz-runner-root')
    root.innerHTML =
      '<div class="quiz-overlay" role="dialog" aria-modal="true" aria-label="' +
      esc(quiz.title) + ' — ' + esc(quiz.courseLabel) + '">' +
      '<div class="quiz-modal">' +
      '<div class="quiz-modal-head">' +
      '<div class="quiz-head-titles">' +
      '<h3>' + icon('listChecks', 18) + '<span>' + esc(quiz.title) + '</span></h3>' +
      '<span class="quiz-course-chip">' + esc(quiz.courseLabel) + ' — خطة ' + quiz.plan + '</span>' +
      '</div>' +
      '<div class="quiz-head-actions">' +
      '<span class="quiz-timer" dir="ltr" hidden>' + icon('clock3', 13) + '<span class="timer-value"></span></span>' +
      '<button type="button" class="quiz-close-btn" aria-label="إغلاق نافذة الإختبار">' + icon('x', 16) + '</button>' +
      '</div></div>' +
      '<div class="quiz-progress-track" aria-hidden="true"><div class="quiz-progress-fill"></div></div>' +
      '<div class="quiz-modal-body"></div>' +
      '<div class="quiz-confirm-exit" hidden></div>' +
      '<div class="quiz-confirm-submit" hidden></div>' +
      '</div></div>'

    var overlay = root.querySelector('.quiz-overlay')
    var modal = root.querySelector('.quiz-modal')
    var body = root.querySelector('.quiz-modal-body')
    var timerEl = root.querySelector('.quiz-timer')
    var timerValue = root.querySelector('.timer-value')
    var progressFill = root.querySelector('.quiz-progress-fill')
    var confirmExitLayer = root.querySelector('.quiz-confirm-exit')
    var confirmSubmitLayer = root.querySelector('.quiz-confirm-submit')

    /* منع تمرير الصفحة خلف النافذة */
    document.body.classList.add('modal-open')

    runner = {
      quiz: quiz,
      questions: questions,
      meta: meta,
      state: state,
      elements: {
        root: root,
        overlay: overlay,
        modal: modal,
        body: body,
        timerEl: timerEl,
        timerValue: timerValue,
        progressFill: progressFill,
        confirmExitLayer: confirmExitLayer,
        confirmSubmitLayer: confirmSubmitLayer,
      },
      destroy: destroy,
      finish: finish,
    }

    /* ===== دوال داخلية ===== */

    function scrollToTop() {
      if (body.scrollTo) body.scrollTo({ top: 0, behavior: 'smooth' })
      else body.scrollTop = 0
    }

    function answeredCount() {
      var count = 0
      state.answers.forEach(function (a) {
        if (a !== null && a !== undefined) count++
      })
      return count
    }

    function updateProgress() {
      var pct =
        state.phase === 'results' || state.phase === 'review'
          ? 100
          : Math.round((answeredCount() / questions.length) * 100)
      progressFill.style.width = pct + '%'
    }

    function updateTimer() {
      if (state.phase === 'running') {
        timerEl.hidden = false
        timerValue.textContent = formatClock(state.remaining)
        timerEl.classList.toggle('danger', state.remaining <= 60)
      } else {
        timerEl.hidden = true
      }
    }

    function finish() {
      if (state.finished) return
      state.finished = true
      var score = 0
      questions.forEach(function (question, index) {
        if (state.answers[index] === question.correctIndex) score++
      })
      var percentage = questions.length
        ? Math.round((score / questions.length) * 100)
        : 0
      var used = Math.max(
        0,
        Math.min(durationSec, Math.round((Date.now() - state.startedAt) / 1000)),
      )
      state.result = { score: score, total: questions.length, percentage: percentage, durationSec: used }
      state.confirmExit = false
      state.confirmSubmit = false
      stopTimer()
      setPhase('results')
      recordAttempt(quiz, state.result)
    }

    function stopTimer() {
      if (state.intervalId) {
        window.clearInterval(state.intervalId)
        state.intervalId = null
      }
    }

    function startTimerLoop() {
      stopTimer()
      var tick = function () {
        var left = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000))
        state.remaining = left
        updateTimer()
        if (left <= 0) finish()
      }
      state.intervalId = window.setInterval(tick, 400)
      tick()
    }

    function setPhase(phase) {
      state.phase = phase
      state.confirmExit = false
      state.confirmSubmit = false
      renderConfirmLayers()
      if (phase === 'running' && state.deadline) startTimerLoop()
      else stopTimer()
      renderBody()
      updateTimer()
      updateProgress()
      scrollToTop()
    }

    function requestExit() {
      if (state.phase === 'running') {
        state.confirmExit = true
        renderConfirmLayers()
      } else {
        closeQuiz()
      }
    }

    function submitAttempt() {
      var unanswered = questions.length - answeredCount()
      if (unanswered > 0) {
        state.confirmSubmit = true
        renderConfirmLayers()
      } else {
        finish()
      }
    }

    function begin() {
      state.startedAt = Date.now()
      state.finished = false
      state.deadline = Date.now() + durationSec * 1000
      state.remaining = durationSec
      setPhase('running')
    }

    function chooseAnswer(questionIndex, optionIndex) {
      state.answers[questionIndex] = optionIndex
      updateProgress()
      /* إعادة رسم الشاشة الحالية لتحديث حالة التحديد والنقاط */
      renderBody()
    }

    function goTo(index) {
      state.current = Math.max(0, Math.min(questions.length - 1, index))
      renderBody()
      scrollToTop()
    }

    /** طباعه محتوى نافذة مراجعة الإجابات — مستند مستقل داخل إطار مخفي */
    function printReview() {
      if (!state.result) return
      var html = buildReviewPrintDoc({
        title: quiz.title,
        courseLabel: quiz.courseLabel,
        plan: quiz.plan,
        questions: questions,
        answers: state.answers,
        result: state.result,
      })

      var iframe = document.createElement('iframe')
      iframe.title = 'طباعه مراجعة ' + quiz.title
      iframe.setAttribute('aria-hidden', 'true')
      iframe.style.position = 'fixed'
      iframe.style.top = '0'
      iframe.style.right = '0'
      iframe.style.bottom = '0'
      iframe.style.left = '0'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = '0'
      iframe.style.visibility = 'hidden'

      iframe.onload = function () {
        /* مهله قصيرة لتحميل خط Cairo داخل مستند الطباعه قبل فتح حوار الطباعه */
        window.setTimeout(function () {
          try {
            if (iframe.contentWindow) iframe.contentWindow.focus()
            if (iframe.contentWindow) iframe.contentWindow.print()
          } catch (e) {
            /* تجاهل — بعض البيئات تمنع طباعه الإطارات المخفيه */
          }
          window.setTimeout(function () {
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
          }, 60000)
        }, 400)
      }
      iframe.srcdoc = html
      document.body.appendChild(iframe)
    }

    /* ===== طبقات التأكيد ===== */

    function renderConfirmLayers() {
      /* تأكيد الخروج */
      if (state.confirmExit) {
        confirmExitLayer.hidden = false
        confirmExitLayer.innerHTML =
          '<div class="quiz-confirm"><div class="quiz-confirm-box">' +
          '<h4>' + icon('alertTriangle', 16, ' style="color: #a33a4a; margin-left: 6px;"') + 'الخروج من الإختبار؟</h4>' +
          '<p>سيتم إلغاء محاولتك الحالية ولن تُحفظ نتيجتها. هل أنت متأكد؟</p>' +
          '<div class="quiz-confirm-actions">' +
          '<button type="button" class="quiz-ghost-btn" data-act="stay">متابعة الإختبار</button>' +
          '<button type="button" class="quiz-danger-btn" data-act="exit">' + icon('x', 14) + '<span>الخروج</span></button>' +
          '</div></div></div>'
      } else {
        confirmExitLayer.hidden = true
        confirmExitLayer.innerHTML = ''
      }

      /* تأكيد الإنهاء مع أسئلة بدون إجابة */
      var unanswered = questions.length - answeredCount()
      if (state.confirmSubmit) {
        confirmSubmitLayer.hidden = false
        confirmSubmitLayer.innerHTML =
          '<div class="quiz-confirm"><div class="quiz-confirm-box">' +
          '<h4>' + icon('alertTriangle', 16, ' style="color: #a33a4a; margin-left: 6px;"') + 'إنهاء الإختبار؟</h4>' +
          '<p>لديك ' + unanswered + ' ' + (unanswered === 1 ? 'سؤال' : 'أسئلة') +
          ' بدون إجابة. لن تحصل على درجاتها عند الإنهاء.</p>' +
          '<div class="quiz-confirm-actions">' +
          '<button type="button" class="quiz-ghost-btn" data-act="keep-solving">متابعة الحل</button>' +
          '<button type="button" class="quiz-gold-btn" data-act="confirm-finish">' + icon('flag', 14) + '<span>إنهاء الإختبار</span></button>' +
          '</div></div></div>'
      } else {
        confirmSubmitLayer.hidden = true
        confirmSubmitLayer.innerHTML = ''
      }
    }

    /* ===== جسم النافذة حسب الطور ===== */

    function renderBody() {
      if (state.phase === 'intro') renderIntro()
      else if (state.phase === 'running') renderQuestion()
      else if (state.phase === 'results') renderResults()
      else if (state.phase === 'review') renderReview()
    }

    function renderIntro() {
      var total = questions.length
      body.innerHTML =
        '<div class="quiz-intro">' +
        '<div class="quiz-intro-icon">' + icon('listChecks', 28) + '</div>' +
        '<h3 class="quiz-intro-title">' + esc(quiz.title) + '</h3>' +
        '<p class="quiz-intro-sub">' + esc(quiz.courseLabel) + ' — خطة ' + quiz.plan + '</p>' +
        '<div class="quiz-intro-grid">' +
        '<div class="quiz-intro-item">' + icon('fileQuestion', 17) +
        '<span class="item-value">' + total + ' أسئلة</span>' +
        '<span class="item-label">عدد الأسئلة</span></div>' +
        '<div class="quiz-intro-item">' + icon('clock3', 17) +
        '<span class="item-value" dir="ltr">' + formatClock(durationSec) + '</span>' +
        '<span class="item-label">مدة الإختبار</span></div>' +
        (meta.source === 'real'
          ? '<div class="quiz-intro-item">' + icon('fileCheck2', 17) +
            '<span class="item-value">أسئلة الملف الأصلي</span>' +
            '<span class="item-label">وفق ملف الإختبار الرسمي</span></div>'
          : '<div class="quiz-intro-item">' + icon('shuffle', 17) +
            '<span class="item-value">أسئلة عشوائية</span>' +
            '<span class="item-label">من بنك أسئلة المقرر</span></div>') +
        '</div>' +
        '<ul class="quiz-intro-rules">' +
        '<li>لكل سؤال إجابة واحدة صحيحة فقط، ويمكن تعديل اختيارك قبل الإنهاء.</li>' +
        '<li>يمكنك التنقل بين الأسئلة بحرية حتى لحظة إنهاء الإختبار.</li>' +
        '<li>يُنهى الإختبار تلقائياً عند انتهاء الوقت المحدد.</li>' +
        '<li>بعد الإنهاء تظهر نتيجتك مع مراجعة تفصيلية للإجابات الصحيحة.</li>' +
        '</ul>' +
        '<div class="quiz-intro-actions">' +
        '<button type="button" class="quiz-gold-btn" data-act="begin">' + icon('play', 15) + '<span>بدء الإختبار الآن</span></button>' +
        '</div></div>'
    }

    function renderQuestion() {
      var question = questions[state.current]
      if (!question) return
      var total = questions.length
      var selected = state.answers[state.current]

      var html =
        '<div class="quiz-question-screen">' +
        '<div class="quiz-question-head">' +
        '<span class="q-counter">السؤال ' + (state.current + 1) + ' من ' + total + '</span>' +
        '<span>تمت الإجابة: ' + answeredCount() + '</span>' +
        '</div>' +
        '<h3 class="quiz-question-text">' + esc(question.question) + '</h3>' +
        '<div class="quiz-options" role="radiogroup" aria-label="خيارات الإجابة">'

      question.options.forEach(function (option, optionIndex) {
        html +=
          '<button type="button" class="quiz-option' + (selected === optionIndex ? ' selected' : '') +
          '" role="radio" aria-checked="' + (selected === optionIndex) + '" data-choose="' + optionIndex + '">' +
          '<span class="option-letter" aria-hidden="true">' +
          (OPTION_LETTERS[optionIndex] != null ? OPTION_LETTERS[optionIndex] : optionIndex + 1) +
          '</span>' +
          '<span>' + esc(option) + '</span>' +
          '</button>'
      })

      html += '</div><div class="quiz-nav">' +
        '<button type="button" class="quiz-nav-btn" data-act="prev"' +
        (state.current === 0 ? ' disabled' : '') + '>' +
        icon('chevronRight', 14) + '<span>السابق</span></button>' +
        '<div class="quiz-dots" aria-hidden="true">'

      questions.forEach(function (_, questionIndex) {
        var cls = 'quiz-dot'
        if (state.answers[questionIndex] !== null && state.answers[questionIndex] !== undefined) cls += ' answered'
        if (questionIndex === state.current) cls += ' current'
        html +=
          '<button type="button" class="' + cls + '" data-dot="' + questionIndex + '" tabindex="-1" aria-label="السؤال ' + (questionIndex + 1) + '"></button>'
      })

      html += '</div>'

      if (state.current < total - 1) {
        html +=
          '<button type="button" class="quiz-nav-btn" data-act="next">' +
          '<span>التالي</span>' + icon('chevronLeft', 14) + '</button>'
      } else {
        html +=
          '<button type="button" class="quiz-nav-btn gold" data-act="submit">' +
          icon('flag', 14) + '<span>إنهاء الإختبار</span></button>'
      }

      html += '</div></div>'
      body.innerHTML = html
    }

    function renderResults() {
      var result = state.result
      if (!result) return
      var pct = result.percentage
      var ringClass = pct >= 80 ? 'good' : pct >= 60 ? 'mid' : 'low'
      var circumference = 2 * Math.PI * 65
      var dashOffset = circumference * (1 - pct / 100)
      var message =
        pct >= 90
          ? 'ممتاز! مستوى مراجعتك ممتاز'
          : pct >= 80
            ? 'جيد جداً — أنت على الطريق الصحيح'
            : pct >= 60
              ? 'جيد — راجع النقاط التي أخطأت فيها'
              : 'تحتاج إلى مراجعة المقرر مرة أخرى'

      body.innerHTML =
        '<div class="quiz-results">' +
        '<div class="score-ring-wrap ' + ringClass + '">' +
        '<svg class="score-ring" viewBox="0 0 150 150" aria-hidden="true">' +
        '<circle class="track" cx="75" cy="75" r="65"></circle>' +
        '<circle class="bar" cx="75" cy="75" r="65" stroke-dasharray="' + circumference +
        '" stroke-dashoffset="' + dashOffset + '"></circle>' +
        '</svg>' +
        '<div class="score-value">' +
        '<span class="pct">' + pct + '%</span>' +
        '<span class="frac">' + result.score + ' / ' + result.total + '</span>' +
        '</div></div>' +
        '<h3 class="score-message">' + message + '</h3>' +
        '<p class="score-subtitle">' + esc(quiz.title) + ' — ' + esc(quiz.courseLabel) + '</p>' +
        '<div class="quiz-result-stats">' +
        '<div class="quiz-stat-item"><span class="stat-value">' + result.score + '</span><span class="stat-label">إجابات صحيحة</span></div>' +
        '<div class="quiz-stat-item"><span class="stat-value">' + (result.total - result.score) + '</span><span class="stat-label">إجابات خاطئة</span></div>' +
        '<div class="quiz-stat-item"><span class="stat-value" dir="ltr">' + formatClock(result.durationSec) + '</span><span class="stat-label">الوقت المستغرق</span></div>' +
        '</div>' +
        '<div class="quiz-result-actions">' +
        '<button type="button" class="quiz-gold-btn" data-act="retry">' + icon('rotateCcw', 15) + '<span>إعادة الإختبار</span></button>' +
        '<button type="button" class="quiz-ghost-btn" data-act="review">' + icon('fileQuestion', 14) + '<span>مراجعة الإجابات</span></button>' +
        '<button type="button" class="quiz-ghost-btn" data-act="close">' + icon('chevronRight', 14) + '<span>العودة للبطاقات</span></button>' +
        '</div></div>'
    }

    function renderReview() {
      var html =
        '<div class="quiz-review">' +
        '<div class="quiz-review-head">' +
        '<span class="quiz-review-title">مراجعة الإجابات — ' + esc(quiz.title) + '</span>' +
        '<div class="quiz-review-actions">' +
        '<button type="button" class="quiz-review-print-btn" data-act="print-review"' +
        ' aria-label="طباعه محتوى مراجعة الإجابات">' +
        icon('printer', 14) + '<span>طباعه المراجعه</span>' +
        '</button>' +
        '<button type="button" class="quiz-ghost-btn" data-act="back-to-result">' +
        icon('chevronRight', 14) + '<span>العودة للنتيجة</span></button>' +
        '</div>' +
        '</div>'

      questions.forEach(function (question, questionIndex) {
        var userAnswer = state.answers[questionIndex]
        var isCorrect = userAnswer === question.correctIndex
        html +=
          '<article class="review-item ' + (isCorrect ? 'correct' : 'wrong') + '">' +
          '<div class="review-q-title">' +
          '<span class="review-status-icon">' +
          (isCorrect ? icon('checkCircle2', 13) : icon('xCircle', 13)) + '</span>' +
          '<span>' + (questionIndex + 1) + '. ' + esc(question.question) + '</span>' +
          '</div>' +
          '<div class="review-answers">' +
          '<div class="review-answer-row ' + (isCorrect ? 'correct' : 'wrong') + '">' +
          '<span class="answer-label">إجابتك:</span>' +
          '<span class="answer-text">' +
          (userAnswer === null || userAnswer === undefined
            ? 'لم تُجب على هذا السؤال'
            : esc(question.options[userAnswer])) +
          '</span></div>' +
          (!isCorrect
            ? '<div class="review-answer-row plain">' +
              '<span class="answer-label">الإجابة الصحيحة:</span>' +
              '<span class="answer-text">' + esc(question.options[question.correctIndex]) + '</span></div>'
            : '') +
          '</div>' +
          (question.explanation ? '<p class="review-explanation">' + esc(question.explanation) + '</p>' : '') +
          '</article>'
      })

      html += '</div>'
      body.innerHTML = html
    }

    /* ===== أحداث النافذة ===== */

    modal.addEventListener('click', function (e) {
      var target = e.target

      /* إغلاق النافذة */
      if (target.closest('.quiz-close-btn')) {
        requestExit()
        return
      }

      /* أزرار طبقات التأكيد */
      var confirmAct = target.closest('[data-act="stay"], [data-act="exit"], [data-act="keep-solving"], [data-act="confirm-finish"]')
      if (confirmAct) {
        var act = confirmAct.getAttribute('data-act')
        if (act === 'stay' || act === 'keep-solving') {
          state.confirmExit = false
          state.confirmSubmit = false
          renderConfirmLayers()
        } else if (act === 'exit') {
          closeQuiz()
        } else if (act === 'confirm-finish') {
          finish()
        }
        return
      }

      /* اختيار إجابة */
      var optionBtn = target.closest('.quiz-option[data-choose]')
      if (optionBtn) {
        chooseAnswer(state.current, parseInt(optionBtn.getAttribute('data-choose'), 10))
        return
      }

      /* نقاط التنقل بين الأسئلة */
      var dot = target.closest('.quiz-dot[data-dot]')
      if (dot) {
        goTo(parseInt(dot.getAttribute('data-dot'), 10))
        return
      }

      /* أزرار الإجراءات العامة */
      var actBtn = target.closest('[data-act]')
      if (actBtn) {
        var action = actBtn.getAttribute('data-act')
        if (action === 'begin') begin()
        else if (action === 'prev') goTo(state.current - 1)
        else if (action === 'next') goTo(state.current + 1)
        else if (action === 'submit') submitAttempt()
        else if (action === 'retry') retryQuiz(quiz)
        else if (action === 'review') setPhase('review')
        else if (action === 'close') closeQuiz()
        else if (action === 'back-to-result') setPhase('results')
        else if (action === 'print-review') printReview()
      }
    })

    /* زر Escape: يغلق طبقات التأكيد أو يطلب الخروج */
    state.escHandler = function (event) {
      if (event.key !== 'Escape') return
      if (state.confirmExit || state.confirmSubmit) {
        state.confirmExit = false
        state.confirmSubmit = false
        renderConfirmLayers()
      } else {
        requestExit()
      }
    }
    document.addEventListener('keydown', state.escHandler)

    /* ===== تدمير النافذة ===== */

    function destroy() {
      stopTimer()
      if (state.escHandler) document.removeEventListener('keydown', state.escHandler)
      document.body.classList.remove('modal-open')
      root.innerHTML = ''
    }

    /* ===== أول عرض ===== */
    renderConfirmLayers()
    renderBody()
    updateTimer()
    updateProgress()
    if (state.phase === 'running' && state.deadline) startTimerLoop()
  }

  function unmountQuizRunner() {
    if (runner) {
      runner.destroy()
      runner = null
    }
  }

  /* ================== أحداث عامة (مفوّضة) ================== */

  document.getElementById('quiz-hub-root').addEventListener('click', function (e) {
    /* بدء إختبار */
    var startBtn = e.target.closest('[data-start]')
    if (startBtn) {
      var quiz = findQuizById(startBtn.getAttribute('data-start'))
      if (quiz) startQuiz(quiz)
      return
    }

  })

  document.getElementById('plan-tabs-root').addEventListener('click', function (e) {
    var tab = e.target.closest('[data-plan]')
    if (!tab) return
    var plan = tab.getAttribute('data-plan')
    if (plan !== activePlan) {
      activePlan = plan
      renderPlanTabs()
      renderHub()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })

  /* ================== استبدال عناصر الأيقونات المؤقتة في الهيكل الثابت ================== */

  function hydrateStaticIcons() {
    document.querySelectorAll('i[data-icon]').forEach(function (el) {
      var size = parseInt(el.getAttribute('data-size') || '16', 10)
      var cls = el.getAttribute('data-class')
      el.outerHTML = icon(el.getAttribute('data-icon'), size, cls ? ' class="' + cls + '"' : '')
    })
    document.querySelectorAll('i[data-brand]').forEach(function (el) {
      var cls = el.getAttribute('data-class')
      el.outerHTML = brand(el.getAttribute('data-brand'), cls || undefined)
    })
  }

  /* ================== التهيئة ================== */

  function init() {
    hydrateStaticIcons()
    document.getElementById('back-to-tools').setAttribute('href', CONFIG.TOOLS_URL)
    loadStats()
    renderPlanTabs()
    renderHub()
    initShareMenu()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
