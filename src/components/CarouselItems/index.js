import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

class CarouselItems extends Component {
  state = {carouselList: [], isLoading: false}

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.offers.map(item => ({
      id: item.id,
      imageUrl: item.image_url,
    }))
    this.setState({carouselList: updatedData, isLoading: false})
  }

  renderCarouselImages = () => {
    const {carouselList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }
    return (
      <ul className="carousel-container">
        <Slider {...settings}>
          {carouselList.map(eachImage => (
            <li key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="offer"
                className="carousel-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-offers-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderLoader() : this.renderCarouselImages()}</div>
    )
  }
}
export default CarouselItems
