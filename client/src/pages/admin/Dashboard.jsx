import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title.jsx';
import { dateFormat } from '../../lib/dateFormat.js';
import BlurCircle from '../../components/BlurCircle.jsx';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeUser: 0,
    activeShows: [],       
    totalUser: 0  
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    {title: "Total Revenue", value: dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon },
    {title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
    {title: "Total User", value: dashboardData.totalUser || "0", icon: UsersIcon }
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className='flex flex-wrap gap-4 w-full'>
          {dashboardCards.map((card, index)=>(
            <div key={index} className='flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md w-[220px] text-white'> 
            <div>
              <h1 className='text-sm'>{card.title}</h1>
             <p className='text-2xl font-bold mt-1'>
              {card.title === "Total Revenue" ? currency : ''}
              {card.value}
              </p>
            </div>
            <card.icon className='w-6 h-6 text-white'/>
            </div>
          ))}
        </div>
      </div>

     <p className="mt-10 text-lg font-medium">Active Shows</p>
     <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 max-w-6xl x-10">
  <BlurCircle top="100px" left="-10%" className="absolute z-0"/>
  {dashboardData.activeShows.map((show) => (
    <div key={show._id} className="w-full rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300">
      <img src={show.movie.poster_path} alt='' className="h-60 w-full object-cover" />
      <p className="font-medium p-2 truncate">{show.movie.title}</p>
      <div className="flex items-center justify-between px-2">
        <p className="text-lg font-medium">{currency}{show.showPrice}</p>
        <p className="flex items-center gap-1 text-sm 
          text-gray-400 mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          {show.movie.vote_average.toFixed(1)}
        </p>
      </div>
      <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.showDateTime)}</p>
    </div>
  ))}
</div>

    </>
  ) : <Loading />;
};

export default Dashboard;
