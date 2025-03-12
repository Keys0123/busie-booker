
import React from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { PaymentMethod } from '@/services/PaymentService';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Select Payment Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'credit-card' 
              ? 'border-primary bg-primary/5 ring-1 ring-primary' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onMethodChange('credit-card')}
        >
          <CreditCard className={`h-8 w-8 mb-2 ${selectedMethod === 'credit-card' ? 'text-primary' : 'text-gray-500'}`} />
          <span className={`font-medium ${selectedMethod === 'credit-card' ? 'text-primary' : 'text-gray-700'}`}>Credit Card</span>
        </div>
        
        <div
          className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'esewa' 
              ? 'border-green-500 bg-green-50 ring-1 ring-green-500' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onMethodChange('esewa')}
        >
          <div className="h-8 w-8 mb-2 flex items-center justify-center relative">
            <div className={`rounded-full h-6 w-6 flex items-center justify-center ${selectedMethod === 'esewa' ? 'bg-green-500' : 'bg-gray-200'}`}>
              <Wallet className={`h-4 w-4 text-white`} />
            </div>
            <span className={`absolute -bottom-1 -right-1 text-xs font-bold ${selectedMethod === 'esewa' ? 'text-green-600' : 'text-gray-600'}`}>e</span>
          </div>
          <span className={`font-medium ${selectedMethod === 'esewa' ? 'text-green-600' : 'text-gray-700'}`}>eSewa</span>
        </div>
        
        <div
          className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'khalti' 
              ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onMethodChange('khalti')}
        >
          <div className="h-8 w-8 mb-2 flex items-center justify-center">
            <div className={`rounded-full h-6 w-6 flex items-center justify-center ${selectedMethod === 'khalti' ? 'bg-purple-600' : 'bg-gray-200'}`}>
              <span className="text-white font-bold text-xs">K</span>
            </div>
          </div>
          <span className={`font-medium ${selectedMethod === 'khalti' ? 'text-purple-600' : 'text-gray-700'}`}>Khalti</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
