import React from 'react';
import './App.css';

class App extends React.Component {
  render(): React.ReactElement {
      return (
          <div className="w-9/12 lg:w-6/12 p-8 rounded-lg shadow-lg bg-white">
              <h1 className={"text-2xl font-bold my-4"}>iBKM Dashboard</h1>
              <p>Dieses Projekt wird im Rahmen eines Praxis-Projektes an der HTW Berlin in Kooperation mit Exxeta durchgeführt.
                  Ziel ist es, prognostizierte Strom-Preis und -Verbrauchsmengen aufzubereiten und dem Nutzer visualisiert zur Verfügung zu stellen.
                  Die zugrundeliegenden Daten werden auf einer Amazon AWS Lambda serverless Architektur mittels Maschine Learning erzeugt.</p>

              <p>Die technische Grundlage des iBMK Dashboards stellt das Javascript Framework React (Typescript) dar.
                  Zudem kommt im Frontend Tailwindcss zum Einsatz.</p>
          </div>
      );
  }
}

export default App;
