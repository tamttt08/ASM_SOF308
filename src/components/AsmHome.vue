<template>
  <div class="container mt-4">
    <h1 v-if="!selectedPost" class="text-center mb-5 fw-bold text-dark">Kiến thức sức khỏe cộng đồng</h1>
    
    <div v-if="posts.length > 0 && !selectedPost" class="row g-4 text-start">
      <div v-for="(post, index) in posts" :key="post.id || index" class="col-md-3">
        <div class="card h-100 shadow-sm border-0">
          <img :src="post.image || 'https://picsum.photos/600/400'" class="card-img-top object-fit-cover" style="height: 200px;" alt="Hình ảnh">
          <div class="card-body d-flex flex-column">
            <span class="badge bg-primary align-self-start mb-2">{{ post.category || 'Sức khỏe' }}</span>
            <h5 class="card-title fw-bold text-dark mb-2">{{ post.title }}</h5>
            <p class="card-text text-secondary small flex-grow-1" style="text-align: justify;">
              {{ post.summary }}
            </p>
            <button class="btn btn-info text-white mt-3 w-100 fw-bold" @click="viewDetail(post)">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="selectedPost" class="text-start animated fadeIn">
      <button class="btn btn-outline-secondary btn-sm mb-4 fw-bold" @click="selectedPost = null">
        ← Quay lại danh sách
      </button>

      <div class="row">
        <div class="col-lg-8 mx-auto">
          <span class="badge bg-primary align-self-start mb-2">
            {{ selectedPost.category || 'Sức khỏe' }}
          </span>
          
          <h1 class="fw-bold text-dark mb-3">{{ selectedPost.title }}</h1>
          
          <p class="text-muted small mb-4">
            Đăng bởi: <strong class="text-dark">{{ selectedPost.author || 'Quản trị viên' }}</strong> | Cập nhật: 2026
          </p>

          <img :src="selectedPost.image || 'https://picsum.photos/600/400'" class="img-fluid rounded shadow-sm mb-4 w-100 object-fit-cover" style="max-height: 400px;" alt="Cover">

          <div class="post-content lh-lg text-secondary" style="text-align: justify; font-size: 17px;">
            <p class="fw-bold text-dark mb-3" style="font-size: 19px;">{{ selectedPost.summary }}</p>
            <p>{{ selectedPost.content || 'Nội dung chi tiết của bài viết đang được cập nhật...' }}</p>
          </div>
          
          <hr class="my-5">
        </div>
      </div>
    </div>

    <div v-else class="text-center my-5 py-5">
      <div class="spinner-border text-primary mb-3" role="status"></div>
      <p class="text-muted">Đang kết nối dữ liệu từ hệ thống db.json...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 1. Tạo mảng posts rỗng để chuẩn bị hứng dữ liệu động từ json-server
const posts = ref([]);

// 2. Biến phản ứng lưu trữ bài viết được click chọn xem chi tiết
const selectedPost = ref(null);

// 3. Hàm dùng fetch để kéo dữ liệu từ db.json về trang chủ
const fetchPosts = async () => {
  try {
    const response = await fetch('http://localhost:3000/posts');
    if (response.ok) {
      posts.value = await response.json();
    } else {
      console.error('Lỗi khi lấy dữ liệu bài viết từ server');
    }
  } catch (error) {
    console.error('Không thể kết nối tới json-server, cậu nhớ bật server nha:', error);
  }
};

// 4. Bắt sự kiện click để lưu object bài viết và cuộn mượt lên đầu trang
const viewDetail = (post) => {
  selectedPost.value = post;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Tự động tải dữ liệu từ db.json lên ngay khi vừa truy cập Trang chủ
onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
/* Hiệu ứng mượt mà khi chuyển đổi màn hình */
.animated {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>