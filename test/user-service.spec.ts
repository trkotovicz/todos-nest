import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../src/user/dto/create-user.dto';
import { UpdateUserDTO } from '../src/user/dto/update-user.dto';
import { UserEntity } from '../src/user/entity/user.entity';
import { UserService } from '../src/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDTO = {
        username: 'testuser',
        password: 'testpassword',
      };
      const createdUser: UserEntity = {
        id: '1',
        ...createUserDto,
        todos: [],
      };

      jest.spyOn(userRepository, 'exists').mockResolvedValue(false);
      jest
        .spyOn(userService, 'hashPassword')
        .mockResolvedValue('hashedpassword');
      jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

      const result = await userService.create(createUserDto);

      expect(result).toEqual(createdUser);
    });

    it('should throw ConflictException if username already exists', async () => {
      const createUserDto: CreateUserDTO = {
        username: 'existinguser',
        password: 'testpassword',
      };

      jest.spyOn(userRepository, 'exists').mockResolvedValue(true);

      await expect(userService.create(createUserDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('readOne', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const user: UserEntity = {
        id: userId,
        username: 'testuser',
        password: 'testpassword',
        todos: [],
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.readOne(userId);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(userService.readOne(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('list', () => {
    it('should return an array of users', async () => {
      const users: UserEntity[] = [
        { id: '1', username: 'user1', password: 'password1', todos: [] },
        { id: '2', username: 'user2', password: 'password2', todos: [] },
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await userService.list();

      expect(result).toEqual(users);
    });
  });

  describe('update', () => {
    it('should update user information', async () => {
      // const userId = '1';
      // const updateUserDto: UpdateUserDTO = {
      //   username: 'newusername',
      //   password: 'newpassword',
      // };
      // const updatedUser: Partial<UserEntity> = { id: userId, ...updateUserDto };
      // jest.spyOn(userService, 'findById').mockResolvedValue(undefined);
      // jest.spyOn(userService, 'existsUsername').mockResolvedValue(undefined);
      // jest
      //   .spyOn(userService, 'hashPassword')
      //   .mockResolvedValue('newhashedpassword');
      // jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      // await userService.update(userId, updateUserDto);
      // expect(userRepository.update).toHaveBeenCalledWith(userId, updatedUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDTO = {
        username: 'newusername',
        password: 'newpassword',
      };

      jest
        .spyOn(userService, 'findById')
        .mockRejectedValue(new NotFoundException());

      await expect(
        userService.update(userId, updateUserDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw ConflictException if new username already exists', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDTO = {
        username: 'existingusername',
        password: 'newpassword',
      };

      jest.spyOn(userService, 'findById').mockResolvedValue(undefined);
      jest
        .spyOn(userService, 'existsUsername')
        .mockRejectedValue(new ConflictException());

      await expect(
        userService.update(userId, updateUserDto),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = '1';

      jest.spyOn(userService, 'findById').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'softRemove').mockResolvedValue(undefined);

      await userService.delete(userId);

      expect(userRepository.softRemove).toHaveBeenCalledWith({ id: userId });
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';

      jest
        .spyOn(userService, 'findById')
        .mockRejectedValue(new NotFoundException());

      await expect(userService.delete(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
