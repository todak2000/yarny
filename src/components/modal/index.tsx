/* eslint-disable @typescript-eslint/ban-types */
"use client"
import ReactDOM from "react-dom"
import { FC, useEffect } from "react"


interface ModalProps {
  children: JSX.Element
  onClose: Function
  backdropFilter?: boolean
  maxWidth?: string
  header?: string

}

const Modal: FC<ModalProps> = ({
  children,
  backdropFilter,
  header,
  maxWidth,
  onClose,
}) => {
  //listens for keyboard events
  const listenKeyboardEvent = (event: any) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      onClose()
    } else {
      return ""
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", listenKeyboardEvent)
    return () => window.removeEventListener("keydown", listenKeyboardEvent)
    //eslint-disable-next-line
  }, [])

  //stops clicking on the content to affect the modal
  const onDialogueClick = (event: any) => {
    event.stopPropagation()
  }

  //closes modal on overlay click
  const onOverlayClick = () => {
    onClose()
  }

  const modal = (
    <div
      className="overlay  fixed top-0 bottom-0 left-0 right-0 z-20 w-[100%] h-[100%] bg-neutral-black/40 backdrop-blur-sm overflow-auto"
      onClick={onOverlayClick}
    >
      <div className={"modal-content w-[100%] h-[100%]"}>
        <div
          onClick={onDialogueClick}
          className={`relative outline-none w-auto w-min-[23.75rem] w-max-[23.75rem] inline-block align-middle border-box top-[50%] laptop:top-[60%] laptopMd:top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]`}
        >
          {header && <div>{header}</div>}
          {children}
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(modal, document.body)
}

export default Modal
