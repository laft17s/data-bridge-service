import { Module } from '@nestjs/common';
import { TransformDataUseCase } from '../application/use-cases/transform-data.use-case';
import { DataConverterFactory } from './converters/factory/data-converter.factory';
import { JsonToXmlConverter } from './converters/strategies/json-to-xml.converter';
import { XmlToJsonConverter } from './converters/strategies/xml-to-json.converter';
import { JsonToCsvConverter } from './converters/strategies/json-to-csv.converter';
import { CsvToJsonConverter } from './converters/strategies/csv-to-json.converter';
import { JsonToToonConverter } from './converters/strategies/json-to-toon.converter';
import { ToonToJsonConverter } from './converters/strategies/toon-to-json.converter';
import { XmlToToonConverter } from './converters/strategies/xml-to-toon.converter';
import { ToonToXmlConverter } from './converters/strategies/toon-to-xml.converter';
import { RestAdapter } from './adapters/rest/rest.adapter';
import { GraphQLAdapter } from './adapters/graphql/graphql.adapter';
import { RestTransportStrategy } from './adapters/transport/rest-transport.strategy';
import { GraphQlTransportStrategy } from './adapters/transport/graphql-transport.strategy';
import { TransportFactory } from './adapters/transport/transport.factory';

@Module({
  controllers: [RestAdapter],
  providers: [
    TransformDataUseCase,
    GraphQLAdapter,
    TransportFactory,
    {
      provide: 'IDataConverterFactory',
      useClass: DataConverterFactory,
    },
    {
      provide: 'STRATEGIES',
      useFactory: (...strategies: any[]) => strategies,
      inject: [
        JsonToXmlConverter,
        XmlToJsonConverter,
        JsonToCsvConverter,
        CsvToJsonConverter,
        JsonToToonConverter,
        ToonToJsonConverter,
        XmlToToonConverter,
        ToonToXmlConverter,
      ],
    },
    {
      provide: 'TRANSPORT_STRATEGIES',
      useFactory: (...strategies: any[]) => strategies,
      inject: [RestTransportStrategy, GraphQlTransportStrategy],
    },
    JsonToXmlConverter,
    XmlToJsonConverter,
    JsonToCsvConverter,
    CsvToJsonConverter,
    JsonToToonConverter,
    ToonToJsonConverter,
    XmlToToonConverter,
    ToonToXmlConverter,
    RestTransportStrategy,
    GraphQlTransportStrategy,
  ],
  exports: [TransformDataUseCase],
})
export class TransformationModule {}
