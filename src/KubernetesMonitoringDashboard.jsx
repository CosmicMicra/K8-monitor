// KubernetesMonitoringDashboard.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './KubernetesMonitoringDashboard.css';

const KubernetesMonitoringDashboard = () => {
  // State for various metrics
  const [clusterMetrics, setClusterMetrics] = useState({
    cpuUsage: 42,
    memoryUsage: 38,
    podCount: 24,
    nodeCount: 3,
    healthyPods: 23,
    unhealthyPods: 1
  });
  
  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, timestamp: '2024-03-18T09:23:45', severity: 'high', message: 'Unusual pod activity detected', anomalyScore: 0.89 },
    { id: 2, timestamp: '2024-03-17T14:12:30', severity: 'medium', message: 'Potential privilege escalation', anomalyScore: 0.72 },
    { id: 3, timestamp: '2024-03-15T22:45:12', severity: 'low', message: 'Uncommon API access pattern', anomalyScore: 0.62 }
  ]);
  
  const [complianceResults, setComplianceResults] = useState({
    passed: 37,
    failed: 4,
    warning: 8,
    lastRun: '2024-03-17T08:30:00'
  });
  
  const [historicalData, setHistoricalData] = useState([
    { month: 'Jan', incidents: 12, complianceScore: 92 },
    { month: 'Feb', incidents: 8, complianceScore: 94 },
    { month: 'Mar', incidents: 5, complianceScore: 96 }
  ]);
  
  // Mock data refresh
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random metric changes
      setClusterMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(5, Math.min(95, prev.cpuUsage + (Math.random() * 10 - 5))),
        memoryUsage: Math.max(10, Math.min(90, prev.memoryUsage + (Math.random() * 8 - 4)))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Color configurations
  const COLORS = {
    healthy: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    gray: '#6B7280'
  };
  
  // Compliance pie chart data
  const complianceData = [
    { name: 'Passed', value: complianceResults.passed, color: COLORS.healthy },
    { name: 'Failed', value: complianceResults.failed, color: COLORS.danger },
    { name: 'Warning', value: complianceResults.warning, color: COLORS.warning }
  ];
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Kubernetes Cluster Monitoring</h1>
        <p>ML-powered security insights and metrics</p>
      </header>
      
      {/* Resource Metrics Section */}
      <section className="dashboard-section">
        <h2 className="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          Live Cluster Status
        </h2>
        <div className="metrics-grid">
          {/* CPU Usage */}
          <div className="metric-card">
            <div className="metric-header">
              <h3>CPU Usage</h3>
              <span className={`metric-badge ${clusterMetrics.cpuUsage > 80 ? 'badge-danger' : 'badge-success'}`}>
                {clusterMetrics.cpuUsage.toFixed(1)}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar ${
                  clusterMetrics.cpuUsage > 80 ? 'progress-danger' : 
                  clusterMetrics.cpuUsage > 60 ? 'progress-warning' : 'progress-success'
                }`} 
                style={{ width: `${clusterMetrics.cpuUsage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Memory Usage */}
          <div className="metric-card">
            <div className="metric-header">
              <h3>Memory Usage</h3>
              <span className={`metric-badge ${clusterMetrics.memoryUsage > 80 ? 'badge-danger' : 'badge-success'}`}>
                {clusterMetrics.memoryUsage.toFixed(1)}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar ${
                  clusterMetrics.memoryUsage > 80 ? 'progress-danger' : 
                  clusterMetrics.memoryUsage > 60 ? 'progress-warning' : 'progress-success'
                }`} 
                style={{ width: `${clusterMetrics.memoryUsage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Pod Status */}
          <div className="metric-card">
            <div className="metric-header">
              <h3>Pod Status</h3>
              <span className="metric-badge badge-info">
                {clusterMetrics.podCount} pods
              </span>
            </div>
            <div className="pod-status">
              <div className="status-item">
                <span className="status-indicator success"></span>
                <span>{clusterMetrics.healthyPods} Healthy</span>
              </div>
              <div className="status-item">
                <span className="status-indicator danger"></span>
                <span>{clusterMetrics.unhealthyPods} Unhealthy</span>
              </div>
            </div>
          </div>
          
          {/* Node Status */}
          <div className="metric-card">
            <div className="metric-header">
              <h3>Nodes</h3>
              <span className="metric-badge badge-info">
                {clusterMetrics.nodeCount} nodes
              </span>
            </div>
            <div className="node-status">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
              <span>All nodes ready</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Insights Section */}
      <section className="dashboard-section grid-section">
        <div className="grid-item-wide">
          <h2 className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            ML Security Insights
          </h2>
          <div className="card">
            <div className="card-header">
              <h3>Recent Anomaly Alerts</h3>
            </div>
            <div className="card-content">
              {securityAlerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className={`alert-icon ${
                    alert.severity === 'high' ? 'alert-icon-danger' :
                    alert.severity === 'medium' ? 'alert-icon-warning' :
                    'alert-icon-info'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div className="alert-details">
                    <div className="alert-header">
                      <span className="alert-message">{alert.message}</span>
                      <span className="alert-timestamp">
                        {new Date(alert.timestamp).toLocaleTimeString()} - {new Date(alert.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="anomaly-score">
                      <div className="score-label">Anomaly Score:</div>
                      <div className="score-bar-container">
                        <div 
                          className={`score-bar ${
                            alert.anomalyScore > 0.8 ? 'score-danger' : 
                            alert.anomalyScore > 0.6 ? 'score-warning' : 'score-info'
                          }`} 
                          style={{ width: `${alert.anomalyScore * 100}%` }}
                        ></div>
                      </div>
                      <div className="score-value">
                        {(alert.anomalyScore * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid-item">
          <h2 className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            CIS Compliance
          </h2>
          <div className="card">
            <div className="compliance-info">
              <div className="last-check-label">Last compliance check:</div>
              <div className="last-check-time">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {new Date(complianceResults.lastRun).toLocaleDateString()} {new Date(complianceResults.lastRun).toLocaleTimeString()}
              </div>
            </div>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="compliance-legend">
              <div className="legend-item">
                <span className="legend-color success"></span>
                <span className="legend-text">Passed: {complianceResults.passed}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color warning"></span>
                <span className="legend-text">Warning: {complianceResults.warning}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color danger"></span>
                <span className="legend-text">Failed: {complianceResults.failed}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Historical Analysis Section */}
      <section className="dashboard-section">
        <h2 className="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
          Historical Analysis
        </h2>
        <div className="card">
          <div className="chart-container-large">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="incidents"
                  stroke="#EF4444"
                  name="Security Incidents"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="complianceScore"
                  stroke="#10B981"
                  name="Compliance Score (%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KubernetesMonitoringDashboard;