import React from 'react'
import DropZone from './components/DropZone'
import Saver from './components/Saver'
import Cropper from './components/Cropper'
import ResultBox from './components/ResultBox'
import Settings from './components/Settings'

function App() {
  const [image, setImage] = React.useState<ArrayBuffer>();
  const [result, setResult] = React.useState<string[]>([]);
  const [generating, setGenerating] = React.useState(false);
  const [settings, setSettings] = React.useState({
    x: 413,
    y: 753,
    // Please don't ever go over 100, too much ram needed
    number: 100,
  })

  let cropper = null;
  if (result.length === 0 && image instanceof ArrayBuffer && !generating) {
    cropper = <Cropper
      image={image}
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
