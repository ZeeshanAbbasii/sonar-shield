import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OPEN_MODE = 'iframe'; // Change to 'tab' to open in new tab

const AppViewer = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);

  React.useEffect(() => {
    if (OPEN_MODE === 'tab' && project) {
      window.open(project.url, '_blank');
      navigate('/dashboard');
    }
  }, [project, navigate]);

  if (!project) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121212',
          color: 'white',
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Project Not Found</h1>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (OPEN_MODE === 'tab') {
    return null;
  }

  return (
    <div 
      style={{ 
        height: '100vh', 
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
        animation: 'fadeIn 0.5s ease-in-out'
      }}
    >
      <iframe
        src={project.url}
        title={project.title}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AppViewer;
