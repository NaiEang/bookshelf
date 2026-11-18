import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity.js';
import { NotFoundException } from '@nestjs/common';
import { vi } from 'vitest';

const mockBookRepository = {
  find: vi.fn(async () => []),
  findOne: vi.fn(),
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of books', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('findOne should throw a NotFoundException if book is missing', async () => {
    mockBookRepository.findOne.mockImplementation(async () => null); 
    await expect(service.findOne('123e4567-e89b-12d3-a456-426614174000'))
      .rejects
      .toThrow(NotFoundException);
  });
});