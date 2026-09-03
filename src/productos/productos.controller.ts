import { Controller, Get, Param } from '@nestjs/common';

interface Producto {
	id: string;
	nombre: string;
	categoria: string;
	precio: number;
	stock: number;
	fechaVencimiento: string;
}

@Controller('productos')
export class ProductosController {
	private productos: Producto[] = [
		{
			id: '1',
			nombre: 'Arroz blanco',
			categoria: 'granos',
			precio: 4500,
			stock: 25,
			fechaVencimiento: '2027-01-15',
		},
		{
			id: '2',
			nombre: 'Leche entera',
			categoria: 'lacteos',
			precio: 3800,
			stock: 12,
			fechaVencimiento: '2026-10-20',
		},
		{
			id: '3',
			nombre: 'Pan tajado',
			categoria: 'panaderia',
			precio: 5200,
			stock: 0,
			fechaVencimiento: '2026-09-10',
		},
		{
			id: '4',
			nombre: 'Yogur natural',
			categoria: 'lacteos',
			precio: 2900,
			stock: 8,
			fechaVencimiento: '2026-08-25',
		},
		{
			id: '5',
			nombre: 'Lentejas',
			categoria: 'granos',
			precio: 4100,
			stock: 18,
			fechaVencimiento: '2027-03-12',
		},
	];

	@Get()
	listarProductos() {
		return this.productos;
	}

	@Get('stock')
	listarProductosConStock() {
		return this.productos.filter((producto) => producto.stock > 0);
	}

	@Get('vencidos')
	listarProductosVencidos() {
		const hoy = new Date().toISOString().split('T')[0];

		return this.productos.filter(
			(producto) => producto.fechaVencimiento < hoy,
		);
	}

	@Get('categoria/:categoria')
	listarProductosPorCategoria(@Param('categoria') categoria: string) {
		return this.productos.filter(
			(producto) => producto.categoria.toLowerCase() === categoria.toLowerCase(),
		);
	}

	@Get(':id')
	listarProductoPorId(@Param('id') id: string) {
		return this.productos.find((producto) => producto.id === id) ?? null;
	}
}
