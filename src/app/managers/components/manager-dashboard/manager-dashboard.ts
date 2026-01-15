import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-dashboard.html',
  styleUrls: ['./manager-dashboard.css']
})
export class ManagerDashboardComponent implements OnInit, OnDestroy {
  // Current time that auto-updates
  currentTime: string = '';
  private timeSubscription?: Subscription;

  // Stats data
  ongoingProjects: number = 120;
  completedProjects: number = 350;
  pendingTasks: number = 15;
  teamMembers: number = 48;

  constructor() { }

  ngOnInit(): void {
    // Initialize time immediately
    this.updateTime();

    // Update time every second
    this.timeSubscription = interval(1000).subscribe(() => {
      this.updateTime();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  private updateTime(): void {
    const now = new Date();
    
    // Format: "Wednesday, January 15, 2026 at 2:45:30 PM"
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    this.currentTime = now.toLocaleString('en-US', options);
  }

  // Method to get greeting based on time
  getGreeting(): string {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
}