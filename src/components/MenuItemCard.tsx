import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (item: { id: string | number; name: string; price: number }) => void;
  onCustomize?: (itemId: string | number) => void; // Optional: if items can be customized
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  onCustomize,
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAddToCart = () => {
    console.log("Add to cart clicked for:", name, id);
    onAddToCart({ id, name, price });
  };

  return (
    <Card className="w-full flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="md:w-1/3 flex-shrink-0">
          <AspectRatio ratio={4/3} className="bg-gray-100">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
            />
          </AspectRatio>
        </div>
      )}
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <CardTitle className="text-md font-semibold">{name}</CardTitle>
          {description && <CardDescription className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</CardDescription>}
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-semibold text-orange-600">${price.toFixed(2)}</p>
          {onCustomize ? (
            <Button variant="outline" size="sm" onClick={() => onCustomize(id)}>
              Customize
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleAddToCart} className="text-orange-500 hover:text-orange-600">
              <PlusCircle className="h-5 w-5 mr-1" /> Add
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;