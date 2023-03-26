import React, { useEffect } from 'react'
// swiper@5.4.5
import Swiper from 'swiper/js/swiper.js' // 引入js
import 'swiper/css/swiper.min.css' // 引入样式

const DemoSwiper = () => {
    useEffect(() => {
        // 配置swiper播放 配置项都写这里面
        new Swiper('.swiper-container', {
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            },
            loop: true,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            effect: 'fade'
        })
    }, [])
    // swiper的html结构
    // 注意！！！：该版本中swiper最外层的类名一定是'swiper-container'，不要用其他的哦
    return (
        <div
            className='swiper-container'
        >
            <div className="swiper-wrapper">
                <div className="swiper-slide swiper-slide1">
                    <img src={require('../../assets/imgs/banner/1.jpg')} alt="" />
                </div>
                <div className="swiper-slide swiper-slide2">
                    <img src={require('../../assets/imgs/banner/2.jpg')} alt="" />
                </div>
                <div className="swiper-slide swiper-slide3">
                    <img src={require('../../assets/imgs/banner/3.jpg')} alt="" />
                </div>
                <div className="swiper-slide swiper-slide4">
                    <img src={require('../../assets/imgs/banner/4.jpg')} alt="" />
                </div>
                <div className="swiper-slide swiper-slide5">
                    <img src={require('../../assets/imgs/banner/5.jpg')} alt="" />
                </div>
            </div>
            {/* <!-- 如果需要分页器 --> */}
            <div className="swiper-pagination"></div>
        </div>)
}

export default DemoSwiper
