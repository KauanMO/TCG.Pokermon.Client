import React from "react";
import styles from './Button.module.css';

function Default({ handleOnclick, text, borderRadius, padding, width, height, color, textColor, centeredText, className }) {
    const textDisplayStyle = {
        display: centeredText ? 'flex' : 'block',
        justifyContent: centeredText ? 'center' : 'none'
    }

    return <div
        style={{
            borderRadius,
            padding,
            width,
            height,
            backgroundColor: color,
            color: textColor,
            ...textDisplayStyle,
            fontSize: '150%'
        }}
        className={styles[className]}
        onClick={handleOnclick}>
        {text}
    </div>
}

function Rounded({ padding, width, heigth, text, color, textColor, centeredText, className }) {
    return <Default
        borderRadius={'10px'}
        padding={padding}
        width={width}
        heigth={heigth}
        text={text}
        color={color}
        textColor={textColor}
        centeredText={centeredText}
        className={className}
    />
}

const Button = {
    Rounded
}

export default Button;