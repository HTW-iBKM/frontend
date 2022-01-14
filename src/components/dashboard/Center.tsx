import React, { ReactElement, useContext, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "../../sites/home/Home";
import Button from "../form/Button";
import TextField from "../form/TextField";
import RadioButtonGroup from "../form/RadioButtonGroup";
import { ToastContext } from "../../context/ToastContext";
import { v4 as uuidv4 } from 'uuid';
import EditIcon from "../icons/EditIcon";
import OpenInNewIcon from "../icons/OpenInNewIcon";
import InsertDriveFileIcon from "../icons/InsertDriveFileIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import DeleteForeverIcon from "../icons/DeleteForeverIcon";
import DownloadIcon from "../icons/DownloadIcon";
import Tabs from "../tabs/Tabs";
import SelectField from "../form/SelectField";
import DatePicker from "../datePicker/DatePicker";
import Files from "../../sites/files/Files";
import Checkbox from "../form/Checkbox";

function Center(): ReactElement {
  const match = useRouteMatch();
  const [count, setCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(String);
  const [selectedDateRange, setSelectedDateRange] = useState<Date[]>([]);
  const context = useContext(ToastContext);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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


  const selectOptions = [
    { value: 'woche1', label: 'Erste Woche' },
    { value: 'woche2', label: 'Zweite Woche' },
    { value: 'woche3', label: 'Dritte Woche' }
  ]
  const handleDateRangeChange = (value: Date[]) => {
    setSelectedDateRange(value)
    console.log(selectedDateRange)
  }

  return (
    <Switch>
      <Route exact path={match.path}>
        <Home />
      </Route>

      <Route exact path={`${match.path}/files`}>
        <Files />
      </Route>

      <Route exact path={`${match.path}/components`}>
        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          <h1>Icons 24x24</h1>
          <div className={"flex flex-col"}>
            <div className={"flex flex-row gap-6 items-center"}>
              <EditIcon className={"w-6 h-6"}></EditIcon>
              <InsertDriveFileIcon className={"w-6 h-6"}></InsertDriveFileIcon>
              <OpenInNewIcon className={"w-6 h-6"}></OpenInNewIcon>
              <ChevronLeftIcon className={"w-6 h-6"}></ChevronLeftIcon>
              <ChevronRightIcon className={"w-6 h-6"}></ChevronRightIcon>
              <DeleteForeverIcon className={"w-6 h-6"}></DeleteForeverIcon>
              <DownloadIcon className={"w-6 h-6"}></DownloadIcon>
            </div>
          </div>
        </div>

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
          <TextField className="my-5" type={"text"} name={"inputField1"} label={"Username"} onChange={e => setInputText(e?.target?.value)} />
          <TextField className="my-5" type={"password"} visibilityButton={true} name={"inputField2"} label={"Password"} errorMessage={"Password incorrect!"} />
          <TextField className="my-5" type={"text"} name={"inputField3"} label={"Username"} successMessage={"Username available"} />
          <TextField className="my-5" type={"text"} name={"inputField4"} label={"Just some input field"} hint={"Just some hint"} />
          <TextField className="my-5" type={"text"} name={"inputField5"} label={"Username"} successMessage={"Username available"} disabled />
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg flex flex-col gap-2"}>
          <RadioButtonGroup selected="test 1" options={["test 1", "test 2", "test 3"]} disabledOptions={["test 3"]} onChange={(value) => console.log(value)}></RadioButtonGroup>
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg flex flex-col gap-2"}>
          <Checkbox name="test1" checked={isCheckboxChecked} onChange={(event) => setIsCheckboxChecked(event.target.checked)}>Test 1</Checkbox>
          <Checkbox name="test3" checked={true} disabled onChange={(event) => console.log(event)}>Test 2</Checkbox>
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          Selected Value: {selectedOption}
          <div className={"flex gap-4"}>
            <SelectField variant="default" label="Woche auswählen" options={selectOptions} onChange={(value) => setSelectedOption(value)}></SelectField>
            <SelectField variant="small" label="Woche auswählen" options={selectOptions} onChange={(value) => console.log(value)}></SelectField>
          </div>
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          <Button variant={"primary"} onClick={() => context.setToasts([...context.toasts, { id: uuidv4(), type: "success", headline: "Success Message!", message: "success yeah!" }])}>Success Message</Button>
          <Button variant={"primary"} onClick={() => context.setToasts([...context.toasts, { id: uuidv4(), type: "warning", headline: "Warning Message!", message: "warning okay lets seeh!" }])}>Warning Message</Button>
          <Button variant={"primary"} onClick={() => context.setToasts([...context.toasts, { id: uuidv4(), type: "error", headline: "Error Message!", message: "error oh no!" }])}>Error Message</Button>
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          <Tabs type="default" tabs={["Tab 1", "Tab 2", "Tab 3"]} panels={[<>Panel 1</>, <>Panel 2</>, <>Panel 3</>]} />
          <Tabs type="small" tabs={["Tab 1", "Tab 2", "Tab 3"]} panels={[<>Panel 1</>, <>Panel 2</>, <>Panel 3</>]} />
        </div>

        <div className={"bg-grayscale-light my-3 mx-5 py-3 px-5 rounded-lg shadow-lg"}>
          <DatePicker onValueUpdate={(value: Date[]) => handleDateRangeChange(value)} />
        </div>

      </Route>
    </Switch>
  )
}


export default Center