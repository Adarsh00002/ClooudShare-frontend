import { ArrowUpCircle, Clock, CreditCard, FileText, Share2 } from "lucide-react";

const FeaturesSection = ({ feature }) => {

  const renderIcon = (iconName, iconColor) => {
    const iconProps = { size: 25, className: iconColor };

    switch (iconName) {
      case 'ArrowUpCircle':
        return <ArrowUpCircle {...iconProps} />;
      case 'Shield':
        return <ArrowUpCircle {...iconProps} />;
      case 'Share2':
        return <Share2 {...iconProps} />;
      case 'CreditCard':
        return <CreditCard {...iconProps} />;
      case 'FileText':
        return <FileText {...iconProps} />;
      case 'Clock':
        return <Clock {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need for the file sharing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500">
            CloudShare provides all the tools you need to manage your digital content
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {feature.map((item, index) => (
              
              <div
                key={index}
                className="group relative rounded-xl bg-white border border-gray-100 shadow-sm 
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
              >
                
                {/* Gradient Hover Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 to-pink-400/0 
                group-hover:from-purple-400/10 group-hover:to-pink-400/10 transition-all duration-300"></div>

                <div className="relative px-6 py-8">

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center p-3 bg-white rounded-lg shadow-md 
                  group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    
                    {renderIcon(item.iconName, item.iconColor)}
                  
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-semibold text-gray-900 tracking-tight 
                  group-hover:text-purple-600 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-base text-gray-500">
                    {item.description}
                  </p>

                </div>
              </div>

            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;