import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/lib/i18n";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Database, 
  Code, 
  BookOpen, 
  LayoutDashboard,
  TrendingUp,
  Layers,
  FileText,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Save,
  X
} from "lucide-react";
import type { DataStructure, Algorithm, GlossaryTerm } from "@shared/schema";

// Form types
interface DataStructureForm {
  name: string;
  slug: string;
  description: string;
  icon: string;
  definition: string;
  complexity: { access: string; search: string; insert: string; delete: string };
}

interface AlgorithmForm {
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: "sorting" | "searching" | "graph";
  definition: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
}

interface GlossaryForm {
  term: string;
  definition: string;
  category: string;
}

const defaultDSForm: DataStructureForm = {
  name: "",
  slug: "",
  description: "",
  icon: "Box",
  definition: "",
  complexity: { access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
};

const defaultAlgForm: AlgorithmForm = {
  name: "",
  slug: "",
  description: "",
  icon: "Code",
  category: "sorting",
  definition: "",
  timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
  spaceComplexity: "O(1)",
};

const defaultGlossaryForm: GlossaryForm = {
  term: "",
  definition: "",
  category: "General",
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  // Modal states
  const [dsDialogOpen, setDsDialogOpen] = useState(false);
  const [algDialogOpen, setAlgDialogOpen] = useState(false);
  const [glossaryDialogOpen, setGlossaryDialogOpen] = useState(false);
  
  // Form states
  const [dsForm, setDsForm] = useState<DataStructureForm>(defaultDSForm);
  const [algForm, setAlgForm] = useState<AlgorithmForm>(defaultAlgForm);
  const [glossaryForm, setGlossaryForm] = useState<GlossaryForm>(defaultGlossaryForm);
  
  // Edit mode
  const [editingDsId, setEditingDsId] = useState<string | null>(null);
  const [editingAlgId, setEditingAlgId] = useState<string | null>(null);
  const [editingGlossaryId, setEditingGlossaryId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  // Fetch data
  const { data: dataStructures = [], isLoading: isLoadingDS } = useQuery<DataStructure[]>({
    queryKey: ["/api/data-structures"],
    enabled: isAuthenticated,
  });

  const { data: algorithms = [], isLoading: isLoadingAlg } = useQuery<Algorithm[]>({
    queryKey: ["/api/algorithms"],
    enabled: isAuthenticated,
  });

  const { data: glossaryTerms = [], isLoading: isLoadingGlossary } = useQuery<GlossaryTerm[]>({
    queryKey: ["/api/glossary"],
    enabled: isAuthenticated,
  });

  // === DATA STRUCTURES MUTATIONS ===
  const createDataStructure = useMutation({
    mutationFn: async (form: DataStructureForm) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("data_structures").insert({
        name: form.name,
        slug: form.slug,
        description: form.description,
        icon: form.icon,
        definition: form.definition,
        complexity: form.complexity,
        use_cases: [],
        pros: [],
        cons: [],
        visual_explanation: "",
        code_example: "",
        experiment_scenario: "",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/data-structures"] });
      toast({ title: "Success", description: "Data structure created" });
      setDsDialogOpen(false);
      setDsForm(defaultDSForm);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateDataStructure = useMutation({
    mutationFn: async ({ id, form }: { id: string; form: DataStructureForm }) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("data_structures").update({
        name: form.name,
        slug: form.slug,
        description: form.description,
        icon: form.icon,
        definition: form.definition,
        complexity: form.complexity,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/data-structures"] });
      toast({ title: "Success", description: "Data structure updated" });
      setDsDialogOpen(false);
      setDsForm(defaultDSForm);
      setEditingDsId(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteDataStructure = useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("data_structures").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/data-structures"] });
      toast({ title: "Success", description: "Data structure deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // === ALGORITHMS MUTATIONS ===
  const createAlgorithm = useMutation({
    mutationFn: async (form: AlgorithmForm) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("algorithms").insert({
        name: form.name,
        slug: form.slug,
        description: form.description,
        icon: form.icon,
        category: form.category,
        definition: form.definition,
        time_complexity: form.timeComplexity,
        space_complexity: form.spaceComplexity,
        steps: [],
        visual_diagram: "",
        input_output_examples: [],
        code_implementation: "",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/algorithms"] });
      toast({ title: "Success", description: "Algorithm created" });
      setAlgDialogOpen(false);
      setAlgForm(defaultAlgForm);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateAlgorithm = useMutation({
    mutationFn: async ({ id, form }: { id: string; form: AlgorithmForm }) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("algorithms").update({
        name: form.name,
        slug: form.slug,
        description: form.description,
        icon: form.icon,
        category: form.category,
        definition: form.definition,
        time_complexity: form.timeComplexity,
        space_complexity: form.spaceComplexity,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/algorithms"] });
      toast({ title: "Success", description: "Algorithm updated" });
      setAlgDialogOpen(false);
      setAlgForm(defaultAlgForm);
      setEditingAlgId(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteAlgorithm = useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("algorithms").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/algorithms"] });
      toast({ title: "Success", description: "Algorithm deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // === GLOSSARY MUTATIONS ===
  const createGlossaryTerm = useMutation({
    mutationFn: async (form: GlossaryForm) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("glossary_terms").insert({
        term: form.term,
        definition: form.definition,
        category: form.category,
        related_terms: [],
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/glossary"] });
      toast({ title: "Success", description: "Glossary term created" });
      setGlossaryDialogOpen(false);
      setGlossaryForm(defaultGlossaryForm);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateGlossaryTerm = useMutation({
    mutationFn: async ({ id, form }: { id: string; form: GlossaryForm }) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("glossary_terms").update({
        term: form.term,
        definition: form.definition,
        category: form.category,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/glossary"] });
      toast({ title: "Success", description: "Glossary term updated" });
      setGlossaryDialogOpen(false);
      setGlossaryForm(defaultGlossaryForm);
      setEditingGlossaryId(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteGlossaryTerm = useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.from("glossary_terms").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/glossary"] });
      toast({ title: "Success", description: "Glossary term deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Helper functions
  const openEditDS = (ds: DataStructure) => {
    setEditingDsId(ds.id);
    setDsForm({
      name: ds.name,
      slug: ds.slug,
      description: ds.description,
      icon: ds.icon,
      definition: ds.definition,
      complexity: ds.complexity,
    });
    setDsDialogOpen(true);
  };

  const openEditAlg = (alg: Algorithm) => {
    setEditingAlgId(alg.id);
    setAlgForm({
      name: alg.name,
      slug: alg.slug,
      description: alg.description,
      icon: alg.icon,
      category: alg.category,
      definition: alg.definition,
      timeComplexity: alg.timeComplexity,
      spaceComplexity: alg.spaceComplexity,
    });
    setAlgDialogOpen(true);
  };

  const openEditGlossary = (term: GlossaryTerm) => {
    setEditingGlossaryId(term.id);
    setGlossaryForm({
      term: term.term,
      definition: term.definition,
      category: term.category,
    });
    setGlossaryDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/admin/login");
  };

  const stats = [
    { 
      label: t("admin.dashboard.dataStructures"), 
      value: dataStructures.length, 
      icon: Database, 
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      loading: isLoadingDS
    },
    { 
      label: t("admin.dashboard.algorithms"), 
      value: algorithms.length, 
      icon: Code, 
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      loading: isLoadingAlg
    },
    { 
      label: t("admin.dashboard.glossaryTerms"), 
      value: glossaryTerms.length, 
      icon: BookOpen, 
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      loading: isLoadingGlossary
    },
  ];

  const isSaving = createDataStructure.isPending || updateDataStructure.isPending || 
                   createAlgorithm.isPending || updateAlgorithm.isPending ||
                   createGlossaryTerm.isPending || updateGlossaryTerm.isPending;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t("admin.dashboard.title")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("admin.dashboard.welcome")}, {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isSupabaseConfigured ? (
              <Badge variant="default" className="bg-green-500">
                Supabase Connected
              </Badge>
            ) : (
              <Badge variant="secondary">
                Static Mode
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t("admin.dashboard.logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t("admin.dashboard.overview")}
            </TabsTrigger>
            <TabsTrigger value="data-structures" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              {t("nav.dataStructures")}
            </TabsTrigger>
            <TabsTrigger value="algorithms" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              {t("nav.algorithms")}
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t("nav.glossary")}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        {stat.loading ? (
                          <Loader2 className="h-6 w-6 animate-spin mt-2" />
                        ) : (
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        )}
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab("data-structures")}
                >
                  <Database className="h-6 w-6" />
                  Manage Data Structures
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab("algorithms")}
                >
                  <Code className="h-6 w-6" />
                  Manage Algorithms
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab("glossary")}
                >
                  <BookOpen className="h-6 w-6" />
                  Manage Glossary
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Structures Tab */}
          <TabsContent value="data-structures">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t("nav.dataStructures")}</CardTitle>
                  <CardDescription>{t("admin.dashboard.manageDataStructures")}</CardDescription>
                </div>
                {isSupabaseConfigured && (
                  <Button 
                    className="gap-2"
                    onClick={() => {
                      setEditingDsId(null);
                      setDsForm(defaultDSForm);
                      setDsDialogOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isLoadingDS ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : dataStructures.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No data structures yet</p>
                    <p className="text-sm">Click "Add New" to create one</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {dataStructures.map((ds) => (
                        <div key={ds.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium">{ds.name}</p>
                            <p className="text-sm text-muted-foreground">/{ds.slug}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Access: {ds.complexity.access}</Badge>
                            {isSupabaseConfigured && (
                              <>
                                <Button variant="ghost" size="icon" onClick={() => openEditDS(ds)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete {ds.name}?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteDataStructure.mutate(ds.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Algorithms Tab */}
          <TabsContent value="algorithms">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t("nav.algorithms")}</CardTitle>
                  <CardDescription>{t("admin.dashboard.manageAlgorithms")}</CardDescription>
                </div>
                {isSupabaseConfigured && (
                  <Button 
                    className="gap-2"
                    onClick={() => {
                      setEditingAlgId(null);
                      setAlgForm(defaultAlgForm);
                      setAlgDialogOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isLoadingAlg ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : algorithms.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No algorithms yet</p>
                    <p className="text-sm">Click "Add New" to create one</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {algorithms.map((alg) => (
                        <div key={alg.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium">{alg.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{alg.category}</Badge>
                              <span className="text-sm text-muted-foreground">/{alg.slug}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Time: {alg.timeComplexity.average}</Badge>
                            {isSupabaseConfigured && (
                              <>
                                <Button variant="ghost" size="icon" onClick={() => openEditAlg(alg)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete {alg.name}?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteAlgorithm.mutate(alg.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Glossary Tab */}
          <TabsContent value="glossary">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t("nav.glossary")}</CardTitle>
                  <CardDescription>{t("admin.dashboard.manageGlossary")}</CardDescription>
                </div>
                {isSupabaseConfigured && (
                  <Button 
                    className="gap-2"
                    onClick={() => {
                      setEditingGlossaryId(null);
                      setGlossaryForm(defaultGlossaryForm);
                      setGlossaryDialogOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isLoadingGlossary ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : glossaryTerms.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No glossary terms yet</p>
                    <p className="text-sm">Click "Add New" to create one</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {glossaryTerms.map((term) => (
                        <div key={term.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{term.term}</p>
                              <Badge variant="secondary">{term.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {term.definition}
                            </p>
                          </div>
                          {isSupabaseConfigured && (
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditGlossary(term)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete "{term.term}"?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteGlossaryTerm.mutate(term.id)}
                                      className="bg-destructive text-destructive-foreground"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* DATA STRUCTURE DIALOG */}
      <Dialog open={dsDialogOpen} onOpenChange={setDsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDsId ? "Edit Data Structure" : "Add Data Structure"}
            </DialogTitle>
            <DialogDescription>
              {editingDsId ? "Update the data structure details" : "Create a new data structure"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ds-name">Name</Label>
                <Input
                  id="ds-name"
                  value={dsForm.name}
                  onChange={(e) => {
                    setDsForm({ 
                      ...dsForm, 
                      name: e.target.value,
                      slug: editingDsId ? dsForm.slug : generateSlug(e.target.value)
                    });
                  }}
                  placeholder="e.g., Binary Tree"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds-slug">Slug</Label>
                <Input
                  id="ds-slug"
                  value={dsForm.slug}
                  onChange={(e) => setDsForm({ ...dsForm, slug: e.target.value })}
                  placeholder="e.g., binary-tree"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ds-description">Description</Label>
              <Textarea
                id="ds-description"
                value={dsForm.description}
                onChange={(e) => setDsForm({ ...dsForm, description: e.target.value })}
                placeholder="Brief description..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ds-definition">Definition</Label>
              <Textarea
                id="ds-definition"
                value={dsForm.definition}
                onChange={(e) => setDsForm({ ...dsForm, definition: e.target.value })}
                placeholder="Detailed definition..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="space-y-2">
                <Label>Access</Label>
                <Input
                  value={dsForm.complexity.access}
                  onChange={(e) => setDsForm({ ...dsForm, complexity: { ...dsForm.complexity, access: e.target.value } })}
                  placeholder="O(1)"
                />
              </div>
              <div className="space-y-2">
                <Label>Search</Label>
                <Input
                  value={dsForm.complexity.search}
                  onChange={(e) => setDsForm({ ...dsForm, complexity: { ...dsForm.complexity, search: e.target.value } })}
                  placeholder="O(n)"
                />
              </div>
              <div className="space-y-2">
                <Label>Insert</Label>
                <Input
                  value={dsForm.complexity.insert}
                  onChange={(e) => setDsForm({ ...dsForm, complexity: { ...dsForm.complexity, insert: e.target.value } })}
                  placeholder="O(n)"
                />
              </div>
              <div className="space-y-2">
                <Label>Delete</Label>
                <Input
                  value={dsForm.complexity.delete}
                  onChange={(e) => setDsForm({ ...dsForm, complexity: { ...dsForm.complexity, delete: e.target.value } })}
                  placeholder="O(n)"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDsDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (editingDsId) {
                  updateDataStructure.mutate({ id: editingDsId, form: dsForm });
                } else {
                  createDataStructure.mutate(dsForm);
                }
              }}
              disabled={isSaving || !dsForm.name || !dsForm.slug}
            >
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {editingDsId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ALGORITHM DIALOG */}
      <Dialog open={algDialogOpen} onOpenChange={setAlgDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAlgId ? "Edit Algorithm" : "Add Algorithm"}
            </DialogTitle>
            <DialogDescription>
              {editingAlgId ? "Update the algorithm details" : "Create a new algorithm"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alg-name">Name</Label>
                <Input
                  id="alg-name"
                  value={algForm.name}
                  onChange={(e) => {
                    setAlgForm({ 
                      ...algForm, 
                      name: e.target.value,
                      slug: editingAlgId ? algForm.slug : generateSlug(e.target.value)
                    });
                  }}
                  placeholder="e.g., Quick Sort"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alg-slug">Slug</Label>
                <Input
                  id="alg-slug"
                  value={algForm.slug}
                  onChange={(e) => setAlgForm({ ...algForm, slug: e.target.value })}
                  placeholder="e.g., quick-sort"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alg-category">Category</Label>
              <Select
                value={algForm.category}
                onValueChange={(value: "sorting" | "searching" | "graph") => 
                  setAlgForm({ ...algForm, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sorting">Sorting</SelectItem>
                  <SelectItem value="searching">Searching</SelectItem>
                  <SelectItem value="graph">Graph</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alg-description">Description</Label>
              <Textarea
                id="alg-description"
                value={algForm.description}
                onChange={(e) => setAlgForm({ ...algForm, description: e.target.value })}
                placeholder="Brief description..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alg-definition">Definition</Label>
              <Textarea
                id="alg-definition"
                value={algForm.definition}
                onChange={(e) => setAlgForm({ ...algForm, definition: e.target.value })}
                placeholder="Detailed definition..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="space-y-2">
                <Label>Best Time</Label>
                <Input
                  value={algForm.timeComplexity.best}
                  onChange={(e) => setAlgForm({ ...algForm, timeComplexity: { ...algForm.timeComplexity, best: e.target.value } })}
                  placeholder="O(n)"
                />
              </div>
              <div className="space-y-2">
                <Label>Average</Label>
                <Input
                  value={algForm.timeComplexity.average}
                  onChange={(e) => setAlgForm({ ...algForm, timeComplexity: { ...algForm.timeComplexity, average: e.target.value } })}
                  placeholder="O(n²)"
                />
              </div>
              <div className="space-y-2">
                <Label>Worst</Label>
                <Input
                  value={algForm.timeComplexity.worst}
                  onChange={(e) => setAlgForm({ ...algForm, timeComplexity: { ...algForm.timeComplexity, worst: e.target.value } })}
                  placeholder="O(n²)"
                />
              </div>
              <div className="space-y-2">
                <Label>Space</Label>
                <Input
                  value={algForm.spaceComplexity}
                  onChange={(e) => setAlgForm({ ...algForm, spaceComplexity: e.target.value })}
                  placeholder="O(1)"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlgDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (editingAlgId) {
                  updateAlgorithm.mutate({ id: editingAlgId, form: algForm });
                } else {
                  createAlgorithm.mutate(algForm);
                }
              }}
              disabled={isSaving || !algForm.name || !algForm.slug}
            >
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {editingAlgId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* GLOSSARY DIALOG */}
      <Dialog open={glossaryDialogOpen} onOpenChange={setGlossaryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGlossaryId ? "Edit Glossary Term" : "Add Glossary Term"}
            </DialogTitle>
            <DialogDescription>
              {editingGlossaryId ? "Update the glossary term" : "Create a new glossary term"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="glossary-term">Term</Label>
                <Input
                  id="glossary-term"
                  value={glossaryForm.term}
                  onChange={(e) => setGlossaryForm({ ...glossaryForm, term: e.target.value })}
                  placeholder="e.g., Algorithm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="glossary-category">Category</Label>
                <Input
                  id="glossary-category"
                  value={glossaryForm.category}
                  onChange={(e) => setGlossaryForm({ ...glossaryForm, category: e.target.value })}
                  placeholder="e.g., Fundamentals"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="glossary-definition">Definition</Label>
              <Textarea
                id="glossary-definition"
                value={glossaryForm.definition}
                onChange={(e) => setGlossaryForm({ ...glossaryForm, definition: e.target.value })}
                placeholder="The definition of this term..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGlossaryDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (editingGlossaryId) {
                  updateGlossaryTerm.mutate({ id: editingGlossaryId, form: glossaryForm });
                } else {
                  createGlossaryTerm.mutate(glossaryForm);
                }
              }}
              disabled={isSaving || !glossaryForm.term || !glossaryForm.definition}
            >
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {editingGlossaryId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
