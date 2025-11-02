import { Link } from "react-router-dom";
import img from "/Discourses_-_Epictetus_illustration_1_9021700938.jpg";

const Wisdom = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl mb-2 shadow-2xl overflow-hidden  ">
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt="Epictetus Illustration"
          className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-700"
        />
        <div
          className="absolute inset-0 
        bg-linear-to-t from-black/30 to-transparent"
        ></div>
        <div className="absolute bottom-4 left-4">
          <Link
            to="https://en.wikipedia.org/wiki/Epictetus"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm"
          >
            Stoic Wisdom
          </Link>
        </div>
      </div>
      <div className="p-3">
        <div className="mb-3">
          <p className="text-gray-700 text-xs leading-relaxed font-medium italic mb-4">
            Man is not worried by real problems so much as by his imagined
            anxieties about real problems. The more he learns to control his
            thoughts, the more peace he finds within himself.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wisdom;
