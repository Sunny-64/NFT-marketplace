import React, { useState } from 'react'
import CommonSilder from './CommonSilder';

const Sildersixth = () => {

    const [currentSlide, setCurrentSlide] = useState<any>(0);

    const images = [
        "image1.avif",
        "image2.avif",
        "image3.avif",
        "image4.avif",
        "image5.avif",
        "image7.avif",
        "image8.avif",
        "image9.avif",
        "image10.avif",
        "image11.avif",
    ];
    const captions = [
        "Geometric Gems",
        "Computer Science (Death of) by BASIIC",
        "Auf Reisen 2023 Holders Collection",
        "Unsupervised — Data Universe — MoMA by Refik Anadol",
        "INS1D3RS",
        "bRAinZbRidGe",
        "Josh Pierce - Editions",
        "Cypher Genesis Collection",
        "MetaPlaces Luxury Properties",
        "BurnassoPhotography",
        "MintFace Roads or Rivers",
        "The Land of the Dead by DR",
    ];

    const chunkSize = 5;
    return (
        <div>
            <div className='my-10 px-[36px]'>
                <div className='flex justify-between'>
                    <h1 className='my-6 font-[600] text-[30px]'>Trending in Music</h1>
                    <div>
                        <button className="!bg-[#1212120a] !text-black !py-[10px] !px-[24px] !font-[600]  !text-[16px] border-none rounded-md ">
                            View Category
                        </button>
                    </div>
                </div>
                <div className="carousel-container">
                    <CommonSilder images={images} captions={captions} chunkSize={chunkSize} currentSlide={currentSlide} setCurrentSlide=
                        {setCurrentSlide} />
                </div>
            </div>
        </div>
    )
}

export default Sildersixth