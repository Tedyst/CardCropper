import React from 'react'
import { Card, CardContent, Grid, CardMedia } from '@material-ui/core';

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
            arr.push(
                <Grid item>
                    <Card>
                        <CardMedia
                            component="img"
                            height={Math.min(props.settings.x, props.settings.y)}
                            image={props.images[val]}
                            alt="Card"
                        />
                    </Card>
                </Grid>)
        }
    }
    return <Grid container spacing={2} justify="center">
        {arr}
    </Grid>
}

// return <img src={props.image} alt="Aici ar trb sa fie" width={props.size} />
// <Card image={props.images[val]} key={"card" + val} size={Math.min(props.settings.x, props.settings.y) / 2} />