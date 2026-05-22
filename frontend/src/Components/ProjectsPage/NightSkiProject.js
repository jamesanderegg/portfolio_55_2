import React, { lazy, Suspense, useEffect, useState } from "react";

const Scene = lazy(() => import("../TreeShadows/Scene"));

function NightSkiProject() {
  const [shouldRenderScene, setShouldRenderScene] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;
    let idleId;

    const renderScene = () => {
      if (!cancelled) {
        setShouldRenderScene(true);
      }
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(renderScene, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(renderScene, 300);
    }

    return () => {
      cancelled = true;
      if (idleId) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <>
      {shouldRenderScene ? (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      ) : null}
    </>
  );
}

export default NightSkiProject;
