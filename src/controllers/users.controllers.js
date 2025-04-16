import UserService from '../services/users.service.js';

class UserController {
  getAll(req, res) {
    try {
      const mockUser = UserService.getAllUsers();
      res.status(200).json(mockUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getDetail(req, res) {
    try {
      const { id } = req.params;
      const user = UserService.getDetail(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  postUser(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      const newUser = UserService.postUser(name);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  putUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      const updatedUser = UserService.putUser(id, name);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = UserService.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
