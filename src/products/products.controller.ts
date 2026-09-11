import { Controller, Get, Param } from '@nestjs/common';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  expirationDate: string;
}

@Controller('products')
export class ProductsController {
  private products: Product[] = [
    {
      id: '1',
      name: 'Arroz blanco',
      category: 'granos',
      price: 4500,
      stock: 25,
      expirationDate: '2027-01-15',
    },
    {
      id: '2',
      name: 'Leche entera',
      category: 'lacteos',
      price: 3800,
      stock: 12,
      expirationDate: '2026-10-20',
    },
    {
      id: '3',
      name: 'Pan tajado',
      category: 'panaderia',
      price: 5200,
      stock: 0,
      expirationDate: '2026-09-10',
    },
    {
      id: '4',
      name: 'Yogur natural',
      category: 'lacteos',
      price: 2900,
      stock: 8,
      expirationDate: '2026-08-25',
    },
    {
      id: '5',
      name: 'Lentejas',
      category: 'granos',
      price: 4100,
      stock: 18,
      expirationDate: '2027-03-12',
    },
  ];

  @Get('')
  getProducts() {
    return this.products;
  }

  @Get('id/:id')
  getProductById(@Param('id') id: string) {
    const product = this.products.find((product) => product.id === id);
    return product || 'product not found';
  }

  @Get('stock/out-of-stock')
  getOutOfStockProducts() {
    const outOfStock = this.products.filter((product) => product.stock === 0);
    return outOfStock.length > 0 ? outOfStock : 'No products out of stock';
  }

  @Get('search/without-stock')
  getProductsWithoutStock() {
    return this.products.filter((product) => product.stock === 0);
  }

  @Get('expiration/expired')
  getExpiredProducts() {
    const currentDate = new Date();
    const expired = this.products.filter(
      (product) => new Date(product.expirationDate) < currentDate,
    );

    return expired.length > 0 ? expired : 'No expired products';
  }

  @Get('search/expired')
  getExpiredProductsAlias() {
    return this.getExpiredProducts();
  }

  @Get('category/:category')
  getProductsByCategory(@Param('category') category: string) {
    const filtered = this.products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );

    return filtered.length > 0 ? filtered : 'Products not found in this category';
  }

  @Get('search/category/:category')
  getProductsByCategoryAlias(@Param('category') category: string) {
    return this.getProductsByCategory(category);
  }
}
