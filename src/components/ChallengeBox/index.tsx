import React, { useCallback, useContext } from 'react';
import { ChallengeContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';
import styles from '../../styles/components/ChallengeBox.module.css'

const ChallengeBox: React.FC = () => {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
    const { resetCountdown } = useContext(CountdownContext)

    const handleChallengeState = (succeeded: boolean) => {
        succeeded ? completeChallenge() : resetChallenge()
        resetCountdown()
    }
    
    return (
        <div className={styles.container}>
            { activeChallenge ?
                (
                    <div className={styles.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} XP</header>
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} />
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>

                        <footer>
                            <button
                                type="button"
                                className={styles.challengeFailedButton}
                                onClick={() => handleChallengeState(false)}
                            >
                                Falhei
                            </button>
                            <button
                                type="button"
                                className={styles.challengeSucceededButton}
                                onClick={() => handleChallengeState(true)}
                            >
                                Completei
                            </button>
                        </footer>
                    </div>
                ) :
                (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de level completando desafios.
                    </p>
                    </div>
                )
            }
        </div>
    )
}

export default ChallengeBox;