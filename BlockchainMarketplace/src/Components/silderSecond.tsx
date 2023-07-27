import React, { useState } from 'react'
import CommonSilder from './CommonSilder'

const SilderSecond = () => {
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
            <h1 className='my-6 font-[600] text-[30px]'>Top Collector Buys Today</h1>
            <div className="carousel-container">
                
                <CommonSilder images={images} captions={captions}    chunkSize={chunkSize}  currentSlide={currentSlide} setCurrentSlide=
                {setCurrentSlide} />
            </div>

        </div>
    </div>
  )
}

export default SilderSecond
