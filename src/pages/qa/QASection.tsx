import React from "react";

/**
 * Document Q&A Section Page.
 *
 * This page will allow users to ask questions about the content
 * of their processed documents.
 *
 * Implementation Status: Placeholder UI only.
 *
 * TODO:
 * - Document selection UI.
 * - Question input form.
 * - Answer display area.
 * - Backend integration (API for QA, potentially LLM).
 * - Loading and error states.
 */
const QASection = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Q&A Section</h1>
      <p className="mt-2 text-sm text-gray-700">
        Select a document and ask questions about its content.
      </p>
      {/* Placeholder for future QA interface */}
      <div className="mt-6 p-6 border border-dashed border-gray-300 rounded-lg bg-white shadow-sm">
        <p className="text-center text-gray-500 italic">Document selection and Q&A form will appear here.</p>
        {/* Example structure (commented out):
        <select className="input mb-4"> <option>Select document...</option> </select>
        <textarea className="input mb-4" placeholder="Ask a question..."></textarea>
        <button className="btn btn-primary">Submit</button>
        <div className="mt-4 p-4 bg-gray-50 rounded">Answer appears here...</div>
        */}
      </div>
    </div>
  );
};

export default QASection;
