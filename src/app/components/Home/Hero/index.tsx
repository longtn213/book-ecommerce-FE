import Link from 'next/link'
import Dropdownone from './Dropdownone'
import Dropdowntwo from './Dropdowntwo'
import Image from 'next/image'

const Banner = () => {
  return (
    <section id='home' className='bg-banner-image pt-32 pb-24'>
      <div className='relative px-6 lg:px-8'>
        <div className='container'>
          <div className='flex flex-col gap-4 text-center'>
            <h1 className='leading-tight font-bold tracking-tight max-w-4xl mx-auto'>
              Thiết kế BookVerse Commerce – trải nghiệm mua sách API-first
            </h1>
            <p className='text-lg leading-8 text-black max-w-3xl mx-auto'>
              Khám phá thư viện online, cá nhân hoá bằng trí tuệ nhân tạo và điều hành toàn bộ vòng đời đơn hàng – tất cả đều dựa trên bộ API chuẩn hoá bạn đang có.
            </p>
            <div className='backdrop-blur-md bg-white/30 border border-white/30 rounded-xl shadow-lg p-6 w-fit mx-auto'>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-left'>
                <div className='hidden sm:flex -space-x-2 overflow-hidden'>
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=facearea&w=256&h=256&q=80'
                    alt='customer-1'
                    width={12}
                    height={12}
                  />
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1544717301-9cdcb1f5941c?auto=format&fit=facearea&w=256&h=256&q=80'
                    alt='customer-2'
                    width={12}
                    height={12}
                  />
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=facearea&w=256&h=256&q=80'
                    alt='customer-3'
                    width={12}
                    height={12}
                  />
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=256&h=256&q=80'
                    alt='customer-4'
                    width={12}
                    height={12}
                  />
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=facearea&w=256&h=256&q=80'
                    alt='customer-5'
                    width={12}
                    height={12}
                  />
                </div>
                <div className='text-center sm:text-left max-w-xs'>
                  <div className='flex justify-center sm:justify-start items-center gap-2'>
                    <h3 className='text-2xl font-semibold'>11 nhóm API</h3>
                    <Image
                      src={'/images/banner/Stars.svg'}
                      alt='stars-icon'
                      width={32}
                      height={32}
                      className='w-[60%]'
                    />
                  </div>
                  <p className='text-sm text-black/70 mt-2'>
                    Được hơn 25k độc giả và 180+ cửa hàng sách sử dụng làm prototype trải nghiệm mua sắm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DROPDOWN BUTTONS */}

          <div className='mx-auto max-w-4xl mt-12 p-6 lg:max-w-4xl lg:px-8 bg-white/95 rounded-xl boxshadow border border-primary/10'>
            <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8'>
              <div className='col-span-3'>
                <Dropdownone />
              </div>
              <div className='col-span-3'>
                <Dropdowntwo />
              </div>
              <div className='col-span-3 sm:col-span-2 mt-2'>
                <Link href={'/#catalog'}>
                  <button className='bg-primary w-full hover:bg-transparent hover:text-primary duration-300 border border-primary text-white font-bold py-4 px-3 rounded-md hover:cursor-pointer'>
                    Xem sách nổi bật
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
