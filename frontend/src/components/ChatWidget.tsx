import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Tawk.to script injection ONLY
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/68b7fccf46ae591926246f85/1j47b72qo";
    script.charset = "UTF-8";
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    // Prevent the widget from changing document.title (e.g., "(1) New message")
    const originalTitle = document.title;
    const titleEl = document.querySelector('title') || (() => {
      const t = document.createElement('title');
      document.head.appendChild(t);
      return t;
    })();

    const revertIfTawk = (newTitle: string) => {
      // Tawk typically adds counts or 'New message' text; detect common patterns
      const tawkPattern = /(new message|new messages|\(\d+\)|\d+ new message|unread message)/i;
      if (tawkPattern.test(newTitle) && document.title !== originalTitle) {
        document.title = originalTitle;
      }
    };

    const observer = new MutationObserver(() => {
      try {
        revertIfTawk(document.title);
      } catch (e) {
        console.error('Error setting meta description:', e);
      }
    });

    observer.observe(titleEl, { childList: true });

    // Also listen for focus/visibility changes to restore title
    const onVisibility = () => {
      if (document.title !== originalTitle) document.title = originalTitle;
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onVisibility);

    return () => {
      // cleanup
      try { document.body.removeChild(script); } catch (e) { console.error('Error removing Tawk.to script:', e); }
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onVisibility);
    };
  }, []);

  return null;
};

export default ChatWidget;
