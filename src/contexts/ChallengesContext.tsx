import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import challenges from '../../challenges.json'

interface IChallenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengeContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    levelUp: () => void,
    startNewChallenge: () => void,
    activeChallenge: IChallenge,
    resetChallenge: () => void
    experienceToNextLevel: number
    completeChallenge: () => void
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null)

    const experienceToNextLevel = useMemo(() => Math.pow((level + 1) * 4, 2), [level])

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    const levelUp = useCallback(() => {
        setLevel(lastLevel => lastLevel + 1)
    }, [level])

    const startNewChallenge = useCallback(() => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const choosedChallenge = challenges[randomChallengeIndex]
        
        setActiveChallenge(choosedChallenge as IChallenge)

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', { body: `Valendo ${choosedChallenge.amount} XP!` })
            new Audio('/notification.mp3').play()
        }

    }, [])

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null)
    }, [])

    const completeChallenge = useCallback(() => {
        if (!activeChallenge)
            return null

        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setChallengesCompleted(challengesCompleted + 1)
        resetChallenge()
    }, [activeChallenge])

    return (
        <ChallengeContext.Provider value={{
            level,
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge
        }}>
            {children}
        </ChallengeContext.Provider>
    )
}
