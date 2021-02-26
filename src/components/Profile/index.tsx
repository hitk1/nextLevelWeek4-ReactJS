import { useContext } from 'react'
import { ChallengeContext } from '../../contexts/ChallengesContext'
import styles from '../../styles/components/Profile.module.css'

export default function Profile() {
    const { level } = useContext(ChallengeContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/hitk1.png" alt="Luis Paulo" />
            <div>
                <strong>Luis Paulo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}