import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard'; // Assuming a variant or this can be used
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Minus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
}

// Mock cart data
const initialCartItems: CartItem[] = [
  { id: 'm1', name: 'Margherita Pizza (Customized)', price: 15.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=687&auto=format&fit=crop', description: 'Large, Extra Cheese' },
  { id: 'd1', name: 'Coca-Cola', price: 2.50, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=687&auto=format&fit=crop' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  console.log('CartPage loaded');

  const handleQuantityChange = (itemId: string | number, change: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) } // Prevent negative quantity
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
      });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.08; // Example tax rate
  const total = subtotal + deliveryFee + taxes;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before proceeding.",
        variant: "destructive",
      });
      return;
    }
    console.log('Proceeding to checkout with:', { cartItems, subtotal, total, promoCode, specialInstructions });
    // Navigate to checkout page or open payment modal
    toast({
      title: "Redirecting to Checkout",
      description: "Please wait...",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-xl text-gray-600">Your cart is empty.</p>
              <Button onClick={() => window.history.back()} className="mt-4 bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <section className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 gap-4 shadow">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                  )}
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                    <p className="text-md font-medium text-orange-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 mt-2 sm:mt-0">
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-lg font-semibold w-20 text-center sm:text-right flex-shrink-0 mt-2 sm:mt-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 flex-shrink-0" onClick={() => handleRemoveItem(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              ))}
            </section>

            {/* Order Summary Section */}
            <aside className="lg:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (Est.)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div>
                    <Label htmlFor="promo-code" className="mb-1 block">Promo Code</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="promo-code" 
                        placeholder="Enter code" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="instructions" className="mb-1 block">Special Instructions</Label>
                    <Textarea 
                      id="instructions"
                      placeholder="Any special requests for the restaurant?"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3 h-auto" size="lg" onClick={handleProceedToCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;