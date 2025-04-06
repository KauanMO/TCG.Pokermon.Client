import React, { useEffect, useState } from "react";
import { getCardSets } from "../../api/cardsets";

export default function Shop() {
    const [cardSets, setCardSets] = useState([])

    useEffect(() => {
        const requestCardSets = async () => {
            const response = await getCardSets();

            setCardSets(response);
        }

        requestCardSets();
    }, [])

    return <>
        <h1>Loja</h1>

        <h2>Pacotinhos</h2>

        {
            cardSets.map(set => {
                return <a href={`cardset/${set.id}`} key={set.id}>
                    <div>
                        {set.name}
                    </div>
                </a>
            })
        }
    </>
}