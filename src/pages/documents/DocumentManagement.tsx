import { useState } from 'react';
import {
  DocumentIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  // PencilIcon, // For future edit functionality
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

/**
 * Represents a document within the management system.
 */
interface Document {
  id: string; // Unique ID
  name: string; // Original filename
  type: string; // File type (e.g., PDF, DOCX)
  size: string; // Formatted file size (e.g., "2.4 MB")
  uploadedAt: string; // ISO timestamp of upload
  status: "processed" | "processing" | "failed"; // Processing status
}

// Mock data - replace with actual API fetching later
const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Project Proposal.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2024-02-20T10:00:00Z",
    status: "processed",
  },
  {
    id: "2",
    name: "Technical Documentation.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadedAt: "2024-02-19T15:30:00Z",
    status: "processed",
  },
  {
    id: "3",
    name: "Meeting Notes.txt",
    type: "TXT",
    size: "45 KB",
    uploadedAt: "2024-02-18T09:15:00Z",
    status: "processing",
  },
];

/**
 * Document Management Page.
 *
 * Provides UI for viewing, uploading, and deleting documents.
 * Displays a table of documents and their current status.
 * Note: Currently uses local state and mock data simulation.
 *
 * TODO:
 * - Integrate with backend API for document operations (fetch, upload, delete).
 * - Implement preview/viewing functionality.
 * - Add editing capabilities (e.g., rename).
 * - Introduce searching, sorting, and filtering for the table.
 * - Improve upload feedback (e.g., progress bar).
 * - Add better handling/display for different statuses (like failure reasons).
 */
const DocumentManagement = () => {
  // Local state for documents - replace with react-query or similar
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  // Local state for upload button loading indicator
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Mock document upload handler.
   * Simulates API call and updates local state.
   */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    toast.loading("Uploading file..."); // Add loading toast

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create mock document entry
      const newDocument: Document = {
        id: `mock-${Date.now()}`,
        name: file.name,
        type: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString(),
        status: "processing", // Assume it starts processing
      };

      // Update local state
      setDocuments((prev) => [newDocument, ...prev]);
      toast.dismiss(); // Dismiss loading toast
      toast.success("File uploaded, processing started.");
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss(); // Dismiss loading toast
      toast.error("Failed to upload file.");
    } finally {
      setIsUploading(false);
      // Reset file input to allow uploading the same file again if needed
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  /**
   * Mock document deletion handler.
   * Simulates API call and updates local state.
   */
  const handleDelete = async (id: string) => {
    // Optimistic UI update idea: remove immediately, then add back on error?
    // For now, just simulate delay then remove.
    const optimisticDocuments = documents;
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    const deleteToast = toast.loading("Deleting document...");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.dismiss(deleteToast);
      toast.success("Document deleted.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.dismiss(deleteToast);
      toast.error("Failed to delete document.");
      // Rollback optimistic update on error
      setDocuments(optimisticDocuments);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your documents and track their processing status.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <label className="btn btn-primary cursor-pointer flex items-center">
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            <span>Upload Document</span>
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Size
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Uploaded
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {documents.map((document) => (
                    <tr key={document.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <DocumentIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div className="font-medium text-gray-900">{document.name}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{document.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{document.size}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(document.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            document.status === "processed"
                              ? "bg-green-100 text-green-800"
                              : document.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => handleDelete(document.id)} className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement; 