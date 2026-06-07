/**
 * Importación de React y el hook de estado.
 */
import React, { useState } from 'react';

/**
 * Importaciones de componentes locales para las pantallas principales.
 */
import AnimatedSplash from './src/components/AnimatedSplash';
import HomeScreen from './src/components/HomeScreen';

/**
 * Componente principal y punto de entrada de la aplicación.
 * Funciona como un enrutador simple manejando la visibilidad del splash screen
 * frente a la pantalla de inicio (dashboard) a través de un estado local.
 * 
 * @returns {JSX.Element} El componente raíz de la aplicación a renderizar.
 */
export default function App() {
  /**
   * Estado local para determinar qué pantalla mostrar.
   * Por defecto es true para mostrar el Splash Screen al inicio.
   * 
   * @type {[boolean, function]} Array que contiene el estado booleano y su función de actualización.
   */
  const [showSplash, setShowSplash] = useState(true);

  // Si showSplash es verdadero, muestra la pantalla animada de inicio
  if (showSplash) {
    return <AnimatedSplash onComplete={() => setShowSplash(false)} />;
  }

  // Si showSplash es falso, procede a mostrar la pantalla principal (Home)
  return <HomeScreen />;
}