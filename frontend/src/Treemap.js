import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  easeCubicOut,
  hierarchy,
  scaleLinear,
  scaleOrdinal,
  select,
  transition,
  treemap as createTreemap,
  treemapBinary,
} from "d3";
import "./styles/Zoom.css";

import StateManagment from "./utilities/StateManagment";
import SecretPage from "./Components/SecretPage/SecretPage";

const embeddedContentHostIds = new Set([
  "about",
  "nightSkiProject",
  "artGallery",
  "blogPosts",
  "datafluentContactForm",
  "aboutContactForm",
]);

const treemapPalette = [
  "#8E897D",
  "#D5CFC0",
  "#252021",
  "#BDA877",
  "#4C4940",
  "#7B4D3B",
  "#5F6081",
  "#AC473D",
  "#E4BB41",
  "#C95E2D",
];

const getHashSlug = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");

const getDataHash = (data) => getHashSlug(data.hash || data.name || data.id);

const getNodeHash = (d) => getDataHash(d.data);

const getTreemapElementId = (d) =>
  d.data.id ? d.data.id.split(" ")[0] : "null";

const getNodeData = (node) => node?.data || node || {};

const isEmbeddedContentHost = (node) => {
  const data = getNodeData(node);

  return Boolean(data.portal || embeddedContentHostIds.has(data.id));
};

const hasNodeActionTarget = (node) => {
  const data = getNodeData(node);

  return Boolean(
    node?.children?.length ||
      data.children?.length ||
      data.href ||
      data.portal ||
      embeddedContentHostIds.has(data.id)
  );
};

const getAccessibleNodeLabel = (d) => {
  const name = d.data.name || "Untitled section";
  const description = d.data.description ? ` ${d.data.description}` : "";

  if (isEmbeddedContentHost(d)) {
    return `${name}.${description}`;
  }

  if (d.data.href) {
    return `Visit ${name}.${description}`;
  }

  if (d.children) {
    return `Open ${name} section.${description}`;
  }

  if (hasNodeActionTarget(d)) {
    return `Open ${name}.${description}`;
  }

  return `${name}.${description}`;
};

const isNestedInteractiveEvent = (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      "a, button, input, textarea, select, label, [contenteditable='true']"
    )
  );
};

function AccessibleTreemapList({ nodes }) {
  if (!nodes?.length) {
    return null;
  }

  return (
    <ul>
      {nodes.map((node) => {
        const hasChildren = Boolean(node.children?.length);
        const hash = getDataHash(node);
        const href = node.href || `#${hash}`;
        const descriptionId = node.description
          ? `treemap-nav-desc-${getHashSlug(node.id || node.name)}`
          : undefined;

        return (
          <li key={node.id || node.name}>
            <a href={href} aria-describedby={descriptionId}>
              {node.name}
            </a>
            {node.description ? (
              <span id={descriptionId} className="sr-only">
                {node.description}
              </span>
            ) : null}
            {hasChildren ? <AccessibleTreemapList nodes={node.children} /> : null}
          </li>
        );
      })}
    </ul>
  );
}

function AccessibleTreemapNavigation({ treeMapData }) {
  if (!treeMapData?.children?.length) {
    return null;
  }

  return (
    <nav className="treemap-accessible-nav" aria-label="Treemap text navigation">
      <h2>Treemap sections</h2>
      <AccessibleTreemapList nodes={treeMapData.children} />
    </nav>
  );
}

