import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050505] text-white py-12 md:py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16 lg:gap-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[300px]">
            <div className="mt-16 lg:mt-auto">
              <h2 className="text-[36px] md:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
                Powerful and reliable.<br />
                <span className="text-stone-400">Full lab automation</span><br />
                <span className="text-stone-400">you can afford.</span>
              </h2>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col min-h-[300px]">
          </div>

          <div className="lg:col-span-4 flex flex-col min-h-[300px]">
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-full">
              <div>
                <form className="flex bg-[#1a1a1a] rounded-xl p-1.5 border border-white/5" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Your work email" className="bg-transparent text-white px-5 py-3 w-full outline-none text-[14px] placeholder:text-stone-500" />
                  <button type="submit" className="bg-[#5ff2d9] text-black w-12 h-12 rounded-lg flex items-center justify-center shrink-0 hover:bg-[#4de0c7] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </form>
                <p className="text-[11px] text-stone-500 mt-5 leading-relaxed pr-8">
                  By providing this information, you agree to be kept informed about Life OS products and services.
                </p>
              </div>
              
              <div className="mt-16 grow flex items-end">
                <h3 className="text-[20px] md:text-[22px] text-stone-300 leading-snug font-medium pr-8">
                  Get the latest research insights, product updates, and application tips.
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <a href="https://www.linkedin.com/in/khandelwalyatharth/" className="bg-[#0f0f0f] border border-white/5 hover:bg-[#1a1a1a] w-12 h-12 rounded-xl flex items-center justify-center text-stone-400 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com/Heyykrishnna/WAP-PROJECT" className="bg-[#0f0f0f] border border-white/5 hover:bg-[#1a1a1a] w-12 h-12 rounded-xl flex items-center justify-center text-stone-400 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="bg-[#0f0f0f] border border-white/5 hover:bg-[#1a1a1a] px-5 h-12 rounded-xl flex items-center justify-center text-[12px] text-stone-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="bg-[#0f0f0f] border border-white/5 hover:bg-[#1a1a1a] px-5 h-12 rounded-xl flex items-center justify-center text-[12px] text-stone-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 px-6 h-12 rounded-xl flex items-center text-[12px] text-stone-500 xl:flex-1 w-full xl:max-w-xl xl:mx-auto">
            © 2026 Life OS. All Rights Reserved.
          </div>

          <div className="flex items-center text-[12px] text-stone-500 h-12 xl:px-2">
            Made by Yatharth
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
