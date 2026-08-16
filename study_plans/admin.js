/* ============================================================
   منصة معين التعليمية — إدارة الخطط الدراسية (نسخة ثابتة)
   ============================================================ */
(function () {
  'use strict';

  var ADMIN_USER = 'Moaeen-admin';
  var ADMIN_PASSWORD = 'Moaeen-admin-2026';
  var SESSION_KEY = 'moaeen-admin-session';
  var portal = document.getElementById('adminPortal');

  if (!portal) return;

  function escapeHtml(value) {
    var holder = document.createElement('div');
    holder.textContent = value === undefined || value === null ? '' : String(value);
    return holder.innerHTML;
  }

  function isAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
  }

  function showPortal() {
    portal.classList.add('is-open');
    portal.setAttribute('aria-hidden', 'false');
    renderPortal();
  }

  function closePortal() {
    portal.classList.remove('is-open');
    portal.setAttribute('aria-hidden', 'true');
  }

  function notify(message, kind) {
    var note = document.createElement('div');
    note.className = 'admin-toast ' + (kind || 'success');
    note.textContent = message;
    document.body.appendChild(note);
    window.setTimeout(function () { note.remove(); }, 3200);
  }

  function iconOptions(selected) {
    var icons = ['fa-building-columns', 'fa-scale-balanced', 'fa-chart-line', 'fa-laptop-code', 'fa-heart-pulse', 'fa-briefcase', 'fa-calculator', 'fa-network-wired', 'fa-computer', 'fa-database', 'fa-graduation-cap'];
    return icons.map(function (icon) {
      return '<option value="' + icon + '"' + (icon === selected ? ' selected' : '') + '>' + icon.replace('fa-', '').replaceAll('-', ' ') + '</option>';
    }).join('');
  }

  function collegeOptions(selectedId) {
    return COLLEGES.map(function (college) {
      return '<option value="' + escapeHtml(college.id) + '"' + (college.id === selectedId ? ' selected' : '') + '>' + escapeHtml(college.name) + '</option>';
    }).join('');
  }

  function getCollege(id) {
    return COLLEGES.find(function (college) { return college.id === id; }) || null;
  }

  function getSpec(collegeId, specId) {
    var college = getCollege(collegeId);
    return college ? college.specs.find(function (spec) { return spec.id === specId; }) || null : null;
  }

  function suggestedId(text, fallback) {
    var source = String(text || '').trim().toLowerCase();
    var slug = source.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return slug || fallback;
  }

  function renderPortal() {
    portal.innerHTML = isAuthenticated() ? dashboardMarkup() : loginMarkup();
    bindPortalEvents();
  }

  function loginMarkup() {
    return '' +
      '<div class="admin-dialog admin-login-dialog" role="dialog" aria-modal="true" aria-labelledby="adminLoginTitle">' +
        '<button class="admin-close" type="button" data-admin-action="close" aria-label="إغلاق"><i class="fas fa-xmark"></i></button>' +
        '<div class="admin-dialog-brand"><i class="fas fa-shield-halved"></i><span>إدارة الخطط الدراسية</span></div>' +
        '<h2 id="adminLoginTitle">تسجيل دخول الإدارة</h2>' +
        '<p>أدخل بيانات الإدارة للوصول إلى أدوات تعديل الخطط الدراسية.</p>' +
        '<form id="adminLoginForm" class="admin-form">' +
          '<label>اسم المستخدم<input id="adminUser" autocomplete="username" required></label>' +
          '<label>رمز الإدارة<input id="adminPassword" type="password" autocomplete="current-password" required></label>' +
          '<p id="adminLoginError" class="admin-form-error" aria-live="polite"></p>' +
          '<button class="admin-primary-btn" type="submit"><i class="fas fa-right-to-bracket"></i> دخول</button>' +
        '</form>' +
      '</div>';
  }

  function dashboardMarkup() {
    var firstCollege = COLLEGES[0] || { id: '', name: '', nameEn: '', icon: 'fa-building-columns', color: '#074842', specs: [] };
    var firstSpec = firstCollege.specs[0] || { id: '', name: '', nameEn: '', icon: 'fa-graduation-cap', levels: {} };
    return '' +
      '<div class="admin-dialog admin-dashboard" role="dialog" aria-modal="true" aria-labelledby="adminDashboardTitle">' +
        '<header class="admin-dashboard-head">' +
          '<div><span class="admin-eyebrow"><i class="fas fa-shield-halved"></i> منطقة الإدارة</span><h2 id="adminDashboardTitle">إدارة الخطط الدراسية</h2></div>' +
          '<div class="admin-head-actions"><button type="button" class="admin-ghost-btn" data-admin-action="logout"><i class="fas fa-arrow-right-from-bracket"></i> خروج</button><button class="admin-close" type="button" data-admin-action="close" aria-label="إغلاق"><i class="fas fa-xmark"></i></button></div>' +
        '</header>' +
        '<p class="admin-intro">تُحفظ التعديلات محلياً على هذا المتصفح وتنعكس مباشرةً على جميع صفحات الكليات والتخصصات.</p>' +
        '<div class="admin-dashboard-grid">' +
          '<section class="admin-section" aria-labelledby="collegeManagerTitle">' +
            '<h3 id="collegeManagerTitle"><i class="fas fa-building-columns"></i> الكليات</h3>' +
            '<label>اختيار كلية<select id="adminCollegeSelect">' + collegeOptions(firstCollege.id) + '</select></label>' +
            '<form id="collegeForm" class="admin-form admin-compact-form">' +
              '<input type="hidden" id="collegeOriginalId" value="' + escapeHtml(firstCollege.id) + '">' +
              '<label>المعرّف التقني<input id="collegeId" required value="' + escapeHtml(firstCollege.id) + '"></label>' +
              '<label>الاسم العربي<input id="collegeName" required value="' + escapeHtml(firstCollege.name) + '"></label>' +
              '<label>الاسم الإنجليزي<input id="collegeNameEn" value="' + escapeHtml(firstCollege.nameEn) + '"></label>' +
              '<div class="admin-form-row"><label>الأيقونة<select id="collegeIcon">' + iconOptions(firstCollege.icon) + '</select></label><label>اللون<input id="collegeColor" type="color" value="' + escapeHtml(firstCollege.color || '#074842') + '"></label></div>' +
              '<div class="admin-button-row"><button class="admin-primary-btn" type="submit">حفظ الكلية</button><button class="admin-secondary-btn" type="button" data-admin-action="new-college">إضافة كلية</button><button class="admin-danger-btn" type="button" data-admin-action="delete-college">حذف</button></div>' +
            '</form>' +
          '</section>' +
          '<section class="admin-section" aria-labelledby="specManagerTitle">' +
            '<h3 id="specManagerTitle"><i class="fas fa-graduation-cap"></i> التخصصات</h3>' +
            '<label>الكلية<select id="adminSpecCollegeSelect">' + collegeOptions(firstCollege.id) + '</select></label>' +
            '<label>اختيار تخصص<select id="adminSpecSelect">' + specOptions(firstCollege, firstSpec.id) + '</select></label>' +
            '<form id="specForm" class="admin-form admin-compact-form">' +
              '<input type="hidden" id="specOriginalId" value="' + escapeHtml(firstSpec.id) + '">' +
              '<label>المعرّف التقني<input id="specId" required value="' + escapeHtml(firstSpec.id) + '"></label>' +
              '<label>الاسم العربي<input id="specName" required value="' + escapeHtml(firstSpec.name) + '"></label>' +
              '<label>الاسم الإنجليزي<input id="specNameEn" value="' + escapeHtml(firstSpec.nameEn) + '"></label>' +
              '<label>الأيقونة<select id="specIcon">' + iconOptions(firstSpec.icon) + '</select></label>' +
              '<div class="admin-button-row"><button class="admin-primary-btn" type="submit">حفظ التخصص</button><button class="admin-secondary-btn" type="button" data-admin-action="new-spec">إضافة تخصص</button><button class="admin-danger-btn" type="button" data-admin-action="delete-spec">حذف</button></div>' +
            '</form>' +
          '</section>' +
          '<section class="admin-section admin-course-section" aria-labelledby="courseManagerTitle">' +
            '<h3 id="courseManagerTitle"><i class="fas fa-book-open"></i> المقررات والمستويات</h3>' +
            '<div class="admin-form-row"><label>الكلية<select id="adminCourseCollegeSelect">' + collegeOptions(firstCollege.id) + '</select></label><label>التخصص<select id="adminCourseSpecSelect">' + specOptions(firstCollege, firstSpec.id) + '</select></label><label>المستوى<input id="adminCourseLevel" type="number" min="1" max="20" value="1"></label></div>' +
            '<form id="courseForm" class="admin-form admin-course-form">' +
              '<input type="hidden" id="courseEditIndex" value="">' +
              '<div class="admin-form-row"><label>رمز المقرر<input id="courseCode" required placeholder="مثال: IT232"></label><label>الساعات<input id="courseHours" type="number" min="0" step="0.5" required value="3"></label></div>' +
              '<label>اسم المادة بالعربية<input id="courseNameAr" required></label>' +
              '<label>اسم المادة بالإنجليزية<input id="courseNameEn" placeholder="English course name"></label>' +
              '<label>المتطلبات السابقة<input id="coursePrereq" placeholder="مثال: IT231, IT245 أو لا يوجد"></label>' +
              '<div class="admin-button-row"><button class="admin-primary-btn" type="submit">حفظ المقرر</button><button class="admin-secondary-btn" type="button" data-admin-action="clear-course">مقرر جديد</button></div>' +
            '</form>' +
            '<div class="admin-course-list-wrap"><h4>مقررات المستوى المحدد</h4><div id="adminCourseList" class="admin-course-list"></div></div>' +
          '</section>' +
        '</div>' +
        '<footer class="admin-dashboard-foot"><button class="admin-ghost-btn" type="button" data-admin-action="download-data"><i class="fas fa-download"></i> تصدير نسخة احتياطية</button><button class="admin-danger-btn" type="button" data-admin-action="reset-data"><i class="fas fa-rotate-left"></i> استعادة البيانات الأصلية</button></footer>' +
      '</div>';
  }

  function specOptions(college, selectedId) {
    if (!college || !college.specs.length) return '<option value="">لا يوجد تخصص</option>';
    return college.specs.map(function (spec) {
      return '<option value="' + escapeHtml(spec.id) + '"' + (spec.id === selectedId ? ' selected' : '') + '>' + escapeHtml(spec.name) + '</option>';
    }).join('');
  }

  function loadCollegeForm() {
    var college = getCollege(document.getElementById('adminCollegeSelect').value);
    if (!college) return;
    document.getElementById('collegeOriginalId').value = college.id;
    document.getElementById('collegeId').value = college.id;
    document.getElementById('collegeName').value = college.name;
    document.getElementById('collegeNameEn').value = college.nameEn || '';
    document.getElementById('collegeIcon').value = college.icon || 'fa-building-columns';
    document.getElementById('collegeColor').value = college.color || '#074842';
  }

  function refreshSpecControls(context) {
    var collegeSelect = document.getElementById(context === 'course' ? 'adminCourseCollegeSelect' : 'adminSpecCollegeSelect');
    var specSelect = document.getElementById(context === 'course' ? 'adminCourseSpecSelect' : 'adminSpecSelect');
    var college = getCollege(collegeSelect.value);
    specSelect.innerHTML = specOptions(college, college && college.specs[0] ? college.specs[0].id : '');
    if (context === 'spec') loadSpecForm();
    if (context === 'course') renderCourseList();
  }

  function loadSpecForm() {
    var college = getCollege(document.getElementById('adminSpecCollegeSelect').value);
    var spec = college && getSpec(college.id, document.getElementById('adminSpecSelect').value);
    if (!spec) {
      clearSpecForm();
      return;
    }
    document.getElementById('specOriginalId').value = spec.id;
    document.getElementById('specId').value = spec.id;
    document.getElementById('specName').value = spec.name;
    document.getElementById('specNameEn').value = spec.nameEn || '';
    document.getElementById('specIcon').value = spec.icon || 'fa-graduation-cap';
  }

  function clearSpecForm() {
    document.getElementById('specOriginalId').value = '';
    document.getElementById('specId').value = '';
    document.getElementById('specName').value = '';
    document.getElementById('specNameEn').value = '';
    document.getElementById('specIcon').value = 'fa-graduation-cap';
  }

  function selectedCourseContext() {
    var college = getCollege(document.getElementById('adminCourseCollegeSelect').value);
    var spec = college && getSpec(college.id, document.getElementById('adminCourseSpecSelect').value);
    var level = String(Math.max(1, Number(document.getElementById('adminCourseLevel').value || 1)));
    return { college: college, spec: spec, level: level };
  }

  function renderCourseList() {
    var list = document.getElementById('adminCourseList');
    if (!list) return;
    var context = selectedCourseContext();
    if (!context.spec) {
      list.innerHTML = '<p class="admin-empty">اختر تخصصاً لإدارة مقرراته.</p>';
      return;
    }
    var courses = context.spec.levels[context.level] || [];
    if (!courses.length) {
      list.innerHTML = '<p class="admin-empty">لا توجد مقررات في هذا المستوى بعد. استخدم النموذج أعلاه لإضافة أول مقرر.</p>';
      return;
    }
    list.innerHTML = courses.map(function (course, index) {
      return '<article class="admin-course-item"><div><strong>' + escapeHtml(course.code) + '</strong><span>' + escapeHtml(course.name) + '</span><small>' + escapeHtml(course.hours) + ' ساعة · ' + escapeHtml(course.prereq || 'لا يوجد متطلبات') + '</small></div><div class="admin-item-actions"><button type="button" data-admin-action="edit-course" data-index="' + index + '"><i class="fas fa-pen"></i><span>تعديل</span></button><button type="button" class="admin-item-delete" data-admin-action="delete-course" data-index="' + index + '" aria-label="حذف المقرر"><i class="fas fa-trash"></i></button></div></article>';
    }).join('');
  }

  function clearCourseForm() {
    document.getElementById('courseEditIndex').value = '';
    document.getElementById('courseCode').value = '';
    document.getElementById('courseHours').value = '3';
    document.getElementById('courseNameAr').value = '';
    document.getElementById('courseNameEn').value = '';
    document.getElementById('coursePrereq').value = '';
  }

  function editCourse(index) {
    var context = selectedCourseContext();
    var course = context.spec && (context.spec.levels[context.level] || [])[index];
    if (!course) return;
    var parts = String(course.name || '').split(/\s+\/\s+/);
    document.getElementById('courseEditIndex').value = index;
    document.getElementById('courseCode').value = course.code || '';
    document.getElementById('courseHours').value = course.hours || 0;
    document.getElementById('courseNameAr').value = parts.shift() || '';
    document.getElementById('courseNameEn').value = parts.join(' / ');
    document.getElementById('coursePrereq').value = course.prereq === '—' ? '' : (course.prereq || '');
    document.getElementById('courseCode').focus();
  }

  function persistAndReload(message) {
    saveStudyPlans(COLLEGES);
    notify(message + ' سيتم تحديث الصفحة الآن.');
    window.setTimeout(function () { window.location.reload(); }, 650);
  }

  function onCollegeSubmit(event) {
    event.preventDefault();
    var originalId = document.getElementById('collegeOriginalId').value;
    var id = document.getElementById('collegeId').value.trim() || suggestedId(document.getElementById('collegeNameEn').value, 'college-' + Date.now());
    var record = {
      id: id,
      name: document.getElementById('collegeName').value.trim(),
      nameEn: document.getElementById('collegeNameEn').value.trim(),
      icon: document.getElementById('collegeIcon').value,
      color: document.getElementById('collegeColor').value,
      specs: []
    };
    if (!record.name) return;
    var existing = getCollege(originalId);
    if (existing) {
      if (id !== originalId && getCollege(id)) { notify('معرّف الكلية مستخدم بالفعل.', 'error'); return; }
      record.specs = existing.specs;
      COLLEGES[COLLEGES.indexOf(existing)] = record;
    } else if (getCollege(id)) {
      notify('معرّف الكلية مستخدم بالفعل.', 'error');
      return;
    } else {
      COLLEGES.push(record);
    }
    persistAndReload('تم حفظ الكلية.');
  }

  function onSpecSubmit(event) {
    event.preventDefault();
    var college = getCollege(document.getElementById('adminSpecCollegeSelect').value);
    if (!college) return;
    var originalId = document.getElementById('specOriginalId').value;
    var id = document.getElementById('specId').value.trim() || suggestedId(document.getElementById('specNameEn').value, 'spec-' + Date.now());
    var record = {
      id: id,
      name: document.getElementById('specName').value.trim(),
      nameEn: document.getElementById('specNameEn').value.trim(),
      icon: document.getElementById('specIcon').value,
      levels: {}
    };
    if (!record.name) return;
    var existing = getSpec(college.id, originalId);
    if (existing) {
      if (id !== originalId && getSpec(college.id, id)) { notify('معرّف التخصص مستخدم بالفعل.', 'error'); return; }
      record.levels = existing.levels;
      college.specs[college.specs.indexOf(existing)] = record;
    } else if (getSpec(college.id, id)) {
      notify('معرّف التخصص مستخدم بالفعل.', 'error');
      return;
    } else {
      college.specs.push(record);
    }
    persistAndReload('تم حفظ التخصص.');
  }

  function onCourseSubmit(event) {
    event.preventDefault();
    var context = selectedCourseContext();
    if (!context.spec) { notify('اختر تخصصاً أولاً.', 'error'); return; }
    if (!context.spec.levels[context.level]) context.spec.levels[context.level] = [];
    var ar = document.getElementById('courseNameAr').value.trim();
    var en = document.getElementById('courseNameEn').value.trim();
    var record = {
      code: document.getElementById('courseCode').value.trim(),
      name: en ? ar + ' / ' + en : ar,
      hours: Number(document.getElementById('courseHours').value),
      prereq: document.getElementById('coursePrereq').value.trim() || '—'
    };
    if (!record.code || !record.name || Number.isNaN(record.hours)) return;
    var editIndex = document.getElementById('courseEditIndex').value;
    if (editIndex === '') context.spec.levels[context.level].push(record);
    else context.spec.levels[context.level][Number(editIndex)] = record;
    persistAndReload(editIndex === '' ? 'تمت إضافة المقرر.' : 'تم تعديل المقرر.');
  }

  function onAction(actionElement) {
    var action = actionElement.getAttribute('data-admin-action');
    if (action === 'close') closePortal();
    if (action === 'logout') { sessionStorage.removeItem(SESSION_KEY); closePortal(); notify('تم تسجيل الخروج.'); }
    if (action === 'new-college') {
      document.getElementById('collegeForm').reset();
      document.getElementById('collegeOriginalId').value = '';
      document.getElementById('collegeColor').value = '#074842';
      document.getElementById('collegeId').focus();
    }
    if (action === 'delete-college') {
      var college = getCollege(document.getElementById('adminCollegeSelect').value);
      if (college && window.confirm('سيؤدي حذف الكلية إلى حذف جميع تخصصاتها. هل تريد المتابعة؟')) {
        COLLEGES.splice(COLLEGES.indexOf(college), 1);
        persistAndReload('تم حذف الكلية.');
      }
    }
    if (action === 'new-spec') { clearSpecForm(); document.getElementById('specId').focus(); }
    if (action === 'delete-spec') {
      var collegeForSpec = getCollege(document.getElementById('adminSpecCollegeSelect').value);
      var spec = collegeForSpec && getSpec(collegeForSpec.id, document.getElementById('adminSpecSelect').value);
      if (collegeForSpec && spec && window.confirm('هل تريد حذف هذا التخصص وجميع مقرراته؟')) {
        collegeForSpec.specs.splice(collegeForSpec.specs.indexOf(spec), 1);
        persistAndReload('تم حذف التخصص.');
      }
    }
    if (action === 'clear-course') clearCourseForm();
    if (action === 'edit-course') editCourse(Number(actionElement.getAttribute('data-index')));
    if (action === 'delete-course') {
      var context = selectedCourseContext();
      var index = Number(actionElement.getAttribute('data-index'));
      if (context.spec && context.spec.levels[context.level] && window.confirm('هل تريد حذف هذا المقرر؟')) {
        context.spec.levels[context.level].splice(index, 1);
        if (!context.spec.levels[context.level].length) delete context.spec.levels[context.level];
        persistAndReload('تم حذف المقرر.');
      }
    }
    if (action === 'download-data') {
      var blob = new Blob([JSON.stringify(COLLEGES, null, 2)], { type: 'application/json' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'moaeen-study-plans-backup.json';
      link.click();
      URL.revokeObjectURL(link.href);
    }
    if (action === 'reset-data' && window.confirm('سيتم حذف كل التعديلات المحلية واستعادة البيانات الأصلية. هل تريد المتابعة؟')) {
      resetStudyPlans();
      persistAndReload('تمت استعادة البيانات الأصلية.');
    }
  }

  function bindPortalEvents() {
    portal.onclick = function (event) {
      if (event.target === portal) { closePortal(); return; }
      var actionElement = event.target.closest('[data-admin-action]');
      if (actionElement) onAction(actionElement);
    };

    if (!isAuthenticated()) {
      document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById('adminUser').value.trim();
        var password = document.getElementById('adminPassword').value;
        if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
          sessionStorage.setItem(SESSION_KEY, 'authenticated');
          renderPortal();
        } else {
          document.getElementById('adminLoginError').textContent = 'بيانات الدخول غير صحيحة.';
        }
      });
      return;
    }

    document.getElementById('adminCollegeSelect').addEventListener('change', loadCollegeForm);
    document.getElementById('adminSpecCollegeSelect').addEventListener('change', function () { refreshSpecControls('spec'); });
    document.getElementById('adminSpecSelect').addEventListener('change', loadSpecForm);
    document.getElementById('adminCourseCollegeSelect').addEventListener('change', function () { refreshSpecControls('course'); });
    document.getElementById('adminCourseSpecSelect').addEventListener('change', function () { clearCourseForm(); renderCourseList(); });
    document.getElementById('adminCourseLevel').addEventListener('change', function () { clearCourseForm(); renderCourseList(); });
    document.getElementById('collegeForm').addEventListener('submit', onCollegeSubmit);
    document.getElementById('specForm').addEventListener('submit', onSpecSubmit);
    document.getElementById('courseForm').addEventListener('submit', onCourseSubmit);
    renderCourseList();
  }

  document.getElementById('adminGear').addEventListener('click', showPortal);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && portal.classList.contains('is-open')) closePortal();
  });
}());
