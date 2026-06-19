<template>
  <div class="row">
    <div class="col-md-5 mx-auto text-start card p-4 shadow-sm text-center">
      <div class="mb-3 position-relative d-inline-block mx-auto">
        <img src="https://picsum.photos/150/150?random=20" class="rounded-circle img-thumbnail shadow-sm" alt="Avatar">
      </div>
      
      <h4 class="fw-bold mb-1">{{ name }}</h4>
      <p class="text-muted small mb-4">Mã số: TS02309 • Lớp: SD21102</p>
      <hr>

      <form @submit.prevent="handleUpdateProfile">
        <div class="text-start mb-3">
          <label class="form-label fw-bold small">Họ và tên</label>
          <input type="text" class="form-control" v-model="name" required placeholder="Nhập họ tên mới...">
        </div>
        
        <div class="text-start mb-3">
          <label class="form-label fw-bold small">Địa chỉ Email</label>
          <input type="email" class="form-control" v-model="email" required placeholder="username@fpt.edu.vn">
        </div>
        
        <div class="text-start mb-4">
          <label class="form-label fw-bold small">Mật khẩu mới</label>
          <input type="password" class="form-control" v-model="password" required placeholder="Nhập mật khẩu mới hoặc cũ...">
        </div>
        
        <button type="submit" class="btn btn-success w-100 fw-bold">
          Cập nhật thông tin tài khoản
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Khai báo các biến liên kết dữ liệu form bằng v-model
const id = ref('');
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('user'); // Giữ lại quyền của user tránh bị mất khi update

// Sự kiện emit để báo cho App.vue cập nhật lại Navbar tức thì nếu đổi tên
const emit = defineEmits(['loginSuccess']);

onMounted(() => {
  // 1. Kiểm tra trạng thái đăng nhập
  const savedUser = localStorage.getItem('user');
  if (!savedUser) {
    alert('⚠️ Cậu phải đăng nhập mới xem được trang thông tin cá nhân nha!');
    router.push('/login');
    return;
  }

  // 2. Điền dữ liệu cũ của user vào các ô input trên giao diện
  const user = JSON.parse(savedUser);
  id.value = user.id;
  name.value = user.name;
  email.value = user.email;
  password.value = user.password; // Hiện mật khẩu thực tế thay vì dấu ********
  role.value = user.role || 'user';
});

// Hàm xử lý gửi yêu cầu cập nhật lên db.json
const handleUpdateProfile = async () => {
  try {
    const updatedUser = {
      id: id.value,
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    };

    // Gửi phương thức PUT kèm ID người dùng lên json-server để cập nhật ghi đè
    const response = await fetch(`http://localhost:3000/users/${id.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });

    if (response.ok) {
      alert('🎉 Cập nhật thông tin tài khoản thành công rồi cậu ơi!');
      
      // Đồng bộ lại dữ liệu mới vào localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Kích hoạt emit bắn dữ liệu lên App.vue để đổi tên hiển thị trên thanh Navbar ngay lập tức
      emit('loginSuccess', updatedUser);
    } else {
      alert('❌ Cập nhật thất bại, cậu kiểm tra lại kết nối nhé.');
    }
  } catch (error) {
    console.error('Lỗi cập nhật profile:', error);
    alert('Không kết nối được tới json-server rồi cậu!');
  }
};
</script>