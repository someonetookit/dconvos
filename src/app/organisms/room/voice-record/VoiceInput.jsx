import React from 'react'
import styles from './VoiceInput.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import PauseIcon from '@mui/icons-material/Pause';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export default function VoiceInput() {
  return (
    <div>
        <div className={styles.conatiner}>
            <DeleteIcon sx={{color:'red'}}/>
            <div className={styles.progress}></div>
            <PauseIcon sx={{color:'var(--text-primary)'}} />
            <StopCircleIcon sx={{color:'var(--text-primary)'}}/>    
        </div>    
    </div>
  )
}
