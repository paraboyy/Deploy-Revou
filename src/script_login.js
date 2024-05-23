// Data pengguna statis
const users = [
    { name: "John", email: "admin@gmail.com", password: "admin123" },
    { name: "John", email: "testing@gmail.com", password: "testing123" },
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
        
        var name = document.querySelector('.sign-up input[name="name"]').value.trim();
        var email = document.querySelector('.sign-up input[name="email"]').value.trim();
        var password = document.querySelector('.sign-up input[name="password"]').value.trim();

        // Validasi input
        if (name === "" || email === "" || password === "") {
            alert('Semua kolom harus diisi.');
            return;
        }

        // Validasi panjang nama
        if (name.length < 5) {
            alert('Nama harus terdiri dari minimal 5 karakter.');
            return;
        }

        // Validasi format email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Format email tidak valid.');
            return;
        }

        // Validasi panjang password dan keharusan ada angka
        const passwordPattern = /^(?=.*\d).{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password harus terdiri dari minimal 8 karakter dan mengandung setidaknya satu angka.');
            return;
        }

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
        
        var email = document.querySelector('.sign-in input[name="email"]').value.trim();
        var password = document.querySelector('.sign-in input[name="password"]').value.trim();

        // Validasi input
        if (email === "" || password === "") {
            alert('Email dan password harus diisi.');
            return;
        }

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
