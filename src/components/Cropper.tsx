import React, { useEffect } from 'react'
import BrowserImageManipulation from 'browser-image-manipulation'
import Base64 from 'base64-arraybuffer';

export default function Cropper(props: {
    image: ArrayBuffer;
    setResult: React.Dispatch<React.SetStateAction<string[]>>;
    settings: {
        x: number;
        y: number;
        number: number;
    },
    setGenerating: React.Dispatch<React.SetStateAction<boolean>>
}) {
    useEffect(() => {
        // Convert image to blob
        let byteArray = new Uint8Array(props.image);
        let blob = new Blob([byteArray], { type: 'image/png' });

        let image_stats = new Image();
        image_stats.src = "data:image/png;base64, " + Base64.encode(props.image);

        image_stats.onload = function () {
            crop(blob, image_stats, props.setResult, props.settings, props.setGenerating);
            console.log("started cropping");
        }
    }, [props])
    return <b>Not ready</b>
}

async function crop(
    blob: Blob,
    image_stats: HTMLImageElement,
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    settings: {
        x: number;
        y: number;
        number: number;
    },
    setGenerating: React.Dispatch<React.SetStateAction<boolean>>
) {
    // Start all promises
    let nr = 0;
    setGenerating(true);
    for (let j = 0; j <= image_stats.height - settings.y; j += settings.y)
        for (let i = 0; i <= image_stats.width - settings.x; i += settings.x) {
            nr++;
            if (nr > settings.number)
                break;
            await new BrowserImageManipulation()
                .loadBlob(blob)
                .crop(settings.x, settings.y, 0.0001 + i, 0.0001 + j).saveAsImage().then(function (base64) {
                    setResult((prevState) => [...prevState, base64]);
                }).catch(function (e) { alert(e.toString()) });
        }
    setGenerating(false);
}