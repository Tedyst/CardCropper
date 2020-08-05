import React, { useEffect } from 'react'
import DropZone from './components/DropZone'
import Card from './components/Card';
import BrowserImageManipulation from 'browser-image-manipulation'
import Saver from './components/Saver';
import Base64 from 'base64-arraybuffer';

function App() {
  const [image, setImage] = React.useState<ArrayBuffer>();
  const [result, setResult] = React.useState<string[]>([]);
  const [settings, setSettings] = React.useState({
    x: 100,
    y: 100,
    // Please don't ever go over 100, too much ram needed
    number: 100,
  })

  let arr: JSX.Element[] = [];
  if (result.length !== 0) {
    for (let val in result) {
      arr.push(<Card image={result[val]} key={"card" + val} size={Math.min(settings.x, settings.y) / 3} />)
    }
  }
  else {
    if (image instanceof ArrayBuffer) {
      arr.push(<Cropper
        image={image}
        settings={settings}
        setResult={setResult}
      />)
    }
  }
  return (
    <div>
      <DropZone
        setImage={setImage}
        setResult={setResult}
      />
      <br />
      {arr}
      <br />
      <Saver
        images={result} />
    </div>
  );
}

function Cropper(props: {
  image: ArrayBuffer;
  setResult: React.Dispatch<React.SetStateAction<string[]>>;
  settings: {
    x: number;
    y: number;
    number: number;
  };
}) {
  useEffect(() => {
    // Convert image to blob
    let byteArray = new Uint8Array(props.image);
    let blob = new Blob([byteArray], { type: 'image/png' });

    let image_stats = new Image();
    image_stats.src = "data:image/png;base64, " + Base64.encode(props.image);

    image_stats.onload = function () {
      crop(blob, image_stats, props.setResult, props.settings);
      console.log("started cropping");
    }
  })
  return <b>Not ready</b>
}

async function crop(
  blob: Blob,
  image_stats: HTMLImageElement,
  setResult: React.Dispatch<React.SetStateAction<string[]>>,
  settings: {
    x: number;
    y: number;
    number: number;
  }) {
  // Start all promises
  let nr = 0;
  for (let j = 0; j <= image_stats.height - settings.y; j += settings.y)
    for (let i = 0; i <= image_stats.width - settings.x; i += settings.x) {
      nr++;
      if (nr > settings.number)
        break;
      await new BrowserImageManipulation()
        .loadBlob(blob)
        .crop(settings.x, settings.y, 0.0001 + i, 0.0001 + j).saveAsImage().then(function (base64) {
          setResult((prevState) => [...prevState, base64]);
        }).catch(function (e) { alert(e.toString()) });
    }
}
export default App;