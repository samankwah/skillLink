import { useState } from "react";
import { useToast } from "../components/ui/Toast";
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
import {
  Search,
  Filter,
  TrendingUp,
  Star,
  Users,
  Plus,
  BookOpen,
  Award,
  Lightbulb,
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Skills = () => {
  useDocumentTitle("Skills Discovery");
  const { success, warning } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [mySkills, setMySkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Mock data for skills discovery
  const skillCategories = [
    { id: "all", name: "All Categories", count: 150 },
    { id: "programming", name: "Programming", count: 45 },
    { id: "design", name: "Design", count: 28 },
    { id: "marketing", name: "Marketing", count: 22 },
    { id: "data-science", name: "Data Science", count: 18 },
    { id: "management", name: "Management", count: 15 },
    { id: "writing", name: "Writing", count: 12 },
    { id: "languages", name: "Languages", count: 10 },
  ];

  const trendingSkills = [
    { name: "AI/Machine Learning", growth: "+45%", trend: "up" },
    { name: "React", growth: "+32%", trend: "up" },
    { name: "Python", growth: "+28%", trend: "up" },
    { name: "UI/UX Design", growth: "+25%", trend: "up" },
    { name: "Node.js", growth: "+22%", trend: "up" },
  ];

  const popularSkills = [
    {
      id: 1,
      name: "JavaScript",
      category: "Programming",
      description: "Dynamic programming language for web development",
      difficulty: "Intermediate",
      professionals: 1250000,
      averageSalary: "$75,000",
      growth: "+15%",
      isPopular: true,
      prerequisites: ["HTML", "CSS"],
      relatedSkills: ["React", "Node.js", "TypeScript"],
    },
    {
      id: 2,
      name: "React",
      category: "Programming",
      description: "JavaScript library for building user interfaces",
      difficulty: "Intermediate",
      professionals: 890000,
      averageSalary: "$85,000",
      growth: "+32%",
      isPopular: true,
      prerequisites: ["JavaScript", "HTML", "CSS"],
      relatedSkills: ["Redux", "Next.js", "TypeScript"],
    },
    {
      id: 3,
      name: "Python",
      category: "Programming",
      description:
        "Versatile programming language for development and data science",
      difficulty: "Beginner",
      professionals: 1100000,
      averageSalary: "$78,000",
      growth: "+28%",
      isPopular: true,
      prerequisites: [],
      relatedSkills: ["Django", "Flask", "Data Science"],
    },
    {
      id: 4,
      name: "UI/UX Design",
      category: "Design",
      description: "User interface and experience design principles",
      difficulty: "Intermediate",
      professionals: 450000,
      averageSalary: "$72,000",
      growth: "+25%",
      isPopular: true,
      prerequisites: ["Design Principles"],
      relatedSkills: ["Figma", "Adobe XD", "Prototyping"],
    },
    {
      id: 5,
      name: "Data Science",
      category: "Data Science",
      description: "Extract insights and knowledge from data",
      difficulty: "Advanced",
      professionals: 320000,
      averageSalary: "$95,000",
      growth: "+35%",
      isPopular: true,
      prerequisites: ["Statistics", "Python", "Mathematics"],
      relatedSkills: ["Machine Learning", "SQL", "R"],
    },
    {
      id: 6,
      name: "Digital Marketing",
      category: "Marketing",
      description: "Online marketing strategies and techniques",
      difficulty: "Beginner",
      professionals: 680000,
      averageSalary: "$65,000",
      growth: "+20%",
      isPopular: false,
      prerequisites: [],
      relatedSkills: ["SEO", "Social Media", "Analytics"],
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddToMySkills = (skill) => {
    if (mySkills.some(s => s.id === skill.id)) {
      warning('This skill is already in your profile!');
      return;
    }
    setMySkills(prev => [...prev, skill]);
    success(`${skill.name} added to your skills profile!`);
  };

  const handleLearnMore = (skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  const filteredSkills = popularSkills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      skill.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Skills Discovery</h1>
        <p className="text-muted-foreground">
          Explore skills, discover trends, and grow your expertise
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search skills, technologies, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                {skillCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Trending Skills
          </CardTitle>
          <CardDescription>
            Skills with the highest growth in demand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {trendingSkills.map((skill, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {skill.growth}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">High demand</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Skills List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {selectedCategory === "all"
                ? "All Skills"
                : skillCategories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredSkills.length} results
            </span>
          </div>

          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      {skill.isPopular && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className={getDifficultyColor(skill.difficulty)}
                      >
                        {skill.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {skill.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          <span>
                            {(skill.professionals / 1000000).toFixed(1)}M
                            professionals
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-muted-foreground">
                          <Award className="w-4 h-4 mr-1" />
                          <span>{skill.averageSalary} avg salary</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span>{skill.growth} growth</span>
                        </div>
                      </div>
                    </div>

                    {/* Prerequisites */}
                    {skill.prerequisites.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          Prerequisites:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {skill.prerequisites.map((prereq) => (
                            <Badge
                              key={prereq}
                              variant="outline"
                              className="text-xs"
                            >
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Skills */}
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        Related skills:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {skill.relatedSkills.map((related) => (
                          <Badge
                            key={related}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-accent"
                          >
                            {related}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 text-[#191961]"
                    onClick={() => handleAddToMySkills(skill)}
                    disabled={mySkills.some(s => s.id === skill.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {mySkills.some(s => s.id === skill.id) ? 'Added' : 'Add to My Skills'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLearnMore(skill)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-xs opacity-70">{category.count}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lightbulb className="w-4 h-4 mr-2" />
                Skill Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Learning Paths
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                Certifications
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platform Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Skills
                </span>
                <span className="font-semibold">2,500+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Active Professionals
                </span>
                <span className="font-semibold">1.2M+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  New Skills Added
                </span>
                <span className="font-semibold">15 this week</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Learn More Modal */}
      {showSkillModal && selectedSkill && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                {selectedSkill.name}
              </CardTitle>
              <CardDescription>
                Complete skill information and learning resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skill Overview */}
              <div>
                <h3 className="font-semibold mb-2">Overview</h3>
                <p className="text-muted-foreground">{selectedSkill.description}</p>
              </div>

              {/* Skill Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{(selectedSkill.professionals / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Professionals</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{selectedSkill.averageSalary}</div>
                  <div className="text-sm text-muted-foreground">Average Salary</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">{selectedSkill.growth}</div>
                  <div className="text-sm text-muted-foreground">Job Growth</div>
                </div>
              </div>

              {/* Prerequisites */}
              {selectedSkill.prerequisites.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.prerequisites.map((prereq) => (
                      <Badge key={prereq} variant="outline">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Skills */}
              <div>
                <h3 className="font-semibold mb-2">Related Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.relatedSkills.map((related) => (
                    <Badge key={related} variant="outline" className="cursor-pointer hover:bg-accent">
                      {related}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div>
                <h3 className="font-semibold mb-2">Recommended Learning Path</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-medium">Fundamentals</div>
                      <div className="text-sm text-muted-foreground">Learn the basic concepts and terminology</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-medium">Hands-on Practice</div>
                      <div className="text-sm text-muted-foreground">Work on practical projects and exercises</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-medium">Advanced Topics</div>
                      <div className="text-sm text-muted-foreground">Explore advanced concepts and specialized areas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1"
                  onClick={() => handleAddToMySkills(selectedSkill)}
                  disabled={mySkills.some(s => s.id === selectedSkill.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {mySkills.some(s => s.id === selectedSkill.id) ? 'Added to Skills' : 'Add to My Skills'}
                </Button>
                <Button variant="outline" onClick={() => setShowSkillModal(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Skills;
