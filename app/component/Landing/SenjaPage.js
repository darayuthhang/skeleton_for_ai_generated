import { useEffect, useState } from 'react';
import Script from "next/script";

export default function SenjaPage() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    // Cleanup function to remove any lingering scripts
    return () => {
      const scripts = document.querySelectorAll('script[src*="senja.io"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  const handleWidgetLoad = () => {
    setIsWidgetLoaded(true);
    
    // Optional: Additional initialization if needed
    if (window.Senja) {
      try {
        window.Senja.init?.();
      } catch (error) {
        console.warn('Senja widget initialization failed:', error);
      }
    }
  };

  return (
    <main>
      <Script 
        id="senja-widget-script"
        src="https://widget.senja.io/widget/5cdeb7a8-668e-49e4-b731-5d85e81de03c/platform.js"
        strategy="lazyOnload"
        onLoad={handleWidgetLoad}
        onReady={handleWidgetLoad}
      />

      {isWidgetLoaded && (
        <div 
          className="senja-embed" 
          data-id="5cdeb7a8-668e-49e4-b731-5d85e81de03c" 
          data-mode="shadow" 
          data-lazyload="false"
        />
      )}
    </main>
  );
}