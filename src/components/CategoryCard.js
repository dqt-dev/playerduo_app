import React from 'react'
import '../styles/categorycard.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className + " button-arrow me-4"}
            style={{ background: "rgb(157, 148, 147)", height: "70px", width: "40px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className + " button-arrow ms-4"}
            style={{ background: "rgb(157, 148, 147)", height: "70px", width: "40px" }}
            onClick={onClick}
        >
        </button>
    );
}

function CategoryCard({ categories }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="container">
            <h2>Tìm bạn đồng hành</h2>
            <div className="row flex-row" style={{ display: "flex" }}>
                <Slider {...settings}>
                    {categories.map((item, index) => {
                        return (
                            <div key={index} className="col-sm-2">
                                <div className="card card-category-small">
                                    <img src={"https://localhost:7207" + item.imageUrl} className="card-img-top" alt="..." style={{ width: "189px" }} />
                                    <div className="card-body" style={{ height: "70px" }}>
                                        <p className="card-text text-center" >{item.categoryName}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div >
    )
}

export default CategoryCard