
// Types for payment integration
export type PaymentMethod = 'esewa' | 'khalti' | 'credit-card';

export interface PaymentDetails {
  amount: number;
  productId: string;
  productName: string;
  productUrl?: string;
  callbackUrl: string;
  cancelUrl?: string;
}

// Mock IDs for development - in production, these would be your actual merchant IDs
const ESEWA_MERCHANT_ID = 'EPAYTEST';
const KHALTI_MERCHANT_ID = 'test_public_key_dc74e0fd57cb46cd93832aee0a390234';

export class PaymentService {
  // Initialize eSewa payment
  static initiateEsewaPayment(details: PaymentDetails): void {
    console.log('Initiating eSewa payment:', details);
    
    // In production, you would use the actual eSewa endpoints
    const path = "https://uat.esewa.com.np/epay/main";
    
    const params = {
      amt: details.amount,
      psc: 0, // Service charge
      pdc: 0, // Delivery charge
      txAmt: 0, // Tax amount
      tAmt: details.amount, // Total amount
      pid: details.productId,
      scd: ESEWA_MERCHANT_ID, // Merchant ID
      su: details.callbackUrl, // Success URL
      fu: details.cancelUrl || details.callbackUrl // Failure URL
    };
    
    // Create a form and submit it programmatically
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);
    
    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key as keyof typeof params].toString());
      form.appendChild(hiddenField);
    }
    
    document.body.appendChild(form);
    form.submit();
  }
  
  // Initialize Khalti payment
  static initiateKhaltiPayment(details: PaymentDetails, onSuccess: (data: any) => void, onError: (error: any) => void): void {
    console.log('Initiating Khalti payment:', details);
    
    // In a real implementation, you would load the Khalti SDK and use it
    // This is a mock implementation for demonstration
    const mockPayment = () => {
      // Simulate payment processing
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate for demo
        
        if (success) {
          const paymentResponse = {
            idx: `khalti-${Date.now()}`,
            amount: details.amount,
            mobile: '98XXXXXXXX',
            product_identity: details.productId,
            product_name: details.productName,
            token: `mock-token-${Date.now()}`,
            status: 'Completed'
          };
          
          onSuccess(paymentResponse);
        } else {
          onError({ message: 'Payment failed or cancelled by user' });
        }
      }, 2000);
    };
    
    // In a real implementation, you would have:
    /*
    // Load Khalti script if not already loaded
    if (!document.getElementById('khalti-script')) {
      const script = document.createElement('script');
      script.id = 'khalti-script';
      script.src = 'https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/khalti-checkout.iffe.js';
      script.async = true;
      script.onload = () => {
        // Initialize Khalti config and trigger payment
        const config = {
          publicKey: KHALTI_MERCHANT_ID,
          productIdentity: details.productId,
          productName: details.productName,
          productUrl: details.productUrl,
          amount: details.amount * 100, // Khalti expects amount in paisa
          eventHandler: {
            onSuccess: onSuccess,
            onError: onError,
            onClose: () => console.log('Khalti widget closed')
          }
        };
        
        const checkout = new window.KhaltiCheckout(config);
        checkout.show({ amount: details.amount * 100 });
      };
      document.head.appendChild(script);
    } else {
      // If script is already loaded, just trigger payment
      const config = {
        // ... same config as above
      };
      const checkout = new window.KhaltiCheckout(config);
      checkout.show({ amount: details.amount * 100 });
    }
    */
    
    // For demo, just call the mock function
    mockPayment();
  }
  
  // Verify payment (would be done on server in production)
  static async verifyPayment(paymentMethod: PaymentMethod, token: string, amount: number): Promise<boolean> {
    console.log(`Verifying ${paymentMethod} payment with token: ${token}, amount: ${amount}`);
    
    // In production, this would be a server-side call to verify the payment
    // Here we'll just simulate a successful verification
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}
