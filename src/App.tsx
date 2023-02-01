import React, { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FormattedMessage, IntlProvider, useIntl } from "react-intl";
import { useRecoilState, useRecoilValue } from "recoil";
import { localeStore } from "./store/localeStore";

const App = () => {
  const [state, setState] = useRecoilState(localeStore);

  const [inputState, setInputState] = useState([
    {
      value: 0,
      name: "benefits_character_typed",
    },
    {
      value: 100,
      name: "benefits_character_limit",
    },
  ]);

  return (
    <div className="App">
      <div style={{ gap: 20, display: "flex", alignItems: "center" }}>
        Eng
        <textarea
          rows={10}
          style={{ width: 1000 }}
          defaultValue={state.messages["en"].main}
          onChange={({ currentTarget }) =>
            setState((prev) => ({
              ...prev,
              messages: {
                ...prev.messages,
                en: { main: currentTarget?.value ?? "" },
              },
            }))
          }
        />
      </div>
      <div style={{ gap: 20, display: "flex", alignItems: "center" }}>
        Thai
        <textarea
          rows={10}
          style={{ width: 1000 }}
          defaultValue={state.messages["th"].main}
          onChange={({ currentTarget }) =>
            setState((prev) => ({
              ...prev,
              messages: {
                ...prev.messages,
                th: { main: currentTarget?.value ?? "" },
              },
            }))
          }
        />
      </div>
      <div>
        <div>
          <input
            style={{ width: 200 }}
            id="first-variable-name"
            defaultValue={inputState[0].name}
            onChange={({ currentTarget }) =>
              setInputState((prev) => [
                { ...prev[0], name: currentTarget?.value ?? "" },
                prev[1],
              ])
            }
          />
          <input
            type="number"
            defaultValue="0"
            id="first-variable-value"
            style={{ width: 200 }}
            onChange={({ currentTarget }) =>
              setInputState((prev) => [
                { ...prev[0], value: parseInt(currentTarget?.value ?? "0") },
                prev[1],
              ])
            }
          />
        </div>
        <div>
          <input
            style={{ width: 200 }}
            id="second-variable-name"
            defaultValue={inputState[1].name}
            onChange={({ currentTarget }) =>
              setInputState((prev) => [
                prev[0],
                { ...prev[1], name: currentTarget?.value ?? "" },
              ])
            }
          />
          <input
            type="number"
            defaultValue="100"
            id="second-variable-value"
            style={{ width: 200 }}
            onChange={({ currentTarget }) =>
              setInputState((prev) => [
                prev[0],
                { ...prev[1], value: parseInt(currentTarget?.value ?? "0") },
              ])
            }
          />
        </div>
      </div>
      <div style={{ gap: 20, display: "flex", alignItems: "center" }}>
        {state.locale}
        <button
          style={{ width: 100 }}
          onClick={() => setState((prev) => ({ ...prev, locale: "en" }))}
        >
          Eng
        </button>
        <button
          style={{ width: 100 }}
          onClick={() => setState((prev) => ({ ...prev, locale: "th" }))}
        >
          Thai
        </button>
      </div>
      <div>
        <FormattedMessage
          id="main"
          defaultMessage={"error"}
          values={{
            [inputState[0].name]: [inputState[0].value],
            [inputState[1].name]: [inputState[1].value],
          }}
        />
      </div>
    </div>
  );
};

const AppWithProvider = () => {
  const { locale, messages } = useRecoilValue(localeStore);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App />
    </IntlProvider>
  );
};

export default AppWithProvider;
