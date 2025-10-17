import React from 'react'
import './Home.css'
import Navbar from '../../comp/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../comp/TitleCards/TitleCards'
import Footer from '../../comp/Footer/Footer'


const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="hero-img" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt='hero-title' className='caption-img' />
          <p>Discovering his ties to a secret ancient order , a young
            man licing in modern Istanbul embarks on a quest to save the
            city from a sinister force.
          </p>
          <div className="hero-buttons">
            <button className='btn'>
              <img src={play_icon} alt='play-icon' className='play-icon' />
              Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt='info-icon' className='info-icon' />
              More Info
            </button>
          </div>
          <TitleCards />
        </div>
        
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only On Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks For You"} category={"now_playing"}/>
      </div>
      <Footer />
    </div>
  )
}

export default Home
