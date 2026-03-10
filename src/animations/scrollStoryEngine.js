import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollStory() {
    // Refresh ScrollTrigger after all content loads
    ScrollTrigger.refresh()
}

export function createSectionTrigger(triggerEl, animation, options = {}) {
    return ScrollTrigger.create({
        trigger: triggerEl,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        onEnter: animation,
        once: options.once !== false,
        ...options
    })
}

export function animateCounter(element, target, duration = 2) {
    const obj = { value: 0 }
    return gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
            if (element) element.textContent = Math.round(obj.value)
        }
    })
}

export { gsap, ScrollTrigger }
