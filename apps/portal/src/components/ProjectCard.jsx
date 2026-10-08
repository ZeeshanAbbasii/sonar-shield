import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="project-card"
      onClick={() => onClick(project)}
      style={{
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '50px 40px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = project.color;
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 25px 50px ${project.color}20, 0 0 0 1px ${project.color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Glow effect on hover */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
        className="glow-effect"
      />
      
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}10 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          border: `1px solid ${project.color}40`,
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.4s ease',
        }}
        className="icon-container"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={project.color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </div>
      
      <h3
        style={{
          color: '#fff',
          fontSize: '20px',
          fontWeight: '300',
          letterSpacing: '2px',
          margin: '0 0 16px 0',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.title}
      </h3>
      
      <p
        style={{
          color: '#888',
          fontSize: '14px',
          margin: '0',
          lineHeight: '1.7',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.description}
      </p>
      
      <div
        style={{
          marginTop: '24px',
          padding: '8px 20px',
          borderRadius: '20px',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '11px',
          color: '#666',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.4s ease',
        }}
        className="launch-badge"
      >
        Launch →
      </div>
      
      <style>{`
        .project-card:hover .glow-effect {
          opacity: 1;
        }
        .project-card:hover .icon-container {
          transform: scale(1.1);
          box-shadow: 0 0 30px ${project.color}30;
        }
        .project-card:hover .launch-badge {
          background: ${project.color}20;
          borderColor: ${project.color}40;
          color: ${project.color};
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
