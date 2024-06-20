import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import Backdrop from "../Components/Backdrop/Backdrop";
import CoverPage from "../Components/CoverPage/CoverPage";
import AboutPage from "../Components/AboutPage/AboutPage";
// import SidePanel from "../Components/SidePanel/SidePanel";

function StateManagement({ treeMapData, clickData, handleZoomClick }) {
  const [shouldRenderCoverPage, setShouldRenderCoverPage] = useState(false);
  const [shouldRenderAboutPage, setShouldRenderAboutPage] = useState(false);
  const dataFluentElement = document.getElementById("datafluent");
  const aboutElement = document.getElementById("about");
  //   const [sidePanelOpen, setsidePanelOpen] = useState(false);
  //   const [userId, setUserId] = useState(null);

  //   const sidePanelOpenClickHandler = () => {
  //     setsidePanelOpen((prevState) => {
  //       return !prevState;
  //     });
  //   };

  useEffect(() => {
    if (clickData) {
      if (!clickData.depth || clickData.depth === 0) {
        setShouldRenderCoverPage(true);
      } else if (clickData.depth === 1) {
        if (dataFluentElement)
          ReactDOM.unmountComponentAtNode(dataFluentElement);
        if (aboutElement) ReactDOM.unmountComponentAtNode(aboutElement);
        
        setShouldRenderAboutPage(false);
        setShouldRenderCoverPage(false);
      } else if (clickData.depth === 2) {
        if(clickData.data.id === "aboutMap"){

          setShouldRenderAboutPage(true);
        }
        
      }
    }
  }, [clickData]);
  //   const backdropClickHandler = () => {
  //     setsidePanelOpen(false);
  //   };

  // THIS IS HOW I RENDER INDIVIDUAL COMPONENTS
  // useEffect(() => {
  //   if
  //   console.log("useEffect");
  //   console.log(clickData);
  //   // if (props.clickData && props.clickData.id === "datafluent") {
  //   //   setShouldRenderCoverPage(true);
  //   // } else if (props.clickData && props.clickData.id === "about") {
  //   //   setShouldRenderAboutPage(true);
  //   // } else {
  //   //   if (dataFluentElement) {
  //   //     ReactDOM.unmountComponentAtNode(dataFluentElement);
  //   //   }
  //   //   setShouldRenderCoverPage(false);
  //   //   if (aboutElement) {
  //   //     ReactDOM.unmountComponentAtNode(aboutElement);
  //   //   }
  //   //   setShouldRenderCoverPage(false);
  //   // }
  // }, [props]);

  //   useEffect(() => {
  //     console.log("**userId: ", userId);
  //   }, [userId]);

  // useEffect(() => {
  //   if(props.clickData){
  //     console.log(node)
  //     if(props.clickData.height ===2){
  //       ReactDOM.unmountComponentAtNode(node)
  //     }
  //   }

  // }, [props.clickData,node])

  return (
    <div className="state-managment">
      {/* {sidePanelOpen ? <Backdrop /> : null}
      <SidePanel
        show={sidePanelOpen}
        hidePanel={backdropClickHandler}
        setUserId={setUserId}
        userId={userId}
      /> */}

      <nav>
        <div className="up">&uarr; UP</div>
        {/* <div className="up" onClick={handleZoomClick}>
          Zoom
        </div> */}
        {/* <div className="login" onClick={sidePanelOpenClickHandler}>
          &rarr; Login / Sign Up
        </div> */}
      </nav>
      {shouldRenderCoverPage && dataFluentElement
        ? ReactDOM.createPortal(<CoverPage />, dataFluentElement)
        : null}
      {shouldRenderAboutPage && aboutElement
        ? ReactDOM.createPortal(<AboutPage />, aboutElement)
        : null}
    </div>
  );
}
export default StateManagement;
