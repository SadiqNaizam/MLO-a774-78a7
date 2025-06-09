import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocationSearchBar from '@/components/LocationSearchBar';
import Carousel, { CarouselSlide } from '@/components/Carousel';
import CuisineCategoryChip from '@/components/CuisineCategoryChip';
import RestaurantCard from '@/components/RestaurantCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const placeholderCarouselSlides: CarouselSlide[] = [
  { id: 'promo1', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop', altText: 'Delicious Food Offer', title: 'Get 20% Off Your First Order!', subtitle: 'Use code FIRSTBITE at checkout.' },
  { id: 'promo2', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1528&auto=format&fit=crop', altText: 'Pizza Special', title: 'Weekend Pizza Fest', subtitle: 'Any 2 large pizzas for $25.' },
  { id: 'promo3', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1740&auto=format&fit=crop', altText: 'Fine Dining Experience', title: 'New Gourmet Menu Launched', subtitle: 'Explore exquisite dishes from top chefs.' },
];

const placeholderCuisines = ['All', 'Pizza', 'Burgers', 'Sushi', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Vegan'];

const placeholderRestaurants = [
  { id: '1', name: 'Pizza Palace', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=870&auto=format&fit=crop', rating: 4.5, deliveryTime: '25-35 min', cuisineTypes: ['Pizza', 'Italian'], priceRange: '$$' },
  { id: '2', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop', rating: 4.2, deliveryTime: '20-30 min', cuisineTypes: ['Burgers', 'American'], priceRange: '$' },
  { id: '3', name: 'Sushi Spot', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=870&auto=format&fit=crop', rating: 4.8, deliveryTime: '30-40 min', cuisineTypes: ['Sushi', 'Japanese'], priceRange: '$$$' },
  { id: '4', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=871&auto=format&fit=crop', rating: 4.3, deliveryTime: '25-35 min', cuisineTypes: ['Mexican', 'Fast Food'] },
];

const HomePage = () => {
  const [currentLocation, setCurrentLocation] = useState('New York, NY');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const navigate = useNavigate();

  console.log('HomePage loaded');

  const handleLocationSearch = (location: string) => {
    console.log('Searching for location:', location);
    setCurrentLocation(location);
    // Potentially navigate or refetch restaurants based on new location
    navigate(`/restaurants?location=${encodeURIComponent(location)}&cuisine=${encodeURIComponent(activeCuisine)}`);
  };

  const handleCuisineSelect = (cuisine: string) => {
    console.log('Selected cuisine:', cuisine);
    setActiveCuisine(cuisine);
     navigate(`/restaurants?location=${encodeURIComponent(currentLocation)}&cuisine=${encodeURIComponent(cuisine)}`);
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log('Restaurant clicked:', id);
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-12">
        <section aria-labelledby="location-search-heading" className="text-center">
          <h1 id="location-search-heading" className="text-3xl font-bold text-gray-800 mb-2">
            Order food to your door
          </h1>
          <p className="text-gray-600 mb-6">Enter your address to see restaurants near you.</p>
          <LocationSearchBar
            initialLocation={currentLocation}
            onSearch={handleLocationSearch}
            placeholder="Enter your delivery address"
          />
        </section>

        <section aria-labelledby="promotions-heading">
          <h2 id="promotions-heading" className="sr-only">Promotions</h2>
          <Carousel slides={placeholderCarouselSlides} autoplayDelay={5000} />
        </section>

        <section aria-labelledby="cuisine-categories-heading">
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="cuisine-scroll" className="text-2xl font-semibold text-gray-800">
              Explore Cuisines
            </Label>
          </div>
          <ScrollArea id="cuisine-scroll" className="w-full whitespace-nowrap rounded-md">
            <div className="flex space-x-3 pb-4">
              {placeholderCuisines.map((cuisine) => (
                <CuisineCategoryChip
                  key={cuisine}
                  categoryName={cuisine}
                  isActive={activeCuisine === cuisine}
                  onClick={handleCuisineSelect}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section aria-labelledby="featured-restaurants-heading">
          <Label htmlFor="restaurant-grid" className="text-2xl font-semibold text-gray-800 mb-6 block">
            Nearby Restaurants
          </Label>
          <div id="restaurant-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {placeholderRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={handleRestaurantClick}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;