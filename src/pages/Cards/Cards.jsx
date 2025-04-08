import React, { useEffect, useState } from "react";
import { getCardsByUserId } from "../../api/cards";
import CardsDisplay from "../../components/cardsDisplay/CardsDisplay";
import Card from "../../components/card/Card";
import { imagesPlaceHolder } from "../../utils/GlobalVariables";

export default function Cards() {
    const [userCards, setUserCards] = useState([
        {
            name: '',
            averagePrice: 0.0,
            description: '',
            evolvesFrom: '',
            externalCode: '',
            images: {
                small: imagesPlaceHolder,
                large: imagesPlaceHolder,
            },
            subTypes: [''],
            types: ['']
        }
    ]);

    const [displayCards, setDisplayCards] = useState([
        {
            name: '',
            averagePrice: 0.0,
            description: '',
            evolvesFrom: '',
            externalCode: '',
            images: {
                small: imagesPlaceHolder,
                large: imagesPlaceHolder,
            },
            subTypes: [''],
            types: ['']
        }
    ])

    useEffect(() => {
        const requestGetUserCards = async () => {
            const response = await getCardsByUserId();

            setUserCards(response);
            setDisplayCards(response)
        }

        requestGetUserCards()
    }, [])

    return <>
        <h1>
            Minhas cartas
        </h1>

        {/* {
            displayCards.map(card => {
                return <div key={card.id}>
                    <Card image={card.images.small} name={card.name} />
                </div>
            })
        } */}

        <CardsDisplay internal cards={displayCards} />
    </>
}