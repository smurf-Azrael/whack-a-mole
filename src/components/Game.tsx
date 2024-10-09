// src/components/Game.tsx  
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';  
import { debounce } from '../utils/debounce';  
import '../styles/styles.css';  
import { GameEngine } from '../game/engine/GameEngine';  
import Mole from './Mole';  

const DIFFICULTY_SETTINGS = {  
  easy: 2000,  
  medium: 1500,  
  hard: 1000,  
};  

const Game: React.FC = () => {  
  const gameEngineRef = useRef(new GameEngine());  
  const [activeCircle, setActiveCircle] = useState<number | null>(null);  
  const [timeElapsed, setTimeElapsed] = useState(0);  
  const [isGameActive, setIsGameActive] = useState(false);  
  const [totalClicks, setTotalClicks] = useState(0);  
  const [isWinMsg, setIsWinMsg] = useState(false);
  const [isClickTime, setIsClickTime] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');  

  const intervalRef = useRef<number | undefined>();  
  const clickCountRef = useRef<number>(0);  

  const resetClickCount = useMemo(  
    () =>  
      debounce(() => {  
        clickCountRef.current = 0;  
      }, 500),  
    []  
  );  

  const startGame = useCallback(() => {  
    setTimeElapsed(0);  
    setTotalClicks(0);  
    setIsGameActive(true);  
    setIsWinMsg(false)
    setIsClickTime(true)
    clickCountRef.current = 0;  
  }, []);  

  const handleCircleClick = useCallback(  
    (index: number) => {  
      setTotalClicks((prev) => prev + 1);  
      if (gameEngineRef.current.mole.isVisible && index === activeCircle) {  
        // gameEngineRef.current.mole.hide();  
        setIsWinMsg(true)
        setActiveCircle(null);  

        // Stop game and update high scores  
        setTimeout(() => {
          alert(`Gotcha! Time to catch: ${timeElapsed} seconds and ${totalClicks + 1} clicks`);
          console.log("I am ehre")
          setIsGameActive(false)

        }, 0);

      }  
      clickCountRef.current += 1;  
      resetClickCount();  
    },  
    [activeCircle, timeElapsed, totalClicks, isWinMsg, resetClickCount]  
  );  

  useEffect(() => {  
    if (isGameActive) {  
      gameEngineRef.current.mole.hide();  

      intervalRef.current = window.setInterval(() => {  
        if (clickCountRef.current <= 5) {  
          const randomCircle = gameEngineRef.current.generateRandomCircle(3);  
          const hideDuration = gameEngineRef.current.generateRandomDuration(200, 400);  

          setActiveCircle(randomCircle);  
          gameEngineRef.current.mole.show();  

          setTimeout(() => {  
            gameEngineRef.current.mole.hide();  
            setActiveCircle(null);  
          }, hideDuration);  
        }  
      }, DIFFICULTY_SETTINGS[difficulty]);  

      const timeInterval = setInterval(() => {  
        setTimeElapsed((prev) => prev + 1);  
      }, 1000);  

      return () => {  
        clearInterval(intervalRef.current!);  
        clearInterval(timeInterval);  
      };  
    }  
  }, [isGameActive, difficulty]);  
  const difficultyLevels = ['easy', 'medium', 'hard']; // Dynamic difficulty levels

  return (
    <div className='container container__narrow'>
      <h1 className='title'>MetaPals Whack-a-Mole!</h1>
  
      <div className="difficulty-selection">
        {difficultyLevels.map((level) => (
          <label key={level}>
            <input
              type="radio"
              value={level}
              checked={difficulty === level}
              onChange={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
            />
            {level.charAt(0).toUpperCase() + level.slice(1)} {/* Capitalize first letter */}
          </label>
        ))}
      </div>
  
      <div className="game-container">
        {[0, 1, 2].map((circleIndex) => (
          <div
            key={circleIndex}
            className="circle"
            onClick={() => handleCircleClick(circleIndex)}
          >
            <Mole
              isVisible={gameEngineRef.current.mole.isVisible}
              circleIndex={circleIndex}
              activeCircle={activeCircle}
            />
          </div>
        ))}
      </div>
  
      <div className="info">
        {isWinMsg && (
          <div className='win_message'>
            You Win!
          </div>
        )}
        {isClickTime && (
          <>
            <div>Clicks: {totalClicks}</div>
            <div>Elapsed time: {timeElapsed} seconds</div>
          </>
        )}
      </div>
  
      <div className='button'>
        <button onClick={startGame} disabled={isGameActive}>
          Start
        </button>
      </div>
    </div>
  );
  
//   return (  
//     <div className='container container__narrow'>  
//       <h1 className='title'>MetaPals Whack-a-Mole!</h1>  
       
//       <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}>  
//         <option value="easy">Easy</option>  
//         <option value="medium">Medium</option>  
//         <option value="hard">Hard</option>  
//       </select>  
//       <div className="game-container">  
//         {[0, 1, 2].map((circleIndex) => (  
//           <div  
//             key={circleIndex}  
//             className="circle"  
//             onClick={() => handleCircleClick(circleIndex)}  
//           >  
//             <Mole  
//               isVisible={gameEngineRef.current.mole.isVisible}  
//               circleIndex={circleIndex}  
//               activeCircle={activeCircle}  
//             />  
//           </div>  
//         ))}  
//       </div>  
     
//        <div className="info">
//           {isWinMsg && (<div className='win_message'>
//             You Win!
//           </div>)}
//           {isClickTime && (  
//             <>
//               <div>Clicks: {totalClicks}</div>  
//               <div>Elapsed time: {timeElapsed} seconds</div>  
//             </>
//           )}  
//        </div> 
//       <div className='button'>
//        <button onClick={startGame}  disabled={isGameActive}>  
//         Start  
//       </button> 
//       </div>
       
//     </div>  
    
//   );  
};  

export default Game;