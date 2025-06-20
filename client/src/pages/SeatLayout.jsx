import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { ArrowRightIcon, Clock as ClockIcon } from 'lucide-react';
import Loading from '../components/Loading';
import isoTimeFormat from '../lib/isoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
    }
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary/60 cursor-pointer text-xs ${
              selectedSeats.includes(seatId) ? "bg-primary text-white" : ""
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  const seatCounts = {
    A: 9, B: 9,
    C: 9, D: 8,
    E: 9, F: 8,
    G: 9, H: 8,
    I: 9, J: 8,
  };

  return show ? (
    <div className='flex flex-col md:flex-row gap-4 px-4 md:px-16 py-6'>
      {/* LEFT: Available Timings */}
      <div className='w-full md:w-56 bg-primary/10 border border-primary/20 rounded-lg py-6 px-4 h-max sticky top-32'>
        <p className='text-lg font-semibold text-center'>Available Timings</p>
        <div className='mt-4 space-y-2'>
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 justify-center py-2 rounded cursor-pointer transition 
                ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20 text-white/80'}`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Seat Layout */}
      <div className='flex-1 flex flex-col items-center mt-10'>
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

         <div className='flex flex-col items-center mt-2 mb-6'>
  <h1 className='text-2xl font-semibold text-white'>Select your seat</h1>
  <img src={assets.screenImage} alt="screen"  />
  <p className='text-white/70 text-sm mt-2 tracking-wide'>SCREEN SIDE</p>
</div>


       <div className="flex flex-col items-center gap-8 w-full max-w-[700px] mx-auto">
          {/* A and B rows */}
<div className="flex flex-row gap-16">
  <div className="flex flex-col gap-2">
    {["A", "B"].map(row => renderSeats(row))}
  </div>
</div>


          {/* C-D and E-F */}
          <div className="flex flex-row gap-16">
            <div className="flex flex-col gap-2">
              {["C", "D"].map(row => renderSeats(row))}
            </div>
            <div className="flex flex-col gap-2">
              {["E", "F"].map(row => renderSeats(row))}
            </div>
          </div>

          {/* G-H and I-J */}
          <div className="flex flex-row gap-16">
            <div className="flex flex-col gap-2">
              {["G", "H"].map(row => renderSeats(row))}
            </div>
            <div className="flex flex-col gap-2">
              {["I", "J"].map(row => renderSeats(row))}
            </div>
          </div>
        </div>

            <button onClick={()=> navigate('/my-booking')} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
              Procced to Checkout
              <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
            </button>

      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout; // ✅ Now correctly placed
