import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Management, ManagementRelations, Section, User} from '../models';
import {SectionRepository} from './section.repository';
import {UserRepository} from './user.repository';

export class ManagementRepository extends DefaultCrudRepository<
  Management,
  typeof Management.prototype.id,
  ManagementRelations
> {

  public readonly sections: HasManyRepositoryFactory<Section, typeof Management.prototype.id>;

  public readonly manager: BelongsToAccessor<User, typeof Management.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Management, dataSource);
    this.manager = this.createBelongsToAccessorFor('manager', userRepositoryGetter,);
    this.registerInclusionResolver('manager', this.manager.inclusionResolver);
    this.sections = this.createHasManyRepositoryFactoryFor('sections', sectionRepositoryGetter,);
    this.registerInclusionResolver('sections', this.sections.inclusionResolver);
  }
}
