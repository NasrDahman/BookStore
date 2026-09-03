here/* ==========================================================================
   Dynamic Theme & Accent Color Controller
   ========================================================================== */
$(document).ready(function () {
    const $html = $('html');
    const $themeBtn = $('#themeToggleBtn');
    const $colorDots = $('.color-dot');

    // 1. استرجاع التفضيلات من localStorage أو تطبيق الوضع الداكن كافتراضي
    const savedTheme = localStorage.getItem('user_theme') || 'dark';
    const savedColor = localStorage.getItem('user_color') || 'purple';

    applyTheme(savedTheme);
    applyColor(savedColor);

    // 2. حدث تبديل الوضع (Dark/Light)
    $themeBtn.on('click', function () {
        const currentTheme = $html.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // 3. حدث اختيار اللون الأساسي (Accent Color)
    $colorDots.on('click', function () {
        const selectedColor = $(this).data('color');
        applyColor(selectedColor);
    });

    function applyTheme(theme) {
        $html.attr('data-theme', theme);
        localStorage.setItem('user_theme', theme);
        $themeBtn.text(theme === 'dark' ? '☀️' : '🌙');
    }

    function applyColor(color) {
        $html.attr('data-color', color);
        localStorage.setItem('user_color', color);
    }
});
