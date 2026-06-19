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
            Đăng bởi: <strong class="text-dark">{{ selectedPost.author || 'Quản trị viên' }}</strong> | Cập nhật: {{ selectedPost.date || '18/06/2026' }}
          </p>

          <img :src="selectedPost.image || 'https://picsum.photos/600/400'" class="img-fluid rounded shadow-sm mb-4 w-100 object-fit-cover" style="max-height: 400px;" alt="Cover">

          <div class="post-content lh-lg text-secondary" style="text-align: justify; font-size: 17px;">
            <p class="fw-bold text-dark mb-3" style="font-size: 19px;">{{ selectedPost.summary }}</p>
            <p>{{ selectedPost.content || 'Nội dung chi tiết của bài viết đang được cập nhật...' }}</p>
          </div>
          
          <hr class="my-5">

          <div class="comment-section mt-4">
            <h5 class="fw-bold mb-4 text-secondary">💬 BÌNH LUẬN TƯƠNG TÁC</h5>

            <div v-if="currentUser" class="mb-4 card p-3 shadow-sm bg-light border-0">
              <label class="form-label small fw-bold text-dark">Viết bình luận của cậu:</label>
              <div class="d-flex gap-2">
                <input 
                  type="text" 
                  class="form-control border-secondary-subtle" 
                  v-model="newCommentContent" 
                  placeholder="Chia sẻ cảm nghĩ của cậu về bài viết này..."
                  @keyup.enter="handleSendComment"
                />
                <button class="btn btn-primary px-4 fw-bold shadow-sm" @click="handleSendComment">Gửi</button>
              </div>
            </div>

            <div v-else class="alert alert-warning small py-2 border-0 shadow-sm" role="alert">
              🔒 Cậu vui lòng <router-link to="/login" class="fw-bold text-decoration-none text-danger">Đăng nhập</router-link> để tham gia bình luận cùng mọi người nhé!
            </div>

            <div class="comment-list mt-3">
              <div v-if="filteredComments.length === 0" class="text-muted small fst-italic ps-2">
                Chưa có bình luận nào cho bài viết này. Hãy là người đầu tiên để lại ý kiến nhé!
              </div>
              
              <div 
                v-else 
                v-for="comment in filteredComments" 
                :key="comment.id" 
                class="card p-3 mb-2 shadow-none border-bottom bg-white rounded-0 text-start"
              >
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <strong class="text-primary small">{{ comment.author }}</strong>
                  <span class="text-muted x-small" style="font-size: 11px;">{{ comment.date }}</span>
                </div>
                <p class="mb-0 text-dark small" style="white-space: pre-line;">{{ comment.content }}</p>
              </div>
            </div>
          </div>
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
import { ref, computed, onMounted } from 'vue';

// Quản lý danh sách bài viết và bài viết được chọn
const posts = ref([]);
const selectedPost = ref(null);

// Quản lý hệ thống bình luận và thông tin đăng nhập
const currentUser = ref(null);
const allComments = ref([]);
const newCommentContent = ref('');

// Computed Property lọc ra những bình luận có postId khớp với bài viết đang xem
const filteredComments = computed(() => {
  if (!selectedPost.value) return [];
  return allComments.value.filter(c => c.postId === selectedPost.value.id);
});

// Hàm lấy dữ liệu bài viết từ json-server
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

// Hàm lấy TOÀN BỘ danh sách bình luận trên server về để lọc
const fetchComments = async () => {
  try {
    const response = await fetch('http://localhost:3000/comments');
    if (response.ok) {
      allComments.value = await response.json();
    }
  } catch (error) {
    console.error('Lỗi khi tải bình luận:', error);
  }
};

// Hàm xử lý gửi bình luận lên db.json
const handleSendComment = async () => {
  if (!newCommentContent.value.trim()) {
    alert('Cậu chưa gõ nội dung bình luận kìa!');
    return;
  }

  // Tự động tạo chuỗi ngày tháng năm thời gian thực (realtime)
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const newComment = {
    id: Math.random().toString(36).substr(2, 9),
    postId: selectedPost.value.id, // Gắn chặt ID bài viết hiện tại
    author: currentUser.value ? currentUser.value.name : 'Ẩn danh', // Lấy tên người dùng đã đăng nhập
    content: newCommentContent.value,
    date: formattedDate
  };

  try {
    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    });

    if (response.ok) {
      // Đẩy comment mới vào mảng phản ứng ở frontend ngay lập tức để giao diện hiển thị mượt mà
      allComments.value.push(newComment);
      newCommentContent.value = ''; // Reset ô nhập liệu sạch sẽ
    } else {
      alert('Không thể lưu bình luận lên hệ thống!');
    }
  } catch (error) {
    console.error('Lỗi gửi bình luận:', error);
  }
};

// Cập nhật hàm viewDetail: Đọc dữ liệu bài viết đồng thời kéo bình luận về
const viewDetail = (post) => {
  selectedPost.value = post;
  fetchComments(); // 🔥 Cứ mở bài viết nào lên là gọi API lấy bình luận bài đó liền lập tức
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Tải thông tin người dùng và bài viết ngay khi gắn component vào DOM
onMounted(() => {
  fetchPosts();
  
  // Kiểm tra xem có phiên đăng nhập cũ trong localStorage không
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser);
  }
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
.animated {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>