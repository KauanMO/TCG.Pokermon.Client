import React from "react";
import styles from './CardSet.module.css';
import { useNavigate } from "react-router";

export default function CardSet(props) {
    const navigate = useNavigate();

    return <div onClick={() => navigate(`/cardset/${props.set.id}`)} className={styles.container}>
        <div className={styles.first_card_image}>
            <img src={props.set.firstCardImage} alt={props.set.id} width={'200px'} />
        </div>
        <div className={styles.second_card_image}>
            <img src={props.set.secondCardImage} alt={props.set.id} width={'200px'} />
        </div>
        <div className={styles.third_card_image}>
            <img src={props.set.thirdCardImage} alt={props.set.id} width={'200px'} />
        </div>
        <div className={styles.cardset_logo}>
            <img src={props.set.logo} alt={props.set.id} />
        </div>
    </div>
}