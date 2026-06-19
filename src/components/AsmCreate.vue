<template>
  <div class="row mt-4 text-start">
    <div class="col-md-8 mx-auto card p-4 shadow-sm">
      <h3 class="fw-bold text-center mb-4 text-primary">ĐĂNG BÀI VIẾT MỚI</h3>
      
      <form @submit.prevent="handleCreatePost">
        <div class="mb-3">
          <label class="form-label fw-bold small">Tiêu đề bài viết</label>
          <input type="text" class="form-control" v-model="title" placeholder="Nhập tiêu đề hấp dẫn..." required>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label fw-bold small">Danh mục</label>
            <select class="form-select" v-model="category">
              <option value="Sức khỏe">Sức khỏe</option>
              <option value="Dinh dưỡng">Dinh dưỡng</option>
              <option value="Tập luyện">Tập luyện</option>
              <option value="Mẹo vặt">Mẹo vặt</option>
            </select>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label fw-bold small">Tác giả</label>
            <input type="text" class="form-control bg-light" :value="authorName" disabled>
            <span class="text-muted x-small">*Hệ thống tự động ghi nhận theo tài khoản của cậu</span>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold small">Tóm tắt ngắn</label>
          <input type="text" class="form-control" v-model="summary" placeholder="Mô tả ngắn gọn nội dung bài viết..." required>
        </div>

        <div class="mb-4">
          <label class="form-label fw-bold small">Nội dung chi tiết</label>
          <textarea class="form-control" v-model="content" rows="6" placeholder="Viết nội dung bài viết tại đây..." required></textarea>
        </div>

        <div class="d-flex gap-2 justify-content-end">
          <button type="button" class="btn btn-outline-secondary" @click="resetForm">Xóa trắng</button>
          <button type="submit" class="btn btn-primary px-4 fw-bold">Xuất bản bài viết</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Các biến phản ứng lưu trữ dữ liệu form
const title = ref('');
const category = ref('Sức khỏe');
const summary = ref('');
const content = ref('');
const authorName = ref('Ẩn danh'); // Mặc định nếu chưa đăng nhập

onMounted(() => {
  // Lấy thông tin user từ localStorage để tự động điền tên tác giả
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    authorName.value = user.name; // Gán tên người dùng vào ô tác giả
  } else {
    // Nếu chưa đăng nhập thì đá về trang login không cho đăng bài (Route Guard cơ bản)
    alert('⚠️ Cậu cần phải đăng nhập tài khoản trước khi đăng bài viết mới nha!');
    router.push('/login');
  }
});

// Hàm xử lý gửi dữ liệu bài viết mới lên db.json
const handleCreatePost = async () => {
  try {
    // Lấy ngày, tháng, năm hiện tại từ hệ thống
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng trong JS chạy từ 0-11 nên phải +1
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`; // Kết quả dạng: 18/06/2026

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.value,
      category: category.value,
      author: authorName.value,
      summary: summary.value,
      content: content.value,
      date: formattedDate, // 🔥 Thêm trường date này để lưu ngày tháng vào db.json nha cậu
      image: `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 100)}`
    };

    // Đoạn fetch giữ nguyên...
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });

    if (response.ok) {
      alert('🎉 Đăng bài viết mới thành công rồi cậu ơi!');
      resetForm();
      router.push('/');
    }
  } catch (error) {
    console.error('Lỗi đăng bài:', error);
  }
};

// Hàm xóa trắng các trường thông tin trên form
const resetForm = () => {
  title.value = '';
  category.value = 'Sức khỏe';
  summary.value = '';
  content.value = '';
};
</script>

<style scoped>
.x-small {
  font-size: 11px;
}
</style>