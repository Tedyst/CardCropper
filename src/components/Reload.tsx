import React, { MouseEvent } from 'react'
import { Button } from '@material-ui/core';

export default function Reload(props: {
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    generating: boolean
}) {
    function handleClick(e: MouseEvent) {
        props.setResult([]);
    }

    return <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={props.generating}
    >
        Reload Images
        </Button>;
}