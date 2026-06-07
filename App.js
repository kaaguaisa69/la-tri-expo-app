import React, { useState } from 'react';
import AnimatedSplash from './src/components/AnimatedSplash';
import HomeScreen from './src/components/HomeScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <AnimatedSplash onComplete={() => setShowSplash(false)} />;
  }

  return <HomeScreen />;
}