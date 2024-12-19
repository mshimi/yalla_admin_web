import type React from "react"
import { Modal, ModalDialog } from "react-bootstrap"
import "./FormModalStyle.css"
import { useEffect, useState } from "react"

interface FormModalProps {
  show: boolean
  title: string
  onHide: () => void
  children?: React.ReactNode
  errorWidget?: React.ReactNode
}

const FormModal: React.FC<FormModalProps> = ({ show, title, onHide, children,errorWidget }) => {
  const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
  const [animationClass, setAnimationClass] = useState("modal-slide-up");

  
  return (
    <Modal
      show={show || animationClass === "modal-slide-down"} // Keep visible during slide-down animation
      onHide={()=>{
        setAnimationClass(()=>"modal-slide-down");
        const timeout = setTimeout(() => {
          setAnimationClass(()=>"modal-slide-up");
          onHide(); // Call onHide after animation completes
        }, 330); 
        
      }}
      centered={!isMobile} // Centered for larger screens
      dialogClassName={isMobile ? animationClass : ""} // Dynamically apply animation class
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {errorWidget && <Modal.Footer>{errorWidget}</Modal.Footer>}
    </Modal>
  );
};
export default FormModal
