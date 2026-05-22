import React, { lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
// import Backdrop from "../Components/Backdrop/Backdrop";
// import SidePanel from "../Components/SidePanel/SidePanel";

const CoverPage = lazy(() => import("../Components/CoverPage/CoverPage"));
const AboutPage = lazy(() => import("../Components/AboutPage/AboutPage"));
const NightSkiProject = lazy(() => import("../Components/ProjectsPage/NightSkiProject"));
const PlaygroundPage = lazy(() => import("../Components/ProjectsPage/PlaygroundPage"));
const WebApplicationsPage = lazy(() => import("../Components/ProjectsPage/WebApplicationsPage"));
const ArtGallery = lazy(() => import("../Components/ArtGallery/ArtGallery"));
const BlogPage = lazy(() => import("../Components/Blog/BlogPage"));
const ContactPage = lazy(() => import("../Components/ContactPage/ContactPage"));

const findNodeById = (node, id) => {
  if (!node) {
    return null;
  }

  if (node.id === id) {
    return node;
  }

  for (const child of node.children || []) {
    const match = findNodeById(child, id);

    if (match) {
      return match;
    }
  }

  return null;
};

const getContactPageConfig = (clickData) => {
  const nodeId = clickData?.data?.id;

  if (nodeId === "datafluentContactMap" || nodeId === "datafluentContactForm") {
    return {
      targetId: "datafluentContactForm",
      source: "DataFluent",
      title: "Contact DataFluent",
      intro:
        "Share the workflow, data problem, site, dashboard, or AI tool you want to build.",
    };
  }

  if (nodeId === "contactMap" || nodeId === "aboutContactForm") {
    return {
      targetId: "aboutContactForm",
      source: "About Me",
      title: "Contact James",
      intro:
        "Send a note about collaboration, project ideas, data problems, or practical software work.",
    };
  }

  return null;
};

function StateManagement({ treeMapData, clickData, handleZoomClick }) {
  const [shouldRenderCoverPage, setShouldRenderCoverPage] = useState(false);
  const [shouldRenderAboutPage, setShouldRenderAboutPage] = useState(false);
  const [shouldRenderNightSkiProject, setShouldRenderNightSkiProject] = useState(false);
  const [shouldRenderPlaygroundPage, setShouldRenderPlaygroundPage] = useState(false);
  const [shouldRenderWebApplicationsPage, setShouldRenderWebApplicationsPage] = useState(false);
  const [shouldRenderArtGallery, setShouldRenderArtGallery] = useState(false);
  const [shouldRenderBlogPage, setShouldRenderBlogPage] = useState(false);
  const [shouldRenderContactPage, setShouldRenderContactPage] = useState(false);
  const contactPageConfig = getContactPageConfig(clickData);
  const playgroundProjects =
    findNodeById(treeMapData, "playgroundProjects")?.projects || [];
  const webApplicationProjects =
    findNodeById(treeMapData, "webApplicationProjects")?.projects || [];
  const dataFluentElement =
    document.getElementById("datafluent-cover-slot") ||
    document.getElementById("datafluent");
  const aboutElement = document.getElementById("about");
  const nightSkiElement = document.getElementById("nightSkiProject");
  const playgroundElement = document.getElementById("playgroundProjects");
  const webApplicationsElement = document.getElementById("webApplicationProjects");
  const artGalleryElement = document.getElementById("artGallery");
  const blogElement = document.getElementById("blogPosts");
  const contactElement = contactPageConfig
    ? document.getElementById(contactPageConfig.targetId)
    : null;
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
        setShouldRenderAboutPage(false);
        setShouldRenderNightSkiProject(false);
        setShouldRenderPlaygroundPage(false);
        setShouldRenderWebApplicationsPage(false);
        setShouldRenderArtGallery(false);
        setShouldRenderBlogPage(false);
        setShouldRenderContactPage(false);
      } else if (clickData.depth === 1) {
        setShouldRenderAboutPage(false);
        setShouldRenderCoverPage(clickData.data.id === "datafluent");
        setShouldRenderNightSkiProject(false);
        setShouldRenderPlaygroundPage(false);
        setShouldRenderWebApplicationsPage(false);
        setShouldRenderArtGallery(false);
        setShouldRenderBlogPage(false);
        setShouldRenderContactPage(false);
      } else if (clickData.depth === 2) {
        setShouldRenderCoverPage(false);
        if (clickData.data.id === "webApplicationsDataSystems") {
          setShouldRenderAboutPage(false);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(false);
          setShouldRenderWebApplicationsPage(true);
          setShouldRenderArtGallery(false);
          setShouldRenderBlogPage(false);
          setShouldRenderContactPage(false);
        } else if(clickData.data.id === "aboutMap"){
          setShouldRenderAboutPage(true);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(false);
          setShouldRenderWebApplicationsPage(false);
          setShouldRenderArtGallery(false);
          setShouldRenderBlogPage(false);
          setShouldRenderContactPage(false);
        } else if (clickData.data.id === "datafluentContactMap") {
          setShouldRenderAboutPage(false);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(false);
          setShouldRenderWebApplicationsPage(false);
          setShouldRenderArtGallery(false);
          setShouldRenderBlogPage(false);
          setShouldRenderContactPage(true);
        } else if (clickData.data.id === "projectsMap") {
          setShouldRenderAboutPage(false);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(true);
          setShouldRenderWebApplicationsPage(false);
          setShouldRenderArtGallery(false);
          setShouldRenderBlogPage(false);
          setShouldRenderContactPage(false);
        } else if (clickData.data.id === "blog") {
          setShouldRenderAboutPage(false);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(false);
          setShouldRenderWebApplicationsPage(false);
          setShouldRenderArtGallery(false);
          setShouldRenderBlogPage(true);
          setShouldRenderContactPage(false);
        } else if (clickData.data.id === "galleryMap") {
          setShouldRenderAboutPage(false);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(false);
          setShouldRenderWebApplicationsPage(false);
          setShouldRenderArtGallery(true);
          setShouldRenderBlogPage(false);
          setShouldRenderContactPage(false);
        } else if (clickData.data.id === "contactMap") {
          setShouldRenderAboutPage(false);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(false);
          setShouldRenderWebApplicationsPage(false);
          setShouldRenderArtGallery(false);
          setShouldRenderBlogPage(false);
          setShouldRenderContactPage(true);
        } else {
          setShouldRenderAboutPage(false);
          setShouldRenderNightSkiProject(false);
          setShouldRenderPlaygroundPage(false);
          setShouldRenderWebApplicationsPage(false);
          setShouldRenderArtGallery(false);
          setShouldRenderBlogPage(false);
          setShouldRenderContactPage(false);
        }
      } else if (clickData.depth === 3) {
        setShouldRenderCoverPage(false);
        setShouldRenderAboutPage(clickData.data.id === "aboutMap");
        setShouldRenderNightSkiProject(clickData.data.id === "nightSki");
        setShouldRenderPlaygroundPage(clickData.data.id === "playgroundProjects");
        setShouldRenderWebApplicationsPage(clickData.data.id === "webApplicationProjects");
        setShouldRenderArtGallery(clickData.data.id === "artGallery");
        setShouldRenderBlogPage(clickData.data.id === "blogPosts");
        setShouldRenderContactPage(
          clickData.data.id === "datafluentContactForm" ||
            clickData.data.id === "aboutContactForm"
        );
      } else if (clickData.depth === 4) {
        setShouldRenderCoverPage(false);
        setShouldRenderAboutPage(clickData.data.id === "aboutMap");
        setShouldRenderNightSkiProject(clickData.data.id === "nightSki");
        setShouldRenderPlaygroundPage(false);
        setShouldRenderWebApplicationsPage(false);
        setShouldRenderArtGallery(false);
        setShouldRenderBlogPage(false);
        setShouldRenderContactPage(false);
      } else if (clickData.depth === 5) {
        setShouldRenderCoverPage(false);
        setShouldRenderAboutPage(clickData.data.id === "about");
        setShouldRenderNightSkiProject(clickData.data.id === "nightSkiProject");
        setShouldRenderPlaygroundPage(false);
        setShouldRenderWebApplicationsPage(false);
        setShouldRenderArtGallery(false);
        setShouldRenderBlogPage(false);
        setShouldRenderContactPage(false);
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
        <button className="up" type="button">
          &uarr; UP
        </button>
        {/* <div className="up" onClick={handleZoomClick}>
          Zoom
        </div> */}
        {/* <div className="login" onClick={sidePanelOpenClickHandler}>
          &rarr; Login / Sign Up
        </div> */}
      </nav>
      {shouldRenderCoverPage && dataFluentElement
        ? createPortal(
            <Suspense fallback={null}>
              <CoverPage />
            </Suspense>,
            dataFluentElement
          )
        : null}
      {shouldRenderAboutPage && aboutElement
        ? createPortal(
            <Suspense fallback={null}>
              <AboutPage />
            </Suspense>,
            aboutElement
          )
        : null}
      {shouldRenderNightSkiProject && nightSkiElement
        ? createPortal(
            <Suspense fallback={null}>
              <NightSkiProject />
            </Suspense>,
            nightSkiElement
          )
        : null}
      {shouldRenderPlaygroundPage && playgroundElement
        ? createPortal(
            <Suspense fallback={null}>
              <PlaygroundPage projects={playgroundProjects} />
            </Suspense>,
            playgroundElement
          )
        : null}
      {shouldRenderWebApplicationsPage && webApplicationsElement
        ? createPortal(
            <Suspense fallback={null}>
              <WebApplicationsPage projects={webApplicationProjects} />
            </Suspense>,
            webApplicationsElement
          )
        : null}
      {shouldRenderArtGallery && artGalleryElement
        ? createPortal(
            <Suspense fallback={null}>
              <ArtGallery />
            </Suspense>,
            artGalleryElement
          )
        : null}
      {shouldRenderBlogPage && blogElement
        ? createPortal(
            <Suspense fallback={null}>
              <BlogPage />
            </Suspense>,
            blogElement
          )
        : null}
      {shouldRenderContactPage && contactElement && contactPageConfig
        ? createPortal(
            <Suspense fallback={null}>
              <ContactPage
                source={contactPageConfig.source}
                title={contactPageConfig.title}
                intro={contactPageConfig.intro}
              />
            </Suspense>,
            contactElement
          )
        : null}
    </div>
  );
}
export default StateManagement;
