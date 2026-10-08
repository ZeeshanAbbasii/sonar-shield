import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const Dashboard = ({ projects }) => {
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    navigate(`/app/${project.id}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0d12 50%, #0a0a0a 100%)',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeIn 0.8s ease-in-out'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(0, 255, 209, 0.5), 0 0 40px rgba(0, 255, 209, 0.3);
        }
      `}</style>
      
      {/* Decorative background elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 5s ease-in-out infinite',
        }}
      />
      
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto 40px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            color: '#ffffff',
            fontSize: '56px',
            fontWeight: '200',
            letterSpacing: '8px',
            margin: '0 0 30px 0',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ffcd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          SONAR SHIELD
        </h1>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            margin: '20px 0',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00ffcd, transparent)',
            }}
          />
          <p
            style={{
              color: '#00ffcd',
              fontSize: '14px',
              margin: '0',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}
          >
            NESCOM & RAC
          </p>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00ffcd, transparent)',
            }}
          />
        </div>
        
        <p
          style={{
            color: '#666',
            fontSize: '12px',
            margin: '0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          In Collaboration
        </p>
      </header>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={handleProjectClick}
          />
        ))}
      </div>
      
      <div
        style={{
          maxWidth: '800px',
          margin: '40px auto 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: '#888',
            fontSize: '11px',
            margin: '0',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          Final Year Project Software Engineering
        </p>
        
        <div
          style={{
            marginTop: '50px',
          }}
        >
          <p
            style={{
              color: '#777',
              fontSize: '13px',
              margin: '0 0 25px 0',
              lineHeight: '1.9',
            }}
          >
            <strong style={{ color: '#888' }}>AI-Powered Error Correction System for Satellite Communication:</strong> An intelligent error-correction system using AI sequence models to predict and correct errors in satellite communication data, simulating real-world noise conditions and improving data recovery rates compared to traditional Forward Error Correction (FEC) techniques.
          </p>
          <p
            style={{
              color: '#777',
              fontSize: '13px',
              margin: '0 0 30px 0',
              lineHeight: '1.9',
            }}
          >
            <strong style={{ color: '#888' }}>AI Powered Noise-Type-Aware Adaptive Denoising System:</strong> A hierarchical framework that classifies noise types in audio signals and applies customized denoising techniques for each noise category, achieving higher signal-to-noise ratio and superior audio quality for diverse real-world applications.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #666)',
              }}
            />
            <p
              style={{
                color: '#666',
                fontSize: '12px',
                margin: '0',
                letterSpacing: '2px',
              }}
            >
              Developed by Zeeshan & Arqam
            </p>
            <div
              style={{
                width: '30px',
                height: '1px',
                background: 'linear-gradient(90deg, #666, transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
