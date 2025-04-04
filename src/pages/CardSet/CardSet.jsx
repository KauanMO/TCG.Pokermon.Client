import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCardSetById } from "../../api/cardsets";

export default function CardSet() {
    const [cardSetInfo, setCardSetInfo] = useState({
        cardSet: {},
        cards: {}
    });

    let params = useParams();

    useEffect(() => {
        const requestCardSet = async () => {
            const response = await getCardSetById(params.cardSetId, 1);

            setCardSetInfo(response);
        }

        requestCardSet();
    }, [])

    return <>
        adsa
    </>
}