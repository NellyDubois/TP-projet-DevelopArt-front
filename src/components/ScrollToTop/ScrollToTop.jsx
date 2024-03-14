import { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import './ScrollToTop.scss';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : 'hidden'}`} onClick={scrollToTop}>
      <div className="circle">
        <FaArrowCircleUp />
      </div>
    </div>
  );
}

export default ScrollToTop;