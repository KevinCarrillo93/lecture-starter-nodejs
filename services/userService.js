import { userRepository } from "../repositories/userRepository.js";

class UserService {
  async create(userData) {
    const existingUserByEmail = await userRepository.getOne({ email: userData.email });
    if (existingUserByEmail) {
      throw new Error("User with this email already exists");
    }

    const existingUserByPhone = await userRepository.getOne({ phone: userData.phone });
    if (existingUserByPhone) {
      throw new Error("User with this phone number already exists");
    }

    return await userRepository.create(userData);
  }

  async getById(id) {
    const user = await userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getAll() {
    return await userRepository.getAll();
  }

  async update(id, updateData) {
    const userToUpdate = await userRepository.getOne({ id });
    if (!userToUpdate) {
      throw new Error("User not found");
    }

    if (updateData.email) {
      const existingUserByEmail = await userRepository.getOne({ email: updateData.email });
      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new Error("User with this email already exists");
      }
    }

    if (updateData.phone) {
      const existingUserByPhone = await userRepository.getOne({ phone: updateData.phone });
      if (existingUserByPhone && existingUserByPhone.id !== id) {
        throw new Error("User with this phone number already exists");
      }
    }

    return await userRepository.update(id, updateData);
  }

  async delete(id) {
    const deleted = await userRepository.delete(id);
    if (!deleted) {
      throw new Error("User not found");
    }
    return deleted;
  }

  async search(search) {
    return await userRepository.getOne(search);
  }
}

const userService = new UserService();

export { userService };