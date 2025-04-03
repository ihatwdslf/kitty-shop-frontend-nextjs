"use client"

import Slider from "react-slick";
import Slide from "@/components/Slide";

const Hero = () => {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
    }

    const slideData = [
        {
            id: 0,
            img: "/banner-1.jpg",
            title: "Трендовий товар",
            mainTitle: "ЖІНОЧИЙ РОЗПРОДАЖ ОСТАННЬОЇ МОДИ",
            price: 20
        },
        {
            id: 1,
            img: "/banner-2.jpg",
            title: "Трендові аксесуари",
            mainTitle: "СУЧАСНІ СОНЯЧНІ ОКУЛЯРИ",
            price: 15
        },
        {
            id: 2,
            img: "/banner-3.jpg",
            title: "Пропозиція продажу",
            mainTitle: "ЛІТНІЙ РОЗПРОДАЖ НОВОЇ МОДИ",
            price: 30
        },
    ]

    return (
        <div>
            <div className="container">
                <Slider {...settings}>
                    {slideData.map((item) =>
                        <Slide
                            key={item.id}
                            img={item.img}
                            title={item.title}
                            mainTitle={item.mainTitle}
                            price={item.price}
                        />
                    )}
                </Slider>
            </div>
        </div>
    )
}

export default Hero;