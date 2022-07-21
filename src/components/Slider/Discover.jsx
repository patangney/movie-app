import React, {useEffect, useState} from 'react'
import Slider from 'react-slick'
import { BACKDROP } from '../../api/index'
import { Discover_URL } from '../../api/index'

// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Discover = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const URL = Discover_URL
    fetch(URL)
      .then(response => response.json())
      .then(json => {       
        const data = json.results        
        setMovies(data)       
        console.log(data, 'data')
        
        // setLoading(false);
      })
      .catch(error => {
        console.log(error, 'error')
      })
  }, [])
  
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <div className='slider'>
      <Slider {...settings}>
         {movies.map(movie => (
          <div className='slider__wrapper' key={movie.id}>
            <div className='slider__item' >
              <img
                className='slider__img'
                src={`${BACKDROP}${movie.backdrop_path}`}
                alt={movie.original_title}
              />
              <div className='slider__content'>
                <h3 className='slider__title'>{movie.original_title}</h3>
                
                </div>
            </div>
          </div>
        ))} 
        {/* <div className='slider__wrapper'>
          <img src='/assets/images/slider-badag.jpg' alt='slider' />
        </div> */}
      </Slider>
    </div>
  )
}

export default Discover
