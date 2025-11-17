// Language translations
const translations = {
    tr: {
        // Sidebar
        admin_panel: 'Admin Paneli',
        management_system: 'Yönetim Sistemi',
        dashboard: 'Anasayfa',
        users: 'Kullanıcılar',
        user_list: 'Kullanıcı Listesi',
        new_user: 'Yeni Kullanıcı',
        pending_approval: 'Onay Bekleyenler',
        orders: 'Siparişler',
        all_orders: 'Tüm Siparişler',
        shipping_tracking: 'Kargo Takibi',
        returns: 'İadeler',
        analytics: 'Analitik',
        sales_report: 'Satış Raporu',
        category_analysis: 'Kategori Analizi',
        customer_stats: 'Müşteri İstatistikleri',
        settings: 'Ayarlar',
        system_settings: 'Sistem Ayarları',
        security: 'Güvenlik',
        email_settings: 'E-posta Ayarları',
        backup: 'Yedekleme',
        help: 'Yardım',

        // Topbar
        user_name: 'Mehmet Aydın',
        profile: 'Profilim',
        notifications: 'Bildirimler',
        logout: 'Çıkış Yap',

        // Modal titles
        edit_order: 'Siparişi Düzenle',
        order_id: 'Sipariş No',
        customer_name: 'Müşteri Adı',
        date: 'Tarih',
        amount: 'Miktar',
        status: 'Durum',

        save: 'Kaydet',
        cancel: 'İptal',

        // Delete modal
        confirm_delete: 'Silmeyi Onayla',
        delete_message: 'Bu kaydı silmek istediğinize emin misiniz?',
        yes_delete: 'Evet, Sil',

        // Table
        order_no: 'Sipariş No',
        customer: 'Müşteri',
        actions: 'İşlemler',

        // Recent orders
        recent_orders: 'Son Siparişler',
        view_all: 'Tümünü Gör',

        // Activity
        recent_activity: 'Son Aktiviteler',

        // Stats
        total_users: 'Toplam Kullanıcı',
        new_orders: 'Yeni Siparişler',
        total_revenue: 'Toplam Gelir',
        pending_processes: 'Beklemede Olan İşlemler',

        // Table headers
        order_date: 'Sipariş Tarihi',
        order_amount: 'Sipariş Tutarı',
        order_status: 'Sipariş Durumu',

        // Buttons
        edit_button: 'Düzenle',
        delete_button: 'Sil',
        
        // Language
        language: 'Dil',
    },
    en: {
        // Sidebar
        admin_panel: 'Admin Panel',
        management_system: 'Management System',
        dashboard: 'Dashboard',
        users: 'Users',
        user_list: 'User List',
        new_user: 'New User',
        pending_approval: 'Pending Approval',
        orders: 'Orders',
        all_orders: 'All Orders',
        shipping_tracking: 'Shipping Tracking',
        returns: 'Returns',
        analytics: 'Analytics',
        sales_report: 'Sales Report',
        category_analysis: 'Category Analysis',
        customer_stats: 'Customer Statistics',
        settings: 'Settings',
        system_settings: 'System Settings',
        security: 'Security',
        email_settings: 'Email Settings',
        backup: 'Backup',
        help: 'Help',

        // Topbar
        user_name: 'Mehmet Aydın',
        profile: 'My Profile',
        notifications: 'Notifications',
        logout: 'Logout',

        // Modal titles
        edit_order: 'Edit Order',
        order_id: 'Order ID',
        customer_name: 'Customer Name',
        date: 'Date',
        amount: 'Amount',
        status: 'Status',

        save: 'Save',
        cancel: 'Cancel',

        // Delete modal
        confirm_delete: 'Confirm Deletion',
        delete_message: 'Are you sure you want to delete this record?',
        yes_delete: 'Yes, Delete',

        // Table
        order_no: 'Order No',
        customer: 'Customer',
        actions: 'Actions',

        // Recent orders
        recent_orders: 'Recent Orders',
        view_all: 'View All',

        // Activity
        recent_activity: 'Recent Activity',

        // Stats
        total_users: 'Total Users',
        new_orders: 'New Orders',
        total_revenue: 'Total Revenue',
        pending_processes: 'Pending Processes',

        // Table headers
        order_date: 'Order Date',
        order_amount: 'Order Amount',
        order_status: 'Order Status',

        // Buttons
        edit_button: 'Edit',
        delete_button: 'Delete',
        
        // Language
        language: 'Language',
    }
};

// Get current language from localStorage or default to Turkish
let currentLanguage = localStorage.getItem('language') || 'tr';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set language selector to current language
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    // Apply initial translations
    updateLanguage(currentLanguage);
    
    // Add change event listener
    if (languageSelect) {
        languageSelect.addEventListener('change', function(e) {
            currentLanguage = e.target.value;
            localStorage.setItem('language', currentLanguage);
            updateLanguage(currentLanguage);
        });
    }
});

// Update all text elements based on language
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'OPTION' || element.tagName === 'INPUT') {
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update document direction for RTL/LTR
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
}

// Function to get translated text
function t(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return key;
}
