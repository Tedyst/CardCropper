import React, { MouseEvent } from 'react'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default function Saver(props: {
    images: string[]
}) {
    let zip = new JSZip();

    function handleClick(e: MouseEvent) {
        e.preventDefault();
        props.images.forEach((value: string, index: number) => {
            var idx = value.indexOf('base64,') + 'base64,'.length
            var content = value.substring(idx);
            zip.file(index + ".png", content, { base64: true });
        });
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                FileSaver.saveAs(content, "export.zip");
            });
    }

    if (props.images.length !== 0)
        return <a href="#" onClick={handleClick}>Download zip</a>;
    return <b></b>;
}