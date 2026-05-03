
import { useEffect, useRef, useState } from 'react';
import featuresConfig from './featuresConfig';

export const useMainPageFeatures = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = rect.height;
            const scrollOffset = -rect.top; // How much is scrolled past the top of the container

            if (scrollOffset < 0) {
                setActiveIndex(0);
                return;
            }

            const scrollRange = containerHeight - window.innerHeight;
            const progress = scrollOffset / scrollRange;
            const rawIndex = Math.floor(progress * featuresConfig.length);
            const index = Math.min(featuresConfig.length - 1, Math.max(0, rawIndex));

            setActiveIndex(index);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { containerRef, activeIndex };
};
