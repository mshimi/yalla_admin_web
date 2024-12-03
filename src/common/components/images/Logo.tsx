
import logo2 from "../../../assets/logo2.png";
import { Image } from 'react-bootstrap';
import type React from 'react';

  const  Logo: React.FC = () => {
  return (
    <Image
            src={logo2}
            alt="Centered Placeholder"
            className="pulse-animation"
            roundedCircle
          />
  );
};


export default Logo;