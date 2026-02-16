import { useEffect, useReducer, useRef } from "react";

/* eslint-disable react/prop-types */
const Input = ({ hint }) => {
  const cities = [
    "Tehran",
    "Shiraz",
    "Isfahan",
    "Kermanshah",
    "Ahwaz",
    "Arak",
    "Mashhad",
    "Tabriz",
    "Karaj",
    "Tafresh",
    "Sanandaj",
  ];
  const initialState = {
    value: "",
    typedLength: 0,
    shouldSelect: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SetTyped":
        return {
          ...state,
          value: action.payload.value,
          typedLength: action.payload.typedLength,
          shouldSelect: action.payload.shouldSelect,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputValueLower = inputValue.toLowerCase();

    const match = cities.find((city) =>
      city.toLowerCase().startsWith(inputValueLower),
    );

    if (match) {
      if (inputValue.length < match.length) {
        dispatch({
          type: "SetTyped",
          payload: {
            value: match,
            typedLength: inputValue.length,
            shouldSelect: true,
          },
        });
      } else {
        dispatch({
          type: "SetTyped",
          payload: {
            value: inputValue,
            typedLength: inputValue.length,
            shouldSelect: false,
          },
        });
      }
    } else {
      dispatch({
        type: "SetTyped",
        payload: {
          value: inputValue,
          typedLength: inputValue.length,
          shouldSelect: false,
        },
      });
    }
  };

  useEffect(() => {
    if (
      state.shouldSelect &&
      inputRef.current &&
      state.typedLength < state.value.length
    ) {
      inputRef.current.setSelectionRange(state.typedLength, state.value.length);
    }
  }, [state.value, state.typedLength, state.shouldSelect]);

  return (
    <div className="input">
      <label htmlFor="input">{hint}</label>
      <input
        ref={inputRef}
        type="text"
        value={state.value}
        id="input"
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
