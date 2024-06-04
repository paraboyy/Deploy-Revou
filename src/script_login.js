document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const showRegisterForm = document.getElementById('showRegisterForm');
    const showLoginForm = document.getElementById('showLoginForm');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signInForm = document.querySelector('.sign-in-form');
    const signUpForm = document.querySelector('.sign-up-form');

    // Menambahkan event listener untuk link 'Buat Akun'
    showRegisterForm.addEventListener('click', (event) => {
        event.preventDefault();
        signInForm.classList.remove('active');
        signUpForm.classList.add('active');
    });

    // Menambahkan event listener untuk link 'Masuk'
    showLoginForm.addEventListener('click', (event) => {
        event.preventDefault();
        signUpForm.classList.remove('active');
        signInForm.classList.add('active');
    });

    // Fungsi untuk mendapatkan pengguna dari Local Storage
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Fungsi untuk menyimpan pengguna ke Local Storage
    function saveUser(user) {
        const users = getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Menambahkan event listener untuk tombol 'Daftar'
    registerBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default tombol
        
        const name = document.querySelector('.sign-up-form input[name="name"]').value.trim();
        const email = document.querySelector('.sign-up-form input[name="email"]').value.trim();
        const password = document.querySelector('.sign-up-form input[name="password"]').value.trim();

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
        const users = getUsers();
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert('Email sudah terdaftar.');
        } else {
            // Menambahkan pengguna baru ke dalam data pengguna
            saveUser({ name, email, password });
            alert('Pendaftaran berhasil!');
        }
    });

    // Menambahkan event listener untuk tombol 'Masuk'
    loginBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan perilaku default tombol
        
        const email = document.querySelector('.sign-in-form input[name="email"]').value.trim();
        const password = document.querySelector('.sign-in-form input[name="password"]').value.trim();

        // Validasi input
        if (email === "" || password === "") {
            alert('Email dan password harus diisi.');
            return;
        }

        // Memeriksa kecocokan email dan password dengan data pengguna
        const users = getUsers();
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert('Login berhasil!');
            window.location.href = 'page/dashboard.html';
        } else {
            alert('Email atau password salah.');
        }
    });
});
