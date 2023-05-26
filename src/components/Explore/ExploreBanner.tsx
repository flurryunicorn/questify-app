import { Carousel } from 'react-responsive-carousel'
import { EXPLORE_BANNER_SLIDES } from '../../data'
import BannerSlide, { SliderType } from './BannerSlide'

const ExploreBanner = () => {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
        >
            {EXPLORE_BANNER_SLIDES.map((slider: SliderType, index: number) => (
                <BannerSlide
                    {...slider}
                    key={index}
                    index={index}
                    type={'game'}
                />
            ))}
        </Carousel>
    )
}

export default ExploreBanner