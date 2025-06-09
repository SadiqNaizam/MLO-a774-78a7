import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTrackerStepper, { Step } from '@/components/OrderTrackerStepper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // shadcn Progress
import { Package, ChefHat, Bike, Home } from 'lucide-react';

// Mock order data and status updates
const fetchOrderDetails = async (orderId: string) => {
  console.log('Fetching details for order ID:', orderId);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Example order structure
  const orderData = {
    '12345': {
      orderId: '12345',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 15.99 },
        { name: 'Coca-Cola', quantity: 2, price: 2.50 },
      ],
      totalAmount: 20.99, // After discounts/fees, before tax for simplicity
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      restaurantName: 'Pizza Palace',
      currentStatusId: 'preparing', // Initial status
    },
    // Add more orders if needed
  };
  return (orderData as any)[orderId] || null;
};

const orderStepsConfig: Omit<Step, 'isCompleted' | 'isCurrent'>[] = [
  { id: 'confirmed', title: 'Order Confirmed', description: 'Your order has been received by the restaurant.' },
  { id: 'preparing', title: 'Preparing Food', description: 'The restaurant is preparing your meal.' },
  { id: 'out_for_delivery', title: 'Out for Delivery', description: 'Your order is on its way.' },
  { id: 'delivered', title: 'Delivered', description: 'Enjoy your meal!' },
];

const getStatusProgressValue = (currentStatusId: string) => {
    const statusIndex = orderStepsConfig.findIndex(step => step.id === currentStatusId);
    if (statusIndex === -1) return 0;
    return ((statusIndex + 1) / orderStepsConfig.length) * 100;
};


const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStepId, setCurrentStepId] = useState('confirmed');
  const [progressValue, setProgressValue] = useState(0);


  useEffect(() => {
    if (orderId) {
      setLoading(true);
      fetchOrderDetails(orderId)
        .then(data => {
          setOrder(data);
          if (data) {
            setCurrentStepId(data.currentStatusId);
            setProgressValue(getStatusProgressValue(data.currentStatusId));
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch order details:", err);
          setLoading(false);
        });
    }
  }, [orderId]);

  // Simulate order status updates
  useEffect(() => {
    if (!order || currentStepId === 'delivered') return;

    const timeouts: NodeJS.Timeout[] = [];
    const statusSequence = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = statusSequence.indexOf(currentStepId);

    if (currentIndex < statusSequence.length - 1) {
      const nextStatus = statusSequence[currentIndex + 1];
      const delay = 15000; // 15 seconds for demo
      
      const timeoutId = setTimeout(() => {
        console.log(`Order ${orderId} status updated to: ${nextStatus}`);
        setCurrentStepId(nextStatus);
        setProgressValue(getStatusProgressValue(nextStatus));
      }, delay);
      timeouts.push(timeoutId);
    }
    return () => timeouts.forEach(clearTimeout);
  }, [currentStepId, order, orderId]);


  console.log('OrderTrackingPage loaded for ID:', orderId);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading order details...</div>;
  }

  if (!order) {
    return <div className="flex justify-center items-center min-h-screen">Order not found.</div>;
  }

  const steps: Step[] = orderStepsConfig.map(stepConfig => {
    const currentIndex = orderStepsConfig.findIndex(s => s.id === currentStepId);
    const stepIndex = orderStepsConfig.findIndex(s => s.id === stepConfig.id);
    return {
      ...stepConfig,
      isCompleted: stepIndex < currentIndex,
      isCurrent: stepIndex === currentIndex,
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="bg-gray-50 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-orange-600">Track Your Order</CardTitle>
            <CardDescription className="text-gray-600">
              Order ID: #{order.orderId} from {order.restaurantName}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Estimated Delivery Time</h3>
                <p className="text-lg font-bold text-orange-500">{order.estimatedDelivery}</p>
              </div>
              <Progress value={progressValue} className="w-full h-3 [&>*]:bg-orange-500" />
            </div>

            <div className="mt-8">
                <OrderTrackerStepper steps={steps} currentStepId={currentStepId} />
            </div>
            
            <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Summary</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                    {order.items.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-semibold text-md mt-3 border-t pt-3">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="w-full sm:w-auto">Contact Support</Button>
              <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">View Receipt</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;