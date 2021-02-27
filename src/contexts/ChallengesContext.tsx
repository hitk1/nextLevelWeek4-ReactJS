import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal';

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
    closeLevelUpModel: () => void
}

interface ChallengesProviderProps {
    children: ReactNode
    level: number,
    currentExperience: number,
    challengesCompleted: number
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export const ChallengesProvider = ({ children, ...restProps }: ChallengesProviderProps) => {
    const [level, setLevel] = useState(restProps.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(restProps.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(restProps.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null)
    const [isLevelUpModelOpen, setIsLevelUpModelOpen] = useState(false)

    const experienceToNextLevel = useMemo(() => Math.pow((level + 1) * 4, 2), [level])

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))

    }, [level, currentExperience, challengesCompleted])

    const levelUp = useCallback(() => {
        setLevel(lastLevel => lastLevel + 1)
        setIsLevelUpModelOpen(true)
    }, [level])

    const closeLevelUpModel = useCallback(() => {
        setIsLevelUpModelOpen(false)
    }, [])

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
            completeChallenge,
            closeLevelUpModel
        }}>
            {children}

            { isLevelUpModelOpen && <LevelUpModal /> }
        </ChallengeContext.Provider>
    )
}
