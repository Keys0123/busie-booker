
import { jsPDF } from "jspdf";
// Import the autoTable plugin correctly
import { default as autoTable } from "jspdf-autotable";
import { format } from "date-fns";

// We don't need to declare the module as we'll be using the autoTable directly
// and not through the jsPDF prototype extension

export interface TicketData {
  bookingId: string;
  bookingDate: Date;
  travelDate: Date;
  from: string;
  to: string;
  busName: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  passengerDetails: {
    name: string;
    age: number;
    gender: string;
    seat: string;
  }[];
  totalAmount: number;
  paymentMethod: string;
}

export class TicketService {
  static generateTicket(ticketData: TicketData): void {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add header with company name
    doc.setFontSize(20);
    doc.setTextColor(41, 98, 255); // Primary color
    doc.text("Nepal Bus Booking", 105, 15, { align: "center" });
    
    // Add ticket information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("E-TICKET", 105, 25, { align: "center" });
    
    // Add booking information
    doc.setFontSize(10);
    doc.text(`Booking ID: ${ticketData.bookingId}`, 14, 35);
    doc.text(`Booking Date: ${format(ticketData.bookingDate, 'MMM d, yyyy')}`, 14, 42);
    
    // Add a line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 45, 196, 45);
    
    // Add journey details
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    doc.text("Journey Details", 14, 55);
    
    doc.setFontSize(10);
    doc.text(`From: ${ticketData.from}`, 14, 65);
    doc.text(`To: ${ticketData.to}`, 14, 72);
    doc.text(`Date: ${format(ticketData.travelDate, 'EEEE, MMMM d, yyyy')}`, 14, 79);
    doc.text(`Bus: ${ticketData.busName} (${ticketData.busType})`, 14, 86);
    doc.text(`Departure: ${ticketData.departureTime}`, 14, 93);
    doc.text(`Arrival: ${ticketData.arrivalTime}`, 14, 100);
    
    // Add passenger information
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    doc.text("Passenger Details", 14, 115);
    
    // Create passenger table
    const tableColumn = ["Name", "Age", "Gender", "Seat No."];
    const tableRows = ticketData.passengerDetails.map(passenger => [
      passenger.name,
      passenger.age.toString(),
      passenger.gender,
      passenger.seat
    ]);
    
    // Use the imported autoTable function directly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 120,
      theme: 'grid',
      headStyles: { fillColor: [41, 98, 255], textColor: [255, 255, 255] },
      margin: { top: 120, left: 14, right: 14 }
    });
    
    // Add payment information
    // Use the finalY property correctly from the returned object
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    doc.text("Payment Information", 14, finalY);
    
    doc.setFontSize(10);
    doc.text(`Amount Paid: NPR ${ticketData.totalAmount.toLocaleString()}`, 14, finalY + 10);
    doc.text(`Payment Method: ${ticketData.paymentMethod}`, 14, finalY + 17);
    
    // Add footer with terms and contact
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Terms & Conditions: Please arrive at least 15 minutes before departure. No refunds on confirmed bookings.", 105, 270, { align: "center" });
    doc.text("For assistance, contact: support@nepalbusticket.com | +977 01-4567890", 105, 275, { align: "center" });
    
    // Save the PDF with the booking ID as the filename
    doc.save(`ticket-${ticketData.bookingId}.pdf`);
  }
}
