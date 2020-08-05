import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


function MyDropzone(props: {
    setImage: React.Dispatch<React.SetStateAction<ArrayBuffer | undefined>>,
    setResult: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                if (binaryStr instanceof ArrayBuffer) {
                    props.setImage(binaryStr)
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