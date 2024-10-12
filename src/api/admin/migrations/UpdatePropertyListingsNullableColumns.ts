import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePropertyListingsNullableColumns implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('property-listings', 'bedrooms', 
            new TableColumn({
                name: 'bedrooms',
                type: 'integer',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'bathrooms', 
            new TableColumn({
                name: 'bathrooms',
                type: 'integer',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'price', 
            new TableColumn({
                name: 'price',
                type: 'integer',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'longitude', 
            new TableColumn({
                name: 'longitude',
                type: 'varchar',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'latitude', 
            new TableColumn({
                name: 'latitude',
                type: 'varchar',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'livingArea', 
            new TableColumn({
                name: 'livingArea',
                type: 'integer',
                isNullable: true,
            })
        );

        // Add more columns as necessary, following the same pattern
        await queryRunner.changeColumn('property-listings', 'additionalInfo', 
            new TableColumn({
                name: 'additionalInfo',
                type: 'json',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('property-listings', 'bedrooms', 
            new TableColumn({
                name: 'bedrooms',
                type: 'integer',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'bathrooms', 
            new TableColumn({
                name: 'bathrooms',
                type: 'integer',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'price', 
            new TableColumn({
                name: 'price',
                type: 'integer',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'longitude', 
            new TableColumn({
                name: 'longitude',
                type: 'varchar',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'latitude', 
            new TableColumn({
                name: 'latitude',
                type: 'varchar',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'livingArea', 
            new TableColumn({
                name: 'livingArea',
                type: 'integer',
                isNullable: true,
            })
        );

        await queryRunner.changeColumn('property-listings', 'additionalInfo', 
            new TableColumn({
                name: 'additionalInfo',
                type: 'json',
                isNullable: true,
            })
        );
    }
}
