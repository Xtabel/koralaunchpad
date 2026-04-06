import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const CSSDashedDropzone: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const baseStyle: React.CSSProperties = {
    position: "relative",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#666666",
    cursor: "pointer",
    width: "100%",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `
      linear-gradient(to right, #cccccc 50%, transparent 50%),
      linear-gradient(to bottom, #cccccc 50%, transparent 50%),
      linear-gradient(to left, #cccccc 50%, transparent 50%),
      linear-gradient(to top, #cccccc 50%, transparent 50%)
    `,
    backgroundSize: "10px 2px, 2px 10px", // Long dashes and spacing
    backgroundRepeat: "repeat-x, repeat-y, repeat-x, repeat-y",
    backgroundColor: "white", // Fallback background
  };

  const activeStyle: React.CSSProperties = {
    backgroundImage: `
      linear-gradient(to right, #2196f3 50%, transparent 50%),
      linear-gradient(to bottom, #2196f3 50%, transparent 50%),
      linear-gradient(to left, #2196f3 50%, transparent 50%),
      linear-gradient(to top, #2196f3 50%, transparent 50%)
    `,
  };

  return (
    <div
      {...getRootProps({ style: isDragActive ? { ...baseStyle, ...activeStyle } : baseStyle })}
    >
      <input {...getInputProps()} />
      <p>{isDragActive ? "Drop the files here..." : "Drag and drop files, or click to select"}</p>
    </div>
  );
};

export default CSSDashedDropzone;
