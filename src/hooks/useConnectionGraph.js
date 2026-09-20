import { useState, useEffect, useRef, useMemo } from 'react';
import { calculateConnectionScore } from '../utils/connectionEngine';

/**
 * Custom Hook: useConnectionGraph
 * Manages responsive graph layout, orbital positioning, and deterministic edge calculations.
 */
export function useConnectionGraph({
  receipts = [],
  selectedReceipt = null,
  threshold = 35
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 850, height: 550 });
  const [internalActive, setInternalActive] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const activeReceipt = selectedReceipt || internalActive || receipts[0] || null;

  // Responsive container observer
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const clientWidth = containerRef.current.clientWidth || 850;
        const h = clientWidth < 640 ? 420 : Math.max(500, Math.min(620, window.innerHeight * 0.6));
        setDimensions({ width: clientWidth, height: h });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Compute node positions layout (orbital distribution)
  const graphNodes = useMemo(() => {
    if (!receipts.length) return [];
    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;

    return receipts.map((r, i) => {
      const isAnchor = activeReceipt && r.id === activeReceipt.id;
      let x, y;

      if (isAnchor) {
        x = centerX;
        y = centerY;
      } else {
        const angle = (i / receipts.length) * 2 * Math.PI + (i % 3) * 0.4;
        const radiusX = (i % 2 === 0 ? width * 0.32 : width * 0.40);
        const radiusY = (i % 2 === 0 ? height * 0.30 : height * 0.36);
        x = centerX + radiusX * Math.cos(angle);
        y = centerY + radiusY * Math.sin(angle);
      }

      x = Math.max(45, Math.min(width - 45, x));
      y = Math.max(45, Math.min(height - 45, y));

      return {
        ...r,
        x,
        y,
        isAnchor
      };
    });
  }, [receipts, dimensions, activeReceipt]);

  // Compute edges and reasons
  const { edges, connectedToActiveMap, activeReasons, connectedReceiptsList } = useMemo(() => {
    const edgeList = [];
    const connectedMap = new Map();
    const reasonsMap = new Map();
    const relatedReceipts = activeReceipt ? [activeReceipt] : [];

    if (!activeReceipt) {
      return { edges: [], connectedToActiveMap: connectedMap, activeReasons: [], connectedReceiptsList: [] };
    }

    for (let i = 0; i < receipts.length; i++) {
      const rA = receipts[i];
      if (rA.id === activeReceipt.id) continue;

      const result = calculateConnectionScore(activeReceipt, rA);
      if (result.score >= threshold) {
        connectedMap.set(rA.id, {
          score: result.score,
          reasons: result.reasons
        });
        reasonsMap.set(rA.id, result.reasons);
        relatedReceipts.push(rA);
      }
    }

    // Build visual edges
    graphNodes.forEach(nodeA => {
      if (connectedMap.has(nodeA.id)) {
        const connInfo = connectedMap.get(nodeA.id);
        const activeNode = graphNodes.find(n => n.id === activeReceipt.id);
        if (activeNode) {
          edgeList.push({
            id: `${activeNode.id}-${nodeA.id}`,
            source: activeNode,
            target: nodeA,
            score: connInfo.score,
            reasons: connInfo.reasons
          });
        }
      }
    });

    const combinedReasons = [];
    reasonsMap.forEach((reasonsList) => {
      reasonsList.forEach(r => {
        if (!combinedReasons.some(cr => cr.label === r.label)) {
          combinedReasons.push(r);
        }
      });
    });

    return {
      edges: edgeList,
      connectedToActiveMap: connectedMap,
      activeReasons: combinedReasons,
      connectedReceiptsList: relatedReceipts
    };
  }, [receipts, graphNodes, activeReceipt, threshold]);

  return {
    containerRef,
    dimensions,
    activeReceipt,
    setInternalActive,
    hoveredNode,
    setHoveredNode,
    graphNodes,
    edges,
    connectedToActiveMap,
    activeReasons,
    connectedReceiptsList,
    connectedCount: connectedToActiveMap.size
  };
}
