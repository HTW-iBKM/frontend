import React, {ReactElement, useContext, useState} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Home from "../../sites/home/Home";
import Button from "../form/Button";
import TextField from "../form/TextField";
import RadioButtonGroup from "../form/RadioButtonGroup";
import {ToastContext} from "../../context/ToastContext";
import { v4 as uuidv4 } from 'uuid';
import EditIcon from "../icons/EditIcon";
import OpenInNewIcon from "../icons/OpenInNewIcon";
import InsertDriveFileIcon from "../icons/InsertDriveFileIcon";

function Center(): ReactElement {
  const match = useRouteMatch();
  const [count, setCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    //Faking API call here
    return new Promise(() => {
      setTimeout(() => {
        setCount(count + 1)
        setLoading(false);
      }, 2000);
    })
  };

  const context = useContext(ToastContext);

  return (
    <Switch>
      <Route exact path={match.path}>
        <Home/>
      </Route>

      <Route exact path={`${match.path}/files`}>
        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          <div>{count}</div>
          <div className={"flex flex-col"}>
            <div className={"flex flex-row items-center"}>
              <span>Primary Button:</span>
              <Button variant={"primary"} onClick={() => setCount(count + 1)}>button</Button>
              <Button variant={"primary"} isLoading={loading} onClick={async () => await fetchData()}>loading button</Button>
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

            <div className={"flex flex-row gap-6 items-center"}>
              <span>Icon Button:</span>
              <Button variant={"icon"} onClick={() => setCount(count + 1)}><EditIcon></EditIcon></Button>
              <Button variant={"icon"} isLoading={loading} onClick={() => fetchData()}><InsertDriveFileIcon></InsertDriveFileIcon></Button>
              <Button variant={"icon"} onClick={() => setCount(count + 1)} disabled><OpenInNewIcon></OpenInNewIcon></Button>
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

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          <Button variant={"primary"} onClick={() => context.setToasts([...context.toasts, {id: uuidv4(), type: "success", headline: "Success Message!", message: "success yeah!"}])}>Success Message</Button>
          <Button variant={"primary"} onClick={() => context.setToasts([...context.toasts, {id: uuidv4(), type: "warning", headline: "Warning Message!", message: "warning okay lets seeh!"}])}>Warning Message</Button>
          <Button variant={"primary"} onClick={() => context.setToasts([...context.toasts, {id: uuidv4(), type: "error", headline: "Error Message!", message: "error oh no!"}])}>Error Message</Button>
        </div>
      </Route>
    </Switch>
  )
}


export default Center