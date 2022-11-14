import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Property, PropertyRelations, Section, Invoice, User, Area} from '../models';
import {SectionRepository} from './section.repository';
import {InvoiceRepository} from './invoice.repository';
import {UserRepository} from './user.repository';
import {AreaRepository} from './area.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly section: BelongsToAccessor<Section, typeof Property.prototype.id>;

  public readonly invoices: HasManyRepositoryFactory<Invoice, typeof Property.prototype.id>;

  public readonly owner: BelongsToAccessor<User, typeof Property.prototype.id>;

  public readonly Habitantes: HasManyRepositoryFactory<User, typeof Property.prototype.id>;

  public readonly areas: HasManyRepositoryFactory<Area, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>,
  ) {
    super(Property, dataSource);
    this.areas = this.createHasManyRepositoryFactoryFor('areas', areaRepositoryGetter,);
    this.registerInclusionResolver('areas', this.areas.inclusionResolver);
    this.Habitantes = this.createHasManyRepositoryFactoryFor('Habitantes', userRepositoryGetter,);
    this.registerInclusionResolver('Habitantes', this.Habitantes.inclusionResolver);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.invoices = this.createHasManyRepositoryFactoryFor('invoices', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoices', this.invoices.inclusionResolver);
    this.section = this.createBelongsToAccessorFor('section', sectionRepositoryGetter,);
    this.registerInclusionResolver('section', this.section.inclusionResolver);
  }
}
