<template>
  <div class="row">
    <div class="col-md-8 mx-auto text-start card p-4 shadow-sm">
      <h3 class="fw-bold mb-4 text-primary">Tạo bài viết mới</h3>
      <div class="mb-3">
        <label class="form-label fw-bold small">Tiêu đề bài viết</label>
        <input type="text" class="form-control" placeholder="Nhập tiêu đề ấn tượng...">
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label fw-bold small">Danh mục</label>
          <select class="form-select">
            <option>Sức khỏe</option>
            <option>Công nghệ</option>
            <option>Đời sống học đường</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold small">Hình ảnh minh họa (URL)</label>
          <input type="text" class="form-control" placeholder="https://example.com/image.jpg">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold small">Tóm tắt ngắn</label>
        <input type="text" class="form-control" placeholder="Mô tả ngắn gọn nội dung bài viết...">
      </div>
      <div class="mb-4">
        <label class="form-label fw-bold small">Nội dung chi tiết</label>
        <textarea class="form-control" rows="8" placeholder="Viết nội dung bài viết ở đây..."></textarea>
      </div>
      <div class="d-flex gap-2 justify-content-end">
        <button class="btn btn-primary px-4">Đăng bài viết</button>
      </div>
    </div>
  </div>
</template>