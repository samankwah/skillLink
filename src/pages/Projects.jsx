import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Target,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Upload,
  Download,
  Trash2,
  Edit,
  MessageSquare,
  Archive,
  Star,
  Folder,
  CheckSquare,
  Check,
} from "lucide-react";
import { useProjects } from "@/context/ProjectsContext";

const Projects = () => {
  const {
    activeProjects,
    projectTasks,
    projectFiles,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    updateProjectProgress,
    updateMilestone,
    uploadFile,
    deleteFile,
    getProjectById,
    getProjectTasks,
    getProjectFiles,
    getTasksByStatus,
    calculateProjectStats,
  } = useProjects();

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    milestone: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [showProjectEditModal, setShowProjectEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (activeProjects.length > 0 && !selectedProject) {
      setSelectedProject(activeProjects[0]);
    }
  }, [activeProjects, selectedProject]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "on_hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "document":
        return <FileText className="w-4 h-4" />;
      case "design":
        return <Star className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleCreateTask = async () => {
    if (!selectedProject || !newTask.title.trim()) return;

    try {
      await createTask(selectedProject.id, newTask);
      setShowTaskModal(false);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        milestone: "",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    if (!selectedProject) return;

    try {
      const updates = { status: newStatus };
      if (newStatus === "completed") {
        updates.completedDate = new Date().toISOString();
      }
      await updateTask(selectedProject.id, taskId, updates);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedProject) return;

    try {
      const fileData = {
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "document",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        category: "general",
        url: URL.createObjectURL(file),
      };

      await uploadFile(selectedProject.id, fileData);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  const handleEditProject = () => {
    setEditingProject({ ...selectedProject });
    setShowProjectEditModal(true);
  };

  const handleSaveProject = () => {
    // In a real app, this would save to backend
    console.log("Saving project:", editingProject);
    setShowProjectEditModal(false);
    setEditingProject(null);
  };

  const handleEditTask = (task) => {
    setEditingTask({ ...task });
  };

  const handleSaveTask = () => {
    // In a real app, this would save to backend
    console.log("Saving task:", editingTask);
    setEditingTask(null);
  };

  const handleCancelTaskEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = selectedProject
    ? getProjectTasks(selectedProject.id).filter((task) => {
        const matchesSearch =
          !searchQuery ||
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || task.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
    : [];

  const projectStats = selectedProject
    ? calculateProjectStats(selectedProject.id)
    : null;

  return (
    <div className="w-full h-full flex">
      {/* Sidebar - Project List */}
      <div
        className={`${
          selectedProject ? "hidden lg:flex" : "flex"
        } w-full lg:w-80 border-r bg-background flex-col`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg sm:text-xl font-semibold">Projects</h1>
            <Button size="sm" className="min-w-0">
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">New Project</span>
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeProjects.map((project) => {
            const stats = calculateProjectStats(project.id);
            const isSelected = selectedProject?.id === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors ${
                  isSelected ? "bg-accent border-r-2 border-r-primary" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {project.title}
                  </h3>
                  <Badge
                    className={getStatusColor(project.status)}
                    variant="outline"
                  >
                    {project.status.replace("_", " ")}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span className="font-medium">
                      {project.timeline.progress}%
                    </span>
                  </div>
                  <Progress value={project.timeline.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {project.team.length}
                  </div>
                  <div className="flex items-center">
                    <CheckSquare className="w-3 h-3 mr-1" />
                    {stats.completedTasks}/{stats.totalTasks}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(project.timeline.endDate)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          selectedProject ? "flex" : "hidden lg:flex"
        } w-full flex-1 flex-col`}
      >
        {selectedProject ? (
          <>
            {/* Project Header */}
            <div className="p-4 sm:p-6 border-b bg-background">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">
                {/* Back button for mobile */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden self-start"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Projects
                </Button>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h1 className="text-xl sm:text-2xl font-bold">
                      {selectedProject.title}
                    </h1>
                    <Badge className={getStatusColor(selectedProject.status)}>
                      {selectedProject.status.replace("_", " ")}
                    </Badge>
                    <Badge
                      className={getPriorityColor(selectedProject.priority)}
                    >
                      {selectedProject.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>
                        {selectedProject.client.name} •{" "}
                        {selectedProject.client.company}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {formatDate(selectedProject.timeline.startDate)} -{" "}
                        {formatDate(selectedProject.timeline.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>
                        {formatCurrency(selectedProject.budget.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:self-start">
                  <Button variant="outline" size="sm" className="min-w-0">
                    <MessageSquare className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Chat</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditProject}
                    className="min-w-0"
                  >
                    <Edit className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" className="min-w-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Progress
                        </p>
                        <p className="text-2xl font-bold">
                          {selectedProject.timeline.progress}%
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Progress
                      value={selectedProject.timeline.progress}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Budget Used
                        </p>
                        <p className="text-2xl font-bold">
                          {Math.round(
                            (selectedProject.budget.spent /
                              selectedProject.budget.total) *
                              100
                          )}
                          %
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatCurrency(selectedProject.budget.spent)} of{" "}
                      {formatCurrency(selectedProject.budget.total)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Tasks</p>
                        <p className="text-2xl font-bold">
                          {projectStats?.completedTasks || 0}/
                          {projectStats?.totalTasks || 0}
                        </p>
                      </div>
                      <CheckSquare className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {projectStats?.completionRate || 0}% complete
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Team</p>
                        <p className="text-2xl font-bold">
                          {selectedProject.team.length}
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex -space-x-2 mt-2">
                      {selectedProject.team.slice(0, 3).map((member, index) => (
                        <Avatar
                          key={member.id}
                          className="w-6 h-6 border-2 border-background"
                        >
                          <AvatarFallback className="text-xs">
                            {member.name
                              ? member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {selectedProject.team.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-medium">
                            +{selectedProject.team.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "overview", label: "Overview" },
                  {
                    id: "tasks",
                    label: "Tasks",
                    count: projectStats?.totalTasks,
                  },
                  {
                    id: "files",
                    label: "Files",
                    count: getProjectFiles(selectedProject.id).length,
                  },
                  {
                    id: "team",
                    label: "Team",
                    count: selectedProject.team.length,
                  },
                  {
                    id: "milestones",
                    label: "Milestones",
                    count: selectedProject.milestones.length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <Badge variant="secondary" className="ml-2">
                        {tab.count}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
              {activeTab === "overview" && (
                <div className="p-6 space-y-6">
                  {/* Milestones */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Milestones</CardTitle>
                      <CardDescription>
                        Project milestones and timeline
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="">
                      <div className="space-y-4">
                        {selectedProject.milestones.map((milestone, index) => (
                          <div
                            key={milestone.id}
                            className="flex items-center space-x-4"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.status === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : milestone.status === "in_progress"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {milestone.status === "completed" ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : milestone.status === "in_progress" ? (
                                <Clock className="w-4 h-4" />
                              ) : (
                                <span className="text-xs font-bold">
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">
                                  {milestone.title}
                                </h4>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={getStatusColor(milestone.status)}
                                    variant="outline"
                                  >
                                    {milestone.status.replace("_", " ")}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(milestone.dueDate)}
                                  </span>
                                </div>
                              </div>
                              <Progress
                                value={milestone.progress}
                                className="mt-2"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">John Doe</span>{" "}
                              completed task{" "}
                              <span className="font-medium">
                                Create user persona documentation
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              2 hours ago
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">Alex Johnson</span>{" "}
                              uploaded{" "}
                              <span className="font-medium">
                                Design System.fig
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              1 day ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "tasks" && (
                <div className="p-6 space-y-4">
                  {/* Tasks Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search tasks..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <Button
                      onClick={() => setShowTaskModal(true)}
                      className="min-w-0"
                    >
                      <Plus className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Add Task</span>
                    </Button>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-3">
                    {filteredTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="hover:shadow-sm transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <button
                                  onClick={() =>
                                    handleUpdateTaskStatus(
                                      task.id,
                                      task.status === "completed"
                                        ? "pending"
                                        : "completed"
                                    )
                                  }
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                    task.status === "completed"
                                      ? "bg-green-500 border-green-500 text-white"
                                      : "border-gray-300 hover:border-gray-400"
                                  }`}
                                >
                                  {task.status === "completed" && (
                                    <CheckCircle className="w-3 h-3" />
                                  )}
                                </button>

                                <h3
                                  className={`font-medium ${
                                    task.status === "completed"
                                      ? "line-through text-muted-foreground"
                                      : ""
                                  }`}
                                >
                                  {task.title}
                                </h3>

                                <Badge
                                  className={getStatusColor(task.status)}
                                  variant="outline"
                                >
                                  {task.status.replace("_", " ")}
                                </Badge>

                                <Badge
                                  className={getPriorityColor(task.priority)}
                                  variant="outline"
                                >
                                  {task.priority}
                                </Badge>
                              </div>

                              {task.description && (
                                <p className="text-sm text-muted-foreground mb-3 ml-8">
                                  {task.description}
                                </p>
                              )}

                              <div className="flex items-center space-x-4 ml-8 text-xs text-muted-foreground">
                                <div className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {task.assignee.name}
                                </div>
                                {task.dueDate && (
                                  <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Due {formatDate(task.dueDate)}
                                  </div>
                                )}
                                {task.tags && (
                                  <div className="flex space-x-1">
                                    {task.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditTask(task)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "files" && (
                <div className="p-6 space-y-4">
                  {/* Files Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Project Files</h2>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button
                        onClick={() =>
                          document.getElementById("file-upload").click()
                        }
                        className="min-w-0"
                      >
                        <Upload className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Upload File</span>
                      </Button>
                    </div>
                  </div>

                  {/* Files Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getProjectFiles(selectedProject.id).map((file) => (
                      <Card
                        key={file.id}
                        className="hover:shadow-sm transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                {getFileIcon(file.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                  {file.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {file.size}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>Uploaded by {file.uploadedBy.name}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(file.uploadedAt)}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {file.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "team" && (
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Team Members</h2>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {selectedProject.team.map((member) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback>
                                  {member.name
                                    ? member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                    : "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">
                                  {member.name ||
                                    `${member.firstName || ""} ${
                                      member.lastName || ""
                                    }`}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {member.role}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Joined {formatDate(member.joinedDate)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                {member.permissions.map((permission) => (
                                  <Badge
                                    key={permission}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Folder className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                No Project Selected
              </h2>
              <p className="text-muted-foreground">
                Select a project from the sidebar to view details
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
              <CardDescription>Add a new task to the project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Task title..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Task description..."
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateTask} disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Task"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Project Edit Modal */}
      {showProjectEditModal && editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Project</CardTitle>
              <CardDescription>Update project details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Project Title
                  </label>
                  <Input
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Priority
                  </label>
                  <select
                    value={editingProject.priority}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Budget
                  </label>
                  <Input
                    type="number"
                    value={editingProject.budget?.total || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({
                        ...prev,
                        budget: {
                          ...prev.budget,
                          total: parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Description
                </label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveProject}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowProjectEditModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Task Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Edit Task</CardTitle>
              <CardDescription>Update task details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Task Title
                </label>
                <Input
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Description
                </label>
                <textarea
                  value={editingTask.description || ""}
                  onChange={(e) =>
                    setEditingTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Status
                  </label>
                  <select
                    value={editingTask.status}
                    onChange={(e) =>
                      setEditingTask((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Priority
                  </label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) =>
                      setEditingTask((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={editingTask.dueDate || ""}
                  onChange={(e) =>
                    setEditingTask((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveTask}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancelTaskEdit}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Projects;
