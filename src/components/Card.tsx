import React from 'react'

export default function Card(props: {
    image: string,
}) {
    return <img src={props.image} alt="Aici ar trb sa fie" />
}