export const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut"
      }
    }
  });
  
  export const slideUp = (delay = 0) => ({
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
        ease: "easeOut"
      }
    }
  });
  
  export const slideIn = (direction, delay = 0) => {
    return {
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
        opacity: 0
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.8,
          delay,
          ease: "easeOut"
        }
      }
    };
  };
  
  export const staggerContainer = (staggerChildren, delayChildren = 0) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  });
  
  export const scaleIn = (delay = 0) => ({
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    }
  });
  
  export const textVariant = (delay = 0) => ({
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay
      }
    }
  });
  
  export const INITIAL_LOAD_DELAY = 0.25;