import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsejosService {
  private consejos = [
    // Index 0: Alimentación
    [
      {
        titulo: 'Consejo de alimentación 1',
        contenido: 'Contenido del consejo 1',
        type: 'alimentacion',
        color: 'alimentos'
      },
      {
        titulo: 'Consejo de alimentación 2',
        contenido: 'Contenido del consejo 2',
        type: 'alimentacion',
        color: 'alimentos'
      },
      {
        titulo: 'Consejo de alimentación 3',
        contenido: 'Contenido del consejo 3',
        type: 'alimentacion',
        color: 'alimentos'
      },
      {
        titulo: 'Consejo de alimentación 4',
        contenido: 'Contenido del consejo 4',
        type: 'alimentacion',
        color: 'alimentos'
      },
      {
        titulo: 'Consejo de alimentación 5',
        contenido: 'Contenido del consejo 5',
        type: 'alimentacion',
        color: 'alimentos'
      }
    ],
    // Index 1: Descanso
    [
      {
        titulo: 'Consejo de sueño y descanso 1',
        contenido: 'Contenido del consejo 1',
        type: 'descanso',
        color: 'descanso'
      },
      {
        titulo: 'Consejo de sueño y descanso 2',
        contenido: 'Contenido del consejo 2',
        type: 'descanso',
        color: 'descanso'
      },
      {
        titulo: 'Consejo de sueño y descanso 3',
        contenido: 'Contenido del consejo 3',
        type: 'descanso',
        color: 'descanso'
      },
      {
        titulo: 'Consejo de sueño y descanso 4',
        contenido: 'Contenido del consejo 4',
        type: 'descanso',
        color: 'descanso'
      },
      {
        titulo: 'Consejo de sueño y descanso 5',
        contenido: 'Contenido del consejo 5',
        type: 'descanso',
        color: 'descanso'
      }
    ],
    // Index 2: Estimulación
    [
      {
        titulo: 'Consejo de estimulación 1',
        contenido: 'Contenido del consejo 1',
        type: 'estimulación',
        color: 'estimulacion'
      },
      {
        titulo: 'Consejo de estimulación 2',
        contenido: 'Contenido del consejo 2',
        type: 'estimulación',
        color: 'estimulacion'
      },
      {
        titulo: 'Consejo de estimulación 3',
        contenido: 'Contenido del consejo 3',
        type: 'estimulación',
        color: 'estimulacion'
      },
      {
        titulo: 'Consejo de estimulación 4',
        contenido: 'Contenido del consejo 4',
        type: 'estimulación',
        color: 'estimulacion'
      },
      {
        titulo: 'Consejo de estimulación 5',
        contenido: 'Contenido del consejo 5',
        type: 'estimulación',
        color: 'estimulacion'
      }
    ],
    // Index 3: Prevención
    [
      {
        titulo: 'Consejo de prevención 1',
        contenido: 'Contenido del consejo 1',
        type: 'prevencion',
        color: 'prevencion'
      },
      {
        titulo: 'Consejo de prevención 2',
        contenido: 'Contenido del consejo 2',
        type: 'prevencion',
        color: 'prevencion'
      },
      {
        titulo: 'Consejo de prevención 3',
        contenido: 'Contenido del consejo 3',
        type: 'prevencion',
        color: 'prevencion'
      },
      {
        titulo: 'Consejo de prevención 4',
        contenido: 'Contenido del consejo 4',
        type: 'prevencion',
        color: 'prevencion'
      },
      {
        titulo: 'Consejo de prevención 5',
        contenido: 'Contenido del consejo 5',
        type: 'prevencion',
        color: 'prevencion'
      }
    ],
    // Index 4: Bienestar (emocional)
    [
      {
        titulo: 'Consejo de bienestar 1',
        contenido: 'Contenido del consejo 1',
        type: 'bienestar',
        color: 'emocional'
      },
      {
        titulo: 'Consejo de bienestar 2',
        contenido: 'Contenido del consejo 2',
        type: 'bienestar',
        color: 'emocional'
      },
      {
        titulo: 'Consejo de bienestar 3',
        contenido: 'Contenido del consejo 3',
        type: 'bienestar',
        color: 'emocional'
      },
      {
        titulo: 'Consejo de bienestar 4',
        contenido: 'Contenido del consejo 4',
        type: 'bienestar',
        color: 'emocional'
      },
      {
        titulo: 'Consejo de bienestar 5',
        contenido: 'Contenido del consejo 5',
        type: 'bienestar',
        color: 'emocional'
      }
    ],
    // Index 5: Cuidados
    [
      {
        titulo: 'Consejo de cuidados 1',
        contenido: 'Contenido del consejo 1',
        type: 'cuidados',
        color: 'cuidados'
      },
      {
        titulo: 'Consejo de cuidados 2',
        contenido: 'Contenido del consejo 2',
        type: 'cuidados',
        color: 'cuidados'
      },
      {
        titulo: 'Consejo de cuidados 3',
        contenido: 'Contenido del consejo 3',
        type: 'cuidados',
        color: 'cuidados'
      },
      {
        titulo: 'Consejo de cuidados 4',
        contenido: 'Contenido del consejo 4',
        type: 'cuidados',
        color: 'cuidados'
      },
      {
        titulo: 'Consejo de cuidados 5',
        contenido: 'Contenido del consejo 5',
        type: 'cuidados',
        color: 'cuidados'
      }
    ]
  ];

  constructor() { }

  getConsejos(type: string | null): any[] {
    const found = this.consejos.find(tabla => tabla.length > 0 && tabla[0].type === type);
    if (found) {
      return found;
    }
    return [{
      titulo: 'Consejo no encontrado',
      contenido: '',
      type: 'desconocido',
      color: 'medium'
    }];
  }
}
