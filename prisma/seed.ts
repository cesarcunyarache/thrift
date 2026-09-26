import { PrismaClient } from '@prisma/client';
import { subDays } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
    const userId = 'user_2nIuS7Fv6EgYWyOWntiohyLz7HD';
    const cuentaId = '077cccf2-8cfd-4146-9c1e-57d838b39d07'; // Asegúrate de que sea un ID de cuenta válido
    const categorias = [
        { id: '99d18531-f4b8-49e0-a5f1-5d3c559785a9', nombre: 'Alimentación 🍔', userId },
        { id: '5204a74a-c111-4117-ad80-4313e9f1f7a9', nombre: 'Transporte 🚗', userId },
        { id: '8a50e111-8a95-4732-b573-4bdc363b4dab', nombre: 'Materiales de estudio 📚', userId },
        { id: '9abf27ad-5dec-4e7e-8c56-cb66dd60a7a6', nombre: 'Ocio y entretenimiento 🎬', userId },
        { id: '539ceee6-35f8-4ff5-9dc6-42f147d3edab', nombre: 'Ropa y accesorios 👕', userId },
        { id: '6b29cd22-c68c-4828-bc2d-3f8dc1fd02a3', nombre: 'Alojamiento 🏠', userId },
        { id: '8e76d9d3-a242-469b-9c89-adb0233ee9ab', nombre: 'Servicios públicos 💡', userId },
        { id: '132ae9ab-0333-4e32-9edd-e82e7ce1bdad', nombre: 'Salud y bienestar 🏥', userId },
        { id: 'f1bc7b2c-de72-472a-bb53-2a3e3cd010ad', nombre: 'Tecnología y gadgets 📱', userId },
        { id: '198f0138-bd87-4aa6-af96-5201075a9ba7', nombre: 'Otros Gastos 🧾', userId },
    ];

    // Paso 1: Crear las categorías si no existen
    for (const categoria of categorias) {
        await prisma.categorias.upsert({
            where: { id: categoria.id },
            update: {},
            create: {
                id: categoria.id,
                nombre: categoria.nombre,
                userId: categoria.userId,
            },
        });
    }

    console.log("Categorías creadas correctamente.");

    // Paso 2: Generar 1 ingreso y 1 gasto por día en los últimos 60 días
    for (let day = 0; day < 60; day++) {
        const fecha = subDays(new Date(), day);

        // Selecciona una categoría aleatoria para el ingreso y otra para el gasto
        const categoriaIngreso = categorias[Math.floor(Math.random() * categorias.length)];
        const categoriaGasto = categorias[Math.floor(Math.random() * categorias.length)];

        // Ingreso
        const montoIngreso = Math.floor(Math.random() * 50000) + 50000; // Ingreso entre 50000 y 100000
        await prisma.transacciones.create({
            data: {
                id: `${categoriaIngreso.id}_ingreso_${day}`,
                monto: montoIngreso,
                beneficiario: `Beneficiario ${day + 1} - ${categoriaIngreso.nombre}`,
                notas: `Ingreso en ${categoriaIngreso.nombre} para el día ${day + 1}`,
                fecha,
                cuentaId,
                categoriaId: categoriaIngreso.id,
                userId: categoriaIngreso.userId,
            },
        });

        // Gasto
        const montoGasto = Math.floor(Math.random() * 40000) + 40000;
        await prisma.transacciones.create({
            data: {
                id: `${categoriaGasto.id}_gasto_${day}`,
                monto: -montoGasto, // Gasto negativo
                beneficiario: `Beneficiario ${day + 1} - ${categoriaGasto.nombre}`,
                notas: `Gasto en ${categoriaGasto.nombre} para el día ${day + 1}`,
                fecha,
                cuentaId,
                categoriaId: categoriaGasto.id,
                userId: categoriaGasto.userId,
            },
        });
    }

    console.log("Transacciones de ingreso y gasto insertadas correctamente para los últimos 60 días.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });