import { useRef } from 'react';

export function ImageSection({ image, dragging }) {
  const inputRef = useRef(null);

  const openPicker = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker();
    }
  };

  const onPick = (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';
    if (file) image.loadFile(file);
  };

  return (
    <section className="sec" aria-labelledby="h-image">
      <h2 id="h-image">Image</h2>
      <div
        className={`drop${dragging ? ' dragging' : ''}`}
        role="button"
        tabIndex={0}
        aria-describedby="dropHint"
        onClick={openPicker}
        onKeyDown={onKeyDown}
      >
        <strong>Drop a picture here</strong>
        <span>or press to choose a file</span>
        <span id="dropHint">PNG, JPG or JPEG, up to 10 MB</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        hidden
        onChange={onPick}
      />
      {image.error ? (
        <p className="error" role="alert">
          {image.error}
        </p>
      ) : null}
      <div className="row">
        <button className="btn" type="button" onClick={image.loadSample}>
          Use sample
        </button>
        <button className="btn" type="button" disabled={!image.source} onClick={image.clear}>
          Clear image
        </button>
      </div>
    </section>
  );
}
