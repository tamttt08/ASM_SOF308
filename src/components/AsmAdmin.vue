<template>
  <div class="row text-start">
    <div class="col-md-12">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold text-danger">Hệ thống quản trị Blog (Admin)</h3>
        <button class="btn btn-success btn-sm" @click="openAddModal">＋ Viết bài mới</button>
      </div>

      <div class="card shadow-sm border-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-dark">
              <tr>
                <th scope="col" style="width: 5%">#</th>
                <th scope="col" style="width: 15%">Hình ảnh</th>
                <th scope="col" style="width: 25%">Tiêu đề</th>
                <th scope="col" style="width: 35%">Tóm tắt nội dung</th>
                <th scope="col" style="width: 20%" class="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in adminPosts" :key="post.id || index">
                <th scope="row" class="fw-bold">{{ index + 1 }}</th>
                <td>
                  <img :src="post.image" class="rounded object-fit-cover" style="width: 80px; height: 50px;" alt="Thumb">
                </td>
                <td class="fw-bold text-dark">{{ post.title }}</td>
                <td class="text-muted small text-truncate" style="max-width: 300px;">{{ post.summary }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-outline-warning me-2 fw-bold" @click="editPost(post)">Sửa</button>
                  <button class="btn btn-sm btn-outline-danger fw-bold" @click="deletePost(post, index)">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="showForm" class="card p-4 mt-4 border-warning shadow-sm bg-light">
        <h4 class="fw-bold text-warning mb-3">
          {{ isEditing ? 'CẬP NHẬT BÀI VIẾT' : 'THÊM BÀI VIẾT MỚI' }}
        </h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label small fw-bold">Tiêu đề bài viết</label>
            <input type="text" class="form-control" v-model="formModel.title">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label small fw-bold">Đường dẫn ảnh (URL)</label>
            <input type="text" class="form-control" v-model="formModel.image">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label small fw-bold">Danh mục</label>
            <input type="text" class="form-control" v-model="formModel.category" placeholder="Ví dụ: Sức khỏe, Đời sống...">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label small fw-bold">Tác giả</label>
            <input type="text" class="form-control" v-model="formModel.author" placeholder="Tên người đăng...">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Tóm tắt ngắn</label>
          <input type="text" class="form-control" v-model="formModel.summary">
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Nội dung chi tiết bài viết</label>
          <textarea class="form-control" rows="4" v-model="formModel.content" placeholder="Nhập nội dung chi tiết để hiển thị khi bấm Xem chi tiết..."></textarea>
        </div>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-secondary btn-sm px-3" @click="showForm = false">Hủy</button>
          <button class="btn btn-warning btn-sm px-4 fw-bold" @click="savePost">Lưu lại</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Mạng dữ liệu rỗng, kết nối API lấy từ db.json
const adminPosts = ref([]);

// Các trạng thái đóng mở form
const showForm = ref(false);
const isEditing = ref(false);
let activeIndex = null;

// Khởi tạo model lưu trữ dữ liệu đầy đủ các trường
const formModel = ref({ id: '', title: '', summary: '', content: '', category: '', author: '', image: '' });

// Hàm gọi API lấy danh sách bài viết từ json-server về
const fetchAdminPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    adminPosts.value = response.data;
  } catch (error) {
    console.error("Lỗi lấy dữ liệu từ db.json:", error);
  }
};

// Vừa mở trang admin lên là load dữ liệu ngay lập tức
onMounted(() => {
  fetchAdminPosts();
});

const openAddModal = () => {
  isEditing.value = false;
  // Thiết lập sẵn các trường mặc định sạch đẹp để đồng bộ với trang chủ
  formModel.value = { 
    title: '', 
    summary: '', 
    content: '', 
    category: 'Sức khỏe', 
    author: 'Thanh Tâm', 
    image: 'https://picsum.photos/600/400?random=' + Math.floor(Math.random() * 100) 
  };
  showForm.value = true;
};

const editPost = (post) => {
  isEditing.value = true;
  activeIndex = adminPosts.value.indexOf(post);
  formModel.value = { ...post }; // Copy dữ liệu bài viết lên form sửa
  showForm.value = true;
};

const savePost = async () => {
  if (!formModel.value.title || !formModel.value.summary) {
    alert("Cậu vui lòng điền đầy đủ thông tin bài viết nha!");
    return;
  }
  
  try {
    if (isEditing.value) {
      // Gửi cập nhật bài viết cũ
      await axios.put(`http://localhost:3000/posts/${formModel.value.id}`, formModel.value);
      alert("Cập nhật bài viết thành công!");
    } else {
      // ✨ THẦN CHÚ SỬA LỖI Ở ĐÂY:
      // Tạo một object mới hoàn toàn, ÉP trường "id" phải nằm chễm chệ ở ĐẦU TIÊN
      const postToSend = {
        id: String(Date.now()), // Sinh chuỗi số dựa trên thời gian để không trùng nhau
        title: formModel.value.title,
        category: formModel.value.category,
        author: formModel.value.author,
        summary: formModel.value.summary,
        content: formModel.value.content,
        image: formModel.value.image
      };

      // Gửi cái object chuẩn cấu trúc này lên server thay vì formModel ban đầu
      await axios.post('http://localhost:3000/posts', postToSend);
      alert("Thêm bài viết mới thành công!");
    }
    
    showForm.value = false;
    fetchAdminPosts(); // Tải lại dữ liệu quản trị
  } catch (error) {
    console.error("Lỗi khi lưu bài viết:", error);
    alert("Úi, lỗi rồi cậu ơi!");
  }
};

const deletePost = async (post, index) => {
  if (confirm("Cậu có chắc chắn muốn xóa bài viết này không?")) {
    try {
      // Gửi lệnh DELETE kèm ID lên json-server để xóa hẳn trong db.json
      await axios.delete(`http://localhost:3000/posts/${post.id}`);
      alert("Đã xóa bài viết thành công rồi nha!");
      fetchAdminPosts(); // Tải lại bảng sau khi xóa xong
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert("Xóa thất bại rồi cậu ơi!");
    }
  }
};
</script>