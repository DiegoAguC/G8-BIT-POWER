import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Property,
  User,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyUserController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Property has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.propertyRepository.Habitantes(id).find(filter);
  }

  @post('/properties/{id}/users', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInProperty',
            exclude: ['id'],
            optional: ['propertyId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.propertyRepository.Habitantes(id).create(user);
  }

  @patch('/properties/{id}/users', {
    responses: {
      '200': {
        description: 'Property.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.propertyRepository.Habitantes(id).patch(user, where);
  }

  @del('/properties/{id}/users', {
    responses: {
      '200': {
        description: 'Property.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.propertyRepository.Habitantes(id).delete(where);
  }
}
