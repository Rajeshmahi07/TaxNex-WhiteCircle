import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../config/axios';
import { Upload, Trash2, File, X } from 'lucide-react';
import { UPLOAD_CONFIG } from '../../config/api';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DocumentUpload = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ 
    category: 'gst', 
    month: new Date().toISOString().slice(0, 7), 
    notes: '' 
  });
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axiosInstance.get('/documents');
      setUploadedDocs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => file.size <= UPLOAD_CONFIG.maxFileSize);
    if (validFiles.length !== selectedFiles.length) {
      alert(`File size should be less than ${UPLOAD_CONFIG.maxFileSize / 1048576}MB`);
    }
    setFiles(validFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    setLoading(true);
    try {
      const data = new FormData();
      files.forEach(file => data.append('files', file));
      data.append('category', formData.category);
      data.append('month', formData.month);
      data.append('notes', formData.notes);
      await axiosInstance.post('/documents/upload', data);
      setFiles([]);
      setFormData({ category: 'gst', month: new Date().toISOString().slice(0, 7), notes: '' });
      fetchDocuments();
      alert('Documents uploaded successfully!');
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await axiosInstance.delete(`/documents/${id}`);
      fetchDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-navy-800 mb-4">Upload Documents</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="input-primary"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="gst">GST Documents</option>
                <option value="itr">ITR Documents</option>
                <option value="tds">TDS Documents</option>
                <option value="bank">Bank Statements</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <input
                type="month"
                className="input-primary"
                value={formData.month}
                onChange={e => setFormData({...formData, month: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              className="input-primary"
              rows="2"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Files (Max {UPLOAD_CONFIG.maxFileSize / 1048576}MB per file)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gold-500 hover:bg-gold-50/30 transition-all duration-300">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept={UPLOAD_CONFIG.allowedFileTypes.join(',')}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center gap-2 text-gold-600 hover:text-gold-700"
              >
                <Upload size={20} />
                <span>Click to upload files</span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, JPG, PNG, Excel, Word
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Selected Files ({files.length})
              </h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                    <div className="flex items-center gap-2">
                      <File size={16} className="text-gold-600" />
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <span className="text-xs text-gray-400">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || files.length === 0}
          >
            <Upload size={18} className="mr-2" />
            {loading ? 'Uploading...' : 'Upload Documents'}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-navy-800 mb-4">Uploaded Documents</h3>
        {uploadedDocs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <File size={48} className="mx-auto mb-3 text-gray-300" />
            <p>No documents uploaded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">File</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Month</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Notes</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {uploadedDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <File size={16} className="text-gold-600" />
                        <span className="text-sm">{doc.originalName}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-cyan-50 text-cyan-700 rounded">
                        {doc.category.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{doc.month}</td>
                    <td className="p-3 text-sm text-gray-500">{doc.notes || '-'}</td>
                    <td className="p-3 text-sm">{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DocumentUpload;