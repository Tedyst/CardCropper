import React, { MouseEvent } from 'react'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default function Saver(props: {
    images: string[] | undefined
}) {
    const [generated, setGenerated] = React.useState<Blob>();
    let zip = new JSZip();
    function handleClick(e: MouseEvent) {
        e.preventDefault();
        if (generated)
            FileSaver.saveAs(generated, "export.zip");
    }
    if (generated)
        return <a href="#" onClick={handleClick}>Download zip</a>;
    if (props.images) {
        props.images.forEach((value: string, index: number) => {
            var idx = value.indexOf('base64,') + 'base64,'.length
            var content = value.substring(idx);
            zip.file(index + ".png", content, { base64: true });
        });
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                setGenerated(content);
            });
    }
    return <b></b>;
}