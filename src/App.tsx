import React from 'react';
import DropZone from './components/DropZone';
import Base64 from 'base64-arraybuffer';

function App() {
  const [image, setImage] = React.useState<string | ArrayBuffer | null>(null);

  let renderImage = null;
  if (image instanceof ArrayBuffer) {
    renderImage = <img src={"data:image/png;base64, " + Base64.encode(image)} alt="asd" style={{ width: 200 }} />;
  }

  return (
    <div>
      <DropZone
        setImage={setImage}
      />
      {renderImage}
    </div>
  );
}

export default App;
