import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

const CodeToImage = ({ code }) => {
  const codeRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // if (!code) return;
    const captureImage = async () => {
      if (!codeRef.current) return;

      const canvas = await html2canvas(codeRef.current, {
        backgroundColor: "#1e1e1e", // Background color
        scale: 2, // Higher scale for better quality
      });

      setImageSrc(canvas.toDataURL("image/png"));
    };

    captureImage();
  }, [code]);

  return (
    <div className="flex flex-col items-start bg-neutral-900 w-xl">
      {/* Hidden Code Block (For Screenshot) */}
      <div
        ref={codeRef}
        className="p-5 rounded-lg text-white font-mono text-sm shadow-lg"
      >
        {code}
      </div>

      {/* Render Image Once Generated */}
      {/* {imageSrc && (
        <img src={imageSrc} alt="Code Snippet" className="mt-4 rounded-lg shadow-lg" />
      )} */}
    </div>
  );
};

export default CodeToImage;
