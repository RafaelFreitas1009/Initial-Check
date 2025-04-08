
export interface Symptom {
  id: string;
  name: string;
  relatedTo: string[];
  followUpQuestions: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface MedicalSpecialty {
  id: string;
  name: string;
  description: string;
  relatedSymptoms: string[];
  urgencyLevel: 'routine' | 'priority' | 'emergency';
}

export const symptoms: Symptom[] = [
  {
    id: 'headache',
    name: 'Dor de cabeça',
    relatedTo: ['neurology', 'general'],
    followUpQuestions: [
      'Há quanto tempo você está sentindo essa dor de cabeça?',
      'A dor é em um lado específico da cabeça ou generalizada?',
      'Você percebeu algum gatilho que causa essa dor?',
      'Está tomando algum medicamento para aliviar a dor?'
    ],
    severity: 'medium'
  },
  {
    id: 'fever',
    name: 'Febre',
    relatedTo: ['general', 'infectious'],
    followUpQuestions: [
      'Qual a temperatura do seu corpo?',
      'Há quanto tempo está com febre?',
      'Está sentindo outros sintomas junto com a febre?',
      'Tomou algum medicamento para baixar a febre?'
    ],
    severity: 'medium'
  },
  {
    id: 'cough',
    name: 'Tosse',
    relatedTo: ['pulmonology', 'general'],
    followUpQuestions: [
      'A tosse é seca ou com catarro?',
      'Há quanto tempo está tossindo?',
      'Sente falta de ar ao tossir?',
      'Percebeu se a tosse piora em algum período do dia?'
    ],
    severity: 'low'
  },
  {
    id: 'chestPain',
    name: 'Dor no peito',
    relatedTo: ['cardiology', 'pulmonology'],
    followUpQuestions: [
      'Como você descreveria essa dor? (aperto, queimação, pontada)',
      'A dor irradia para outras partes do corpo?',
      'Sente falta de ar junto com a dor?',
      'A dor aparece em alguma situação específica, como ao se esforçar?'
    ],
    severity: 'high'
  },
  {
    id: 'stomachPain',
    name: 'Dor abdominal',
    relatedTo: ['gastroenterology', 'general'],
    followUpQuestions: [
      'Em qual região da barriga sente dor?',
      'A dor é constante ou vai e volta?',
      'Percebeu alguma relação com alimentação?',
      'Teve episódios de vômito ou diarreia junto com a dor?'
    ],
    severity: 'medium'
  },
  {
    id: 'rash',
    name: 'Manchas na pele',
    relatedTo: ['dermatology', 'allergology'],
    followUpQuestions: [
      'Como são essas manchas? (vermelhas, com relevo, com coceira)',
      'Em qual parte do corpo surgiram as manchas?',
      'Percebeu algum gatilho que causa o aparecimento dessas manchas?',
      'Está usando algum medicamento ou produto novo na pele?'
    ],
    severity: 'low'
  }
];

export const specialties: MedicalSpecialty[] = [
  {
    id: 'general',
    name: 'Clínica Geral',
    description: 'Médico generalista que avalia sintomas diversos e fornece o primeiro atendimento.',
    relatedSymptoms: ['fever', 'headache', 'cough', 'stomachPain'],
    urgencyLevel: 'routine'
  },
  {
    id: 'cardiology',
    name: 'Cardiologia',
    description: 'Especialidade que trata de problemas do coração e sistema circulatório.',
    relatedSymptoms: ['chestPain'],
    urgencyLevel: 'priority'
  },
  {
    id: 'neurology',
    name: 'Neurologia',
    description: 'Especialidade que trata de problemas do sistema nervoso, incluindo cérebro e medula.',
    relatedSymptoms: ['headache'],
    urgencyLevel: 'priority'
  },
  {
    id: 'pulmonology',
    name: 'Pneumologia',
    description: 'Especialidade que trata de problemas nos pulmões e no sistema respiratório.',
    relatedSymptoms: ['cough', 'chestPain'],
    urgencyLevel: 'routine'
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterologia',
    description: 'Especialidade que trata de problemas no sistema digestivo.',
    relatedSymptoms: ['stomachPain'],
    urgencyLevel: 'routine'
  },
  {
    id: 'dermatology',
    name: 'Dermatologia',
    description: 'Especialidade que trata de problemas na pele, cabelo e unhas.',
    relatedSymptoms: ['rash'],
    urgencyLevel: 'routine'
  },
  {
    id: 'infectious',
    name: 'Infectologia',
    description: 'Especialidade que trata de infecções causadas por vírus, bactérias e outros microrganismos.',
    relatedSymptoms: ['fever'],
    urgencyLevel: 'priority'
  }
];

export const welcomeMessages = [
  "Olá! Eu sou o CareBuddy, seu assistente médico virtual. Como posso ajudar você hoje?",
  "Para começar, poderia me dizer qual o principal sintoma que está sentindo?"
];

export const commonQuestions = [
  "Estou com dor de cabeça",
  "Tenho febre alta",
  "Estou com tosse",
  "Sinto dor no peito",
  "Tenho dor de estômago",
  "Apareceram manchas na pele"
];

export function getSpecialtyForSymptom(symptomId: string): MedicalSpecialty | undefined {
  const symptom = symptoms.find(s => s.id === symptomId);
  if (!symptom) return undefined;
  
  // Find specialty with highest priority that relates to this symptom
  let bestSpecialty: MedicalSpecialty | undefined;
  let bestUrgency = 0; // 0: routine, 1: priority, 2: emergency
  
  for (const specialty of specialties) {
    if (specialty.relatedSymptoms.includes(symptomId)) {
      const urgencyValue = specialty.urgencyLevel === 'emergency' ? 2 : 
                          specialty.urgencyLevel === 'priority' ? 1 : 0;
      
      if (!bestSpecialty || urgencyValue > bestUrgency) {
        bestSpecialty = specialty;
        bestUrgency = urgencyValue;
      }
    }
  }
  
  return bestSpecialty;
}

export function getSymptomByName(symptomName: string): Symptom | undefined {
  return symptoms.find(s => 
    s.name.toLowerCase() === symptomName.toLowerCase() || 
    symptomName.toLowerCase().includes(s.name.toLowerCase())
  );
}
