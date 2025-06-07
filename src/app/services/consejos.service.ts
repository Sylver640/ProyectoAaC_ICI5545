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
      },
      {
        titulo: 'Consejo de alimentación 2',
        contenido: 'Contenido del consejo 2',
        type: 'alimentacion',
      },
      {
        titulo: 'Consejo de alimentación 3',
        contenido: 'Contenido del consejo 3',
        type: 'alimentacion',
      },
      {
        titulo: 'Consejo de alimentación 4',
        contenido: 'Contenido del consejo 4',
        type: 'alimentacion',
      },
      {
        titulo: 'Consejo de alimentación 5',
        contenido: 'Contenido del consejo 5',
        type: 'alimentacion',
      }
    ],
    // Index 1: Descanso
    [
      {
        titulo: 'Consejo de sueño y descanso 1',
        contenido: 'Contenido del consejo 1',
        type: 'descanso',
      },
      {
        titulo: 'Consejo de sueño y descanso 2',
        contenido: 'Contenido del consejo 2',
        type: 'descanso',
      },
      {
        titulo: 'Consejo de sueño y descanso 3',
        contenido: 'Contenido del consejo 3',
        type: 'descanso',
      },
      {
        titulo: 'Consejo de sueño y descanso 4',
        contenido: 'Contenido del consejo 4',
        type: 'descanso',
      },
      {
        titulo: 'Consejo de sueño y descanso 5',
        contenido: 'Contenido del consejo 5',
        type: 'descanso',
      }
    ],
    // Index 2: Estimulación
    [
      {
        titulo: 'Consejo de estimulación 1',
        contenido: 'Contenido del consejo 1',
        type: 'estimulación',
      },
      {
        titulo: 'Consejo de estimulación 2',
        contenido: 'Contenido del consejo 2',
        type: 'estimulación',
      },
      {
        titulo: 'Consejo de estimulación 3',
        contenido: 'Contenido del consejo 3',
        type: 'estimulación',
      },
      {
        titulo: 'Consejo de estimulación 4',
        contenido: 'Contenido del consejo 4',
        type: 'estimulación',
      },
      {
        titulo: 'Consejo de estimulación 5',
        contenido: 'Contenido del consejo 5',
        type: 'estimulación',
      }
    ],
    // Index 3: Prevención
    [
      {
        titulo: 'Consejo de prevención 1',
        contenido: 'Contenido del consejo 1',
        type: 'prevencion',
      },
      {
        titulo: 'Consejo de prevención 2',
        contenido: 'Contenido del consejo 2',
        type: 'prevencion',
      },
      {
        titulo: 'Consejo de prevención 3',
        contenido: 'Contenido del consejo 3',
        type: 'prevencion',
      },
      {
        titulo: 'Consejo de prevención 4',
        contenido: 'Contenido del consejo 4',
        type: 'prevencion',
      },
      {
        titulo: 'Consejo de prevención 5',
        contenido: 'Contenido del consejo 5',
        type: 'prevencion',
      }
    ],
    // Index 4: Bienestar
    [
      {
        titulo: 'Consejo de bienestar 1',
        contenido: 'Contenido del consejo 1',
        type: 'bienestar',
      },
      {
        titulo: 'Consejo de bienestar 2',
        contenido: 'Contenido del consejo 2',
        type: 'bienestar',
      },
      {
        titulo: 'Consejo de bienestar 3',
        contenido: 'Contenido del consejo 3',
        type: 'bienestar',
      },
      {
        titulo: 'Consejo de bienestar 4',
        contenido: 'Contenido del consejo 4',
        type: 'bienestar',
      },
      {
        titulo: 'Consejo de bienestar 5',
        contenido: 'Contenido del consejo 5',
        type: 'bienestar',
      }
    ]
  ];

  constructor() { }

  getConsejos(index: string | number): any {
    const i = Number(index);
    if (i >= 0 && i < this.consejos.length) {
      return this.consejos[i];
    }
    return {
      titulo: 'Consejo no encontrado',
      contenido: '',
      type: 'desconocido',
    };
  }
}
