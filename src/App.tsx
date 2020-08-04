import React from 'react'
import DropZone from './components/DropZone'
import BrowserImageManipulation from 'browser-image-manipulation'
import Card from './components/Card';

function App() {
  const [image, setImage] = React.useState<ArrayBuffer>();

  let arr = []
  if (image instanceof ArrayBuffer) {
    let byteArray = new Uint8Array(image);
    let blob = new Blob([byteArray], { type: 'image/png' });
    for (let i = 0; i < 10; i++) {
      arr.push(<Card
        image={blob}
        x={100}
        y={100}
        offsetX={i * 100}
        offsetY={0}
      />)
    }
  }

  return (
    <div>
      <DropZone
        setImage={setImage}
      />
      {arr}
    </div>
  );
}

export default App;
