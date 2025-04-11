import React from "react";
import CardSet from "../cardSet/CardSet";

export default function CardSetDisplay(props) {
    return props.cardSets.map(set => {
        return <CardSet set={set} />
    })
}