import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu as MenuIcon, Search } from 'lucide-react'; // Added MenuIcon

interface HeaderProps {
  // Props can be added here if needed, e.g., onSearchSubmit
}

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  console.log("Rendering Header, mobile menu open:", isMobileMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <Link to="/" className="text-2xl font-bold text-orange-500">
            FoodDash
          </Link>

          {/* Desktop Navigation Links (Example) */}
          <nav className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
            <Link to="/restaurants" className="text-gray-600 hover:text-orange-500">Restaurants</Link>
            {/* Add other main navigation links here */}
          </nav>

          {/* Right side icons and buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {/* Add a badge for cart item count if needed */}
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-40">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/restaurants" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600" onClick={() => setIsMobileMenuOpen(false)}>Restaurants</Link>
            <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
            {/* Add other mobile navigation links here */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;