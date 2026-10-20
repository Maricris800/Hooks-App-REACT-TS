import { useEffect, useState } from "react";

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate pulse',
    green: 'bg-green-500 animate-pulse',
};

//type TrafficLightColors = 'red' | 'yellow' | 'green';
type TrafficLightColors = keyof typeof colors;

export const useTrafficLight = () => {
  const [light, setLight] = useState<TrafficLightColors>('red');
    const [countdown, setCountdown] = useState(5);

   //countdown effect
    useEffect(() => {
      if (countdown === 0) return;
     
      const intervalId = setInterval(() => {
        console.log('setInterval llamado');
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      }

    }, [countdown]);

    useEffect(() => {
      
      if (countdown > 0) {
        setCountdown(5);
        if (light === 'red') {
          setLight('green'); 
          return;         
        }
        if (light === 'green') {
          setLight('yellow'); 
          return         
        }
        if (light === 'yellow') {
          setLight('red'); 
          return;         
        }
        return;
      }      

    }, [countdown , light]);

    return {
        //Props
        countdown,
        light,
        colors,

        //Computed
        percentage: (countdown / 5) * 100,
        greenLight: light === 'green' ? colors.green : 'bg-gray-500',
        redLight: light === 'red' ? colors.red : 'bg-gray-500',
        yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
        //Methods
    }
}

