<template>
  <div class="row mt-5">
    <div class="col-md-4 mx-auto card p-4 shadow-sm text-start">
      <h4 class="fw-bold text-center mb-4 text-primary">ĐĂNG NHẬP</h4>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label small fw-bold">Tài khoản Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="username@fpt.edu.vn" required>
        </div>
        <div class="mb-4">
          <label class="form-label small fw-bold">Mật khẩu</label>
          <input type="password" class="form-control" v-model="password" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-3">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

// Khai báo sự kiện emit để đẩy trạng thái lên App.vue (hoặc Router) giống bài học
const emit = defineEmits(['loginSuccess']);

const handleLogin = async () => {
  try {
    // 1. Lấy toàn bộ danh sách users về Frontend
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    // 2. Dùng hàm .find() để quét tài khoản trùng khớp
    // Sử dụng == (thay vì ===) để chấp nhận cả khi mật khẩu trong db.json là số 123 hoặc chuỗi "123"
    const loggedInUser = users.find(u => u.email === email.value && u.password == password.value);

    if (loggedInUser) {
      alert(`👋 Chào mừng ${loggedInUser.name} đã quay trở lại!`);
      
      // Lưu trạng thái vào localStorage để giữ phiên đăng nhập
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Bắn sự kiện lên component cha (App.vue)
      emit('loginSuccess', loggedInUser);
      
      // Chuyển hướng về trang chủ
      window.location.href = '/'; 
    } else {
      alert('❌ Sai email hoặc mật khẩu rồi cậu ơi, kiểm tra lại nha!');
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    alert('Bật json-server cổng 3000 chưa cậu ơi?');
  }
};
</script>