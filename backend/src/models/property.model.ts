import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Area} from './area.model';
import {Invoice} from './invoice.model';
import {PropertyTypes} from './PropertyTypes.enum';
import {Section} from './section.model';
import {User} from './user.model';

// enum PropertyTypes {
//   apartment,
//   studioApartment,
//   Local
// }


@model()
export class Property extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // type: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(PropertyTypes),
    },
  })
  type: PropertyTypes;

  @belongsTo(() => User)
  ownerId: string;

  @hasMany(() => User)
  Habitantes: User[];

  @hasMany(() => Area)
  areas: Area[];
  @property({
    type: 'string',
  })
  residentId?: string;

  @property({
    type: 'number',
    required: true,
  })
  coefficient: number;

  @property({
    type: 'number',
    required: true,
  })
  spaceArea: number;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // managementId: string;
  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // sectionId: string;

  @belongsTo(() => Section)
  sectionId: string;

  @hasMany(() => Invoice)
  invoices: Invoice[];

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
