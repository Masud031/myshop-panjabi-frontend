export default function SimpleFooter() {
  return (
    <footer className="bg-black text-white max-h-20">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: small brand or text */}
        <div className="text-sm">© {new Date().getFullYear()} Your Company</div>

        {/* Right: social icons */}
        <div className="flex items-center gap-4">

          {/* Facebook */}
          <a
            href="https://www.facebook.com/"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-1 hover:opacity-80 transition-opacity"
          >
            <img
              src="/Facebook_f.svg"
              alt="Facebook"
              className="h-6 w-6"
            />
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-1 hover:opacity-80 transition-opacity"
          >
            <img
              src="/YouTube_L.svg"
              alt="YouTube"
              className="h-6 w-6"
            />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-1 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logos--whatsapp-icon.svg"
              alt="WhatsApp"
              className="h-6 w-6"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-1 hover:opacity-80 transition-opacity"
          >
            <img
              src="/Instagram_l.svg"
              alt="Instagram"
              className="h-6 w-6"
            />
          </a>

          {/* Pinterest */}
          <a
            href="https://www.pinterest.com/"
            aria-label="Pinterest"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-1 hover:opacity-80 transition-opacity"
          >
            <img
              src="/Pinterest-l.png"
              alt="Pinterest"
              className="h-6 w-6"
            />
          </a>

        </div>
      </div>
    </footer>
  );
}
