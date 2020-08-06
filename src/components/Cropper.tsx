import React, { useEffect } from 'react'
import BrowserImageManipulation from 'browser-image-manipulation'

export default function Cropper(props: {
    image: BrowserImageManipulation;
    setResult: React.Dispatch<React.SetStateAction<string[]>>;
    settings: {
        x: number;
        y: number;
        number: number;
    },
    setGenerating: React.Dispatch<React.SetStateAction<boolean>>,
    generating: boolean,
    image_stats: {
        x: number;
        y: number;
    }
}) {
    useEffect(() => {
        if (props.generating) {
            console.log("collision detected");
            return;
        }
        props.setGenerating(true);
        crop(props.image, props.image_stats, props.setResult, props.settings, props.setGenerating)

    }, [props])
    return <b></b>
}

async function crop(
    image: BrowserImageManipulation,
    image_stats: {
        x: number;
        y: number;
    },
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    settings: {
        x: number;
        y: number;
        number: number;
    },
    setGenerating: React.Dispatch<React.SetStateAction<boolean>>
) {
    let nr = 0;
    setGenerating(true);
    for (let j = 0; j <= image_stats.y - settings.y + 1; j += settings.y)
        for (let i = 0; i <= image_stats.x - settings.x + 1; i += settings.x) {
            nr++;
            if (nr > settings.number)
                break;
            await image.crop(settings.x, settings.y, 0.0001 + i, 0.0001 + j).saveAsImage().then(function (base64) {
                setResult((prevState) => [...prevState, base64]);
            }).catch(function (e) { alert(e.toString()) });
        }
    setGenerating(false);
}