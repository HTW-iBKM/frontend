import React from 'react';
import './App.css';

class App extends React.Component<any, { count: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }

  handleClickEvent() {
   this.setState({ count: this.state.count + 1 })
  }

  render(): React.ReactElement {
    return (
      <div className="w-9/12 lg:w-6/12 p-8 rounded-lg shadow-lg bg-white">
        <h1 className={"text-2xl font-bold my-4"}>iBKM Dashboard</h1>
        <p>Dieses Projekt wird im Rahmen eines Praxis-Projektes an der HTW Berlin in Kooperation mit Exxeta durchgeführt.
          Ziel ist es, prognostizierte Strom-Preis und -Verbrauchsmengen aufzubereiten und dem Nutzer visualisiert zur Verfügung zu stellen.
          Die zugrundeliegenden Daten werden auf einer Amazon AWS Lambda serverless Architektur mittels Maschine Learning erzeugt.</p>

        <p>Die technische Grundlage des iBMK Dashboards stellt das Javascript Framework React (Typescript) dar.
          Zudem kommt im Frontend Tailwindcss zum Einsatz.</p>

        <div className={"flex flex-row gap-5 content-center mt-5"}>
          <span className={"py-2 px-5 font-bold text-3xl"}>{this.state.count}</span>
          <button className={"py-2 px-5 bg-gradient-to-tr from-pink-500 to-red-500 text-white rounded-lg shadow"} onClick={this.handleClickEvent}>Erhöhen!</button>
        </div>
      </div>
    );
  }
}

export default App;
