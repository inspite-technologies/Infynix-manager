// manager-request-service.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ServiceRequest {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  status: 'pending' | 'sent';
}

@Component({
  selector: 'app-manager-request-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-request-service.component.html',
  styleUrls: ['./manager-request-service.component.css']
})
export class ManagerRequestServiceComponent implements OnInit {
  // Service request form data
  requestType: 'info' | 'warning' | 'error' | 'success' = 'info';
  requestMessage: string = '';
  
  // Sent requests history
  sentRequests: ServiceRequest[] = [];
  
  // Stats
  totalSentRequests: number = 0;
  pendingRequests: number = 0;

  // Form validation
  showError: boolean = false;
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadSentRequests();
  }

  loadSentRequests(): void {
    // Load from in-memory storage (simulating sent requests)
    // In production, this would fetch from an API
    this.updateStats();
  }

  updateStats(): void {
    this.totalSentRequests = this.sentRequests.length;
    this.pendingRequests = this.sentRequests.filter(r => r.status === 'pending').length;
  }

  getRequestIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'info': 'fa-info-circle',
      'warning': 'fa-exclamation-triangle',
      'error': 'fa-times-circle',
      'success': 'fa-check-circle'
    };
    return iconMap[type] || 'fa-info-circle';
  }

  validateForm(): boolean {
    if (!this.requestMessage.trim()) {
      this.errorMessage = 'Please enter a message for your service request';
      this.showError = true;
      setTimeout(() => this.showError = false, 3000);
      return false;
    }

    if (this.requestMessage.trim().length < 10) {
      this.errorMessage = 'Message must be at least 10 characters long';
      this.showError = true;
      setTimeout(() => this.showError = false, 3000);
      return false;
    }

    return true;
  }

  sendRequest(): void {
    if (!this.validateForm()) {
      return;
    }

    const newRequest: ServiceRequest = {
      id: this.generateId(),
      type: this.requestType,
      message: this.requestMessage.trim(),
      timestamp: this.getCurrentTimestamp(),
      status: 'sent'
    };

    // Add to sent requests
    this.sentRequests.unshift(newRequest);
    
    // Update stats
    this.updateStats();

    // Show success message
    this.showSuccessNotification();

    // Reset form
    this.resetForm();

    // In production, this would be an API call to send the request to admin
    console.log('Service request sent:', newRequest);
  }

  resetForm(): void {
    this.requestMessage = '';
    this.requestType = 'info';
  }

  showSuccessNotification(): void {
    // This could trigger a toast notification
    alert('Service request sent successfully!');
  }

  deleteRequest(id: string): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.sentRequests = this.sentRequests.filter(r => r.id !== id);
      this.updateStats();
    }
  }

  clearAllRequests(): void {
    if (this.sentRequests.length === 0) {
      return;
    }

    if (confirm('Are you sure you want to clear all sent requests?')) {
      this.sentRequests = [];
      this.updateStats();
    }
  }

  generateId(): string {
    return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getCurrentTimestamp(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return now.toLocaleDateString('en-US', options);
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'info': 'Information',
      'warning': 'Warning',
      'error': 'Urgent',
      'success': 'Acknowledgment'
    };
    return labels[type] || 'Information';
  }

  getTypeDescription(type: string): string {
    const descriptions: { [key: string]: string } = {
      'info': 'General information or inquiry',
      'warning': 'Important notice or concern',
      'error': 'Urgent issue requiring immediate attention',
      'success': 'Positive update or acknowledgment'
    };
    return descriptions[type] || 'General information';
  }
}