<template>
  <div class="row mt-4">
    <div class="col-md-4 mx-auto card p-4 shadow-sm text-start">
      <h4 class="fw-bold text-center mb-4 text-primary">ĐĂNG KÝ TÀI KHOẢN</h4>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label small fw-bold">Họ và tên</label>
          <input type="text" class="form-control" v-model="name" placeholder="Nhập tên của cậu..." required>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Email sinh viên</label>
          <input type="email" class="form-control" v-model="email" placeholder="username@fpt.edu.vn" required>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Mật khẩu</label>
          <input type="password" class="form-control" v-model="password" placeholder="Tối thiểu 6 ký tự" required minlength="6">
        </div>
        <button type="submit" class="btn btn-success w-100 mb-3">Tạo tài khoản</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Math.random().toString(36).substr(2, 9), // Tự sinh ID chuỗi ngẫu nhiên cho đồng bộ
        email: email.value,
        password: password.value,
        name: name.value
      })
    });

    if (response.ok) {
      alert('🎉 Đăng ký thành công rồi nè cậu ơi! Qua tab Đăng nhập test thử tài khoản mới nha.');
      name.value = '';
      email.value = '';
      password.value = '';
    }
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
  }
};
</script>