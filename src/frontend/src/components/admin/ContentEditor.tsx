import { useState, useEffect } from 'react';
import { useGetContent, useUpdateContent } from '../../hooks/useQueries';
import type { WebsiteContent, Service, Client } from '../../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import MetallicSurface from '../site/MetallicSurface';

export default function ContentEditor() {
  const { data: content, isLoading } = useGetContent();
  const updateContent = useUpdateContent();

  const [formData, setFormData] = useState<WebsiteContent | null>(null);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleSave = async () => {
    if (!formData) return;

    try {
      await updateContent.mutateAsync(formData);
      toast.success('Content updated successfully');
    } catch (error) {
      toast.error('Failed to update content');
      console.error(error);
    }
  };

  const addService = () => {
    if (!formData) return;
    setFormData({
      ...formData,
      services: [...formData.services, { name: '', description: '' }],
    });
  };

  const removeService = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    if (!formData) return;
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData({ ...formData, services: newServices });
  };

  const addClient = () => {
    if (!formData) return;
    setFormData({
      ...formData,
      clients: [...formData.clients, { name: '', description: '', logo: undefined }],
    });
  };

  const removeClient = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      clients: formData.clients.filter((_, i) => i !== index),
    });
  };

  const updateClient = (index: number, field: keyof Client, value: string) => {
    if (!formData) return;
    const newClients = [...formData.clients];
    newClients[index] = { ...newClients[index], [field]: value };
    setFormData({ ...formData, clients: newClients });
  };

  if (isLoading || !formData) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updateContent.isPending}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          {updateContent.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <MetallicSurface>
        <Card className="border-0 bg-transparent">
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroHeadline">Headline</Label>
              <Input
                id="heroHeadline"
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubheadline">Subheadline</Label>
              <Input
                id="heroSubheadline"
                value={formData.heroSubheadline}
                onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </MetallicSurface>

      <MetallicSurface>
        <Card className="border-0 bg-transparent">
          <CardHeader>
            <CardTitle>Company Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.companyDescription}
              onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
              rows={4}
            />
          </CardContent>
        </Card>
      </MetallicSurface>

      <MetallicSurface>
        <Card className="border-0 bg-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Services</CardTitle>
              <Button onClick={addService} size="sm" variant="outline" className="border-yellow-500/50 text-yellow-500">
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.services.map((service, index) => (
              <div key={index} className="space-y-3 p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Service {index + 1}</h4>
                  <Button
                    onClick={() => removeService(index)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={service.name}
                    onChange={(e) => updateService(index, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </MetallicSurface>

      <MetallicSurface>
        <Card className="border-0 bg-transparent">
          <CardHeader>
            <CardTitle>Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.materials}
              onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
              rows={3}
            />
          </CardContent>
        </Card>
      </MetallicSurface>

      <MetallicSurface>
        <Card className="border-0 bg-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Clients</CardTitle>
              <Button onClick={addClient} size="sm" variant="outline" className="border-yellow-500/50 text-yellow-500">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.clients.map((client, index) => (
              <div key={index} className="space-y-3 p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Client {index + 1}</h4>
                  <Button
                    onClick={() => removeClient(index)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={client.name}
                    onChange={(e) => updateClient(index, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (optional)</Label>
                  <Input
                    value={client.description}
                    onChange={(e) => updateClient(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </MetallicSurface>

      <MetallicSurface>
        <Card className="border-0 bg-transparent">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.contact.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.contact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.contact.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, address: e.target.value },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </MetallicSurface>
    </div>
  );
}
