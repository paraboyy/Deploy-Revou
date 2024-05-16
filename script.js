// Mengambil referensi elemen-elemen yang dibutuhkan
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Menambahkan event listener untuk tombol 'Daftar'
registerBtn.addEventListener('click', () => {
    container.classList.add("active"); // Menambahkan kelas 'active' ke container
});

// Menambahkan event listener untuk tombol 'Masuk'
loginBtn.addEventListener('click', () => {
    container.classList.remove("active"); // Menghapus kelas 'active' dari container
});

// Menambahkan event listener ketika dokumen telah dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', function() {
    // Menambahkan event listener untuk tombol 'Daftar'
    document.getElementById('register').addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default tombol
        var name = document.querySelector('.sign-up input[type="text"]').value;
        var email = document.querySelector('.sign-up input[type="email"]').value;
        var password = document.querySelector('.sign-up input[type="password"]').value;
        
        // Kirim data ke server atau simpan ke file di sini
        // Misalnya, Anda dapat menggunakan XMLHttpRequest atau fetch API
        // Contoh: fetch('url_server', { method: 'POST', body: JSON.stringify({ name: name, email: email, password: password }) });
    });

    // Menambahkan event listener untuk tombol 'Masuk'
    document.getElementById('login').addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default tombol
        var email = document.querySelector('.sign-in input[type="email"]').value;
        var password = document.querySelector('.sign-in input[type="password"]').value;
        
        // Verifikasi data dengan data yang ada di file di sini
        // Misalnya, Anda dapat menggunakan XMLHttpRequest atau fetch API
        // Contoh: fetch('url_server', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
    });
});
