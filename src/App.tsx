import React from 'react'
import DropZone from './components/DropZone'
import Card from './components/Card';
import BrowserImageManipulation from 'browser-image-manipulation'
import Saver from './components/Saver';
import ImageSize from 'image-size';

function App() {
  const [image, setImage] = React.useState<ArrayBuffer>();
  const [result, setResult] = React.useState<string[]>();
  const [settings, setSettings] = React.useState({
    x: 100,
    y: 100,
    number: 10,
  })

  let arr: JSX.Element[] = [];
  if (result) {
    for (let val in result) {
      arr.push(<Card image={result[val]} key={"card" + val} />)
    }
  }
  else {
    if (image instanceof ArrayBuffer) {
      // Convert image to blob
      let byteArray = new Uint8Array(image);
      let blob = new Blob([byteArray], { type: 'image/png' });

      let i = new Image();
      i.src = objectURL;
      i.onload = function () {
        alert(i.width + ", " + i.height);
      };


      let promises = [];
      // Start all promises
      for (let i = 0; i < settings.number; i++) {
        promises.push(new BrowserImageManipulation()
          .loadBlob(blob)
          .crop(settings.x, settings.y, 0.0001 + i * 100, 0.0001 + 0)
          .saveAsImage());
      }
      // Wait for all promises to finish
      Promise.all(promises).then(function (base64) {
        setResult(base64);
      }).catch(function (e) { alert(e.toString()) })
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
