import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, TrendingUp, MapPin, Bookmark } from 'lucide-react';

interface TweetCardProps {
  id: number;
  handle: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  hashtags: string[];
  image?: string;
  location?: string;
  likes: number;
  retweets: number;
  replies: number;
  trend: string;
  trendRank: number;
  accentColor: string;
}

const travelTrends: TweetCardProps[] = [
  {
    id: 1,
    handle: 'TravelTomorrowX',
    username: 'Travel Tomorrow',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    time: '3d',
    content:
      'Top destinations travellers are choosing for coolcations in 2026 — searches have surged 74% YoY. Iceland +85%, Norway fjords, Greenland glaciers & the Scottish Highlands are the hottest cold spots 🧊 Climate change is reshaping where we go.',
    hashtags: ['#Coolcations', '#GlobalWarming', '#travel', '#Iceland'],
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    location: 'Iceland',
    likes: 4821,
    retweets: 1203,
    replies: 387,
    trend: '#Coolcations',
    trendRank: 1,
    accentColor: '#60a5fa',
  },
  {
    id: 2,
    handle: 'marinij',
    username: 'Marin IJ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    time: '4d',
    content:
      'Travel trends for 2026 are out — and it\'s all about "Whycations". Travelers want to UNPLUG and deeply appreciate their destination. No content, no filters, just presence. Sustainable, slow, and intentional travel is having its moment.',
    hashtags: ['#Whycations', '#SlowTravel', '#TravelTrends2026'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    location: 'Kyoto, Japan',
    likes: 9341,
    retweets: 3102,
    replies: 612,
    trend: '#Whycations',
    trendRank: 2,
    accentColor: '#86efac',
  },
  {
    id: 3,
    handle: 'NightSkyNomad',
    username: 'Night Sky Nomad',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    time: '2d',
    content:
      'Astrotourism is officially booming. Remote dark-sky reserves in Namibia, Atacama Desert & New Zealand are fully booked through September. People are ditching city lights to reconnect with the cosmos. The universe has become the destination.',
    hashtags: ['#Astrotourism', '#DarkSky', '#Stargazing', '#travel'],
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    location: 'Atacama Desert, Chile',
    likes: 12890,
    retweets: 4567,
    replies: 892,
    trend: '#Astrotourism',
    trendRank: 3,
    accentColor: '#a78bfa',
  },
  {
    id: 4,
    handle: 'DigitalDetoxTravel',
    username: 'Digital Detox Travel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    time: '1d',
    content:
      'Phone-free resort bookings up 312% in 2026. People are paying PREMIUM prices to hand their devices in at the door. Bali, Tuscany, and Patagonia are leading the trend. The most luxurious thing you can offer travelers now? Silence.',
    hashtags: ['#DigitalDetox', '#OfflineTravel', '#Wellness', '#Mindful'],
    image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80',
    location: 'Ubud, Bali',
    likes: 18234,
    retweets: 6841,
    replies: 1247,
    trend: '#DigitalDetox',
    trendRank: 4,
    accentColor: '#fbbf24',
  },
  {
    id: 5,
    handle: 'SoloWandererCo',
    username: 'Solo Wanderer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80',
    time: '5h',
    content:
      'Solo female travel is at an all-time high in 2026. Georgia (country), Albania & Vietnam are trending as the top 3 safest and most affordable solo destinations. Women-only travel communities on X have grown 400% this year. The solo era is here.',
    hashtags: ['#SoloTravel', '#WomenWhoTravel', '#FemaleTravel', '#travel'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    location: 'Tbilisi, Georgia',
    likes: 22103,
    retweets: 8920,
    replies: 1891,
    trend: '#SoloTravel',
    trendRank: 5,
    accentColor: '#f472b6',
  },
];

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

const TweetCard: React.FC<{ tweet: TweetCardProps }> = ({ tweet }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="group relative bg-white/60 backdrop-blur-sm border border-white/80 rounded-[28px] p-6 flex flex-col gap-4 hover:bg-white/80 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Rank badge */}
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black text-white shadow-md"
        style={{ backgroundColor: tweet.accentColor }}
      >
        #{tweet.trendRank}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 pr-8">
        <img
          src={tweet.avatar}
          alt={tweet.username}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow"
          crossOrigin="anonymous"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-[14px] text-gray-900 truncate">{tweet.username}</span>
          <span className="text-[12px] text-gray-400">@{tweet.handle} · {tweet.time}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-[13.5px] text-gray-700 leading-relaxed">{tweet.content}</p>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-1.5">
        {tweet.hashtags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{
              color: tweet.accentColor,
              backgroundColor: `${tweet.accentColor}18`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Image */}
      {tweet.image && (
        <div className="rounded-[18px] overflow-hidden h-[160px] relative">
          <img
            src={tweet.image}
            alt="Travel"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            crossOrigin="anonymous"
          />
          {tweet.location && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <MapPin size={10} className="text-white" />
              <span className="text-[10px] text-white font-semibold">{tweet.location}</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors group/btn">
          <MessageCircle size={15} className="group-hover/btn:scale-110 transition-transform" />
          <span className="text-[12px] font-medium">{formatNumber(tweet.replies)}</span>
        </button>
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-green-500 transition-colors group/btn">
          <Repeat2 size={15} className="group-hover/btn:scale-110 transition-transform" />
          <span className="text-[12px] font-medium">{formatNumber(tweet.retweets)}</span>
        </button>
        <button
          className="flex items-center gap-1.5 transition-colors group/btn"
          style={{ color: liked ? '#ef4444' : undefined }}
          onClick={() => setLiked(!liked)}
        >
          <Heart
            size={15}
            className={`group-hover/btn:scale-110 transition-transform ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
          <span className="text-[12px] font-medium" style={{ color: liked ? '#ef4444' : '#9ca3af' }}>
            {formatNumber(tweet.likes + (liked ? 1 : 0))}
          </span>
        </button>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className="transition-colors"
          style={{ color: bookmarked ? tweet.accentColor : '#9ca3af' }}
        >
          <Bookmark
            size={15}
            className={bookmarked ? 'fill-current' : ''}
          />
        </button>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Share size={15} />
        </button>
      </div>
    </div>
  );
};

export const TravelTrendsFeed: React.FC = () => {
  return (
    <div className="w-full bg-[#F3F4F6] px-4 md:px-8 pb-12 font-sans relative overflow-hidden">
      {/* Background pattern (same as BentoBox) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-black rounded-full shadow-md">
              <TrendingUp size={14} className="text-white" />
              <span className="text-[12px] font-black text-white uppercase tracking-widest">Trending on X</span>
            </div>
            <span className="text-[13px] text-gray-400 font-medium">Top 5 travel posts right now</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium hidden md:block">Apr 27, 2026</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large featured card */}
          <div className="sm:col-span-2 lg:col-span-2">
            <TweetCard tweet={travelTrends[0]} />
          </div>
          <div>
            <TweetCard tweet={travelTrends[1]} />
          </div>
          <div>
            <TweetCard tweet={travelTrends[2]} />
          </div>
          <div>
            <TweetCard tweet={travelTrends[3]} />
          </div>
          <div>
            <TweetCard tweet={travelTrends[4]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTrendsFeed;
