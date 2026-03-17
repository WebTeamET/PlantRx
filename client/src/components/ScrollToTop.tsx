import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hide the scroll-to-top button on the assistant page or when not scrolled
  if (!isVisible || location === '/assistant') {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed left-6 bottom-6 w-14 h-14 rounded-full bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-[99999999]"
      size="sm"
      data-testid="scroll-to-top-button"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </Button>
  );
}

export default ScrollToTopButton;