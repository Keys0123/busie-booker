
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, LoaderCircle } from 'lucide-react';
import { PaymentMethod, PaymentService, PaymentDetails } from '@/services/PaymentService';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const [statusMessage, setStatusMessage] = useState<string>('Processing your payment...');
  
  // Listen for Khalti status updates
  useEffect(() => {
    const handleKhaltiStatusUpdate = (event: CustomEvent) => {
      setStatusMessage(event.detail.status);
    };
    
    document.addEventListener('khalti-status-update', handleKhaltiStatusUpdate as EventListener);
    
    return () => {
      document.removeEventListener('khalti-status-update', handleKhaltiStatusUpdate as EventListener);
    };
  }, []);
  
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
      // For eSewa, we use their direct payment gateway which will redirect to another page
      // We'll show a temporary processing dialog before redirecting
      setDialogOpen(true);
      setPaymentStatus('processing');
      setStatusMessage('Redirecting to eSewa payment gateway...');
      
      // After a short delay, redirect to eSewa
      setTimeout(() => {
        PaymentService.initiateEsewaPayment(paymentDetails);
      }, 1500);
    } else if (paymentMethod === 'khalti') {
      setDialogOpen(true);
      setPaymentStatus('processing');
      setStatusMessage('Initializing Khalti payment...');
      
      // Show Khalti payment dialog with more realistic processing
      PaymentService.initiateKhaltiPayment(
        paymentDetails,
        (response) => {
          console.log('Khalti payment successful:', response);
          setStatusMessage('Payment successful! Verifying transaction...');
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
      // In this demo, we'll simulate a more realistic payment processing flow
      setDialogOpen(true);
      setPaymentStatus('processing');
      
      const creditCardSteps = [
        { message: "Validating card details...", delay: 1500 },
        { message: "Processing payment...", delay: 2000 },
        { message: "Verifying with bank...", delay: 2500 },
        { message: "Finalizing transaction...", delay: 1500 }
      ];
      
      let currentStep = 0;
      
      const processStep = () => {
        if (currentStep < creditCardSteps.length) {
          setStatusMessage(creditCardSteps[currentStep].message);
          setTimeout(() => {
            currentStep++;
            processStep();
          }, creditCardSteps[currentStep].delay);
        } else {
          // All steps complete, simulate success or failure
          const isSuccessful = Math.random() > 0.2; // 80% success rate
          
          if (isSuccessful) {
            setPaymentStatus('success');
            setStatusMessage('Payment successful!');
            
            setTimeout(() => {
              setDialogOpen(false);
              onSuccess();
              toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
                duration: 5000,
              });
            }, 2000);
          } else {
            setPaymentStatus('error');
            setError('Payment was declined by the bank. Please try another card or payment method.');
            
            setTimeout(() => {
              setDialogOpen(false);
              setProcessing(false);
              
              toast({
                title: "Payment Failed",
                description: "Your payment was declined by the bank. Please try another card or payment method.",
                variant: "destructive",
                duration: 5000,
              });
            }, 3000);
          }
        }
      };
      
      // Start processing steps
      processStep();
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
            <DialogDescription>
              {statusMessage}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-6">
            {paymentStatus === 'processing' && (
              <div className="flex flex-col items-center">
                <LoaderCircle size={48} className="text-primary animate-spin mb-4" />
                <p className="text-center text-gray-600 mt-2">
                  {paymentMethod === 'khalti' ? "This may take a few moments..." : 
                   paymentMethod === 'esewa' ? "You'll be redirected to eSewa..." :
                   "Please don't close this window..."}
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
