import React, { useContext } from 'react';
import { ChallengeContext } from '../../contexts/ChallengesContext';

import styles from '../../styles/components/LevelUpModal.module.css'

const LevelUpModal: React.FC = () => {

    const { level, closeLevelUpModel } = useContext(ChallengeContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type="button" onClick={closeLevelUpModel}>
                    <img src="/icons/close.svg" alt="Fechar" />
                </button>
            </div>
        </div>
    )
}

export default LevelUpModal;