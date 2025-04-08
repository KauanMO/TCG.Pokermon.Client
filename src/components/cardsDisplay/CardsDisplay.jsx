import React, { useState } from "react";
import styles from './CardsDisplay.module.css';
import Modal from 'react-modal';
import { getFormattedCurrency } from "../../utils/StringHelper";
import Card from "../card/Card";
import { imagesPlaceHolder } from "../../utils/GlobalVariables";

export default function CardsDisplay({ cards, internal }) {
    const [cardModalOpen, setCardModalOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({
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
        types: ['']
    });

    const cardOnClick = e => {
        setSelectedCard(cards.find(c => internal
            // eslint-disable-next-line eqeqeq
            ? c.id == e.target.id
            // eslint-disable-next-line eqeqeq
            : c.externalCode == e.target.id));
        setCardModalOpen(true);
    }

    Modal.setAppElement('#root');

    return <div className={styles.cards_display_container}>
        <Modal isOpen={cardModalOpen}>
            <h1 onClick={() => { setCardModalOpen(false) }}>X</h1>
            <h1>{selectedCard.name}</h1>
            <img src={selectedCard.images.large} alt={selectedCard.name} />
            {
                internal
                    ? <h1>Valor: {getFormattedCurrency(selectedCard.price)}</h1>
                    : <h1>Preço Base: {getFormattedCurrency(selectedCard.price)}</h1>
            }
            {
                selectedCard.evolvesFrom
                    ? <h1>Evolui de: {selectedCard.evolvesFrom}</h1>
                    : ''
            }
        </Modal>

        <div className={styles.cards_display}>
            {
                cards.map(card => {
                    return <div
                        id={internal ? card.id : card.externalCode}
                        onClick={e => cardOnClick(e)}
                        className={styles.card_container}
                        key={internal ? card.id : card.externalCode}>

                        <Card id={internal ? card.id : card.externalCode}
                            image={card.images.small}
                            name={card.name} />
                    </div>
                })
            }
        </div>
    </div>
}