import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRef } from 'react';
import useMovableElements from './useMovableElements';

export default function ScrollParallaxTop({
  children, src, alt, width, height, priority, loader, quality,
}) {
  const elementRef = useRef(null);

  const parralax = useMovableElements(elementRef);
  return (
    <div ref={elementRef} className="relative h-30">
      <Image
        src={src}
        alt={alt}
        loader={loader}
        quality={quality}
        // width={width}
        // height={height}
        style={parralax.style}
        priority={priority}
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        fill
      />
      {children}
    </div>
  );
}

ScrollParallaxTop.propTypes = {
  children: PropTypes.node.isRequired,
};
