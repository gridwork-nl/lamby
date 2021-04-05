import React, {useState, useEffect, useReducer} from 'react'
import './Player.scss'
import { IPlayerProp } from '../../interfaces/interfaces'
import {api} from '../../services/apiClient'

const Player: React.FC<IPlayerProp> = ({ player, instruction, updateView }) => {
  const [lastName, setLastName] = useState('');
  const [playerNumber, setPlayerNumber] = useState(0);
  useEffect(() => {
    async function getPlayerName(): Promise<void> {
      const result = await api.getPlayerById(player);
      setLastName(result.lastName)
      setPlayerNumber(result.playerNumber)
    }
    
    getPlayerName();
  }, []);

  function sayHello() {
    var currentElement = document.querySelector(`.${instruction.code}`);
   if (currentElement) currentElement.classList.add(instruction.move);

    setTimeout(() => {
       if (currentElement) currentElement.classList.remove(instruction.move);
    }, 3000)
  }

  const classes = `player-dot ${instruction.code}`
  
  return (
    <button key={player} onClick={() => {updateView(lastName, instruction.content); sayHello()}} className={classes}>
      <p>{playerNumber}</p>
    </button>
  )
}

export default Player
