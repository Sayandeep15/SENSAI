"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-4">
      <MDEditor value={content} preview="preview" height={700} 
      style={{width: "100%", maxWidth: "1400px", margin: "0 auto" }}/>
    </div>
  );
};

export default CoverLetterPreview;