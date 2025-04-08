import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCardSetById } from "../../api/cardsets";
import { getFormattedCurrency } from "../../utils/StringHelper";
import { cardsDisplayCount } from "../../utils/GlobalVariables";
import { imagesPlaceHolder } from "../../utils/GlobalVariables";
import { cardSetCardsMock } from "../../api/mock";
import CardsDisplay from "../../components/cardsDisplay/CardsDisplay";
import styles from './CardSet.module.css';

export default function CardSet() {
    const [getCardsPage, setGetCardsPage] = useState(1);
    const [cardsTotalPages, setCardsTotalPages] = useState(0);

    const [cardSetInfo, setCardSetInfo] = useState({
        cardSet: {
            id: 0,
            externalId: '',
            firstCardImage: '',
            secondCardImage: '',
            thirdCardImage: '',
            logo: imagesPlaceHolder,
            name: '',
            price: 0.0,
            series: '',
            symbol: imagesPlaceHolder
        },
        cards: [{
            name: '',
            price: 0.0,
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
        }]
    });

    let params = useParams();

    useEffect(() => {
        const requestCardSet = async () => {
            try {
                const response = await getCardSetById(params.cardSetId, getCardsPage);
                console.log(response);

                setCardSetInfo(response);
                setCardsTotalPages(Math.ceil(response.totalCount / cardsDisplayCount));
            } catch (e) {
                setCardSetInfo(cardSetCardsMock[getCardsPage - 1]);
                setCardsTotalPages(Math.ceil(cardSetCardsMock[getCardsPage - 1].totalCount / cardsDisplayCount));
            }
        }

        requestCardSet();
    }, [params.cardSetId, getCardsPage])

    return <div className={styles.cardset_container}>
        <div className={styles.cardset_info}>
            <img src={cardSetInfo.cardSet.logo} alt={'Card set symbol'} width={'200px'} />
            <h2>Da série: {cardSetInfo.cardSet.series}</h2>
            <h2>Preço: {getFormattedCurrency(cardSetInfo.cardSet.price)}</h2>
        </div>

        <CardsDisplay cards={cardSetInfo.cards} />

        <div className={styles.page_controller}>
            <span onClick={() => { if (getCardsPage - 1 > 0) setGetCardsPage(getCardsPage - 1) }}>{'<'}</span>
            Página: {getCardsPage} / {cardsTotalPages}
            <span onClick={() => { if (getCardsPage + 1 <= cardsTotalPages) setGetCardsPage(getCardsPage + 1) }}>{'>'}</span>
        </div>
    </div>
}