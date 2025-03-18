# Kubernetes Cluster Monitoring with ML

This project provides security monitoring for Kubernetes clusters running on AWS EC2. It integrates real-time metrics collection with machine learning-based anomaly detection to identify potential security threats.

The system collects Kubernetes audit logs using Fluentd, processes them with Python, and analyzes patterns using Isolation Forest and K-Means models trained on AWS SageMaker. This enables detection of unauthorized access attempts, unusual pod activity, and privilege escalation events.

The dashboard displays live cluster status (CPU, memory, pods, nodes), security insights from ML models, and CIS compliance results, allowing for effective cluster security monitoring at a glance.
