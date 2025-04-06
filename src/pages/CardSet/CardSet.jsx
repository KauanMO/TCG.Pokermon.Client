import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCardSetById } from "../../api/cardsets";
import { getFormattedCurrency } from "../../utils/StringHelper";
import styles from './CardSet.module.css';
import { cardsDisplayCount } from "../../utils/GlobalVariables";

export default function CardSet() {
    const [getCardsPage, setGetCardsPage] = useState(1);
    const [cardsTotalPages, setCardsTotalPages] = useState(0);

    const [cardSetInfo, setCardSetInfo] = useState({
        cardSet: {
            id: 0,
            externalId: '',
            firstCardIamge: '',
            secondCardImage: '',
            thirdCardImage: '',
            logo: '',
            name: '',
            price: 0.0,
            series: '',
            symbol: ''
        },
        cards: [{
            name: '',
            averagePrice: 0.0,
            description: '',
            evolvesFrom: '',
            externalCode: '',
            images: {
                small: '',
                large: '',
                subTypes: [''],
                types: ['']
            }
        }]
    });

    let params = useParams();

    useEffect(() => {
        const requestCardSet = async () => {
            const response = await getCardSetById(params.cardSetId, getCardsPage);

            setCardSetInfo(response);
            setCardsTotalPages(Math.ceil(response.totalCount / cardsDisplayCount));
        }

        requestCardSet();
    }, [params.cardSetId, getCardsPage])

    return <div className={styles.cardset_container}>
        <div className={styles.cardset_info}>
            <img src={cardSetInfo.cardSet.logo} alt={'Card set symbol'} width={'200px'} />
            <h2>Da série: {cardSetInfo.cardSet.series}</h2>
            <h2>Preço: {getFormattedCurrency(cardSetInfo.cardSet.price)}</h2>
        </div>

        <div className={styles.cards_display_container}>
            <div className={styles.cards_display}>
                {
                    cardSetInfo.cards.map(card => {
                        return <div className={styles.card_container} key={card.externalCode}>
                            <img src={card.images.small} alt={`${card.name}`} width={'100%'} />
                        </div>
                    })
                }
            </div>
        </div>

        <h2>
            <span onClick={() => { if(getCardsPage - 1 > 0) setGetCardsPage(getCardsPage - 1) }}>{'<'}</span>
            Página: {getCardsPage} / {cardsTotalPages}
            <span onClick={() => { if(getCardsPage + 1 <= cardsTotalPages) setGetCardsPage(getCardsPage + 1) }}>{'>'}</span>
        </h2>
    </div>
}