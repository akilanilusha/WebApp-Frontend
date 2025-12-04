import whatsappIcon from '../assets/whatsapp.png';

export default function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/${import.meta.env.VITE_WHTAPPNUMBER}?text=Hello%20how%20can%20you%20help%20me%3Fhttps://srilanka.travel/%20and%20I%20need%20support.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-all"
    >
      <img
        src={whatsappIcon}
        alt="whatsapp"
        className=""
      />
    </a>
  );
}
