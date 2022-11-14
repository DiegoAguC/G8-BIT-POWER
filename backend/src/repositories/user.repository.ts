import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Role, Property, Management} from '../models';
import {RoleRepository} from './role.repository';
import {ManagementRepository} from './management.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly properties: HasManyRepositoryFactory<Property, typeof User.prototype.id>;


  public readonly roles: HasManyRepositoryFactory<Role, typeof User.prototype.id>;

  public readonly management: HasOneRepositoryFactory<Management, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('ManagementRepository') protected managementRepositoryGetter: Getter<ManagementRepository>,
  ) {
    super(User, dataSource);
    this.management = this.createHasOneRepositoryFactoryFor('management', managementRepositoryGetter);
    this.registerInclusionResolver('management', this.management.inclusionResolver);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', roleRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
