import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async create(fighterData) {
    return await fighterRepository.create(fighterData);
  }

  async getById(id) {
    return await fighterRepository.getOne({ id });
  }

  async getAll() {
    return await fighterRepository.getAll();
  }

  async update(id, updateData) {
    return await fighterRepository.update(id, updateData);
  }

  async delete(id) {
    return await fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };