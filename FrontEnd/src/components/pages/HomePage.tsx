import { Sparkles, Shield, Clock, Users, ArrowRight } from 'lucide-react';
import type { Page } from '../../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  isDarkTheme?: boolean;
}

export function HomePage({ onNavigate, isDarkTheme }: HomePageProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900' : 'bg-gradient-to-br from-[#1A2A6C] via-[#2B3E8C] to-[#1A2A6C]'} text-white`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMlMwIDIyLjYyNyAwIDE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI-Powered Legal Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl mb-6">
              Expert Legal Advice,
              <br />
              <span className={isDarkTheme ? 'bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent' : 'bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'}>
                Instantly Available
              </span>
            </h1>
            
            <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDarkTheme ? 'text-purple-200' : 'text-blue-100'}`}>
              Connect with qualified lawyers or get instant answers from our AI legal assistant. Professional legal help whenever you need it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('browse')}
                className="group px-8 py-4 bg-white text-[#1A2A6C] rounded-full hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2"
              >
                Browse Lawyers
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                Try AI Assistant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDarkTheme ? 'bg-slate-800 border-b border-slate-700' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Why Choose LegalAI</h2>
            <p className={`text-lg ${isDarkTheme ? 'text-slate-300' : 'text-gray-500'}`}>Modern legal consultation made simple and accessible</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`group p-8 rounded-2xl border transition-all ${isDarkTheme ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50 hover:shadow-lg' : 'bg-white border-gray-100 hover:border-[#1A2A6C]/20 hover:shadow-xl'}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>AI Legal Assistant</h3>
              <p className={`leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-gray-500'}`}>
                Get instant answers to legal questions 24/7 with our advanced AI chatbot trained on legal expertise.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl border transition-all ${isDarkTheme ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50 hover:shadow-lg' : 'bg-white border-gray-100 hover:border-[#1A2A6C]/20 hover:shadow-xl'}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Expert Lawyers</h3>
              <p className={`leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-gray-500'}`}>
                Connect with verified, experienced lawyers across multiple specializations for personalized consultation.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl border transition-all ${isDarkTheme ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50 hover:shadow-lg' : 'bg-white border-gray-100 hover:border-[#1A2A6C]/20 hover:shadow-xl'}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Quick Booking</h3>
              <p className={`leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-gray-500'}`}>
                Schedule consultations in minutes with our streamlined booking system and flexible time slots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot Preview Section */}
      <section className={`py-20 ${isDarkTheme ? 'bg-slate-900' : 'bg-[#F5F5F5]'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-4xl mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Ask Your Legal Question</h2>
            <p className={`text-lg ${isDarkTheme ? 'text-slate-300' : 'text-gray-500'}`}>Our AI assistant is here to help with instant legal guidance</p>
          </div>

          <div className={`rounded-3xl shadow-xl border overflow-hidden ${isDarkTheme ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100'}`}>
            <div className="bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white">AI Legal Assistant</h3>
                  <p className="text-xs text-blue-200">Always here to help</p>
                </div>
              </div>
            </div>

            <div className={`p-6 h-[320px] overflow-y-auto ${isDarkTheme ? 'bg-slate-700' : 'bg-[#FAFAFA]'}`}>
              <div className="flex justify-start mb-4">
                <div className={`max-w-[80%] px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm border ${isDarkTheme ? 'bg-gray-600 border-gray-500 text-gray-100' : 'bg-white border-gray-100 text-gray-800'}`}>
                  <p>
                    Hello! I'm your AI legal assistant. I can help you with legal questions, explain legal concepts, or guide you to the right lawyer. What would you like to know?
                  </p>
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <div className="max-w-[80%] px-5 py-3 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-2xl rounded-tr-sm shadow-md">
                  <p>What should I know about starting a small business?</p>
                </div>
              </div>

              <div className="flex justify-start mb-4">
                <div className={`max-w-[80%] px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm border ${isDarkTheme ? 'bg-gray-600 border-gray-500 text-gray-100' : 'bg-white border-gray-100 text-gray-800'}`}>
                  <p>
                    Great question! Starting a small business involves several key legal steps: choosing a business structure (LLC, corporation, etc.), registering your business, obtaining necessary licenses, and understanding tax obligations. Would you like detailed information about any of these areas?
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-5 border-t ${isDarkTheme ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100'}`}>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your legal question..."
                  className={`flex-1 px-5 py-3 rounded-full outline-none focus:ring-2 transition-all placeholder-gray-400 ${isDarkTheme ? 'bg-gray-600 text-white focus:ring-purple-500/30' : 'bg-[#F5F5F5] focus:ring-[#1A2A6C]/30'}`}
                />
                <button className="px-6 py-3 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-full hover:shadow-lg transition-all">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C] rounded-3xl p-12 md:p-16 shadow-2xl">
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied clients who trust LegalAI for their legal needs
            </p>
            <button 
              onClick={() => onNavigate('signup')}
              className="px-10 py-4 bg-white text-[#1A2A6C] rounded-full hover:shadow-2xl transition-all inline-flex items-center gap-2"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}