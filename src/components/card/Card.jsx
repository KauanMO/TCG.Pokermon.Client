import React from "react";

export default function Card(props) {
    return <img id={props.id} src={props.image} alt={props.name} width={'150px'} height={'200px'} />
}