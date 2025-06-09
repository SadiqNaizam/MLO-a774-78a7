import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast'; // Using shadcn toast
import { Star, Clock } from 'lucide-react';


// Dummy data - replace with API call
const fetchRestaurantDetails = async (id: string) => {
  console.log('Fetching details for restaurant ID:', id);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const restaurantsData: any = {
    '1': {
      id: '1',
      name: 'Pizza Palace',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=870&auto=format&fit=crop',
      rating: 4.5,
      deliveryTime: '25-35 min',
      cuisineTypes: ['Pizza', 'Italian'],
      menu: {
        appetizers: [
          { id: 'a1', name: 'Garlic Bread', description: 'Crusty bread with garlic butter.', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=580&auto=format&fit=crop' },
          { id: 'a2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil.', price: 7.50 },
        ],
        main_courses: [
          { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=687&auto=format&fit=crop', customization: { sizes: ['Medium', 'Large'], toppings: ['Extra Cheese', 'Mushrooms', 'Pepperoni'] } },
          { id: 'm2', name: 'Pepperoni Pizza', description: 'Pizza with generous pepperoni.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=876&auto=format&fit=crop' },
          { id: 'm3', name: 'Spaghetti Carbonara', description: 'Creamy pasta with bacon and egg.', price: 13.50 },
        ],
        drinks: [
          { id: 'd1', name: 'Coca-Cola', price: 2.50 },
          { id: 'd2', name: 'Sparkling Water', price: 2.00 },
        ]
      }
    },
    // Add more restaurant data if needed
  };
  return restaurantsData[id] || null;
};


interface MenuItem {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  customization?: {
    sizes?: string[];
    toppings?: string[];
  };
}

interface RestaurantData {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  deliveryTime: string;
  cuisineTypes: string[];
  menu: {
    [category: string]: MenuItem[];
  };
}


const RestaurantMenuPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItemForDialog, setSelectedItemForDialog] = useState<MenuItem | null>(null);
  const [customizationOptions, setCustomizationOptions] = useState<{ size?: string; toppings?: string[] }>({});


  useEffect(() => {
    if (restaurantId) {
      setLoading(true);
      fetchRestaurantDetails(restaurantId)
        .then(data => {
          setRestaurant(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch restaurant details:", err);
          setLoading(false);
        });
    }
  }, [restaurantId]);

  console.log('RestaurantMenuPage loaded for ID:', restaurantId);

  const handleAddToCart = (item: { id: string | number; name: string; price: number; }) => {
    console.log('Adding to cart (Menu Page):', item);
    // Basic toast notification
    toast({
      title: "Added to Cart!",
      description: `${item.name} has been added to your cart.`,
    });
    // Add to global cart state/context here
  };
  
  const handleOpenCustomizationDialog = (itemId: string | number) => {
    // Find the item in the menu
    if (!restaurant) return;
    for (const category in restaurant.menu) {
        const item = restaurant.menu[category].find(i => i.id === itemId);
        if (item && item.customization) {
            setSelectedItemForDialog(item);
            setCustomizationOptions({}); // Reset previous customizations
            return;
        }
    }
    // If no customization, add directly
    const item = Object.values(restaurant.menu).flat().find(i => i.id === itemId);
    if(item) handleAddToCart(item);
  };

  const handleCustomizationChange = (type: 'size' | 'topping', value: string) => {
    if (type === 'size') {
      setCustomizationOptions(prev => ({ ...prev, size: value }));
    } else if (type === 'topping') {
      setCustomizationOptions(prev => {
        const currentToppings = prev.toppings || [];
        if (currentToppings.includes(value)) {
          return { ...prev, toppings: currentToppings.filter(t => t !== value) };
        } else {
          return { ...prev, toppings: [...currentToppings, value] };
        }
      });
    }
  };

  const handleAddCustomizedItemToCart = () => {
    if (!selectedItemForDialog) return;
    // Calculate price adjustments based on customizationOptions if needed
    console.log('Adding customized item to cart:', selectedItemForDialog.name, customizationOptions);
    handleAddToCart({
      id: selectedItemForDialog.id,
      name: `${selectedItemForDialog.name} (Customized)`, // Or more detailed name
      price: selectedItemForDialog.price // Adjust price based on options
    });
    setSelectedItemForDialog(null); // Close dialog
  };


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading restaurant menu...</div>;
  }

  if (!restaurant) {
    return <div className="flex justify-center items-center min-h-screen">Restaurant not found.</div>;
  }

  const menuCategories = Object.keys(restaurant.menu);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8 p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-orange-500">
            <AvatarImage src={restaurant.imageUrl} alt={restaurant.name} className="object-cover" />
            <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{restaurant.name}</h1>
            <div className="flex items-center space-x-3 text-sm text-gray-600 mt-2">
              <Badge variant="default" className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" /> {restaurant.rating.toFixed(1)}
              </Badge>
              <span>•</span>
              <span>{restaurant.cuisineTypes.join(', ')}</span>
              <span>•</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </section>

        <Tabs defaultValue={menuCategories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
            {menuCategories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                {category.replace('_', ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
          {menuCategories.map(category => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-auto max-h-[calc(100vh-300px)]"> {/* Adjust max-h as needed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
                  {restaurant.menu[category].map(item => (
                    <MenuItemCard
                      key={item.id}
                      {...item}
                      onAddToCart={handleAddToCart}
                      onCustomize={item.customization ? handleOpenCustomizationDialog : undefined}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {selectedItemForDialog && selectedItemForDialog.customization && (
        <Dialog open={!!selectedItemForDialog} onOpenChange={(open) => !open && setSelectedItemForDialog(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Customize {selectedItemForDialog.name}</DialogTitle>
              <DialogDescription>
                Make selections for your item. Price may vary.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedItemForDialog.customization.sizes && (
                <div className="space-y-2">
                  <Label>Size</Label>
                  <RadioGroup
                    value={customizationOptions.size}
                    onValueChange={(value) => handleCustomizationChange('size', value)}
                  >
                    {selectedItemForDialog.customization.sizes.map(size => (
                      <div key={size} className="flex items-center space-x-2">
                        <RadioGroupItem value={size} id={`size-${size}`} />
                        <Label htmlFor={`size-${size}`}>{size}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {selectedItemForDialog.customization.toppings && (
                <div className="space-y-2">
                  <Label>Extra Toppings</Label>
                  {selectedItemForDialog.customization.toppings.map(topping => (
                    <div key={topping} className="flex items-center space-x-2">
                      <Checkbox
                        id={`topping-${topping}`}
                        checked={(customizationOptions.toppings || []).includes(topping)}
                        onCheckedChange={() => handleCustomizationChange('topping', topping)}
                      />
                      <Label htmlFor={`topping-${topping}`}>{topping}</Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedItemForDialog(null)}>Cancel</Button>
              <Button onClick={handleAddCustomizedItemToCart} className="bg-orange-500 hover:bg-orange-600">Add to Cart</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;