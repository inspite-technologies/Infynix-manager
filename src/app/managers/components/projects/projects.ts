import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  dueDate: Date;
  status: 'active' | 'completed' | 'hold';
  progress: number;
  inProgress: number;
  overdue: number;
  color?: string;
  graphPattern?: string;
  assignedUsers: {
    name: string;
    avatar: string;
    initials: string;
  }[];
  tasks: Task[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: Date;
  status: string;
  progress: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit {
  // Filter state
  activeFilter: 'all' | 'active' | 'completed' | 'hold' = 'all';
  searchQuery: string = '';
  
  // Modal states
  showCreateProjectModal: boolean = false;
  showCreateTaskModal: boolean = false;
  showProjectDetailsModal: boolean = false;
  selectedProject: Project | null = null;
  
  // Details tab state
  activeDetailsTab: 'tasks' | 'review' | 'requests' | 'team' = 'tasks';
  
  // Form data
  newProject = {
    name: '',
    description: '',
    category: 'design',
    assignedEmployees: [] as string[],
    dueDate: '',
    color: 'blue',
    graphPattern: 'ascending'
  };
  
  newTask = {
    name: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignedTo: '',
    dueDate: ''
  };
  
  // Categories
  categories = [
    { id: 'design', name: 'Design' },
    { id: 'development', name: 'Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'qa', name: 'QA' }
  ];

  // Available colors for projects
  colors = [
    { id: 'blue', name: 'Blue' },
    { id: 'green', name: 'Green' },
    { id: 'purple', name: 'Purple' },
    { id: 'orange', name: 'Orange' },
    { id: 'red', name: 'Red' },
    { id: 'cyan', name: 'Cyan' },
    { id: 'pink', name: 'Pink' },
    { id: 'indigo', name: 'Indigo' }
  ];

  // Graph patterns
  graphPatterns = [
    { id: 'ascending', name: 'Ascending', path: 'M0,40 L20,35 L40,38 L60,30 L80,32 L100,25 L120,28 L140,20 L160,22 L180,15 L200,18' },
    { id: 'descending', name: 'Descending', path: 'M0,10 L20,15 L40,12 L60,20 L80,18 L100,25 L120,22 L140,30 L160,28 L180,35 L200,32' },
    { id: 'volatile', name: 'Volatile', path: 'M0,25 L20,15 L40,30 L60,10 L80,35 L100,20 L120,40 L140,15 L160,30 L180,20 L200,25' },
    { id: 'steady', name: 'Steady', path: 'M0,25 L20,24 L40,26 L60,25 L80,27 L100,26 L120,25 L140,24 L160,26 L180,25 L200,26' },
    { id: 'growth', name: 'Growth', path: 'M0,45 L20,42 L40,38 L60,35 L80,30 L100,25 L120,20 L140,15 L160,12 L180,8 L200,5' }
  ];
  
  // Available employees
  employees = [
    { id: '1', name: 'John Doe', initials: 'JD' },
    { id: '2', name: 'Jane Smith', initials: 'JS' },
    { id: '3', name: 'Alex Johnson', initials: 'AJ' },
    { id: '4', name: 'Sarah Williams', initials: 'SW' },
    { id: '5', name: 'Mike Brown', initials: 'MB' },
    { id: '6', name: 'Emily Davis', initials: 'ED' }
  ];
  
  // Projects data with COLORS AND GRAPH PATTERNS
  projects: Project[] = [
    {
      id: '1',
      name: 'Mobile App',
      description: 'E-commerce',
      category: 'design',
      dueDate: new Date('2022-05-30'),
      status: 'active',
      progress: 56,
      inProgress: 5,
      overdue: 2,
      color: 'blue',
      graphPattern: 'ascending',
      assignedUsers: [
        { name: 'John Doe', avatar: '', initials: 'JD' },
        { name: 'Jane Smith', avatar: '', initials: 'JS' },
        { name: 'Alex Johnson', avatar: '', initials: 'AJ' },
        { name: 'Sarah Williams', avatar: '', initials: 'SW' }
      ],
      tasks: [
        {
          id: 't1',
          name: 'Fix Navigation Bug',
          description: 'Fix the navigation issue',
          priority: 'high',
          assignedTo: 'John Doe',
          dueDate: new Date('2022-05-28'),
          status: 'in-progress',
          progress: 75
        },
        {
          id: 't2',
          name: 'Design System Update',
          description: 'Update design system',
          priority: 'medium',
          assignedTo: 'Jane Smith',
          dueDate: new Date('2022-05-29'),
          status: 'in-progress',
          progress: 50
        }
      ]
    },
    {
      id: '2',
      name: 'Dashboard',
      description: 'Home',
      category: 'development',
      dueDate: new Date('2022-05-30'),
      status: 'active',
      progress: 86,
      inProgress: 3,
      overdue: 0,
      color: 'green',
      graphPattern: 'growth',
      assignedUsers: [
        { name: 'John Doe', avatar: '', initials: 'JD' },
        { name: 'Jane Smith', avatar: '', initials: 'JS' }
      ],
      tasks: []
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      description: 'Social media campaign',
      category: 'marketing',
      dueDate: new Date('2022-06-15'),
      status: 'hold',
      progress: 20,
      inProgress: 1,
      overdue: 0,
      color: 'purple',
      graphPattern: 'steady',
      assignedUsers: [
        { name: 'Alex Johnson', avatar: '', initials: 'AJ' }
      ],
      tasks: []
    },
    {
      id: '4',
      name: 'Website Redesign',
      description: 'Complete website overhaul',
      category: 'design',
      dueDate: new Date('2022-04-30'),
      status: 'completed',
      progress: 100,
      inProgress: 0,
      overdue: 0,
      color: 'orange',
      graphPattern: 'ascending',
      assignedUsers: [
        { name: 'Sarah Williams', avatar: '', initials: 'SW' }
      ],
      tasks: []
    },
    {
      id: '5',
      name: 'API Integration',
      description: 'Backend services',
      category: 'development',
      dueDate: new Date('2022-06-20'),
      status: 'active',
      progress: 42,
      inProgress: 4,
      overdue: 1,
      color: 'pink',
      graphPattern: 'volatile',
      assignedUsers: [
        { name: 'Mike Brown', avatar: '', initials: 'MB' },
        { name: 'Emily Davis', avatar: '', initials: 'ED' }
      ],
      tasks: []
    },
    {
      id: '6',
      name: 'Brand Identity',
      description: 'Logo & Guidelines',
      category: 'design',
      dueDate: new Date('2022-07-05'),
      status: 'hold',
      progress: 15,
      inProgress: 2,
      overdue: 0,
      color: 'indigo',
      graphPattern: 'descending',
      assignedUsers: [
        { name: 'Jane Smith', avatar: '', initials: 'JS' },
        { name: 'Sarah Williams', avatar: '', initials: 'SW' }
      ],
      tasks: []
    },
    {
      id: '7',
      name: 'User Testing',
      description: 'QA & Feedback',
      category: 'qa',
      dueDate: new Date('2022-06-10'),
      status: 'active',
      progress: 68,
      inProgress: 6,
      overdue: 0,
      color: 'cyan',
      graphPattern: 'growth',
      assignedUsers: [
        { name: 'John Doe', avatar: '', initials: 'JD' },
        { name: 'Alex Johnson', avatar: '', initials: 'AJ' },
        { name: 'Mike Brown', avatar: '', initials: 'MB' }
      ],
      tasks: []
    }
  ];

  ngOnInit(): void {
  }

  // Filter methods
  get filteredProjects(): Project[] {
    let filtered = this.projects;
    
    // Filter by status
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(p => p.status === this.activeFilter);
    }
    
    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }

  setFilter(filter: 'all' | 'active' | 'completed' | 'hold'): void {
    this.activeFilter = filter;
  }

  // Details tab methods
  setDetailsTab(tab: 'tasks' | 'review' | 'requests' | 'team'): void {
    this.activeDetailsTab = tab;
  }

  // Project methods
  openCreateProjectModal(): void {
    this.showCreateProjectModal = true;
    this.resetProjectForm();
  }

  closeCreateProjectModal(): void {
    this.showCreateProjectModal = false;
    this.resetProjectForm();
  }

  resetProjectForm(): void {
    this.newProject = {
      name: '',
      description: '',
      category: 'design',
      assignedEmployees: [],
      dueDate: '',
      color: 'blue',
      graphPattern: 'ascending'
    };
  }

  toggleEmployee(employeeId: string): void {
    const index = this.newProject.assignedEmployees.indexOf(employeeId);
    if (index > -1) {
      this.newProject.assignedEmployees.splice(index, 1);
    } else {
      this.newProject.assignedEmployees.push(employeeId);
    }
  }

  isEmployeeSelected(employeeId: string): boolean {
    return this.newProject.assignedEmployees.includes(employeeId);
  }

  createProject(): void {
    if (this.newProject.name && this.newProject.dueDate) {
      const assignedUsers = this.employees
        .filter(e => this.newProject.assignedEmployees.includes(e.id))
        .map(e => ({
          name: e.name,
          avatar: '',
          initials: e.initials
        }));

      const project: Project = {
        id: Date.now().toString(),
        name: this.newProject.name,
        description: this.newProject.description,
        category: this.newProject.category,
        dueDate: new Date(this.newProject.dueDate),
        status: 'hold',
        progress: 0,
        inProgress: 0,
        overdue: 0,
        color: this.newProject.color,
        graphPattern: this.newProject.graphPattern,
        assignedUsers: assignedUsers,
        tasks: []
      };

      this.projects.push(project);
      this.closeCreateProjectModal();
    }
  }

  // Project details methods
  openProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.showProjectDetailsModal = true;
    this.activeDetailsTab = 'tasks'; // Reset to tasks tab when opening
  }

  closeProjectDetails(): void {
    this.showProjectDetailsModal = false;
    this.selectedProject = null;
    this.activeDetailsTab = 'tasks';
  }

  // Task methods
  openCreateTaskModal(): void {
    this.showCreateTaskModal = true;
    this.resetTaskForm();
  }

  closeCreateTaskModal(): void {
    this.showCreateTaskModal = false;
    this.resetTaskForm();
  }

  resetTaskForm(): void {
    this.newTask = {
      name: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
      dueDate: ''
    };
  }

  createTask(): void {
    if (this.selectedProject && this.newTask.name && this.newTask.dueDate) {
      const task: Task = {
        id: Date.now().toString(),
        name: this.newTask.name,
        description: this.newTask.description,
        priority: this.newTask.priority,
        assignedTo: this.newTask.assignedTo,
        dueDate: new Date(this.newTask.dueDate),
        status: 'pending',
        progress: 0
      };

      this.selectedProject.tasks.push(task);
      this.selectedProject.inProgress++;
      this.closeCreateTaskModal();
    }
  }

  // Helper methods
  getStatusClass(status: string): string {
    switch(status) {
      case 'active': return 'status-active';
      case 'hold': return 'status-hold';
      case 'completed': return 'status-completed';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'active': return 'IN PROGRESS';
      case 'hold': return 'ON HOLD';
      case 'completed': return 'COMPLETED';
      default: return status.toUpperCase();
    }
  }

  getPriorityClass(priority: string): string {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  getDaysLeft(dueDate: Date): number {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  // Get card class with color
  getCardClass(project: Project): string {
    return `project-card ${project.color || ''}`;
  }

  // Get graph path based on pattern
  getGraphPath(project: Project): string {
    const pattern = this.graphPatterns.find(p => p.id === project.graphPattern);
    return pattern ? pattern.path : this.graphPatterns[0].path;
  }

  // Get graph area path
  getGraphAreaPath(project: Project): string {
    const linePath = this.getGraphPath(project);
    return `${linePath} L200,50 L0,50 Z`;
  }

  // Get task count for team member
  getTaskCountForMember(memberName: string): number {
    if (!this.selectedProject) return 0;
    return this.selectedProject.tasks.filter(task => task.assignedTo === memberName).length;
  }
}