import React from 'react'
import DropZone from './components/DropZone'
import Saver from './components/Saver'
import Cropper from './components/Cropper'
import ResultBox from './components/ResultBox'
import Settings from './components/Settings'
import BrowserImageManipulation from 'browser-image-manipulation'

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
    // Please don't ever go over 100, too much ram needed
    number: 1000,
  })

  let cropper = null;
  if (result.length === 0 && image instanceof BrowserImageManipulation && !generating) {
    cropper = <Cropper
      image={image}
      image_stats={image_stats}
      settings={settings}
      setResult={setResult}
      setGenerating={setGenerating}
      generating={generating}
    />
  }

  return (
    <div>
      <Settings
        settings={settings}
        setSettings={setSettings}
        setResult={setResult}
        generating={generating}
      />
      <DropZone
        setImage={setImage}
        setResult={setResult}
        setImageStats={setImageStats}
      />
      {cropper}
      <br />
      <br />
      <ResultBox settings={settings} images={result} />
      <br />
      <Saver
        images={result}
      />
    </div>
  );
}


export default App;
