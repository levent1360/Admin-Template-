// Restore sidebar state on page load
document.addEventListener('DOMContentLoaded', function() {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        const sidebar = document.querySelector('.sidebar');
        const topbar = document.querySelector('.topbar');
        const mainContent = document.querySelector('.main-content');
        
        sidebar.classList.add('collapsed');
        topbar.classList.add('sidebar-collapsed');
        mainContent.classList.add('sidebar-collapsed');
    }
});

// Toggle Sidebar
document.getElementById('toggleSidebar').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    const topbar = document.querySelector('.topbar');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile: Toggle body class to show/hide sidebar overlay
        body.classList.toggle('sidebar-open');
    } else {
        // Desktop: Toggle collapsed state
        sidebar.classList.toggle('collapsed');
        topbar.classList.toggle('sidebar-collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        
        // Store preference
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }
});

// Close sidebar on backdrop click (mobile)
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', function() {
        document.body.classList.remove('sidebar-open');
    });
}

// Close sidebar on outside click (mobile)
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && !sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
        document.body.classList.remove('sidebar-open');
    }
});

// Toggle User Dropdown
document.getElementById('userMenu').addEventListener('click', function() {
    document.getElementById('dropdownMenu').classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (!userMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
    }
});

// Active menu item
document.querySelectorAll('.sidebar-menu a:not(.menu-toggle)').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-menu a:not(.menu-toggle)').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Submenu Toggle
document.querySelectorAll('.menu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const parentLi = this.parentElement;
        const isActive = parentLi.classList.contains('active');
        
        // Close all other submenus
        document.querySelectorAll('.sidebar-menu li.active').forEach(item => {
            if (item !== parentLi) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current submenu
        if (isActive) {
            parentLi.classList.remove('active');
            this.setAttribute('aria-expanded', 'false');
        } else {
            parentLi.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
        }
    });
});

// Table Action Buttons
document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const row = this.closest('tr');
        const orderId = row.cells[0].textContent.trim();
        const customerName = row.cells[1].textContent.trim();
        const orderDate = row.cells[2].textContent.trim();
        const orderAmount = row.cells[3].textContent.trim();
        const statusElement = row.cells[4].querySelector('.status');
        const orderStatus = statusElement.textContent.trim();
        
        // Populate form with row data
        document.getElementById('orderId').value = orderId;
        document.getElementById('customerName').value = customerName;
        document.getElementById('orderDate').value = orderDate;
        document.getElementById('orderAmount').value = orderAmount;
        document.getElementById('orderStatus').value = orderStatus;
        
        // Show modal
        const modal = document.getElementById('editModal');
        modal.classList.add('active');
        
        // Store current row reference
        modal.dataset.currentRow = row;
    });
});

document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const row = this.closest('tr');
        const orderId = row.cells[0].textContent.trim();
        
        // Show delete confirmation modal
        const deleteModal = document.getElementById('deleteModal');
        document.getElementById('deleteMessage').textContent = 
            'Sipariş ' + orderId + ' kaydını silmek istediğinize emin misiniz?';
        
        deleteModal.classList.add('active');
        
        // Store row reference for deletion
        deleteModal._rowToDelete = row;
    });
});

// Modal Close Button
document.querySelector('.modal-close').addEventListener('click', function() {
    document.getElementById('editModal').classList.remove('active');
});

// Modal Cancel Button
document.querySelector('.btn-cancel').addEventListener('click', function() {
    document.getElementById('editModal').classList.remove('active');
});

// Modal Close on Outside Click
document.getElementById('editModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Delete Confirmation Modal
document.getElementById('deleteCancelBtn').addEventListener('click', function() {
    document.getElementById('deleteModal').classList.remove('active');
});

document.querySelector('.btn-delete-confirm').addEventListener('click', function() {
    const deleteModal = document.getElementById('deleteModal');
    const rowElement = deleteModal._rowToDelete;
    
    if (rowElement) {
        rowElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => rowElement.remove(), 300);
    }
    
    deleteModal.classList.remove('active');
});

// Delete Modal Close on Outside Click
document.getElementById('deleteModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Form Submit
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const modal = document.getElementById('editModal');
    const orderId = document.getElementById('orderId').value;
    
    // Find the row with matching order ID
    let row = null;
    document.querySelectorAll('tbody tr').forEach(tr => {
        if (tr.cells[0].textContent.trim() === orderId) {
            row = tr;
        }
    });
    
    if (row) {
        // Update row with form data
        row.cells[1].textContent = document.getElementById('customerName').value;
        row.cells[2].textContent = document.getElementById('orderDate').value;
        row.cells[3].textContent = document.getElementById('orderAmount').value;
        
        const statusElement = row.cells[4].querySelector('.status');
        const newStatus = document.getElementById('orderStatus').value;
        statusElement.textContent = newStatus;
        
        let statusClass = '';
        if (newStatus === 'Tamamlandı') {
            statusClass = 'active';
        } else if (newStatus === 'Beklemede') {
            statusClass = 'pending';
        } else if (newStatus === 'İptal') {
            statusClass = 'cancelled';
        }
        
        statusElement.className = 'status ' + statusClass;
        
        // Add highlight animation
        row.classList.add('highlight-update');
        
        // Remove highlight after 1 second
        setTimeout(() => {
            row.classList.remove('highlight-update');
        }, 1000);
    }
    
    modal.classList.remove('active');
});