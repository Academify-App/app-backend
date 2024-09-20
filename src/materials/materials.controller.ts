import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MaterialService } from './materials.service';
import { CreateMaterialDto } from 'src/dto/create-material.dto';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.materialService.findByCategory(category);
  }

  @Patch(':id/reviews')
  addReview(
    @Param('id') id: number,
    @Body() review: { value: string; rating: number },
  ) {
    return this.materialService.addReview(id, review);
  }
}
