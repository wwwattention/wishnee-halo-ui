'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [wish, setWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // ????????? ??????? ? localStorage
    localStorage.setItem('userWish', wish);
    
    // ???????? ? ??????? ? ??????? ?? ???????? ????????
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setWish(suggestion);
  };
  
  const suggestions = ['Health', 'Wealth', 'Balance', 'Growth', 'Freedom'];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center
                  bg-white bg-[linear-gradient(rgba(228,29,42,0.15)_1px,transparent_1px),
                     linear-gradient(90deg,rgba(228,29,42,0.15)_1px,transparent_1px)]
                  bg-[size:40px_40px]">
      <div className="absolute top-8 left-10">
        <div className="text-cherry-red text-2xl font-bold tracking-tight">WISHNEE</div>
      </div>
      
      <motion.div 
        className="text-center px-4 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-cherry-red mb-8
                     tracking-tight shadow-cherry">
          Tell me what you wish
        </h1>
        
        <form onSubmit={handleSubmit} className="w-full">
          <input 
            type="text"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            className="input-primary"
            placeholder="??????? ???? ???????..."
            disabled={isSubmitting}
            autoFocus
          />
          <p className="text-gray-500 text-sm mt-2">??????? Enter ??? ????????</p>
          
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isSubmitting}
                className="suggestion-chip"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </motion.div>
      
      {isSubmitting && (
        <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none">
          {Array.from({ length: 10 }).map((_, index) => {
            const delay = index * 0.15;
            const posX = 10 + Math.random() * 80;
            const duration = 2 + Math.random() * 3;
            
            return (
              <motion.div
                key={index}
                className="absolute bottom-0 cherry-svg"
                style={{
                  left: `${posX}%`,
                  width: '60px',
                  height: '60px',
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: [0, -window.innerHeight],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 10, -5, 15]
                }}
                transition={{
                  duration,
                  delay,
                  ease: 'easeOut'
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}