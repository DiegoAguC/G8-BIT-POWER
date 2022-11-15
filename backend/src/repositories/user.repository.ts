import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Role, Property, Management, UsuariosXRoles} from '../models';
import {RoleRepository} from './role.repository';
import {ManagementRepository} from './management.repository';
import {UsuariosXRolesRepository} from './usuarios-x-roles.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly properties: HasManyRepositoryFactory<Property, typeof User.prototype.id>;

  public readonly management: HasOneRepositoryFactory<Management, typeof User.prototype.id>;

  public readonly roles: HasManyThroughRepositoryFactory<Role, typeof Role.prototype.id,
          UsuariosXRoles,
          typeof User.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('ManagementRepository') protected managementRepositoryGetter: Getter<ManagementRepository>, @repository.getter('UsuariosXRolesRepository') protected usuariosXRolesRepositoryGetter: Getter<UsuariosXRolesRepository>,
  ) {
    super(User, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', roleRepositoryGetter, usuariosXRolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.management = this.createHasOneRepositoryFactoryFor('management', managementRepositoryGetter);
    this.registerInclusionResolver('management', this.management.inclusionResolver);
  }
}
