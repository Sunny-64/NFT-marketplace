
import { Carousel } from 'react-responsive-carousel';

interface IState {
  images: any[];
  setCurrentSlide: any;
  captions: any[];
  chunkSize: number;
  currentSlide: number;
}

const CommonSlider = (props: IState) => {
  const { images, setCurrentSlide, captions, chunkSize, currentSlide } = props;

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
  };

  return (
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
        className="W-[50%]"
      >
        {imageChunks.map((chunk, index) => (
          <div key={index} className="carousel-slide ">
            {chunk.map((image, imageIndex) => (
              <div key={imageIndex} className="shadow-md rounded-xl border">
                <img
                  src={image}
                  alt={`Image ${index * chunkSize + imageIndex}`}
                  className="rounded-t-xl w-[50%]"
                />
                <div className="p-[16px]">
                  <p className="overflow-hidden font-bold text-[16px] text-left">
                    {truncateCaption(captionChunks[index][imageIndex])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CommonSlider;
