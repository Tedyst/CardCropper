import React from 'react'
import InputSlider from './InputSlider';

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
    return <div>
        <InputSlider
            settings={props.settings}
            setSettings={props.setSettings}
            setResult={props.setResult}
            changer="x"
            disabled={props.generating}
        />
        <InputSlider
            settings={props.settings}
            setSettings={props.setSettings}
            setResult={props.setResult}
            changer="y"
            disabled={props.generating}
        />
        <InputSlider
            settings={props.settings}
            setSettings={props.setSettings}
            setResult={props.setResult}
            changer="number"
            disabled={props.generating}
        />
    </div>
}