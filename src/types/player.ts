import type { UserDTO, UserResponseDTO } from './user';

export type Position = 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';

export interface PlayerResponseDTO extends UserResponseDTO {
  id: string;
  dorsalNumber: number;
  position: Position;
}

export interface UserPlayerDTO extends UserDTO {}

export interface PlayerDTO extends UserPlayerDTO {
  dorsalNumber: number;
  position: Position;
}

export interface StudentUserDTO extends UserPlayerDTO {
  semester: number;
}

export interface StudentPlayerDTO extends StudentUserDTO {
  dorsalNumber: number;
  position: Position;
}
