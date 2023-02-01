import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FormattedMessage, IntlProvider } from "react-intl";

import { localeStore } from "./store/localeStore";

import "./App.css";

const App = () => {
  const [state, setState] = useRecoilState(localeStore);

  const [inputState, setInputState] = useState([
    {
      id: "1",
      value: 0,
      name: "benefits_character_typed",
    },
    {
      id: "2",
      value: 100,
      name: "benefits_character_limit",
    },
    {
      id: "3",
      value: 0,
      name: "",
    },
    {
      id: "4",
      value: 0,
      name: "",
    },
  ]);

  const onNameChange = (changedIndex: number, name: string) => {
    const newInputState = [...inputState];

    newInputState[changedIndex].name = name;

    setInputState(newInputState);
  };

  const onValueChange = (changedIndex: number, value: number) => {
    const newInputState = [...inputState];

    newInputState[changedIndex].value = value;

    setInputState(newInputState);
  };

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
      <div className="form">
        {inputState?.map(({ id, name, value }, index) => (
          <>
            <input
              key={id}
              style={{ width: 200 }}
              defaultValue={name}
              onChange={({ currentTarget }) =>
                onNameChange(index, currentTarget?.value ?? "")
              }
            />
            <input
              type="number"
              style={{ width: 200 }}
              defaultValue={value}
              onChange={({ currentTarget }) =>
                onValueChange(index, parseInt(currentTarget?.value ?? "0"))
              }
            />
          </>
        ))}
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
      <h3>
        <FormattedMessage
          id="main"
          defaultMessage={"error"}
          values={inputState?.reduce(
            (prev, { name, value }) => ({ ...prev, [name]: value }),
            {}
          )}
        />
      </h3>
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
