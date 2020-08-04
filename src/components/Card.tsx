import React from 'react'
import BrowserImageManipulation from 'browser-image-manipulation'

export default function Card(props: {
    image: Blob,
    x: number,
    y: number,
    offsetX: number,
    offsetY: number
}) {
    const [formatted, setFormatted] = React.useState<string>("");
    let renderImage = <b>Loading</b>
    if (props.image !== undefined && formatted === "") {
        new BrowserImageManipulation()
            .loadBlob(props.image)
            .crop(props.x, props.y, 0.0001 + props.offsetX, 0.0001 + props.offsetY)
            .saveAsImage()
            .then(function (base64) {
                setFormatted(base64)
            }).catch(function (e) { alert(e.toString()) })
    }
    if (formatted !== "") {
        renderImage = <img src={formatted} alt="Aici ar trb sa fie" />
    }
    return renderImage;
}