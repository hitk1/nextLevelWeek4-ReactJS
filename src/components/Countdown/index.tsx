import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ChallengeContext } from '../../contexts/ChallengesContext'
import { CountdownContext } from '../../contexts/CountdownContext'
import styles from '../../styles/components/Countdown.module.css'

export default function Countdown() {
    const { minutes, seconds, isFinished, isActive, resetCountdown, startCountdown } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = useMemo(() => String(minutes).padStart(2, '0').split(''), [minutes])
    const [secondLeft, secondRight] = useMemo(() => String(seconds).padStart(2, '0').split(''), [seconds])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { isFinished ?
                (
                    <button
                        disabled
                        type="button"
                        className={styles.coutdownButton}
                    >
                        Ciclo encerrado
                    </button>
                )

                :
                <>
                    { isActive ?
                        (
                            <button
                                type="button"
                                className={`${styles.coutdownButton} ${styles.coutdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar o ciclo
                            </button>
                        )
                        :
                        (
                            <button
                                type="button"
                                className={styles.coutdownButton}
                                onClick={startCountdown}
                            >
                                Iniciar um ciclo
                            </button>
                        )
                    }
                </>
            }
        </div>
    )
}