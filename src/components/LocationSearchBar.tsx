import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

interface LocationSearchBarProps {
  initialLocation?: string;
  onSearch: (location: string) => void;
  placeholder?: string;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({
  initialLocation = '',
  onSearch,
  placeholder = "Enter your delivery address",
}) => {
  const [location, setLocation] = useState(initialLocation);
  console.log("Rendering LocationSearchBar, current location state:", location);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Location search submitted:", location);
    onSearch(location);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-xl mx-auto bg-white rounded-md shadow-sm border border-gray-200 p-1">
      <MapPin className="h-5 w-5 text-gray-400 mx-3 flex-shrink-0" />
      <Input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder={placeholder}
        className="flex-grow border-none focus-visible:ring-0 shadow-none text-sm md:text-base"
        aria-label="Delivery address"
      />
      <Button type="submit" className="ml-2 bg-orange-500 hover:bg-orange-600 text-sm md:text-base px-4 py-2 h-auto">
        <Search className="h-4 w-4 mr-0 md:mr-2" />
        <span className="hidden md:inline">Search</span>
      </Button>
    </form>
  );
};

export default LocationSearchBar;