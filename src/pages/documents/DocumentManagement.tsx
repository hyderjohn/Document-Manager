import { useState } from 'react';
import {
  DocumentIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * Interface representing a document managed by the system.
 */
interface Document {
  /** Unique identifier for the document. */
  id: string;
  /** The original filename of the document. */
  name: string;
  /** The inferred file type (e.g., PDF, DOCX). */
  type: string;
  /** The size of the file (e.g., "2.4 MB"). */
  size: string;
  /** ISO timestamp when the document was uploaded. */
  uploadedAt: string;
  /** The current processing status of the document. */
  status: 'processed' | 'processing' | 'failed';
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Project Proposal.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedAt: '2024-02-20T10:00:00Z',
    status: 'processed',
  },
  {
    id: '2',
    name: 'Technical Documentation.docx',
    type: 'DOCX',
    size: '1.8 MB',
    uploadedAt: '2024-02-19T15:30:00Z',
    status: 'processed',
  },
  {
    id: '3',
    name: 'Meeting Notes.txt',
    type: 'TXT',
    size: '45 KB',
    uploadedAt: '2024-02-18T09:15:00Z',
    status: 'processing',
  },
];

/**
 * Document Management Page.
 *
 * Allows users to view, upload, and delete documents.
 * Displays a list of documents with their status.
 * Currently uses mock data and simulated API interactions.
 *
 * TODO:
 * - Implement actual API calls for fetching, uploading, and deleting documents.
 * - Add document preview/view functionality.
 * - Implement document editing (e.g., renaming).
 * - Add searching, sorting, and filtering capabilities.
 * - Show more detailed upload progress.
 * - Handle different document statuses more robustly (e.g., display error messages).
 */
const DocumentManagement = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Handles the file input change event to simulate uploading a new document.
   * TODO: Replace simulation with actual API upload call.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
      };

      setDocuments((prev) => [newDocument, ...prev]);
      toast.success('File uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Simulates deleting a document.
   * TODO: Replace simulation with actual API delete call.
   * @param {string} id - The ID of the document to delete.
   */
  const handleDelete = async (id: string) => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      toast.success('Document deleted successfully');
    } catch (error) {
      toast.error('Failed to delete document');
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