import { Icon } from '@iconify/react/dist/iconify.js'

const apiGroups = [
  {
    icon: 'ph:keyhole-duotone',
    title: 'Xác thực & Bảo mật',
    description:
      'Quản lý toàn bộ vòng đời JWT: đăng ký, đăng nhập, làm mới token và xử lý quên mật khẩu cho người dùng mới lẫn hiện hữu.',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'POST /api/auth/refresh',
      'POST /api/auth/forgot-password',
      'POST /api/auth/reset-password',
      'PUT /api/auth/change-password',
    ],
  },
  {
    icon: 'solar:user-bold-duotone',
    title: 'Hồ sơ độc giả',
    description:
      'Xem và cập nhật thông tin cá nhân, quản lý avatar, danh sách yêu thích, đơn hàng và thông báo theo thời gian thực.',
    endpoints: [
      'GET /api/user/',
      'PUT /api/user/update',
      'POST /api/user/avatar',
      'GET /api/user/orders',
      'GET /api/user/wishlist',
      'POST /api/user/wishlist/{bookId}',
      'GET /api/user/notifications',
    ],
  },
  {
    icon: 'mdi:bookshelf',
    title: 'Danh mục & Sách',
    description:
      'Phân trang, lọc nâng cao, sách nổi bật, sách mới và liên quan — tất cả từ một API catalog hiện đại.',
    endpoints: [
      'GET /api/books/',
      'GET /api/books/{bookId}',
      'GET /api/books/featured',
      'GET /api/books/newest',
      'GET /api/books/related/{bookId}',
      'GET /api/books/search',
      'POST /api/books/admin/books',
      'PUT /api/books/admin/books/{bookId}',
      'DELETE /api/books/admin/books/{bookId}',
    ],
  },
  {
    icon: 'solar:folder-with-files-bold-duotone',
    title: 'Thể loại, tác giả & NXB',
    description:
      'Chuẩn hoá taxonomy để các bộ lọc hoạt động mượt mà, đồng thời hỗ trợ admin thêm, sửa, xoá dữ liệu nền tảng.',
    endpoints: [
      'GET /api/categories',
      'GET /api/authors',
      'GET /api/publishers',
      'POST /api/categories',
      'POST /api/authors',
      'POST /api/publishers',
    ],
  },
  {
    icon: 'solar:bag-5-bold-duotone',
    title: 'Giỏ hàng thông minh',
    description:
      'Đồng bộ giỏ hàng đa thiết bị: thêm, cập nhật, xoá từng sản phẩm hoặc toàn bộ với các API REST rõ ràng.',
    endpoints: [
      'GET /api/cart/',
      'POST /api/cart/add',
      'PUT /api/cart/update',
      'DELETE /api/cart/remove/{bookId}',
      'DELETE /api/cart/clear',
    ],
  },
  {
    icon: 'solar:card-send-bold-duotone',
    title: 'Đơn hàng & Thanh toán',
    description:
      'Theo dõi hành trình đơn hàng từ checkout tới trạng thái giao hàng; hỗ trợ huỷ đơn và quản trị viên cập nhật tiến độ.',
    endpoints: [
      'POST /api/orders/checkout',
      'GET /api/orders/',
      'GET /api/orders/{orderId}',
      'PUT /api/orders/{orderId}/cancel',
      'GET /api/orders/admin/orders',
      'PUT /api/orders/admin/orders/{orderId}/status',
    ],
  },
  {
    icon: 'mdi:star-half-full',
    title: 'Đánh giá & Cộng đồng',
    description:
      'Nuôi dưỡng cộng đồng độc giả với hệ thống đánh giá giàu dữ liệu: tạo, sửa và xoá review trực tiếp trên từng cuốn sách.',
    endpoints: [
      'GET /api/reviews/book/{bookId}',
      'POST /api/reviews/book/{bookId}',
      'PUT /api/reviews/{reviewId}',
      'DELETE /api/reviews/{reviewId}',
    ],
  },
  {
    icon: 'solar:ticket-sale-bold-duotone',
    title: 'Khuyến mãi & Ưu đãi',
    description:
      'Quản lý mã giảm giá từ admin tới trải nghiệm checkout, đảm bảo trải nghiệm mua sắm hấp dẫn và dễ theo dõi.',
    endpoints: [
      'GET /api/coupons/',
      'POST /api/coupons/apply',
      'POST /api/coupons/admin/coupons',
      'DELETE /api/coupons/admin/coupons/{id}',
    ],
  },
  {
    icon: 'solar:robot-bold-duotone',
    title: 'Gợi ý từ AI',
    description:
      'Chatbot AI gợi ý sách cá nhân hoá theo lịch sử mua và cho phép độc giả phản hồi để cải thiện mô hình.',
    endpoints: [
      'POST /api/ai/chat',
      'GET /api/ai/recommend/{userId}',
      'POST /api/ai/feedback',
    ],
  },
  {
    icon: 'solar:bell-bing-bold-duotone',
    title: 'Thông báo đa kênh',
    description:
      'Giữ liên lạc với độc giả bằng thông báo đẩy về trạng thái đơn hàng, khuyến mãi và cập nhật quan trọng.',
    endpoints: [
      'GET /api/notifications/',
      'PUT /api/notifications/{id}/read',
      'GET /api/notifications/unread-count',
    ],
  },
  {
    icon: 'solar:chart-square-bold-duotone',
    title: 'Bảng điều khiển Admin',
    description:
      'Theo dõi doanh thu, người dùng và top sách bán chạy; kiểm soát quyền truy cập và xử lý vi phạm chỉ với vài endpoint.',
    endpoints: [
      'GET /api/admin/dashboard/stats',
      'GET /api/admin/users',
      'POST /api/admin/users',
      'PUT /api/admin/users/{id}/ban',
      'PUT /api/admin/users/{id}/role',
    ],
  },
]

const ApiOverview = () => {
  return (
    <section id='api-overview' className='bg-cream'>
      <div className='container'>
        <div className='flex flex-col sm:flex-row justify-between gap-6 sm:items-end mb-10'>
          <div className='max-w-2xl'>
            <h2 className='font-bold tracking-tight'>Bản đồ API BookVerse</h2>
            <p className='text-lg text-black/70 mt-4'>
              Toàn bộ kiến trúc back-end được trình bày như một luồng tính năng hoàn chỉnh để đội ngũ thiết kế và phát triển nhanh chóng dựng giao diện phù hợp.
            </p>
          </div>
          <p className='text-sm uppercase tracking-widest text-primary font-semibold'>
            11 nhóm API · 44 endpoint trọng yếu
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {apiGroups.map((group) => (
            <article
              key={group.title}
              className='h-full rounded-2xl border border-primary/10 bg-white/80 p-6 shadow-lg shadow-primary/5 backdrop-blur'>
              <div className='flex items-center gap-3 mb-4'>
                <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <Icon icon={group.icon} className='text-2xl' />
                </span>
                <h3 className='text-2xl font-semibold text-black'>{group.title}</h3>
              </div>
              <p className='text-base text-black/70 leading-7 mb-4'>{group.description}</p>
              <ul className='space-y-2 text-sm text-black/70 font-medium'>
                {group.endpoints.map((endpoint) => (
                  <li
                    key={endpoint}
                    className='rounded-md bg-cream px-3 py-2 border border-primary/10 flex items-center gap-2'>
                    <Icon icon='solar:check-circle-bold-duotone' className='text-primary text-lg' />
                    <span className='font-mono text-xs sm:text-sm break-all'>{endpoint}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ApiOverview
