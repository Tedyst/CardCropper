import React from 'react'
import Card from './Card'

export default function ResultBox(props: {
    images: string[],
    settings: {
        x: number;
        y: number;
        number: number;
    }
}) {
    let arr: JSX.Element[] = [];
    if (props.images.length !== 0) {
        for (let val in props.images) {
            arr.push(<Card image={props.images[val]} key={"card" + val} size={Math.min(props.settings.x, props.settings.y) / 2} />)
            arr.push(<b>a</b>)
        }
    }
    return <div>
        {arr}
    </div>
}