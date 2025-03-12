
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, LoaderCircle } from 'lucide-react';
import { PaymentMethod, PaymentService, PaymentDetails } from '@/services/PaymentService';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PaymentProcessorProps {
  paymentMethod: PaymentMethod;
  amount: number;
  bookingId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  paymentMethod,
  amount,
  bookingId,
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  
  const handlePayment = () => {
    setProcessing(true);
    setError(null);
    
    // Get current URL for callback
    const callbackUrl = `${window.location.origin}/booking-confirmation?bookingId=${bookingId}`;
    
    const paymentDetails: PaymentDetails = {
      amount,
      productId: bookingId,
      productName: `Bus Ticket - ${bookingId}`,
      callbackUrl,
      cancelUrl: `${window.location.origin}/booking-confirmation?cancelled=true&bookingId=${bookingId}`
    };
    
    if (paymentMethod === 'esewa') {
      // eSewa will redirect to another page, so we proceed directly
      PaymentService.initiateEsewaPayment(paymentDetails);
    } else if (paymentMethod === 'khalti') {
      setDialogOpen(true);
      setPaymentStatus('processing');
      
      // Show Khalti payment dialog
      PaymentService.initiateKhaltiPayment(
        paymentDetails,
        (response) => {
          console.log('Khalti payment successful:', response);
          setPaymentStatus('success');
          
          // Verify payment on server (would be done through API in production)
          setTimeout(() => {
            setDialogOpen(false);
            onSuccess();
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully.",
              duration: 5000,
            });
          }, 2000);
        },
        (error) => {
          console.error('Khalti payment error:', error);
          setPaymentStatus('error');
          setError(error.message || 'Payment failed. Please try again.');
          
          // Close dialog after delay
          setTimeout(() => {
            setDialogOpen(false);
            setProcessing(false);
          }, 3000);
          
          toast({
            title: "Payment Failed",
            description: error.message || "There was an issue processing your payment.",
            variant: "destructive",
            duration: 5000,
          });
        }
      );
    } else {
      // For credit card, we would show a form
      // In this demo, we'll just simulate a successful payment
      setDialogOpen(true);
      setPaymentStatus('processing');
      
      setTimeout(() => {
        setPaymentStatus('success');
        
        setTimeout(() => {
          setDialogOpen(false);
          onSuccess();
          toast({
            title: "Payment Successful",
            description: "Your payment has been processed successfully.",
            duration: 5000,
          });
        }, 2000);
      }, 2000);
    }
  };
  
  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={processing}
        className="btn-primary w-full py-3 flex items-center justify-center"
      >
        {processing ? (
          <>
            <LoaderCircle className="animate-spin mr-2" size={18} />
            Processing...
          </>
        ) : (
          <>
            Pay NPR {amount.toLocaleString()}
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle size={14} className="mr-1" />
          {error}
        </div>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {paymentStatus === 'processing' && "Processing Payment"}
              {paymentStatus === 'success' && "Payment Successful"}
              {paymentStatus === 'error' && "Payment Failed"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-6">
            {paymentStatus === 'processing' && (
              <div className="flex flex-col items-center">
                <LoaderCircle size={48} className="text-primary animate-spin mb-4" />
                <p className="text-center text-gray-600">
                  {paymentMethod === 'khalti' ? "Processing your Khalti payment..." : 
                   paymentMethod === 'esewa' ? "Processing your eSewa payment..." :
                   "Processing your payment..."}
                </p>
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="flex flex-col items-center">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <p className="text-center text-gray-600">
                  Your payment was successful!
                </p>
              </div>
            )}
            
            {paymentStatus === 'error' && (
              <div className="flex flex-col items-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <p className="text-center text-gray-600">
                  {error || "There was an issue processing your payment. Please try again."}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentProcessor;
