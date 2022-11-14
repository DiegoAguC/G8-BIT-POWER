<<<<<<< HEAD
import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Property} from '../models';
import {PropertyRepository} from './property.repository';

=======
import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Role} from '../models';
import {RoleRepository} from './role.repository';
>>>>>>> 1-dev-ds-dot-env

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly properties: HasManyRepositoryFactory<Property, typeof User.prototype.id>;

<<<<<<< HEAD
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(User, dataSource);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
=======

  public readonly roles: HasManyRepositoryFactory<Role, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', roleRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
>>>>>>> 1-dev-ds-dot-env
  }
}
