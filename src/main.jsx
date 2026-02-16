import { useEffect, useReducer, useRef, useState } from "react";

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
          typedLength: action.payload.length,
          shouldSelect: action.payload.shouldSelect,
        };
      default:
        return state;
    }
  }

  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    const inputValue = event.target.value.toLowerCase();

    const match = cities.find((city) =>
      city.toLowerCase().startsWith(inputValue),
    );

    if (match && inputValue.length < match.length) {
      dispatch({
        type: "SetTyped",
        payload: {
          value: match,
          length: inputValue.length,
          shouldSelect: true,
        },
      });
    } else {
      dispatch({
        type: "SetTyped",
        payload: {
          value: inputValue,
          length: inputValue.length,
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
      />
    </div>
  );
};

export default Input;
