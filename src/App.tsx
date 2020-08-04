import React from 'react'
import DropZone from './components/DropZone'
import Card from './components/Card';
import BrowserImageManipulation from 'browser-image-manipulation'
import Saver from './components/Saver';

function App() {
  const [image, setImage] = React.useState<ArrayBuffer>();
  const [result, setResult] = React.useState<string[]>();

  let arr: JSX.Element[] = [];
  if (result) {
    console.log(result);
    for (let val in result) {
      arr.push(<Card image={result[val]} key={"card" + val} />)
    }
  }
  else {
    if (image instanceof ArrayBuffer) {
      // Convert image to blob
      let byteArray = new Uint8Array(image);
      let blob = new Blob([byteArray], { type: 'image/png' });

      let promises = [];
      // Start all promises
      for (let i = 0; i < 10; i++) {
        promises.push(new BrowserImageManipulation()
          .loadBlob(blob)
          .crop(100, 100, 0.0001 + i * 100, 0.0001 + 0)
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
