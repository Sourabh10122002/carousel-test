import React, { useState, useRef } from 'react';
import './Carousel.css';

const Carousel = () => {
    const [imageArray, setimageArray] = useState([]);
    const carouselRef = useRef();
    const countRef = useRef(0);

    const fileUpload = (files) => {
        const imagePath = URL.createObjectURL(Object.values(files)[0]);
        setimageArray([...imageArray, imagePath])
    }

    const leftHandler = () => {
        const previousCount = countRef.current - 1;
        if (countRef.current !== 0) {
            carouselRef.current.children[previousCount].scrollIntoView({ behavior: 'smooth' });
            countRef.current = previousCount;
        }
    }

    const rightHandler = () => {
        const nextCount = countRef.current + 1;
        if (imageArray.length > nextCount) {
            carouselRef.current.children[nextCount].scrollIntoView({ behavior: 'smooth' });
        }
        countRef.current = nextCount;
    }

    return (
        <div className='carousel-container'>
            <input type="file" className='input-child' onChange={(e) => { fileUpload(e.target.files) }} />
            <div className="carousel-image-container">
                <button className='left-btn' onClick={leftHandler}>Left</button>
                <div className="imagecontainer" ref={carouselRef}>
                    {
                        imageArray.map((item, idx) => (
                            <img src={item} alt={`image-carousel-${idx}`} key={idx} />
                        ))
                    }
                </div>
                <button className='right-btn' onClick={rightHandler}>Right</button>
            </div>
        </div>
    );
}

export default Carousel