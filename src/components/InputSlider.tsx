import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    input: {
        width: 60,
    },
    text: {
        width: 100,
    }
});

export default function InputSlider(props: {
    settings: {
        x: number;
        y: number;
        number: number;
    },
    setSettings: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
        number: number;
    }>>,
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    changer: string,
    disabled: boolean
}) {
    const classes = useStyles();
    let value = 0;
    if (props.changer === "x")
        value = props.settings.x;
    else if (props.changer === "y")
        value = props.settings.y;
    else if (props.changer === "number")
        value = props.settings.number;

    function setValue(newValue: number) {
        if (newValue < 1) {
            return
        }
        if (props.changer === "x") {
            let newSettings = {
                x: newValue,
                y: props.settings.y,
                number: props.settings.number
            }
            props.setSettings(newSettings)
            localStorage.setItem("settings", JSON.stringify(newSettings))
        } else if (props.changer === "y") {
            let newSettings = {
                x: props.settings.x,
                y: newValue,
                number: props.settings.number
            }
            props.setSettings(newSettings)
            localStorage.setItem("settings", JSON.stringify(newSettings))
        } else if (props.changer === "number") {
            let newSettings = {
                x: props.settings.x,
                y: props.settings.y,
                number: newValue
            }
            props.setSettings(newSettings)
            localStorage.setItem("settings", JSON.stringify(newSettings))
        }
        props.setResult([]);
    }

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        if (typeof (newValue) === "number")
            setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 2 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        }
    };

    let text = null;
    if (props.changer === "x")
        text = "Width";
    else if (props.changer === "y")
        text = "Height";
    else if (props.changer === "number")
        text = "Card number";
    let min = props.changer === "number" ? 1 : 10;
    let max = props.changer === "number" ? 100 : 1500;
    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography className={classes.text}>
                        {text}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        disabled={props.disabled}
                        min={min}
                        max={max}
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: min,
                            max: max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                        disabled={props.disabled}
                    />
                </Grid>
            </Grid>
        </div>
    );
}