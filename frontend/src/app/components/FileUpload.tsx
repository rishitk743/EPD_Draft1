import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string;
  maxSize?: number;
}

export function FileUpload({ onFileSelect, acceptedFormats = '.pdf,.docx', maxSize = 5 }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200',
          isDragging 
            ? 'border-[#2563EB] bg-blue-50' 
            : 'border-gray-300 hover:border-[#2563EB] hover:bg-blue-50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats}
          onChange={handleFileInput}
          className="hidden"
        />
        
        {selectedFile ? (
          <div className="flex items-center justify-center gap-3">
            <File className="text-[#2563EB]" size={32} />
            <div className="text-left">
              <p className="text-[#111827] font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-600">{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <button
              onClick={handleRemove}
              className="ml-auto text-[#EF4444] hover:bg-red-50 p-2 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="bg-blue-50 p-4 rounded-full">
                <Upload className="text-[#2563EB]" size={32} />
              </div>
            </div>
            <div>
              <p className="text-[#111827] font-medium">Drop your resume here or click to browse</p>
              <p className="text-sm text-gray-600 mt-1">Supports PDF, DOCX (Max {maxSize}MB)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}