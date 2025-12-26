import { Scale, Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                Estasheer
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-200 dark:bg-dark-800 rounded-xl flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 dark:bg-dark-800 rounded-xl flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 dark:bg-dark-800 rounded-xl flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 dark:bg-dark-800 rounded-xl flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t.footer.aboutUs}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t.footer.howItWorks}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t.footer.pricing}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t.footer.contact}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t.footer.privacyPolicy}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t.footer.termsOfService}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t.footer.cookiePolicy}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.footer.followUs}</h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@estasheer.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                support@estasheer.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 Estasheer. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
