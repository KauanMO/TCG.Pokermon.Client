import React, { useEffect, useState } from "react";
import { getCardSets } from "../../api/cardsets";
import { cardSetMock } from "../../api/mock";
import CardSetDisplay from "../../components/cardSetDisplay/CardSetDisplay";
import styles from './Shop.module.css';

export default function Shop() {
    const [cardSets, setCardSets] = useState([])

    useEffect(() => {
        const requestCardSets = async () => {
            try {
                const response = await getCardSets();

                setCardSets(response);
            } catch (e) {
                setCardSets(cardSetMock);
            }
        }

        requestCardSets();
    }, [])

    return <>
        <h1>Loja</h1>
        <h2>Pacotinhos</h2>

        <div className={styles.cardsets_container}>
            <CardSetDisplay cardSets={cardSets} />
        </div>
    </>
}