import React, { ReactElement, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Button from "../form/Button";
import TextField from "../form/TextField";
import RadioButtonGroup from "../form/RadioButtonGroup";

function Center(): ReactElement {
  const match = useRouteMatch();
  const [count, setCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    //Faking API call here
    setTimeout(() => {
      setCount(count + 1)
      setLoading(false);
    }, 2000);
  };

  return (
    <Switch>
      <Route exact path={match.path}>
        Mount Dashboard Home Component here
      </Route>

      <Route exact path={`${match.path}/files`}>
        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          <div>{count}</div>
          <div className={"flex flex-col"}>
            <div className={"flex flex-row items-center"}>
              <span>Primary Button:</span>
              <Button variant={"primary"} onClick={() => setCount(count + 1)}>button</Button>
              <Button variant={"primary"} isLoading={loading} onClick={() => fetchData()}>loading button</Button>
              <Button variant={"primary"} onClick={() => setCount(count + 1)} disabled>button</Button>
            </div>

            <div className={"flex flex-row items-center"}>
              <span>Secondary Button:</span>
              <Button variant={"secondary"} onClick={() => setCount(count + 1)}>button</Button>
              <Button variant={"secondary"} isLoading={loading} onClick={() => fetchData()}>loading button</Button>
              <Button variant={"secondary"} onClick={() => setCount(count + 1)} disabled>button</Button>
            </div>

            <div className={"flex flex-row items-center"}>
              <span>Text Button:</span>
              <Button variant={"text"} onClick={() => setCount(count + 1)}>button</Button>
              <Button variant={"text"} isLoading={loading} onClick={() => fetchData()}>loading button</Button>
              <Button variant={"text"} onClick={() => setCount(count + 1)} disabled>button</Button>
            </div>
          </div>
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg flex flex-col gap-2"}>
          <div>{inputText}</div>
          <TextField type={"text"} name={"inputField1"} label={"Username"} onChange={e => setInputText(e?.target?.value)} />
          <TextField type={"password"} visibilityButton={true} name={"inputField2"} label={"Password"} errorMessage={"Password incorrect!"} />
          <TextField type={"text"} name={"inputField3"} label={"Username"} successMessage={"Username available"} />
          <TextField type={"text"} name={"inputField4"} label={"Just some input field"} hint={"Just some hint"} />
          <TextField type={"text"} name={"inputField5"} label={"Username"} successMessage={"Username available"} disabled />
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg flex flex-col gap-2"}>
          <RadioButtonGroup options={["test 1", "test 2", "test 3"]} disabledOptions={["test 3"]} onChange={(value) => console.log(value)}></RadioButtonGroup>
        </div>
      </Route>
    </Switch >
  )
}


export default Center