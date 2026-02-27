import { useEffect } from 'react';

/**
 * useScrollAnimation
 *
 * Drop-in hook. Call once at the top of any page component.
 * Automatically finds every element with an animation class and
 * adds "visible" when it enters the viewport.
 *
 * USAGE:
 *   const MyPage = () => {
 *     useScrollAnimation();
 *     return <div className="fade-up">Hello</div>;
 *   };
 *
 * ANIMATION CLASSES: fade-up | slide-left | slide-right | fade-in | scale-up
 * STAGGER CLASSES:   stagger-1 | stagger-2 | stagger-3 | stagger-4 | stagger-5 | stagger-6
 *
 * WHY THE OLD HOOK WAS BROKEN:
 * The old hook required manually creating refs for every section and
 * calling registerElement(ref) inside useEffect. This was fragile —
 * elements with animation classes that weren't inside a registered ref
 * never got observed at all. The new approach observes ALL animated
 * elements on the page automatically, no refs needed.
 */
const SELECTORS = '.fade-up, .slide-left, .slide-right, .fade-in, .scale-up';

const useScrollAnimation = () => {
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(SELECTORS).forEach(el => el.classList.add('visible'));
      return;
    }

    const elements = document.querySelectorAll(SELECTORS);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // only trigger once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -48px 0px', // triggers slightly before bottom edge
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default useScrollAnimation;
