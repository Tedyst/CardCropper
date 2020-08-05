import React, { MouseEvent } from 'react'

export default function Settings(props: {
    settings: {
        x: number;
        y: number;
        number: number;
    },
    setSettings: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
        number: number;
    }>>,
    setResult: React.Dispatch<React.SetStateAction<string[]>>
}) {
    function handleClick(e: MouseEvent) {
        props.setSettings({
            number: 5,
            x: 300,
            y: 300
        })
        props.setResult([]);
    }
    return <a href="/#" onClick={handleClick}>Change Settings</a>;
}