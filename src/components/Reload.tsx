import React, { MouseEvent } from 'react'

export default function Reload(props: {
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    generating: boolean
}) {
    function handleClick(e: MouseEvent) {
        props.setResult([]);
    }

    if (props.generating)
        return <b>Cannot reload rn</b>;
    return <a href="/#" onClick={handleClick}>Reload</a>;
}