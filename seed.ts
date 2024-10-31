import { faker } from "@faker-js/faker";
import {
	IDType,
	LeaseStatus,
	MaintenancePriority,
	MaintenanceStatus,
	PaymentStatus,
	PaymentType,
	PrismaClient,
	PropertyType,
	Role,
	UnitStatus,
	UnitType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.findUnique({
		where: { id: "cm2ty18yy000147s2ba73g3rl" },
	});

	// Create some tenant users
	const tenants = await Promise.all(
		Array(20)
			.fill(null)
			.map(async () => {
				const tenant = await prisma.tenant.create({
					data: {
						occupation: faker.person.jobTitle(),
						employer: faker.company.name(),
						User: {
							create: {
								email: faker.internet.email(),
								first_name: faker.person.firstName(),
								last_name: faker.person.lastName(),
								hashedPassword: faker.internet.password(),
								phone: faker.phone.number(),
								avatar: faker.image.avatar(),
								role: Role.TENANT,
								isVerified: true,
								idType: faker.helpers.arrayElement(Object.values(IDType)),
								idNumber: faker.string.alphanumeric(10),
							},
						},
					},
				});
				return tenant;
			}),
	);

	// Create properties for the landlord
	for (let i = 0; i < 5; i++) {
		const property = await prisma.property.create({
			data: {
				name: `${faker.company.name()} Properties`,
				address: faker.location.streetAddress(),
				city: faker.location.city(),
				state: faker.location.state(),
				type: faker.helpers.arrayElement(Object.values(PropertyType)),
				description: faker.lorem.paragraph(),
				landlordId: user?.landlordId as string,
				images: {
					create: [
						{
							url: faker.image.urlLoremFlickr({ category: "house" }),
							caption: faker.lorem.sentence(),
						},
					],
				},
				units: {
					create: Array(35)
						.fill(null)
						.map(() => ({
							unitNumber: faker.string.numeric(3),
							type: faker.helpers.arrayElement(Object.values(UnitType)),
							rentAmount: Number.parseFloat(
								faker.finance.amount({ min: 5000, max: 300000, dec: 2 }),
							),
							status: faker.helpers.arrayElement(Object.values(UnitStatus)),
							features: faker.lorem.sentences(2),
							images: {
								create: [
									{
										url: faker.image.urlLoremFlickr({ category: "interior" }),
										caption: faker.lorem.sentence(),
									},
								],
							},
						})),
				},
			},
		});

		// Create leases for each unit with random tenants
		const units = await prisma.unit.findMany({
			where: { propertyId: property.id },
		});

		for (const unit of units) {
			if (unit.status === UnitStatus.OCCUPIED) {
				const randomTenant =
					tenants[Math.floor(Math.random() * tenants.length)];
				const lease = await prisma.lease.create({
					data: {
						unitId: unit.id,
						tenantId: randomTenant.id,
						startDate: faker.date.past(),
						endDate: faker.date.future(),
						rentAmount: unit.rentAmount,
						securityDeposit: unit.rentAmount * 2,
						status: faker.helpers.arrayElement(Object.values(LeaseStatus)),
						documents: {
							create: {
								name: "Lease Agreement",
								type: "LEASE_AGREEMENT",
								url: faker.internet.url(),
							},
						},
					},
				});

				// Create rent payments for the lease
				await Promise.all(
					Array(5)
						.fill(null)
						.map(async () => {
							return prisma.payment.create({
								data: {
									leaseId: lease.id,
									amount: unit.rentAmount,
									paymentDate: faker.date.past(),
									dueDate: faker.date.future(),
									status: faker.helpers.arrayElement(
										Object.values(PaymentStatus),
									),
									paymentType: faker.helpers.arrayElement(
										Object.values(PaymentType),
									),
									reference: faker.string.alphanumeric(10),
								},
							});
						}),
				);

				// Create maintenance jobs
				await prisma.maintenanceJob.create({
					data: {
						tenantId: randomTenant.id,
						landlordId: user?.landlordId as string,
						title: faker.lorem.sentence(),
						description: faker.lorem.paragraph(),
						priority: faker.helpers.arrayElement(
							Object.values(MaintenancePriority),
						),
						status: faker.helpers.arrayElement(
							Object.values(MaintenanceStatus),
						),
						images: {
							create: {
								url: faker.image.urlLoremFlickr({ category: "maintenance" }),
								caption: faker.lorem.sentence(),
							},
						},
					},
				});
			}
		}

		// Create messages between landlord and tenants
		for (const tenant of tenants) {
			await prisma.message.create({
				data: {
					senderId: user?.id as string,
					receiverId: (
						await prisma.user.findFirst({
							where: { tenantId: tenant.id },
						})
					)?.id as string,
					content: faker.lorem.paragraph(),
					read: faker.datatype.boolean(),
				},
			});
		}
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
