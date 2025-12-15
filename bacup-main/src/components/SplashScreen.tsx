import kaisanLogo from "@/assets/kaisan-logo.png";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="relative flex flex-col items-center">
        <img src={kaisanLogo} alt="Kaisan Associates" className="h-16 md:h-20 object-contain mb-5 animate-fade-in" />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-red-600 via-rose-500 to-red-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            INFLUENCIA
          </span>
        </h1>
        <p className="mt-1 text-xs md:text-sm text-gray-500 uppercase tracking-wider">Edition 2.0 • 2025</p>

        {/* progress bar */}
        <div className="mt-6 h-2 w-56 md:w-72 bg-gray-200/70 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-red-600 to-rose-500 animate-[shimmer_1.4s_infinite]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(300%);} }
        @keyframes gradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .animate-fade-in { animation: fade-in .6s ease forwards; opacity: 0; }
        @keyframes fade-in { to { opacity: 1; } }
      `}} />
    </div>
  );
};

export default SplashScreen;
