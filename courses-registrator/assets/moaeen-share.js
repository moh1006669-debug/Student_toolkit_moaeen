(() => {
  const iconSets = {
    'theo-law': ['fa-scale-balanced', 'fa-bullhorn'],
    administr: ['fa-briefcase', 'fa-calculator', 'fa-cart-shopping', 'fa-coins'],
    health: ['fa-heart-pulse', 'fa-laptop-medical'],
    'it-css': ['fa-code', 'fa-database', 'fa-chart-line']
  };

  const pageKey = location.pathname.split('/').filter(Boolean).pop() || '';

  function showShareToast(message) {
    let toast = document.getElementById('moaeenShareToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'moaeenShareToast';
      toast.className = 'moaeen-share-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function syncSpecialtyIcon() {
    const select = document.getElementById('deptSelector');
    const icon = document.querySelector('[data-specialty-icon]');
    const label = document.querySelector('[data-specialty-name]');
    if (!select || !icon) return;
    const icons = iconSets[pageKey] || ['fa-graduation-cap'];
    const iconName = icons[select.selectedIndex] || icons[0];
    icon.className = `fa-solid ${iconName}`;
    if (label) label.textContent = select.options[select.selectedIndex]?.textContent || 'التخصص المختار';
  }

  async function sharePage() {
    const payload = {
      title: document.title,
      text: 'أداة مُعين لتصفح مقررات التخصص ومتابعة التسجيل',
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        showShareToast('تمت مشاركة الصفحة بنجاح');
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(payload.url);
      } else {
        const helper = document.createElement('textarea');
        helper.value = payload.url;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        helper.remove();
      }
      showShareToast('تم نسخ رابط الصفحة');
    } catch (error) {
      if (error?.name !== 'AbortError') showShareToast('يمكنك نسخ رابط الصفحة من شريط المتصفح');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('sharePageBtn');
    if (shareButton) shareButton.addEventListener('click', sharePage);
    const select = document.getElementById('deptSelector');
    if (select) {
      syncSpecialtyIcon();
      select.addEventListener('change', syncSpecialtyIcon);
    }
  });
})();
