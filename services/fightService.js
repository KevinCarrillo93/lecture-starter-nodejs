import { fightRepository } from "../repositories/fightRepository.js";
import { fighterService } from "./fighterService.js";

class FightService {
  async create(fightData) {
    const fighter1 = await fighterService.getById(fightData.fighter1);
    const fighter2 = await fighterService.getById(fightData.fighter2);

    if (!fighter1 || !fighter2) {
      throw new Error("One or both of the fighters were not found");
    }
    return await fightRepository.create(fightData);
  }

  async getById(id) {
    const fight = await fightRepository.getOne({ id });
    if (!fight) {
      throw new Error("Fight not found");
    }
    return fight;
  }

  async getAll() {
    return await fightRepository.getAll();
  }
}

const fightService = new FightService();

export { fightService };