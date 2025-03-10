
// Mock implementation of a dynamic pricing service
// In a real application, this would use algorithms that consider:
// - Current demand
// - Seat availability
// - Time until departure
// - Historical booking patterns
// - Competitor pricing
// - Special events

export interface PricingFactors {
  demand: number; // 0 to 1, where 1 is highest demand
  availability: number; // 0 to 1, where 1 is fully available
  daysToDeparture: number;
  peakSeason: boolean;
  specialEvent: boolean;
}

export class PricingService {
  private static readonly BASE_FARE_MAP: Record<string, number> = {
    'Kathmandu-Pokhara': 1200,
    'Kathmandu-Chitwan': 900,
    'Pokhara-Kathmandu': 1200,
    'Chitwan-Kathmandu': 900,
    'Pokhara-Chitwan': 800,
    'Chitwan-Pokhara': 800,
    'Kathmandu-Lumbini': 1100,
    'Lumbini-Kathmandu': 1100,
  };

  // Get a base price for a route
  static getBasePrice(from: string, to: string): number {
    const routeKey = `${from}-${to}`;
    return this.BASE_FARE_MAP[routeKey] || 1000; // Default price if route not found
  }

  // Calculate dynamic price based on various factors
  static calculateDynamicPrice(from: string, to: string, factors: PricingFactors): number {
    const basePrice = this.getBasePrice(from, to);
    
    // Demand-based adjustment (higher demand = higher price)
    const demandFactor = 1 + (factors.demand * 0.5); // Up to 50% increase
    
    // Availability-based adjustment (lower availability = higher price)
    const availabilityFactor = 1 + ((1 - factors.availability) * 0.3); // Up to 30% increase
    
    // Time-to-departure adjustment (closer to departure = higher price)
    let departureFactor = 1;
    if (factors.daysToDeparture <= 1) {
      departureFactor = 1.4; // Last day premium
    } else if (factors.daysToDeparture <= 3) {
      departureFactor = 1.25; // Last 3 days premium
    } else if (factors.daysToDeparture <= 7) {
      departureFactor = 1.15; // Last week premium
    } else if (factors.daysToDeparture >= 30) {
      departureFactor = 0.9; // Early booking discount
    }
    
    // Season and event adjustments
    const seasonFactor = factors.peakSeason ? 1.2 : 1;
    const eventFactor = factors.specialEvent ? 1.25 : 1;
    
    // Calculate final price
    let finalPrice = basePrice * demandFactor * availabilityFactor * departureFactor * seasonFactor * eventFactor;
    
    // Round to nearest 10
    finalPrice = Math.ceil(finalPrice / 10) * 10;
    
    return finalPrice;
  }
  
  // Generate a price discount for marketing purposes
  static generatePriceDiscount(from: string, to: string): {
    originalPrice: number;
    newPrice: number;
    discountPercentage: number;
    expiryHours: number;
  } {
    const basePrice = this.getBasePrice(from, to);
    
    // Random discount between 10% and 25%
    const discountPercentage = Math.floor(Math.random() * 16) + 10;
    const discountMultiplier = (100 - discountPercentage) / 100;
    
    const newPrice = Math.ceil((basePrice * discountMultiplier) / 10) * 10;
    
    // Random expiry time between 4 and 24 hours
    const expiryHours = Math.floor(Math.random() * 21) + 4;
    
    return {
      originalPrice: basePrice,
      newPrice,
      discountPercentage,
      expiryHours
    };
  }
}
