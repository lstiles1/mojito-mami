'use client';

import { allCocktails } from '../../constants/index.js';
import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SWIPE_THRESHOLD = 50;

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const goToSlide = useCallback((index) => {
    const newIndex = (index + allCocktails.length) % allCocktails.length;
    setCurrentIndex(newIndex);
  }, []);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
      if (deltaX > 0) goToSlide(currentIndex - 1);
      else goToSlide(currentIndex + 1);
    },
    [currentIndex, goToSlide]
  );

  useGSAP(() => {
	gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
	gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, {
	 xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
	})
	gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
	 yPercent: 0, opacity: 100, ease: 'power1.inOut'
	})
	gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
	 yPercent: 0, opacity: 100, ease: 'power1.inOut'
	})
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;
  const getCocktailAt = (indexOffset) =>
    allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails];

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
	<section id="menu" aria-labelledby="menu-heading">
	 <img src="/images/slider-left-leaf.png" alt="" id="m-left-leaf" loading="lazy" decoding="async" />
	 <img src="/images/slider-right-leaf.png" alt="" id="m-right-leaf" loading="lazy" decoding="async" />
	 
	 <h2 id="menu-heading" className="sr-only">
		Cocktail Menu
	 </h2>
	 
	 <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
		{allCocktails.map((cocktail, index) => {
		 const isActive = index === currentIndex;
		 
		 return (
			<button key={cocktail.id} className={`
				${isActive
				 ? 'text-white border-white'
				 : 'text-white/50 border-white/50'}
			 `}	onClick={() => goToSlide(index)}
			>
			 {cocktail.name}
			</button>
		 )
		})}
	 </nav>
	 
	 <div
		className="content touch-pan-y"
		onTouchStart={handleTouchStart}
		onTouchEnd={handleTouchEnd}
		role="region"
		aria-label="Cocktail carousel - swipe or use arrows to navigate"
	 >
		<div className="arrows">
		 <button
			type="button"
			className="text-left min-h-[44px] min-w-[44px] flex items-center gap-2 hover:opacity-80 transition-opacity"
			onClick={() => goToSlide(currentIndex - 1)}
			aria-label={`Previous: ${prevCocktail.name}`}
		 >
			<span>{prevCocktail.name}</span>
			<img src="/images/right-arrow.png" alt="" aria-hidden="true" width="24" height="24" />
		 </button>
		 
		 <button
			type="button"
			className="text-left min-h-[44px] min-w-[44px] flex items-center gap-2 hover:opacity-80 transition-opacity"
			onClick={() => goToSlide(currentIndex + 1)}
			aria-label={`Next: ${nextCocktail.name}`}
		 >
			<img src="/images/left-arrow.png" alt="" aria-hidden="true" width="24" height="24" />
			<span>{nextCocktail.name}</span>
		 </button>
		</div>
		
		<div className="cocktail">
		 <img src={currentCocktail.image} alt={currentCocktail.name} className="object-contain" loading="lazy" decoding="async" />
		</div>
		
		<div className="recipe">
		 <div ref={contentRef} className="info">
			<p>Recipe for:</p>
			<p id="title">{currentCocktail.name}</p>
		 </div>
		 
		 <div className="details">
			<h2>{currentCocktail.title}</h2>
			<p>{currentCocktail.description}</p>
		 </div>
		</div>
	 </div>
	</section>
 )
}
export default Menu