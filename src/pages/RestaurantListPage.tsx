import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search } from 'lucide-react';

// Dummy data - in a real app, this would come from an API
const allRestaurants = [
  { id: '1', name: 'Pizza Palace', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=870&auto=format&fit=crop', rating: 4.5, deliveryTime: '25-35 min', cuisineTypes: ['Pizza', 'Italian'], priceRange: '$$' },
  { id: '2', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop', rating: 4.2, deliveryTime: '20-30 min', cuisineTypes: ['Burgers', 'American'], priceRange: '$' },
  { id: '3', name: 'Sushi Spot', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=870&auto=format&fit=crop', rating: 4.8, deliveryTime: '30-40 min', cuisineTypes: ['Sushi', 'Japanese'], priceRange: '$$$' },
  { id: '4', name: 'Pasta Place', imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a457f?q=80&w=870&auto=format&fit=crop', rating: 4.0, deliveryTime: '35-45 min', cuisineTypes: ['Italian', 'Pasta'], priceRange: '$$' },
  { id: '5', name: 'Curry Corner', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=870&auto=format&fit=crop', rating: 4.6, deliveryTime: '30-40 min', cuisineTypes: ['Indian', 'Curry'], priceRange: '$$' },
  { id: '6', name: 'Salad Station', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=387&auto=format&fit=crop', rating: 4.1, deliveryTime: '15-25 min', cuisineTypes: ['Salads', 'Healthy'], priceRange: '$' },
];

const ITEMS_PER_PAGE = 6;

const RestaurantListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // e.g., 'rating', 'deliveryTime'
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);
  const [currentPage, setCurrentPage] = useState(1);

  console.log('RestaurantListPage loaded');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cuisine = queryParams.get('cuisine') || 'All';
    const initialLocation = queryParams.get('location') || '';
    console.log('Initial params - Cuisine:', cuisine, 'Location:', initialLocation);

    let restaurants = allRestaurants;
    if (cuisine !== 'All') {
      restaurants = restaurants.filter(r => r.cuisineTypes.includes(cuisine) || r.name.toLowerCase().includes(cuisine.toLowerCase()));
    }
    // In a real app, location would filter results from backend
    
    setFilteredRestaurants(restaurants);
    setCurrentPage(1); // Reset to first page on filter change
  }, [location.search]);

  useEffect(() => {
    let restaurants = [...allRestaurants];
    const queryParams = new URLSearchParams(location.search);
    const cuisine = queryParams.get('cuisine') || 'All';

    if (cuisine !== 'All') {
      restaurants = restaurants.filter(r => r.cuisineTypes.includes(cuisine) || r.name.toLowerCase().includes(cuisine.toLowerCase()));
    }
    
    if (searchTerm) {
      restaurants = restaurants.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    restaurants.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'deliveryTime') { // Simplified sort
        const timeA = parseInt(a.deliveryTime.split('-')[0]);
        const timeB = parseInt(b.deliveryTime.split('-')[0]);
        return timeA - timeB;
      }
      return 0;
    });
    
    setFilteredRestaurants(restaurants);
    setCurrentPage(1);
  }, [searchTerm, sortBy, location.search]);

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurant/${id}`);
  };
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Restaurants</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                {/* Add more sort options if needed */}
              </SelectContent>
            </Select>
          </div>
        </section>

        {paginatedRestaurants.length > 0 ? (
          <ScrollArea className="h-auto"> {/* Content itself will make page scrollable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No restaurants found matching your criteria.</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }} isActive={currentPage === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* Basic ellipsis example - can be made more dynamic */}
              {/* {totalPages > 5 && currentPage < totalPages - 2 && <PaginationEllipsis />} */}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListPage;