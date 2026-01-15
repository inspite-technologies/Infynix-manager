// team-overview.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  avatar?: string;
  initials: string;
  contactNumber: string;
  joinDate: Date;
  tasksAssigned: number;
  tasksCompleted: number;
  colorTheme: string;
}

@Component({
  selector: 'app-team-overview',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './team-task-overview.html',
  styleUrls: ['./team-task-overview.css']
})
export class TeamOverviewComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  filteredMembers: TeamMember[] = [];
  paginatedMembers: TeamMember[] = [];
  
  // Modal state
  showAddMemberModal: boolean = false;
  showEditMemberModal: boolean = false;
  selectedMember: TeamMember | null = null;
  
  // New member form
  newMember: TeamMember = {
    id: 0,
    name: '',
    email: '',
    role: 'Developer',
    department: 'Engineering',
    status: 'Active',
    initials: '',
    contactNumber: '',
    joinDate: new Date(),
    tasksAssigned: 0,
    tasksCompleted: 0,
    colorTheme: 'blue'
  };
  
  isLoading = true;
  
  // Filter
  selectedFilter: string = 'all';
  searchQuery: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  // Roles and Departments
  roles = ['Developer', 'Designer', 'Manager', 'QA Engineer', 'DevOps', 'Product Owner'];
  departments = ['Engineering', 'Design', 'Marketing', 'Operations', 'HR', 'Sales'];
  colorThemes = ['blue', 'mint', 'peach', 'lavender', 'cyan', 'pink', 'orange', 'indigo'];

  ngOnInit(): void {
    this.loadTeamMembers();
    this.applyFilter();
    this.isLoading = false;
  }

  private loadTeamMembers(): void {
    this.teamMembers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'Developer',
        department: 'Engineering',
        status: 'Active',
        initials: 'JD',
        contactNumber: '+1 234 567 8901',
        joinDate: new Date('2023-01-15'),
        tasksAssigned: 12,
        tasksCompleted: 8,
        colorTheme: 'blue'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        role: 'Designer',
        department: 'Design',
        status: 'Active',
        initials: 'JS',
        contactNumber: '+1 234 567 8902',
        joinDate: new Date('2023-02-20'),
        tasksAssigned: 8,
        tasksCompleted: 8,
        colorTheme: 'mint'
      },
      {
        id: 3,
        name: 'Mike Wilson',
        email: 'mike.wilson@company.com',
        role: 'Manager',
        department: 'Engineering',
        status: 'Active',
        initials: 'MW',
        contactNumber: '+1 234 567 8903',
        joinDate: new Date('2022-11-10'),
        tasksAssigned: 15,
        tasksCompleted: 10,
        colorTheme: 'peach'
      },
      {
        id: 4,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'QA Engineer',
        department: 'Engineering',
        status: 'On Leave',
        initials: 'SJ',
        contactNumber: '+1 234 567 8904',
        joinDate: new Date('2023-03-05'),
        tasksAssigned: 6,
        tasksCompleted: 4,
        colorTheme: 'lavender'
      },
      {
        id: 5,
        name: 'David Lee',
        email: 'david.lee@company.com',
        role: 'DevOps',
        department: 'Operations',
        status: 'Active',
        initials: 'DL',
        contactNumber: '+1 234 567 8905',
        joinDate: new Date('2022-09-12'),
        tasksAssigned: 10,
        tasksCompleted: 9,
        colorTheme: 'cyan'
      },
      {
        id: 6,
        name: 'Emily Brown',
        email: 'emily.brown@company.com',
        role: 'Product Owner',
        department: 'Marketing',
        status: 'Active',
        initials: 'EB',
        contactNumber: '+1 234 567 8906',
        joinDate: new Date('2023-04-18'),
        tasksAssigned: 7,
        tasksCompleted: 5,
        colorTheme: 'pink'
      },
      {
        id: 7,
        name: 'Robert Taylor',
        email: 'robert.taylor@company.com',
        role: 'Developer',
        department: 'Engineering',
        status: 'Inactive',
        initials: 'RT',
        contactNumber: '+1 234 567 8907',
        joinDate: new Date('2022-08-22'),
        tasksAssigned: 5,
        tasksCompleted: 3,
        colorTheme: 'orange'
      },
      {
        id: 8,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        role: 'Designer',
        department: 'Design',
        status: 'Active',
        initials: 'LA',
        contactNumber: '+1 234 567 8908',
        joinDate: new Date('2023-05-30'),
        tasksAssigned: 9,
        tasksCompleted: 7,
        colorTheme: 'indigo'
      }
    ];
  }

  // Filter methods
  applyFilter(): void {
    let filtered = [...this.teamMembers];
    
    // Filter by status
    if (this.selectedFilter === 'active') {
      filtered = filtered.filter(m => m.status === 'Active');
    } else if (this.selectedFilter === 'inactive') {
      filtered = filtered.filter(m => m.status === 'Inactive');
    } else if (this.selectedFilter === 'on-leave') {
      filtered = filtered.filter(m => m.status === 'On Leave');
    }
    
    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    this.filteredMembers = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredMembers.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMembers = this.filteredMembers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Modal methods
  openAddMemberModal(): void {
    this.showAddMemberModal = true;
    this.resetNewMemberForm();
  }

  closeAddMemberModal(): void {
    this.showAddMemberModal = false;
    this.resetNewMemberForm();
  }

  openEditMemberModal(member: TeamMember): void {
    this.selectedMember = { ...member };
    this.showEditMemberModal = true;
  }

  closeEditMemberModal(): void {
    this.showEditMemberModal = false;
    this.selectedMember = null;
  }

  resetNewMemberForm(): void {
    this.newMember = {
      id: 0,
      name: '',
      email: '',
      role: 'Developer',
      department: 'Engineering',
      status: 'Active',
      initials: '',
      contactNumber: '',
      joinDate: new Date(),
      tasksAssigned: 0,
      tasksCompleted: 0,
      colorTheme: 'blue'
    };
  }

  // CRUD operations
  addMember(): void {
    if (this.newMember.name && this.newMember.email && this.newMember.contactNumber) {
      const member: TeamMember = {
        ...this.newMember,
        id: this.teamMembers.length + 1,
        initials: this.generateInitials(this.newMember.name)
      };
      
      this.teamMembers.push(member);
      this.applyFilter();
      this.closeAddMemberModal();
    }
  }

  updateMember(): void {
    if (this.selectedMember) {
      const index = this.teamMembers.findIndex(m => m.id === this.selectedMember!.id);
      if (index !== -1) {
        this.teamMembers[index] = { ...this.selectedMember };
        this.applyFilter();
        this.closeEditMemberModal();
      }
    }
  }

  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this team member?')) {
      this.teamMembers = this.teamMembers.filter(m => m.id !== id);
      this.applyFilter();
    }
  }

  // Helper methods
  generateInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Inactive':
        return 'status-inactive';
      case 'On Leave':
        return 'status-on-leave';
      default:
        return '';
    }
  }

  getCompletionPercentage(member: TeamMember): number {
    if (member.tasksAssigned === 0) return 0;
    return Math.round((member.tasksCompleted / member.tasksAssigned) * 100);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}