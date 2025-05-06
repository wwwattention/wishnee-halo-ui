'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// ???? ??? ????????? ???????
type WishCategory = 'health' | 'wealth' | 'balance' | 'growth' | 'freedom' | 'other';

interface SphereProps {
  type: 'health' | 'wealth';
  title: string;
  subtitle: string;
  isActive: boolean;
}

// ????????? ?????
const Sphere = ({ type, title, subtitle, isActive }: SphereProps) => {
  // ????? ? ??????????? ?? ???? ?????
  const colors = {
    health: {
      light: '#4ECDC4',
      main: '#00BFA5',
      dark: '#007F6E'
    },
    wealth: {
      light: '#F24C57',
      main: '#E41D2A',
      dark: '#B3151F'
    }
  };
  
  const color = colors[type];
  
  return (
    <motion.div
      className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center
                text-white text-center p-4 overflow-hidden cursor-pointer
                shadow-lg ${isActive ? 'z-10' : 'z-4'}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color.light}, ${color.dark})`
      }}
      initial={{ y: 0 }}
      animate={{ 
        y: isActive ? -20 : [0, -15, 0],
        scale: isActive ? 1.1 : 1,
        boxShadow: isActive 
          ? `0 0 50px rgba(${type === 'health' ? '0, 191, 165' : '228, 29, 42'}, 0.6)`
          : '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}
      transition={{
        y: {
          duration: isActive ? 0.5 : 6,
          repeat: isActive ? 0 : Infinity,
          ease: isActive ? 'easeOut' : 'easeInOut'
        },
        scale: {
          duration: 0.5
        }
      }}
    >
      {/* ?????? ???????? */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-2/5"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderTopLeftRadius: '60%',
          borderTopRightRadius: '60%'
        }}
        animate={{
          borderTopLeftRadius: ['60%', '40%', '80%'],
          borderTopRightRadius: ['80%', '40%', '60%'],
          y: ['10%', '0%', '10%'],
          scaleX: [1.1, 1, 0.9],
          scaleY: [0.9, 1, 1.1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <div className="z-1 relative">
        <div className="text-xl font-semibold mb-1">{title}</div>
        <div className="text-sm font-light opacity-90">{subtitle}</div>
      </div>
    </motion.div>
  );
};

// ????????? ? ?????????????? ???????
const CherryAnimation = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {Array.from({ length: 15 }).map((_, index) => {
        const size = 30 + Math.random() * 80;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 5 + Math.random() * 6;
        
        return (
          <motion.div
            key={index}
            className="cherry-svg absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${posX}%`,
              top: `${posY}%`,
            }}
            animate={{ 
              y: [0, -20, 0, 15, 0],
              rotate: [0, 5, -2, 3, 0],
              x: [0, 10, -5, 8, 0]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );
      })}
    </div>
  );
};

export default function Dashboard() {
  const [wish, setWish] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<WishCategory | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // ???????? ??????????? ??????? ?? localStorage
    const storedWish = localStorage.getItem('userWish');
    
    if (!storedWish) {
      // ???? ??? ???????????? ???????, ?????????????? ?? Landing
      router.push('/landing');
      return;
    }
    
    setWish(storedWish);
    
    // ??????? ?????? ??????? ??? ??????????? ?????????
    const wishLower = storedWish.toLowerCase();
    if (wishLower.includes('health') || wishLower.includes('????????')) {
      setActiveCategory('health');
    } else if (wishLower.includes('wealth') || wishLower.includes('money') || 
               wishLower.includes('?????????') || wishLower.includes('??????')) {
      setActiveCategory('wealth');
    }
  }, [router]);
  
  // ??????? ??? ?????????? ?????? ???????
  const handleAddWish = () => {
    router.push('/landing');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden relative">
      {/* ???? */}
      <div className="absolute top-8 left-10 z-10">
        <div className="text-cherry-red text-2xl font-bold tracking-tight">WISHNEE</div>
      </div>
      
      {/* ????????????? ????? */}
      <CherryAnimation />
      
      {/* ???????? ??????? */}
      <div className="container mx-auto px-4 py-20 pt-32 relative z-10">
        <motion.div 
          className="glass-panel rounded-3xl p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-cherry-red mb-4">
            ???? ???????
          </h1>
          
          <blockquote className="text-xl italic border-l-4 border-cherry-red pl-4 mb-8">
            "{wish}"
          </blockquote>
          
          <div className="mt-10 text-center">
            <button 
              onClick={handleAddWish}
              className="btn-primary"
            >
              ???????? ????? ???????
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* ????? */}
      <div className="fixed bottom-10 left-10">
        <Sphere 
          type="wealth" 
          title="Wealth" 
          subtitle="Abundance & growth" 
          isActive={activeCategory === 'wealth'} 
        />
      </div>
      
      <div className="fixed bottom-10 right-10">
        <Sphere 
          type="health" 
          title="Health" 
          subtitle="Support & nurture" 
          isActive={activeCategory === 'health'} 
        />
      </div>
    </div>
  );
}