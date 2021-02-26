import { useContext } from 'react'
import { ChallengeContext } from '../../contexts/ChallengesContext'
import styles from '../../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengeContext)

    return (
        <div className={styles.completedChallengerContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}