import React from 'react'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default function Saver(props: {
    images: string[] | undefined
}) {
    const [generated, setGenerated] = React.useState<Blob>();
    let zip = new JSZip();
    if (generated)
        return <b>"Generated"</b>;
    if (props.images) {
        props.images.forEach((value: string, index: number) => {
            console.log(index, value)
            var idx = value.indexOf('base64,') + 'base64,'.length
            var content = value.substring(idx);
            zip.file(index + ".png", content, { base64: true });
        });
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                setGenerated(content);
                FileSaver.saveAs(content, "export.zip")
            });
    }
    return <b></b>;
}