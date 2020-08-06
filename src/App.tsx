import React, { useEffect } from 'react'
import DropZone from './components/DropZone'
import Saver from './components/Saver'
import Cropper from './components/Cropper'
import ResultBox from './components/ResultBox'
import Settings from './components/Settings'
import BrowserImageManipulation from 'browser-image-manipulation'
import { Grid, makeStyles, createStyles, Card, CardContent, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      padding: theme.spacing(2),
      paddingBottom: '0px !important',
      flexWrap: 'wrap'
    },
    settings: {
      padding: theme.spacing(1),
      flexDirection: 'column',
      flex: 1,
      height: '100%'
    },
    nopadding: {
      paddingBottom: '8px !important'
    },
    grid: {
      padding: theme.spacing(1)
    },
    resultbox: {
      padding: '16px !important'
    }
  }),
);

function App() {
  const [image, setImage] = React.useState<BrowserImageManipulation>();
  const [image_stats, setImageStats] = React.useState({
    x: 0,
    y: 0
  })
  const [result, setResult] = React.useState<string[]>([]);
  const [generating, setGenerating] = React.useState(false);
  const [settings, setSettings] = React.useState({
    x: 100,
    y: 100,
    number: 70,
  })
  const classes = useStyles();
  useEffect(() => {
    let oldSettings = localStorage.getItem("settings");
    if (oldSettings !== null)
      setSettings(JSON.parse(oldSettings))
  }, [])


  let cropper = null;
  if (result.length === 0 && image instanceof BrowserImageManipulation && !generating && image_stats.x !== 0) {
    cropper = <Cropper
      image={image}
      image_stats={image_stats}
      settings={settings}
      setResult={setResult}
      setGenerating={setGenerating}
      generating={generating}
    />
  }
  return <div>
    <Grid container spacing={2} className={classes.root} justify="center">
      <Grid item xs={4} className={classes.grid}>
        <Card className={classes.settings}>
          <CardContent className={classes.nopadding}>
            <Typography gutterBottom align="center" variant="h5">
              Settings
          </Typography>
            <Settings
              settings={settings}
              setSettings={setSettings}
              setResult={setResult}
              generating={generating}
            />
            {cropper}
            <Grid container className={classes.root} justify="center">
              <Grid item xs={4}>
                <Saver
                  images={result}
                  generating={generating}
                />
              </Grid>
              <Grid item xs={4}>
                <Saver
                  images={result}
                  generating={generating}
                />
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} >
        <Card className={classes.settings}>
          <CardContent className={classes.nopadding}>
            <DropZone
              setImage={setImage}
              setResult={setResult}
              setImageStats={setImageStats}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.resultbox}>
        <ResultBox settings={settings} images={result} />
      </Grid>
    </Grid>

  </div>
}


export default App;
