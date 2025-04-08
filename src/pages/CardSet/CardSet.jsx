import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCardSetById } from "../../api/cardsets";
import { getFormattedCurrency } from "../../utils/StringHelper";
import styles from './CardSet.module.css';
import { cardsDisplayCount } from "../../utils/GlobalVariables";
import Modal from 'react-modal';

export default function CardSet() {
    const [getCardsPage, setGetCardsPage] = useState(1);
    const [cardsTotalPages, setCardsTotalPages] = useState(0);
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        name: '',
        averagePrice: 0.0,
        description: '',
        evolvesFrom: '',
        externalCode: '',
        images: {
            small: 'https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png',
            large: 'https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png',
        },
        subTypes: [''],
        types: ['']
    })

    const [cardSetInfo, setCardSetInfo] = useState({
        cardSet: {
            id: 0,
            externalId: '',
            firstCardImage: '',
            secondCardImage: '',
            thirdCardImage: '',
            logo: 'https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png',
            name: '',
            price: 0.0,
            series: '',
            symbol: 'https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png'
        },
        cards: [{
            name: '',
            averagePrice: 0.0,
            description: '',
            evolvesFrom: '',
            externalCode: '',
            images: {
                small: 'https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png',
                large: 'https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png',
            },
            subTypes: [''],
            types: ['']
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

    const cardOnClick = e => {
        setSelectedCard(cardSetInfo.cards.find(c => c.externalCode === e.target.id));
        setCardModalOpen(true);
    }

    Modal.setAppElement('#root');

    return <div className={styles.cardset_container}>
        <Modal isOpen={cardModalOpen}>
            <h1 onClick={() => { setCardModalOpen(false) }}>X</h1>
            <h1>{selectedCard.name}</h1>
            <img src={selectedCard.images.large} alt={selectedCard.name} />
            <h1>Preço Base: {getFormattedCurrency(selectedCard.averagePrice)}</h1>
            {
                selectedCard.evolvesFrom
                    ? <h1>Evolui de: {selectedCard.evolvesFrom}</h1>
                    : ''
            }
        </Modal>

        <div className={styles.cardset_info}>
            <img src={cardSetInfo.cardSet.logo} alt={'Card set symbol'} width={'200px'} />
            <h2>Da série: {cardSetInfo.cardSet.series}</h2>
            <h2>Preço: {getFormattedCurrency(cardSetInfo.cardSet.price)}</h2>
        </div>

        <div className={styles.cards_display_container}>
            <div className={styles.cards_display}>
                {
                    cardSetInfo.cards.map(card => {
                        return <div onClick={e => cardOnClick(e)} className={styles.card_container} key={card.externalCode}>
                            <img id={card.externalCode} src={card.images.small} alt={`${card.name}`} width={'100%'} />
                        </div>
                    })
                }
            </div>
        </div>

        <h2>
            <span onClick={() => { if (getCardsPage - 1 > 0) setGetCardsPage(getCardsPage - 1) }}>{'<'}</span>
            Página: {getCardsPage} / {cardsTotalPages}
            <span onClick={() => { if (getCardsPage + 1 <= cardsTotalPages) setGetCardsPage(getCardsPage + 1) }}>{'>'}</span>
        </h2>
    </div>
}