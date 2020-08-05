import React from 'react'
import DropZone from './components/DropZone'
import Saver from './components/Saver'
import Cropper from './components/Cropper'
import ResultBox from './components/ResultBox'
import Settings from './components/Settings'

function App() {
  const [image, setImage] = React.useState<ArrayBuffer>();
  const [result, setResult] = React.useState<string[]>([]);
  const [settings, setSettings] = React.useState({
    x: 100,
    y: 100,
    // Please don't ever go over 100, too much ram needed
    number: 3,
  })

  let cropper = null;
  if (result.length === 0 && image instanceof ArrayBuffer)
    cropper = <Cropper
      image={image}
      settings={settings}
      setResult={setResult}
    />

  return (
    <div>
      <Settings
        settings={settings}
        setSettings={setSettings}
        setResult={setResult}
      />
      <DropZone
        setImage={setImage}
        setResult={setResult}
      />
      {cropper}
      <br />
      <ResultBox settings={settings} images={result} />
      <br />
      <Saver
        images={result} />
    </div>
  );
}


export default App;
