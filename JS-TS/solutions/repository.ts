export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    this.items = [...this.items, entity];
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    const exists = this.findById(id);
    if (!exists) throw new Error(`Entity with id ${id} not found`);

    this.items = this.items.map(item =>
        item.id === id ? { ...item, ...patch } : item
    );
    return this.findById(id)!;
  }

  remove(id: number): void {
    const exists = this.findById(id);
    if (!exists) throw new Error(`Entity with id ${id} not found`);

    this.items = this.items.filter(item => item.id !== id);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }
}
