// src/components/ContactFloating.jsx

const ContactFloating = () => {
  const whatsappNumber = "8801911411903"; 
  const messengerUsername = "BDhabibi";

  const waHref = `https://wa.me/${whatsappNumber}`;
  const messengerHref = `https://m.me/${messengerUsername}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">

      {/* Messenger */}
      <a
        href={messengerHref}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-110 transition"
      >
        <img
          src="/logos--messenger.svg"
          className="w-6 h-6"
          alt="Messenger"
        />
      </a>

      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-110 transition"
      >
        <img
          src="/logos--whatsapp-icon.svg"
          className="w-6 h-6"
          alt="WhatsApp"
        />
      </a>

    </div>
  );
};

export default ContactFloating;
