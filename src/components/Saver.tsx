import React, { MouseEvent } from 'react'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center'
        },
    }),
);

export default function Saver(props: {
    images: string[],
    generating: boolean
}) {
    const classes = useStyles();
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

    return <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        disabled={props.generating || props.images.length === 0}
        className={classes.root}
    >
        Download zip
        </Button>
}