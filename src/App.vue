<template>
  <div id="asm-layout">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
      <div class="container">
        <router-link class="navbar-brand fw-bold text-primary" to="/">FPT Blog</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/" active-class="active">Trang chủ</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/create" active-class="active">Đăng bài mới</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile" active-class="active">Trang cá nhân</router-link>
            </li>
          </ul>
          <div class="d-flex gap-2 align-items-center">
            <router-link class="btn btn-danger btn-sm fw-bold me-2" to="/admin">Trang Quản Trị</router-link>
            
            <router-link class="btn btn-outline-light btn-sm" to="/login">Đăng nhập</router-link>
            <router-link class="btn btn-primary btn-sm" to="/register">Đăng ký</router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="container mb-5">
      <div class="animated fadeIn">
        <router-view></router-view>
      </div>
    </main>

    <footer class="text-muted py-4 bg-light border-top mt-auto">
      <div class="container text-center">
        <p class="mb-1">© 2026 Assignment 1 - Phát triển ứng dụng Web Frontend</p>
        <p class="mb-0 small">Thiết kế bởi sinh viên lớp SOF308 - FPT Polytechnic</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Khi dùng Vue Router, cậu không cần import các file component hay quản lý shallowRef ở đây nữa!
// Toàn bộ logic chia trang sẽ do file src/router/index.ts (hoặc .js) đảm nhận.
</script>

<style>
body {
  background-color: #f8f9fa;
  min-height: 100vh;
}
#asm-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
.animated {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>