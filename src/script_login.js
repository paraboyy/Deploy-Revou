// Data pengguna statis
const users = [
    { name: "John", email: "admin@gmail.com", password: "admin123" },
];

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
    document.getElementById('registerBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default tombol
        var name = document.querySelector('.sign-up input[type="text"]').value;
        var email = document.querySelector('.sign-up input[type="email"]').value;
        var password = document.querySelector('.sign-up input[type="password"]').value;
        
        // Memeriksa apakah email sudah ada dalam data pengguna
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert('Email sudah terdaftar.');
        } else {
            // Menambahkan pengguna baru ke dalam data pengguna
            users.push({ name, email, password });
            alert('Pendaftaran berhasil!');
        }
    });

    // Menambahkan event listener untuk tombol 'Masuk'
    document.getElementById('loginBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default tombol
        var email = document.querySelector('.sign-in input[type="email"]').value;
        var password = document.querySelector('.sign-in input[type="password"]').value;
        
        // Memeriksa kecocokan email dan password dengan data pengguna
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert('Login berhasil!');
            window.location.href = 'page/dashboard.html';
        } else {
            alert('Email atau password salah.');
        }
    });
});