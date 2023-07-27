import {  useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Header from './Header';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("image1.avif");
  const [currentButton, setCurrentButton] = useState('All');

  const images = [
    "image1.avif",
    "image2.avif",
    "image3.avif",
    "image4.avif",
    "image5.avif",
    "image6.avif",
    "image7.avif",
    "image8.avif",
    "image9.avif",
    "image10.avif",
    "image11.avif",
    "image12.avif",
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
  const backgroundImages = [
    "image1.avif",
    "image4.avif",
    "image8.avif",
  ];
  const chunkSize = 4;

  const imageChunks = images.reduce<string[][]>((result, _, index) => {
    if (index % chunkSize === 0) {
      result.push(images.slice(index, index + chunkSize));
    }
    return result;
  }, []);

  const captionChunks = captions.reduce<string[][]>((result, _, index) => {
    if (index % chunkSize === 0) {
      result.push(captions.slice(index, index + chunkSize));
    }
    return result;
  }, []);

 

  const truncateCaption = (caption: string) => {
    const words = caption.split(' ');
    if (words.length <= 5) {
      return caption;
    }
    return words.slice(0, 5).join(' ') + '...';
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setBackgroundImage(backgroundImages[index]);
  };

  return (
    <>
    
    <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <Header />
        <div className="px-[32px] w-[100%]">
          <div className="grid grid-cols-12 py-[32px]">
            <div className="items-center flex">
            <ul className="flex list-none px-[8px] gap-[30px]">
  <li className={`w-fit-content py-[8px] px-[16px] rounded-[10px] hover:bg-gray-400 ${currentButton === 'All' ? 'bg-gray-400 text-white' : 'bg-transparent text-white'} cursor-pointer`} onClick={() => setCurrentButton('All')}>All</li>
  <li className={`w-fit-content py-[8px] px-[16px] rounded-[10px]   hover:bg-gray-400 ${currentButton === 'Art' ? 'bg-gray-400 text-white' : 'bg-transparent text-white'} cursor-pointer`} onClick={() => setCurrentButton('Art')}>Art</li>
  <li className={`w-fit-content py-[8px] px-[16px] rounded-[10px]  hover:bg-gray-400 ${currentButton === 'Gaming' ? 'bg-gray-400 text-white' : 'bg-transparent text-white'} cursor-pointer`} onClick={() => setCurrentButton('Gaming')}>Gaming</li>
  <li className={`w-fit-content py-[8px] px-[16px] rounded-[10px]  hover:bg-gray-400  ${currentButton === 'MemberShips' ? 'bg-gray-400 text-white' : 'bg-transparent text-white'} cursor-pointer`} onClick={() => setCurrentButton('MemberShips')}>MemberShips</li>
  <li className={`w-fit-content py-[8px] px-[16px] rounded-[10px]  hover:bg-gray-400 ${currentButton === 'PFPs' ? 'bg-gray-400 text-white' : 'bg-transparent text-white'} cursor-pointer`} onClick={() => setCurrentButton('PFPs')}>PFPs</li>
  <li className={`w-fit-content py-[8px] px-[16px] rounded-[10px]  hover:bg-gray-400 ${currentButton === 'Photography' ? 'bg-gray-400 text-white' : 'bg-transparent text-white'} cursor-pointer`} onClick={() => setCurrentButton('Photography')}>Photography</li>
  <li className={`w-fit-content py-[8px] px-[16px] rounded-[10px]  hover:bg-gray-400 ${currentButton === 'Music' ? 'bg-gray-400 text-white' : 'bg-transparent text-white'} cursor-pointer`} onClick={() => setCurrentButton('Music')}>Music</li>
</ul>

            </div>
          </div>
          <div className="carousel-container">
            <Carousel
              showThumbs={false}
              showArrows={true}
              showStatus={false}
              emulateTouch
              swipeable={true}
              infiniteLoop={true}
              renderThumbs={(): any => null}
              selectedItem={currentSlide}
              onChange={handleSlideChange}
            >
              {imageChunks.map((chunk, index) => (
                <div key={index} className="carousel-slide">
                  {chunk.map((image, imageIndex) => (
                    <div key={imageIndex}>
                      <img src={image} alt={`Image ${index * chunkSize + imageIndex}`} className='rounded-[10px] border' />
                      <div className='absolute top-[80%] gap-[2px] bottom-[0px] pb-[12px] z-[1] pl-[16px]'>
                        <p className="text-white overflow-hidden font-bold text-[16px]">{truncateCaption(captionChunks[index][imageIndex])}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Carousel>
            
          </div>
        </div>
      
    </>
  );
};

export default Slider;
