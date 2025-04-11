import React, { useEffect, useState } from "react";
import { getCardsByUserId } from "../../api/cards";
import CardsDisplay from "../../components/cardsDisplay/CardsDisplay";
import { imagesPlaceHolder } from "../../utils/GlobalVariables";
import { myCardsMock } from "../../api/mock";

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
            types: [''],
            rarity: ''
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
            types: [''],
            rarity: ''
        }
    ])

    useEffect(() => {
        const requestGetUserCards = async () => {
            try {
                const response = await getCardsByUserId();

                setUserCards(response);
                setDisplayCards(response);
            } catch (e) {
                setUserCards(myCardsMock);
                setDisplayCards(myCardsMock);
            }
        }

        requestGetUserCards()
    }, [])

    return <>
        <h1>
            Minhas cartas
        </h1>

        <CardsDisplay internal cards={displayCards} />
    </>
}