import React, {ReactElement} from "react";
import PropTypes from "prop-types";

export default function PowerIcon(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0001 3C11.4501 3 11.0001 3.45 11.0001 4V12C11.0001 12.55 11.4501 13 12.0001 13C12.5501 13 13.0001 12.55 13.0001 12V4C13.0001 3.45 12.5501 3 12.0001 3ZM17.1401 5.86C16.7501 6.25 16.7601 6.86 17.1301 7.25C18.2601 8.45 18.9601 10.05 19.0001 11.82C19.0901 15.65 15.9201 18.95 12.0901 18.99C8.18005 19.05 5.00005 15.9 5.00005 12C5.00005 10.16 5.71005 8.49 6.87005 7.24C7.24005 6.85 7.24005 6.24 6.86005 5.86C6.46005 5.46 5.81005 5.47 5.43005 5.88C3.98005 7.42 3.07005 9.47 3.00005 11.74C2.86005 16.62 6.83005 20.84 11.7101 20.99C16.8101 21.15 21.0001 17.06 21.0001 11.99C21.0001 9.62 20.0801 7.48 18.5801 5.88C18.2001 5.47 17.5401 5.46 17.1401 5.86Z" fill="#494B51" stroke="#494B51"/>
    </svg>
  );
}

PowerIcon.propTypes = {
    className: PropTypes.string
};