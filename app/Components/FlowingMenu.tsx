import React from 'react';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults }) as TimelineMax;
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }).to(marqueeInnerRef.current, {
      y: edge === 'top' ? '101%' : '-101%'
    });
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 2 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <div className="flex items-center justify-between w-full pl-5 md:pl-20 pr-10">
          <span className="text-black uppercase font-[cursive] text-[2vh] leading-[1]">{text}</span>

          <div className="flex items-center gap-4">
            <div className="text-black font-mono text-sm uppercase tracking-widest hidden md:block">
              <Typewriter
                options={{
                  strings: ["Discover", "Explore", "Visit"],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}
              />
            </div>

            <div
              className="w-[120px] h-[5vh] rounded-[30px] bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>

        </div>
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div className="flex-1 relative overflow-hidden text-left shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
      <a
        className="flex items-center justify-start pl-5 md:pl-20 h-full relative cursor-pointer uppercase no-underline font-semibold text-gray-600 text-[2vh] hover:text-black focus:text-white focus-visible:text-black font-[cursive]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
