import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { handleClickShareButton } from "./utils/handlerFunctions";

const FORM_ELEMENT_TYPE = {
  TEXT: "text",
  RANGE: "range",
  CHECKBOX: "checkbox",
  COLOR: "color",
  DATE: "date",
};
class InputElement {
  constructor(type, value, onChangeHandler) {
    this.type = type || FORM_ELEMENT_TYPE.TEXT;
    this.value = value;

    this.onChange = (event) => {
      this.value = event.target.value;
      onChangeHandler();
    };
  }
}

class TextElement extends InputElement {
  constructor(value, onChangeHandler) {
    super(FORM_ELEMENT_TYPE.TEXT, value, onChangeHandler);
  }
}

class RangeElement extends InputElement {
  constructor(value, onChangeHandler, options) {
    super(FORM_ELEMENT_TYPE.RANGE, value, onChangeHandler);

    this.min = options.min || "";
    this.max = options.max || "";
    this.step = options.step || "";
  }
}

class ColorElement extends InputElement {
  constructor(value, onChangeHandler) {
    super(FORM_ELEMENT_TYPE.COLOR, value, onChangeHandler);
  }
}

class DateElement extends InputElement {
  constructor(value, onChangeHandler) {
    super(FORM_ELEMENT_TYPE.DATE, value, onChangeHandler);
  }
}

function App() {
  const [elems, setElems] = useState([]);
  const [shortedUrl, setShortedUrl] = useState("");

  
  const onFormElementClick = useCallback((type = FORM_ELEMENT_TYPE.TEXT, value) => {
    let newElement = null;
    const onChangeHandler = () => setElems((currentState) => [...currentState]);
    switch (type) {
      case FORM_ELEMENT_TYPE.RANGE:
        newElement = new RangeElement(value || 75, onChangeHandler, {
          min: 50,
          max: 150,
          step: 10,
        });
        break;
      case FORM_ELEMENT_TYPE.COLOR:
        newElement = new ColorElement(value || "#000000", onChangeHandler);
        break;
      case FORM_ELEMENT_TYPE.DATE:
        newElement = new DateElement(value || "", onChangeHandler);
        break;
      default:
        newElement = new TextElement(value || "", onChangeHandler);
    }

    setElems((currentState) => [...currentState, newElement]);
  }, []);

  useEffect(() => {
    return () => {
      const queryParams = new URLSearchParams(
        decodeURIComponent(window.location.search)
      );
      queryParams.forEach((value, type) => {
        onFormElementClick(type, value);
      });
    };
  }, [onFormElementClick]);
  
  return (
    <div className="App">
      <div className="wrapper">
        <div className="template">
          {elems.map((item, index) => {
            return (
              <div className="elem-row" key={`${item.type}-${index}`}>
                <span className="elem-title">Elem #{index}</span>
                <input className="form-elem" {...item} />
              </div>
            );
          })}
        </div>
        <div className="control">
          <button className="control-elem" onClick={() => onFormElementClick()}>
            Text
          </button>
          <button
            className="control-elem"
            onClick={() => onFormElementClick(FORM_ELEMENT_TYPE.RANGE)}
          >
            Range
          </button>
          <button
            className="control-elem"
            onClick={() => onFormElementClick(FORM_ELEMENT_TYPE.COLOR)}
          >
            Color
          </button>
          <button
            className="control-elem"
            onClick={() => onFormElementClick(FORM_ELEMENT_TYPE.DATE)}
          >
            Date
          </button>
        </div>
      </div>
      <pre>{JSON.stringify(elems, null, "\t")}</pre>
      <button onClick={() => handleClickShareButton(elems,setShortedUrl)}>Share Link</button>
      {shortedUrl ? (
        <>
          <div className="shorted-url-container">
            <strong>Short URL</strong>
            <div className="input-message-url">
              <input type="text" value={shortedUrl} readOnly/>
              <small>Link was copied to your clipboard</small>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;