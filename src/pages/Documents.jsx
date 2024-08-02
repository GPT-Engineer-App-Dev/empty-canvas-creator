import { useState } from 'react';
import { useDocuments, useAddDocument, useUpdateDocument, useDeleteDocument } from '@/integrations/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const Documents = () => {
  const { data: documents, isLoading, isError } = useDocuments();
  const addDocument = useAddDocument();
  const updateDocument = useUpdateDocument();
  const deleteDocument = useDeleteDocument();
  const [newDocument, setNewDocument] = useState({ title: '', content: '' });
  const [editingDocument, setEditingDocument] = useState(null);

  const handleAddDocument = () => {
    addDocument.mutate(newDocument, {
      onSuccess: () => {
        setNewDocument({ title: '', content: '' });
        toast.success('Document added successfully');
      },
      onError: (error) => toast.error(`Error adding document: ${error.message}`),
    });
  };

  const handleUpdateDocument = () => {
    updateDocument.mutate(editingDocument, {
      onSuccess: () => {
        setEditingDocument(null);
        toast.success('Document updated successfully');
      },
      onError: (error) => toast.error(`Error updating document: ${error.message}`),
    });
  };

  const handleDeleteDocument = (id) => {
    deleteDocument.mutate(id, {
      onSuccess: () => toast.success('Document deleted successfully'),
      onError: (error) => toast.error(`Error deleting document: ${error.message}`),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading documents</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Documents Management</h1>
      
      <div className="mb-4 space-y-2">
        <Input
          placeholder="Title"
          value={newDocument.title}
          onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
        />
        <Textarea
          placeholder="Content"
          value={newDocument.content}
          onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
        />
        <Button onClick={handleAddDocument}>Add Document</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell>
                {editingDocument?.id === document.id ? (
                  <Input
                    value={editingDocument.title}
                    onChange={(e) => setEditingDocument({ ...editingDocument, title: e.target.value })}
                  />
                ) : (
                  document.title
                )}
              </TableCell>
              <TableCell>
                {editingDocument?.id === document.id ? (
                  <Textarea
                    value={editingDocument.content}
                    onChange={(e) => setEditingDocument({ ...editingDocument, content: e.target.value })}
                  />
                ) : (
                  document.content
                )}
              </TableCell>
              <TableCell>
                {editingDocument?.id === document.id ? (
                  <Button onClick={handleUpdateDocument}>Save</Button>
                ) : (
                  <Button onClick={() => setEditingDocument(document)}>Edit</Button>
                )}
                <Button variant="destructive" onClick={() => handleDeleteDocument(document.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Documents;
