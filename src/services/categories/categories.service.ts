import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dto/categories.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'phones',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const categoryId = this.categories.findIndex((item) => item.id === id);
    if (categoryId === -1) {
      throw new NotFoundException(`category ${id} not found`);
    }
    return this.categories[categoryId];
  }

  create(payload: CreateCategoryDto) {
    this.counterId += 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    const categoryIndex = this.categories.findIndex((item) => item.id === id);
    this.categories[categoryIndex] = {
      ...category,
      ...payload,
    };
    return this.categories[categoryIndex];
  }

  remove(id: number) {
    const categoryId = this.categories.findIndex((item) => item.id === id);
    if (categoryId === -1) {
      throw new NotFoundException(`category ${id} not found`);
    }
    this.categories.splice(categoryId);
    return true;
  }
}
