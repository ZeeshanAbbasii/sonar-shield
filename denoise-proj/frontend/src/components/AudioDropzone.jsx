import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, X, FileAudio } from 'lucide-react';

const AudioDropzone = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setError('File too large. Maximum size is 50 MB.');
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setError('Unsupported format. Accepted: WAV, MP3, M4A, FLAC, OGG, AIFF, AAC');
      } else {
        setError('Invalid file. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.wav', '.mp3', '.m4a', '.flac', '.ogg', '.aiff', '.aac']
    },
    maxSize: 50 * 1024 * 1024, // 50 MB
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
    onFileSelect(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {!file ? (
        <motion.div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-cyan bg-cyan/5 animate-pulse-border'
              : 'border-border hover:border-cyan/50 hover:bg-cyan/20 hover:text-background'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={isDragActive ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: isDragActive ? Infinity : 0 }}
          >
            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-cyan" />
            <p className="text-xl font-semibold text-white mb-2">
              {isDragActive ? 'Drop your audio file here' : 'Drag and drop your audio file'}
            </p>
            <p className="text-gray-400 mb-4">or click to browse</p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span className="px-3 py-1 bg-surface rounded-full border border-border">WAV</span>
              <span className="px-3 py-1 bg-surface rounded-full border border-border">MP3</span>
              <span className="px-3 py-1 bg-surface rounded-full border border-border">M4A</span>
              <span className="px-3 py-1 bg-surface rounded-full border border-border">FLAC</span>
              <span className="px-3 py-1 bg-surface rounded-full border border-border">OGG</span>
              <span className="px-3 py-1 bg-surface rounded-full border border-border">AIFF</span>
              <span className="px-3 py-1 bg-surface rounded-full border border-border">AAC</span>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center">
                <FileAudio className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-red/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red" />
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red/10 border border-red/30 rounded-xl"
        >
          <p className="text-red text-sm">{error}</p>
        </motion.div>
      )}
    </div>
  );
};

export default AudioDropzone;
