import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

import { navLinks } from '../../constants/index.js'

const Navbar = () => {
 useGSAP(() => {
	const navTween = gsap.timeline({
	 scrollTrigger: {
		trigger: '#hero',
		start: 'top 98%',
		end: 'top 80%',
		scrub: true
	 }
	});
	
	navTween.fromTo('nav', { backgroundColor: 'transparent', backdropFilter: 'blur(0px)' }, {
	 backgroundColor: 'rgba(0,0,0,0.5)',
	 backdropFilter: 'blur(12px)',
	 WebkitBackdropFilter: 'blur(12px)',
	 duration: 0.4,
	 ease: 'power1.inOut'
	});
 })
 
 return (
	<nav>
	 <div>
		<a href="#hero" className="flex items-center gap-2 min-h-[44px]">
		 <img src="/images/logo.png" alt="" width="32" height="32" />
		 <p>Mojito Mami</p>
		</a>
		
		<ul>
		 {navLinks.map((link) => (
			<li key={link.id}>
			<a href={`#${link.id}`} className="py-2 px-3 min-h-[44px] flex items-center rounded-lg hover:text-yellow hover:bg-white/5 transition-colors">{link.title}</a>
			</li>
		 ))}
		</ul>
	 </div>
	</nav>
 )
}
export default Navbar