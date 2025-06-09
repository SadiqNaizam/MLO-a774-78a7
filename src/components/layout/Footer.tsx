import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About/Brand */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-3">FoodDash</h3>
            <p className="text-sm text-gray-600">
              Your favorite food, delivered fast to your door.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange-500">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-orange-500">Contact</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-orange-500">FAQ</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-orange-500">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-orange-500">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-orange-500">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Social Media */}
          <div>
             <h4 className="text-md font-semibold text-gray-700 mb-3">Follow Us</h4>
             <div className="flex space-x-4">
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500"><span className="sr-only">GitHub</span><Github className="h-6 w-6" /></a>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} FoodDash Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;