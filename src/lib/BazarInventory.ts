export interface BazarItem {
  id: string;
  name: string;
  type: 'gif' | 'sound' | 'document' | 'artifact';
  image?: string;
  description: string;
  collectedAt: number;
}

type InventoryListener = (items: BazarItem[]) => void;

class BazarInventory {
  private items: BazarItem[] = [];
  private listeners: InventoryListener[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('raptem_inventory');
      if (saved) {
        try {
          this.items = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load inventory", e);
        }
      }
    }
  }

  addItem(item: Omit<BazarItem, 'collectedAt'>) {
    if (this.items.find(i => i.id === item.id)) return; // No duplicates
    
    const newItem: BazarItem = { ...item, collectedAt: Date.now() };
    this.items.push(newItem);
    this.save();
    this.notify();
  }

  getItems() {
    return this.items;
  }

  removeItem(id: string) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.notify();
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('raptem_inventory', JSON.stringify(this.items));
    }
  }

  private notify() {
    this.listeners.forEach(l => l(this.items));
  }

  subscribe(listener: InventoryListener) {
    this.listeners.push(listener);
    listener(this.items);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export const bazarInventory = new BazarInventory();
