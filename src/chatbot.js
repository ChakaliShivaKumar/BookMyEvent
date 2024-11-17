import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    // script.setAttribute('chatbotId', '0XGVtjHZT4GAOOfkqBMPa');
    script.setAttribute('chatbotId', 'M2b1j7PZSNAeP-86AF2dI');
    script.setAttribute('domain', 'www.chatbase.co');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <script>
        {`
          window.embeddedChatbotConfig = {
            chatbotId="M2b1j7PZSNAeP-86AF2dI",
            domain: "www.chatbase.co"
          };
        `}
      </script>
    </div>
  );
};

export default Chatbot;
