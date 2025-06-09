import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock, Tag } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "25-35 min"
  cuisineTypes: string[]; // e.g., ["Pizza", "Italian"]
  priceRange?: string; // e.g., "$$"
  onClick: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  deliveryTime,
  cuisineTypes,
  priceRange,
  onClick,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleCardClick = () => {
    console.log("RestaurantCard clicked, ID:", id);
    onClick(id);
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-gray-300">|</span>
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{deliveryTime}</span>
          {priceRange && (
            <>
              <span className="text-gray-300">|</span>
              <span>{priceRange}</span>
            </>
          )}
        </div>
        {cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {cuisineTypes.slice(0, 3).map((cuisine) => ( // Show max 3 types
              <Badge key={cuisine} variant="secondary" className="text-xs">{cuisine}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      {/* Optional: A footer for promotions or quick actions, but click handled by card */}
      {/* <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">View Menu</Button>
      </CardFooter> */}
    </Card>
  );
};

export default RestaurantCard;