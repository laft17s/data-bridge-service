export enum TransportType {
  REST = 'rest',
  KAFKA = 'kafka',
  GRPC = 'grpc',
  GRAPHQL = 'graphql',
}

export const SUPPORTED_TRANSPORTS = Object.values(TransportType);
