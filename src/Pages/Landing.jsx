import { useClerk, useUser } from "@clerk/clerk-react";
import { features, pricingPlans, testimonials } from "../assets/data";
import CTASection from "../Components/landing/CTASection";
import FeaturesSection from "../Components/landing/FeaturesSection";
import FooterSection from "../Components/landing/FooterSection";
import HeroSection from "../Components/landing/HeroSection";
import PricingSection from "../Components/landing/PricingSection";
import TestimonialsSection from "../Components/landing/TestimonialsSection";
import Testimonials from "../Components/landing/TestimonialsSection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Landing=()=>{
    const {openSignIn,openSignUp}=useClerk();
    const {isSignedIn}=useUser();
    const navigate=useNavigate();

    useEffect(()=>{
        if(isSignedIn){
            navigate("/dashboard");
        }

    },[isSignedIn,navigate]);
    return(
            <div className="landing-page bg-gradient-to-b from-gray-50 to-gray-100">
               

                {/*HeoSection */}
                <HeroSection openSignIn={openSignIn} openSignUp={openSignUp} />

                {/* Features Section  */}
                    <FeaturesSection feature={features}/>

                {/* Pricing section  */}
            
                 <PricingSection  pricingPlans={pricingPlans} openSignUp={openSignUp} />

                {/* Testimonials sections  */}
                    <TestimonialsSection  testimonial={testimonials}/>

                {/* CTA Section  */}
                <CTASection  openSignUp={openSignUp}/>

                {/*  Footer section */}
                    <FooterSection />

                
            </div>

    )
}
export default Landing;
