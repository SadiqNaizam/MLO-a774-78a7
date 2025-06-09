import React from 'react';
import { Badge } from '@/components/ui/badge'; // Using Badge for chip-like appearance
import { cn } from '@/lib/utils';

interface CuisineCategoryChipProps {
  categoryName: string;
  isActive?: boolean;
  onClick: (categoryName: string) => void;
  className?: string;
}

const CuisineCategoryChip: React.FC<CuisineCategoryChipProps> = ({
  categoryName,
  isActive = false,
  onClick,
  className,
}) => {
  console.log("Rendering CuisineCategoryChip:", categoryName, "isActive:", isActive);

  const handleClick = () => {
    console.log("CuisineCategoryChip clicked:", categoryName);
    onClick(categoryName);
  };

  return (
    <Badge
      variant={isActive ? 'default' : 'outline'}
      onClick={handleClick}
      className={cn(
        "cursor-pointer transition-all px-4 py-2 text-sm rounded-full",
        isActive ? "bg-orange-500 text-white hover:bg-orange-600" : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-orange-400",
        className
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {categoryName}
    </Badge>
  );
};

export default CuisineCategoryChip;