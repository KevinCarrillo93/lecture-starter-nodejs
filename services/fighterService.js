import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async create(fighterData) {
    const existingFighter = await fighterRepository.getOne({ name: { $regex: new RegExp(`^${fighterData.name}$`, 'i') } });
    if (existingFighter) {
      throw new Error(`Fighter with name '${fighterData.name}' already exists`);
    }
    return await fighterRepository.create(fighterData);
  }

  async getById(id) {
    const fighter = await fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }
    return fighter;
  }

  async getAll() {
    return await fighterRepository.getAll();
  }

  async update(id, updateData) {
    const fighterToUpdate = await fighterRepository.getOne({ id });
    if (!fighterToUpdate) {
      throw new Error("Fighter not found");
    }

    if (updateData.name) {
      const existingFighter = await fighterRepository.getOne({ name: { $regex: new RegExp(`^${updateData.name}$`, 'i') } });
      if (existingFighter && existingFighter.id !== id) {
        throw new Error(`Fighter with name '${updateData.name}' already exists`);
      }
    }

    return await fighterRepository.update(id, updateData);
  }

  async delete(id) {
    const deleted = await fighterRepository.delete(id);
    if (!deleted) {
      throw new Error("Fighter not found");
    }
    return deleted;
  }
}

const fighterService = new FighterService();

export { fighterService };