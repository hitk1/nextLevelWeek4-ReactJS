import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";

interface CountdownProvirderProps {
    children: ReactNode
}

interface CountdownContextData {
    minutes: number
    seconds: number
    onCountdownClick: (value: boolean) => void
    isFinished: boolean
    isActive: boolean
    startCountdown: () => void
    resetCountdown: () => void
}

let countdownTimeout: NodeJS.Timeout
const timeCountdown = 0.05 * 60

export const CountdownContext = createContext({} as CountdownContextData)

export const CountdownProvider = ({ children }: CountdownProvirderProps) => {
    const { startNewChallenge } = useContext(ChallengeContext)

    const [time, setTime] = useState(timeCountdown)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const minutes = useMemo(() => Math.floor(time / 60), [time])
    const seconds = useMemo(() => time % 60, [time])

    const onCountdownClick = useCallback((value: boolean) => {
        setIsActive(value)
        if (!value) {
            clearTimeout(countdownTimeout)
            setTime(timeCountdown)
        } else
            setIsFinished(false)
    }, [isActive, isFinished, time])

    const startCountdown = useCallback(() => {
        setIsActive(true)
        setIsFinished(false)
    }, [isActive, isFinished])

    const resetCountdown = useCallback(() => {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(timeCountdown)
        setIsFinished(false)
    }, [isActive, time])

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setIsFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, isFinished, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            onCountdownClick,
            isFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}