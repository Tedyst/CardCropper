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
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    generating: boolean
}) {
    function handleClick(e: MouseEvent) {
        props.setSettings({
            number: 100,
            x: 100,
            y: 100
        })
        props.setResult([]);
    }
    if (props.generating)
        return <b>cannot change settings</b>
    return <a href="/#" onClick={handleClick}>VERY BAD Settings</a>;
}