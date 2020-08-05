import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import BrowserImageManipulation from 'browser-image-manipulation'


function MyDropzone(props: {
    setImage: React.Dispatch<React.SetStateAction<BrowserImageManipulation | undefined>>,
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    setImageStats: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>
}) {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()
            let image = document.createElement('img')
            image.onload = function () {
                props.setImageStats({
                    x: image.width,
                    y: image.height
                })
            }

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = (data) => {
                const binaryStr = reader.result
                if (binaryStr instanceof ArrayBuffer) {
                    props.setResult([]);
                    let byteArray = new Uint8Array(binaryStr);
                    let blob = new Blob([byteArray], { type: 'image/png' });
                    let loaded_image = new BrowserImageManipulation().loadBlob(blob);
                    props.setImage(loaded_image)

                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    image.src = imageUrl;
                }
                else
                    console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [props])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop aici</p>
        </div>
    )
}

export default MyDropzone;