import React, { useEffect, useState } from "react";
import { getCardSets } from "../../api/cardsets";
import { cardSetMock } from "../../api/mock";

export default function Shop() {
    const [cardSets, setCardSets] = useState([])

    useEffect(() => {
        const requestCardSets = async () => {
            try {
                const response = await getCardSets();

                setCardSets(response);
            } catch (e) {
                setCardSets(cardSetMock)
            }
        }

        requestCardSets();
    }, [])

    return <>
        <h1>Loja</h1>

        <h2>Pacotinhos</h2>

        {
            cardSets.map(set => {
                return <a href={`cardset/${set.id}`} key={set.id}>
                    <img src={set.logo} alt={set.id} width={'200px'} />
                </a>
            })
        }
    </>
}