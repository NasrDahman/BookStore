$(document).ready(function () {

    // 1. إظهار النافذة المنبثقة (Modal 1) وتمرير اسم الكتاب
    $('.open-modal-btn').on('click', function () {
        let bookTitle = $(this).data('title');
        let bookDesc = $(this).data('desc');

        $('#modalBookTitle').text(bookTitle);
        $('#modalBookDesc').text(bookDesc);

        let bookModal = new bootstrap.Modal(document.getElementById('bookModal'));
        bookModal.show();
    });

    // 2. إظهار Modal 2 الخاص بالجدول
    $('.action-btn').on('click', function () {
        let name = $(this).data('name');
        $('#quickBookName').text(name);
        
        let qModal = new bootstrap.Modal(document.getElementById('quickRequestModal'));
        qModal.show();
    });

    // 3. تنفيذ الإشعار Toast Notification (المطلب 9)
    function showToast(msg) {
        $('#toastMessage').text(msg);
        let toastEl = document.getElementById('liveToast');
        let toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    $('#confirmOrderBtn').on('click', function () {
        let modalEl = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
        modalEl.hide();
        showToast('تم إرسال طلب الشراء/الإيجار بنجاح!');
    });

    $('#sendQuickReq').on('click', function () {
        let modalEl = bootstrap.Modal.getInstance(document.getElementById('quickRequestModal'));
        modalEl.hide();
        showToast('تم تسجيل كتابك في قائمة الانتظار.');
    });

    // 4. Form Validation للنماذج (المطلب 5)
    $('#loginForm, #registerForm, #contactForm').on('submit', function (e) {
        let form = this;

        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            showToast('تم معالجة وإرسال البيانات بنجاح!');
            form.reset();
            $(form).removeClass('was-validated');
            return;
        }

        // إمكانية التحقق الإضافي لإنشاء الحساب
        if (form.id === 'registerForm') {
            let pass = $('#regPassword').val();
            let confirmPass = $('#confirmPassword').val();

            if (pass !== confirmPass) {
                $('#passMatchError').show();
                e.preventDefault();
            } else {
                $('#passMatchError').hide();
            }
        }

        $(form).addClass('was-validated');
    });

});
