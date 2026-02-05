import React from 'react';
import { ShoppingCart, ArrowUpRight, Send } from 'lucide-react';

export interface BentoBoxProps {
  className?: string;
}

export const BentoBox: React.FC<BentoBoxProps> = ({ className = '' }) => {
  return (
    <div className={`min-h-screen w-full bg-[#F3F4F6] p-4 md:p-8 font-sans flex items-center justify-center relative overflow-hidden ${className}`}>
      {/* Global Foundation: Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Container / Dashboard */}
      <div className="relative z-10 w-full max-w-[1200px] bg-white/40 backdrop-blur-sm rounded-[48px] p-6 md:p-10 shadow-sm border border-white/60 flex flex-col gap-8">
        
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between pl-2 pr-2">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer">
              <div className="w-4 h-4 rounded-full border-[3px] border-white"></div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-600">
              {['Products', 'App', 'About', 'FAQ'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="hover:text-black transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 text-[13px] font-bold text-gray-900 hover:bg-black/5 rounded-full transition-colors tracking-wide uppercase">
              Log in
            </button>
            <button className="px-7 py-2.5 text-[13px] font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg tracking-wide uppercase">
              Sign up
            </button>
          </div>
        </nav>

        {/* Main Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-auto lg:h-[600px]">
          
          {/* Card A (Left - Dark Hero) */}
          <div className="w-full h-full min-h-[500px] lg:min-h-0 relative group rounded-[32px] overflow-hidden bg-black p-8 md:p-10 flex flex-col justify-between transition-transform hover:scale-[1.005] duration-500">
            
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80" 
                 alt="Earbuds Background" 
                 className="w-full h-full object-cover object-center opacity-100"
               />
               {/* Gradient Overlay for text readability */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-20">
              <span className="inline-block mb-6 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                More offers
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium text-white leading-[1.05] tracking-tight max-w-sm drop-shadow-md">
                There is something else for you
              </h2>
            </div>

            {/* Floating Action Button */}
            <div className="relative z-20 mt-auto">
              <button className="flex items-center gap-5 pl-5 pr-5 py-3 bg-[#E5E5E5] hover:bg-white text-black rounded-2xl transition-all w-fit shadow-lg group/btn">
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Shop</span>
                  <span className="text-[16px] font-bold">All products</span>
                </div>
                <div className="h-8 w-[1px] bg-gray-300 mx-1"></div>
                <ShoppingCart size={20} strokeWidth={2} className="text-black group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 h-full">
            
            {/* Card B (Top Right - Grey Blog) */}
            <div className="flex-1 min-h-[240px] rounded-[32px] bg-[#E6E6E6] p-8 relative overflow-hidden group hover:bg-[#e2e2e2] transition-colors">
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  World of hearing technology
                </span>
                <ArrowUpRight className="text-gray-400 group-hover:text-black transition-colors" size={24} />
              </div>

              {/* Abstract Image */}
              <div className="absolute inset-0 z-0">
                 <img 
                   src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80" 
                   alt="Spheres Art" 
                   className="w-full h-full object-cover object-center opacity-80 mix-blend-multiply filter contrast-110" 
                 />
              </div>

              <div className="absolute bottom-8 left-8 z-10">
                <h3 className="text-3xl font-medium text-gray-800 tracking-tight">View our blog</h3>
              </div>
            </div>

            {/* Bottom Row (Split) */}
            <div className="h-[260px] grid grid-cols-2 gap-5">
              
              {/* Card C (Purple) */}
              <div className="rounded-[32px] bg-[#C084FC] p-6 relative flex flex-col justify-between overflow-hidden group hover:brightness-105 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest leading-relaxed w-2/3">
                    Discover <br/> our history
                  </span>
                  <ArrowUpRight className="text-white/70 group-hover:text-white transition-colors" size={20} />
                </div>
                
                <h3 className="text-2xl font-medium text-white tracking-tight">About us</h3>
                
                {/* Decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              {/* Card D (Lime Green) */}
              <div className="rounded-[32px] bg-[#D9F99D] p-6 relative flex flex-col justify-between overflow-hidden group hover:brightness-105 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest leading-relaxed w-2/3">
                    Have some <br/> questions?
                  </span>
                  <Send className="text-black/40 group-hover:text-black transition-colors" size={18} />
                </div>
                
                <h3 className="text-2xl font-medium text-black tracking-tight">Contact us</h3>

                 {/* Decorative element */}
                 <div className="absolute top-1/2 right-4 w-12 h-12 bg-white/20 rounded-full blur-xl group-hover:translate-x-2 transition-transform"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BentoBox;
