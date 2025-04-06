import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/users";
import { getFormattedCurrency } from "../../utils/StringHelper";

export default function Home() {
    const [userInfo, setUserInfo] = useState(
        {
            username: '',
            createdDate: '',
            balance: 0.0,
            cardAmount: 0,
            deckAmount: 0
        }
    );

    useEffect(() => {
        const requestUserInfo = async () => {
            const request = await getUserInfo();

            setUserInfo(request);
        }

        requestUserInfo();
    }, [])

    return <>
        <h1>Ola {userInfo.username}!</h1>

        <h4>Saldo: {getFormattedCurrency(userInfo.balance)}</h4>

        <ul>
            <li><a href="/shop">Loja</a></li>
        </ul>
    </>
}