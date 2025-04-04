import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/users";

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

    const getFormattedBalance = () => {
        return "P" + userInfo.balance.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    return <>
        <h1>Ola {userInfo.username}!</h1>

        <h4>Saldo: {getFormattedBalance()}</h4>

        <ul>
            <li><a href="/shop">Loja</a></li>
        </ul>
    </>
}