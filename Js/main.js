/* ==========================================================================
   Main Application Logic & Dynamic Price Calculator
   ========================================================================== */
$(document).ready(function () {

    let currentBuyPrice = 0;
    let currentRentPrice = 0;

    // 1. فتح الـ Modal واستخلاص البيانات ديناميكياً (المطلب 10)
    $('.open-modal-btn').on('click', function () {
        const title = $(this).data('title');
        const desc = $(this).data('desc');
        currentBuyPrice = parseFloat($(this).data('price-buy'));
        currentRentPrice = parseFloat($(this).data('price-rent'));

        $('#modalBookTitle').text(title);
        $('#modalBookDesc').text(desc);
        
        // إعادة ضبط الحقول داخل النافذة
        $('#modalActionType').val('buy');
        $('#rentDurationBox').hide();
        $('#rentMonths').val(1);
        updateModalPrice();

        const bookModal = new bootstrap.Modal(document.getElementById('interactiveBookModal'));
        bookModal.show();
    });

    // 2. حاسبة الأسعار الفورية داخل Modal الإيجار والشراء
    $('#modalActionType').on('change', function () {
        if ($(this).val() === 'rent') {
            $('#rentDurationBox').slideDown(200);
        } else {
            $('#rentDurationBox').slideUp(200);
        }
        updateModalPrice();
    });

    $('#rentMonths').on('input', function () {
        updateModalPrice();
    });

    function updateModalPrice() {
        const action = $('#modalActionType').val();
        if (action === 'buy') {
            $('#modalTotalPrice').text(`$${currentBuyPrice}`);
        } else {
            const months = parseInt($('#rentMonths').val()) || 1;
            const total = currentRentPrice * months;
            $('#modalTotalPrice').text(`$${total} ($${currentRentPrice}/شهر)`);
        }
    }

    // 3. نظام الإشعارات المنبثقة Toast (المطلب 9)
    $('#confirmOrderBtn').on('click', function () {
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('interactiveBookModal'));
        modalInstance.hide();

        showToast('<i class="fa-solid fa-circle-check text-success me-2 fs-5"></i> تم تسجيل وتأكيد الطلب بنجاح!');
    });

    function showToast(htmlContent) {
        $('#toastMessage').html(htmlContent);
        const toastEl = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
        toast.show();
    }

    // 4. Form Validation مع استجابة بصرية (المطلب 5)
    $('form').on('submit', function (e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            e.stopPropagation();
            $(this).addClass('was-validated');
            showToast('<i class="fa-solid fa-triangle-exclamation text-danger me-2 fs-5"></i> يرجى استكمال الحقول المطلوبة بشكل صحيح.');
        } else {
            showToast('<i class="fa-solid fa-paper-plane text-info me-2 fs-5"></i> تم إرسال البيانات بنجاح!');
            this.reset();
            $(this).removeClass('was-validated');
        }
    });

});
