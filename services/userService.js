import { userRepository } from "../repositories/userRepository.js";

class UserService {
  async create(userData) {
    return await userRepository.create(userData);
  }

  async getById(id) {
    return await userRepository.getOne({ id });
  }

  async getAll() {
    return await userRepository.getAll();
  }

  async update(id, updateData) {
    return await userRepository.update(id, updateData);
  }

  async delete(id) {
    return await userRepository.delete(id);
  }

  async search(search) {
    return await userRepository.getOne(search);
  }
}

const userService = new UserService();

export { userService };
