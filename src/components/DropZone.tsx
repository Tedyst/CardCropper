import React, { useCallback } from 'react'
import BrowserImageManipulation from 'browser-image-manipulation'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            minHeight: '100%',
            maxHeight: '100%',
            padding: theme.spacing(3)
        }
    }),
);


function MyDropzone(props: {
    setImage: React.Dispatch<React.SetStateAction<BrowserImageManipulation | undefined>>,
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    setImageStats: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>
}) {
    const classes = useStyles();
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

    return <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
        onDrop={onDrop}
        showPreviews={false}
        showPreviewsInDropzone={false}
        maxFileSize={10000000000}
        dropzoneClass={classes.root}
    />
}

export default MyDropzone;