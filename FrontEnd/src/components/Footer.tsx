import { Scale, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import type { Page } from '../App';
import logo from 'figma:asset/abdcc5fdd23bbd6fd9ff5c18e66196cd93db9a23.png';

interface FooterProps {
  onNavigate: (page: Page) => void;
  isDarkTheme?: boolean;
}

export function Footer({ onNavigate, isDarkTheme }: FooterProps) {
  return (
    <footer className={`border-t ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-[#F5F5F5] border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-4"
            >
              <img src={logo} alt="Estasheer" className="h-8 object-contain dark:filter dark:brightness-0 dark:invert" />
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Modern legal consultation powered by AI technology. Get expert advice whenever you need it.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-[#1A2A6C] dark:hover:bg-blue-600 hover:text-white transition-colors border border-gray-200 dark:border-gray-600">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-[#1A2A6C] dark:hover:bg-blue-600 hover:text-white transition-colors border border-gray-200 dark:border-gray-600">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-[#1A2A6C] dark:hover:bg-blue-600 hover:text-white transition-colors border border-gray-200 dark:border-gray-600">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-[#1A2A6C] dark:hover:bg-blue-600 hover:text-white transition-colors border border-gray-200 dark:border-gray-600">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm text-gray-900 dark:text-gray-400 mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('home')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Features
                </button>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('browse')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Browse Lawyers
                </button>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  AI Assistant
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm text-gray-900 dark:text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm text-gray-900 dark:text-gray-400 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A2A6C] transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2025 LegalAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-[#1A2A6C] transition-colors">English</a>
            <a href="#" className="hover:text-[#1A2A6C] transition-colors">العربية</a>
            <a href="#" className="hover:text-[#1A2A6C] transition-colors">Español</a>
          </div>
        </div>
      </div>
    </footer>
  );
}