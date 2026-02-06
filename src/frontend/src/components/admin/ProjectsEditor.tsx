import { useState } from 'react';
import { useGetProjects, useAddProject, useUpdateProject, useDeleteProject } from '../../hooks/useQueries';
import type { Project, ProjectUpdate } from '../../backend';
import { ExternalBlob } from '../../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Loader2, Upload, X } from 'lucide-react';
import MetallicSurface from '../site/MetallicSurface';

export default function ProjectsEditor() {
  const { data: projects, isLoading } = useGetProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [uploadingImages, setUploadingImages] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const resetForm = () => {
    setFormData({ title: '', description: '' });
    setUploadingImages([]);
    setUploadProgress({});
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({ title: project.title, description: project.description });
    setDialogOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadingImages(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    setUploadingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a project title');
      return;
    }

    try {
      // Convert images to ExternalBlob
      const imageBlobs: ExternalBlob[] = [];
      for (const file of uploadingImages) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: percentage }));
        });
        imageBlobs.push(blob);
      }

      const projectData: ProjectUpdate = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        images: imageBlobs,
      };

      if (editingProject) {
        await updateProject.mutateAsync({ id: editingProject.id, project: projectData });
        toast.success('Project updated successfully');
      } else {
        await addProject.mutateAsync(projectData);
        toast.success('Project added successfully');
      }

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingProject ? 'Failed to update project' : 'Failed to add project');
      console.error(error);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject.mutateAsync(id);
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Industrial Warehouse Structure"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the project details..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Images (optional)</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
                {uploadingImages.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {uploadingImages.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-accent/20 rounded">
                        <span className="text-sm truncate flex-1">{file.name}</span>
                        {uploadProgress[file.name] !== undefined && (
                          <span className="text-xs text-muted-foreground mx-2">
                            {uploadProgress[file.name]}%
                          </span>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={addProject.isPending || updateProject.isPending}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  {addProject.isPending || updateProject.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Project'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projects && projects.length === 0 ? (
        <MetallicSurface className="p-12 text-center">
          <p className="text-muted-foreground">No projects yet. Add your first project to get started!</p>
        </MetallicSurface>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects?.map((project) => (
            <MetallicSurface key={project.id.toString()}>
              <Card className="border-0 bg-transparent">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="flex-1">{project.title}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(project)}
                        className="text-yellow-500 hover:text-yellow-400"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(project.id)}
                        className="text-destructive hover:text-destructive"
                        disabled={deleteProject.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.images && project.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {project.images.slice(0, 2).map((image, idx) => (
                        <img
                          key={idx}
                          src={image.getDirectURL()}
                          alt={`${project.title} - ${idx + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                </CardContent>
              </Card>
            </MetallicSurface>
          ))}
        </div>
      )}
    </div>
  );
}
