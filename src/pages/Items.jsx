import { useState } from 'react';
import { useItems, useAddItem, useUpdateItem, useDeleteItem } from '@/integrations/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const Items = () => {
  const { data: items, isLoading, isError } = useItems();
  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();
  const [newItem, setNewItem] = useState({ name: '', size: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    addItem.mutate(newItem, {
      onSuccess: () => {
        setNewItem({ name: '', size: '', price: '' });
        toast.success('Item added successfully');
      },
      onError: (error) => toast.error(`Error adding item: ${error.message}`),
    });
  };

  const handleUpdateItem = () => {
    updateItem.mutate(editingItem, {
      onSuccess: () => {
        setEditingItem(null);
        toast.success('Item updated successfully');
      },
      onError: (error) => toast.error(`Error updating item: ${error.message}`),
    });
  };

  const handleDeleteItem = (id) => {
    deleteItem.mutate(id, {
      onSuccess: () => toast.success('Item deleted successfully'),
      onError: (error) => toast.error(`Error deleting item: ${error.message}`),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading items</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Items Management</h1>
      
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          placeholder="Size"
          type="number"
          value={newItem.size}
          onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
        />
        <Input
          placeholder="Price"
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <Button onClick={handleAddItem}>Add Item</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {editingItem?.id === item.id ? (
                  <Input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {editingItem?.id === item.id ? (
                  <Input
                    type="number"
                    value={editingItem.size}
                    onChange={(e) => setEditingItem({ ...editingItem, size: e.target.value })}
                  />
                ) : (
                  item.size
                )}
              </TableCell>
              <TableCell>
                {editingItem?.id === item.id ? (
                  <Input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                  />
                ) : (
                  item.price
                )}
              </TableCell>
              <TableCell>
                {editingItem?.id === item.id ? (
                  <Button onClick={handleUpdateItem}>Save</Button>
                ) : (
                  <Button onClick={() => setEditingItem(item)}>Edit</Button>
                )}
                <Button variant="destructive" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Items;