function TreeMap({ treeMapData }) {
  const [clickData, setClickData] = useState(null);
  const [isSecretPage, setIsSecretPage] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const zoomRef = useRef(null);
  const ref = useRef();
  const rootNodeRef = useRef(null);
  const selectedNodeKeyRef = useRef(null);
  const zoomNodeKeyRef = useRef(null);

  const getSecretPath = useCallback(() => {
    const basePath = window.location.pathname.replace(/\/secret\/?$/, "");

    return `${basePath || ""}/secret`.replace(/\/{2,}/g, "/");
  }, []);

  const getHomePath = useCallback(() => {
    const homePath = window.location.pathname.replace(/\/secret\/?$/, "");

    return homePath || "/";
  }, []);

  const openSecretPage = useCallback(() => {
    const nextPath = getSecretPath();

    setIsSecretPage(true);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState(null, "", `${nextPath}${window.location.search}`);
    }
  }, [getSecretPath]);

  const closeSecretPage = useCallback(() => {
    const nextPath = getHomePath();

    setIsSecretPage(false);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState(null, "", `${nextPath}${window.location.search}`);
    }
  }, [getHomePath]);

  useEffect(() => {
    const syncSecretPage = () => {
      setIsSecretPage(/\/secret\/?$/.test(window.location.pathname));
    };

    syncSecretPage();
    window.addEventListener("popstate", syncSecretPage);

    return () => {
      window.removeEventListener("popstate", syncSecretPage);
    };
  }, []);

  useEffect(() => {
    if (!treeMapData) {
      return;
    }
    const container = ref.current;
    if (!container) {
      return;
    }

    const getNodeKey = (d) => `${d.depth}:${d.data.id || d.data.name || ""}`;

    const getCurrentHash = () =>
      getHashSlug(decodeURIComponent(window.location.hash.replace(/^#/, "")));

    const updateHashForNode = (d) => {
      const hash = d.depth === 0 ? "" : getNodeHash(d);
      const nextUrl = hash
        ? `${window.location.pathname}${window.location.search}#${hash}`
        : `${window.location.pathname}${window.location.search}`;

      if (window.location.hash.replace(/^#/, "") !== hash) {
        window.history.pushState(null, "", nextUrl);
      }
    };

    const getLayoutSize = () => {
      const containerWidth = Math.max(container.clientWidth, 1);
      const containerHeight = Math.max(container.clientHeight, 1);
      const width = 100;
      const height = Math.max(
        100,
        Math.min(240, (containerHeight / containerWidth) * width)
      );

      return { width, height };
    };

    const drawTreemap = () => {
      const tileRootChildrenEvenly = (node, x0, y0, x1, y1) => {
        if (node.depth === 0 && node.children?.length === 2) {
          const midpoint = y0 + (y1 - y0) / 2;

          node.children[1].x0 = x0;
          node.children[1].x1 = x1;
          node.children[1].y0 = y0;
          node.children[1].y1 = midpoint;

          node.children[0].x0 = x0;
          node.children[0].x1 = x1;
          node.children[0].y0 = midpoint;
          node.children[0].y1 = y1;
          return;
        }

        treemapBinary(node, x0, y0, x1, y1);
      };

      var layout = getLayoutSize(),
        height = layout.height,
        width = layout.width,
        x = scaleLinear().domain([0, width]).range([0, 100]),
        y = scaleLinear().domain([0, height]).range([0, 100]),
        color = scaleOrdinal().range(treemapPalette),
        treemap = createTreemap()
          .size([width, height])
          .tile(tileRootChildrenEvenly)
          .paddingInner(0)
          .round(false);
      var data = treeMapData;
      var nodes = hierarchy(data).sum(function (d) {
        if (typeof d.value === "number") {
          return d.value;
        }

        return d.value ? 1 : 0;
      });
      //.sort(function(a, b) { return b.height - a.height || b.value - a.value });

      rootNodeRef.current = nodes.children[0];

      var currentDepth;
      var currentZoomNode = nodes;
      var hashChangeHandler;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      treemap(nodes);

      const chart = select(container);
      chart.selectAll(".node").remove();

      var cells = chart
        .selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("div")
        .attr("class", function (d) {
          return "node level-" + d.depth + (d.data.thumbnail ? " project-preview-node" : "");
        })
        .attr("title", function (d) {
          return d.data.name ? d.data.name : "null";
        })
        .attr("id", function (d) {
          return getTreemapElementId(d);
        })
        .attr("data-node-key", function (d) {
          return getNodeKey(d);
        })
        .attr("role", function (d) {
          return isEmbeddedContentHost(d) ? "region" : "button";
        })
        .attr("tabindex", "-1")
        .attr("aria-hidden", "true")
        .attr("aria-label", function (d) {
          return getAccessibleNodeLabel(d);
        })
        .attr("aria-expanded", function (d) {
          return d.children && !isEmbeddedContentHost(d) ? "false" : null;
        });

      const announceNode = (d, verb = "Opened") => {
        const name = d?.data?.name;

        if (name) {
          setAnnouncement(`${verb} ${name}`);
        }
      };

      const focusCell = (targetNode, delay = 0) => {
        window.setTimeout(() => {
          const targetCell = cells
            .filter((node) => node === targetNode)
            .node();

          targetCell?.focus();
        }, delay);
      };

      const focusFirstVisibleChild = (targetNode, delay = 0) => {
        window.setTimeout(() => {
          const targetCell = cells
            .filter(function (node) {
              return (
                node.depth === targetNode.depth + 1 &&
                node.ancestors().includes(targetNode) &&
                !isEmbeddedContentHost(node)
              );
            })
            .node();

          targetCell?.focus();
        }, delay);
      };

      const activateNode = (event, d) => {
        if (isNestedInteractiveEvent(event)) {
          return null;
        }

        if (!d.children) {
          selectedNodeKeyRef.current = getNodeKey(d);
          zoomNodeKeyRef.current = getNodeKey(d.parent || nodes);
          setClickData(d);
          updateHashForNode(d);
          announceNode(d, d.data.href ? "Opening" : "Opened");
          if (d.data.href) {
            window.location.href = d.data.href;
          }
          return null;
        }

        return zoom(d, {
          focusFirstChild: event?.type === "keydown",
        });
      };

      cells.style("left", function (d) {
        return x(d.x0) + "%";
      })
        .style("top", function (d) {
          return y(d.y0) + "%";
        })
        .style("width", function (d) {
          return x(d.x1) - x(d.x0) + "%";
        })
        .style("height", function (d) {
          return y(d.y1) - y(d.y0) + "%";
        })
        //.style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
        //.style("background-image", function(d) { return d.value ? "url(http://placekitten.com/g/300/300)" : "none"; })
        .style("background-color", function (d) {
          while (d.depth > 2) d = d.parent;
          
          if (d.data.color) {
            return d.data.color;
          }

          return color(d.data.name);
        })
        .on("click", function (event, d) {
          return activateNode(event, d);
        })
        .on("keydown", function (event, d) {
          if (event.key !== "Enter" && event.key !== " ") {
            return null;
          }

          event.preventDefault();
          return activateNode(event, d);
        });
      cells.append("p")
        .attr("class", "label")
        .text(function (d) {
          
          return d.data.name ? d.data.name : "---";
        }).style("display", function (d) {
          // Conditionally setting the display property
          if (d.data.portal || d.data.thumbnail || d.data.description || d.data.name === "Welcome" || d.data.name ==="File") {
            return "none"; // Hide the element
          } else {
            return "block"; // Show the element (default for p elements)
          }
        });
        ;
      const projectCards = cells.filter(function (d) {
        return !d.data.portal && (d.data.thumbnail || d.data.description);
      }).append("div")
        .attr("class", function (d) {
          return "project-card"
            + (d.data.id === "aboutMe" ? " about-card" : "")
            + (d.data.id === "datafluent" ? " datafluent-card" : "");
        });

      projectCards.filter(function (d) {
        return Boolean(d.data.thumbnail);
      }).append("img")
        .attr("class", "project-card-image")
        .attr("src", function (d) {
          return d.data.thumbnail;
        })
        .attr("alt", function (d) {
          return (d.data.name || "Project") + " screenshot";
        });

      const projectCardBody = projectCards.append("div")
        .attr("class", "project-card-body");

      const projectCardInfo = projectCardBody.append("div")
        .attr("class", "project-card-info");

      projectCardInfo.append("h3")
        .text(function (d) {
          return d.data.name || "Project";
        });

      projectCardInfo.append("p")
        .text(function (d) {
          return d.data.description || "";
        });

      projectCardInfo.filter(function (d) {
        return hasNodeActionTarget(d);
      }).append("span")
        .attr("class", "project-card-action")
        .text(function (d) {
          if (d.data.actionLabel) {
            return d.data.actionLabel;
          }

          return d.children ? "Open section" : "Open project";
        });

      projectCardBody.filter(function (d) {
        return d.data.id === "datafluent";
      }).append("div")
        .attr("id", "datafluent-cover-slot")
        .attr("class", "cover-page-slot");

      const aboutIdentity = projectCards.filter(function (d) {
        return d.data.id === "aboutMe";
      }).append("div")
        .attr("class", "about-card-identity");

      aboutIdentity.append("span")
        .attr("class", "about-card-name")
        .text("James Anderegg");

      aboutIdentity.append("span")
        .attr("class", "about-card-title")
        .text("Full Stack Engineer | AI Enthusiast");

      aboutIdentity.append("img")
        .attr("class", "about-card-photo")
        .attr("src", "/images/profile.jpg")
        .attr("alt", "James profile");
      // Cells.append("p").attr("class", "text").text(function(d) {
      //     return d.data.displayText ? d.data.displayText : "---";
      // });

      var parent = select(".up")
        .datum(nodes)
        .attr("aria-label", "Open parent section")
        .on("click", function (event,d) {
        const shouldOpenSecretPage =
          !currentZoomNode ||
          currentZoomNode.depth === 0;

        if (shouldOpenSecretPage) {
          openSecretPage();
          return null;
        }

        return zoom(d);
      });
      
      
      function zoom(d, options = {}) {
        // http://jsfiddle.net/ramnathv/amszcymq/
        const {
          animate = true,
          updateHash = true,
          updateSelection = true,
          focusFirstChild = false,
        } = options;

        if (d && updateSelection) {
          selectedNodeKeyRef.current = getNodeKey(d);
          zoomNodeKeyRef.current = getNodeKey(d);
          setClickData(d);
          if (updateHash) {
            updateHashForNode(d);
          }
          announceNode(d);
        }

        currentDepth = d.depth;
        currentZoomNode = d;
        parent.datum(d.parent || nodes);
        parent.attr(
          "aria-label",
          d.depth === 0
            ? "Open secret portfolio page"
            : `Move up to ${(d.parent || nodes).data.name || "parent section"}`
        );

        x.domain([d.x0, d.x1]);
        y.domain([d.y0, d.y1]);

        const duration = animate && !prefersReducedMotion ? 800 : 0;
        var t = transition().duration(duration).ease(easeCubicOut);

        cells.transition(t)
          .style("left", function (d) {
            return x(d.x0) + "%";
          })
          .style("top", function (d) {
            return y(d.y0) + "%";
          })
          .style("width", function (d) {
            return x(d.x1) - x(d.x0) + "%";
          })
          .style("height", function (d) {
            return y(d.y1) - y(d.y0) + "%";
          });

        cells.classed("hide", true);

        cells.filter(function (node) { // show the next depth within the current branch
          return node.depth === currentDepth + 1 && node.ancestors().includes(d);
        })
          .classed("hide", false);

        cells
          .attr("aria-hidden", function () {
            return select(this).classed("hide") ? "true" : "false";
          })
          .attr("tabindex", function (node) {
            if (select(this).classed("hide") || isEmbeddedContentHost(node)) {
              return "-1";
            }

            return "0";
          })
          .attr("aria-expanded", function (node) {
            if (!node.children || isEmbeddedContentHost(node)) {
              return null;
            }

            return node === d ? "true" : "false";
          });

        if (focusFirstChild) {
          focusFirstVisibleChild(d, duration);
        }
      }
      zoomRef.current = zoom;
      const descendants = nodes.descendants();

      const findNodeByHash = () => {
        const currentHash = getCurrentHash();

        if (!currentHash) {
          return null;
        }

        return descendants.find((node) => {
          return (
            getNodeHash(node) === currentHash ||
            getHashSlug(node.data.id) === currentHash
          );
        });
      };

      const showNode = (node, options = {}) => {
        const { animate = false, focus = false, announce = false } = options;
        const zoomTarget = node.children ? node : node.parent || nodes;
        const duration = animate && !prefersReducedMotion ? 800 : 0;

        selectedNodeKeyRef.current = getNodeKey(node);
        zoomNodeKeyRef.current = getNodeKey(zoomTarget);
        zoom(zoomTarget, {
          animate,
          updateHash: false,
          updateSelection: false,
        });
        setClickData(node);
        if (announce) {
          announceNode(node);
        }
        if (focus) {
          focusCell(node, duration);
        }
      };

      const restoreSelection = () => {
        const hashedNode = findNodeByHash();

        if (hashedNode) {
          showNode(hashedNode, { animate: false });
          return;
        }

        const selectedNode = selectedNodeKeyRef.current
          ? descendants.find((node) => getNodeKey(node) === selectedNodeKeyRef.current)
          : nodes.children?.[0];
        const zoomNode = zoomNodeKeyRef.current
          ? descendants.find((node) => getNodeKey(node) === zoomNodeKeyRef.current)
          : null;

        if (zoomNode) {
          zoom(zoomNode, {
            animate: false,
            updateHash: false,
            updateSelection: false,
          });
        }

        if (selectedNode) {
          selectedNodeKeyRef.current = getNodeKey(selectedNode);
          setClickData(selectedNode);
        }
      };

      hashChangeHandler = () => {
        const hashedNode = findNodeByHash();

        if (hashedNode) {
          showNode(hashedNode, { animate: true, focus: true, announce: true });
          return;
        }

        selectedNodeKeyRef.current = getNodeKey(nodes.children?.[0] || nodes);
        zoomNodeKeyRef.current = null;
        zoom(nodes, {
          animate: true,
          updateHash: false,
          updateSelection: false,
        });
        setClickData(nodes.children?.[0] || nodes);
        announceNode(nodes.children?.[0] || nodes);
      };

      restoreSelection();

      window.addEventListener("hashchange", hashChangeHandler);

      return {
        parent,
        cleanup: () => {
          window.removeEventListener("hashchange", hashChangeHandler);
        },
      };
    };
    let treemapState = drawTreemap();
    let resizeFrame;
    const redrawTreemap = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (treemapState?.parent) {
          treemapState.parent.on("click", null);
        }
        treemapState?.cleanup();
        treemapState = drawTreemap();
      });
    };
    const resizeObserver = new ResizeObserver(redrawTreemap);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      select(container).selectAll(".node").remove();
      if (treemapState?.parent) {
        treemapState.parent.on("click", null);
      }
      treemapState?.cleanup();
    };
  }, [treeMapData, openSecretPage]);
  
  const handleZoomClick = () => {
    if (rootNodeRef.current && zoomRef.current) {
        zoomRef.current(rootNodeRef.current);
    }
};
  return (
    <div className="feature" ref={ref} aria-label="Interactive portfolio treemap">
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      <AccessibleTreemapNavigation treeMapData={treeMapData} />
      <StateManagment treeMapData={treeMapData} clickData={clickData} handleZoomClick={handleZoomClick} />
      {isSecretPage ? <SecretPage onExit={closeSecretPage} /> : null}
    </div>
  );
}

export default TreeMap;
