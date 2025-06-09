import React from 'react';
import { CheckCircle, Circle, Dot } from 'lucide-react'; // Using Dot for pending steps
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderTrackerStepperProps {
  steps: Step[];
  currentStepId: string; // ID of the currently active step
}

const OrderTrackerStepper: React.FC<OrderTrackerStepperProps> = ({ steps }) => {
  console.log("Rendering OrderTrackerStepper with steps:", steps.length);

  if (!steps || steps.length === 0) {
    return <p>No tracking information available.</p>;
  }

  return (
    <div className="w-full">
      <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {steps.map((step, index) => {
          const isActive = step.isCurrent;
          const isCompleted = step.isCompleted;

          return (
            <li key={step.id} className="mb-10 ms-6">
              <span
                className={cn(
                  "absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900",
                  isCompleted || isActive ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : isActive ? (
                  // Pulsing dot for current step
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                ) : (
                  <Circle className="w-3 h-3 text-gray-500" />
                )}
              </span>
              <div className={cn(isActive ? "text-gray-900 dark:text-white" : "")}>
                <h3 className="font-medium leading-tight">{step.title}</h3>
                {step.description && <p className="text-sm mt-0.5">{step.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OrderTrackerStepper;