
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export type Seat = {
  id: string;
  number: string;
  status: 'available' | 'booked' | 'selected' | 'reserved' | 'unavailable';
  price: number;
};

type SeatMapProps = {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  maxSelectableSeats: number;
};

const SeatMap = ({ seats, onSeatSelect, maxSelectableSeats }: SeatMapProps) => {
  // Group seats into rows (A1-A4, B1-B4, etc.)
  const groupedSeats: { [key: string]: Seat[] } = {};
  
  seats.forEach((seat) => {
    const rowLetter = seat.number.charAt(0);
    if (!groupedSeats[rowLetter]) {
      groupedSeats[rowLetter] = [];
    }
    groupedSeats[rowLetter].push(seat);
  });
  
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available' || seat.status === 'selected') {
      onSeatSelect(seat);
    }
  };
  
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Bus front */}
      <div className="relative h-16 w-24 mx-auto mb-6 mt-4">
        <div className="absolute inset-0 bg-gray-200 rounded-t-3xl"></div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-14 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center w-full">
          <span className="text-xs font-medium text-gray-600">FRONT</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center items-center mb-8 flex-wrap gap-4">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-white border border-gray-300 mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-primary mr-2"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-gray-200 mr-2"></div>
          <span className="text-sm">Booked</span>
        </div>
      </div>
      
      {/* Seat Map */}
      <div className="p-6 bg-gray-50 rounded-xl">
        <div className="space-y-4">
          {Object.keys(groupedSeats).sort().map((rowLetter) => (
            <div key={rowLetter} className="flex justify-center items-center space-x-2">
              {/* Row label */}
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-sm font-medium">{rowLetter}</span>
              </div>
              
              {/* Seats */}
              <div className="flex space-x-3">
                {groupedSeats[rowLetter].sort((a, b) => {
                  const aNum = parseInt(a.number.substring(1));
                  const bNum = parseInt(b.number.substring(1));
                  return aNum - bNum;
                }).map((seat, index) => (
                  <React.Fragment key={seat.id}>
                    <SeatButton 
                      seat={seat} 
                      onClick={() => handleSeatClick(seat)} 
                    />
                    {/* Add aisle after every 2 seats */}
                    {index === 1 && <div className="w-8"></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type SeatButtonProps = {
  seat: Seat;
  onClick: () => void;
};

const SeatButton = ({ seat, onClick }: SeatButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-200",
        seat.status === 'available' && "bg-white border border-gray-300 hover:border-primary hover:shadow-sm",
        seat.status === 'selected' && "bg-primary text-white",
        seat.status === 'booked' && "bg-gray-200 text-gray-500 cursor-not-allowed",
        seat.status === 'reserved' && "bg-yellow-100 border border-yellow-300 text-yellow-800 cursor-not-allowed",
        seat.status === 'unavailable' && "bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={['booked', 'reserved', 'unavailable'].includes(seat.status)}
    >
      {seat.number}
    </button>
  );
};

export default SeatMap;
