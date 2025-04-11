import React, { useState } from "react";
import styles from './Card.module.css';

export default function Card(props) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [highlight, setHighlight] = useState({ x: 50, y: 50 });

    const handleMove = (x, y, card) => {
        const { width, height } = card.getBoundingClientRect();
        const rotateX = (y - height / 2) / 4;
        const rotateY = (x - width / 2) / 4;

        setRotation({ x: rotateY, y: -rotateX });
        setHighlight({ x: (x / width) * 100, y: (y / height) * 100 });
    };

    const handleMouseMove = (e) => {
        handleMove(e.clientX - e.currentTarget.getBoundingClientRect().left, e.clientY - e.currentTarget.getBoundingClientRect().top, e.currentTarget);
    };

    const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handleMove(touch.clientX - e.currentTarget.getBoundingClientRect().left, touch.clientY - e.currentTarget.getBoundingClientRect().top, e.currentTarget);
        }
    };

    const handleMouseLeave = () => {
        setRotation((prev) => ({ ...prev, x: 0, y: 0 }));
    };

    const rarityStyle = {
        normal: {
            transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
            transition: "transform 0.5s ease-out",
            background: `radial-gradient(circle at ${highlight.x}% ${highlight.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
            position: 'relative',
            borderRadius: props.borderRadius,
            userSelect: 'none',
            width: props.width,
            height: props.height
        },
        holo: {
            transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
            transition: "transform 0.5s ease-out",
            background: `radial-gradient(circle at ${highlight.x}% ${highlight.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
            position: 'relative',
            width: props.width,
            height: props.height,
            borderRadius: props.borderRadius
        }
    }

    return <div style={props.holo ? rarityStyle.holo : rarityStyle.normal}
        className={props.holo ? rarityStyle.card_holo : rarityStyle.normal}>
        <img
            id={props.id}
            src={props.image}
            alt={props.name}
            height={'100%'}
            width={'100%'}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseLeave}
            unselectable="on"
            style={{
                userSelect: 'none'
            }}
        />
        {
            props.holo
                ? <div className={styles.holo}></div>
                : ''
        }
    </div>
}