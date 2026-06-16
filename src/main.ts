import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 1. Gọi router vừa tạo vào đây

// Nếu cậu có xài Bootstrap thì giữ nguyên dòng import Bootstrap cũ của cậu nha
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(router) // 2. Ép ứng dụng Vue phải sử dụng hệ thống định tuyến Router

app.mount('#app')