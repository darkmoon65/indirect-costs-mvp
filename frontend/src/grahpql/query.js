import { gql } from "@apollo/client";

export const GET_ONLY_PLANTAS = gql`
  query {
    plantas {
      id
      nombre
    }
  }
`;

export const GET_PLANTAS = gql`
  query {
    plantas {
      id
      nombre
      operaciones {
        id
        nombre
        costos {
          costo
          volumen {
            id
            nombre
          }
        }
      }
    }
  }
`;

export const CREATE_OPERACION = gql`
  mutation CreateOperacion(
    $nombre: String!
    $plantaId: ID!
    $costos: [CostoInput!]!
  ) {
    createOperacion(
      input: { nombre: $nombre, plantaId: $plantaId, costos: $costos }
    ) {
      id
      nombre
      costos {
        volumen {
          nombre
        }
        costo
      }
    }
  }
`;

export const UPDATE_OPERATION = gql`
  mutation UpdateOperacion(
    $id: ID!
    $nombre: String!
    $plantaId: ID!
    $costos: [CostoInput!]!
  ) {
    updateOperacion(
      id: $id
      input: { nombre: $nombre, plantaId: $plantaId, costos: $costos }
    ) {
      id
      nombre
      costos {
        volumen {
          nombre
        }
        costo
      }
    }
  }
`;
