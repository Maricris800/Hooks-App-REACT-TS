import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import { HooksApp } from './HooksApp'
//import App from './App.tsx'
//import { TrafficLight } from './useState/TrafficLight'
//import { TrafficLightWithEffect } from './useEffect/TrafficLightWithEffect'
//import { TrafficLightWithHook } from './useEffect/TrafficLightWithHook'
//import { PokemonPage } from './examples/PokemonPage'
//import { FocusScreen } from './useRef/FocusScreen'
//import { TaskApp } from './useReducer/TaskApp'
import { ScrambleWords } from './useReducer/reducer/ScrambleWords'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HooksApp/> */}
    {/* <TrafficLight/> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook/> */}
    {/* <PokemonPage/> */}
    {/* <FocusScreen/> */}
    {/* <TaskApp/> */}
    <ScrambleWords/>
  </StrictMode>,
)
