import { assets } from "../../assets/assets";

const HeroSection = ({ openSignIn, openSignUp }) => {
  return (
    <div className="landing-page-content relative">
      
      {/* Background */}
      <div className="absolute inset-0 bg-fuchsia-100 opacity-80 z-0 pointer-events-none"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Hero Content */}
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
          <div className="text-center">
            
            {/* Heading */}
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Share File Securely With</span>
              <span className="block text-purple-500">CloudShare</span>
            </h1>

            {/* Subtext */}
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Upload, Manage, and Share your files securely. Accessible anywhere anytime
            </p>

            {/* Buttons (FIXED) */}
            <div className="mt-10">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                
                <button
                  onClick={() => openSignUp()}
                  className="w-full flex items-center justify-center px-4 py-3 text-sm sm:text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>

                <button
                  onClick={() => openSignIn()}
                  className="w-full flex items-center justify-center px-4 py-3 text-sm sm:text-base font-medium rounded-md text-black bg-white hover:bg-sky-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign in
                </button>

              </div>
            </div>

          </div>
        </div>

        {/* Dashboard Image */}
        <div className="relative">
          <div className="aspect-w-16 rounded-lg shadow-xl overflow-hidden">
            <img
              src={assets.dashbord}
              alt="cloudshare dashboard"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-10 rounded-lg"></div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="mt-4 text-base text-gray-500">
            All your files are encrypted and stored securely with enterprise-grade security protocols.
          </p>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;