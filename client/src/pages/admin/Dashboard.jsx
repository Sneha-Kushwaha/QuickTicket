import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title.jsx';
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
    </>
  ) : <Loading />;
};

export default Dashboard;
