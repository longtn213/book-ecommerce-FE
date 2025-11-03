'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

const Companies = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }

  const [companies, setCompanies] = useState<{ imgSrc: string; name: string }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setCompanies(data.Companiesdata)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      <div className='container mx-auto max-w-7xl px-4'>
        <h2 className='text-lg mb-10 text-black/60 text-center uppercase tracking-widest'>
          Đồng hành cùng các nhà xuất bản hàng đầu
        </h2>
        <div>
          <Slider {...settings}>
            {companies.map((item, i) => (
              <div key={item.name + i} className='flex items-center justify-center'>
                <div className='flex items-center gap-3 rounded-lg border border-primary/10 bg-white px-6 py-4 shadow-sm'>
                  <Image
                    src={item.imgSrc}
                    alt={item.name}
                    width={120}
                    height={50}
                    className='w-auto h-10 object-contain'
                  />
                  <span className='text-sm font-semibold text-black/70 hidden md:block'>
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Companies
