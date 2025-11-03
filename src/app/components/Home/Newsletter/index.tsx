import Image from 'next/image'

const Newsletter = () => {
  return (
    <section id='join-section' className='-mb-64'>
      <div className='relative z-10'>
        <div className='mx-auto max-w-2xl py-16 md:py-24 px-4 sm:px-6 md:max-w-7xl lg:px-24 bg-orange rounded-lg bg-newsletter bg-contain bg-no-repeat bg-right-bottom'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8'>
            <div>
              <h3 className='text-5xl font-bold mb-3'> Nhận bản tin ưu đãi </h3>
              <h4 className='text-lg font-medium mb-7'>
                Cập nhật sách mới, mã giảm giá và lộ trình phát triển API BookVerse hàng tuần.
              </h4>
              <div className='flex gap-2'>
                <input
                  type='email'
                  name='q'
                  className='py-4 w-full text-base px-4 bg-white transition-all duration-500 focus:border-primary focus:outline-1 rounded-lg pl-4'
                  placeholder='Nhập email của bạn'
                  autoComplete='off'
                />
                <button className='bg-primary cursor-pointer hover:bg-transparent border border-primary hover:text-primary text-white font-medium py-2 px-4 rounded-sm'>
                  Đăng ký
                </button>
              </div>
            </div>
            <div className='hidden sm:block'>
              <div className='float-right -mt-32'>
                <Image
                  src={'/images/newsletter/Free.svg'}
                  alt='bgimg'
                  width={64}
                  height={64}
                  className='w-auto'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
