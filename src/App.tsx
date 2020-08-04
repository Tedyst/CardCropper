import React from 'react'
import DropZone from './components/DropZone'
import Card from './components/Card';
import BrowserImageManipulation from 'browser-image-manipulation'
import Saver from './components/Saver';
import Base64 from 'base64-arraybuffer';

function App() {
  const [image, setImage] = React.useState<ArrayBuffer>();
  const [result, setResult] = React.useState<string[]>();
  const [Updating, setUpdating] = React.useState(false);
  const [settings, setSettings] = React.useState({
    x: 100,
    y: 100,
    number: 70,
  })

  let arr: JSX.Element[] = [];
  if (result) {
    for (let val in result) {
      arr.push(<Card image={result[val]} key={"card" + val} />)
    }
  }
  else {
    if (image instanceof ArrayBuffer && Updating === false) {
      setUpdating(true);
      // Convert image to blob
      let byteArray = new Uint8Array(image);
      let blob = new Blob([byteArray], { type: 'image/png' });

      let image_stats = new Image();
      image_stats.src = "data:image/png;base64, " + Base64.encode(image);
      image_stats.onload = function () {
        console.log(image_stats.width, image_stats.height)
        let promises = [];
        // Start all promises
        for (let j = 0; j <= image_stats.height - settings.y; j += settings.y)
          for (let i = 0; i <= image_stats.width - settings.x; i += settings.x) {
            promises.push(new BrowserImageManipulation()
              .loadBlob(blob)
              .crop(settings.x, settings.y, 0.0001 + i, 0.0001 + j)
              .saveAsImage());
          }
        // Wait for all promises to finish
        Promise.all(promises).then(function (base64) {
          setResult(base64);
        }).catch(function (e) { alert(e.toString()) })
      }
    }
  }
  return (
    <div>
      <DropZone
        setImage={setImage}
      />
      <br />
      {arr}
      <br />
      <Saver
        images={result} />
    </div>
  );
}

export default App;
