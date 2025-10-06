import { useRef, useEffect, useState } from "react";
import "./styles.css";

const BlockInfoModal = ({ blockTitle, blockInfo, mouseClickPosition, href }) => {
  const modalRef = useRef(null);
  const [dynamicStyle, setDynamicStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (modalRef.current) {
      const { offsetWidth, offsetHeight } = modalRef.current;

      setDynamicStyle({
        top: mouseClickPosition.y - offsetHeight / 2,   // arriba del click con margen
        left: mouseClickPosition.x - 70,   // centrado en X
        position: "absolute"
      });
    }
  }, [mouseClickPosition, blockTitle, blockInfo]);

  return (
    <div ref={modalRef} className="thoughtBubbleStyle" style={dynamicStyle}>
      <h5>{blockTitle}</h5>
      <hr />
      <p>{blockInfo}</p>
      {href && (
        <div className="videoButtonContainer">
          <a href={href} target="_blank" rel="noopener noreferrer">
            Ver video
          </a>
        </div>
      )}
      <div className="beforeStyle beforeAfterStyle"></div>
      <div className="afterStyle beforeAfterStyle"></div>
    </div>
  );
};

export default BlockInfoModal;
