import './App.css'

const coreSkills = [
  { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark' },
  { name: 'Docker', icon: 'devicon-docker-plain' },
  { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
  { name: 'Terraform', icon: 'devicon-terraform-plain' },
  { name: 'Jenkins', icon: 'devicon-jenkins-line' },
  { name: 'GitHub Actions', icon: 'devicon-github-original' },
  { name: 'Prometheus', icon: 'devicon-prometheus-original' },
  { name: 'Grafana', icon: 'devicon-grafana-plain-wordmark' },
  { name: 'Linux', icon: 'devicon-linux-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
]

const services = [
  'EC2', 'IAM', 'S3', 'SQS', 'Lambda', 'RDS',
  'ECS', 'ECR', 'SNS', 'VPC', 'Elastic Beanstalk', 'SES'
]

const projects = [
  {
    title: 'Infrastructure Monitoring System',
    stack: 'Docker, Prometheus, Grafana, Linux',
    summary: 'Built a containerized monitoring stack with custom dashboards for real-time infrastructure visibility and alerting.',
  },
  {
    title: 'Serverless Uptime Monitor',
    stack: 'AWS Lambda, CloudWatch, Python',
    summary: 'Developed a lightweight, automated health-check system using Lambda functions and CloudWatch for immediate downtime alerts.',
  },
  {
    title: 'Automated CI/CD Pipelines',
    stack: 'AWS, Kubernetes, Jenkins, GitHub Actions',
    summary: 'Designed and maintained robust deployment pipelines for multiple applications, reducing manual overhead and release times.',
  },
]

function App() {
  return (
    <div className="site-shell">
      <div className="bg-glow bg-glow-one" aria-hidden="true" />
      <div className="bg-glow bg-glow-two" aria-hidden="true" />
      <div className="bg-glow bg-glow-three" aria-hidden="true" />

      <header className="topbar glass-panel">
        <div className="brand brand-terminal">
          <span className="prompt">~</span><span className="dollar">$</span>
          <span className="user"> portfolio</span>
          <span className="cursor-blink">_</span>
        </div>
        <nav className="menu" aria-label="Main navigation">
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="badge">Cloud & Devops Engineer</span>
            <h1 className="hero-title">
              Sharath Chandra C
            </h1>
            <p className="lead">
              DevOps and Cloud Engineer specializing in designing resilient cloud architectures, streamlining CI/CD pipelines, and maintaining highly available systems.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                View My Work
              </a>
              <a className="btn btn-secondary" href="#contact">
                Get In Touch
              </a>
              <a className="btn btn-outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card glass-panel">
              <div className="metric-icon">🚀</div>
              <h3>15+</h3>
              <p>Production Deployments</p>
            </div>
            <div className="metric-card glass-panel">
              <div className="metric-icon">🛠️</div>
              <h3>7+</h3>
              <p>Comprehensive Projects</p>
            </div>
            <div className="metric-card glass-panel">
              <div className="metric-icon">⏳</div>
              <h3>2025-Present</h3>
              <p>Professional Experience</p>
            </div>
          </div>
        </section>

        <section id="skills" className="section-container">
          <div className="section-head">
            <h2>Technical Arsenal</h2>
            <p>Core technologies I use to build, deploy, and manage distributed systems.</p>
          </div>

          <div className="skill-grid">
            {coreSkills.map((skill) => (
              <div className="skill-card glass-panel" key={skill.name}>
                <i className={skill.icon} aria-hidden="true" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>

          <div className="services-container glass-panel">
            <h3>AWS Expertise</h3>
            <div className="service-chips">
              {services.map((service) => (
                <span key={service} className="chip">{service}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-container">
          <div className="section-head">
            <h2>Featured Work</h2>
            <p>Practical implementations demonstrating monitoring, automation, and scalable deployments.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <div className="project-card glass-panel" key={project.title}>
                <div className="project-glow"></div>
                <span className="project-stack">{project.stack}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-container">
          <div className="experience-card glass-panel">
            <span className="badge">Experience</span>
            <h2>Cloud & DevOps Engineer</h2>
            <p className="experience-meta">Sep 2025 - Present | Salem, Tamil Nadu</p>
            <ul className="experience-list">
              <li>
                Engineered and maintained scalable AWS cloud architectures (EC2, VPC, S3) and managed core Linux server infrastructure for high availability.
              </li>
              <li>
                Built and optimized automated CI/CD pipelines using Jenkins and GitHub Actions to accelerate release cycles and minimize deployment errors.
              </li>
              <li>
                Orchestrated containerized microservices using Docker and Kubernetes, ensuring consistent environments from development to production.
              </li>
              <li>
                Deployed robust observability stacks with Prometheus and Grafana to monitor Linux performance, track system health, and proactively resolve bottlenecks.
              </li>
            </ul>
          </div>
        </section>

        <section id="contact" className="section-container">
          <div className="contact-banner glass-panel">
            <div className="contact-info">
              <h2>Let's Connect</h2>
              <p>Available for new opportunities in Cloud and Platform Engineering.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:sharathraghav2003@gmail.com" className="contact-link">
                <span className="icon" style={{ display: 'flex' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span> Email Me
              </a>
              <a href="https://github.com/sharath-1863" target="_blank" rel="noreferrer" className="contact-link">
                <span className="icon"><i className="devicon-github-original"></i></span> GitHub
              </a>
              <a href="https://www.linkedin.com/in/sharathchandra-" target="_blank" rel="noreferrer" className="contact-link">
                <span className="icon"><i className="devicon-linkedin-plain"></i></span> LinkedIn
              </a>
              <a href="tel:+919345331879" className="contact-link">
                <span className="icon" style={{ display: 'flex' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span> +91 9345331879
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer text-muted">
        <p>© {new Date().getFullYear()} Sharath Chandra C.</p>
      </footer>
    </div>
  )
}

export default App
addd
