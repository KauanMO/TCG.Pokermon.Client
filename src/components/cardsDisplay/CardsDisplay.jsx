import React, { useState } from "react";
import Modal from 'react-modal';
import Card from "../card/Card";
import { getFormattedCurrency } from "../../utils/StringHelper";
import { imagesPlaceHolder } from "../../utils/GlobalVariables";
import styles from './CardsDisplay.module.css';
import close_icon from '../../assets/close.png';

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
        types: [''],
        rarity: ''
    });

    const cardOnClick = e => {
        setSelectedCard(cards.find(c => internal
            // eslint-disable-next-line eqeqeq
            ? c.id == e.target.id
            // eslint-disable-next-line eqeqeq
            : c.externalCode == e.target.id));
        setCardModalOpen(true);

        console.log(cards.find(c => internal
            // eslint-disable-next-line eqeqeq
            ? c.id == e.target.id
            // eslint-disable-next-line eqeqeq
            : c.externalCode == e.target.id));
    }

    Modal.setAppElement('#root');

    return <div className={styles.cards_display_container}>
        <Modal isOpen={cardModalOpen}>
            <div className={styles.close_icon}>
                <img width={'10px'} src={close_icon} alt='close icon' onClick={() => { setCardModalOpen(false) }} />
            </div>

            <span className={styles.modal_card_name}>{selectedCard.name}</span>

            <Card id={internal ? selectedCard.id : selectedCard.externalCode}
                image={selectedCard.images.small}
                name={selectedCard.name}
                width={'100%'}
                height={'55%'}
                holo={selectedCard.rarity.includes('Holo')}
                borderRadius={'14px'}
            />
            {
                internal
                    ? <span>Valor: {getFormattedCurrency(selectedCard.price)}</span>
                    : <span>Preço Base: {getFormattedCurrency(selectedCard.price)}</span>
            }
            {
                selectedCard.evolvesFrom
                    ? <span>Evolui de: {selectedCard.evolvesFrom}</span>
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
                            name={card.name}
                            width={'75px'}
                            height={'100px'}
                            holo={card.rarity.includes('Holo')}
                            borderRadius={'5px'}
                        />
                    </div>
                })
            }
        </div>
    </div>
}